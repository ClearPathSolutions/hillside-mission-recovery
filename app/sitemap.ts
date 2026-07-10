import type { MetadataRoute } from "next";
import raw from "@/data/content.json";
import { site } from "@/lib/site";

type DocLite = { slug: string; type: string; date: string | null; modified: string | null };

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = Object.values(raw as unknown as Record<string, DocLite>);
  return docs
    .filter((d) => d.slug !== "404-2")
    .map((d) => ({
      url: `${site.url}/${d.slug}`.replace(/\/$/, "") || site.url,
      lastModified: d.modified || d.date || undefined,
      changeFrequency: d.type === "post" ? "monthly" : "weekly",
      priority: d.slug === "" ? 1 : d.type === "page" ? 0.8 : 0.6,
    }));
}
