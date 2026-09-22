import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { gallery, staffPhotos, facilityBrand } from "@/lib/media";
import PageHero from "@/components/PageHero";
import { InsuranceBand } from "@/components/CTABands";
import { IconStaff, IconCare, IconLuxury, IconCycle, IconArrow } from "@/components/Icons";
import { extraStaff } from "@/lib/staff-feed";
import { getDoc, getStaffRoster } from "@/lib/content";

/** True when a /staff/<slug> document exists to link the card to (V0062). */
function hasStaffPage(slug: string): boolean {
  return getDoc(`staff/${slug}`) !== null;
}

/**
 * Initials for the no-headshot fallback. Quoted nicknames and trailing
 * credentials both have to go first, or `Angela "Angie" Taylor, RADT` yields
 * A + the opening quote character instead of AT.
 */
function initials(name: string): string {
  return name
    .replace(/[“"”'’][^“"”'’]*[“"”'’]/g, " ") // drop "Angie"
    .replace(/,.*$/, "") // drop , RADT / , CADC II / , LCSW
    .replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const description =
  "Hillside Mission Recovery is a luxury, 6-bed drug & alcohol rehab in Mission Viejo, CA. Meet the team and learn how we help you break free from addiction.";

export const metadata: Metadata = {
  title: "About Hillside Mission — Who We Are",
  description,
  // V0058 — this template emitted no canonical. A5 — and no og:image.
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hillside Mission — Who We Are",
    description,
    images: [facilityBrand],
  },
};

const values = [
  { Icon: IconStaff, title: "Dedicated Staff", text: "On arrival, a comprehensive team of expert professionals gently guides you into the detox process — many with lived recovery experience of their own." },
  { Icon: IconCare, title: "Personalized Treatment", text: "Through a full spectrum of care with experienced medical and clinical professionals, we create a unique treatment plan designed just for you." },
  { Icon: IconLuxury, title: "Luxury Setting", text: "A comfortable and beautiful environment has been proven to ease the pain of early recovery — so you can focus on healing." },
  { Icon: IconCycle, title: "Continuum of Care", text: "Aftercare is essential to success. From day one we work with you to identify aftercare options that build on your new foundation." },
];

// The roster is the client's supplied staff list, verbatim: eleven people, with
// their names and titles exactly as given. Bio text comes from the QHG bio
// directory. Do not append credentials or geography to a name or title here —
// an earlier pass did, and it did not match what was asked for.
//
// Phillip Carter is deliberately absent: he is not on that list, and both the
// bio directory and the headshot set file him under Wellness Ranch KY. His
// /staff page is retired and 301s to this one. See issues.md DOC-11.
//
// Dr. Pamela Tambini is on the list and sits apart from the rest: her medical
// oversight is network-wide rather than Hillside's or California's, so she is in
// the Quadrant Health Group group and her profile canonicalises to the QHG
// original (lib/content.ts, CANONICAL_AT_PARENT).
//
// BJ Thome's directory heading reads "Alumni Coordinator | California". The
// "| California" is scope, which the California leadership group already states,
// so the role renders as "Alumni Coordinator" to match how the other
// California-wide titles are written here.

// The roster — names, roles, bios, order — comes from the staff documents in
// data/content.json via getStaffRoster(). It used to be a second copy of all of
// that here, which meant editing a bio updated either the /about card or the
// /staff profile page but not both.
type Member = ReturnType<typeof getStaffRoster>[number];


export default async function AboutPage() {
  // Local entries win; the portal only contributes people not listed above.
  // Portal staff are facility-level by definition — the feed is per-facility.
  //
  // The portal currently returns photoUrl: null for everyone, so fall back to
  // the local headshot map before giving up and rendering initials. That lets a
  // portal-managed person still get an official headshot from this repo.
  // Anyone in content.json is authored here; the portal stays additive, for
  // people who do not have a profile document yet.
  const team = getStaffRoster();
  const extras = await extraStaff("hillside-mission-recovery", team);
  const roster: Member[] = [
    ...team,
    ...extras.map((e) => ({
      ...e,
      photo: e.photo ?? staffPhotos[e.slug] ?? null,
      bio: [e.bio],
    })),
  ];
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who we are"
        subtitle="A luxury drug & alcohol rehab in Mission Viejo built on one belief: treatment works best when it's delivered by people who truly care about the outcome."
        image={gallery[7].src}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Quote + intro */}
      <section className="bg-cream">
        <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">A program that cares</p>
            <h2 className="mt-4 text-3xl md:text-4xl">We understand addiction — and how to help.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              At Hillside Mission, we know how to help you break free from drug and alcohol abuse once and for
              all. Addiction is different for every client who comes through our doors, which is why we use
              individualized plans for each and every person.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Our caring, professional staff are dedicated to providing the best possible care to every
              client — meeting you exactly where you are on the road to recovery.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/treatment" className="btn btn-primary">
                How we can help <IconArrow className="h-4 w-4" />
              </Link>
              <Link href="/tour" className="btn btn-ghost">
                Tour our facility
              </Link>
            </div>
          </div>
          <figure className="reveal relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={gallery[1].src} alt={gallery[1].alt} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <blockquote className="mt-6 border-l-4 border-teal pl-5 font-display text-xl leading-snug text-ink md:text-2xl">
              &ldquo;We aim to provide treatment that works, by people who truly care about the outcome.&rdquo;
              <footer className="mt-2 font-sans text-sm font-medium not-italic text-ink/70">
                — {site.fullName}
              </footer>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-deep">
        <div className="container-x py-20 md:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-center justify-center">The Hillside Mission difference</p>
            <h2 className="mt-4 text-3xl md:text-4xl">What sets our care apart</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="reveal card p-7" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                  <v.Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-center justify-center">Experienced professionals</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Meet our team</h2>
            <p className="mt-4 text-ink/70">The people who make recovery at Hillside Mission personal.</p>
          </div>
          {/* One flat list in roster order. This was previously split into
              facility / Southern California / California leadership / network
              tiers, on the reasoning that grouping stopped the page implying
              regional leaders were on site day to day. That reasoning does not
              hold — these people do work across several facilities — so the
              tiers were removed and the roster reads in the requested order. */}
          {/* Full-width rows rather than a two-column card grid: these are the
              directory's complete bios, up to five paragraphs, which a narrow
              card can't hold without going very tall and leaving the shorter
              entries ragged beside it. */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="space-y-8">
              {roster.map((m) => (
                      <div
                        key={m.slug}
                        className="reveal card overflow-hidden sm:flex sm:items-stretch"
                      >
                        <div className="relative aspect-[4/3] shrink-0 self-start overflow-hidden bg-cream-deep sm:aspect-[3/4] sm:w-48 md:w-56">
                          {m.photo ? (
                            <Image
                              src={m.photo}
                              alt={m.name}
                              fill
                              sizes="(min-width:768px) 16rem, (min-width:640px) 14rem, 100vw"
                              className="object-cover object-top"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-teal/10 text-4xl font-semibold text-teal">
                              {initials(m.name)}
                            </div>
                          )}
                        </div>
                        {/* Centred, because the 3:4 portrait sets the card
                            height and the excerpt is shorter than it. */}
                        <div className="flex flex-col justify-center p-7 md:p-8">
                          <h4 className="text-xl text-ink">{m.name}</h4>
                          <p className="text-sm font-semibold text-teal">{m.role}</p>
                          {/* One clamped excerpt, not the whole bio. Rendering
                              every paragraph here made each card as tall as its
                              longest bio — Dr. Tambini's ran seven paragraphs —
                              which stretched the photo beside it and left the
                              cards wildly uneven. The full text lives on the
                              profile page behind "Read full bio". */}
                          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink/70">
                            {m.bio[0]}
                          </p>
                          {/* V0062 / DOC-09 — the staff pages had no inbound link from
                              anywhere on the site, and /about linked to none of them. */}
                          {hasStaffPage(m.slug) && (
                            <Link
                              href={`/staff/${m.slug}`}
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-all hover:gap-2.5"
                            >
                              Read full bio <IconArrow className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-ink text-white">
        <div className="container-x flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
          <div className="reveal">
            <p className="font-display text-5xl text-teal-bright md:text-6xl">{site.peopleHelped}</p>
            <p className="mt-2 text-cream/70">People helped by #HMR since {site.establishedYear}.</p>
          </div>
          <p className="reveal max-w-md text-cream/70">
            We&apos;ve helped over a thousand people find their path to lasting recovery from drugs and
            alcohol. Find out how to begin yours today.
          </p>
          <a href={site.phoneHref} className="reveal btn btn-primary shrink-0">
            Call {site.phone}
          </a>
        </div>
      </section>

      <InsuranceBand />
    </>
  );
}
