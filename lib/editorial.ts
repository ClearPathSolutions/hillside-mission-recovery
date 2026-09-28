import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";

/**
 * Editorial policy — the portfolio-wide page from editorial-policy-dev-package.
 *
 * The copy is shared by every site and must not be reworded here; only the five
 * merge fields below differ per site. Values mirror this site's row (SITE_ID 3)
 * in editorial-policy-dev-package/facilities.csv — update both together.
 *
 * Until every field is filled and the CSV's CONTENT_SIGNOFF is recorded, the
 * policy is withheld from production: the route 404s there and nothing links
 * to it, it is left out of the sitemap, and the Organization schema does not
 * point at it. Local and Vercel preview builds still render it (noindex) so it
 * can be reviewed.
 */
export const editorial = {
  facilityName: site.fullName,
  domain: new URL(site.url).hostname,
  /**
   * Corrections inbox. EDITORIAL_EMAIL is blank in the source-of-truth CSV, so
   * this uses that row's PUBLIC_EMAIL instead, as instructed. The NAP audit
   * flags it (admissions@ rather than info@, which site.email uses).
   */
  editorialEmail: "admissions@hillsidemission.com",
  /** Rendered as shown on the site; the tel: form comes from site.phoneHref. */
  phone: site.phone,
  phoneTel: site.phoneHref.replace(/^tel:/, ""),
  /** YYYY-MM-DD. */
  lastReviewed: "2026-09-28",
  /** Copy of the CSV's CONTENT_SIGNOFF cell. Blank as of 2026-09-28. */
  contentSignoff: "",
} as const;

// No trailing slash: the site's routes have none, and Next redirects the
// package's /editorial-policy/ form here, so this is the canonical URL.
export const EDITORIAL_POLICY_PATH = "/editorial-policy";
export const EDITORIAL_POLICY_URL = `${site.url}${EDITORIAL_POLICY_PATH}`;
export const CORRECTIONS_ANCHOR = "content-updates-and-corrections";

export const editorialMissing: string[] = [
  !editorial.editorialEmail && "EDITORIAL_EMAIL",
  !/^\d{4}-\d{2}-\d{2}$/.test(editorial.lastReviewed) && "LAST_REVIEWED",
  !editorial.contentSignoff && "CONTENT_SIGNOFF",
].filter((f): f is string => Boolean(f));

/** Every field filled and signed off: the policy may be public. */
export const editorialPolicyReady = editorialMissing.length === 0;

/** Whether this build serves the page at all (previews do, for review). */
export const editorialPolicyServed =
  editorialPolicyReady || process.env.VERCEL_ENV !== "production";

/** "2026-09-30" -> "September 2026". */
function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type TocItem = { id: string; text: string };

/**
 * The policy body, read at build time from data/editorial-policy.html — an
 * unedited copy of the package's templates/editorial-policy.html (the package
 * folder itself is not committed). When the master copy changes, replace that
 * file wholesale; never hand-edit it. Unfilled fields are left as their
 * {{TOKEN}} so they are impossible to miss in a preview.
 */
export function editorialPolicyBody(): { html: string; toc: TocItem[] } {
  const file = path.join(process.cwd(), "data/editorial-policy.html");
  const fields: Record<string, string> = {
    FACILITY_NAME: editorial.facilityName,
    DOMAIN: editorial.domain,
    EDITORIAL_EMAIL: editorial.editorialEmail,
    PHONE: editorial.phone,
    PHONE_TEL: editorial.phoneTel,
    LAST_REVIEWED: editorial.lastReviewed && monthYear(editorial.lastReviewed),
  };

  const html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, "")
    // PageHero renders the page's single H1.
    .replace(/<h1>[\s\S]*?<\/h1>/, "")
    // The package allows adjusting this href to the site's About URL.
    .replace(/href="\/about\/"/g, 'href="/about"')
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) =>
      fields[name] ? escapeHtml(fields[name]) : token,
    )
    .trim();

  if (editorialPolicyReady && html.includes("{{")) {
    // README: "Any hit blocks launch." Fail the build rather than ship it.
    throw new Error(`Editorial policy still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`);
  }

  const toc = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&"),
  }));

  return { html, toc };
}
