import raw from "@/data/content.json";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption: string };

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

export function cleanContentBlocks(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let skipping = false;
  for (const b of blocks) {
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
