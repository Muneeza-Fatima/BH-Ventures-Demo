import Hero from "@/components/hero/Hero";
import BuiltForGlobalGrowth from "@/components/shared/GlobalGrowth";
import OurCapabilities from "@/components/shared/OurCapabilities";
import GlobalImpact from "@/components/shared/GlobalImpact";
import HomeFinalCTA from "@/components/shared/HomeFinalCTA";

export default function Home() {
  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0B1220]">
      <section id="home" className="w-full min-w-0">
        <Hero />
      </section>

      {/* Built for Global Growth */}
      <section id="built-for-global-growth" className="w-full min-w-0">
        <BuiltForGlobalGrowth />
      </section>

      {/* Global Reach */}
      <section id="global-impact" className="w-full min-w-0">
        <GlobalImpact />
      </section>

      {/* Our Capabilities */}
      <section id="our-capabilities" className="w-full min-w-0">
        <OurCapabilities />
      </section>

      <section id="portfolio" className="w-full min-w-0">
        <HomeFinalCTA />
      </section>
    </div>
  );
}