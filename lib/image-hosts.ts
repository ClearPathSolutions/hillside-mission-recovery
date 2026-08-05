/**
 * Hosts allowed through the Next.js image optimizer.
 *
 * MUST stay in sync with `images.remotePatterns` in next.config.mjs. A2 scoped
 * that list down from `hostname: "**"`, which had made /_next/image an open
 * proxy for any HTTPS host.
 *
 * Because next/image throws when handed a src whose host isn't configured, the
 * blog components use `isOptimizableImage()` to fall back to a plain <img> if
 * Clarion ever starts serving cover images from a new CDN — a missed
 * optimization rather than a crashed page.
 */
const ALLOWED_HOSTS = [/^images\.unsplash\.com$/, /(^|\.)clarionlabs\.ai$/];

export function isOptimizableImage(src: string | null | undefined): boolean {
  if (!src) return false;
  // Local/relative paths are always fine.
  if (src.startsWith("/")) return true;
  try {
    const { hostname, protocol } = new URL(src);
    if (protocol !== "https:") return false;
    return ALLOWED_HOSTS.some((re) => re.test(hostname));
  } catch {
    return false;
  }
}
