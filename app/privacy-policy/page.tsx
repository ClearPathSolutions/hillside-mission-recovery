import LegalPage, { legalMetadata } from "@/components/LegalPage";

// Reads the template from disk, so it must render at build time.
export const dynamic = "force-static";

/** /privacy-policy — the portfolio privacy policy. See lib/legal.ts. */
export const metadata = legalMetadata(
  "privacy-policy",
  "How Hillside Mission Recovery collects, uses, discloses, and protects information when you visit hillsidemission.com or contact our admissions team.",
);

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />;
}
