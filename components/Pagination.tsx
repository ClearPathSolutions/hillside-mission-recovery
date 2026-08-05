import Link from "next/link";

/**
 * Plain <a> pagination for the blog archive (V0061), so every article is
 * reachable from /blog without running JavaScript.
 */
export default function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? "/blog" : `/blog/page/${n}`);
  return (
    <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} rel="prev" className="btn btn-ghost !py-2.5 !px-4 text-sm">
          Previous
        </Link>
      )}
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === current ? "page" : undefined}
          className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-medium transition ${
            n === current ? "bg-ink text-white" : "border border-line bg-white text-ink/70 hover:border-ink/40"
          }`}
        >
          {n}
        </Link>
      ))}
      {current < total && (
        <Link href={href(current + 1)} rel="next" className="btn btn-ghost !py-2.5 !px-4 text-sm">
          Next
        </Link>
      )}
    </nav>
  );
}
