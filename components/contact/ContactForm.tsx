"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, Globe2, MessageSquare, Info, ChevronDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =========================================================
   PREFERRED REGION OPTIONS

   Drawn from the verified "Global Markets" list already used
   in the site footer — not invented.
   ========================================================= */

/* Country, flag (flagcdn, same source as the footer) and dial code.
   Picking a country fills its dial code in front of the phone field. */
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

function Flag({ region }: { region: Region }) {
  if (!region.code) {
    return <Globe2 size={16} strokeWidth={1.8} className="shrink-0 text-[#5EEAD4]" aria-hidden="true" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny remote flag, same as footer
    <img
      src={`https://flagcdn.com/w40/${region.code}.png`}
      alt=""
      width={20}
      height={14}
      className="h-[14px] w-5 shrink-0 rounded-[3px] object-cover"
    />
  );
}

/* Accessible custom select so each option can show its flag. */
function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = regionOptions.find((r) => r.name === value);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id="contact-region"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${fieldBaseClass} flex items-center gap-3 text-left`}
      >
        {selected ? (
          <>
            <Flag region={selected} />
            <span className="flex-1 truncate">{selected.name}</span>
            {selected.dial && <span className="text-white/50">{selected.dial}</span>}
          </>
        ) : (
          <span className="flex-1 text-white/30">Select your country</span>
        )}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Hidden input keeps the field required for native validation */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        required
        value={value}
        onChange={() => {}}
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
      />

      {open && (
        <ul
          role="listbox"
          aria-labelledby="contact-region"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 overflow-y-auto rounded-xl border border-white/[0.18] bg-[#0F1B2D] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {regionOptions.map((region) => {
            const isSelected = region.name === value;
            return (
              <li key={region.name} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(region.name);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                    isSelected ? "bg-[#14B8A6]/20 text-white" : "text-white/80 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <Flag region={region} />
                  <span className="flex-1">{region.name}</span>
                  {region.dial && <span className="text-white/45">{region.dial}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const CONTACT_EMAIL = "info@bhventures.ae";

type FormState = {
  name: string;
  email: string;
  phone: string;
  region: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  region: "",
  subject: "",
  message: "",
};

const fieldBaseClass = `
  w-full
  rounded-xl
  border
  border-white/[0.22]
  bg-[#0B1220]/50
  px-4
  py-3
  text-[13.5px]
  font-medium
  text-white

  outline-none

  transition-colors
  duration-300
  ease-out

  placeholder:text-white/30

  hover:border-white/[0.20]

  focus:border-[#2DD4BF]
  focus:bg-white/[0.045]
  focus:ring-2
  focus:ring-[#2DD4BF]/25
`;

const labelClass = `
  mb-2
  block
  text-[10.5px]
  font-bold
  uppercase
  tracking-[0.16em]
  text-white/55
`;

function FieldLabel({
  icon: Icon,
  children,
  htmlFor,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`${labelClass} flex items-center gap-1.5`}>
      <Icon size={12} strokeWidth={2} className="text-[#5EEAD4]" />
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const selectedRegion = regionOptions.find((r) => r.name === form.region);
  const dialCode = selectedRegion?.dial ?? "";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /*
    No contact API / server action exists in this project yet — the form
    falls back to composing a mailto: to the verified BH Ventures inbox
    rather than pretending a backend accepted the submission. Swap this
    handler for a real endpoint once one exists; the fields and markup
    below are already shaped for that.
  */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${dialCode ? `${dialCode} ` : ""}${form.phone}` : null,
      form.region ? `Country: ${form.region}` : null,
      "",
      form.message,
    ].filter((line) => line !== null);

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      form.subject || "Website Inquiry"
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="
        relative
        flex
        h-full
        flex-col
        isolate
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.22]
        bg-gradient-to-br
        from-white/[0.14]
        to-white/[0.06]
        shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        p-6

        sm:p-10
      "
    >
      {/* Teal hairline across the top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#5EEAD4]/70 to-transparent"
      />

      <h3
        className="
          text-[22px]
          font-extrabold
          tracking-[-0.02em]
          text-white
          sm:text-[26px]
        "
      >
        Send us a message
      </h3>

      <p className="mt-2 text-[14px] font-normal leading-6 text-white/60">
        Share a few details and our team will follow up directly.
      </p>

      <div className="mt-8 grid flex-1 grid-cols-1 grid-rows-[repeat(5,auto)_1fr] gap-5 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_1fr]">
        <div>
          <FieldLabel icon={User} htmlFor="contact-name">
            Full Name
          </FieldLabel>

          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Carter"
            className={fieldBaseClass}
          />
        </div>

        <div>
          <FieldLabel icon={Mail} htmlFor="contact-email">
            Email Address
          </FieldLabel>

          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={fieldBaseClass}
          />
        </div>

        <div>
          <FieldLabel icon={Globe2} htmlFor="contact-region">
            Country
          </FieldLabel>

          <CountrySelect
            value={form.region}
            onChange={(name) => setForm((prev) => ({ ...prev, region: name }))}
          />
        </div>

        <div>
          <FieldLabel icon={Phone} htmlFor="contact-phone">
            Phone Number
          </FieldLabel>

          <div className="relative flex items-center">
            {dialCode && (
              <span className="pointer-events-none absolute left-4 flex items-center gap-2 text-[13.5px] font-medium text-white/80">
                <Flag region={selectedRegion!} />
                {dialCode}
              </span>
            )}
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={handleChange}
              placeholder={dialCode ? "5X XXX XXXX" : "Select a country first"}
              className={fieldBaseClass}
              style={dialCode ? { paddingLeft: `${dialCode.length * 9 + 52}px` } : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <FieldLabel icon={MessageSquare} htmlFor="contact-subject">
            Subject
          </FieldLabel>

          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="Partnership inquiry"
            className={fieldBaseClass}
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <FieldLabel icon={MessageSquare} htmlFor="contact-message">
            Message
          </FieldLabel>

          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us a little about what you'd like to discuss."
            className={`${fieldBaseClass} min-h-[140px] flex-1 resize-none`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-1.5 text-[11px] font-medium leading-5 text-white/40">
          <Info size={13} strokeWidth={2} className="mt-[1px] shrink-0 text-white/30" />
          Sending opens your email app with this message pre-filled to{" "}
          {CONTACT_EMAIL}.
        </p>

        <button
          type="submit"
          className="
            group
            relative
            flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-full
            border
            border-[#14B8A6]/70
            bg-[#14B8A6]
            px-7
            py-3.5

            text-[13px]
            font-bold
            text-[#07151A]

            transition-all
            duration-300
            ease-out

            hover:-translate-y-0.5
            hover:bg-[#2DD4BF]
            hover:shadow-[0_10px_30px_rgba(45,212,191,0.35)]

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#5EEAD4]/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0B1220]

            sm:w-auto
          "
        >
          Send Message

          <Send
            size={15}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.form>
  );
}
