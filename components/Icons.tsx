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

/**
 * Continuum of care — two arrows cycling around a circle. Replaces the leaf,
 * which read as generic wellness rather than "one stage leads into the next".
 */
export const IconCycle = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 12a8 8 0 0 1-8 8 8 8 0 0 1-6.9-4" />
    <path d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 6.9 4" />
    <path d="M18.2 4.2v3.9h-3.9" />
    <path d="M5.8 19.8v-3.9h3.9" />
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

/* ---------- social ---------- */
// Brand marks, so these are solid glyphs rather than the stroked style used by
// the rest of the set — a stroked outline of a brand logo reads as wrong.
const brand = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  stroke: "none",
  "aria-hidden": true,
  ...p,
});

export const IconLinkedIn = (p: P) => (
  <svg {...brand(p)}>
    <path d="M6.94 5.5a2.06 2.06 0 1 1-4.12 0 2.06 2.06 0 0 1 4.12 0ZM3 8.98h3.84V21H3V8.98Zm6.32 0h3.68v1.64h.05c.51-.94 1.77-1.93 3.64-1.93 3.89 0 4.61 2.5 4.61 5.75V21h-3.84v-5.71c0-1.36-.03-3.11-1.94-3.11-1.94 0-2.24 1.48-2.24 3.01V21H9.32V8.98Z" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...brand(p)}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);

export const IconFacebook = (p: P) => (
  <svg {...brand(p)}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
  </svg>
);
