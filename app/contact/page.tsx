import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { IconPhone, IconMail, IconPin, IconClock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Admissions",
  description:
    "Reach out to Hillside Mission Recovery in Mission Viejo, CA. Call (866) 393-5174 for a confidential conversation, or send us a message — help is available 24/7.",
};

export default function ContactPage() {
  const details = [
    { Icon: IconPhone, label: "Call us", value: site.phone, href: site.phoneHref, note: "Confidential, 24/7" },
    { Icon: IconMail, label: "Email", value: site.contactEmail, href: `mailto:${site.contactEmail}`, note: "We reply quickly" },
    { Icon: IconPin, label: "Visit", value: site.address.full, note: "Orange County, California" },
    { Icon: IconClock, label: "Availability", value: "Open 24 hours", note: "Every day of the week" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Reach out & ask for help"
        title="Contact us"
        subtitle="Whether you have a question or you're ready to begin, we're here. Every conversation is private and judgment-free."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-cream">
        <div className="container-x py-16 md:py-24">
          {/* Detail cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d) => {
              const inner = (
                <>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal">
                    <d.Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink/45">{d.label}</p>
                  <p className="mt-1 font-medium text-ink">{d.value}</p>
                  <p className="text-sm text-ink/55">{d.note}</p>
                </>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="reveal card card-hover block p-6">
                  {inner}
                </a>
              ) : (
                <div key={d.label} className="reveal card p-6">
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Form + map */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="reveal card p-7 md:p-9">
              <h2 className="text-2xl md:text-3xl">Send us a message</h2>
              <p className="mt-2 text-ink/65">
                Have a question or want to learn more about {site.fullName}? Fill out the form and we&apos;ll
                be in touch.
              </p>
              <div className="mt-7">
                <LeadForm variant="contact" />
              </div>
            </div>

            <div className="reveal overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <iframe
                title="Map to Hillside Mission Recovery"
                src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
                className="h-72 w-full lg:h-full lg:min-h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
