"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/content";
import PostCard from "@/components/PostCard";

const PAGE = 9;

export default function BlogList({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [posts, cat, query]);

  const shown = filtered.slice(0, visible);
  const tabs = ["All", ...categories];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setCat(t);
                setVisible(PAGE);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === t ? "bg-ink text-white" : "bg-white text-ink/70 border border-line hover:border-ink/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Search articles…"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/30"
          />
        </div>
      </div>

      {/* Results */}
      {shown.length === 0 ? (
        <p className="py-20 text-center text-ink/50">No articles match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-ghost">
            Load more articles
          </button>
          <p className="mt-3 text-sm text-ink/45">
            Showing {shown.length} of {filtered.length}
          </p>
        </div>
      )}
    </div>
  );
}
