import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/lib/content";
import { cleanContentBlocks } from "@/lib/content";
import { IconCheck, IconArrow } from "@/components/Icons";

type ParagraphBlock = Extract<Block, { type: "paragraph" }>;

/**
 * R1–R3 — the three core services appear on 33 content pages as a bare run of
 * blocks (H2 service name, H2 tagline, description, photo) with no link to the
 * service page they describe. The workbook asks for "a widget like the one in
 * the original page linking to its respective page"; detecting the run here
 * fixes every page at once instead of editing 33 documents.
 */
// href + button label taken from the live WordPress original
// (hillsidemission.com/alcohol/), which renders each service as a linked image,
// linked heading, tagline, description and an uppercase button.
const SERVICE_LINKS: Record<string, { href: string; cta: string }> = {
  detoxification: { href: "/treatment/detoxification", cta: "DETOX" },
  "residential inpatient": { href: "/treatment/residential-inpatient", cta: "INPATIENT" },
  // Was absent, so Dual Diagnosis fell through to a plain heading + paragraph
  // while the other three rendered as cards with an image and a link.
  "dual diagnosis": { href: "/treatment/dual-diagnosis", cta: "DUAL DIAGNOSIS" },
  "aftercare & alumni": { href: "/treatment/aftercare-beyond", cta: "AFTERCARE" },
};

type ServiceGroup = {
  href: string;
  cta: string;
  name: string;
  tagline: string;
  text: string;
  image?: Extract<Block, { type: "image" }>;
  /** How many blocks the group consumes, so the renderer can skip them. */
  span: number;
};

/** Map of start-index -> service group, for runs matching the shape exactly. */
function findServiceGroups(blocks: Block[]): Map<number, ServiceGroup> {
  const groups = new Map<number, ServiceGroup>();
  for (let i = 0; i < blocks.length; i++) {
    const head = blocks[i];
    // The scrape emits the service name as H2 on condition/location pages and
    // H3 on /treatment, with the tagline as H2 or H6 — accept both shapes.
    if (head.type !== "heading" || (head.level !== 2 && head.level !== 3)) continue;
    const service = SERVICE_LINKS[head.text.trim().toLowerCase()];
    if (!service) continue;

    const tagline = blocks[i + 1];
    const body = blocks[i + 2];
    // Require the full shape; a bare "Detoxification" section heading elsewhere
    // on the page must keep rendering as an ordinary heading.
    if (!tagline || tagline.type !== "heading") continue;
    if (!body || body.type !== "paragraph") continue;

    const after = blocks[i + 3];
    const image = after && after.type === "image" ? after : undefined;
    groups.set(i, {
      href: service.href,
      cta: service.cta,
      name: head.text.trim(),
      tagline: tagline.text.trim(),
      text: body.text,
      image,
      span: image ? 4 : 3,
    });
    i += groups.get(i)!.span - 1;
  }
  return groups;
}

/** Indices consumed by a service group (so they aren't rendered twice). */
function consumedIndices(groups: Map<number, ServiceGroup>): Set<number> {
  const skip = new Set<number>();
  for (const [start, g] of groups) {
    for (let k = 1; k < g.span; k++) skip.add(start + k);
  }
  return skip;
}

/**
 * R11 — the "Medically Reviewed by …" byline was three loose blocks (photo,
 * heading, blurb) with no link to the reviewer's staff page. This renders them
 * as one credential widget with a "See full bio" link.
 *
 * NOTE: this only fixes the presentation. Whether a CADC II should carry a
 * "Medically Reviewed by" byline on medical-detox content is DOC-10, and is
 * still open with clinical leadership.
 */
const REVIEWER_SLUGS: Record<string, string> = {
  "monica olivares": "/staff/monica-olivares",
};

type ReviewerGroup = {
  byline: string;
  blurb: string;
  href?: string;
  image?: Extract<Block, { type: "image" }>;
  span: number;
};

function findReviewerGroups(blocks: Block[]): Map<number, ReviewerGroup> {
  const groups = new Map<number, ReviewerGroup>();
  for (let i = 0; i < blocks.length; i++) {
    const img = blocks[i];
    if (img.type !== "image") continue;
    const head = blocks[i + 1];
    if (!head || head.type !== "heading" || !/^medically reviewed by/i.test(head.text.trim())) continue;
    const blurb = blocks[i + 2];
    if (!blurb || blurb.type !== "paragraph") continue;

    const name = head.text.replace(/^medically reviewed by\s*/i, "").split(",")[0].trim().toLowerCase();
    groups.set(i, {
      byline: head.text.trim(),
      blurb: blurb.text,
      href: REVIEWER_SLUGS[name],
      image: img,
      span: 3,
    });
    i += 2;
  }
  return groups;
}

function consumedReviewerIndices(groups: Map<number, ReviewerGroup>): Set<number> {
  const skip = new Set<number>();
  for (const [start, g] of groups) for (let k = 1; k < g.span; k++) skip.add(start + k);
  return skip;
}

function ReviewerCard({ group }: { group: ReviewerGroup }) {
  return (
    <aside className="not-prose my-8 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center">
      {group.image && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-cream-deep">
          <Image
            src={group.image.src}
            alt={group.byline}
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal">Medically reviewed</p>
        <p className="mt-1 text-lg text-ink">{group.byline.replace(/^medically reviewed by\s*/i, "")}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{group.blurb}</p>
        {group.href && (
          <Link
            href={group.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-all hover:gap-2.5"
          >
            See full bio <IconArrow className="h-4 w-4" />
          </Link>
        )}
      </div>
    </aside>
  );
}

function ServiceCard({ group, isSelf }: { group: ServiceGroup; isSelf: boolean }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      {group.image &&
        (isSelf ? (
          <div className="relative block aspect-[16/9] overflow-hidden bg-cream-deep">
            <Image
              src={group.image.src}
              alt={group.image.alt || group.name}
              fill
              sizes="(min-width: 1024px) 42rem, 92vw"
              className="object-cover"
            />
          </div>
        ) : (
          <Link href={group.href} className="relative block aspect-[16/9] overflow-hidden bg-cream-deep">
            <Image
              src={group.image.src}
              alt={group.image.alt || group.name}
              fill
              sizes="(min-width: 1024px) 42rem, 92vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        ))}
      <div className="p-6 md:p-7">
        <h2 id={slugifyHeading(group.name)} className="scroll-mt-28 text-2xl text-ink">
          {isSelf ? (
            group.name
          ) : (
            <Link href={group.href} className="transition-colors hover:text-teal">
              {group.name}
            </Link>
          )}
        </h2>
        <p className="mt-1 font-display text-lg text-teal">{group.tagline}</p>
        <p className="mt-3 text-[1.02rem] leading-[1.75] text-ink/78">{group.text}</p>
        {/* Button matches the original page's CTA. No self-link when the card
            sits on the page it describes. */}
        {!isSelf && (
          <Link href={group.href} className="btn btn-primary mt-5 tracking-wide">
            {group.cta} <IconArrow className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

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
  const clean = cleanContentBlocks(blocks);
  // Service taglines are H2s too; once the run collapses into a card only the
  // service name should appear in "On this page".
  const skip = consumedIndices(findServiceGroups(clean));
  return clean
    .map((b, i) => ({ b, i }))
    .filter(({ b, i }) => !skip.has(i) && b.type === "heading" && b.level === 2)
    .map(({ b }) => {
      const h = b as Extract<Block, { type: "heading" }>;
      return { id: slugifyHeading(h.text), text: h.text };
    });
}

/**
 * Renders parsed content blocks with a clean editorial rhythm.
 * Skips the leading H1 (rendered in the page hero) and de-essays the layout:
 * clear section headings, comfortable measure, styled lists, and callout quotes.
 */
export default function ContentBlocks({
  blocks: rawBlocks,
  currentPath,
}: {
  blocks: Block[];
  /** Slug of the page being rendered, so a service card doesn't link to itself. */
  currentPath?: string;
}) {
  const blocks = cleanContentBlocks(rawBlocks);
  // Drop a leading H1 (already shown in hero) and any duplicate of it.
  let started = false;
  const seenH1 = blocks.find((b) => b.type === "heading" && b.level === 1);
  const serviceGroups = findServiceGroups(blocks);
  const serviceSkip = consumedIndices(serviceGroups);
  const reviewerGroups = findReviewerGroups(blocks);
  const reviewerSkip = consumedReviewerIndices(reviewerGroups);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        // R1–R3: collapse the service run into one linked widget.
        const group = serviceGroups.get(i);
        if (group) {
          started = true;
          return <ServiceCard key={i} group={group} isSelf={group.href === currentPath} />;
        }
        if (serviceSkip.has(i)) return null;

        // R11: collapse the "Medically Reviewed by" run into a credential widget.
        const reviewer = reviewerGroups.get(i);
        if (reviewer) {
          started = true;
          return <ReviewerCard key={i} group={reviewer} />;
        }
        if (reviewerSkip.has(i)) return null;

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
          // R10 — use the image's real dimensions so the aspect ratio is correct
          // and the reserved space matches, and never upscale past its native
          // width (a 588px-wide photo stretched across the column looked soft).
          const w = block.width ?? 1200;
          const h = block.height ?? 800;
          return (
            <figure
              key={i}
              className="my-8 mx-auto overflow-hidden rounded-2xl border border-line bg-cream-deep"
              style={{ maxWidth: `${w}px` }}
            >
              <Image
                src={block.src}
                alt={block.alt || "Hillside Mission Recovery"}
                width={w}
                height={h}
                sizes="(min-width: 1024px) 42rem, 92vw"
                className="h-auto w-full"
              />
              {block.caption && (
                <figcaption className="px-4 py-3 text-center text-sm text-ink/70">{block.caption}</figcaption>
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
