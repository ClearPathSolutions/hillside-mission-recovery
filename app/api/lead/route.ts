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
const REQUIRED = ["firstName", "phone", "email"] as const;

/** Fields we accept from the form. Anything else is ignored. */
const ALLOWED_FIELDS = [
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

function pickAttribution(raw: unknown): LeadAttribution {
  const a = (raw ?? {}) as Record<string, unknown>;
  const utmRaw = (a.utm ?? null) as Record<string, unknown> | null;
  const utm: Record<string, string> = {};
  if (utmRaw && typeof utmRaw === "object") {
    for (const [k, v] of Object.entries(utmRaw)) {
      const s = str(v);
      if (s) utm[k.slice(0, 40)] = s;
    }
  }
  return {
    pageUrl: str(a.pageUrl) || null,
    landingPageUrl: str(a.landingPageUrl) || null,
    referrer: str(a.referrer) || null,
    utm: Object.keys(utm).length ? utm : null,
    gclid: str(a.gclid) || null,
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
      ...pickAttribution(body.attribution),
      userAgent: request.headers.get("user-agent"),
    },
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
