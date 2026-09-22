import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { jointCommissionSeal } from "@/lib/media";
import { IconLinkedIn, IconInstagram, IconFacebook } from "@/components/Icons";
import { footerNav } from "@/lib/nav";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-ink text-cream/80">
      {/* Pre-footer CTA band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="eyebrow eyebrow-center !text-teal-bright md:justify-start">Start today</p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">You don&apos;t have to do this alone.</h2>
            <p className="mt-2 max-w-xl text-cream/70">
              Confidential help is available 24/7. Reach out and we&apos;ll walk you through every step.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn btn-primary" suppressHydrationWarning>
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-light">
              Send a Message
            </Link>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Image
            src="/logo-white.png"
            alt={site.fullName}
            width={600}
            height={294}
            className="h-11 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
            A luxury, {site.beds}-bed drug &amp; alcohol rehab in Mission Viejo, California — providing
            accredited medical detox and residential treatment with care that truly cares.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href={site.phoneHref} className="flex items-center gap-2.5 text-cream hover:text-teal-bright transition-colors" suppressHydrationWarning>
              <span className="text-teal-bright">◆</span> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-teal-bright transition-colors">
              <span className="text-teal-bright">◆</span> {site.email}
            </a>
            <p className="flex items-start gap-2.5">
              <span className="text-teal-bright">◆</span> {site.address.full}
            </p>
          </div>
          <a
            href={site.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cream transition-colors hover:border-teal-bright hover:text-white"
          >
            <span className="text-gold" aria-hidden="true">★★★★★</span>
            Review us on Google
          </a>

          {/* Accreditation. The footer previously only asserted this in text in
              the bottom bar; an unlinked, unillustrated certification claim is
              exactly what the audit flagged elsewhere in the portfolio (V0070),
              so the mark is shown and linked to the public Quality Check record. */}
          <a
            href="https://www.qualitycheck.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 transition-opacity hover:opacity-100 focus-visible:opacity-100 opacity-90"
          >
            <Image
              src={jointCommissionSeal.src}
              alt={jointCommissionSeal.alt}
              width={jointCommissionSeal.w}
              height={jointCommissionSeal.h}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <span className="max-w-[10rem] text-xs leading-snug text-cream/60">
              Accredited by The Joint Commission — verify our record
            </span>
          </a>

          <ul className="mt-7 flex items-center gap-3">
            {[
              { href: site.social.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
              { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
              { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-cream/70 transition-colors hover:border-teal-bright hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav columns */}
        {footerNav.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/90">{col.heading}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-cream/65 transition-colors hover:text-teal-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/admissions#verify-insurance" className="hover:text-cream">Verify Insurance</Link>
            <Link href="/contact" className="hover:text-cream">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
