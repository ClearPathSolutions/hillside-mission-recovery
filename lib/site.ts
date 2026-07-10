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
  establishedYear: 2015,
  peopleHelped: "1,000+",
  beds: 6,
  widgets: {
    clarion: {
      siteKey: "cpx_BvGkgX4XjEvkRANLmWPB_PVosbpJggwl",
      api: "https://api.clarionlabs.ai",
    },
  },
} as const;

export type Site = typeof site;
