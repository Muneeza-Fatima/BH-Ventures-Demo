import type { Metadata } from "next";
import VentureHero from "@/components/hero/VentureHero";
import Ventures from "@/components/Ventures/Ventures";

export const metadata: Metadata = {
  title: "Ventures | BH Ventures FZE LLC",
  description:
    "Explore our lineup of ventures across Global Trade, Web3 Studio, AI Innovation, and Marketing services.",
};

export default function VenturesPage() {
  return (
    // overflow-x-hidden is a defensive guard, not a fix for a known bug here:
    // both ServicesHero and Services render full-bleed decorative layers
    // (glow gradients, hero video overlay) that are already correctly
    // contained today, but this stops any future regression in either
    // component from producing a page-level horizontal scrollbar on mobile
    // — the same class of bug found in the automobile detail page.
    <main className="min-h-screen bg-[#0B1220] overflow-x-hidden">
      <VentureHero />
      <Ventures />
    </main>
  );
}