import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
      <head>
        {/* Video preload hint taake browser foran download start kare */}
        <link
          rel="preload"
          href="/videos/hero.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}