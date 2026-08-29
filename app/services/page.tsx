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
    <main className="min-h-screen bg-[#0B1220]">
      <ServicesHero />
      <Services />
    </main>
  );
}