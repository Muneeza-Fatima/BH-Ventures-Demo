import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./careers.css";
import CareersHero from "@/components/careers/CareersHero";
import CareersLifeAt from "@/components/careers/CareersLifeAt";
import CareersValues from "@/components/careers/CareersValues";
import CareersProcess from "@/components/careers/CareersProcess";
import CareersOpenRoles from "@/components/careers/CareersOpenRoles";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "Careers at BH Ventures FZE LLC in Dubai. Join a founder-led venture platform working across trade, technology, data, marketing and innovation, and see current openings.",
  path: "/careers/",
});

/* Heading face for the Careers page only (same approach as About). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export default function CareersPage() {
  return (
    <div
      className={`${jakarta.variable} careers-page w-full min-w-0 overflow-x-clip bg-white`}
    >
      <section id="careers" className="w-full min-w-0">
        <CareersHero />
      </section>

      <section id="life-at" className="w-full min-w-0">
        <CareersLifeAt />
      </section>

      <section id="values" className="w-full min-w-0">
        <CareersValues />
      </section>

      <section id="process" className="w-full min-w-0">
        <CareersProcess />
      </section>

      <section id="open-roles" className="w-full min-w-0">
        <CareersOpenRoles />
      </section>
    </div>
  );
}
