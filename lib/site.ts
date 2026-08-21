export const site = {
  name: "Hillside Mission",
  fullName: "Hillside Mission Recovery",
  tagline: "Luxury Drug & Alcohol Rehab in Mission Viejo, CA",
  description:
    "Hillside Mission Recovery provides accredited medical detox and residential addiction treatment in Mission Viejo. Professional, private care in Orange County.",
  url: "https://hillsidemission.com",
  phone: "(866) 393-5174",
  phoneHref: "tel:+18663935174",
  email: "admissions@hillsidemission.com",
  contactEmail: "info@hillsidemission.com",
  address: {
    street: "23371 Rockrose",
    city: "Mission Viejo",
    state: "CA",
    zip: "92692",
    full: "23371 Rockrose, Mission Viejo, CA 92692",
  },
  // Google Maps embed for the facility area
  mapQuery: "23371+Rockrose,+Mission+Viejo,+CA+92692",
  reviewUrl: "https://g.page/r/CcJyF5dadvR0EAI/review",
  establishedYear: 2020,
  peopleHelped: "1,000+",
  beds: 6,
  widgets: {
    clarion: {
      siteKey: "cpx_BvGkgX4XjEvkRANLmWPB_PVosbpJggwl",
      api: "https://api.clarionlabs.ai",
      blogEmbed: "https://www.clarionlabs.ai/blog-embed.v1.js",
    },
    // Google Tag Manager container. Tags added inside the GTM UI load their own
    // third-party origins, which the CSP in next.config.mjs must also allow —
    // see the GOOGLE constant there.
    gtmId: "GTM-NLPN34C5",
    // CallTrackingMetrics. Absolute https, not protocol-relative: the swap
    // script must never be fetched over http from an https page.
    // Account 264810 serves the whole facility fleet — do not change the id
    // without confirming which account the site belongs to.
    ctmScript: "https://264810.tctm.co/t.js",
  },
} as const;

export type Site = typeof site;
