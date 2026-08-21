import { site } from "@/lib/site";

/**
 * Server-side lead delivery.
 *
 * Every lead is pushed to one or more delivery channels from the server, so a
 * blocked third-party script, an ad blocker or a network failure in the browser
 * can no longer lose a submission (issues.md A1).
 *
 * Channels are additive and independent — a lead is considered delivered if at
 * least one succeeds. The route reports failure to the client when none do, so
 * the form can tell the person to call instead of falsely promising a callback.
 *
 * Configuration, all optional except Clarion which is always on:
 *   RESEND_API_KEY      + LEAD_EMAIL_TO / LEAD_EMAIL_FROM  -> email via Resend
 *   SENDGRID_API_KEY    + LEAD_EMAIL_TO / LEAD_EMAIL_FROM  -> email via SendGrid
 *   LEAD_WEBHOOK_URL    (+ LEAD_WEBHOOK_TOKEN)             -> generic JSON POST (CRM/Zapier)
 *   CLARION_FORMS_ENABLED="false"                          -> disable the Clarion channel
 */

const CLARION_TIMEOUT_MS = 8000;

export type LeadVariant = "contact" | "insurance";

/** Attribution captured in the browser and forwarded so it isn't lost server-side. */
export type LeadAttribution = {
  pageUrl?: string | null;
  landingPageUrl?: string | null;
  referrer?: string | null;
  utm?: Record<string, string> | null;
  gclid?: string | null;
  /** fbclid / msclkid / gbraid / wbraid — everything gclid alone doesn't cover. */
  clickIds?: Record<string, string> | null;
  /**
   * CTM's own session id, 24 hex characters. Resolved server-side from the
   * client value or the `__ctmid` cookie; `null` when CTM never loaded.
   */
  ctmVisitorSid?: string | null;
  userAgent?: string | null;
};

export type LeadPayload = {
  reference: string;
  variant: LeadVariant;
  receivedAt: string;
  fields: Record<string, string>;
  attribution: LeadAttribution;
};

export type ChannelResult = {
  channel: string;
  ok: boolean;
  detail?: string;
};

export type DeliveryOutcome = {
  delivered: boolean;
  results: ChannelResult[];
};

/** fetch with a hard timeout so a hung provider can't stall the request. */
async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

function errText(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/** Human-readable body used for the email channels. */
function renderEmail(lead: LeadPayload): { subject: string; text: string } {
  const label = lead.variant === "insurance" ? "Insurance verification" : "Contact";
  const name = lead.fields.name ?? "";
  const lines = [
    `${label} request — ${site.fullName}`,
    `Reference: ${lead.reference}`,
    `Received: ${lead.receivedAt}`,
    "",
    ...Object.entries(lead.fields).map(([k, v]) => `${k}: ${v}`),
  ];

  const attr = lead.attribution;
  const attrLines = [
    attr.pageUrl ? `page: ${attr.pageUrl}` : null,
    attr.landingPageUrl ? `landing page: ${attr.landingPageUrl}` : null,
    attr.referrer ? `referrer: ${attr.referrer}` : null,
    attr.gclid ? `gclid: ${attr.gclid}` : null,
    ...Object.entries(attr.utm ?? {}).map(([k, v]) => `utm_${k}: ${v}`),
    ...Object.entries(attr.clickIds ?? {}).map(([k, v]) => `${k}: ${v}`),
    // Spelled out when absent: a lead with no CTM id is one that will not be
    // attached to a call-tracking visit, and that is worth noticing.
    `ctm_visitor_sid: ${attr.ctmVisitorSid ?? "(none — t.js blocked or not loaded)"}`,
  ].filter(Boolean) as string[];

  if (attrLines.length) lines.push("", "-- attribution --", ...attrLines);

  return {
    subject: `[${label}] ${name || "New lead"} — ${lead.fields.phone ?? ""}`.trim(),
    text: lines.join("\n"),
  };
}

/**
 * Clarion forms capture, submitted server-side.
 *
 * NOTE: the Clarion API returns {"success":true} even for a form_key that does
 * not exist in the dashboard, so a 200 here proves the site key is valid and the
 * request was accepted — NOT that the lead routed to the right place. The form
 * keys still need confirming against the dashboard (issues.md A1).
 */
async function deliverClarion(lead: LeadPayload): Promise<ChannelResult> {
  if (process.env.CLARION_FORMS_ENABLED === "false") {
    return { channel: "clarion", ok: false, detail: "disabled" };
  }
  const { siteKey, api } = site.widgets.clarion;
  const url = `${api.replace(/\/$/, "")}/forms/public/submit`;

  const body = (includeExtras: boolean) =>
    JSON.stringify({
      site_key: siteKey,
      form_key: lead.variant === "insurance" ? "insurance_verification" : "contact",
      data: { ...lead.fields, variant: lead.variant, reference: lead.reference },
      page_url: lead.attribution.pageUrl ?? null,
      landing_page_url: lead.attribution.landingPageUrl ?? null,
      referrer: lead.attribution.referrer ?? null,
      utm: lead.attribution.utm ?? null,
      gclid: lead.attribution.gclid ?? null,
      // FLAT and TOP-LEVEL, exactly here. Clarion's parser reads
      // `ctm_visitor_sid` off the root of the body; nesting it under a
      // `session` object means their parser never finds it and the lead is
      // filed against no visit — with a 200 response either way.
      ctm_visitor_sid: lead.attribution.ctmVisitorSid ?? null,
      // fbclid / msclkid / gbraid / wbraid. Keys Clarion has never been asked
      // to accept, hence the retry below.
      ...(includeExtras ? (lead.attribution.clickIds ?? {}) : {}),
      user_agent: lead.attribution.userAgent ?? null,
    });

  const post = (includeExtras: boolean) =>
    fetchWithTimeout(
      url,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: body(includeExtras) },
      CLARION_TIMEOUT_MS,
    );

  try {
    const hasExtras = Object.keys(lead.attribution.clickIds ?? {}).length > 0;
    let res = await post(hasExtras);

    // If strict validation rejects an unknown click-id key, resend without them.
    // Losing an admissions enquiry to gain an attribution field is not a trade
    // worth making. `ctm_visitor_sid` is never dropped — it is the point.
    if (hasExtras && res.status >= 400 && res.status < 500) {
      console.warn(`[lead] Clarion rejected the extra click ids (HTTP ${res.status}); retrying without them`);
      res = await post(false);
    }

    if (!res.ok) {
      return { channel: "clarion", ok: false, detail: `HTTP ${res.status}` };
    }
    return { channel: "clarion", ok: true };
  } catch (e) {
    return { channel: "clarion", ok: false, detail: errText(e) };
  }
}

async function deliverResend(lead: LeadPayload): Promise<ChannelResult | null> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return null;

  const { subject, text } = renderEmail(lead);
  try {
    const res = await fetchWithTimeout(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          subject,
          text,
          reply_to: lead.fields.email || undefined,
        }),
      },
      CLARION_TIMEOUT_MS,
    );
    if (!res.ok) return { channel: "resend", ok: false, detail: `HTTP ${res.status}` };
    return { channel: "resend", ok: true };
  } catch (e) {
    return { channel: "resend", ok: false, detail: errText(e) };
  }
}

async function deliverSendgrid(lead: LeadPayload): Promise<ChannelResult | null> {
  const key = process.env.SENDGRID_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return null;

  const { subject, text } = renderEmail(lead);
  try {
    const res = await fetchWithTimeout(
      "https://api.sendgrid.com/v3/mail/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          personalizations: [{ to: to.split(",").map((s) => ({ email: s.trim() })) }],
          from: { email: from },
          reply_to: lead.fields.email ? { email: lead.fields.email } : undefined,
          subject,
          content: [{ type: "text/plain", value: text }],
        }),
      },
      CLARION_TIMEOUT_MS,
    );
    if (!res.ok) return { channel: "sendgrid", ok: false, detail: `HTTP ${res.status}` };
    return { channel: "sendgrid", ok: true };
  } catch (e) {
    return { channel: "sendgrid", ok: false, detail: errText(e) };
  }
}

async function deliverWebhook(lead: LeadPayload): Promise<ChannelResult | null> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const token = process.env.LEAD_WEBHOOK_TOKEN;
  try {
    const res = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(lead),
      },
      CLARION_TIMEOUT_MS,
    );
    if (!res.ok) return { channel: "webhook", ok: false, detail: `HTTP ${res.status}` };
    return { channel: "webhook", ok: true };
  } catch (e) {
    return { channel: "webhook", ok: false, detail: errText(e) };
  }
}

/**
 * Push the lead to every configured channel in parallel.
 * Delivered = at least one channel accepted it.
 */
export async function deliverLead(lead: LeadPayload): Promise<DeliveryOutcome> {
  const settled = await Promise.all([
    deliverClarion(lead),
    deliverResend(lead),
    deliverSendgrid(lead),
    deliverWebhook(lead),
  ]);

  const results = settled.filter((r): r is ChannelResult => r !== null);
  return { delivered: results.some((r) => r.ok), results };
}
