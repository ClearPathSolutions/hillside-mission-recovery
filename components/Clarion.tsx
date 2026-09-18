"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

const BRAND = {
  color: "#2e9e8f", // matches --color-teal
  headerText: "#ffffff",
  title: "Chat with us",
  position: "right", // "left" | "right"
  font: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
};

const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;
const FALLBACK_MS = 4000;

export default function Clarion() {
  const { siteKey, api } = site.widgets.clarion;

  // The chat bubble is not needed at first paint, and as a <script> in <head>
  // it competed with the hero image for bandwidth on a throttled connection.
  // Loaded on the first real input instead, with a fallback timer, mirroring
  // components/GtmLoader.tsx.
  useEffect(() => {
    let loaded = false;
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      if (loaded) return;
      loaded = true;
      teardown();
      const s = document.createElement("script");
      s.src = "https://www.clarionlabs.ai/widget.v1.js";
      s.async = true;
      s.dataset.siteKey = siteKey;
      s.dataset.api = api;
      s.dataset.color = BRAND.color;
      s.dataset.headerText = BRAND.headerText;
      s.dataset.title = BRAND.title;
      s.dataset.position = BRAND.position;
      s.dataset.font = BRAND.font;
      document.body.appendChild(s);
    };
    const teardown = () => {
      clearTimeout(timer);
      for (const e of TRIGGERS) window.removeEventListener(e, load);
    };
    timer = setTimeout(load, FALLBACK_MS);
    for (const e of TRIGGERS) window.addEventListener(e, load, { once: true, passive: true });
    return teardown;
  }, [siteKey, api]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{
  --clarion-chat-color: ${BRAND.color};
  --clarion-chat-header-text: ${BRAND.headerText};
  --clarion-chat-font: ${BRAND.font};
  --clarion-chat-position: ${BRAND.position};
}`,
        }}
      />
      {/* forms-capture.v1.js is deliberately NOT loaded.
          It binds only to `form[data-clarion-form]`, an attribute no form here
          sets, so it was inert — but it is an inert *interceptor*: it attaches a
          submit listener and does not check `defaultPrevented`, so the moment
          anyone added that attribute to a form every lead would be sent twice,
          once by the browser and once by the server relay in
          lib/lead-delivery.ts. Submission is server-side (app/api/lead/route.ts)
          so an ad blocker cannot swallow a lead; that is the single path. */}
    </>
  );
}
