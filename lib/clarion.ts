import { site } from "@/lib/site";
import { facilityPhotoFor } from "@/lib/media";
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

/**
 * Cap how long we wait on Clarion.
 *
 * Both /sitemap.xml and /blog await this feed during the build, and Next kills
 * a static route that takes over 60s. With no cap, one slow Clarion response
 * fails the entire production deploy — which is exactly what happened to
 * commit a35a65f. The callers already degrade to an empty list on error; they
 * just never got the chance.
 *
 * Implemented as a race rather than an AbortSignal so the fetch options stay
 * untouched and Next keeps caching/revalidating the response normally.
 */
const FEED_TIMEOUT_MS = 10_000;

const TIMEOUT = Symbol("clarion-timeout");

async function withTimeout<T>(p: Promise<T>, label: string): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const guard = new Promise<typeof TIMEOUT>((resolve) => {
    timer = setTimeout(() => resolve(TIMEOUT), FEED_TIMEOUT_MS);
  });
  try {
    const r = await Promise.race([p, guard]);
    if (r === TIMEOUT) {
      // Visible on purpose: a degraded build silently missing every Clarion
      // post looks identical to Clarion having no posts.
      console.warn(`[clarion] ${label} exceeded ${FEED_TIMEOUT_MS}ms — continuing without it`);
      return null;
    }
    return r as T;
  } finally {
    clearTimeout(timer);
  }
}

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

/**
 * Use the cover image the Clarion author chose.
 *
 * This function used to overwrite every cover with a photo from the approved
 * facility set, on the reasoning that Clarion covers were generic Unsplash
 * stock and a treatment site should only show its own building. Covers are now
 * first-party branded artwork produced for the post, and a blanket swap cannot
 * tell the two apart — it was discarding purpose-made art and substituting an
 * unrelated photo of the house. The author's choice is authoritative.
 *
 * A facility photo is still used when Clarion sends no cover at all. That fills
 * a gap rather than overriding a decision, and it keeps the card from falling
 * back to the plain text placeholder in PostCard.
 *
 * Note the cover host must be permitted by the CSP in next.config.mjs to render
 * at all: api.clarionlabs.ai (Clarion uploads) and images.unsplash.com are
 * allowed today. A cover pointed at some other host will be blocked, so add the
 * host there if Clarion ever starts serving from a new CDN.
 */
function withAuthorCover<T extends ClarionFeedPost>(p: T): T {
  return p.cover_image_url ? p : { ...p, cover_image_url: facilityPhotoFor(p.slug) };
}

/** Fetch the Clarion feed and normalize to the site's PostMeta shape. Never throws. */
export async function getClarionPosts(): Promise<PostMeta[]> {
  try {
    const res = await withTimeout(
      fetch(`${api}/blog/public/feed?site_key=${encodeURIComponent(siteKey)}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      "blog feed",
    );
    if (!res || !res.ok) return [];
    const data = (await res.json()) as { posts?: ClarionFeedPost[] };
    return (data.posts ?? []).map((p) => toMeta(withAuthorCover(p)));
  } catch {
    return [];
  }
}

/** Fetch a single Clarion post's full body. Returns null if not found. Never throws. */
export async function getClarionPost(slug: string): Promise<ClarionFullPost | null> {
  try {
    const res = await withTimeout(
      fetch(
        `${api}/blog/public/post?site_key=${encodeURIComponent(siteKey)}&slug=${encodeURIComponent(slug)}`,
        { next: { revalidate: REVALIDATE_SECONDS } },
      ),
      `post ${slug}`,
    );
    if (!res || !res.ok) return null;
    return withAuthorCover((await res.json()) as ClarionFullPost);
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

export type TocItem = { id: string; text: string };

// Same slug logic as ContentBlocks.slugifyHeading, kept local to avoid a
// lib -> components import. Must stay in sync so anchors match site convention.
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Strip tags and decode the handful of entities Clarion emits, for TOC text. */
function headingText(inner: string): string {
  return inner
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/gi, "")
    .trim();
}

/**
 * Inject `id` + `scroll-mt` onto <h2>/<h3> in the feed's body_html so the
 * sidebar TOC can link to them, and return the level-2 TOC (matching the
 * curated ArticlePage, which lists only h2 sections). Ids are deduped.
 */
export function processBodyHtml(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  const withIds = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_m, tag: string, attrs: string, inner: string) => {
      const text = headingText(inner);
      let id = slugifyHeading(text) || "section";
      const n = seen.get(id) ?? 0;
      seen.set(id, n + 1);
      if (n > 0) id = `${id}-${n}`;
      if (tag.toLowerCase() === "h2") toc.push({ id, text });
      // Preserve any existing attrs; add our id + scroll offset for the sticky header.
      return `<${tag}${attrs} id="${id}" style="scroll-margin-top:7rem">${inner}</${tag}>`;
    },
  );

  // Clarion emits inline body images as bare `<img src="...">` — no alt, and no
  // loading hint. The tag is injected via dangerouslySetInnerHTML, so next/image
  // never sees it and cannot supply either. Screen readers would otherwise
  // announce the raw URL, so an empty alt marks them as decorative (the posts
  // carry no caption text to promote), and lazy-loading keeps below-the-fold
  // article images off the critical path.
  const withImgAttrs = withIds.replace(/<img\s([^>]*?)\/?>/gi, (_m, attrs: string) => {
    let out = attrs.trim();
    // Anchored to an attribute boundary so `data-alt=` or `srcset=` are not
    // mistaken for the attribute being tested.
    if (!/(^|\s)alt\s*=/i.test(out)) out += ' alt=""';
    if (!/(^|\s)loading\s*=/i.test(out)) out += ' loading="lazy"';
    if (!/(^|\s)decoding\s*=/i.test(out)) out += ' decoding="async"';
    return `<img ${out}>`;
  });

  return { html: withImgAttrs, toc };
}

// Referenced so a future taxonomy change to CATEGORIES stays in sync here.
export const CLARION_CATEGORIES = CATEGORIES;
