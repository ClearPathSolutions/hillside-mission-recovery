import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { defaultOgImage } from "@/lib/media";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Clarion from "@/components/Clarion";
import SessionTracker from "@/components/SessionTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.tagline} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
    images: [defaultOgImage],
  },
  // A5 — was defaulting to the small "summary" card.
  twitter: {
    card: "summary_large_image",
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
    images: [defaultOgImage],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#13302a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Google Tag Manager — kept first in <head> so tags fire as early as
            possible. The inline bootstrap relies on the CSP's 'unsafe-inline'
            for script-src; googletagmanager.com is allow-listed there too. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
              `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
              `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;` +
              `j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;` +
              `f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.widgets.gtmId}');`,
          }}
        />
        {/* CallTrackingMetrics — number swapping.
            Loaded eagerly, NOT async: this script rewrites tracked phone numbers
            in the DOM, so deferring it leaves a window in which a visitor can
            read and dial the untracked number. It also establishes the CTM
            session that a submitted lead is filed against, so it has to run on
            every page including campaign landing pages — which is why it lives
            in the root layout rather than a per-route include. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={site.widgets.ctmScript}></script>
      </head>
      <body>
        {/* GTM fallback for no-JS clients. Must be the first thing in <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.widgets.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["MedicalBusiness", "MedicalClinic"],
              name: site.fullName,
              description: site.description,
              url: site.url,
              telephone: site.phone,
              email: site.email,
              image: `${site.url}/logo-color.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address.street,
                addressLocality: site.address.city,
                addressRegion: site.address.state,
                postalCode: site.address.zip,
                addressCountry: "US",
              },
              medicalSpecialty: "Addiction Medicine",
              availableService: [
                "Medical Detox",
                "Residential Inpatient Treatment",
                "Dual Diagnosis Treatment",
                "Aftercare & Alumni Program",
              ],
              areaServed: "Orange County, California",
              foundingDate: String(site.establishedYear),
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <SessionTracker />
        <Clarion />
      </body>
    </html>
  );
}
