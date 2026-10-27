import type { MetadataRoute } from "next";
import raw from "@/data/content.json";
import { NOINDEX_SLUGS } from "@/lib/content";
import { getClarionPosts } from "@/lib/clarion";
import { crawlHost } from "@/lib/site";
import { editorialPolicyReady, EDITORIAL_POLICY_PATH } from "@/lib/editorial";
import { LEGAL_PAGES } from "@/lib/legal";

type DocLite = { slug: string; type: string; date: string | null; modified: string | null };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = crawlHost();
  const abs = (slug: string) => `${host}/${slug}`.replace(/\/$/, "");
  const docs = Object.values(raw as unknown as Record<string, DocLite>);

  const pages: MetadataRoute.Sitemap = docs
    .filter((d) => d.slug !== "404-2")
    // A6 — noindex pages don't belong in the sitemap.
    .filter((d) => !NOINDEX_SLUGS.has(d.slug))
    .map((d) => ({
      url: abs(d.slug),
      lastModified: d.modified || d.date || undefined,
      changeFrequency: d.type === "post" ? "monthly" : "weekly",
      priority: d.slug === "" ? 1 : d.type === "page" ? 0.8 : 0.6,
    }));

  // V0059 — Clarion-managed posts render at /blog/<slug> and were live (HTTP 200)
  // but absent from the sitemap, so they were never submitted for indexing.
  const clarion = await getClarionPosts();
  const clarionEntries: MetadataRoute.Sitemap = clarion.map((p) => ({
    url: abs(p.slug),
    lastModified: p.date || undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The /blog/page/N archive pages are left out: every post they link to is
  // listed above, and paginated lists are thin pages not worth submitting.

  // Bespoke route with no content.json doc; listed only once it may be indexed.
  const editorialEntries: MetadataRoute.Sitemap = editorialPolicyReady
    ? [{ url: abs(EDITORIAL_POLICY_PATH.slice(1)), changeFrequency: "yearly", priority: 0.3 }]
    : [];

  // Privacy policy, NPP, SMS terms and terms of service: bespoke routes with no content.json doc.
  const legalEntries: MetadataRoute.Sitemap = Object.values(LEGAL_PAGES).map((l) => ({
    url: abs(l.path.slice(1)),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...pages, ...legalEntries, ...clarionEntries, ...editorialEntries];
}
