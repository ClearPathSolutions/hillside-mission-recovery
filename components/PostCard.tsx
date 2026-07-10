import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/content";
import { IconClock, IconArrow } from "@/components/Icons";

export default function PostCard({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  return (
    <article className="reveal card card-hover group flex flex-col overflow-hidden">
      <Link href={`/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cream-deep">
        {post.ogImage ? (
          <Image
            src={post.ogImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-ink/5 text-ink/30">Hillside Mission</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs text-ink/50">
          {post.dateLabel && <span>{post.dateLabel}</span>}
          <span className="flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" /> {post.readMins} min read
          </span>
        </div>
        <h3 className="text-lg leading-snug text-ink">
          <Link href={`/${post.slug}`} className="transition-colors hover:text-teal">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
        <Link
          href={`/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors group-hover:gap-2.5"
        >
          Read article <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
