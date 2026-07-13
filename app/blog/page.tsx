import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, CATEGORIES } from "@/lib/content";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import ClarionBlog from "@/components/ClarionBlog";
import { InsuranceBand } from "@/components/CTABands";
import { IconArrow, IconClock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Blog — Addiction, Recovery & Mental Health",
  description:
    "Insights on addiction, recovery, treatment, and mental health from the team at Hillside Mission Recovery in Mission Viejo, CA.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const usedCategories = CATEGORIES.filter((c) => posts.some((p) => p.category === c));

  return (
    <>
      <PageHero
        eyebrow="Stay informed"
        title="The Hillside Mission blog"
        subtitle="Guidance on addiction, recovery, treatment, and mental health — written to help you and your family take the next step with confidence."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Featured */}
      {featured && (
        <section className="bg-cream">
          <div className="container-x py-14 md:py-20">
            <Link
              href={`/${featured.slug}`}
              className="reveal card card-hover group grid overflow-hidden lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-deep lg:aspect-auto">
                {featured.ogImage && (
                  <Image
                    src={featured.ogImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 text-xs text-ink/50">
                  <span className="rounded-full bg-teal-soft px-3 py-1 font-semibold text-teal">
                    {featured.category}
                  </span>
                  {featured.dateLabel}
                  <span className="flex items-center gap-1">
                    <IconClock className="h-3.5 w-3.5" /> {featured.readMins} min
                  </span>
                </div>
                <h2 className="mt-4 text-2xl leading-snug text-ink md:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-ink/70">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-teal transition-all group-hover:gap-3">
                  Read article <IconArrow className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* List */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="container-x">
          <BlogList posts={rest} categories={usedCategories} />
        </div>
      </section>

      {/* Clarion-managed feed — new posts published from Clarion appear here */}
      <section className="bg-cream-deep">
        <div className="container-x py-16 md:py-24">
          <div className="reveal max-w-2xl">
            <span className="text-sm font-semibold text-teal">Fresh off the press</span>
            <h2 className="mt-1 text-2xl md:text-3xl">More from our team</h2>
            <p className="mt-3 text-ink/70">
              The latest articles and updates from Hillside Mission Recovery.
            </p>
          </div>
          <div className="reveal mt-10">
            <ClarionBlog />
          </div>
        </div>
      </section>

      <InsuranceBand />
    </>
  );
}
