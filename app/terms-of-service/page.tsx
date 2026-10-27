import LegalPage, { legalMetadata } from "@/components/LegalPage";

// Reads the template from disk, so it must render at build time.
export const dynamic = "force-static";

/** /terms-of-service — terms of service and website disclaimer. See lib/legal.ts. */
export const metadata = legalMetadata(
  "terms-of-service",
  "The terms that govern use of the Hillside Mission Recovery website, including our website disclaimer.",
);

export default function TermsOfServicePage() {
  return <LegalPage slug="terms-of-service" />;
}
