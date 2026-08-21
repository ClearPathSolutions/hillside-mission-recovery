"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPageview } from "@/lib/session";

/**
 * Records a pageview on first paint and on every route change, which is what
 * makes first-touch attribution work at all: the campaign and the landing page
 * are captured when the visitor arrives, not when they eventually submit a form.
 *
 * Keyed on `usePathname` rather than `useSearchParams` on purpose —
 * `useSearchParams` forces a Suspense boundary and opts every static page in the
 * app into dynamic rendering. The campaign parameters are read straight off
 * `location.search` inside the effect instead, which costs nothing.
 */
export default function SessionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview();
  }, [pathname]);

  return null;
}
