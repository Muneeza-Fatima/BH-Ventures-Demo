"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, Globe2, MessageSquare, Info } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =========================================================
   PREFERRED REGION OPTIONS

   Drawn from the verified "Global Markets" list already used
   in the site footer — not invented.
   ========================================================= */

const regionOptions = [
  "United Arab Emirates",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "Pakistan",
  "Germany",
  "France",
  "Estonia",
  "Denmark",
  "Ukraine",
  "Other",
];

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
  border-white/[0.12]
  bg-white/[0.03]
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
      form.phone ? `Phone: ${form.phone}` : null,
      form.region ? `Preferred Region: ${form.region}` : null,
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
        isolate
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.10]
        bg-white/[0.03]
        p-6

        sm:p-8
      "
    >
      <h3
        className="
          text-[18px]
          font-extrabold
          tracking-[-0.02em]
          text-white
          sm:text-[20px]
        "
      >
        Send us a message
      </h3>

      <p className="mt-2 text-[12.5px] font-medium leading-6 text-white/50">
        Share a few details and our team will follow up directly.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          <FieldLabel icon={Phone} htmlFor="contact-phone">
            Phone Number
          </FieldLabel>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+971 5X XXX XXXX"
            className={fieldBaseClass}
          />
        </div>

        <div>
          <FieldLabel icon={Globe2} htmlFor="contact-region">
            Preferred Region
          </FieldLabel>

          <select
            id="contact-region"
            name="region"
            value={form.region}
            onChange={handleChange}
            className={`${fieldBaseClass} appearance-none`}
          >
            <option value="" className="bg-[#0B1220] text-white/50">
              Select a region (optional)
            </option>

            {regionOptions.map((region) => (
              <option key={region} value={region} className="bg-[#0B1220] text-white">
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
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

        <div className="sm:col-span-2">
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
            className={`${fieldBaseClass} resize-none`}
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
