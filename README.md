# Hillside Mission Recovery — Website

A fast, modern rebuild of [hillsidemission.com](https://hillsidemission.com) using **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4** — optimized for Vercel.

The original WordPress/Elementor site was fully scraped: **all text, images, logos, and 112 blog posts** were preserved, then rebuilt with a clean, premium, mobile-first design.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static + SSG)
npm run start    # serve the production build
```

## Deploying to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel, **New Project → Import** the repo. Framework preset: **Next.js** (auto-detected). No extra config needed.
3. Deploy. Every page is statically generated, so it's fast and cheap to host.
4. Point the `hillsidemission.com` domain at the Vercel project and update `site.url` in [`lib/site.ts`](lib/site.ts) if the domain changes.

## Project structure

```
app/
  layout.tsx            Root layout, fonts, header/footer, JSON-LD schema
  page.tsx              Home (bespoke)
  about/ contact/ admissions/ tour/ blog/    Bespoke pages
  [...slug]/page.tsx    Catch-all: treatment, substances, locations, insurance,
                        staff profiles, and all 112 blog posts (SSG)
  api/lead/route.ts     Contact / insurance form endpoint  ⚠️ see note below
  sitemap.ts robots.ts  SEO
components/             Header (mega-menu + mobile nav), Footer, Gallery,
                        LeadForm, ContentBlocks, PostCard, CTA bands, icons
lib/                    site config, navigation, content helpers, media
data/content.json      All scraped page/post content (structured blocks)
public/images/         All logos + optimized facility & blog imagery
```

URLs mirror the original site exactly (e.g. `/treatment/detoxification`,
`/alcohol`, `/what-is-group-therapy`) to preserve SEO.

## ⚠️ Before going live — connect the lead form

The contact / insurance-verification form works end-to-end in the app, but
submissions currently only log to the server. Wire up real delivery in
[`app/api/lead/route.ts`](app/api/lead/route.ts) — e.g. send an email via
Resend/SendGrid or push to your CRM. Everything else is production-ready.

## Notes

- **Content**: Editable in `data/content.json` (structured blocks) or the
  bespoke page components. The scrape/parse scripts live in `_scrape/`
  (git-ignored) if you ever need to re-pull from the old site.
- **Images**: Originals were resized to ≤1920px and recompressed. Next.js
  `<Image>` serves responsive AVIF/WebP automatically.
- **Design**: Brand tokens (colors, fonts, spacing) are defined in
  [`app/globals.css`](app/globals.css) under `@theme`.
- **The `admissions@` vs `info@` emails** were both present on the old site and
  are kept as-is in `lib/site.ts`.
