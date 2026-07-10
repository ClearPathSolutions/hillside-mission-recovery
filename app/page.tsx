import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { facilityHero, gallery } from "@/lib/media";
import { getRecentPosts } from "@/lib/content";
import { InsuranceBand, HelpBand, TrustStrip } from "@/components/CTABands";
import PostCard from "@/components/PostCard";
import {
  IconArrow,
  IconPhone,
  IconCheck,
  IconLeaf,
  IconCare,
  IconStaff,
  IconLuxury,
  IconClock,
} from "@/components/Icons";

export default function HomePage() {
  const posts = getRecentPosts(3);

  const heroFeatures = ["Private Accommodations", "Serene Pool & Spa", "Chef-Prepared Meals"];

  const stats = [
    { value: "1,000+", label: "People helped since 2015" },
    { value: "6-Bed", label: "Intimate, private census" },
    { value: "24/7", label: "Clinical & medical support" },
    { value: "100%", label: "Individualized care plans" },
  ];

  const differentiators = [
    { Icon: IconStaff, title: "Dedicated Staff", text: "A team of expert professionals — many with lived recovery experience — guides you from day one." },
    { Icon: IconCare, title: "Personalized Treatment", text: "A full spectrum of care with a treatment plan designed uniquely around you." },
    { Icon: IconLuxury, title: "Luxury Setting", text: "A comfortable, beautiful environment proven to ease the pain of early recovery." },
    { Icon: IconLeaf, title: "Continuum of Care", text: "From detox to alumni, we build a lasting foundation for life beyond rehab." },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-white">
        <Image
          src={facilityHero}
          alt="Hillside Mission Recovery residence in Mission Viejo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Minimal overlay so the photo stays bright; legibility comes mostly
            from the text-shadow, with just a light left/bottom scrim. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

        <div className="container-x relative flex min-h-[92svh] flex-col justify-center pt-28 pb-16">
          <div className="max-w-2xl [text-shadow:0_2px_14px_rgba(0,0,0,0.6),0_1px_3px_rgba(0,0,0,0.5)]">
            <p className="eyebrow !text-teal-bright [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">Gold-Seal Accredited Treatment</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              Luxury Detox &amp; Residential Rehab in Mission Viejo
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/95">
              Better your life at our alcohol &amp; drug rehab in Mission Viejo — addiction treatment that
              works, delivered by people who truly care.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/admissions" className="btn btn-primary">
                Verify Your Insurance <IconArrow className="h-4 w-4" />
              </Link>
              <a href={site.phoneHref} className="btn btn-light">
                <IconPhone className="h-4 w-4" /> {site.phone}
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {heroFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-cream/85">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-teal/25 text-teal-bright">
                    <IconCheck className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom availability chip */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/40 backdrop-blur-sm">
          <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4 text-sm text-cream/75">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-bright opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-bright" />
              </span>
              Admissions open now — beds available
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="h-4 w-4 text-teal-bright" /> Confidential callback 24/7
            </span>
          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY / INTRO ============ */}
      <section className="bg-cream">
        <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={gallery[2].src}
                alt={gallery[2].alt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-56 rounded-2xl bg-ink p-6 text-white shadow-lift sm:block md:-right-8">
              <p className="font-display text-4xl text-teal-bright">Est. 2015</p>
              <p className="mt-1 text-sm text-cream/70">Trusted Orange County recovery.</p>
            </div>
          </div>

          <div className="reveal">
            <p className="eyebrow">Modern &amp; effective addiction treatment</p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem]">Break free from addiction at Hillside.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              We believe that lasting sobriety comes from treating the whole person. Our program integrates
              mind-body wellness so we can help you heal the roots of addiction — not just the symptoms.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Every client who comes through our doors is different, which is why we build an individualized
              plan for each person. From medical detox to residential care and aftercare, our caring,
              professional staff walk with you every step of the way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/about" className="btn btn-ghost">
                About Hillside Mission
              </Link>
              <Link href="/tour" className="btn btn-primary">
                Tour Our Facility <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="bg-cream-deep">
        <div className="container-x py-20 md:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-center justify-center">Our drug rehab services</p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem]">A full continuum of care</h2>
            <p className="mt-4 text-ink/70">
              Every stage of recovery, under one roof — so you never have to navigate the next step alone.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={s.slug}
                className="reveal card card-hover group flex flex-col p-7"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid h-13 w-13 place-items-center rounded-2xl bg-teal-soft p-3 text-teal">
                  <s.Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl text-ink">{s.title}</h3>
                <p className="mt-1 text-sm font-medium text-teal">{s.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-all group-hover:gap-2.5 group-hover:text-teal">
                  Learn more <IconArrow className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-ink text-white">
        <div className="container-x py-16 md:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="reveal text-center">
                <p className="font-display text-5xl text-teal-bright md:text-6xl">{s.value}</p>
                <p className="mt-2 text-sm text-cream/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATORS ============ */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow">The Hillside Mission difference</p>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem]">
                Premiere Mission Viejo drug rehab.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/75">
                Hillside Mission is dedicated to providing the best medication-assisted detox, residential
                inpatient care, and aftercare in a comfortable, luxurious setting — so you can focus fully on
                getting your life back.
              </p>
              <div className="mt-8">
                <TrustStrip />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {differentiators.map((d, i) => (
                <div
                  key={d.title}
                  className="reveal card p-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-teal-bright">
                    <d.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="relative isolate overflow-hidden bg-ink-700 text-white">
        <Image src={gallery[4].src} alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative py-20 text-center md:py-28">
          <p className="reveal eyebrow eyebrow-center justify-center !text-teal-bright">A few words from our alumni</p>
          <blockquote className="reveal mx-auto mt-6 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
            &ldquo;Recovery happens here.&rdquo;
          </blockquote>
          <p className="reveal mt-6 text-cream/70">— Hillside Mission Recovery</p>
          <div className="reveal mt-10">
            <Link href="/tour" className="btn btn-light">
              See where recovery happens <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ INSURANCE ============ */}
      <InsuranceBand />

      {/* ============ HELP ============ */}
      <HelpBand />

      {/* ============ LATEST BLOGS ============ */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Stay informed</p>
              <h2 className="mt-4 text-3xl md:text-4xl">Latest from our blog</h2>
            </div>
            <Link href="/blog" className="btn btn-ghost">
              View all articles <IconArrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
