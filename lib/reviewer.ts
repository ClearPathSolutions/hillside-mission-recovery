import { site } from "@/lib/site";

/**
 * Medical reviewer shown on every blog post, from every source.
 *
 * The client has asked for a site-wide default reviewer (this replaces the
 * editorial-policy package's "no default reviewer" rule). Resolution, the same
 * on every post:
 *   1. Clarion's post API sends medically_reviewed_by, _credentials and _url;
 *      whichever of those is populated is kept.
 *   2. Each missing field is filled individually from DEFAULT_REVIEWER.
 *   3. Posts from data/content.json always get DEFAULT_REVIEWER (unless the
 *      post names another staff reviewer). New posts need no per-post action.
 */
export const DEFAULT_REVIEWER = {
  name: "Dr. Pamela Tambini",
  credentials: "M.D.",
  /** Staff slug in data/content.json, so the profile page exists. */
  staffSlug: "pamela-tambini",
  /** No trailing slash: the live profile is served without one. */
  url: `${site.url}/staff/pamela-tambini`,
} as const;

export type Reviewer = {
  name: string;
  credentials: string | null;
  /** Same-tab internal path when the profile is on this site. */
  path: string | null;
  /** Absolute profile URL, on site.url's host when it is this site. */
  url: string | null;
};

const host = (h: string) => h.replace(/^www\./, "").toLowerCase();

export function resolveReviewer(fields?: {
  name?: string | null;
  credentials?: string | null;
  url?: string | null;
}): Reviewer {
  const name = fields?.name?.trim() || DEFAULT_REVIEWER.name;
  const credentials = fields?.credentials?.trim() || DEFAULT_REVIEWER.credentials;
  const raw = fields?.url?.trim() || DEFAULT_REVIEWER.url;

  let abs: URL | null = null;
  try {
    abs = new URL(raw, site.url);
  } catch {
    abs = null;
  }
  if (!abs) return { name, credentials, path: null, url: null };

  // A bio on this site (Clarion stores it on the www host) is linked as an
  // internal path, and its schema URL is built on site.url's host so it
  // matches the @id the bio page's Person schema uses.
  if (host(abs.hostname) === host(new URL(site.url).hostname)) {
    const path = abs.pathname.replace(/\/+$/, "") || "/";
    return { name, credentials, path, url: `${site.url}${path}` };
  }
  return { name, credentials, path: null, url: abs.href };
}

/** schema.org reviewedBy value for a MedicalWebPage node. */
export function reviewerSchema(r: Reviewer) {
  return {
    "@type": "Person",
    ...(r.url ? { "@id": `${r.url}#person`, url: r.url } : {}),
    name: r.name,
    ...(r.credentials ? { honorificSuffix: r.credentials } : {}),
  };
}
