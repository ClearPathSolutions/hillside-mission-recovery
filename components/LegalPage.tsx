import type { Metadata } from "next";
import { site } from "@/lib/site";
import { metaTitle } from "@/lib/content";
import { defaultOgImage } from "@/lib/media";
import { LEGAL_PAGES, legalPageBody, type LegalSlug } from "@/lib/legal";
import PageHero from "@/components/PageHero";
import { ContentSidebar } from "@/components/Sidebar";
import { InsuranceBand } from "@/components/CTABands";

/** Metadata for a legal page, titled the way the migrated privacy policy was. */
export function legalMetadata(slug: LegalSlug, description: string): Metadata {
  const { title, path } = LEGAL_PAGES[slug];
  return {
    title: metaTitle(title),
    description,
    openGraph: { title, description, images: [defaultOgImage], type: "website" },
    alternates: { canonical: path },
  };
}

/**
 * Shell for the legal pages: the editorial policy's layout (hero, prose body,
 * sidebar, insurance band). See lib/legal.ts for where the copy comes from.
 */
export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const { title } = LEGAL_PAGES[slug];
  const { html, toc } = legalPageBody(slug);

  return (
    <>
      <PageHero
        eyebrow={site.name}
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
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
