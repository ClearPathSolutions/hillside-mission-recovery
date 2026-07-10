import Image from "next/image";
import type { Block } from "@/lib/content";
import { cleanContentBlocks } from "@/lib/content";
import { IconCheck } from "@/components/Icons";

type ParagraphBlock = Extract<Block, { type: "paragraph" }>;

// A short line that introduces the next heading (e.g. "Did you know?") — render as an eyebrow.
function isKicker(block: Block | undefined, next?: Block): boolean {
  if (!block || block.type !== "paragraph") return false;
  if (!next || next.type !== "heading") return false;
  const t = block.text.trim();
  const words = t.split(/\s+/).length;
  return words <= 6 && t.length <= 46 && !/[.:;]$/.test(t);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function getTOC(blocks: Block[]) {
  return cleanContentBlocks(blocks)
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

/**
 * Renders parsed content blocks with a clean editorial rhythm.
 * Skips the leading H1 (rendered in the page hero) and de-essays the layout:
 * clear section headings, comfortable measure, styled lists, and callout quotes.
 */
export default function ContentBlocks({ blocks: rawBlocks }: { blocks: Block[] }) {
  const blocks = cleanContentBlocks(rawBlocks);
  // Drop a leading H1 (already shown in hero) and any duplicate of it.
  let started = false;
  const seenH1 = blocks.find((b) => b.type === "heading" && b.level === 1);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading" && block.level === 1) return null;
        // short intro line before a heading → styled eyebrow
        if (isKicker(block, blocks[i + 1])) {
          return (
            <p key={i} className="eyebrow !mb-0 pt-6">
              {(block as ParagraphBlock).text}
            </p>
          );
        }
        // skip a stray paragraph that merely repeats the H1
        if (
          block.type === "paragraph" &&
          seenH1 &&
          block.text.trim().toLowerCase() === (seenH1 as { text: string }).text.trim().toLowerCase()
        )
          return null;

        if (block.type === "heading") {
          started = true;
          const afterKicker = isKicker(blocks[i - 1], block);
          if (block.level === 2) {
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className={`scroll-mt-28 text-2xl md:text-3xl text-ink first:pt-0 ${
                  afterKicker ? "!mt-1.5" : "pt-6"
                }`}
              >
                {block.text}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3
                key={i}
                id={slugifyHeading(block.text)}
                className={`scroll-mt-28 text-xl md:text-2xl text-ink ${afterKicker ? "!mt-1.5" : "pt-2"}`}
              >
                {block.text}
              </h3>
            );
          }
          return (
            <h4 key={i} className="text-lg font-semibold text-ink">
              {block.text}
            </h4>
          );
        }

        if (block.type === "paragraph") {
          started = true;
          return (
            <p key={i} className="text-[1.02rem] leading-[1.75] text-ink/78">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          const twoCol = block.items.length >= 6;
          return (
            <ul
              key={i}
              className={`not-prose gap-x-8 gap-y-2.5 ${twoCol ? "grid sm:grid-cols-2" : "grid"}`}
            >
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[1rem] leading-relaxed text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <IconCheck className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={i} className="my-8 overflow-hidden rounded-2xl border border-line bg-cream-deep">
              <Image
                src={block.src}
                alt={block.alt || "Hillside Mission Recovery"}
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 42rem, 92vw"
                className="h-auto w-full object-cover"
              />
              {block.caption && (
                <figcaption className="px-4 py-3 text-center text-sm text-ink/55">{block.caption}</figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 rounded-2xl border-l-4 border-teal bg-teal-soft/50 py-5 pl-6 pr-5 font-display text-xl leading-snug text-ink"
            >
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "table") {
          return (
            <div key={i} className="my-6 overflow-x-auto rounded-xl border border-line">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} className={r === 0 ? "bg-cream-deep font-semibold" : "border-t border-line"}>
                      {row.map((cell, c) => (
                        <td key={c} className="px-4 py-3 text-ink/80">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
      {!started && null}
    </div>
  );
}
