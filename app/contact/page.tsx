import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import "./contact.css";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact BH Ventures FZE LLC in Dubai by email, WhatsApp or Telegram to discuss partnerships, ventures, trade and technology projects.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div className="contact-page w-full min-w-0 overflow-x-clip bg-[#0B1220]">
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
        {/* Soft teal / blue lights behind the glass cards */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-8%] top-[5%] h-[480px] w-[480px] rounded-full bg-[#14B8A6]/[0.14] blur-[130px]" />
          <div className="absolute right-[-6%] top-[30%] h-[420px] w-[420px] rounded-full bg-[#1D4ED8]/[0.12] blur-[130px]" />
        </div>

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
