import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";

import "./globals.css";
import "@/components/layout/footer-responsive.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "BH Ventures FZE LLC",
  description:
    "BH Ventures FZE LLC — Bridging Trade, Technology & Innovation from the UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <div
          id="google_translate_element"
          aria-hidden="true"
          className="hidden"
        />

        <Navbar />

        <SmoothScroll>
          <main className="w-full min-w-0 flex-1">
            {children}
          </main>
        </SmoothScroll>

        <Footer />

        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function () {
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
            };
          `}
        </Script>
      </body>
    </html>
  );
}