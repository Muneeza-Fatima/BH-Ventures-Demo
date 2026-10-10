import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Portfolio from "@/components/portfolio/Portfolio";

export const metadata: Metadata = pageMeta({
  title: "Portfolio",
  description:
    "Explore the BH Ventures portfolio: ventures and projects across artificial intelligence, digital transformation, automotive, analytics and emerging markets.",
  path: "/portfolio/",
});

export default function PortfolioPage() {
  return <Portfolio />;
}