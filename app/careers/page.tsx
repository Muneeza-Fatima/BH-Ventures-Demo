import CareersHero from "@/components/careers/CareersHero";
import CareersLifeAt from "@/components/careers/CareersLifeAt";
import CareersValues from "@/components/careers/CareersValues";
import CareersOpenRoles from "@/components/careers/CareersOpenRoles";
import CareersTalentCTA from "@/components/careers/CareersTalentCTA";

export default function CareersPage() {
  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0B1220]">
      <section id="careers" className="w-full min-w-0">
        <CareersHero />
      </section>

      <section id="life-at" className="w-full min-w-0">
        <CareersLifeAt />
      </section>

      <section id="values" className="w-full min-w-0">
        <CareersValues />
      </section>

      <section id="open-roles" className="w-full min-w-0">
        <CareersOpenRoles />
      </section>

      <section id="talent-cta" className="w-full min-w-0">
        <CareersTalentCTA />
      </section>
    </div>
  );
}
