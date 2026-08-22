import Hero from "@/components/hero/Hero";
import GlobalImpact from "@/components/shared/GlobalImpact";
import HomeFinalCTA from "@/components/shared/HomeFinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* 1. HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* 2. GLOBAL IMPACT */}
      <section id="approach">
        <GlobalImpact />
      </section>

      {/* 3. FINAL CTA */}
      <section id="portfolio">
        <HomeFinalCTA />
      </section>
    </div>
  );
}