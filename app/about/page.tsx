import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { gallery, staffPhotos, facilityBrand } from "@/lib/media";
import PageHero from "@/components/PageHero";
import { InsuranceBand } from "@/components/CTABands";
import { IconStaff, IconCare, IconLuxury, IconCycle, IconArrow } from "@/components/Icons";
import { extraStaff } from "@/lib/staff-feed";
import { getDoc } from "@/lib/content";

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

// The roster is the client's supplied staff list, verbatim: ten people, with
// their names and titles exactly as given. Bio text comes from the QHG bio
// directory. Do not append credentials or geography to a name or title here —
// an earlier pass did, and it did not match what was asked for.
//
// Phillip Carter is deliberately absent: he is not on that list, and both the
// bio directory and the headshot set file him under Wellness Ranch KY. His
// /staff page is retired and 301s to this one. See issues.md DOC-11.
//
// Dr. Pamela Tambini is not on that list either, and is here on purpose: her
// medical oversight is network-wide rather than Hillside's, so she sits in the
// Quadrant Health Group group and her profile canonicalises to the QHG original
// (lib/content.ts, CANONICAL_AT_PARENT).
//
// Groups mirror the three tabs the list itself pointed at (CA sites, Cali
// South, Hillside), plus a fourth for network-wide oversight, so the page
// doesn't imply that state-, region- and group-level leadership are based on
// site day to day.
const GROUPS = [
  {
    key: "facility",
    label: "At Hillside Mission",
    blurb: "The team you meet at our Mission Viejo residence.",
  },
  {
    key: "socal",
    label: "Southern California",
    blurb: "Program and clinical leadership across our Southern California facilities.",
  },
  {
    key: "california",
    label: "California leadership",
    blurb: "Executive, medical and clinical oversight for every Quadrant Health Group facility in California.",
  },
  {
    key: "network",
    label: "Quadrant Health Group",
    blurb: "Medical oversight shared across every Quadrant Health Group facility, nationwide.",
  },
] as const;

type GroupKey = (typeof GROUPS)[number]["key"];

type Member = {
  slug: string;
  name: string;
  role: string;
  group: GroupKey;
  photo?: string;
  /** Paragraphs, verbatim from the QHG bio directory. */
  bio: string[];
};

// Bios are the directory's full text, not an excerpt — voice included. Shawn
// Young's and Michael McArthur's are written in the first person and the rest
// in the third; that is how they were authored, and nobody's professional bio
// gets rewritten here (issues.md DOC-06).
const team: Member[] = [
  {
    slug: "justin-white",
    name: "Justin White",
    role: "Program Director",
    group: "socal",
    photo: staffPhotos["justin-white"],
    bio: [
      "Justin White serves as Program Director for Quadrant Health Group's Southern California facilities, providing operational leadership and program oversight across the organization's behavioral health treatment centers. In this role, he works closely with multidisciplinary teams to ensure each facility delivers high-quality, individualized care while maintaining excellence in clinical programming, regulatory compliance, and day-to-day operations.",
      "A Registered Addiction Counselor, Justin brings extensive experience in both detoxification and residential treatment settings. His leadership is rooted in the belief that recovery is never one-size-fits-all, and he is committed to fostering treatment environments where every client feels respected, supported, and empowered throughout their healing journey.",
      "Known for his compassionate and collaborative leadership style, Justin is passionate about developing strong teams and creating programs that promote lasting recovery. He believes meaningful change begins with genuine human connection and is dedicated to helping both clients and staff reach their fullest potential. Through his leadership, he continues to advance Quadrant Health Group's mission of providing exceptional, evidence-based behavioral healthcare across Southern California.",
    ],
  },
  {
    slug: "jeremiah-ross",
    name: "Jeremiah Ross",
    role: "Nursing Supervisor",
    group: "socal",
    photo: staffPhotos["jeremiah-ross"],
    bio: [
      "Jeremiah Ross, is a dedicated healthcare professional with more than 10 years of patient care experience and a strong background in substance use disorder treatment, client care coordination, and clinical team leadership. As the Nursing Supervisor, Jeremiah plays an integral role in supporting both clients and staff, helping oversee day-to-day clinical operations, medication-assisted treatment (MAT) protocols, documentation compliance, staff development, and multidisciplinary collaboration to ensure the highest standards of care.",
      "Passionate about helping individuals navigate the recovery process, Jeremiah is committed to creating a safe, supportive, and structured treatment environment where clients can build stability, develop healthy coping skills, and work toward lasting recovery. His leadership style emphasizes compassion, accountability, and teamwork, helping foster positive outcomes for both clients and clinical staff.",
    ],
  },
  {
    slug: "alanna-mcmurtrey",
    name: "Alanna McMurtrey",
    role: "Lead Case Manager",
    group: "socal",
    photo: staffPhotos["alanna-mcmurtrey"],
    bio: [
      "Alanna McMurtrey serves as the Lead Case Manager for the Southern California facilities of Quadrant Health Group, where she oversees case management services and supports clients through detox and residential levels of care. In her role, she coordinates client care, provides leadership and clinical support to case management staff, and helps ensure that each individual receives consistent, structured, and personalized support throughout their treatment journey.",
      "With several years of experience in behavioral health and addiction treatment, Alanna has developed a strong passion for helping individuals overcome substance use disorders and co-occurring mental health challenges. She is dedicated to fostering engagement in treatment, promoting personal growth, and supporting clients as they work toward sustainable, long-term recovery.",
      "Alanna takes a client-centered, strengths-based approach to care, meeting individuals where they are and helping them build upon their unique strengths. She is committed to creating a safe, respectful, and supportive environment where clients feel heard, valued, and empowered to make meaningful changes in their lives. Through collaboration, compassion, and clinical consistency, she strives to help clients develop the skills, confidence, and stability needed to achieve lasting recovery and improved well-being.",
    ],
  },
  {
    slug: "shawn-young",
    name: "Shawn Young",
    role: "Executive Director",
    group: "california",
    photo: staffPhotos["shawn-young"],
    bio: [
      "As the Executive Director of Southern California, I have the privilege of leading a team of dedicated professionals across several substance abuse treatment facilities — but at the heart of what I do is people. Whether it’s helping a client take their first step toward recovery or supporting a staff member as they grow into leadership, my passion lies in developing others and building environments where people can thrive.",
      "I didn’t get here by accident. I worked my way up through this field — from cooking in the kitchen and working as a tech, to becoming a clinician, and now serving in executive leadership. That journey gave me a deep understanding of what this work really takes — grit, heart, and an unwavering commitment to showing up for people when they need it most.",
      "I believe recovery is more than just treatment — it’s a life long journey that we have the privilege of helping people build that foundation.",
      "At the end of the day, I’m a husband and a father. My family is my foundation and the reason I lead with heart. The way I show up at home is how I try to show up in this work — grounded, honest, and fully present.",
      "This isn’t just a job to me — it’s a calling, and I’m all in.",
    ],
  },
  {
    slug: "michael-mcarthur",
    name: "Michael McArthur",
    role: "Nursing Director",
    group: "california",
    photo: staffPhotos["michael-mcarthur"],
    bio: [
      "I am the Director of Nursing for California facilities, overseeing all medical staff and client care operations. My journey into nursing was inspired by a personal desire to provide hope and compassion during life’s most challenging moments. Watching nurses care for my family during a difficult time, I realized how powerful a little hope and dedicated care can be. This inspired me to pursue a career in nursing, knowing I could make a difference when people need it most.",
      "I love working in addiction recovery because it allows me to witness clients grow and thrive within our walls. Our staff’s client-focused approach creates a positive, motivating environment that makes coming to work truly rewarding.",
      "Outside of my professional life, I am a proud father of four wonderful kids. They are my greatest inspiration—teaching me patience, resilience, and the importance of hope every day. My personal recovery journey has also strengthened my understanding of overcoming adversity, and it fuels my dedication to helping others find their path to healing.",
      "I work in this industry because I believe that substance use disorder and behavioral health are underserved populations that deserve attention, compassion, and support. I am excited to be on the front lines helping to reduce stigma and provide clients with genuine opportunities for recovery.",
      "Personally, I am passionate about my family, continuous improvement in patient care through scientific and technological advances, and my love for the Los Angeles Lakers. My goal is to make a meaningful difference, one life at a time, with hope, compassion, and unwavering dedication.",
    ],
  },
  {
    slug: "riky-hanaumi",
    name: "Riky Hanaumi",
    role: "Clinical Director",
    group: "california",
    photo: staffPhotos["riky-hanaumi"],
    bio: [
      "Erika “Riky” Hanaumi is a Licensed Clinical Social Worker with more than 20 years of experience in behavioral health and addiction treatment. She currently serves as Clinical Director for Quadrant Health Group’s California facilities, where she oversees clinical programming, mentors and supports therapists in developing effective treatment strategies, and ensures the delivery of compassionate, individualized, and clinically sound care. Her leadership focuses on promoting evidence-based practices, clinical excellence, and positive treatment outcomes for individuals with co-occurring mental health and substance use disorders.",
      "Riky began her career working with individuals experiencing homelessness, providing intensive support, advocacy, and resource coordination to help clients overcome barriers and access essential services. This experience fueled her passion for serving vulnerable populations and inspired her to pursue a Master of Social Work degree from California State University, Fullerton, which she earned in 2013\\.",
      "Throughout her career, Riky has worked in both inpatient and outpatient settings, providing therapy, crisis intervention, case management, and recovery-oriented services. She has extensive experience supporting adults with complex behavioral health needs, including co-occurring mental health and substance use disorders, while helping individuals navigate the challenges of recovery and major life transitions.",
      "Riky is trained in evidence-based treatment modalities, including Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT). She is passionate about helping clients build resilience, strengthen coping skills, improve interpersonal relationships, and achieve lasting recovery.",
      "At the heart of Riky’s work is a belief in the power of human connection and personal transformation. She is committed to empowering individuals to recognize their strengths, cultivate self-worth, and build fulfilling lives grounded in purpose, integrity, and hope.",
    ],
  },
  {
    slug: "monica-olivares",
    name: "Monica Olivares",
    role: "Clinical Supervisor",
    group: "california",
    photo: staffPhotos["monica-olivares"],
    bio: [
      "Monica Olivares serves as the Clinical Supervisor for Quadrant Health Group’s California facilities, bringing over 11 years of experience in the behavioral health field and a deeply personal passion for recovery and healing. Throughout her career, Monica has worked across nearly every level of care — including Detox, Residential, IOP, PHP, and Outpatient programs — while holding a wide range of roles from Behavioral Health Technician and Case Manager to Program Manager and Program Director.",
      "Monica holds a CADC II certification and has extensive experience supporting individuals struggling with substance use disorders, co-occurring mental health conditions, and eating disorders. Her leadership style is rooted in compassion, authenticity, accountability, and connection, helping create treatment environments where clients feel genuinely supported, understood, and empowered throughout their recovery journey.",
      "In addition to her professional experience, Monica brings 13 years of personal recovery experience to the work she does each day. Her lived experience allows her to connect with clients on a deeper level while helping foster hope, trust, and meaningful change. She believes recovery should be individualized, engaging, and centered around human connection, emphasizing that healing can happen while still embracing joy, humor, and community.",
      "Known for her energy, heart, and dedication, Monica is passionate about helping both clients and staff grow while cultivating strong, supportive treatment teams across the California programs. Outside of work, she enjoys spending time with her family, being outdoors, attending music festivals, exploring escape rooms, traveling, and creating memorable life experiences.",
    ],
  },
  {
    slug: "jacob-cameron",
    name: "Jacob Cameron",
    role: "Client Care Director",
    group: "california",
    photo: staffPhotos["jacob-cameron"],
    bio: [
      "Jacob Cameron serves as the Client Care Director at Quadrant Health Group and is a Registered Substance Use Disorder Counselor (SUDCC I). Passionate about helping individuals navigate the recovery process, Jacob is dedicated to creating a treatment experience that is both meaningful and engaging. He believes that lasting recovery is built through genuine connection, compassionate support, and an environment where clients feel valued every step of the way.",
      "In his role, Jacob works to ensure that each client receives personalized care and experiences a sense of belonging throughout their treatment journey. His goal is to help individuals not only achieve recovery but also discover that life in recovery can be fulfilling, rewarding, and enjoyable. Through his commitment to client-centered care, Jacob strives to make a lasting positive impact on the lives of those he serves.",
    ],
  },
  {
    slug: "pamela-tambini",
    name: "Dr. Pamela Tambini",
    role: "Medical Oversight",
    group: "network",
    photo: staffPhotos["pamela-tambini"],
    bio: [
      "Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, entrepreneur, and healthcare executive dedicated to advancing evidence-based treatment for individuals with substance use and co-occurring mental health disorders. She is the Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization that partners with behavioral healthcare facilities nationwide to provide comprehensive medical leadership, provider staffing, quality assurance, and regulatory compliance solutions.",
      "With extensive experience across the continuum of addiction treatment—including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient care—Dr. Tambini has developed scalable clinical programs that improve patient outcomes while helping organizations maintain regulatory excellence and operational efficiency. Her expertise includes addiction medicine, psychopharmacology, withdrawal management, medical stabilization, utilization review, physician leadership, and multi-state healthcare operations.",
      "Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she managed medically complex patients and collaborated with multidisciplinary teams to deliver high-quality inpatient care. Her clinical expertise, combined with her operational leadership, provides a unique perspective on integrating medical excellence with sustainable healthcare systems.",
      "Under Dr. Tambini's leadership, The Sober Connection has grown into a multi-state organization supporting behavioral healthcare facilities through physician staffing, medical directorships, quality improvement initiatives, provider education, credentialing, policy development, and clinical oversight. She is recognized for building high-performing medical teams, implementing standardized clinical processes, and helping treatment centers navigate accreditation, licensing, and payer requirements.",
      "Dr. Tambini is passionate about raising the standard of addiction medicine by combining compassionate patient care with innovative operational strategies. Her leadership philosophy emphasizes clinical integrity, accountability, and collaboration, with a focus on creating systems that support both providers and the patients they serve.",
      "She remains actively involved in medical education, physician mentorship, and the ongoing advancement of best practices in behavioral healthcare while continuing to care for patients and advise organizations on clinical program development, healthcare operations, and quality improvement initiatives.",
    ],
  },
];

export default async function AboutPage() {
  // Local entries win; the portal only contributes people not listed above.
  // Portal staff are facility-level by definition — the feed is per-facility.
  //
  // The portal currently returns photoUrl: null for everyone, so fall back to
  // the local headshot map before giving up and rendering initials. That lets a
  // portal-managed person still get an official headshot from this repo.
  const extras = await extraStaff("hillside-mission-recovery", team);
  const roster: Member[] = [
    ...team,
    ...extras.map((e) => ({
      ...e,
      group: "facility" as const,
      photo: e.photo ?? staffPhotos[e.slug] ?? undefined,
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
          {/* Grouped by the directory's three tiers rather than one flat grid —
              eleven cards in a single run gave no sense of who is on site. */}
          <div className="mx-auto mt-14 max-w-4xl space-y-16">
            {GROUPS.map((g) => {
              const members = roster.filter((m) => m.group === g.key);
              if (!members.length) return null;
              return (
                <div key={g.key}>
                  <div className="reveal border-b border-line pb-4">
                    <h3 className="font-display text-2xl text-ink">{g.label}</h3>
                    <p className="mt-1 text-sm text-ink/70">{g.blurb}</p>
                  </div>
                  {/* Full-width rows rather than a two-column card grid: these
                      are the directory's complete bios, up to five paragraphs,
                      which a narrow card can't hold without going very tall and
                      leaving the shorter entries ragged beside it. */}
                  <div className="mt-8 space-y-8">
                    {members.map((m) => (
                      <div
                        key={m.slug}
                        className="reveal card overflow-hidden sm:flex sm:items-stretch"
                      >
                        <div className="relative aspect-[4/3] shrink-0 bg-cream-deep sm:aspect-auto sm:w-56 md:w-64">
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
                        <div className="p-7 md:p-8">
                          <h4 className="text-xl text-ink">{m.name}</h4>
                          <p className="text-sm font-semibold text-teal">{m.role}</p>
                          <div className="mt-3 space-y-3">
                            {m.bio.map((p, i) => (
                              <p key={i} className="text-sm leading-relaxed text-ink/70">
                                {p}
                              </p>
                            ))}
                          </div>
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
              );
            })}
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
