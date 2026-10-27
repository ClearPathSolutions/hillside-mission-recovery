import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import type { TocItem } from "@/lib/editorial";

/**
 * The portfolio-wide legal pages: /privacy-policy, /notice-of-privacy-practices
 * and /sms-terms.
 *
 * As with the editorial policy (lib/editorial.ts), the copy is shared word for
 * word across every site and must not be reworded here. data/legal/*.html are
 * unedited copies of the approved templates in
 * legal-pages-dev-package/production/ (the interim NPP saved as
 * notice-of-privacy-practices.html); only the merge fields below differ per
 * site. When the master copy changes, replace the file wholesale.
 *
 * The NPP is the interim HHS-model notice, placed because this site had none.
 * Replace data/legal/notice-of-privacy-practices.html with the text QHG
 * compliance/legal supplies when it arrives.
 */
export const LEGAL_PAGES = {
  "privacy-policy": { title: "Privacy Policy", path: "/privacy-policy" },
  "notice-of-privacy-practices": {
    title: "Notice of Privacy Practices",
    path: "/notice-of-privacy-practices",
  },
  "sms-terms": { title: "SMS Terms & Conditions", path: "/sms-terms" },
} as const;

export type LegalSlug = keyof typeof LEGAL_PAGES;

/** Date the current templates took effect on this site. */
const EFFECTIVE = "October 27, 2026";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Merge values as HTML. Phone and email are links, per the package. */
const FIELDS: Record<string, string> = {
  // The brand as the footer shows it.
  FACILITY_NAME: escapeHtml(site.fullName),
  DOMAIN: new URL(site.url).hostname.replace(/^www\./, ""),
  PHONE: `<a href="${site.phoneHref}">${escapeHtml(site.phone)}</a>`,
  PRIVACY_EMAIL: `<a href="mailto:${site.email}">${escapeHtml(site.email)}</a>`,
  STREET_ADDRESS: escapeHtml(site.address.full),
  // Only greatertexasbehavioral.com carries a legal-entity prefix.
  LEGAL_ENTITY_LINE: "",
  // site.address.state is the postal code; the NPP names the state in full.
  STATE_NAME: "California",
  PP_LAST_UPDATED: EFFECTIVE,
  SMS_LAST_UPDATED: EFFECTIVE,
  NPP_EFFECTIVE_DATE: EFFECTIVE,
};

const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * The page body with its fields merged, read at build time. The templates'
 * internal links are written slashed (/privacy-policy/); this site's routes
 * have none, so they are rewritten to the canonical form. Each H2 gets an id
 * for the sidebar's "On this page" list. An unknown field or a leftover
 * {{TOKEN}} fails the build rather than shipping.
 */
export function legalPageBody(slug: LegalSlug): { html: string; toc: TocItem[] } {
  const file = path.join(process.cwd(), "data/legal", `${slug}.html`);
  const html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/^\s*<!--[\s\S]*?-->\s*/, "")
    .replace(/href="\/(privacy-policy|notice-of-privacy-practices|sms-terms)\/"/g, 'href="/$1"')
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, text: string) => `<h2 id="${slugify(text)}">${text}</h2>`)
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) => {
      if (!(name in FIELDS)) throw new Error(`data/legal/${slug}.html: unknown merge field ${token}`);
      return FIELDS[name];
    })
    .trim();

  if (html.includes("{{")) {
    throw new Error(`data/legal/${slug}.html still contains a placeholder`);
  }

  const toc = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&"),
  }));

  return { html, toc };
}
