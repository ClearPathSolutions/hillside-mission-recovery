import { site } from "@/lib/site";

const BRAND = {
  color: "#2e9e8f", // matches --color-teal
  headerText: "#ffffff",
  title: "Chat with us",
  position: "right", // "left" | "right"
  font: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
};

export default function Clarion() {
  const { siteKey, api } = site.widgets.clarion;
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
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        src="https://www.clarionlabs.ai/widget.v1.js"
        async
        data-site-key={siteKey}
        data-api={api}
        data-color={BRAND.color}
        data-header-text={BRAND.headerText}
        data-title={BRAND.title}
        data-position={BRAND.position}
        data-font={BRAND.font}
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
