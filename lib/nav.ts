export type NavLink = { label: string; href: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
  feature?: { title: string; text: string; href: string };
};

// Primary navigation with structured mega-menu columns.
export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    columns: [
      {
        heading: "Our Story",
        links: [
          { label: "About Hillside Mission", href: "/about" },
          { label: "Tour Our Facility", href: "/tour" },
          { label: "Our Blog", href: "/blog" },
        ],
      },
      {
        heading: "Who We Help",
        links: [
          { label: "Women", href: "/women" },
          { label: "Men", href: "/men" },
          { label: "Executives", href: "/treatment/executives-rehab-in-mission-viejo" },
          { label: "First Responders", href: "/first-responders" },
        ],
      },
    ],
  },
  {
    label: "Treatment",
    href: "/treatment",
    columns: [
      {
        heading: "Programs",
        links: [
          { label: "Medical Detox", href: "/treatment/detoxification" },
          { label: "Residential Inpatient", href: "/treatment/residential-inpatient" },
          { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
          { label: "Aftercare & Alumni", href: "/treatment/aftercare-beyond" },
          { label: "Executive Rehab", href: "/treatment/executives-rehab-in-mission-viejo" },
        ],
      },
      {
        heading: "What We Treat",
        links: [
          { label: "Alcohol", href: "/alcohol" },
          { label: "Heroin", href: "/heroin" },
          { label: "Cocaine", href: "/cocaine" },
          { label: "Meth", href: "/meth" },
          { label: "Benzodiazepines", href: "/benzos" },
          { label: "Fentanyl", href: "/fentanyl" },
          { label: "Prescription Drugs", href: "/prescription-drugs" },
        ],
      },
      {
        heading: "Areas We Serve",
        links: [
          { label: "Mission Viejo", href: "/mission-viejo-rehab" },
          { label: "Orange County", href: "/orange-county" },
          { label: "Newport Beach", href: "/newport-beach" },
          { label: "Irvine", href: "/irvine" },
          { label: "Dana Point", href: "/dana-point" },
          { label: "San Clemente", href: "/san-clemente" },
          { label: "San Juan Capistrano", href: "/san-juan-capistrano" },
          { label: "Lake Forest", href: "/lake-forest" },
          { label: "Costa Mesa", href: "/costa-mesa" },
          { label: "Anaheim", href: "/anaheim" },
          { label: "Long Beach", href: "/long-beach" },
          { label: "Seal Beach", href: "/seal-beach" },
        ],
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    columns: [
      {
        heading: "Get Started",
        links: [
          { label: "Admissions Process", href: "/admissions" },
          { label: "Verify Your Insurance", href: "/admissions" },
          { label: "Orange County Behavioral Health", href: "/orange-county-behavioral-health" },
        ],
      },
      {
        heading: "Insurance We Accept",
        links: [
          { label: "Anthem", href: "/anthem" },
          { label: "Blue Cross Blue Shield", href: "/bcbs" },
          { label: "First Health Network", href: "/first-health-network" },
          { label: "Magellan", href: "/magellan" },
          { label: "MHN / Health Net", href: "/mhn-health-net-rehab" },
        ],
      },
    ],
  },
  { label: "Tour", href: "/tour" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Footer link groups
export const footerNav: NavColumn[] = [
  {
    heading: "Programs",
    links: [
      { label: "Medical Detox", href: "/treatment/detoxification" },
      { label: "Residential Inpatient", href: "/treatment/residential-inpatient" },
      { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
      { label: "Aftercare & Alumni", href: "/treatment/aftercare-beyond" },
      { label: "All Treatment", href: "/treatment" },
    ],
  },
  {
    heading: "What We Treat",
    links: [
      { label: "Alcohol", href: "/alcohol" },
      { label: "Heroin", href: "/heroin" },
      { label: "Cocaine", href: "/cocaine" },
      { label: "Meth", href: "/meth" },
      { label: "Benzodiazepines", href: "/benzos" },
      { label: "Fentanyl", href: "/fentanyl" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Tour", href: "/tour" },
      { label: "Admissions", href: "/admissions" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
