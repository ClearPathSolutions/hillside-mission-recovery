import type { Metadata } from "next";
import Link from "next/link";
import { gallery, facilityHero } from "@/lib/media";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { InsuranceBand } from "@/components/CTABands";
import { IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tour Our Facility — Photos & Virtual Tour",
  description:
    "Explore Hillside Mission Recovery — a luxury drug & alcohol rehab in Mission Viejo, CA. Take a photo tour of our private, home-like residence and grounds.",
};

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="World-class treatment"
        title="Tour our facility"
        subtitle="Affordable treatment in a luxury setting. When you feel safe and focused, recovery thrives."
        image={facilityHero}
        crumbs={[{ label: "Home", href: "/" }, { label: "Tour" }]}
      />

      <section className="bg-cream">
        <div className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-center justify-center">Explore Hillside Mission Recovery</p>
            <h2 className="mt-4 text-3xl md:text-4xl">A calm, private place to begin again</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              The key to lasting recovery is choosing the right treatment facility. Hillside Mission provides
              holistic care for addiction and co-occurring disorders in a beautiful, home-like setting.
              Explore our residence below — then get in touch when you&apos;re ready to get your life back.
            </p>
          </div>

          <div className="mt-14">
            <Gallery images={gallery} />
          </div>

          <div className="reveal mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/admissions" className="btn btn-primary">
              Verify your insurance <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Schedule a call
            </Link>
          </div>
        </div>
      </section>

      <InsuranceBand />
    </>
  );
}
