import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";

import "./globals.css";
import "@/components/layout/footer-responsive.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/smooth-scroll";
import ChatBot from "@/components/chatbot/ChatBot";   // ← add this line
import {
  DEFAULT_OG_IMAGE,
  ORG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absUrl,
  jsonLd,
} from "@/lib/seo";
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BH Ventures FZE LLC | Trade, Technology & Innovation from Dubai",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "BH Ventures",
    "BH Ventures FZE LLC",
    "Dubai venture platform",
    "UAE free zone company",
    "international trade Dubai",
    "Web3 venture studio",
    "AI consultancy Dubai",
    "digital analytics",
    "social media marketing UAE",
    "cloud mining",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_AE",
    title: "BH Ventures FZE LLC | Trade, Technology & Innovation from Dubai",
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BH Ventures FZE LLC | Trade, Technology & Innovation from Dubai",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
};

/* Organization + WebSite structured data (schema.org) for search engines */
const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "BH Ventures",
      url: `${SITE_URL}/`,
      logo: absUrl(ORG.logo),
      description: SITE_DESCRIPTION,
      email: ORG.email,
      telephone: ORG.phone,
      founder: { "@type": "Person", name: ORG.founder },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: ORG.email,
        telephone: ORG.phone,
        availableLanguage: ["English"],
      },
      sameAs: ORG.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd) }}
        />
        <div
          id="google_translate_element"
          aria-hidden="true"
          className="sr-only"
        />

        <SmoothScroll>
          <Navbar />
          <main className="w-full min-w-0 flex-1">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </SmoothScroll>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />

        <Script id="google-translate-init" strategy="lazyOnload">
          {`
            window.googleTranslateElementInit = function () {
              try {
                if (
                  window.google &&
                  window.google.translate &&
                  window.google.translate.TranslateElement
                ) {
                  new window.google.translate.TranslateElement(
                    {
                      pageLanguage: "en",
                      includedLanguages:
                        "en,ar,de,fr,it,uk,pl,es,pt,hr,sv",
                      autoDisplay: false,
                    },
                    "google_translate_element"
                  );
                }
              } catch (e) {
                // Storage access blocked by browser tracking prevention — safe to ignore
              }
            };
          `}
        </Script>
      </body>
    </html>
  );
}