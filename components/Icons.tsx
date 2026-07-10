import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const IconDetox = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3s5 5 5 9a5 5 0 0 1-10 0c0-4 5-9 5-9Z" />
    <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
);

export const IconResidential = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

export const IconDual = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18a5 5 0 1 1 0-10c.5 0 1 .07 1.5.2" />
    <path d="M15 6a5 5 0 1 1 0 10c-.5 0-1-.07-1.5-.2" />
    <path d="M12 3v18" />
  </svg>
);

export const IconAftercare = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20.5S4 15.5 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7Z" />
  </svg>
);

export const IconStaff = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6a3 3 0 0 1 0 6" />
    <path d="M17 14.5a5.5 5.5 0 0 1 3.5 4.5" />
  </svg>
);

export const IconPlan = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </svg>
);

export const IconLuxury = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9 12 3l8 6-3 10H7L4 9Z" />
    <path d="M9 9l3 4 3-4" />
  </svg>
);

export const IconCare = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21S3 14.5 3 8.8A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 9 2.8C21 14.5 12 21 12 21Z" />
    <path d="M8.5 12h2l1-2 1.5 3 1-1.5H15" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5c.5 0 .95.32 1.1.8l1 3.1a1.2 1.2 0 0 1-.3 1.2L7 10.7a12 12 0 0 0 6.3 6.3l1.1-1.3c.32-.37.83-.5 1.28-.33l3 1a1.15 1.15 0 0 1 .8 1.1V20c0 .83-.67 1.5-1.5 1.5C10.6 21.5 2.5 13.4 2.5 5 2.5 4.17 3.17 3.5 4 3.5h2.5Z" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconLeaf = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 4S8 4 5.5 12.5C4 17.5 7 20 7 20s3-9 13-16Z" />
    <path d="M7 20c1-6 5-9 9-11" />
  </svg>
);

export const IconGroup = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3" />
    <path d="M6 20a6 6 0 0 1 12 0" />
    <circle cx="5" cy="10" r="2" />
    <circle cx="19" cy="10" r="2" />
  </svg>
);
