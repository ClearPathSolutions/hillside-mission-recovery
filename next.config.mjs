/** @type {import('next').NextConfig} */

// Third-party origins the site actually loads. Keep in sync with
// lib/image-hosts.ts (used to guard next/image against unknown hosts).
const CLARION = "https://*.clarionlabs.ai";
const CTM = "https://*.tctm.co https://*.calltrackingmetrics.com";

// A7 — security headers. Only HSTS was set before.
// The CSP keeps 'unsafe-inline' because Next.js emits inline bootstrap scripts
// and the Clarion widget injects inline styles; the value here is pinning which
// *origins* may execute, which is what was missing. Tighten to nonces if the
// app moves to a nonce-aware CSP.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${CLARION} ${CTM}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.unsplash.com ${CLARION} ${CTM}`,
  "font-src 'self' data:",
  `connect-src 'self' ${CLARION} ${CTM}`,
  `frame-src 'self' ${CLARION} https://www.google.com`,
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
