import { site } from "@/lib/site";

/**
 * Renders the Clarion-managed blog feed. New posts published from Clarion
 * hydrate into the `data-clarion-blog` element via the embed script.
 * This runs alongside the site's pre-existing curated posts.
 */
export default function ClarionBlog() {
  const { siteKey, api, blogEmbed } = site.widgets.clarion;
  return (
    <>
      {/* Blog posts render inside this element */}
      <div data-clarion-blog />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src={blogEmbed} data-site-key={siteKey} data-api={api} />
    </>
  );
}
