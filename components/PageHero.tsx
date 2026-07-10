import Link from "next/link";
import Image from "next/image";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumbs,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Background image or gradient */}
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
        </div>
      )}

      <div className="container-x relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className={`flex flex-wrap items-center gap-2 text-xs text-cream/60 ${align === "center" ? "justify-center" : ""}`}>
                {crumbs.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-teal-bright transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-cream/85">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span className="text-cream/30">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className={`eyebrow !text-teal-bright ${align === "center" ? "eyebrow-center justify-center" : ""}`}>
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          {subtitle && (
            <p className={`mt-5 text-lg leading-relaxed text-cream/75 ${align === "center" ? "mx-auto" : ""} max-w-2xl`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* soft bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
