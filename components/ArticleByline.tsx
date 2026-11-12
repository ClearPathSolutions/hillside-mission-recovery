import Link from "next/link";
import type { Byline } from "@/lib/content";
import { editorialPolicyServed, EDITORIAL_POLICY_PATH } from "@/lib/editorial";

/** Date-only and UTC, so "2026-09-30" can't render as the 29th in US zones. */
function formatDate(iso: string): string {
  return new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Article byline, from editorial-policy-dev-package/templates/article-byline.html.
 * Sits directly under the post's H1. The medical reviewer line always renders
 * (the client asked for a default reviewer on every post, overriding the
 * package's "no default reviewer" rule; see lib/reviewer.ts). The review date
 * shows only when the post has a real one.
 */
export default function ArticleByline({ byline }: { byline: Byline }) {
  const { author, reviewer, lastReviewed, modified } = byline;
  const meta = [
    lastReviewed && (
      <span key="reviewed">
        Last reviewed <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
      </span>
    ),
    modified && (
      <span key="updated">
        Updated <time dateTime={modified}>{formatDate(modified)}</time>
      </span>
    ),
    // Linked only where the policy is served, so production never links a 404.
    editorialPolicyServed && (
      <Link key="policy" href={EDITORIAL_POLICY_PATH}>
        Editorial policy
      </Link>
    ),
  ].filter(Boolean);

  return (
    <div className="article-byline">
      {author && (
        <p className="byline-line">
          Written by{" "}
          {author.bioPath ? (
            <Link href={author.bioPath} rel="author">
              {author.name}
            </Link>
          ) : (
            author.name
          )}
        </p>
      )}
      <p className="byline-line">
        Medically reviewed by{" "}
        {reviewer.path ? (
          // A bio on this site: an ordinary same-tab internal link.
          <Link href={reviewer.path}>{reviewer.name}</Link>
        ) : reviewer.url ? (
          <a href={reviewer.url} target="_blank" rel="noopener noreferrer">
            {reviewer.name}
          </a>
        ) : (
          reviewer.name
        )}
        {reviewer.credentials && `, ${reviewer.credentials}`}
      </p>
      {meta.length > 0 && (
        <p className="byline-meta">
          {meta.flatMap((m, i) => (i === 0 ? [m] : [" · ", m]))}
        </p>
      )}
    </div>
  );
}
