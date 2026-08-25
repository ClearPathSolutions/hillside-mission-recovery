import { NextResponse } from "next/server";
import { deliverLead, type LeadAttribution, type LeadPayload, type LeadVariant } from "@/lib/lead-delivery";

// Lead / contact form endpoint.
//
// Delivery happens here, server-side, so a blocked third-party script in the
// browser can no longer swallow a submission. The response tells the client
// whether the lead actually reached a channel — the form only shows its success
// state when it did (issues.md A1).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD_LEN = 5000;
const REQUIRED = ["name", "phone", "email"] as const;

/** Fields we accept from the form. Anything else is ignored. */
const ALLOWED_FIELDS = [
  "name",
  // Accepted only so a page loaded before this change deployed still submits
  // successfully; both are folded into `name` below and never stored apart.
  "firstName",
  "lastName",
  "phone",
  "email",
  "dob",
  "insurer",
  "who",
  "message",
] as const;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_FIELD_LEN) : "";
}

/** CTM session ids are 24 hex characters with no dashes. A UUID is not one. */
const CTM_ID = /^[0-9a-f]{24}$/i;

/**
 * Resolve the CTM session id the lead should be filed against.
 *
 * `__ctmid` is a first-party cookie, so it rides along on this request whether or
 * not the client managed to read it. That second source is the point: a
 * client-side regression can no longer silently un-attribute every lead.
 *
 * Every failure here is logged, because all of them are invisible otherwise —
 * Clarion answers 200, the lead arrives, and only the link to the ad click is
 * missing.
 */
function resolveCtmVisitorSid(raw: unknown, request: Request): string | null {
  const fromClient = typeof raw === "string" && raw ? raw.slice(0, 128) : null;
  if (fromClient && CTM_ID.test(fromClient)) return fromClient;

  let fromCookie: string | null = null;
  const match = request.headers.get("cookie")?.match(/(?:^|;\s*)__ctmid=([^;]*)/);
  if (match) {
    try {
      fromCookie = decodeURIComponent(match[1]);
    } catch {
      fromCookie = match[1];
    }
  }

  if (fromCookie && CTM_ID.test(fromCookie)) {
    if (fromClient) {
      console.warn("[lead] browser sent a non-CTM session id; using the __ctmid cookie instead");
    }
    return fromCookie;
  }

  if (fromClient) {
    // Forwarded anyway so the value is visible in Clarion rather than lost, but
    // no visit will attach to it.
    console.warn("[lead] session id is not CTM-shaped and no __ctmid cookie — no visit will attach");
    return fromClient;
  }

  console.warn("[lead] no CTM session id — t.js is likely blocked or failed to load");
  return null;
}

function pickAttribution(raw: unknown, clickIdsRaw: unknown): LeadAttribution {
  const a = (raw ?? {}) as Record<string, unknown>;
  const utmRaw = (a.utm ?? null) as Record<string, unknown> | null;
  const utm: Record<string, string> = {};
  if (utmRaw && typeof utmRaw === "object") {
    for (const [k, v] of Object.entries(utmRaw)) {
      const s = str(v);
      if (s) utm[k.slice(0, 40)] = s;
    }
  }

  // Non-Google click ids, bounded the same way the utm map is: the endpoint is
  // public and unauthenticated, so the shape of anything from the client is
  // rebuilt here rather than passed through.
  const clickIdsIn = (clickIdsRaw ?? null) as Record<string, unknown> | null;
  const clickIds: Record<string, string> = {};
  if (clickIdsIn && typeof clickIdsIn === "object") {
    for (const k of ["fbclid", "msclkid", "gbraid", "wbraid"]) {
      const s = str(clickIdsIn[k]);
      if (s) clickIds[k] = s;
    }
  }

  return {
    pageUrl: str(a.pageUrl) || null,
    landingPageUrl: str(a.landingPageUrl) || null,
    referrer: str(a.referrer) || null,
    utm: Object.keys(utm).length ? utm : null,
    gclid: str(a.gclid) || null,
    clickIds: Object.keys(clickIds).length ? clickIds : null,
  };
}

/** Short, human-quotable reference so a lost lead can be traced in logs. */
function reference(): string {
  return `HMR-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const key of ALLOWED_FIELDS) {
    const v = str(body[key]);
    if (v) fields[key] = v;
  }

  // A client cached from before the single-name change posts firstName/lastName.
  // Fold them into `name` so an open tab mid-deploy still delivers its lead.
  if (!fields.name) {
    const legacy = [fields.firstName, fields.lastName].filter(Boolean).join(" ").trim();
    if (legacy) fields.name = legacy;
  }
  delete fields.firstName;
  delete fields.lastName;

  const missing = REQUIRED.filter((k) => !fields[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const variant: LeadVariant = body.variant === "insurance" ? "insurance" : "contact";

  const lead: LeadPayload = {
    reference: reference(),
    variant,
    receivedAt: new Date().toISOString(),
    fields,
    attribution: {
      ...pickAttribution(body.attribution, body.clickIds),
      userAgent: request.headers.get("user-agent"),
      ctmVisitorSid: resolveCtmVisitorSid(
        (body.attribution as Record<string, unknown> | undefined)?.ctmVisitorSid,
        request,
      ),
    },
    // Forwarded raw on purpose: deliverLead rebuilds it (sanitizeSession) as the
    // single choke point, so there is no second, drifting copy of those caps here.
    session: body.session,
  };

  const { delivered, results } = await deliverLead(lead);
  const summary = results.map((r) => `${r.channel}:${r.ok ? "ok" : `fail(${r.detail})`}`).join(" ");

  if (!delivered) {
    // Nothing accepted the lead. Log the full record — a noisy log entry is far
    // better than a lost enquiry, and this is the only remaining copy.
    // TODO(A1): replace this last-resort log with a durable store once a
    // persistence target is chosen, so recovery doesn't depend on log retention.
    console.error(
      `[lead] UNDELIVERED ${lead.reference} ${summary} :: ${JSON.stringify({
        variant: lead.variant,
        receivedAt: lead.receivedAt,
        fields: lead.fields,
        attribution: lead.attribution,
      })}`,
    );
    return NextResponse.json(
      { ok: false, error: "delivery_failed", reference: lead.reference },
      { status: 502 },
    );
  }

  // Delivered: log the reference and channel outcomes only — no personal data.
  console.log(`[lead] delivered ${lead.reference} variant=${lead.variant} ${summary}`);

  return NextResponse.json({ ok: true, reference: lead.reference });
}
