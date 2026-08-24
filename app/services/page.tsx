import type { Metadata } from "next";
import Services from "@/components/Services";
import ServicesHero from "@/components/hero/ServicesHero";

export const metadata: Metadata = {
  title: "Services | BH Ventures FZE LLC",
  description:
    "Explore BH Ventures' nine licensed services — from global trade and Web3 Studio to AI consultancy, marketing, and exhibition organizing.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Services />
    </>
  );
}