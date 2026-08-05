"use client";

import { useId, useRef, useState } from "react";
import { IconArrow, IconCheck, IconShield } from "@/components/Icons";
import { site } from "@/lib/site";

type Variant = "contact" | "insurance";

// Attribution keys shared with Clarion's forms-capture snippet, so a lead
// submitted through this form carries the same first-touch data the widget
// would have recorded.
const FT_LANDING = "clarion_ft_landing";
const FT_REFERRER = "clarion_ft_referrer";

function session(key: string, value?: string): string | null {
  try {
    if (value !== undefined) {
      sessionStorage.setItem(key, value);
      return value;
    }
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Record first-touch landing page + referrer once per session. */
function rememberFirstTouch() {
  if (session(FT_LANDING) != null) return;
  session(FT_LANDING, location.href);
  const ref = document.referrer || "";
  session(FT_REFERRER, ref && ref.indexOf(location.origin) !== 0 ? ref : "");
}

function collectAttribution() {
  if (typeof window === "undefined") return {};
  rememberFirstTouch();

  let params: URLSearchParams | null = null;
  try {
    params = new URLSearchParams(location.search);
  } catch {}

  const utm: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"]) {
    const v = params?.get(`utm_${k}`);
    if (v) utm[k] = v;
  }

  const referrer = session(FT_REFERRER);
  return {
    pageUrl: location.href,
    landingPageUrl: session(FT_LANDING) || location.href,
    referrer: referrer || null,
    utm: Object.keys(utm).length ? utm : null,
    gclid: params?.get("gclid") || null,
  };
}

export default function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const inFlight = useRef(false);
  // Unique per instance so two forms on one page don't emit duplicate ids.
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // Delivery is server-side (see app/api/lead/route.ts). We deliberately do
      // NOT call window.ClarionForms.submit() here — the server posts to Clarion
      // itself, so an ad blocker can't lose the lead and Clarion isn't sent the
      // same submission twice.
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant, attribution: collectAttribution() }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      // Only claim success when the server confirms a channel accepted the lead.
      if (!res.ok || !json?.ok) throw new Error("undelivered");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal-soft/50 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal text-white">
          <IconCheck className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-2xl text-ink">Thank you for reaching out.</h3>
        <p className="mt-2 text-ink/70">
          Your message is confidential. A member of our admissions team will contact you shortly — usually
          within the hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={fieldId("firstName")} label="First name" name="firstName" required autoComplete="given-name" />
        <Field id={fieldId("lastName")} label="Last name" name="lastName" required autoComplete="family-name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={fieldId("phone")} label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field id={fieldId("email")} label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      {variant === "insurance" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={fieldId("dob")} label="Date of birth" name="dob" type="date" required autoComplete="bday" />
          <Field
            id={fieldId("insurer")}
            label="Insurance provider"
            name="insurer"
            placeholder="e.g. Anthem, Aetna, Cigna"
          />
          <div>
            <label htmlFor={fieldId("who")} className="mb-1.5 block text-sm font-medium text-ink/80">
              Who needs help?
            </label>
            <select
              id={fieldId("who")}
              name="who"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/30"
            >
              <option>Myself</option>
              <option>A loved one</option>
              <option>A client / patient</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={fieldId("message")} className="mb-1.5 block text-sm font-medium text-ink/80">
          How can we help? {variant === "contact" && <span className="text-ink/70">(optional)</span>}
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink/70 focus:border-teal focus:ring-2 focus:ring-teal/30"
          placeholder="Tell us a little about your situation…"
        />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
        {status === "sending" ? (
          "Sending…"
        ) : (
          <>
            {variant === "insurance" ? "Verify My Benefits" : "Send Message"} <IconArrow className="h-4 w-4" />
          </>
        )}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          We couldn&apos;t send your message. Please call us directly at{" "}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phone}
          </a>{" "}
          and we&apos;ll help right away.
        </p>
      )}

      <p className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-ink/70">
        <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
        Your information is 100% confidential and protected. Submitting this form does not create a
        provider-patient relationship.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink/70 focus:border-teal focus:ring-2 focus:ring-teal/30"
      />
    </div>
  );
}
