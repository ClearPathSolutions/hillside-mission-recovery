// Curated facility imagery + trust logos.

export const facilityHero = "/images/MISSION-HILLS-HOUSE-61-scaled-1.jpg";
export const facilityExterior = "/images/MISSION-HILLS-HOUSE-61-scaled-1.jpg";
export const facilityFoyer = "/images/MISSION-HILLS-HOUSE-1-scaled-1.jpg";

export type GalleryImage = { src: string; alt: string };

// Ordered for visual rhythm (exterior, common areas, bedrooms). Deduplicated.
export const gallery: GalleryImage[] = [
  { src: "/images/MISSION-HILLS-HOUSE-61-scaled-1.jpg", alt: "Exterior of the Hillside Mission Recovery residence in Mission Viejo" },
  { src: "/images/MISSION-HILLS-HOUSE-1-scaled-1.jpg", alt: "Bright entryway and staircase" },
  { src: "/images/MISSION-HILLS-HOUSE-33-scaled-1.jpg", alt: "Comfortable private bedroom" },
  { src: "/images/MISSION-HILLS-HOUSE-8-scaled-1.jpg", alt: "Living space at Hillside Mission" },
  { src: "/images/MISSION-HILLS-HOUSE-40-2-scaled-1.jpg", alt: "Serene guest bedroom with natural light" },
  { src: "/images/MISSION-HILLS-HOUSE-16-scaled-1.jpg", alt: "Interior common area" },
  { src: "/images/MISSION-HILLS-HOUSE-51-scaled-1.jpg", alt: "Facility interior detail" },
  { src: "/images/MISSION-HILLS-HOUSE-2-scaled-1.jpg", alt: "Warm, home-like interior" },
  { src: "/images/MISSION-HILLS-HOUSE-45-scaled-1.jpg", alt: "Kitchen and dining area" },
  { src: "/images/MISSION-HILLS-HOUSE-23-scaled-1.jpg", alt: "Relaxing shared space" },
  { src: "/images/MISSION-HILLS-HOUSE-55-scaled-1.jpg", alt: "Facility grounds" },
  { src: "/images/MISSION-HILLS-HOUSE-29-scaled-1.jpg", alt: "Peaceful bedroom retreat" },
  { src: "/images/MISSION-HILLS-HOUSE-57-scaled-1.jpg", alt: "Comfortable furnishings" },
  { src: "/images/MISSION-HILLS-HOUSE-38-scaled-1.jpg", alt: "Restful private room" },
  { src: "/images/MISSION-HILLS-HOUSE-59-scaled-1.jpg", alt: "Outdoor area at the residence" },
  { src: "/images/MISSION-HILLS-HOUSE-68-scaled-1.jpg", alt: "Facility exterior and landscaping" },
];

export type Logo = { src: string; alt: string; w: number; h: number };

export const insuranceLogos: Logo[] = [
  { src: "/images/Aetna-bw-1.png", alt: "Aetna", w: 200, h: 90 },
  { src: "/images/Cigna-bw-1.png", alt: "Cigna", w: 200, h: 90 },
  { src: "/images/bluecross-bw2-1.png", alt: "Blue Cross Blue Shield", w: 200, h: 90 },
  { src: "/images/anthem-black.png", alt: "Anthem", w: 200, h: 90 },
  { src: "/images/First-Health-for-rehab-hillside.webp", alt: "First Health Network", w: 200, h: 90 },
];

export const accreditations: Logo[] = [
  { src: "/images/goldseal_national-1.png", alt: "The Joint Commission — National Quality Approval Gold Seal", w: 160, h: 160 },
  { src: "/images/NAMI_logo.gif", alt: "NAMI — National Alliance on Mental Illness", w: 160, h: 90 },
];

// Staff portraits
export const staffPhotos: Record<string, string> = {
  "monica-olivires": "/images/MonicaHMS.jpeg",
  "phillip-carter": "/images/Phillip-Carter.png",
};
