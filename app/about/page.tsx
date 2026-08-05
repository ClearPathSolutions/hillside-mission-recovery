import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { gallery, staffPhotos, facilityBrand } from "@/lib/media";
import PageHero from "@/components/PageHero";
import { InsuranceBand } from "@/components/CTABands";
import { IconStaff, IconCare, IconLuxury, IconLeaf, IconArrow } from "@/components/Icons";
import { extraStaff } from "@/lib/staff-feed";
import { getDoc } from "@/lib/content";

/** True when a /staff/<slug> document exists to link the card to (V0062). */
function hasStaffPage(slug: string): boolean {
  return getDoc(`staff/${slug}`) !== null;
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
  { Icon: IconLeaf, title: "Continuum of Care", text: "Aftercare is essential to success. From day one we work with you to identify aftercare options that build on your new foundation." },
];

// Bios and titles follow the QHG staff directory / support portal, which is the
// authoritative roster. See issues.md DOC-01 (Phillip's real bio) and DOC-02/03
// (Monica's title, surname and credential).
const team = [
  {
    slug: "monica-olivares",
    name: "Monica Olivares, CADC II",
    role: "Clinical Supervisor",
    photo: staffPhotos["monica-olivares"],
    bio: "Monica Olivares serves as the Clinical Supervisor for Quadrant Health Group's California facilities, bringing over 11 years of experience in the behavioral health field and a deeply personal passion for recovery and healing. Throughout her career, Monica has worked across nearly every level of care — including Detox, Residential, IOP, PHP, and Outpatient programs — while holding a wide range of roles from Behavioral Health Technician and Case Manager to Program Manager and Program Director.",
  },
  {
    slug: "phillip-carter",
    name: "Phillip Carter",
    role: "Director of Operations",
    photo: staffPhotos["phillip-carter"],
    bio: "Phillip Carter serves as the Director of Operations at Hillside Mission Recovery, bringing extensive experience in criminal justice, behavioral health, and recovery support. He began his career with the Indiana Department of Corrections, where he spent eight years working in state parole, case management, crisis intervention, and employment placement. During that time, he developed a strong foundation in meeting individuals where they are, navigating high-pressure situations with steadiness, and helping people recognize their potential—even when they struggle to see it themselves.",
  },
];

export default async function AboutPage() {
  // Local entries win; the portal only contributes people not listed above.
  const roster = [...team, ...(await extraStaff("hillside-mission-recovery", team))];
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
            <p className="mt-4 leading-relaxed text-ink/70">
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
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
            {roster.map((m) => (
              <div key={m.slug} className="reveal card overflow-hidden">
                <div className="relative aspect-[4/3] bg-cream-deep">
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} fill sizes="(min-width:640px) 45vw, 90vw" className="object-cover object-top" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-teal/10 font-semibold text-4xl text-teal">
                      {m.name.replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-xl text-ink">{m.name}</h3>
                  <p className="text-sm font-semibold text-teal">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{m.bio}</p>
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
