import { site } from "@/lib/site";
import type { PostMeta } from "@/lib/content";
import { CATEGORIES } from "@/lib/content";

/**
 * Server-side Clarion blog feed integration.
 *
 * Instead of the client-side embed script (which injects into a
 * `data-clarion-blog` div as a separate block), we fetch the feed as data on
 * the server and merge Clarion posts into the site's own post list so they sort
 * and render identically to curated posts. Clarion posts get a `blog/<slug>`
 * slug so they route to app/blog/[slug]/page.tsx via PostCard's `/${slug}` link.
 */

const { siteKey, api } = site.widgets.clarion;

// Revalidate the feed hourly (matches Clarion's own ~1h cache guidance).
const REVALIDATE_SECONDS = 3600;

export type ClarionFeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  author_name: string | null;
  published_at: string | null;
  seo_meta?: { title?: string; description?: string };
};

export type ClarionFullPost = ClarionFeedPost & {
  body_html: string;
};

/** Rough read-time estimate from HTML/text length (~200 wpm). */
function estimateReadMins(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Keyword-based category derivation, mirroring lib/content deriveCategory. */
function deriveClarionCategory(text: string): string {
  const t = text.toLowerCase();
  if (/(mental|anxiety|depress|dual|co-occurring|panic|shame|guilt)/.test(t)) return "Mental Health";
  if (/(insurance|pay|cost|aetna|cigna|magellan|anthem|bcbs)/.test(t)) return "Paying for Rehab";
  if (/(detox|rehab|inpatient|outpatient|treatment|therapy|medication|program|intervention)/.test(t))
    return "Treatment";
  if (/(recovery|sober|relapse|aftercare|support|habits|hobbies|community|holiday)/.test(t)) return "Recovery";
  return "Addiction";
}

function toMeta(p: ClarionFeedPost, bodyForEstimate = ""): PostMeta {
  return {
    // Route Clarion posts through /blog/<slug>; PostCard links to `/${slug}`.
    slug: `blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    date: p.published_at,
    dateLabel: p.published_at
      ? new Date(p.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    ogImage: p.cover_image_url,
    category: deriveClarionCategory(`${p.title} ${p.excerpt} ${p.slug}`),
    readMins: estimateReadMins(bodyForEstimate || p.excerpt),
  };
}

/** Fetch the Clarion feed and normalize to the site's PostMeta shape. Never throws. */
export async function getClarionPosts(): Promise<PostMeta[]> {
  try {
    const res = await fetch(`${api}/blog/public/feed?site_key=${encodeURIComponent(siteKey)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: ClarionFeedPost[] };
    return (data.posts ?? []).map((p) => toMeta(p));
  } catch {
    return [];
  }
}

/** Fetch a single Clarion post's full body. Returns null if not found. Never throws. */
export async function getClarionPost(slug: string): Promise<ClarionFullPost | null> {
  try {
    const res = await fetch(
      `${api}/blog/public/post?site_key=${encodeURIComponent(siteKey)}&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    return (await res.json()) as ClarionFullPost;
  } catch {
    return null;
  }
}

/** Meta for a single full post (with body-based read-time). */
export function clarionPostMeta(p: ClarionFullPost): PostMeta {
  return toMeta(p, p.body_html);
}

/** Category derivation exposed for the single-post header. */
export function clarionCategory(p: ClarionFeedPost): string {
  return deriveClarionCategory(`${p.title} ${p.excerpt} ${p.slug}`);
}

// Referenced so a future taxonomy change to CATEGORIES stays in sync here.
export const CLARION_CATEGORIES = CATEGORIES;
