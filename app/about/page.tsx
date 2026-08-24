import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutFacts from "@/components/about/AboutFacts";
import AboutCapabilities from "@/components/about/AboutCapabilities";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutValues from "@/components/about/AboutValues";
import AboutFounder from "@/components/about/AboutFounder";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0B1220]">
      <section id="about" className="w-full min-w-0">
        <AboutHero />
      </section>

      <section id="story" className="w-full min-w-0">
        <AboutStory />
      </section>

      <section id="facts" className="w-full min-w-0">
        <AboutFacts />
      </section>

      <section id="capabilities" className="w-full min-w-0">
        <AboutCapabilities />
      </section>

      <section id="mission-vision" className="w-full min-w-0">
        <AboutMissionVision />
      </section>

      <section id="values" className="w-full min-w-0">
        <AboutValues />
      </section>

      <section id="founder" className="w-full min-w-0">
        <AboutFounder />
      </section>

      <section id="cta" className="w-full min-w-0">
        <AboutCTA />
      </section>
    </div>
  );
}