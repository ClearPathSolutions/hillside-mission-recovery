# Hillside Mission Recovery — Issue Register

Every issue affecting this site, drawn from the QHG audit workbook (all 5 tabs) and the QHG staff bio directory.

| | |
|---|---|
| **Source 1** | [QHG Vercel Build Issues workbook](https://docs.google.com/spreadsheets/d/1daiRElkRoKObt9KCsqFeXEhmtSBk5c1MQjUeaKx2nC8/edit) — sections 1–6 |
| **Source 2** | [QHG bio directory](https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit) — section 7 |
| **Workbook provenance** | Crawl of 12 Vercel preview builds, 1,046 URLs, 2026-07-27. Verification pass 2026-07-28. |
| **Build audited** | `https://hillside-mission-recovery-beryl.vercel.app` |
| **Production** | `hillsidemission.com` — still the old WordPress site on WP Engine; the rebuild is not yet on the live domain |
| **Staff portal** | `support.quadranthealthgroup.com/api/public/facilities/hillside-mission-recovery/staff` — agrees with the directory |
| **Extracted** | 2026-08-04 |

## How to read this

- **Sheet says** — the workbook's claim, verbatim in substance.
- **Verified 2026-08-04** — I re-tested it against the live build. Where my result differs from the sheet, both are shown.
- Workbook IDs (`V0054`…) are preserved so rows stay traceable back to the sheet.
- The workbook's own Legend warns that **roughly two-thirds of its verified rows needed a correction**, and that unverified rows deserve the same caution. Rows below are labelled with their verification state.

## Summary

| Section | Source | Issues affecting this site |
|---|---|---|
| 1 | Vercel Build Issues — site-specific | 10 |
| 2 | Vercel Build Issues — portfolio-wide (`ALL SITES`) that apply here | 7 |
| 3 | Vercel Build Issues — parent-site rows involving this site | 2 |
| 4 | Visual Issues | 242 across 38 pages |
| 5 | Broken Internal Links | 0 — tab covers Dallas (16) and Fort Worth (13) only |
| 6 | Portfolio rows checked and ruled out | 6 |
| 7 | **Staff bio directory** | **11** (`DOC-01`…`DOC-11`) |
| A | Found outside both source documents | 11 |
| | **Total actionable issues** | **272** |

The Verification Log supplies evidence for 9 of the 10 site-specific workbook rows.

Priority as recorded in the workbook (sections 1–3):

| Priority | Count |
|---|---|
| not triaged | 11 |
| CRITICAL | 3 |
| HIGH | 3 |
| ENHANCEMENT | 1 |
| MEDIUM | 1 |

> `not triaged` means the workbook never settled a priority — not that the issue is low. 11 of these rows are untriaged.

## Do first

1. **DOC-01 → closes V0054.** The wrong-biography page belongs to Phillip Carter, and the staff directory holds his real bio, which the site never uses. Drop it in. (The directory misfiles him under Wellness Ranch KY, but his bio names Hillside three times — see **DOC-11**, which needs an upstream fix and should be sequenced before DOC-07.)
2. **VIS-PHONE** — 20 pages carry a phone number that is not the tracked line, including three typo variants that may not route at all. Confirm with admissions before changing anything (see the row).
3. **DOC-10** — three pages claim "Medically Reviewed by" a CADC II counselor, on medical-detox content, while the directory names a board-certified addiction-medicine physician as medical oversight.
4. **V0124** — the build is a ~15–16 July content snapshot and production keeps publishing. Settle freeze-or-resync before a cutover date is set; it is upstream of V0122.
5. **V0102** — trailing-slash convention disagrees with production on every URL. Fix once in config, before the redirect map is written.
6. **A1** — the lead form silently drops submissions while telling users they'll be called within the hour. Not in either source document.

---

# 1. Site-specific build issues

From the **Vercel Build Issues** tab, `Facility = Hillside Mission Recovery`. All 10 rows have `Status = Open`.

## V0054 — Wrong person's biography published on `/staff/phillip-carter`

**Priority:** `CRITICAL` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> CRITICAL - WRONG PERSON BIOGRAPHY PUBLISHED. /staff/phillip-carter shows headings for "Phillip Carter / Director of Operations" but the body text is Monica Olivares's biography verbatim: "Hi, I'm Monica Olivares - Program Director at Hillside Mission..." The two staff pages are 97.7 percent identical, differing only in the name and title in headings. This misstates who works at the facility and what their credentials are, on a YMYL healthcare site. Secondary defect: the H1 spells "Monica Olivires" while her own bio text spells "Monica Olivares". Original row logged this as routine duplicate content with the parent domain, which hid it.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/staff/monica-olivires
https://hillside-mission-recovery-beryl.vercel.app/staff/phillip-carter
Also at: https://quadrant-health-group.vercel.app/team/monica-olivires, https://quadrant-health-group.vercel.app/team/phillip-carter
```

**Fix as written in the sheet**

```
Recommended: the facility site owns the bio and the parent links to it rather than republishing.

Parent copies to canonical or replace with links:
https://quadrant-health-group.vercel.app/team/monica-olivires
https://quadrant-health-group.vercel.app/team/phillip-carter

Parent team index:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Correction applied during verification**

> PRIORITY CRITICAL: Wrong person biography on a named staff page, YMYL site
> 
> REWRITE THIS ROW ENTIRELY. It is not a parent-domain duplicate-content issue. It is the wrong person's biography published on a named staff page of a YMYL healthcare site - a factual misstatement of who works there and what their credentials are. Escalate above every other row verified so far.
> Secondary defect on the same page set: the H1 spells "Monica Olivires" while her own bio text spells "Monica Olivares".

**Notes**

**Verified 2026-08-04 — confirmed.** `/staff/phillip-carter` is headed "Phillip Carter — Director of Operations" and its body opens *"Hi, I'm Monica Olivares — Program Director at Hillside Mission…"*, continuing through her CADC II, her 11 years in the field and her 13 years sober. Body-text similarity to `/staff/monica-olivires` with nav/header/footer stripped: **96.6%** (sheet said 97.7% — method variance, same conclusion).

**On the name-spelling defect** the sheet flags as secondary: confirmed, and it is worse than one inconsistency. Her name appears as "Olivires" in the URL slug and the `<h1>`, and as "Olivares" in the `<title>` and throughout the bio body — so the page disagrees with itself about a named clinician's surname.

> ⚠️ **The Fix in this row is superseded — see [DOC-01](#doc-01--phillip-carters-real-biography-exists-but-the-site-doesnt-use-it-critical).** The staff directory holds Phillip Carter's real biography, which appears nowhere on the site. The fix is to **drop that bio in**, not to canonicalize or dedupe against the parent domain as this row instructs.
>
> The origin of the defect is `data/content.json`: the WordPress scrape wrote Monica's bio into the `staff/phillip-carter` document. It is a scrape error, not a parent-domain duplication issue.

- [x] V0054 actioned — via DOC-01 (supply the correct bio)

---

## V0055 — No dedicated verify-insurance page

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> No dedicated verify-insurance page. Every "Verify Insurance" button sitewide points to /admissions.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/admissions
```

**Fix as written in the sheet**

```
Build this page:
https://hillside-mission-recovery-beryl.vercel.app/verify-insurance

Model on:
https://ocean-coast-recovery-center.vercel.app/insurance

Or relabel the buttons to match their current destination:
https://hillside-mission-recovery-beryl.vercel.app/admissions
```

**Correction applied during verification**

> Add that it is inherited: production hillsidemission.com also has no verify page (/verify-insurance and /insurance both 404 there). So this is a pre-existing gap, not a rebuild omission - same framing as V0041, V0043 and V0048.

**Notes**

**Verified 2026-08-04 — confirmed, and inherited.** `/verify-insurance` and `/insurance` both 404 on the build; both also 404 on production. Pre-existing gap, not a rebuild omission. Duplicates the Hillside portion of **V0096**.

- [ ] V0055 actioned

---

## V0056 — Footer "What We Treat" omits `/prescription-drugs`

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> Footer What We Treat list shows 6 of 7 condition pages - /prescription-drugs is omitted.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/ (footer)
Omitted: https://hillside-mission-recovery-beryl.vercel.app/prescription-drugs
```

**Fix as written in the sheet**

```
Add this live page to the footer list on every template:
https://hillside-mission-recovery-beryl.vercel.app/prescription-drugs
(verified live, HTTP 200)
```

**Notes**

**Sheet verdict: CONFIRMED, no correction needed.** `/prescription-drugs` is live (HTTP 200) but absent from the footer list.

- [x] V0056 actioned

---

## V0057 — No "Who We Help" hub; population pages split across two URL patterns

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> No Who We Help hub. Population pages sit at root (/women, /men, /first-responders) while Executives sits under /treatment/, so one section uses two different URL patterns.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/women
https://hillside-mission-recovery-beryl.vercel.app/treatment/executives-rehab-in-mission-viejo
```

**Fix as written in the sheet**

```
Create this hub:
https://hillside-mission-recovery-beryl.vercel.app/who-we-help

Move these beneath it with 301s:
https://hillside-mission-recovery-beryl.vercel.app/women
https://hillside-mission-recovery-beryl.vercel.app/men
https://hillside-mission-recovery-beryl.vercel.app/first-responders
https://hillside-mission-recovery-beryl.vercel.app/treatment/executives-rehab-in-mission-viejo

Model on:
https://ocean-coast-recovery-center.vercel.app/who-we-help
```

**Correction applied during verification**

> Two additions.
> 1) INHERITED plus MIGRATION COST. Production has the identical split: hillsidemission.com/who-we-help 404s while /women, /men, /first-responders and /treatment/executives-rehab-in-mission-viejo all 301 to their trailing-slash forms. So these are established production URLs, and moving them under a hub means redirecting live pages. Same cost issue flagged in V0051, and the row does not mention it.
> 2) Hillside has only 4 population pages, not 7. /professionals, /veterans, /young-adults and /college-students all 404. The Fix cites the Ocean Coast hub as a model, which is fine, but anyone comparing to the Dallas set should know 3 of those populations do not exist here and would have to be written from scratch.

**Notes**

**Inherited.** Production has the identical split — `/who-we-help` 404s there too, while `/women`, `/men`, `/first-responders` and `/treatment/executives-rehab-in-mission-viejo` all resolve. Overlaps **V0118** on the geo-suffixed slug.

- [ ] V0057 actioned

---

## V0058 — Missing canonical tag on 6 of 156 pages

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> Missing canonical tag on 6 of 156 pages: /, /about, /admissions, /blog, /contact, /tour. Those same 6 pages also carry NO robots meta (original row wrongly said "index, follow"), so they are indexable by default. The 6 missing a canonical are exactly the 6 missing a robots meta, indicating one shared top-level-page template rather than 6 separate oversights.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app  - 6 of 156 pages: /, /about, /admissions, /blog and 2 more
```

**Fix as written in the sheet**

```
Add a self-referencing canonical on every template, pointing at the production domain:
https://hillsidemission.com

Affected build:
https://hillside-mission-recovery-beryl.vercel.app

Working example to copy: https://laguna-view-detox.vercel.app/about canonicals to https://lagunaviewdetox.com/about
```

**Correction applied during verification**

> One factual error in the row text. It states these pages carry a robots meta of "index, follow". They carry NO robots meta at all - all 6 returned None. The conclusion is unaffected, since absent robots defaults to indexable, but the stated evidence is wrong and should be corrected to "no robots meta, therefore indexable by default".
> Note the pattern: the 6 pages missing a canonical are exactly the 6 missing a robots meta, which points to one shared template for top-level pages rather than 6 separate oversights. That makes it a single-template fix.

**Notes**

**Verified 2026-08-04 — confirmed exactly.** My independent crawl found the same 6 pages of 156 missing a canonical: `/`, `/about`, `/admissions`, `/blog`, `/contact`, `/tour`. These are precisely the bespoke (non-catch-all) templates.

**Sheet's own correction:** the original row wrongly said these pages carry `robots: index, follow`. They carry **no robots meta at all** — indexable by default, so the conclusion stands but the stated evidence was wrong.

**Caution on the Fix:** it cites Laguna as the model to copy. The workbook elsewhere notes Laguna points 43 of 46 canonicals at redirects — do not copy Laguna. Emit a self-referencing canonical instead.

- [x] V0058 actioned

---

## V0059 — Live page absent from `sitemap.xml`, canonicalling to a 404

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `MERGE with V0083, V0087` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> 1 live page(s) returning 200 but absent from sitemap.xml, so they will not be submitted for indexing.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/blog/what-to-expect-first-30-days-of-treatment
```

**Fix as written in the sheet**

```
Add these URLs to:
https://hillside-mission-recovery-beryl.vercel.app/sitemap.xml

Or noindex them if the omission is intentional.
```

**Correction applied during verification**

> The row describes the smaller problem. The serious defect is that this page canonicals to https://hillsidemission.com/blog/what-to-expect-first-30-days-of-treatment, which returns 404 on production. A canonical pointing at a non-existent URL tells search engines the authoritative version does not exist, which is worse than being left out of a sitemap. Reframe the row around the broken canonical.
> Also: this same post is on 3 sites and absent from all 3 sitemaps, but each fails differently - Hillside canonicals to a 404; Ocean Coast canonicals to its DOMAIN ROOT rather than the post; Wellness NJ has no canonical at all. It looks like a new post added to three builds without sitemap or canonical wiring.

**Notes**

**Verified 2026-08-04 — confirmed.** The page returns 200 and is absent from `sitemap.xml`.

**The sheet's correction is the more serious half:** the page canonicals to `https://hillsidemission.com/blog/what-to-expect-first-30-days-of-treatment`, which **404s on production**. A canonical pointing at a non-existent URL is worse than the sitemap omission. Marked `MERGE with V0083, V0087`.

- [x] V0059 actioned

---

## V0060 — No `/areas-we-serve` hub — downgraded to enhancement

**Priority:** `ENHANCEMENT` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> ENHANCEMENT, NOT A DEFECT - severity corrected on verification. No /areas-we-serve landing page exists (404 on preview and production). However all 12 city pages have 155 inbound internal links each because they sit in the site-wide nav dropdown, so there is no crawl or discovery problem. A hub is optional topical consolidation. Contrast with V0020, where the equivalent Dallas pages have ZERO inbound links.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/mission-viejo-rehab
https://hillside-mission-recovery-beryl.vercel.app/orange-county
https://hillside-mission-recovery-beryl.vercel.app/newport-beach
https://hillside-mission-recovery-beryl.vercel.app/irvine
https://hillside-mission-recovery-beryl.vercel.app/dana-point
https://hillside-mission-recovery-beryl.vercel.app/san-clemente
https://hillside-mission-recovery-beryl.vercel.app/san-juan-capistrano
https://hillside-mission-recovery-beryl.vercel.app/lake-forest
https://hillside-mission-recovery-beryl.vercel.app/costa-mesa
https://hillside-mission-recovery-beryl.vercel.app/anaheim
https://hillside-mission-recovery-beryl.vercel.app/long-beach
https://hillside-mission-recovery-beryl.vercel.app/seal-beach
```

**Fix as written in the sheet**

```
Create this hub and link all 12:
https://hillside-mission-recovery-beryl.vercel.app/areas-we-serve

Model on:
https://wellness-recovery-nj.vercel.app/areas-we-serve
```

**Correction applied during verification**

> PRIORITY ENHANCEMENT: Downgraded - 155 inbound links each, no crawl problem
> 
> FRAMING IS MISLEADING AND SEVERITY IS WRONG. I generated this row inside the orphan section, and it reads alongside genuine orphans, implying these pages are poorly linked. They are the most-linked pages on the site - 155 inbound links each, i.e. every page links every one of them. There is no crawl or discovery problem whatsoever.
> The Fix is also wrong: "Create this hub and link all 12" implies linking is needed. It is not. Reword to: no /areas-we-serve landing page exists; the 12 city pages are fully linked from the global nav. Adding a hub is an optional consolidation for topical grouping, not a fix. Downgrade from issue to enhancement.

**Notes**

**Downgraded on verification from defect to ENHANCEMENT.** All 12 city pages carry 155 inbound internal links each because they sit in the sitewide nav dropdown, so there is no crawl or discovery problem. The sheet notes its own original framing was misleading — the row was generated inside an "orphan" section and read as though these pages were poorly linked.

- [ ] V0060 actioned

---

## V0061 — Root-level articles unreachable from the blog index

**Priority:** `HIGH` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> Root-level articles are unreachable from the blog index. /blog has no server-side pagination (/blog/page/2 and /blog/2 both 404), so the earlier JS-pagination caveat does not apply. 23 article pages verified with ZERO inbound links anywhere on the site (count corrected from 26 - the original included 2 staff bios and /thank-you). SCOPE IS LARGER THAN MEASURED: the site has 116 root-level article pages and /blog lists only about 9, so roughly 107 are unreachable. Needs re-counting before action.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/blog
e.g. /what-is-al-anon, /is-addiction-genetic, /signs-of-benzo-withdrawal, /what-is-drug-detox
```

**Fix as written in the sheet**

```
Check pagination behaviour on:
https://hillside-mission-recovery-beryl.vercel.app/blog

If it does not paginate server-side, move the posts under /blog/ or link them from a topic hub. Compare with a site using /blog/ paths:
https://laguna-view-detox.vercel.app/blog
```

**Correction applied during verification**

> PRIORITY HIGH: Scope larger than written: ~107 articles unreachable, not 23
> 
> COUNT WRONG: the row says 26. The real figure is 23 articles. My original 26 included 2 staff bios (covered separately by V0062) and /thank-you, which is not an article.

**Notes**

**Count corrected on verification: 23 articles, not 26** — the original figure wrongly included 2 staff bios (covered by V0062) and `/thank-you`. Also established that `/blog` has **no server-side pagination**: `/blog/page/2` and `/blog/2` both 404.

⚠️ **This row's Correction cell contradicts itself.** Its priority line reads "Scope larger than written: ~107 articles unreachable, not 23" while its body reads "The real figure is 23 articles." **Recount before actioning.** My own crawl found `/blog` renders 9 article cards against 112 posts in the content set, which is consistent with a large orphan count rather than 23 — so the "~107" figure may be the correct one.

- [x] V0061 actioned

---

## V0062 — Staff bio pages orphaned — no team hub

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> 2 staff bio pages are orphaned - no team hub page links them.

**Location**

```
https://hillside-mission-recovery-beryl.vercel.app/staff/monica-olivires
https://hillside-mission-recovery-beryl.vercel.app/staff/phillip-carter
```

**Fix as written in the sheet**

```
Build this hub and link both:
https://hillside-mission-recovery-beryl.vercel.app/team

Model on:
https://quadrant-health-group.vercel.app/about/meet-the-team
```

**Notes**

**Sheet verdict: CONFIRMED, no correction needed.** Verified 2026-08-04: both pages return 200 and no `/team` hub exists.

- [x] V0062 actioned

---

## V0122 — `/what-is-narcan` absent from the build entirely

**Priority:** `HIGH` &nbsp;|&nbsp; **Verdict:** `NEW - Hillside deep audit 2026-07-28` &nbsp;|&nbsp; **Status:** `Open` &nbsp;|&nbsp; **Verified:** 2026-07-28

**Issue**

> One production page is absent from the new build entirely. /what-is-narcan is live on production (HTTP 200, title "What Is Narcan? How It Works & How to Use It") but returns 404 on the build at both root and /blog/. It will 404 at cutover unless built or redirected. Found by diffing production Yoast sitemaps (155 URLs across page, post and staff sitemaps) against the build sitemap (156) - it is the ONLY difference.

**Location**

```
https://hillsidemission.com/what-is-narcan/   (HTTP 200)
https://hillside-mission-recovery-beryl.vercel.app/what-is-narcan   (HTTP 404)
https://hillside-mission-recovery-beryl.vercel.app/blog/what-is-narcan   (HTTP 404)
```

**Fix as written in the sheet**

```
Port the post into the build at /what-is-narcan to match the existing root-level article structure, or 301 the production URL to the closest live page if it is being retired.

Nearest existing pages:
https://hillside-mission-recovery-beryl.vercel.app/opioids
https://hillside-mission-recovery-beryl.vercel.app/fentanyl

Naloxone/Narcan content is high-intent harm-reduction information, so retiring it rather than porting it is worth a deliberate decision.
```

**Notes**

**Verified 2026-08-04 — confirmed.** `https://hillsidemission.com/what-is-narcan/` returns 200 with title "What Is Narcan? How It Works & How to Use It"; `/what-is-narcan` returns 404 on the build. The scraped content set holds 112 posts against 113 in the production sitemap — this is the missing one.

**Not independently verified by the workbook** (added after the verification pass). It is an instance of **V0124**, not a separate cause.

- [x] V0122 actioned

---
# 2. Portfolio-wide issues that apply to this site

From the **Vercel Build Issues** tab, `Facility = ALL SITES`. I checked each of the 13 against this build; these 7 apply. The 6 that don't are listed in section 6.

## V0102 — Portfolio-wide trailing-slash mismatch

**Priority:** `CRITICAL` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> PORTFOLIO-WIDE TRAILING-SLASH MISMATCH, affecting all 1,046 preview URLs. All 12 previews serve the slashless form at 200 and 308-redirect the slash form. All 12 production sites are slash-canonical, returning 301 on the slashless form. At cutover every inbound link using the production convention hits a redirect. This also CAUSES the canonical-target redirects in V0018 and V0067, since the builds emit slashless canonicals against slash-canonical production - fixing the convention fixes those too.

**Fix as written in the sheet**

```
Pick one convention and enforce it in the Next.js config across all 12 builds, then align the redirect map. Verify against:
https://fortworthwellness.org/about-us/
https://fort-worth-wellness.vercel.app/about-us
```

**Correction applied during verification**

> PRIORITY CRITICAL: Affects all 1,046 preview URLs at cutover
> 
> SCOPE UNDERSTATED. The row cites Fort Worth as though it were an example of a localised problem. It is portfolio-wide and total: every preview and every production site disagree on this. That makes it the single largest cutover issue in the audit by URL count - it affects all 1,046 preview URLs, not a subset.
> Also worth stating in the row: because previews 308-redirect the slash form, any existing inbound link or citation using the production slash convention will hit a redirect on the new build. That is the concrete consequence, and it applies to every indexed URL in the portfolio.

**Why it applies here**

Applies to all 12 sites including this one. **Verified 2026-08-04:** the build serves `/about` at 200 and 308-redirects `/about/`; production `hillsidemission.com/contact` 301s to `/contact/`. The two conventions are opposite.

- [ ] V0102 actioned

---

## V0124 — Cutover content gap — the builds predate production

**Priority:** `CRITICAL` &nbsp;|&nbsp; **Verdict:** `NEW - Marina Harbor deep audit 2026-07-28` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> CUTOVER CONTENT GAP - THE BUILDS PREDATE PRODUCTION AND THE GAP IS STILL GROWING. Every Vercel build appears to have been generated from a content snapshot taken around 15-16 July 2026. Production has kept publishing since. Measured across all 12 production sitemaps: 15 pages published or renamed on production are ABSENT from the corresponding build, affecting 10 of 12 sites, and almost all dated 16-17 July 2026. Fort Worth and Greater Texas are unaffected only because they published nothing after the snapshot (newest content 11 June and 27 March). Des Moines and the QHG parent show lastmod of 28 July 2026, i.e. TODAY, so the gap widens every day the builds stay frozen. This also explains three other rows: V0120 (Laguna luxury post), V0122 (Hillside /what-is-narcan) and the slug renames in V0119 are all instances of this single cause, not separate faults.

**Fix as written in the sheet**

```
Two actions, in this order.

1) FREEZE OR SYNC. Either pause publishing to production until cutover, or establish a re-sync step so content added after the snapshot is pulled into the builds. Without one of these, every new post is lost at launch.

2) RE-RUN THIS DIFF IMMEDIATELY BEFORE CUTOVER. The 15 URLs above are accurate as of 2026-07-28 and will be stale by launch. The check is: production sitemap lastmod >= snapshot date, then test each URL on the build.

Verify against:
https://lagunaviewdetox.com/sitemap_index.xml
https://hillsidemission.com/sitemap_index.xml
```

**Why it applies here**

Hillside is named explicitly: `hillsidemission.com/what-is-narcan/`. This row is the **root cause of V0122**.

- [ ] V0124 actioned

---

## V0096 — Verify-insurance page absent on 5 sites including Hillside

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> Verify-insurance slug has 4 variants and is ABSENT ON 5 SITES (count corrected from 7): Hillside, Marina Harbor, Wellness NJ, QHG parent, Fort Worth. Dallas was wrongly listed as missing in the original row - dallas-detox-center.vercel.app/verify-insurance returns HTTP 200, and its actual defect is covered by V0017. Only 3 sites use the proposed /verify-insurance standard.

**Fix as written in the sheet**

```
Adopt /verify-insurance portfolio-wide and build it everywhere it is missing.

Existing variants:
https://des-moines-wellness-center-navy.vercel.app/verify-insurance
https://laguna-view-detox.vercel.app/insurance
https://ocean-coast-recovery-center.vercel.app/insurance
https://seaside-wellness-of-palm-beach.vercel.app/admissions/insurance-verification
https://wellness-detox-of-la.vercel.app/admissions/verify-your-insurance

Missing entirely on:
https://hillside-mission-recovery-beryl.vercel.app
https://marina-harbor-detox.vercel.app
https://wellness-recovery-nj.vercel.app
https://quadrant-health-group.vercel.app
https://fort-worth-wellness.vercel.app
https://dallas-detox-center.vercel.app

Reference build already on the standard:
https://des-moines-wellness-center-navy.vercel.app/verify-insurance
```

**Correction applied during verification**

> Two errors, and the second contradicts another row.
> 1) COUNT WRONG: the row says absent on 7 sites. It is absent on 5 - Hillside, Marina Harbor, Wellness NJ, QHG parent, Fort Worth.
> 2) DALLAS IS WRONGLY LISTED AS MISSING in the Fix column. Dallas /verify-insurance returns HTTP 200. This directly contradicts V0017, which correctly states that the page IS live and the real defect is its absence from the sitemap plus one mislinked CTA. So two of my rows assert opposite things about the same URL. V0017 is the correct one; remove Dallas from this row entirely.

**Why it applies here**

Hillside is named as one of 5 sites with no verify-insurance page. **Verified 2026-08-04:** absent on the build and on production. Same issue as **V0055** — dedupe them.

- [ ] V0096 actioned

---

## V0095 — Aftercare slug inconsistent — Hillside uses `/treatment/aftercare-beyond`

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> Aftercare slug has 6 distinct variants across 9 sites (count corrected from 7): /treatment/aftercare (4 sites), /treatment/aftercare-planning, /treatment/aftercare-beyond, /treatment-services/aftercare-planning, /programs/aftercare-and-alumni, /aftercare. THREE SITES HAVE NO AFTERCARE PAGE AT ALL - Wellness NJ, QHG parent, Greater Texas - so this is a rename across 9 plus a build decision for 3, not a rename across 12.

**Fix as written in the sheet**

```
Adopt /treatment/aftercare portfolio-wide.

Outlier URLs to redirect:
https://hillside-mission-recovery-beryl.vercel.app/treatment/aftercare-beyond
https://dallas-detox-center.vercel.app/treatment-services/aftercare-planning
https://fort-worth-wellness.vercel.app/treatment/aftercare-planning
https://des-moines-wellness-center-navy.vercel.app/programs/aftercare-and-alumni
https://marina-harbor-detox.vercel.app/aftercare

Reference build already on the standard:
https://laguna-view-detox.vercel.app/treatment/aftercare
```

**Correction applied during verification**

> COUNT WRONG: the issue text says 7 variants but there are 6, and the row own list contains 6. Off by one.
> Also omitted: 3 sites have NO aftercare page at all - Wellness NJ, QHG parent and Greater Texas. That matters because the row reads as a rename exercise across 12 sites when it is a rename across 9 plus a build decision for 3. For Wellness NJ specifically, aftercare is a normal part of an outpatient continuum, so its absence is more likely a gap than by-design - unlike the detox and residential absence confirmed in V0084.

**Why it applies here**

Hillside's `/treatment/aftercare-beyond` is named as an outlier to redirect. **Verified 2026-08-04:** `/treatment/aftercare-beyond` → 200, `/treatment/aftercare` → 404.

- [ ] V0095 actioned

---

## V0099 — No FAQ page anywhere on this site

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> FAQ slug has 6 distinct variants (count corrected from 4) and is absent on 7 sites. WELLNESS DETOX LA HAS THREE SEPARATE FAQ PAGES - /admissions/addiction-faq, /admissions/treatment-faq and /admissions/insurance-admissions-faq - which the original count concealed. Only 2 sites use the proposed /faq standard, so this is a build-new task on 7 sites and a rename on 3.

**Fix as written in the sheet**

```
Adopt /faq portfolio-wide.

Outlier URLs to redirect:
https://dallas-detox-center.vercel.app/faq-page
https://seaside-wellness-of-palm-beach.vercel.app/about/faq
https://wellness-detox-of-la.vercel.app/admissions/addiction-faq

Reference build already on the standard:
https://wellness-recovery-nj.vercel.app/faq
```

**Correction applied during verification**

> VARIANT COUNT WRONG: the row says 4 variants; there are 6. I missed two on Wellness Detox LA.
> And the omission matters: WELLNESS DETOX LA HAS THREE SEPARATE FAQ PAGES - /admissions/addiction-faq, /admissions/treatment-faq and /admissions/insurance-admissions-faq. That is FAQ content fragmented across three URLs on one site, which is a distinct issue from portfolio slug inconsistency and is not logged anywhere. It should be its own row, since consolidating three FAQ pages is different work from renaming one.
> Also note only 2 sites use the proposed standard /faq (Marina Harbor, Wellness NJ), so this is a build-new task on 7 sites and a rename on 3, not primarily a rename.

**Why it applies here**

Not named explicitly, but **verified 2026-08-04:** Hillside has no FAQ page anywhere — `/faq`, `/faq-page`, `/admissions/faq`, `/about/faq` all 404 on the build, and `/faq` 404s on production. This is a build-new task here.

- [ ] V0099 actioned

---

## V0101 — Blog posts sit at root level, not `/blog/<slug>`

**Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED_AMENDED` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> Blog URL pattern differs 4 ways: /blog/slug (6 sites), root-level /slug (Des Moines, Hillside, Seaside, Wellness LA), dated /YYYY/MM/DD/slug (Dallas, Marina Harbor), /about/blog (Seaside index).

**Fix as written in the sheet**

```
Adopt /blog/slug portfolio-wide. Dated URLs date the content and root-level posts collide with page slugs.

Dated post URLs to migrate:
https://dallas-detox-center.vercel.app/2026/06/17/why-dual-diagnosis-treatment-matters
https://marina-harbor-detox.vercel.app/blog   (dated post paths)

Root-level post paths to migrate:
https://hillside-mission-recovery-beryl.vercel.app/what-is-al-anon
https://seaside-wellness-of-palm-beach.vercel.app/about/blog   (index at a nested path)

Reference build already on the standard:
https://laguna-view-detox.vercel.app/blog
```

**Correction applied during verification**

> One addition that changes the migration plan: TWO SITES ARE INTERNALLY MIXED, which the row does not mention.
>   Laguna: 158 posts at /blog/slug plus 1 at root level
>   Marina Harbor: 69 posts dated plus 1 at /blog/slug
> So the inconsistency is not only across sites but within them, and a per-site bulk rename would miss the stragglers. Those two single posts need finding individually.
> Minor: the Fix cites marina-harbor-detox.vercel.app/blog as a "dated post path" - that is the index, not a dated post. Cite an actual dated URL.

**Why it applies here**

Hillside is named: its posts sit at root level (`/what-is-al-anon`) rather than `/blog/<slug>`. **Verified 2026-08-04:** `/what-is-al-anon` → 200 at root. Interacts with **V0061** — moving posts under `/blog/` would also fix the orphan problem.

- [ ] V0101 actioned

---

## V0118 — Geo-suffixed service slug policy unresolved

**Priority:** `MEDIUM` &nbsp;|&nbsp; **Verdict:** `NEW - found during verification` &nbsp;|&nbsp; **Status:** `Open`

**Issue**

> CONTRADICTION TO RESOLVE between two existing rows. V0052 closes Marina Harbor geo-suffixed service slugs (/what-we-offer/detox-san-francisco and similar) as by-design, while V0072 flags the same pattern on Des Moines (/programs/medical-detox-des-moines and similar) as a defect. Both cannot stand. Hillside has one instance too (/treatment/executives-rehab-in-mission-viejo).

**Fix as written in the sheet**

```
Decide one policy on geo-suffixed service slugs and apply it to all 15 affected URLs, then update V0052 and V0072 to match. Note all of them exist on production, so any rename carries redirect cost.
```

**Why it applies here**

Hillside is named explicitly: `/treatment/executives-rehab-in-mission-viejo`. **Verified 2026-08-04:** 200. This is a policy decision the workbook flags as unresolved between two of its own rows (V0052 vs V0072).

- [ ] V0118 actioned

---

# 3. Parent-site issues that involve this site

These sit on the Quadrant Health Group parent build. The parent team owns the fix, but both affect Hillside.

## V0091 — Parent `/locations` passes no authority to facility sites

**Facility:** Quadrant Health Group (parent) &nbsp;|&nbsp; **Priority:** `not triaged` &nbsp;|&nbsp; **Verdict:** `CONFIRMED`

**Issue**

> Locations page contains no outbound links to any facility website. Only social links are present, so the parent passes no authority to the facilities.

**Relevance to Hillside**

The parent's `/locations` page carries no outbound link to `hillsidemission.com`, so the parent passes this site no authority. The Fix names `hillsidemission.com` in its list. Pair it with a link back from this site to `quadranthealthgroup.com`.

- [ ] V0091 raised with the parent team

---

## V0128 — Parent renames `/locations/hillside` — 301 required

**Facility:** Quadrant Health Group (parent) &nbsp;|&nbsp; **Priority:** `HIGH` &nbsp;|&nbsp; **Verdict:** `NEW - QHG parent deep audit 2026-07-28`

**Issue**

> CUTOVER REDIRECT MAP REQUIRED - 16 URL pairs. Eight facility location pages are renamed from short forms to full facility names, seven blog posts move from dated /YYYY/MM/DD/ paths to /blog/<slug>, and the blog index moves from /about/blog to /blog. MIGRATION REQUIREMENT, NOT A DEFECT - internal link integrity on the build is clean: 0 broken across 949 distinct internal URLs collapsing to 128 base paths, and 0 internal redirects.

**Relevance to Hillside**

The parent renames `/locations/hillside` → `/locations/hillside-mission-recovery`. The old URL is indexed today, so it needs a 301 in the parent's cutover map. No action on this repo — track it so the inbound link isn't lost.

- [ ] V0128 raised with the parent team

---
# 4. Visual & content issues

From the **Visual Issues** tab, `Facility = Hillside Mission` — **242 rows across 38 pages**. This tab has no status, owner or priority column in the workbook, so nothing here has been triaged or tracked.

Most rows are instances of a dozen recurring defects. Those are grouped first with the full page list, then every row appears once in the per-page record at the end.

## 4.1 Recurring defects

| # | Defect | Fix called for | Rows |
|---|---|---|---|
| R1 | Detoxification | Must be a widet like the one in the original page linking to its respective page | 34 |
| R2 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page | 34 |
| R3 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page | 34 |
| R4 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effe | Mission Viejo is misspelled | 26 |
| R5 | Life on lifes terms. | should read, Support for Life After Treatment | 23 |
| R6 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section | 11 |
| R7 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage | 9 |
| R8 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar | 9 |
| R9 | (866)470-7342 | Using a different phone number than whats being used on the nav bar | 7 |
| R10 | Image sizes | fix the sizing of the images to fit the page better | 4 |
| R11 | Medically Reviewed by Monica Olivires, CADC II | should be a widget with a see full bio link to the staff page | 3 |
| R12 | Your health insurance can pay for rehab. | Should be under "Medically Reviewed by Monica Olivires, CADC II " | 3 |

### R1 — Detoxification

**Fix:** Must be a widet like the one in the original page linking to its respective page

**34 rows across 33 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/dana-point`, `/fentanyl`, `/first-health-network`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/men`, `/meth`, `/mission-viejo-rehab`, `/newport-beach`, `/orange-county`, `/orange-county-behavioral-health`, `/prescription-drugs`, `/san-clemente`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`, `/women`

- [x] R1 actioned

### R2 — Residential Inpatient

**Fix:** Must be a widet like the one in the original page linking to its respective page

**34 rows across 33 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/dana-point`, `/fentanyl`, `/first-health-network`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/men`, `/meth`, `/mission-viejo-rehab`, `/newport-beach`, `/orange-county`, `/orange-county-behavioral-health`, `/prescription-drugs`, `/san-clemente`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`, `/women`

- [x] R2 actioned

### R3 — Aftercare & Alumni

**Fix:** Must be a widet like the one in the original page linking to its respective page

**34 rows across 33 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/dana-point`, `/fentanyl`, `/first-health-network`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/men`, `/meth`, `/mission-viejo-rehab`, `/newport-beach`, `/orange-county`, `/orange-county-behavioral-health`, `/prescription-drugs`, `/san-clemente`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`, `/women`

- [x] R3 actioned

### R4 — Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at o

**Fix:** Mission Viejo is misspelled

**26 rows across 25 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/first-health-network`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/newport-beach`, `/prescription-drugs`, `/san-clemente`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`

- [x] R4 actioned

### R5 — Life on lifes terms.

**Fix:** should read, Support for Life After Treatment

**23 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/newport-beach`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`, `/women`

- [ ] R5 actioned

### R6 — Don’t Wait Any Longer

**Fix:** Remove and replace with the "You don't have to do this alone." section

**11 pages:** `/dana-point`, `/first-responders`, `/lake-forest`, `/orange-county`, `/san-juan-capistrano`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/executives-rehab-in-mission-viejo`, `/women`

- [x] R6 actioned

### R7 — Missing Health Insurance Can Pay for Rehab.

**Fix:** add with insurance icons from the homepage

**9 pages:** `/admissions`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/dana-point`, `/fentanyl`

- [x] R7 actioned

### R8 — call (866)470-7342 now!

**Fix:** Using a different phone number than whats being used on the nav bar

**9 pages:** `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/fentanyl`, `/first-responders`

- [ ] R8 actioned

### R9 — (866)470-7342

**Fix:** Using a different phone number than whats being used on the nav bar

**7 rows across 6 pages:** `/irvine`, `/long-beach`, `/magellan`, `/meth`, `/san-clemente`, `/seal-beach`

- [ ] R9 actioned

### R10 — Image sizes

**Fix:** fix the sizing of the images to fit the page better

**4 pages:** `/mission-viejo-rehab`, `/treatment/detoxification`, `/treatment/dual-diagnosis`, `/treatment/residential-inpatient`

- [x] R10 actioned

### R11 — Medically Reviewed by Monica Olivires, CADC II

**Fix:** should be a widget with a see full bio link to the staff page

**3 pages:** `/mission-viejo-rehab`, `/treatment/detoxification`, `/treatment/residential-inpatient`

- [x] R11 actioned

### R12 — Your health insurance can pay for rehab.

**Fix:** Should be under "Medically Reviewed by Monica Olivires, CADC II "

**3 pages:** `/mission-viejo-rehab`, `/treatment/detoxification`, `/treatment/residential-inpatient`

- [ ] R12 actioned

## 4.2 Verification of the highest-impact recurring items

I re-tested the measurable claims in section 4.1 against all 156 live pages on 2026-08-04.

### VIS-PHONE — wrong phone numbers (expands R8 + R9)

The workbook flags `(866)470-7342` on 16 pages and `866-939-5174` on one. The real picture is worse — **5 distinct numbers other than the tracked line, across 20 pages**, three of which look like typos of a typo:

| Number | Pages | Assessment |
|---|---|---|
| `(866) 393-5174` | 156 | ✅ the correct tracked line — present on every page |
| `866-470-7342` | 17 | ❌ wrong number — `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/costa-mesa`, `/fentanyl`, `/first-responders`, `/heroin`, `/irvine`, `/long-beach`, `/magellan`, `/meth`, `/san-clemente`, `/seal-beach`, `/what-is-drug-detox`, `/why-go-to-a-12-step-rehab` |
| `866-470-3742` | 1 | ❌ `/bcbs` — digit transposition of the wrong number |
| `866-470-7442` | 1 | ❌ `/long-beach` — another variant of the wrong number |
| `866-939-5174` | 1 | ❌ `/mission-viejo-rehab` — transposition of the **correct** number (393 → 939) |
| `877-696-6775` | 1 | ❓ `/privacy-policy` — an unrelated number, origin unknown |

Two things the workbook's manual pass could not see: the three transposition variants, and that `/bcbs` and `/long-beach` each carry **two** wrong numbers.

> ⚠️ **Do not bulk-replace these.** The workbook marks three equivalent rows on other sites (V0043, V0048, V0049) as `BLOCKED` on exactly this reasoning: a number that looks wrong may be a live tracked line routing real calls. Confirm each with admissions and with whoever owns the CallTrackingMetrics account before editing. The transposition variants are the ones most likely to be genuinely dead — a person in crisis dialling one reaches nobody.

- [ ] VIS-PHONE — numbers confirmed with admissions
- [ ] VIS-PHONE — corrections applied

### VIS-TYPO — "Mission Veijo" (expands R4)

The workbook records 26 instances. **Verified 2026-08-04: 64 occurrences across 32 pages** — `/alcohol`, `/anaheim`, `/anthem`, `/bcbs`, `/benzos`, `/cocaine`, `/costa-mesa`, `/dana-point`, `/fentanyl`, `/first-health-network`, `/first-responders`, `/heroin`, `/irvine`, `/lake-forest`, `/long-beach`, `/magellan`, `/men`, `/meth`, `/mhn-health-net-rehab`, `/newport-beach`, `/orange-county`, `/orange-county-behavioral-health`, `/prescription-drugs`, `/san-clemente`, `/san-juan-capistrano`, `/seal-beach`, `/treatment`, `/treatment/aftercare-beyond`, `/treatment/detoxification`, `/treatment/executives-rehab-in-mission-viejo`, `/treatment/residential-inpatient`, `/women` (2 each).

The facility's own city name is misspelled on a fifth of the site. Single find-and-replace in the source content, but check `data/content.json` as well as the page components.

- [x] VIS-TYPO actioned

### VIS-COPY — "Life on lifes terms." (expands R5)

The workbook records 23 instances calling for "Support for Life After Treatment". **Verified 2026-08-04: 132 occurrences across 34 pages.** Note the string is also missing its apostrophe. Confirm whether the replacement should apply to every occurrence or only headings — the workbook does not say.

- [ ] VIS-COPY actioned

### VIS-SLUG — misspelled URL

`/how-to-detoc-from-xanax` — "detoc". **Verified 2026-08-04: 200 on the build and 200 on production**, so the typo is inherited, not a migration bug. A correctly spelled `/how-to-safely-detox-from-xanax` exists separately. Fixing the slug needs a 301 from the old URL, which is indexed.

- [x] VIS-SLUG actioned

## 4.3 Complete per-page record

All 242 rows, verbatim from the workbook. `ID` is the Visual Issues row number.

### `/about` — 1 issue

| ID | Issue | Fix |
|---|---|---|
| 614 | Angela “Angie” Taylor, RADT | Missing staff photo |

### `/admissions` — 2 issues

| ID | Issue | Fix |
|---|---|---|
| 615 | Check your coverage — free & confidential. | should be the first section |
| 616 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/alcohol` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 617 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 618 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 619 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 620 | Life on lifes terms. | should read, Support for Life After Treatment |
| 621 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 622 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 623 | Fading issue throughout the whole site | The fading in of the content sometimes takes a while to load, remove the feature |

### `/anaheim` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 624 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 625 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 626 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 627 | Life on lifes terms. | should read, Support for Life After Treatment |
| 628 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 629 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 630 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/anthem` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 631 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 632 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 633 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 634 | Life on lifes terms. | should read, Support for Life After Treatment |
| 635 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 636 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 637 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/bcbs` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 638 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 639 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 640 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 641 | Life on lifes terms. | should read, Support for Life After Treatment |
| 642 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 643 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 644 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/benzos` — 9 issues

| ID | Issue | Fix |
|---|---|---|
| 645 | Page title: benzos | Capitalize the B |
| 646 | Benzo DrugRehab | add a space in between Drug Rehab |
| 647 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 648 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 649 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 650 | Life on lifes terms. | should read, Support for Life After Treatment |
| 651 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 652 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 653 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/blog` — 3 issues

| ID | Issue | Fix |
|---|---|---|
| 654 | The Hillside Mission blog | Capitalize the B |
| 655 | Newest blog not posting along side the older blogs | Fix the placement of the new blogs |
| 656 | Latest blog article for Hillside is missing | Import the blog What Is Narcan? How It Works & How to Use It |

### `/cocaine` — 8 issues

| ID | Issue | Fix |
|---|---|---|
| 657 | Cocaine DrugRehab | add a space in between Drug Rehab |
| 658 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 659 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 660 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 661 | Life on lifes terms. | should read, Support for Life After Treatment |
| 662 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 663 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 664 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/costa-mesa` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 665 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 666 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 667 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 668 | Life on lifes terms. | should read, Support for Life After Treatment |
| 669 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 670 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 671 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/dana-point` — 5 issues

| ID | Issue | Fix |
|---|---|---|
| 672 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 673 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 674 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 675 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 676 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |

### `/fentanyl` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 677 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 678 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 679 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 680 | Missing Health Insurance Can Pay for Rehab. | add with insurance icons from the homepage |
| 681 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 682 | fentanyl addiction treatment | F should be capitalized |
| 683 | fentanyl title | F should be capitalized |

### `/first-health-network` — 6 issues

| ID | Issue | Fix |
|---|---|---|
| 684 | introduction to First Health Network | I should be capitalized |
| 685 | drug detoz, in the Does First Health Network Cover Drug Detox? section | misspelled, should be detox |
| 686 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 687 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 688 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 689 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/first-responders` — 9 issues

| ID | Issue | Fix |
|---|---|---|
| 690 | Orange County Drug Rehab for First Responders | Formatting is missing |
| 691 | First RespondersRehab programs | RespondersRehab should have a space in between |
| 692 | call (866)470-7342 now! | Using a different phone number than whats being used on the nav bar |
| 693 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 694 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 695 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 696 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 697 | Life on lifes terms. | should read, Support for Life After Treatment |
| 698 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/heroin` — 6 issues

| ID | Issue | Fix |
|---|---|---|
| 699 | heroin addiction treatment | H should be capitalized |
| 700 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 701 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 702 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 703 | Life on lifes terms. | should read, Support for Life After Treatment |
| 704 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/how-to-detoc-from-xanax` — 1 issue

| ID | Issue | Fix |
|---|---|---|
| 705 | URL Clean up | how-to-detoc-from-xanax should be detox |

### `/irvine` — 6 issues

| ID | Issue | Fix |
|---|---|---|
| 706 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 707 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 708 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 709 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 710 | Life on lifes terms. | should read, Support for Life After Treatment |
| 711 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/lake-forest` — 8 issues

| ID | Issue | Fix |
|---|---|---|
| 712 | Drug Abuse in California | should be an H4 |
| 713 | Drug Abuse in Lake Forest | should be an H4 |
| 714 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 715 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 716 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 717 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 718 | Life on lifes terms. | should read, Support for Life After Treatment |
| 719 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/long-beach` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 720 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 721 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 722 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 723 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 724 | Life on lifes terms. | should read, Support for Life After Treatment |
| 725 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 726 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |

### `/magellan` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 727 | introduction to magellan | I should be capitalized |
| 728 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 729 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 730 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 731 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 732 | Life on lifes terms. | should read, Support for Life After Treatment |
| 733 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/men` — 4 issues

| ID | Issue | Fix |
|---|---|---|
| 734 | Men's Treatmentin Orange County | Treatmentin, should be spaced out to "Treatment in" |
| 735 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 736 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 737 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |

### `/meth` — 5 issues

| ID | Issue | Fix |
|---|---|---|
| 738 | Meth addiction treatment | A & T should be capitalized |
| 739 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 740 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 741 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 742 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |

### `/mission-viejo-rehab` — 11 issues

| ID | Issue | Fix |
|---|---|---|
| 743 | What Our Clients Say About Hillside Mission | Needs the google reviews slide |
| 744 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 745 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 746 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 747 | Tour Our Mission Viejo Rehab Facility | Needs a tour button link |
| 748 | Frequently Asked Questions | Needs questions, has only answers. Should be in accordian format |
| 749 | 866-939-5174 | Using a different phone number than whats being used on the nav bar |
| 750 | Image sizes | fix the sizing of the images to fit the page better |
| 751 | Medically Reviewed by Monica Olivires, CADC II | should be a widget with a see full bio link to the staff page |
| 752 | Dual Diagnosis Treatment | Must be a widet like the one in the original page linking to its respective page |
| 753 | Your health insurance can pay for rehab. | Should be under "Medically Reviewed by Monica Olivires, CADC II " |

### `/newport-beach` — 6 issues

| ID | Issue | Fix |
|---|---|---|
| 754 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 755 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 756 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 757 | Life on lifes terms. | should read, Support for Life After Treatment |
| 758 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 759 | How Hillside Mission Can Help | Detox, Inpatient Treatment, Aftercare & Luxury Accommodations should be H4's |

### `/orange-county` — 4 issues

| ID | Issue | Fix |
|---|---|---|
| 763 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 764 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 765 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 766 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |

### `/orange-county-behavioral-health` — 3 issues

| ID | Issue | Fix |
|---|---|---|
| 760 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 761 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 762 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |

### `/prescription-drugs` — 5 issues

| ID | Issue | Fix |
|---|---|---|
| 767 | Prescription Drugs addiction treatment | addition treatment should have the A & T capitalized |
| 768 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 769 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 770 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 771 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/privacy-policy` — 1 issue

| ID | Issue | Fix |
|---|---|---|
| 772 | Page content missing | All the content got stuck in the title description area, needs to be reinput into the content area |

### `/san-clemente` — 5 issues

| ID | Issue | Fix |
|---|---|---|
| 773 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 774 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 775 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 776 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 777 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |

### `/san-juan-capistrano` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 778 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 779 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 780 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 781 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 782 | How Hillside Mission is Different | Supervised Detox, Inpatient Treatment, Outpatient Care & Luxury Accommodations can all be H4's |
| 783 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 784 | Life on lifes terms. | should read, Support for Life After Treatment |

### `/seal-beach` — 11 issues

| ID | Issue | Fix |
|---|---|---|
| 785 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 786 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 787 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 788 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 789 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 790 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 791 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 792 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 793 | How Hillside Mission is Different | Supervised Detox, Inpatient Treatment, Outpatient Care & Luxury Accommodations can all be H4's |
| 794 | (866)470-7342 | Using a different phone number than whats being used on the nav bar |
| 795 | Life on lifes terms. | should read, Support for Life After Treatment |

### `/treatment` — 8 issues

| ID | Issue | Fix |
|---|---|---|
| 796 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 797 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 798 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 799 | Life on lifes terms. | should read, Support for Life After Treatment |
| 800 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 801 | Dual Diagnosis Treatment | Must be a widet like the one in the original page linking to its respective page |
| 802 | A Few Words from Our Alumni | Needs the google reviews slide |
| 803 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |

### `/treatment/aftercare-beyond` — 6 issues

| ID | Issue | Fix |
|---|---|---|
| 804 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 805 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 806 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 807 | Life on lifes terms. | should read, Support for Life After Treatment |
| 808 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 809 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |

### `/treatment/detoxification` — 11 issues

| ID | Issue | Fix |
|---|---|---|
| 810 | Drug & Alcohol Detox in mission viejo - at a glance | capitalize the Mission Viejo |
| 811 | Image sizes | fix the sizing of the images to fit the page better |
| 812 | Medically Reviewed by Monica Olivires, CADC II | should be a widget with a see full bio link to the staff page |
| 813 | Your health insurance can pay for rehab. | Should be under "Medically Reviewed by Monica Olivires, CADC II " |
| 814 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 815 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 816 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 817 | Life on lifes terms. | should read, Support for Life After Treatment |
| 818 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 819 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 820 | Trusted by Families, Proven by Results | Needs the google reviews slide |

### `/treatment/dual-diagnosis` — 8 issues

| ID | Issue | Fix |
|---|---|---|
| 821 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 822 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 823 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 824 | Life on lifes terms. | should read, Support for Life After Treatment |
| 825 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 826 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 827 | Image sizes | fix the sizing of the images to fit the page better |
| 828 | Specialized Dual Diagnosis Care in South Orange County | Missing Legit script icon and NAMI icon |

### `/treatment/executives-rehab-in-mission-viejo` — 9 issues

| ID | Issue | Fix |
|---|---|---|
| 829 | Orange County Executives REhab | Lower case the E in rehab |
| 830 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 831 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 832 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 833 | Life on lifes terms. | should read, Support for Life After Treatment |
| 834 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 835 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 836 | Request a Confidential Callback 24/7 | Remove and replace with the "You don't have to do this alone." section |
| 837 | SPECIALIZED PROGRAM FOR HIGH-FUNCTIONING PROFESSIONALS | remove or bake into the top of the title for "What is an Executive Rehab Program?" using the green text used in other sections |

### `/treatment/residential-inpatient` — 11 issues

| ID | Issue | Fix |
|---|---|---|
| 838 | Residential Rehab in mission viejo - at a glance | capitalize the Mission Viejo |
| 839 | Residential Rehab in mission viejo - at a glance | Missing Legit script icon |
| 840 | Image sizes | fix the sizing of the images to fit the page better |
| 841 | Medically Reviewed by Monica Olivires, CADC II | should be a widget with a see full bio link to the staff page |
| 842 | Your health insurance can pay for rehab. | Should be under "Medically Reviewed by Monica Olivires, CADC II " |
| 843 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 844 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 845 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 846 | Life on lifes terms. | should read, Support for Life After Treatment |
| 847 | Detox offers a state-of-the-art drug & alcohol detox program that is safe & effective at our Mission Veijo facility. | Mission Viejo is misspelled |
| 848 | Clinical Excellence & Real Recovery: Our Patient Reviews | Needs the google reviews slide |

### `/women` — 7 issues

| ID | Issue | Fix |
|---|---|---|
| 849 | Detoxification | Must be a widet like the one in the original page linking to its respective page |
| 850 | Residential Inpatient | Must be a widet like the one in the original page linking to its respective page |
| 851 | Aftercare & Alumni | Must be a widet like the one in the original page linking to its respective page |
| 852 | Life on lifes terms. | should read, Support for Life After Treatment |
| 853 | Addiction in Men and Women is Different | remove or bake into the top of the title for "How Does Substance Abuse Impact Women?" using the green text used in other sections |
| 854 | Don’t Wait Any Longer | Remove and replace with the "You don't have to do this alone." section |
| 855 | Request a Confidential Callback 24/7 | Remove and replace with the "You don't have to do this alone." section |

---

# 5. Broken internal links

**None recorded for this site.** The Broken Internal Links tab holds 29 rows covering Dallas Detox Center (16) and Fort Worth Wellness (13) only — no Hillside URLs appear anywhere in it.

That is an absence of data, not a clean bill of health: the tab was never extended to the other 10 sites, and all 29 of its rows are still marked `NOT YET VERIFIED` with Action, Owner and Done columns entirely empty.

**Independently checked 2026-08-04:** I crawled all 156 sitemap URLs plus every internal link target on this build — **all returned 200, and there were no broken internal links.** So this site does appear genuinely clean on that dimension.

---

# 6. Portfolio rows checked and found not applicable

Recorded so nobody re-checks them.

| ID | Row | Why it doesn't apply here |
|---|---|---|
| V0094 | Treatment hub slug varies portfolio-wide | Hillside already uses `/treatment`, the proposed standard |
| V0097 | About slug varies | Hillside already uses `/about`, the proposed standard |
| V0098 | Contact slug varies | Hillside already uses `/contact`, the proposed standard |
| V0100 | Privacy policy compliance | Hillside already uses `/privacy-policy` and it is in the sitemap. **But see A4** — the page content is broken in a way this row does not test |
| V0103 | Production `/contact` 301s to a JPEG | Dallas and Fort Worth only. **Verified:** `hillsidemission.com/contact` 301s to `/contact/`, not an image |
| V0116 | Preview-vs-production slug changes | Names Wellness NJ, Greater Texas, Laguna, Ocean Coast — not Hillside |

---
# 7. Staff directory updates

**Source:** [QHG bio directory](https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit) — the organization's master staff/bio document. Extracted 2026-08-04.

The directory is the authoritative roster. Cross-referencing it against what this site publishes — and against the live Quadrant staff portal — surfaces 11 issues, one of which changes how **V0054** should be resolved.

## Who belongs to this site

| Person | Role | In doc's Hillside section? | In Hillside portal feed? | Bio available? |
|---|---|---|---|---|
| Angela "Angie" Taylor, RADT | Case Manager | ✅ | ✅ | ✅ full |
| Jake Talley | Therapist | ✅ | ❌ | ❌ none — flagged "intern leaving" |
| **Phillip Carter** | **Director of Operations** | ❌ **misfiled** | ❌ **misfiled** | ✅ **full, unused** |
| Monica Olivares | Clinical Supervisor (CA-wide) | ❌ — under `Cali Leadership` | ✅ | ✅ full |

**Phillip Carter is Hillside staff.** His directory bio states it three times — *"Phillip Carter serves as the Director of Operations at **Hillside Mission Recovery**"* — and traces his progression **at Hillside** from Behavioral Health Technician through Lead Tech and Case Manager into the Director of Operations role. But his entry is physically placed under the `Wellness Ranch KY` heading, as the **very last entry in the document**, which reads as an append that landed under the wrong heading. He is the **only one of 130 entries** in the document whose bio text names a facility different from its section heading — see **DOC-11**.

Monica Olivares appears under `Cali Leadership` / `CA Sites` as **Clinical Supervisor** for QHG's California facilities — regional, not Hillside-specific.

**The staff portal has inherited the same misfiling.** `GET .../facilities/hillside-mission-recovery/staff` returns only Angela Taylor and Monica Olivares (**Clinical Supervisor**), both `photoUrl: null`. Phillip Carter instead appears on `.../facilities/wellness-ranch-kentucky/staff` — carrying the bio that says he works at Hillside Mission Recovery.

## What the site currently publishes

`/about` shows a three-person team: **Monica Olivares, CADC II — "Program Director"**, **Phillip Carter — "Director of Operations"**, and **Angela "Angie" Taylor, RADT**. Separately, `/staff/monica-olivires` and `/staff/phillip-carter` exist as standalone pages, sourced from the WordPress scrape rather than from either the directory or the portal.

I swept all 156 pages of the build against all 124 named people in the directory. Only those three appear anywhere on the site — no corporate or regional leadership is named on any page, which is the basis for **DOC-08**.

---

## DOC-01 — Phillip Carter's real biography exists but the site doesn't use it `CRITICAL`

**This is the actual fix for V0054.** The directory holds a complete, specific biography for Phillip Carter that appears nowhere on the site:

Full text, ready to use — three paragraphs, 1,445 characters (identical to what the portal stores under the wrong facility):

> Phillip Carter serves as the Director of Operations at Hillside Mission Recovery, bringing extensive experience in criminal justice, behavioral health, and recovery support. He began his career with the Indiana Department of Corrections, where he spent eight years working in state parole, case management, crisis intervention, and employment placement. During that time, he developed a strong foundation in meeting individuals where they are, navigating high-pressure situations with steadiness, and helping people recognize their potential—even when they struggle to see it themselves.
>
> Phillip joined Hillside Mission Recovery as a Behavioral Health Technician and steadily advanced through leadership roles including Lead Tech and Case Manager before stepping into his current position as Director of Operations. He also spent two years managing sober living homes, an experience that strengthened his commitment to supporting individuals as they rebuild their lives with structure, accountability, and hope.
>
> As Director of Operations, Phillip leads with integrity, grit, and compassion. He is deeply invested in cultivating a strong team culture and empowering staff to grow into their strengths. Seeing both clients and team members develop confidence, resilience, and purpose is what fuels his passion for the work. Phillip remains dedicated to helping create an environment where lasting recovery and meaningful transformation are possible.

What the site publishes instead:

| Location | Current content |
|---|---|
| `/staff/phillip-carter` | **Monica Olivares's biography, verbatim** (V0054) |
| `/about` card | a generic two-line placeholder: *"Phillip leads day-to-day operations at Hillside Mission, ensuring that every client experiences seamless, compassionate care…"* |

So the wrong-bio defect has a clean resolution: **drop in his real biography from the directory.** The workbook's proposed fix (canonical/dedupe against the parent domain) addressed the wrong problem, and removing him would be wrong too — he is Hillside's Director of Operations.

Sources to change:
- `data/content.json` — replace the `staff/phillip-carter` blocks, which currently hold Monica's bio
- `app/about/page.tsx` — replace the placeholder `bio` string in the hard-coded `team` array
- `public/images/Phillip-Carter.png` already exists, so no headshot is needed

- [x] Real bio applied to `/staff/phillip-carter`
- [x] Real bio applied to the `/about` card
- [x] V0054 closed — resolved by supplying the correct bio, not by removal
- [ ] Cross-check with HR that Director of Operations at Hillside is still current (see DOC-11)

## DOC-11 — Phillip Carter is misfiled under Wellness Ranch KY in both the directory and the portal `HIGH`

The root cause of DOC-01, and it sits upstream of this repo.

His entry is the **last item in the directory**, placed under the `Wellness Ranch KY` heading while its text names Hillside Mission Recovery three times. Of 130 entries in the document, his is the **only** one where the bio's stated facility disagrees with its section — consistent with an append error rather than a genuine transfer.

That error has already propagated into the staff portal, which is the system of record for these websites:

| Portal endpoint | Returns |
|---|---|
| `.../facilities/hillside-mission-recovery/staff` | Angela Taylor, Monica Olivares — **Phillip Carter absent** |
| `.../facilities/wellness-ranch-kentucky/staff` | Amanda Daniels, **Phillip Carter** — with the bio saying he works at Hillside |

Two consequences:

1. **On this site**, `extraStaff()` can never supply him, because the Hillside feed doesn't contain him. Even after DOC-07 inverts the precedence, he would silently drop off `/about` unless the portal is corrected first.
2. **Latent cross-site defect.** `wellness-ranch-kentucky.vercel.app` is live (HTTP 200) but has no `/about`, `/team` or `/staff` page yet — all 404. The moment one is built from this feed, that site will publish Phillip Carter as its Director of Operations with a biography stating he works at Hillside Mission Recovery. **Wellness Ranch Kentucky is not covered by the audit workbook at all** (zero rows), so nothing else would catch it.

- [ ] HR confirms which facility he belongs to
- [ ] Directory entry moved under the correct heading
- [ ] Portal record reassigned to `hillside-mission-recovery`
- [ ] Wellness Ranch team page checked before launch, in case it ships first

> Sequence this **before** DOC-07. Inverting the portal precedence while the portal still misfiles him would remove him from `/about`.

## DOC-02 — Monica Olivares's title is outdated everywhere it appears `HIGH`

| Source | Title |
|---|---|
| Live site (`/about`, `/staff/monica-olivires`) | Program Director **at Hillside Mission** |
| Bio directory | **Clinical Supervisor**, QHG California facilities |
| Staff portal | **Clinical Supervisor** |

The directory and portal agree; only the site is stale. Her published bio also opens *"Hi, I'm Monica Olivares — Program Director at Hillside Mission…"*, so the outdated title is in the prose as well as the role field.

Note she is **regional** in the directory — Clinical Supervisor across all California facilities, not Hillside staff. Whether she belongs on a facility team page is a positioning decision (see DOC-08).

Minor: the site renders her as "Monica Olivares, CADC II" and her directory bio confirms CADC II, but the portal's `credentials` field is `null`. If the portal becomes authoritative, that credential is lost unless the field is populated.

- [x] Role updated to Clinical Supervisor in `app/about/page.tsx`
- [x] Bio prose updated to the directory version
- [x] `staff/monica-olivires` page title, `<h1>` and body updated in `data/content.json`
- [ ] `credentials: "CADC II"` populated in the portal

## DOC-03 — Her surname is misspelled, and her credential is mangled `HIGH`

The directory and portal both spell **Olivares**. The site disagrees with itself:

| Location | Renders as |
|---|---|
| URL slug | `/staff/monica-olivires` ❌ |
| `<h1>` on that page | "Monica **Olivires**, **CADII**" ❌ (both wrong) |
| `<title>` on that page | "Monica Olivares, CADC II" ✅ |
| Bio body text | "Monica Olivares" ✅ |
| `/about` card | "Monica Olivares, CADC II" ✅ |
| "Medically Reviewed by" byline | "Monica **Olivires**, CADC II" ❌ |
| Photo asset | `MonicaHMS.jpeg` |

"CADII" is not a credential. The workbook logs the spelling as a secondary defect on V0054; the mangled credential and the slug are additional.

- [x] `<h1>` corrected to "Monica Olivares, CADC II"
- [x] Slug corrected to `/staff/monica-olivares` with a 301 from the old URL
- [x] Byline spelling corrected (see DOC-10)

## DOC-04 — Angela "Angie" Taylor has no headshot and no staff page `MEDIUM`

She is in the directory with a full bio and in the portal, and already renders on `/about` through the portal feed. Two gaps:

1. **No headshot.** Portal `photoUrl` is `null` and no local asset exists — Monica and Phillip both have one. This is Visual Issues row **614** ("Missing staff photo").
2. **No `/staff/` page.** Monica and Phillip have standalone pages because they came from the WordPress scrape; portal-fed people get an `/about` card only. So the site's newest staff member is the least visible.

- [ ] Headshot sourced and uploaded to the portal (preferred — benefits every site) or added locally
- [ ] `/staff/angela-taylor` page created, or the decision made that `/about` cards are sufficient
- [ ] Visual Issues row 614 closed

## DOC-05 — Do not publish Jake Talley `LOW`

The directory's Hillside section lists "Jake Talley — Therapist" with **no bio**, and the document's own header lists him under **OTHER FACILITY BIOS NEEDED** as *"Jake Talley, RADT — Therapist HMR (intern leaving)"*. He is absent from the portal feed.

Recommendation: **do not add him.** An empty bio on a YMYL healthcare team page is worse than an omission, and he is on his way out.

- [ ] Departure confirmed; entry intentionally omitted
- [ ] If he is staying, request a bio and a headshot

## DOC-06 — Bio voice is inconsistent between the site and the directory `MEDIUM`

Site bios are **first person** — *"Hi, I'm Monica Olivares… I bring clinical experience, leadership, humor…"*. Every directory and portal bio is **third person** — *"Monica Olivares serves as the Clinical Supervisor…"*.

Today the site is uniformly first-person so the mismatch is invisible. The moment portal-managed staff render alongside hand-written ones — which already happens for Angela Taylor — the two voices appear on the same page. Adopt the directory's third person, since that is what every future portal addition will supply.

- [x] Voice standard decided and applied to existing bios

## DOC-07 — Hard-coded team entries block portal corrections `HIGH`

`lib/staff-feed.ts` returns *"only people NOT already listed locally, so the hand-written entries … stay authoritative for anyone appearing in both places."*

```js
const already = new Set(local.map((m) => nameKey(m.name)));
return (data.staff ?? []).filter((p) => p.name && !already.has(nameKey(p.name)))
```

That design means **the two entries with the worst data — Monica's stale title and Phillip's stale presence — are precisely the two the portal cannot fix.** The portal has been carrying "Clinical Supervisor" all along; the local array silently overrides it. This is the mechanism behind DOC-01 and DOC-02, and it will re-stale after any manual fix.

Suggested inversion: let the portal own name, title, credentials and bio; keep the local map only for photos, which is the one thing the portal lacks.

- [ ] Precedence inverted so the portal is authoritative for text
- [ ] Local map reduced to a slug→photo lookup

## DOC-08 — No clinical or medical leadership named on the site `ENHANCEMENT — decision needed`

The directory carries leadership that covers this facility but appears nowhere on it:

| Section | People |
|---|---|
| CA Sites / Cali Leadership | Shawn Young (Executive Director), Michael McArthur (Nursing Director), Riky Hanaumi, LCSW (Clinical Director), Monica Olivares (Clinical Supervisor), Jacob Cameron (Client Care Director) |
| Cali SOUTH | Justin White (Program Director), Elizabeth Wald (Program Director), Jeremiah Ross (Nursing Supervisor), Alanna McMurtrey (Lead Case Manager) |

The portal returns only 2 people for Hillside, so the portal's position is that regional leadership are not facility staff. That is a defensible model — but the result is a YMYL medical-detox site whose team page names **no physician, no nursing lead and no clinical director**. Competing facility sites in the portfolio surface this leadership tier.

This is a positioning decision, not a defect. It pairs naturally with **V0062** (no `/team` hub exists) — if regional leadership is added, that hub is where it belongs.

- [ ] Decision: surface regional leadership on this site, or keep facility-only
- [ ] If surfacing, build the `/team` hub from V0062 and label the tier clearly ("California leadership")

## DOC-09 — Staff data lives in three unsynchronized places `MEDIUM`

| Source | Feeds | Currently wrong |
|---|---|---|
| `data/content.json` (WordPress scrape) | `/staff/<slug>` pages | Phillip's page holds Monica's bio; "Olivires"/"CADII" |
| `app/about/page.tsx` hard-coded `team` | `/about` cards | Monica's title; Phillip present at all |
| Quadrant portal feed | extra `/about` cards | nothing — it is correct |

Each defect lives in a different source, which is why none of them got caught. `/about` also links to **none** of the `/staff/` pages (V0062), so the two representations of the same person can drift indefinitely without anyone noticing.

Consolidating on the portal — with the scrape retired and `/about` linking to generated staff pages — makes every future directory change propagate on its own.

- [ ] Single source of truth chosen
- [ ] Scraped `staff/*` documents retired from `content.json`
- [x] `/about` cards link to their staff pages

## DOC-10 — "Medically Reviewed by" byline is attributed to a non-physician `COMPLIANCE`

Three pages carry **"Medically Reviewed by Monica Olivires, CADC II"** — verified 2026-08-04 on `/mission-viejo-rehab`, `/treatment/detoxification` and `/treatment/residential-inpatient`. The two treatment pages describe medical detox and residential care.

Three problems, escalating:

1. The byline carries the **misspelling** (DOC-03).
2. The title implied is outdated (DOC-02).
3. **CADC II is a counselor certification, not a medical credential.** A "Medically Reviewed by" byline on medical-detox content asserts clinical review by a medical professional. The directory names **Dr. Pamela Tambini — board-certified in Internal Medicine and Addiction Medicine** — as Medical Oversight, and **Riky Hanaumi, LCSW** as California Clinical Director. Either is a defensible reviewer for this content; a CADC II Clinical Supervisor is not.

On a YMYL healthcare site this is the kind of claim that draws both search-quality and regulatory attention. Visual Issues **R11** flags the same byline but only asks for a "see full bio" widget — it does not question the attribution.

- [ ] Correct reviewer established with clinical leadership
- [ ] Byline re-attributed, or removed if no medical review actually occurred
- [x] Spelling and title corrected in whatever remains
- [x] Visual Issues R11 (widget + bio link) folded into the same change

---

## Suggested sequence

1. **DOC-11** — get Phillip Carter refiled in the directory and the portal, and confirm his facility with HR. Everything else about him depends on this, and it also defuses the latent Wellness Ranch defect.
2. **DOC-01** — apply his real biography to `/staff/phillip-carter` and the `/about` card. Closes V0054.
3. **DOC-10** — settle the medical-review attribution. Compliance exposure, and it is three pages of edits.
4. **DOC-02 / DOC-03** — apply Monica's title, bio, spelling and slug corrections.
5. **DOC-07** — invert the portal/local precedence so DOC-02 and DOC-03 cannot re-stale. **Only after DOC-11**, or Phillip drops off `/about`.
6. **DOC-04** — request Angela Taylor's headshot; it depends on someone outside the repo, so start the ask early.
7. **DOC-06 / DOC-08 / DOC-09** — voice, leadership tier and consolidation. Decisions first, then work.

---

# Appendix A — Issues found outside the workbook

**Not from the spreadsheet.** These came from my own audit of the same build on 2026-08-04. They're included because the workbook's schema structurally cannot surface them: across all 135 of its rows there is no coverage of lead-capture functionality, accessibility, security configuration, or third-party widget setup. Delete this section if you only want the sheet's contents.

## A1 — Lead form has no delivery path `BLOCKER`

`app/api/lead/route.ts` validates the payload, `console.log`s it, and returns `{ok:true}`. Nothing is emailed, persisted, or pushed to a CRM. Confirmed against production: a POST returns `200 {"ok":true}`.

The only route to a human is a best-effort client call in `components/LeadForm.tsx`:

```js
try { await window.ClarionForms?.submit({ form_key: CLARION_FORM_KEY[variant], data: {...} }); } catch {}
```

Optional-chained inside a swallowing `try/catch`. If the Clarion script is blocked — ad blocker, privacy browser, network failure — this silently no-ops, `/api/lead` still returns 200, and the form renders *"A member of our admissions team will contact you shortly — usually within the hour."* The lead is lost with no server-side trace.

Compounding it: the Clarion API accepts submissions with a **nonexistent `form_key`** and still returns `{"success":true,"id":"…"}` (probed 2026-08-04; a bogus site key correctly returns `404 unknown site`). So a form-key mismatch between the code and the Clarion dashboard also fails silently.

- [x] Server-side persistence + delivery implemented — **delivery done** (server-side Clarion + optional Resend/SendGrid/webhook via env). **Durable persistence still open**: with no store chosen, an undelivered lead survives only in the Vercel log, keyed by its `HMR-…` reference.
- [x] Success message gated on delivery actually succeeding
- [ ] `contact` and `insurance_verification` form keys confirmed against the Clarion dashboard

## A2 — Production is an open image proxy `HIGH`

Deployed `next.config.mjs` sets:

```js
remotePatterns: [{ protocol: "https", hostname: "**" }]
```

Any HTTPS host can be resized through `/_next/image`. Verified: `google.com` and `picsum.photos` both proxy successfully at 200. That is billable Vercel bandwidth and compute exposed to anyone who finds the endpoint. Scope it to the Unsplash and Clarion storage hosts the blog feed actually uses. (SVG is correctly still blocked.)

- [x] `remotePatterns` scoped to known hosts

## A3 — Primary CTA fails WCAG AA `HIGH`

`.btn-primary` is white on `--color-teal` `#2e9e8f` = **3.28:1**, under the 4.5:1 threshold for normal text. This is the main conversion button sitewide; the `teal-bright` hover state is lighter still. Darkening to roughly `#1f7d70` clears AA without changing the brand read.

Muted body text also fails: `text-ink/40` through `/65` measure 2.97–3.87:1 and are used heavily (22 instances at `/65` on the homepage alone). The confidentiality microcopy under each form is `text-ink/50 text-xs` — 2.97:1 at small size. `text-ink/70` (5.21:1) is the safe floor.

- [x] CTA contrast fixed
- [x] Muted-text opacities raised to `/70` or above

## A4 — `/privacy-policy` content is broken `HIGH`

Passes V0100's existence test but the page itself is wrong on three counts:

1. Titled "Privacy Policy" while the body is a **Terms of Service** document — numbered sections 1–15: Parties, Content, Eligibility, Ownership, Advertising, Restrictions, with "15. Privacy" as a subsection.
2. The intro block is **duplicated twice** and contains a WordPress `[…]` read-more truncation artifact — a scrape defect.
3. **No HIPAA notice and no CCPA/CPRA disclosures.** For a California treatment provider collecting DOB, insurer and health context through web forms, that's a compliance gap rather than a content bug.

Also carries the unexplained `877-696-6775` from VIS-PHONE.

- [ ] Real privacy policy authored (HIPAA + CCPA/CPRA)
- [ ] Terms of Service split to its own page
- [x] Duplicated block and `[…]` artifact removed

## A5 — Social preview images `MEDIUM`

Eight pages have **no `og:image` at all**: `/`, `/about`, `/admissions`, `/blog`, `/contact`, `/privacy-policy`, `/thank-you`, `/tour` — the homepage and every conversion page.

The other 148 pages have one, but all point at `https://hillsidemission.com/images/…`, and the JSON-LD logo at `https://hillsidemission.com/logo-color.png`. **All 404 today**, because production is WordPress and serves `/wp-content/uploads/` instead. Every share preview is currently blank. The 148 self-heal at cutover; the 8 won't. `twitter:card` is also `summary` rather than `summary_large_image`.

- [x] `og:image` added to the 8 bespoke pages
- [x] `twitter:card` set to `summary_large_image`

## A6 — `/thank-you` leaks an internal label and is indexable `MEDIUM`

`<title>` is `"Thank You FB | Hillside Mission"` — an internal Facebook-campaign label on a public page. It's also indexable and in the sitemap; conversion pages should be `noindex` so they neither rank nor pollute conversion tracking.

- [x] Title corrected
- [x] `noindex` applied and removed from sitemap

## A7 — No security headers beyond HSTS `MEDIUM`

Production sends `strict-transport-security` and nothing else. No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy` — on a site whose forms collect DOB, insurer and health context, running three third-party scripts (Clarion widget, Clarion forms-capture, CallTrackingMetrics `//264810.tctm.co/t.js`).

- [x] Header set added to `next.config.mjs`

## A8 — Unlabeled select on `/admissions` `LOW`

The "Who needs help?" `<select>` has a `<label>` with no `htmlFor` and no `id` on the control — not programmatically associated (WCAG 1.3.1 / 4.1.2). 7 of 8 fields on that form are correct; this is the one exception.

- [x] `id`/`htmlFor` added

## A9 — Title lengths `LOW`

85 of 156 titles exceed 60 characters and 33 exceed 70, so they truncate in search results. Longest is 115 chars. `/fentanyl` double-brands: *"…Mission Viejo, CA Hillside Mission | Hillside Mission"*. One duplicate meta description pair; 16 descriptions over 160 chars.

- [x] Titles trimmed on the worst offenders

## A10 — 13 WordPress URLs will 404 at cutover `MEDIUM`

Beyond V0122's `/what-is-narcan`, the production sitemap carries 12 archive URLs the rebuild has no route for: `/category/addiction`, `/category/mental-health`, `/category/paying-for-rehab`, `/category/recovery`, `/category/treatment`, `/category/uncategorized`, `/tag/6bed-rehab-center`, `/tag/addiction-recovery`, `/tag/detox-mission-viejo`, `/tag/hillside-mission`, `/tag/mental-health`, `/tag/support`. All return 200 on production today and 404 on the build.

Low individual value, but they're indexed and may hold backlinks. Decide: build category archives, or 301 them to `/blog`.

- [x] Redirect map covers all 12 archive URLs

## A11 — Next.js two patches behind `LOW`

Deployed `15.5.20`; `15.5.22` is current on npm. The repo already moved off `15.1.6` for security advisories in commit `6527f88`, so keeping current appears to be intentional practice.

- [x] Bumped to `15.5.22`

---

# Appendix B — Notes on using the workbook

Things worth knowing before working from the spreadsheet directly.

**The Legend is stale.** It states "Total rows 118" and "IDs V0001–V0118 are now locked to a fixed mapping." The sheet actually runs to **V0135** — 17 undocumented rows added by post-verification deep audits. It also lists 3 CRITICAL items where the sheet now has 5.

**Four verified rows were deleted from the issues tabs.** V0019, V0023, V0040 and V0046 exist in the Verification Log but appear in no issue tab. Two are explained in the Legend; **V0023 and V0040 vanished undocumented**, and both were `CONFIRMED_AMENDED` — real issues. Neither concerns Hillside, but anyone reconciling counts will hit the discrepancy.

**Trust the generated counts over the hand-written ones.** The verification pass found 6 hand-written counts wrong and notes that generated counts were exact every time. My own re-measurement of the Hillside visual rows supports this: the workbook undercounted "Mission Veijo" (26 vs 64), "Life on lifes terms" (23 vs 132), and the wrong-phone-number pages (17 vs 20).

**Facility names differ between tabs** — "Hillside Mission" in Visual Issues, "Hillside Mission Recovery" in Vercel Build Issues. Any cross-tab pivot or lookup fails silently on this.

**Visual Issues has no workflow columns** — no status, owner, priority or done. 242 Hillside rows with no way to record progress. The checkboxes in section 4 are the substitute.

**61 of the workbook's 135 rows were never verified**, including V0122 and all 27 "deep audit" rows. Treat their counts with the same caution the verified set earned.
