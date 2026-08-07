"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds an `.in` class to any element with `.reveal` as it scrolls into view.
 * One lightweight IntersectionObserver for the whole page. Re-scans on route change.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      // threshold MUST stay 0. A fractional threshold is unsatisfiable for any
      // element taller than the viewport — the article body on the substance
      // pages is ~10,000px, so 8% of it (~850px) never fits on a phone screen,
      // `isIntersecting` never fired, and the whole page stayed at opacity 0
      // while still occupying its full height. The negative bottom rootMargin
      // is what delays the trigger, so the effect is unchanged for small cards.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
