import raw from "@/data/content.json";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; rows: string[][] }
  // R10 — width/height are the image's true intrinsic size, baked in from the
  // files in public/images so the layout reserves the right box. They were
  // previously hard-coded to 1200x800 for every image, which is wrong for most
  // of them (e.g. ministry-youth.jpg is 588x570, MonicaHMS-scaled.jpeg is portrait).
  | { type: "image"; src: string; alt: string; caption: string; width?: number; height?: number };

export type Doc = {
  slug: string;
  type: "page" | "post" | "staff";
  title: string;
  h1: string;
  description: string;
  date: string | null;
  modified: string | null;
  ogImage: string | null;
  category: string | null;
  excerpt: string;
  readMins: number;
  blockCount: number;
  blocks: Block[];
};

const docs = raw as unknown as Record<string, Doc>;

// Pages that have their own bespoke route — excluded from the catch-all renderer.
export const HANDBUILT = new Set([
  "home", "", "about", "contact", "admissions", "tour", "blog", "404-2",
]);

// A6 — conversion pages should neither rank nor pollute conversion tracking.
// Kept here so app/sitemap.ts and the catch-all metadata agree on one list.
export const NOINDEX_SLUGS = new Set(["thank-you"]);

// Pages whose text is published first by Quadrant Health Group and syndicated
// verbatim to every facility site. Thirteen near-identical copies otherwise
// compete with each other, so these point their canonical at the QHG original
// instead of at themselves. Keyed by full doc slug — a slug that is absent
// (every other staff profile included) keeps its own self-canonical.
export const CANONICAL_AT_PARENT: Record<string, string> = {
  "staff/pamela-tambini": "https://www.quadranthealthgroup.com/team/pamela-tambini/",
};

export function keyToSlug(key: string): string {
  return key === "home" ? "" : key;
}

export function getDoc(slug: string): Doc | null {
  const key = slug === "" ? "home" : slug;
  return docs[key] ?? null;
}

export function getDocBySegments(segments: string[]): Doc | null {
  return getDoc(segments.join("/"));
}

// Trailing CTA sections that we render as dedicated bands (HelpBand / InsuranceBand),
// so strip them from the parsed body to avoid duplication.
const CTA_HEADING = /^(help for myself|help for (a )?loved.?-?one|(your )?health insurance can pay for rehab)/i;
const CTA_KICKER = /^(did you know\??|don.?t wait\.?|we.?re here for you\.?)$/i;

// R6 — "Don't Wait Any Longer" headed a CALL NOW / TEXT US button band on the
// WordPress original. The scrape kept the heading but dropped the buttons, so it
// renders as a stray line of body text on 27 pages. The replacement the row asks
// for — the "You don't have to do this alone." section — is the sitewide footer
// CTA, which already appears on every page.
const DROP_LINE = /^don.?t wait any longer\.?$/i;

export function cleanContentBlocks(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let skipping = false;
  for (const b of blocks) {
    if (b.type === "paragraph" && DROP_LINE.test(b.text.trim())) continue;
    if (b.type === "heading" && DROP_LINE.test(b.text.trim())) continue;
    if (b.type === "heading") {
      if (CTA_HEADING.test(b.text)) {
        skipping = true;
        // drop an immediately-preceding kicker paragraph ("Did you know?", "Don't Wait.")
        while (out.length) {
          const last = out[out.length - 1];
          if (last.type === "paragraph" && CTA_KICKER.test(last.text.trim())) out.pop();
          else break;
        }
        continue;
      }
      skipping = false;
    }
    if (skipping) continue;
    out.push(b);
  }
  return out;
}

// Derive a topical category from title/slug keywords (source data lacks clean taxonomy).
export function deriveCategory(doc: Doc): string {
  if (doc.category) return doc.category;
  const t = (doc.title + " " + doc.slug).toLowerCase();
  if (/(mental|anxiety|depress|dual|co-occurring|panic|shame|guilt)/.test(t)) return "Mental Health";
  if (/(insurance|pay|cost|aetna|cigna|magellan|anthem|bcbs)/.test(t)) return "Paying for Rehab";
  if (/(detox|rehab|inpatient|outpatient|treatment|therapy|medication|program|intervention)/.test(t)) return "Treatment";
  if (/(recovery|sober|relapse|aftercare|support|habits|hobbies|community|holiday)/.test(t)) return "Recovery";
  return "Addiction";
}

export const CATEGORIES = ["Addiction", "Recovery", "Treatment", "Mental Health", "Paying for Rehab"];

// V0061 — blog pagination arithmetic, shared by /blog, /blog/page/[page] and
// the sitemap so no post falls between the index and the archive.
//
// /blog server-renders INDEX_COUNT posts (1 featured + BLOG_LIST_INITIAL cards
// in BlogList); the archive picks up from there at PER_PAGE per page.
export const BLOG_LIST_INITIAL = 9;
export const INDEX_COUNT = 1 + BLOG_LIST_INITIAL;
export const PER_PAGE = 12;

/** Total pages including /blog itself as page 1. */
export function archiveTotalPages(totalPosts: number): number {
  return 1 + Math.max(0, Math.ceil((totalPosts - INDEX_COUNT) / PER_PAGE));
}

/** Posts shown on archive page `n` (n >= 2). */
export function archiveSlice<T>(posts: T[], n: number): T[] {
  const start = INDEX_COUNT + (n - 2) * PER_PAGE;
  return posts.slice(start, start + PER_PAGE);
}

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
  dateLabel: string;
  ogImage: string | null;
  category: string;
  readMins: number;
};

function toMeta(doc: Doc): PostMeta {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    dateLabel: doc.date
      ? new Date(doc.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "",
    ogImage: doc.ogImage,
    category: deriveCategory(doc),
    readMins: doc.readMins,
  };
}

export function getAllPosts(): PostMeta[] {
  return Object.values(docs)
    .filter((d) => d.type === "post")
    .map(toMeta)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getRecentPosts(n = 3): PostMeta[] {
  return getAllPosts().slice(0, n);
}

export function getRelatedPosts(slug: string, category: string, n = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const sameCat = all.filter((p) => p.category === category);
  return [...sameCat, ...all.filter((p) => p.category !== category)].slice(0, n);
}

// All slugs handled by the catch-all route (everything except bespoke pages).
export function getCatchAllSlugs(): string[][] {
  return Object.keys(docs)
    .filter((k) => !HANDBUILT.has(k))
    .map((k) => keyToSlug(k))
    .filter(Boolean)
    .map((slug) => slug.split("/"));
}

export function getDocMeta(slug: string) {
  const doc = getDoc(slug);
  if (!doc) return null;
  return {
    title: doc.title,
    description: doc.description || doc.excerpt,
    ogImage: doc.ogImage,
  };
}
