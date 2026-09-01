import type { Metadata } from "next";
import ServicesHero from "@/components/hero/ServicesHero";
import Services from "@/components/Services/Services";

export const metadata: Metadata = {
  title: "Services | BH Ventures FZE LLC",
  description:
    "Explore our lineup of services across Global Trade, Web3, AI, and Marketing.",
};

export default function ServicesPage() {
  return (
    // overflow-x-hidden is a defensive guard, not a fix for a known bug here:
    // both ServicesHero and Services render full-bleed decorative layers
    // (glow gradients, hero video overlay) that are already correctly
    // contained today, but this stops any future regression in either
    // component from producing a page-level horizontal scrollbar on mobile
    // — the same class of bug found in the automobile detail page.
    <main className="min-h-screen bg-[#0B1220] overflow-x-hidden">
      <ServicesHero />
      <Services />
    </main>
  );
}