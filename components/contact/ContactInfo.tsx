"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { directChannels, socialLinks, quickLinks } from "@/components/contact/contactData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ContactInfoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="
        rounded-[24px]
        border
        border-white/[0.10]
        bg-white/[0.03]
        p-6

        sm:p-7
      "
    >
      <h3 className="text-[15px] font-extrabold tracking-[-0.01em] text-white">
        Direct Lines
      </h3>

      <div className="mt-5 flex flex-col gap-4">
        {directChannels.map((channel) => {
          const Icon = channel.icon;

          const content = (
            <>
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-[12px]
                  border
                  border-[#2DD4BF]/30
                  bg-[#0E4A44]/50
                  text-[#5EEAD4]

                  transition-transform
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:scale-105
                "
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                  {channel.label}
                </span>

                <span className="mt-0.5 block truncate text-[13px] font-bold text-white">
                  {channel.value}
                </span>

                <span className="mt-0.5 block text-[11px] font-medium leading-5 text-white/45">
                  {channel.detail}
                </span>
              </span>
            </>
          );

          const rowClass = `
            group
            flex
            items-start
            gap-3
            rounded-2xl
            p-2

            transition-colors
            duration-300

            ${channel.href ? "hover:bg-white/[0.04]" : ""}
          `;

          if (!channel.href) {
            return (
              <div key={channel.label} className={rowClass}>
                {content}
              </div>
            );
          }

          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className={`${rowClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]`}
            >
              {content}
            </a>
          );
        })}
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-6">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
          Connect
        </h4>

        <div className="mt-3 flex flex-wrap gap-2.5">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`BH Ventures on ${social.label}`}
              title={social.label}
              whileHover={{ y: -2, scale: 1.06 }}
              whileFocus={{ y: -2, scale: 1.06 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={
                {
                  "--accent": social.accent,
                  "--glow": social.glow,
                } as CSSProperties
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.10]
                bg-white/[0.03]
                text-white/45

                outline-none

                transition-colors
                duration-300

                hover:border-[var(--accent)]/50
                hover:text-[var(--accent)]
                hover:shadow-[0_0_22px_var(--glow)]

                focus-visible:border-[var(--accent)]/50
                focus-visible:text-[var(--accent)]
                focus-visible:shadow-[0_0_22px_var(--glow)]
                focus-visible:ring-2
                focus-visible:ring-[var(--accent)]/40
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B1220]
              "
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function QuickLinksPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
      className="
        rounded-[24px]
        border
        border-white/[0.10]
        bg-white/[0.03]
        p-6

        sm:p-7
      "
    >
      <h3 className="text-[15px] font-extrabold tracking-[-0.01em] text-white">
        Looking for something specific?
      </h3>

      <div className="mt-4 flex flex-col">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="
              group
              flex
              items-center
              justify-between
              gap-3
              border-b
              border-white/[0.06]
              py-3
              text-[13px]
              font-bold
              text-white/70

              transition-colors
              duration-300

              last:border-b-0

              hover:text-white
            "
          >
            {link.label}

            <ArrowRight
              size={15}
              strokeWidth={2}
              className="
                shrink-0
                text-[#5EEAD4]

                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <ContactInfoPanel />
      <QuickLinksPanel />
    </div>
  );
}
