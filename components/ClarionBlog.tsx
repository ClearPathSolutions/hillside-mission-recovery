import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Renders the Clarion-managed blog feed. New posts published from Clarion
 * hydrate into the `data-clarion-blog` element via the embed script.
 * This runs alongside the site's pre-existing curated posts.
 *
 * Uses next/script (not a bare <script> tag): a raw <script src> in JSX gets
 * turned into a <link rel="preload"> by Next, which downloads the file but never
 * runs it. `afterInteractive` guarantees execution and preserves the data-* attrs.
 */
export default function ClarionBlog() {
  const { siteKey, api, blogEmbed } = site.widgets.clarion;
  return (
    <>
      {/* Blog posts render inside this element (present in server HTML before the script runs) */}
      <div data-clarion-blog />
      <Script
        src={blogEmbed}
        strategy="afterInteractive"
        data-site-key={siteKey}
        data-api={api}
      />
    </>
  );
}
