import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { insuranceLogos, accreditations } from "@/lib/media";
import { IconPhone, IconArrow, IconShield, IconCare } from "@/components/Icons";

/** "Your Health Insurance Can Pay for Rehab" — appears near the bottom of most pages */
export function InsuranceBand() {
  return (
    <section className="bg-cream-deep">
      <div className="container-x py-16 md:py-20">
        <div className="reveal card overflow-hidden md:grid md:grid-cols-[1.1fr_1fr]">
          <div className="p-8 md:p-12">
            <p className="eyebrow">Did you know?</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Your health insurance can pay for rehab.</h2>
            <p className="mt-4 max-w-md text-ink/70">
              Most major insurance providers help cover the cost of treatment at {site.fullName}. Verify
              your benefits in minutes — it&apos;s free, confidential, and comes with no obligation.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/admissions" className="btn btn-primary">
                Verify Insurance <IconArrow className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                <IconPhone className="h-4 w-4" /> {site.phone}
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 border-t border-line bg-white p-8 md:border-l md:border-t-0 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/45">
              In-network &amp; accepted plans
            </p>
            <div className="grid grid-cols-3 items-center gap-x-6 gap-y-5">
              {insuranceLogos.map((l) => (
                <Image
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={l.h}
                  className="h-8 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Help for Myself / Help for a Loved One" two-card band */
export function HelpBand() {
  const cards = [
    {
      icon: IconCare,
      kicker: "Don't wait.",
      title: "Help for Myself",
      text: "Get personalized addiction treatment at Hillside Mission — a modern, private program in Mission Viejo dedicated to your success in recovery.",
      cta: "Start My Recovery",
      href: "/admissions",
    },
    {
      icon: IconShield,
      kicker: "We're here for you.",
      title: "Help for a Loved One",
      text: "Is someone you love struggling with drugs or alcohol? Unsure how to help? Let us help your family heal and recover together.",
      cta: "Help Someone I Love",
      href: "/contact",
    },
  ];
  return (
    <section className="bg-ink text-white">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/[0.07] md:p-10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/15 text-teal-bright">
                <c.icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-teal-bright">{c.kicker}</p>
              <h3 className="mt-2 text-2xl text-white md:text-3xl">{c.title}</h3>
              <p className="mt-3 text-cream/70">{c.text}</p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-teal-bright"
              >
                {c.cta} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Accreditation / trust strip */
export function TrustStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? "text-cream/70" : "text-ink/60"}>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {accreditations.map((l) => (
          <Image
            key={l.src}
            src={l.src}
            alt={l.alt}
            width={l.w}
            height={l.h}
            className={`h-14 w-auto object-contain ${dark ? "opacity-80" : "opacity-90"}`}
          />
        ))}
        <div className="flex items-center gap-2 text-sm font-medium">
          <IconShield className="h-5 w-5 text-teal" />
          Joint Commission Gold Seal Accredited
        </div>
      </div>
    </div>
  );
}
