import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClarionPost, clarionCategory } from "@/lib/clarion";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import PostCard from "@/components/PostCard";
import { InsuranceBand } from "@/components/CTABands";
import { IconClock, IconArrow } from "@/components/Icons";

// Clarion posts are fetched on demand; allow slugs not known at build time.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getClarionPost(slug);
  if (!post) return {};
  const title = post.seo_meta?.title || post.title;
  const description = post.seo_meta?.description || post.excerpt;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: "article",
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function ClarionArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getClarionPost(slug);
  if (!post) notFound();

  const category = clarionCategory(post);
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const words = post.body_html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(1, Math.round(words / 200));
  const related = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Article header — matches the curated article layout */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {post.cover_image_url && (
          <>
            <Image
              src={post.cover_image_url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink" />
          </>
        )}
        <div className="container-x relative pt-32 pb-14 md:pt-40 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/60">
              <li>
                <Link href="/" className="hover:text-teal-bright">Home</Link>
              </li>
              <li className="text-cream/30">/</li>
              <li>
                <Link href="/blog" className="hover:text-teal-bright">Blog</Link>
              </li>
            </ol>
          </nav>
          <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal-bright">
            {category}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.08] md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/70">
            {dateLabel && <span>{dateLabel}</span>}
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4" /> {readMins} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream">
        <div className="container-x py-16 md:py-20">
          <article
            className="clarion-prose reveal mx-auto min-w-0 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: post.body_html }}
          />
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-white p-7">
            <h3 className="text-xl text-ink">Ready to take the next step?</h3>
            <p className="mt-2 text-ink/65">
              If you or someone you love is struggling, Hillside Mission is here to help —
              confidentially, 24/7.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn btn-primary">Call {site.phone}</a>
              <Link href="/admissions" className="btn btn-ghost">Verify insurance</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-deep">
          <div className="container-x py-16 md:py-24">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl">Keep reading</h2>
              <Link
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-semibold text-teal sm:inline-flex"
              >
                All articles <IconArrow className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <InsuranceBand />
    </>
  );
}
