import { Plus_Jakarta_Sans } from "next/font/google";
import { Mail, MessageCircle, Send } from "lucide-react";

import "@/app/legal.css";
import { COMPANY_LINE, LEGAL, type LegalSection } from "./legalData";

/* Heading face for the legal pages (same approach as Careers). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  const licenceLine =
    LEGAL.freeZone && LEGAL.licenceNo
      ? `Licensed by ${LEGAL.freeZone}, licence no. ${LEGAL.licenceNo}.`
      : `Licence details are available on request at ${LEGAL.email}.`;

  return (
    <div className={`${jakarta.variable} legal-page w-full min-w-0 overflow-x-clip bg-white`}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#0B1220] px-6 pb-14 pt-[130px] sm:px-7 md:px-10 lg:px-12 lg:pb-20 lg:pt-[160px] xl:px-16 2xl:px-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[#14B8A6]/[0.12] blur-[120px]" />
          <div className="absolute right-[-8%] top-[10%] h-[360px] w-[360px] rounded-full bg-[#1D4ED8]/[0.10] blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#2DD4BF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4] sm:text-[12px]">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-heading text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3.2rem] lg:text-[3.8rem]">
            {title}
          </h1>

          <p className="mt-5 max-w-[640px] text-[15px] font-normal leading-[1.75] text-white/70 sm:text-[16px]">
            {intro}
          </p>

          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Last updated · {LEGAL.lastUpdated}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-14 sm:px-7 md:px-10 lg:px-12 lg:py-20 xl:px-16 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 2xl:max-w-[1600px]">
          {/* On this page */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              On this page
            </p>
            <ol className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#132B40]/10 px-3 py-1.5 text-[13px] font-medium text-[#3B5266] transition-colors hover:border-[#14B8A6]/40 hover:text-[#0F766E] lg:flex lg:border-0 lg:px-2 lg:py-1.5"
                  >
                    <span className="text-[11px] font-semibold text-[#0F766E]/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Content */}
          <article className="min-w-0 max-w-[780px]">
            <div className="mb-10 rounded-2xl border border-[#132B40]/10 bg-[#F7F9F8] px-5 py-4 text-[14px] leading-[1.7] text-[#3B5266]">
              {COMPANY_LINE} {licenceLine}
            </div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal-section border-t border-[#132B40]/10 py-8 first:border-t-0 first:pt-0">
                <h2 className="font-heading text-[1.3rem] font-bold tracking-[-0.02em] text-[#132B40] sm:text-[1.45rem]">
                  <span className="mr-3 text-[0.85em] font-semibold text-[#0F766E]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 text-[15px] font-normal leading-[1.8] text-[#3B5266] sm:text-[16px]">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((item, j) => (
                      <li key={j} className="relative pl-5 text-[15px] font-normal leading-[1.75] text-[#3B5266] sm:text-[16px]">
                        <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Contact */}
            <div id="contact" className="mt-6 rounded-2xl bg-[#0B1220] p-6 sm:p-8">
              <h2 className="font-heading text-[1.25rem] font-bold text-white">Questions?</h2>
              <p className="mt-2 text-[15px] font-normal leading-[1.7] text-white/70">
                Contact {LEGAL.company} through any of these channels.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`mailto:${LEGAL.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#14B8A6] px-4 py-2 text-[13.5px] font-semibold text-[#06251F] transition-colors hover:bg-[#2DD4BF]">
                  <Mail size={15} aria-hidden="true" /> {LEGAL.email}
                </a>
                <a href={LEGAL.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:border-white/40">
                  <MessageCircle size={15} aria-hidden="true" /> {LEGAL.phone}
                </a>
                <a href={LEGAL.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:border-white/40">
                  <Send size={15} aria-hidden="true" /> {LEGAL.telegramHandle}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
