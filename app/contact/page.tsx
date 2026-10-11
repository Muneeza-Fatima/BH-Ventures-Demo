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
    <div className="contact-page w-full min-w-0 overflow-x-clip bg-[#060E1A]">
      {/* Hero — split layout with globe */}
      <section id="contact-hero-section" className="w-full min-w-0">
        <ContactHero />
      </section>

      {/* Main form + info section */}
      <section
        id="contact-main"
        className="relative isolate w-full min-w-0 overflow-hidden bg-[#060E1A] pt-16 pb-24 sm:pt-20 sm:pb-28 md:pb-32 lg:pb-36"
      >
        {/* Background orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-6%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#14B8A6]/[0.10] blur-[140px]" />
          <div className="absolute right-[-4%] top-[35%] h-[460px] w-[460px] rounded-full bg-[#1D4ED8]/[0.09] blur-[130px]" />
          <div className="absolute left-[35%] bottom-[-5%] h-[320px] w-[640px] rounded-full bg-[#14B8A6]/[0.05] blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="contact-faq-section" className="w-full min-w-0 bg-[#060E1A]">
        <ContactFAQ />
      </section>
    </div>
  );
}
