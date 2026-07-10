import Link from "next/link";
import { site } from "@/lib/site";
import { IconPhone, IconArrow, IconShield } from "@/components/Icons";

type TocItem = { id: string; text: string };

export function ContentSidebar({ toc }: { toc?: TocItem[] }) {
  return (
    <aside className="lg:sticky lg:top-28 space-y-5">
      {/* Help card */}
      <div className="overflow-hidden rounded-2xl bg-ink p-6 text-white">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal/20 text-teal-bright">
          <IconShield className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl text-white">Ready to talk?</h3>
        <p className="mt-2 text-sm text-cream/70">
          Confidential help is available 24/7. Speak with a caring admissions specialist now.
        </p>
        <a href={site.phoneHref} className="btn btn-primary mt-5 w-full">
          <IconPhone className="h-4 w-4" /> {site.phone}
        </a>
        <Link
          href="/admissions"
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Verify Insurance <IconArrow className="h-4 w-4" />
        </Link>
      </div>

      {/* On this page */}
      {toc && toc.length > 2 && (
        <nav className="rounded-2xl border border-line bg-white p-6" aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/45">On this page</p>
          <ul className="mt-4 space-y-2.5 border-l border-line">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="-ml-px block border-l-2 border-transparent pl-4 text-sm leading-snug text-ink/65 transition hover:border-teal hover:text-teal"
                >
                  {t.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
