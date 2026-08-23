import Hero from "@/components/hero/Hero";
import GlobalImpact from "@/components/shared/GlobalImpact";
import HomeFinalCTA from "@/components/shared/HomeFinalCTA";

export default function Home() {
  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0B1220]">
      <section id="home" className="w-full min-w-0">
        <Hero />
      </section>

      <section id="approach" className="w-full min-w-0">
        <GlobalImpact />
      </section>

      <section id="portfolio" className="w-full min-w-0">
        <HomeFinalCTA />
      </section>
    </div>
  );
}