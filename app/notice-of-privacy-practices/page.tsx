import LegalPage, { legalMetadata } from "@/components/LegalPage";

// Reads the template from disk, so it must render at build time.
export const dynamic = "force-static";

/** /notice-of-privacy-practices — interim HHS-model notice. See lib/legal.ts. */
export const metadata = legalMetadata(
  "notice-of-privacy-practices",
  "How Hillside Mission Recovery may use and disclose your protected health information, and your rights regarding that information.",
);

export default function NoticeOfPrivacyPracticesPage() {
  return <LegalPage slug="notice-of-privacy-practices" />;
}
