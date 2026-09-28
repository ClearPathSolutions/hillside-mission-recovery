import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  editorial,
  editorialPolicyBody,
  editorialPolicyReady,
  editorialPolicyServed,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_POLICY_URL,
} from "@/lib/editorial";
import PageHero from "@/components/PageHero";
import { ContentSidebar } from "@/components/Sidebar";
import { InsuranceBand } from "@/components/CTABands";

// Reads the package template from disk, so it must render at build time.
export const dynamic = "force-static";

const description = `How ${editorial.facilityName} researches, writes, clinically reviews and updates the health information on ${editorial.domain}.`;

export const metadata: Metadata = {
  // Absolute: the package specifies the full facility name, not the short
  // site.name the layout's title template appends.
  title: { absolute: `Editorial Policy | ${editorial.facilityName}` },
  description,
  alternates: { canonical: EDITORIAL_POLICY_PATH },
  openGraph: { title: `Editorial Policy | ${editorial.facilityName}`, description },
  ...(editorialPolicyReady ? {} : { robots: { index: false, follow: false } }),
};

export default function EditorialPolicyPage() {
  if (!editorialPolicyServed) notFound();
  const { html, toc } = editorialPolicyBody();

  return (
    <>
      <PageHero
        eyebrow={site.name}
        title="Editorial Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Editorial Policy" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${EDITORIAL_POLICY_URL}#webpage`,
            url: EDITORIAL_POLICY_URL,
            name: "Editorial Policy",
            description,
            about: { "@id": `${site.url}/#organization` },
            ...(editorial.lastReviewed ? { lastReviewed: editorial.lastReviewed } : {}),
            inLanguage: "en-US",
          }),
        }}
      />
      <section className="bg-cream">
        <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0 max-w-2xl">
            {/* suppressHydrationWarning: CTM rewrites the phone link inside. */}
            <div
              className="clarion-prose"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div>
            <ContentSidebar toc={toc} />
          </div>
        </div>
      </section>
      <InsuranceBand />
    </>
  );
}
