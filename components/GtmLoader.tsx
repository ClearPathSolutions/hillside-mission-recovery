"use client";

import { useEffect } from "react";

/**
 * Loads Google Tag Manager on the first sign of a real visitor, or after a
 * fallback delay — whichever comes first.
 *
 * Why not next/script: the container pulls ~464KB across gtm.js and a gtag
 * bundle each for GA4 and Google Ads, which is ~478ms of main-thread work.
 * Both `afterInteractive` and `lazyOnload` still land inside Lighthouse's TBT
 * window, because that window runs until the page goes quiet and GTM is what
 * stops it going quiet. Measured TBT stayed at 380ms.
 *
 * Deferring to interaction takes the container out of page load entirely.
 *
 * TRADE-OFF: a session that bounces with no interaction inside FALLBACK_MS is
 * not tracked. The fallback timer keeps that to genuinely instant bounces —
 * any scroll, tap, key or pointer move fires it immediately. Raising
 * FALLBACK_MS improves the score and loses more of those sessions; lowering it
 * does the reverse. This one constant is the whole dial.
 */
const FALLBACK_MS = 4000;

const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function GtmLoader({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return;
    let loaded = false;
    let timer: ReturnType<typeof setTimeout>;

    const load = () => {
      if (loaded) return;
      loaded = true;
      teardown();

      // Same bootstrap GTM's own snippet performs, minus the inline script.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(s);
    };

    const teardown = () => {
      clearTimeout(timer);
      for (const e of TRIGGERS) window.removeEventListener(e, load);
    };

    timer = setTimeout(load, FALLBACK_MS);
    for (const e of TRIGGERS) window.addEventListener(e, load, { once: true, passive: true });

    return teardown;
  }, [id]);

  return null;
}
