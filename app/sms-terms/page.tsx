import LegalPage, { legalMetadata } from "@/components/LegalPage";

// Reads the template from disk, so it must render at build time.
export const dynamic = "force-static";

/** /sms-terms — text-messaging terms. See lib/legal.ts. */
export const metadata = legalMetadata(
  "sms-terms",
  "How text-message communications from Hillside Mission Recovery work: program description, cost, opt-out, and privacy.",
);

export default function SmsTermsPage() {
  return <LegalPage slug="sms-terms" />;
}
