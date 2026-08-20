import Hero from "@/components/hero/Hero";
import GlobalImpact from "@/components/shared/GlobalImpact";
import HomeFinalCTA from "@/components/shared/HomeFinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      {/* 1. HERO */}
      <Hero />

      {/* 2. GLOBAL IMPACT */}
      <GlobalImpact />

      {/* 3. FINAL CTA */}
      <HomeFinalCTA />
    </main>
  );
}