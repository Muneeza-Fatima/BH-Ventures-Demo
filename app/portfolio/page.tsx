import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { preload } from "react-dom";

import Portfolio from "@/components/portfolio/Portfolio";

export const metadata: Metadata = pageMeta({
  title: "Portfolio",
  description:
    "Explore the BH Ventures portfolio: ventures and projects across artificial intelligence, digital transformation, automotive, analytics and emerging markets.",
  path: "/portfolio/",
});

// Hero photos are served from this site (public/images/portfolio) and
// start downloading with the page HTML, so they are ready the moment
// the portfolio opens.
const HERO_IMAGES = [
  "/images/portfolio/hero-dubai.jpg",
  "/images/portfolio/hero-globe.jpg",
  "/images/portfolio/hero-architecture.jpg",
];

export default function PortfolioPage() {
  HERO_IMAGES.forEach((href) => preload(href, { as: "image", fetchPriority: "high" }));
  return <Portfolio />;
}