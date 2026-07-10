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
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        src="https://www.clarionlabs.ai/forms-capture.v1.js"
        async
        data-site-key={siteKey}
        data-api={api}
      />
    </>
  );
}
