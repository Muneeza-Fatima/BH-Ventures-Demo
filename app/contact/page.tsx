import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <div className="w-full min-w-0 overflow-x-clip bg-[#0B1220]">
      <section id="contact-hero-section" className="w-full min-w-0">
        <ContactHero />
      </section>

      <section
        id="contact-main"
        className="
          relative
          isolate
          w-full
          min-w-0
          overflow-hidden
          bg-[#0B1220]
          pb-20
          sm:pb-24
          md:pb-28
          lg:pb-32
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-180px]
            top-[10%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#00CDB5]/[0.05]
            blur-[130px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            min-w-0
            max-w-[1440px]
            px-5
            sm:px-7
            md:px-10
            lg:px-12
            xl:px-16
            2xl:max-w-[1600px]
            2xl:px-20

            [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-[1.35fr_1fr]
              lg:gap-8
            "
          >
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <section id="contact-faq-section" className="w-full min-w-0">
        <ContactFAQ />
      </section>
    </div>
  );
}
