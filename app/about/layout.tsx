import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

/* The About page is a client component, so its metadata lives here. */
export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "BH Ventures FZE LLC is a founder-led Dubai free-zone company with ten licensed activities across trade, technology, data, marketing and innovation.",
  path: "/about/",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
