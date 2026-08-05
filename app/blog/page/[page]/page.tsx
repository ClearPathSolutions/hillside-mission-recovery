import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllPosts, archiveSlice, archiveTotalPages, type PostMeta } from "@/lib/content";
import { getClarionPosts } from "@/lib/clarion";
import { defaultOgImage } from "@/lib/media";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { InsuranceBand } from "@/components/CTABands";

/**
 * V0061 — server-side blog pagination.
 *
 * /blog renders a featured post plus a client-filtered list that only shows 9
 * cards until the visitor clicks, so the other ~104 articles had no crawlable
 * link anywhere on the site (`/blog/page/2` and `/blog/2` both 404'd). These
 * archive pages give every post a plain <a> path from /blog.
 */

async function allPosts(): Promise<PostMeta[]> {
  const clarion = await getClarionPosts();
  return [...getAllPosts(), ...clarion].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function generateStaticParams() {
  // Clarion's feed can change between builds; base the static pages on the
  // curated set and let anything beyond it render on demand.
  const total = archiveTotalPages(getAllPosts().length);
  // page 1 is /blog; prerender 2..N
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  const title = `Blog — page ${n}`;
  const description = `Articles on addiction, recovery, treatment and mental health from Hillside Mission Recovery — page ${n}.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/page/${n}` },
    openGraph: { title, description, images: [defaultOgImage] },
  };
}

export default async function BlogArchivePage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1) notFound();
  // Page 1 is /blog itself — avoid a duplicate of the index.
  if (n === 1) redirect("/blog");

  const posts = await allPosts();
  const totalPages = archiveTotalPages(posts.length);
  if (n > totalPages) notFound();

  const slice = archiveSlice(posts, n);
  if (slice.length === 0) notFound();

  return (
    <>
      <PageHero
        eyebrow="Stay informed"
        title={`All articles — page ${n}`}
        subtitle={`Every article from the Hillside Mission blog. Page ${n} of ${totalPages}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `Page ${n}` }]}
      />

      <section className="bg-cream pb-20 md:pb-28">
        <div className="container-x pt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slice.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <Pagination current={n} total={totalPages} />
        </div>
      </section>

      <InsuranceBand />
    </>
  );
}
