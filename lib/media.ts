// Curated facility imagery + trust logos.

// A5 — share fallback for pages with no image of their own. The bespoke pages
// (/, /about, /admissions, /blog, /contact, /tour, /privacy-policy, /thank-you)
// previously emitted no og:image at all, so every share preview was blank.
// Landscape 1920x1280. The previous default (MISSION-HILLS-HOUSE-61) is
// portrait, so every share card cropped it to a sliver of wall.
export const defaultOgImage = "/images/DSC_0573.jpg";

// The approved facility photo set (client-supplied, ~/Downloads/Hillside Mission
// Recovery). Every photograph on the site must come from this list — see
// facilityPhotoFor() for deterministic assignment where no specific photo is
// specified (e.g. Clarion-managed blog covers).
export const facilityPhotos: readonly string[] = [
  "/images/DSC_0560.jpg",
  "/images/DSC_0566.jpg",
  "/images/DSC_0569.jpg",
  "/images/DSC_0573.jpg",
  "/images/DSC_0575.jpg",
  "/images/DSC_0580.jpg",
  "/images/DSC_0582.jpg",
  "/images/DSC_0585.jpg",
  "/images/DSC_0596.jpg",
  "/images/DSC_0615.jpg",
  "/images/DSC_0625.jpg",
  "/images/DSC_0626.jpg",
  "/images/DSC_0627.jpg",
  "/images/DSC_0629.jpg",
  "/images/DSC_0631.jpg",
  "/images/DSC_0632.jpg",
  "/images/DSC_0635.jpg",
  "/images/DSC_0639.jpg",
  "/images/DSC_0647.jpg",
  "/images/DSC_0649.jpg",
  "/images/DSC_0654.jpg",
  "/images/DSC_0655.jpg",
  "/images/DSC_0659.jpg",
  "/images/DSC_0660.jpg",
  "/images/DSC_0664.jpg",
  "/images/DSC_0667.jpg",
  "/images/DSC_0668.jpg",
  "/images/DSC_0672.jpg",
  "/images/DSC_0673.jpg",
  "/images/DSC_0674.jpg",
  "/images/DSC_0675.jpg",
  "/images/DSC_0686.jpg",
  "/images/DSC_0688.jpg",
  "/images/DSC_0690.jpg",
  "/images/DSC_0693.jpg",
  "/images/DSC_0694.jpg",
  "/images/DSC_0695.jpg",
  "/images/DSC_0697.jpg",
  "/images/DSC_0699.jpg",
  "/images/DSC_0700.jpg",
  "/images/DSC_0701.jpg",
  "/images/DSC_0702.jpg",
  "/images/DSC_0704.jpg",
  "/images/MISSION-HILLS-HOUSE-1-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-10-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-23-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-26-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-38-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-40-2-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-44-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-47-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-48-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-49-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-51-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-55-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-58-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-59-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-60-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-61-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-68-scaled-1.jpg",
  "/images/MISSION-HILLS-HOUSE-8-scaled-1.jpg",
];

/** Stable photo choice for a key, so a given slug always gets the same image. */
export function facilityPhotoFor(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return facilityPhotos[h % facilityPhotos.length];
}

// Full-bleed homepage hero — needs a wide, high-resolution frame that still
// reads under the dark overlay. This one carries the residence and the pool
// terrace in a single shot.
export const facilityHero = "/images/DSC_0573.jpg";
export const facilityExterior = "/images/MISSION-HILLS-HOUSE-60-scaled-1.jpg";
export const facilityFoyer = "/images/MISSION-HILLS-HOUSE-1-scaled-1.jpg";
// Group therapy room — used behind the alumni testimonial, where a communal
// space suits the copy better than the portrait staircase that was there.
export const facilityCommunity = "/images/DSC_0673.jpg";
// Interior with the Hillside Mission logo etched on the glass — the most
// on-brand single frame, used for /about.
export const facilityBrand = "/images/MISSION-HILLS-HOUSE-58-scaled-1.jpg";

export type GalleryImage = { src: string; alt: string };

// Ordered as a walkthrough: arrive → enter → communal spaces → therapy →
// kitchen → bedrooms → bathroom → outdoors.
//
// Alt text describes what each photo actually shows. Several of the previous
// captions did not: -23 is a bathroom (was "Relaxing shared space"), -59 is a
// lounge (was "Outdoor area"), -38 is a landing (was "Restful private room")
// and -51 is the rear exterior (was "Facility interior detail").
export const gallery: GalleryImage[] = [
  { src: "/images/MISSION-HILLS-HOUSE-60-scaled-1.jpg", alt: "Front exterior of the Hillside Mission Recovery residence in Mission Viejo" },
  { src: "/images/DSC_0635.jpg", alt: "The residence seen from the street, framed by palms" },
  { src: "/images/MISSION-HILLS-HOUSE-44-scaled-1.jpg", alt: "Arched entry leading to the front door" },
  { src: "/images/MISSION-HILLS-HOUSE-1-scaled-1.jpg", alt: "Entryway and staircase" },
  { src: "/images/MISSION-HILLS-HOUSE-47-scaled-1.jpg", alt: "Staircase and landing with a bench" },
  { src: "/images/MISSION-HILLS-HOUSE-38-scaled-1.jpg", alt: "Upstairs landing looking through to the dining area" },
  { src: "/images/MISSION-HILLS-HOUSE-8-scaled-1.jpg", alt: "Fireplace and media wall in the living room" },
  { src: "/images/MISSION-HILLS-HOUSE-26-scaled-1.jpg", alt: "Living room with sectional seating against a green accent wall" },
  { src: "/images/MISSION-HILLS-HOUSE-59-scaled-1.jpg", alt: "Second lounge with a fireplace and armchairs" },
  { src: "/images/DSC_0673.jpg", alt: "Group therapy room with sofas and recovery artwork" },
  { src: "/images/DSC_0675.jpg", alt: "Therapy room set up for a yoga and mindfulness session" },
  { src: "/images/MISSION-HILLS-HOUSE-10-scaled-1.jpg", alt: "Kitchen with breakfast bar and dining seating" },
  { src: "/images/DSC_0704.jpg", alt: "Dining table beside the kitchen" },
  { src: "/images/MISSION-HILLS-HOUSE-40-2-scaled-1.jpg", alt: "Private client bedroom with natural light" },
  { src: "/images/DSC_0664.jpg", alt: "Client bedroom with a queen bed and ceiling fan" },
  { src: "/images/MISSION-HILLS-HOUSE-23-scaled-1.jpg", alt: "Bathroom with a soaking tub and walk-in shower" },
  { src: "/images/MISSION-HILLS-HOUSE-51-scaled-1.jpg", alt: "Rear of the residence with covered patio, pool and lawn" },
  { src: "/images/MISSION-HILLS-HOUSE-48-scaled-1.jpg", alt: "Pool and patio with shaded bar seating" },
  { src: "/images/MISSION-HILLS-HOUSE-49-scaled-1.jpg", alt: "Pool, spa and covered outdoor dining area" },
  { src: "/images/MISSION-HILLS-HOUSE-55-scaled-1.jpg", alt: "Pool and spa surrounded by palms" },
  { src: "/images/MISSION-HILLS-HOUSE-68-scaled-1.jpg", alt: "Pool and deck at the rear of the residence" },
];

export type Logo = { src: string; alt: string; w: number; h: number };

// Dimensions are the real trimmed asset sizes. These files previously carried
// large padded canvases (Aetna's mark filled 22% of its height) and were all
// declared 200x90, so a fixed CSS height rendered each mark at a different
// visual size. Assets are now cropped tight to the mark.
export const insuranceLogos: Logo[] = [
  { src: "/images/Aetna-bw-1.png", alt: "Aetna", w: 177, h: 54 },
  { src: "/images/Cigna-bw-1.png", alt: "Cigna", w: 200, h: 84 },
  { src: "/images/bluecross-bw2-1.png", alt: "Blue Cross Blue Shield", w: 200, h: 186 },
  { src: "/images/anthem-black.png", alt: "Anthem", w: 183, h: 49 },
  { src: "/images/First-Health-for-rehab-hillside.webp", alt: "First Health Network", w: 1009, h: 336 },
];

export const accreditations: Logo[] = [
  { src: "/images/goldseal_national-1.png", alt: "The Joint Commission — National Quality Approval Gold Seal", w: 160, h: 160 },
  { src: "/images/NAMI_logo.gif", alt: "NAMI — National Alliance on Mental Illness", w: 160, h: 90 },
];

// Staff portraits.
//
// Keys are the slug used in the /about roster. For portal-fed people that is
// the slug lib/staff-feed.ts derives from their name, which keeps quoted
// nicknames — hence "angela-angie-taylor" rather than "angela-taylor".
//
// The /staff/* files are the official QHG headshots, resampled to 900px on the
// long edge (the cards render ~430px wide) which took 13.6MB of source PNGs
// down to 0.67MB.
export const staffPhotos: Record<string, string> = {
  "monica-olivares": "/images/MonicaHMS.jpeg",
  // Retained, unused: Phillip Carter is off the roster per the client's staff
  // list. Kept so restoring him is a one-line change if HR confirms otherwise.
  // California leadership
  "shawn-young": "/images/staff/shawn-young.jpg",
  "michael-mcarthur": "/images/staff/michael-mcarthur.jpg",
  "riky-hanaumi": "/images/staff/riky-hanaumi.jpg",
  "jacob-cameron": "/images/staff/jacob-cameron.jpg",
  // Southern California
  "justin-white": "/images/staff/justin-white.jpg",
  "jeremiah-ross": "/images/staff/jeremiah-ross.jpg",
  "alanna-mcmurtrey": "/images/staff/alanna-mcmurtrey.jpg",
  // Hillside Mission — arrives via the portal feed, which has no photo for her
  "angela-angie-taylor": "/images/staff/angela-angie-taylor.jpg",
  // Quadrant Health Group — network-wide, not tied to a single facility
  "pamela-tambini": "/images/staff/pamela-tambini.jpg",
  "bj-thome": "/images/staff/bj-thome.jpg",
};
