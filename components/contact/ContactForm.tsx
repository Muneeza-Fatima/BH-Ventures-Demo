"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe2, ChevronDown, CheckCircle2 } from "lucide-react";
import { DISPLAY } from "./ContactHero";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const regionOptions = [
  { name: "United Arab Emirates", code: "ae", dial: "+971" },
  { name: "Saudi Arabia", code: "sa", dial: "+966" },
  { name: "United Kingdom", code: "gb", dial: "+44" },
  { name: "United States", code: "us", dial: "+1" },
  { name: "Pakistan", code: "pk", dial: "+92" },
  { name: "Germany", code: "de", dial: "+49" },
  { name: "France", code: "fr", dial: "+33" },
  { name: "Estonia", code: "ee", dial: "+372" },
  { name: "Denmark", code: "dk", dial: "+45" },
  { name: "Ukraine", code: "ua", dial: "+380" },
  { name: "Other", code: "", dial: "" },
];
type Region = (typeof regionOptions)[number];

const CONTACT_EMAIL = "info@bhventures.ae";
type FormState = { name: string; email: string; phone: string; region: string; subject: string; message: string };
const initialState: FormState = { name: "", email: "", phone: "", region: "", subject: "", message: "" };

const fieldBase =
  "w-full rounded-2xl border border-white/20 bg-[#0A1424]/75 px-4 py-3.5 text-[14px] text-white outline-none transition placeholder:text-white/35 hover:border-white/35 focus:border-[#2DD4BF] focus:bg-[#0A1424]/90 focus:ring-4 focus:ring-[#2DD4BF]/20 focus:shadow-[0_0_32px_rgba(45,212,191,0.22)]";

function Flag({ region }: { region: Region }) {
  if (!region.code) return <Globe2 size={16} className="shrink-0 text-[#2DD4BF]" aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`https://flagcdn.com/w40/${region.code}.png`} alt="" width={20} height={14} className="h-[14px] w-5 shrink-0 rounded-[3px] object-cover" />;
}

function CountrySelect({ value, onChange }: { value: string; onChange: (n: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = regionOptions.find((r) => r.name === value);
  return (
    <div className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button id="contact-region" type="button" suppressHydrationWarning aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={`${fieldBase} flex items-center gap-3 text-left`}>
        {selected ? (
          <>
            <Flag region={selected} />
            <span className="flex-1 truncate">{selected.name}</span>
            {selected.dial && <span className="text-white/40">{selected.dial}</span>}
          </>
        ) : (
          <span className="flex-1 text-white/30">Select your country</span>
        )}
        <ChevronDown size={15} aria-hidden className={`shrink-0 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <input tabIndex={-1} aria-hidden required value={value} onChange={() => { }} className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0" />
      <AnimatePresence>
        {open && (
          <motion.ul role="listbox" aria-labelledby="contact-region" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-60 overflow-y-auto rounded-2xl border border-[#2DD4BF]/15 bg-[#0E1C30]/95 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {regionOptions.map((r) => (
              <li key={r.name} role="option" aria-selected={r.name === value}>
                <button type="button" onClick={() => { onChange(r.name); setOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${r.name === value ? "bg-[#2DD4BF]/15 text-white" : "text-white/70 hover:bg-[#1D4ED8]/[0.16]"}`}>
                  <Flag region={r} />
                  <span className="flex-1">{r.name}</span>
                  {r.dial && <span className="text-white/40">{r.dial}</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, htmlFor, children, className = "" }: { label: string; htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }} className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="px-1 text-[13px] font-medium text-white/70">{label}</label>
      {children}
    </motion.div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [sent, setSent] = useState(false);
  const still = useHydratedReducedMotion();
  useEffect(() => {
    const onTopic = (e: Event) => {
      const subject = (e as CustomEvent<string>).detail;
      setForm((p) => ({ ...p, subject }));
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => document.getElementById("contact-message")?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener("contact:topic", onTopic);
    return () => window.removeEventListener("contact:topic", onTopic);
  }, []);

  const selectedRegion = regionOptions.find((r) => r.name === form.region);
  const dialCode = selectedRegion?.dial ?? "";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${dialCode ? `${dialCode} ` : ""}${form.phone}` : null,
      form.region ? `Country: ${form.region}` : null,
      "",
      form.message,
    ].filter((l) => l !== null);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject || "Website Inquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <motion.form
      id="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative isolate flex h-full flex-col overflow-hidden rounded-[36px] border-2 border-[#2DD4BF]/45 bg-[#0D1B2F]/85 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_50px_rgba(45,212,191,0.18)] ring-1 ring-white/15 backdrop-blur-2xl sm:p-10"
    >
      <motion.div aria-hidden animate={still ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full bg-[#1D4ED8]/[0.32] blur-[80px]" />
      <motion.div aria-hidden animate={still ? undefined : { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -bottom-16 -left-16 -z-10 h-72 w-72 rounded-full bg-[#14B8A6]/[0.3] blur-[80px]" />
      {!still && <motion.span aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-[#5EEAD4] to-transparent" animate={{ x: ["-100%", "300%"] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />}

      <h3 className={`${DISPLAY} text-[2rem] leading-tight tracking-[-0.02em] text-white sm:text-[2.4rem]`}>
        Send us a message
      </h3>
      <p className="mb-8 mt-2 text-[14.5px] text-white/55">A few details and we&apos;ll reply directly.</p>

      <motion.div variants={{ show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_1fr]">
        <Field label="Full name" htmlFor="contact-name">
          <input id="contact-name" name="name" required autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Carter" className={fieldBase} suppressHydrationWarning />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={fieldBase} suppressHydrationWarning />
        </Field>
        <Field label="Country" htmlFor="contact-region">
          <CountrySelect value={form.region} onChange={(n) => setForm((p) => ({ ...p, region: n }))} />
        </Field>
        <Field label="Phone" htmlFor="contact-phone">
          <div className="relative flex items-center">
            {selectedRegion && dialCode && (
              <span className="pointer-events-none absolute left-4 flex items-center gap-2 text-[13px] text-white/60">
                <Flag region={selectedRegion} />
                {dialCode}
              </span>
            )}
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel-national" value={form.phone} onChange={handleChange}
              placeholder={dialCode ? "5X XXX XXXX" : "Select a country first"} className={fieldBase}
              style={dialCode ? { paddingLeft: `${dialCode.length * 9 + 52}px` } : undefined} suppressHydrationWarning />
          </div>
        </Field>
        <Field label="Subject" htmlFor="contact-subject" className="sm:col-span-2">
          <input id="contact-subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="Partnership inquiry" className={fieldBase} suppressHydrationWarning />
        </Field>
        <Field label="Message" htmlFor="contact-message" className="sm:col-span-2">
          <textarea id="contact-message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us a little about what you'd like to discuss." className={`${fieldBase} min-h-[140px] flex-1 resize-none`} suppressHydrationWarning />
        </Field>
      </motion.div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-5 text-white/45">Sending opens your email app, pre-filled to {CONTACT_EMAIL}.</p>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 rounded-full bg-[#2DD4BF]/15 px-7 py-3.5 text-[14px] font-semibold text-[#5EEAD4]">
              <CheckCircle2 size={16} /> Email app opened
            </motion.div>
          ) : (
            <motion.button key="submit" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} suppressHydrationWarning
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#14B8A6] to-[#38BDF8] px-8 py-3.5 text-[14px] font-semibold text-[#06202A] shadow-[0_14px_40px_rgba(20,184,166,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DD4BF]">
              {!still && <motion.span aria-hidden className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" initial={{ left: "-40%" }} animate={{ left: "140%" }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />}
              <span className="relative">Send message</span>
              <Send size={15} className="relative transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}