import type { MetadataRoute } from "next";
import raw from "@/data/content.json";
import { NOINDEX_SLUGS, archiveTotalPages, getAllPosts } from "@/lib/content";
import { getClarionPosts } from "@/lib/clarion";
import { site } from "@/lib/site";

type DocLite = { slug: string; type: string; date: string | null; modified: string | null };

const abs = (slug: string) => `${site.url}/${slug}`.replace(/\/$/, "") || site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // V0061 — the server-rendered blog archive pages.
  const totalPages = archiveTotalPages(getAllPosts().length + clarion.length);
  const archive: MetadataRoute.Sitemap = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: abs(`blog/page/${i + 2}`),
    changeFrequency: "weekly",
    priority: 0.3,
  }));

  return [...pages, ...clarionEntries, ...archive];
}
