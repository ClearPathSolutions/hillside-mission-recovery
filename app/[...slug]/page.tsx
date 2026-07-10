import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDoc,
  getCatchAllSlugs,
  getRelatedPosts,
  deriveCategory,
  type Doc,
} from "@/lib/content";
import { site } from "@/lib/site";
import { staffPhotos } from "@/lib/media";
import PageHero from "@/components/PageHero";
import ContentBlocks, { getTOC } from "@/components/ContentBlocks";
import { ContentSidebar } from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { InsuranceBand, HelpBand } from "@/components/CTABands";
import { IconClock, IconArrow } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCatchAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description || doc.excerpt,
    openGraph: {
      title: doc.title,
      description: doc.description || doc.excerpt,
      images: doc.ogImage ? [doc.ogImage] : undefined,
      type: doc.type === "post" ? "article" : "website",
    },
    alternates: { canonical: `/${doc.slug}` },
  };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: segments } = await params;
  const slug = segments.join("/");
  const doc = getDoc(slug);
  if (!doc) notFound();

  if (doc.type === "staff") return <StaffPage doc={doc} />;
  if (doc.type === "post") return <ArticlePage doc={doc} />;
  return <ContentPage doc={doc} />;
}

/* ---------- Standard content page (treatment / substance / location / insurance) ---------- */
function ContentPage({ doc }: { doc: Doc }) {
  const toc = getTOC(doc.blocks);
  const title = doc.h1 || doc.title;
  return (
    <>
      <PageHero
        eyebrow={sectionEyebrow(doc.slug)}
        title={title}
        subtitle={doc.description}
        image={doc.ogImage || undefined}
        crumbs={buildCrumbs(doc)}
      />
      <section className="bg-cream">
        <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <article className="reveal min-w-0 max-w-2xl">
            <ContentBlocks blocks={doc.blocks} />
          </article>
          <div className="reveal">
            <ContentSidebar toc={toc} />
          </div>
        </div>
      </section>
      <HelpBand />
      <InsuranceBand />
    </>
  );
}

/* ---------- Blog article ---------- */
function ArticlePage({ doc }: { doc: Doc }) {
  const toc = getTOC(doc.blocks);
  const category = deriveCategory(doc);
  const dateLabel = doc.date
    ? new Date(doc.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
  const related = getRelatedPosts(doc.slug, category, 3);

  return (
    <>
      {/* Article header */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {doc.ogImage && (
          <>
            <Image src={doc.ogImage} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
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
          <h1 className="mt-4 max-w-4xl text-3xl leading-[1.08] md:text-5xl">{doc.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/70">
            {dateLabel && <span>{dateLabel}</span>}
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4" /> {doc.readMins} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream">
        <div className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <article className="reveal min-w-0 max-w-2xl">
            <ContentBlocks blocks={doc.blocks} />
            <div className="mt-12 rounded-2xl border border-line bg-white p-7">
              <h3 className="text-xl text-ink">Ready to take the next step?</h3>
              <p className="mt-2 text-ink/65">
                If you or someone you love is struggling, Hillside Mission is here to help — confidentially,
                24/7.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={site.phoneHref} className="btn btn-primary">Call {site.phone}</a>
                <Link href="/admissions" className="btn btn-ghost">Verify insurance</Link>
              </div>
            </div>
          </article>
          <div className="reveal">
            <ContentSidebar toc={toc} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-deep">
          <div className="container-x py-16 md:py-24">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl">Keep reading</h2>
              <Link href="/blog" className="hidden items-center gap-1.5 text-sm font-semibold text-teal sm:inline-flex">
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

/* ---------- Staff profile ---------- */
function StaffPage({ doc }: { doc: Doc }) {
  const key = doc.slug.split("/").pop() || "";
  const photo = staffPhotos[key];
  const role = /monica/i.test(doc.slug) ? "Program Director" : "Director of Operations";
  const name = doc.h1 || doc.title;

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title={name}
        subtitle={role}
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: name }]}
      />
      <section className="bg-cream">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <div className="reveal">
            {photo && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream-deep">
                <Image src={photo} alt={name} fill sizes="(min-width:1024px) 20rem, 90vw" className="object-cover object-top" />
              </div>
            )}
            <div className="mt-5 rounded-2xl bg-ink p-6 text-white">
              <p className="text-sm text-cream/70">Speak with our team</p>
              <a href={site.phoneHref} className="btn btn-primary mt-3 w-full">{site.phone}</a>
            </div>
          </div>
          <article className="reveal min-w-0 max-w-2xl">
            <p className="text-sm font-semibold text-teal">{role}</p>
            <h2 className="mt-1 text-3xl md:text-4xl">{name}</h2>
            <div className="mt-6">
              <ContentBlocks blocks={doc.blocks} />
            </div>
          </article>
        </div>
      </section>
      <InsuranceBand />
    </>
  );
}

/* ---------- helpers ---------- */
function sectionEyebrow(slug: string): string {
  if (slug.startsWith("treatment")) return "Treatment Program";
  if (["alcohol", "heroin", "cocaine", "meth", "benzos", "fentanyl", "prescription-drugs"].includes(slug))
    return "What We Treat";
  if (["anthem", "bcbs", "magellan", "first-health-network", "mhn-health-net-rehab"].includes(slug))
    return "Insurance";
  if (["men", "women", "first-responders"].includes(slug)) return "Who We Help";
  if (slug === "privacy-policy" || slug === "thank-you") return "Hillside Mission";
  return "Areas We Serve";
}

function buildCrumbs(doc: Doc) {
  const crumbs: { label: string; href?: string }[] = [{ label: "Home", href: "/" }];
  const parts = doc.slug.split("/");
  if (parts[0] === "treatment" && parts.length > 1) {
    crumbs.push({ label: "Treatment", href: "/treatment" });
  }
  crumbs.push({ label: doc.h1 || doc.title });
  return crumbs;
}
