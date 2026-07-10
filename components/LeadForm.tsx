"use client";

import { useRef, useState } from "react";
import { IconArrow, IconCheck, IconShield } from "@/components/Icons";

declare global {
  interface Window {
    ClarionForms?: {
      submit: (opts: { form_key?: string; data?: Record<string, unknown> }) => Promise<Response>;
    };
  }
}

type Variant = "contact" | "insurance";

// Keys must match the form keys configured in the Clarion dashboard.
const CLARION_FORM_KEY: Record<Variant, string> = {
  insurance: "insurance_verification",
  contact: "contact",
};

export default function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const inFlight = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // Best-effort capture into Clarion — never blocks our own submit.
      try {
        await window.ClarionForms?.submit({
          form_key: CLARION_FORM_KEY[variant],
          data: { ...data, variant },
        });
      } catch {}

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant }),
      });
      if (!res.ok) throw new Error("failed");
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
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      {variant === "insurance" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date of birth" name="dob" type="date" required autoComplete="bday" />
          <Field label="Insurance provider" name="insurer" placeholder="e.g. Anthem, Aetna, Cigna" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/80">Who needs help?</label>
            <select
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
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink/80">
          How can we help? {variant === "contact" && <span className="text-ink/40">(optional)</span>}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink/35 focus:border-teal focus:ring-2 focus:ring-teal/30"
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
        <p className="text-sm text-red-600">
          Something went wrong. Please call us directly at (866) 393-5174 and we&apos;ll help right away.
        </p>
      )}

      <p className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-ink/50">
        <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
        Your information is 100% confidential and protected. Submitting this form does not create a
        provider-patient relationship.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink/35 focus:border-teal focus:ring-2 focus:ring-teal/30"
      />
    </div>
  );
}
