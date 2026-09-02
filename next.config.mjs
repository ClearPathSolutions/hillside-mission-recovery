/** @type {import('next').NextConfig} */

// Third-party origins the site actually loads. Keep in sync with
// lib/image-hosts.ts (used to guard next/image against unknown hosts).
const CLARION = "https://*.clarionlabs.ai";
// Listed explicitly in img-src as well as being covered by the wildcard above.
// Redundant today on purpose: post covers are served from this host, so if
// anyone ever narrows CLARION to `www.clarionlabs.ai`, an explicit entry keeps
// images loading instead of failing silently. Do not "simplify" it away.
const CLARION_API = "https://api.clarionlabs.ai";
// Inline body images in Clarion posts point at CLARION_API, which answers with a
// 302 to a presigned S3 URL on this bucket. CSP is enforced against the final
// URL of a redirect chain, not just the one in the markup, so without this host
// every in-article image is blocked and renders as a broken icon. Cover images
// were unaffected because approveCover() swaps them for local facility photos.
const CLARION_MEDIA = "https://clarion-meta-ads-media.s3.amazonaws.com";
const CTM = "https://*.tctm.co https://*.calltrackingmetrics.com";

// Google Tag Manager and the Google tags it most commonly loads (GA4, Ads).
// GTM is a container: anything added in its UI fetches from its own origin, so
// a new tag type (Meta Pixel, LinkedIn, Hotjar, ...) needs its origin added
// here as well or the CSP will block it silently.
const GTM = "https://www.googletagmanager.com";
// Bare hosts are listed alongside the wildcards on purpose: `*.analytics.google.com`
// does not match `analytics.google.com`, which is the host GA4 actually posts to.
const GOOGLE_ANALYTICS =
  "https://www.google-analytics.com https://analytics.google.com " +
  "https://*.analytics.google.com https://*.google-analytics.com";
// `*.doubleclick.net` rather than `*.g.doubleclick.net` — Ads conversion tracking
// collects on ad.doubleclick.net, which is not under the .g. subdomain.
const GOOGLE_ADS =
  "https://www.google.com https://www.googleadservices.com https://*.doubleclick.net";
// Microsoft Clarity, loaded as a tag inside the GTM container.
const CLARITY = "https://www.clarity.ms https://*.clarity.ms";
// Clarity fires an identity-sync pixel at Bing; image-only, no script.
const BING = "https://c.bing.com";

// A7 — security headers. Only HSTS was set before.
// The CSP keeps 'unsafe-inline' because Next.js emits inline bootstrap scripts
// and the Clarion widget injects inline styles; the value here is pinning which
// *origins* may execute, which is what was missing. Tighten to nonces if the
// app moves to a nonce-aware CSP.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${CLARION} ${CTM} ${GTM} ${GOOGLE_ANALYTICS} ${GOOGLE_ADS} ${CLARITY}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${CLARION_API} ${CLARION_MEDIA} https://images.unsplash.com ${CLARION} ${CTM} ${GTM} ${GOOGLE_ANALYTICS} ${GOOGLE_ADS} ${CLARITY} ${BING}`,
  "font-src 'self' data:",
  `connect-src 'self' ${CLARION} ${CTM} ${GTM} ${GOOGLE_ANALYTICS} ${GOOGLE_ADS} ${CLARITY}`,
  `frame-src 'self' ${CLARION} ${GTM} https://www.google.com https://td.doubleclick.net`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // A2 — was `hostname: "**"`, which made /_next/image an open proxy for any
    // HTTPS host. Scoped to the hosts the Clarion blog feed actually serves
    // cover images from.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.clarionlabs.ai" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // `permanent: true` emits 308, but issues.md specifies 301 for these and the
    // inbound links are all GET, so 301 is used explicitly for the widest
    // crawler and legacy-tooling support.
    return [
      // DOC-03 — misspelled staff slug; the old URL is indexed.
      {
        source: "/staff/monica-olivires",
        destination: "/staff/monica-olivares",
        statusCode: 301,
      },
      // Phillip Carter is not on the client's staff list, and both the QHG bio
      // directory and the headshot set file him under Wellness Ranch KY. His
      // page is retired; the URL is indexed, so it redirects rather than 404s.
      {
        source: "/staff/phillip-carter",
        destination: "/about",
        statusCode: 301,
      },
      // VIS-SLUG — inherited "detoc" typo, live on production and indexed.
      {
        source: "/how-to-detoc-from-xanax",
        destination: "/how-to-detox-from-xanax",
        statusCode: 301,
      },
      // A10 — WordPress archive URLs that are live on production today and have
      // no route in the rebuild. Wildcarded so future archive URLs land too.
      { source: "/category/:slug*", destination: "/blog", statusCode: 301 },
      { source: "/tag/:slug*", destination: "/blog", statusCode: 301 },
    ];
  },
};
export default nextConfig;
