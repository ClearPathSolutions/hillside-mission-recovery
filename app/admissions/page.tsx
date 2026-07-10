import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { insuranceLogos } from "@/lib/media";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { IconPhone, IconPlan, IconShield, IconCare } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Admissions & Insurance Verification",
  description:
    "Starting treatment at Hillside Mission is simple. Verify your insurance in minutes — most major providers help cover the cost of rehab in Mission Viejo, CA.",
};

const steps = [
  { Icon: IconPhone, title: "Reach out", text: "Call us or complete the form. We'll listen, answer your questions, and understand your situation — confidentially." },
  { Icon: IconShield, title: "Verify benefits", text: "We coordinate directly with your insurer to confirm coverage and find the lowest possible cost for your care." },
  { Icon: IconPlan, title: "Build your plan", text: "Our clinical team designs an individualized treatment plan around your needs, history, and goals." },
  { Icon: IconCare, title: "Begin healing", text: "Arrive at our Mission Viejo residence and start your journey with a team that truly cares." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Drug & Alcohol Rehab"
        title="Freedom from addiction happens here."
        subtitle="Getting started is easier than you think. Most major insurance providers help cover the cost of treatment at Hillside Mission — let us handle the details."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />

      {/* Steps */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-center justify-center">Get help now</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Four simple steps to care</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="reveal card relative p-7" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="absolute right-6 top-5 font-display text-4xl text-teal-soft">{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-teal-bright">
                  <s.Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verify form + reassurance */}
      <section className="bg-ink text-white">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="eyebrow !text-teal-bright">Verify your insurance</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Check your coverage — free & confidential.</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">
              Fill out the form and our staff will coordinate with you to ensure you find the lowest possible
              price for your addiction treatment. There&apos;s no obligation, and your information stays
              private.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-cream/50">
                Accepted providers include
              </p>
              <div className="mt-4 grid grid-cols-3 items-center gap-x-6 gap-y-5 sm:grid-cols-5">
                {insuranceLogos.map((l) => (
                  <Image
                    key={l.src}
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    className="h-7 w-auto object-contain opacity-80 brightness-0 invert"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-cream/60">
                Don&apos;t see your plan? We work with most major providers — just ask.
              </p>
            </div>

            <div className="mt-8">
              <a href={site.phoneHref} className="btn btn-primary">
                <IconPhone className="h-4 w-4" /> Prefer to call? {site.phone}
              </a>
            </div>
          </div>

          <div className="reveal rounded-2xl bg-cream p-7 text-ink md:p-9">
            <h3 className="text-2xl">Verify my benefits</h3>
            <p className="mt-2 text-ink/65">Takes about 2 minutes. A specialist will follow up personally.</p>
            <div className="mt-6">
              <LeadForm variant="insurance" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
