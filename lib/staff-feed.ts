/**
 * Staff managed centrally in the Quadrant support portal
 * (support.quadranthealthgroup.com/dev/staff).
 *
 * Returns only people NOT already listed locally, so the hand-written entries
 * in app/about/page.tsx keep their headshots and stay authoritative for anyone
 * appearing in both places. Fails soft — a portal outage yields an empty list.
 */

const FEED_ORIGIN =
  process.env.STAFF_FEED_ORIGIN ?? "https://support.quadranthealthgroup.com";

type FeedPerson = {
  name: string;
  title: string;
  credentials: string | null;
  bio: string | null;
  photoUrl: string | null;
};

export type ExtraMember = {
  slug: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string;
};

/** Loose key so "Dr. Jane Smith, LPC" and "Jane Smith" collapse together. */
function nameKey(raw: string): string {
  return raw
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .replace(/[“”"'’]/g, "")
    .replace(/,.*$/, "")
    .replace(/\s+(sr|jr|ii|iii)\.?$/i, "")
    .replace(/[^a-z ]/gi, "")
    .trim()
    .toLowerCase();
}

function toSlug(name: string): string {
  return nameKey(name).replace(/\s+/g, "-");
}

export async function extraStaff(
  facility: string,
  local: readonly { name: string }[],
): Promise<ExtraMember[]> {
  try {
    const res = await fetch(
      `${FEED_ORIGIN}/api/public/facilities/${encodeURIComponent(facility)}/staff`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { staff?: FeedPerson[] };
    const already = new Set(local.map((m) => nameKey(m.name)));
    return (data.staff ?? [])
      .filter((p) => p.name && !already.has(nameKey(p.name)))
      .map((p) => ({
        slug: toSlug(p.name),
        name: p.credentials ? `${p.name}, ${p.credentials}` : p.name,
        role: p.title,
        photo: p.photoUrl,
        bio: p.bio ?? "",
      }));
  } catch {
    return [];
  }
}
