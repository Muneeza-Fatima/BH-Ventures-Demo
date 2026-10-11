"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { directChannels, socialLinks, quickLinks } from "@/components/contact/contactData";
import { DISPLAY } from "./ContactHero";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const glass = "relative isolate overflow-hidden rounded-[32px] border border-[#2DD4BF]/15 bg-[#0D1B2F]/70 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-8";
const tints = ["bg-[#14B8A6]/20", "bg-[#38BDF8]/20", "bg-[#2DD4BF]/15", "bg-[#1D4ED8]/30"];

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className={glass}>
        <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 -z-10 h-44 w-44 rounded-full bg-[#2DD4BF]/[0.10] blur-[60px]" />
        <h3 className={`${DISPLAY} mb-6 text-[1.7rem] tracking-[-0.02em] text-white`}>Reach us directly</h3>

        <div className="flex flex-col gap-1.5">
          {directChannels.map((channel, idx) => {
            const Icon = channel.icon;
            const inner = (
              <>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#5EEAD4] transition group-hover:scale-110 ${tints[idx % tints.length]}`}>
                  <Icon size={18} strokeWidth={1.7} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] text-white/45">{channel.label}</span>
                  <span className="block truncate text-[14.5px] font-semibold text-white">{channel.value}</span>
                  <span className="block text-[12px] leading-5 text-white/50">{channel.detail}</span>
                </span>
                {channel.href && <ArrowRight size={15} className="shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#2DD4BF]" />}
              </>
            );
            const row = `group -mx-3 flex items-center gap-4 rounded-2xl p-3 transition ${channel.href ? "hover:bg-white/[0.07]" : ""}`;
            return channel.href ? (
              <a key={idx} href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}
                className={`${row} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2DD4BF]`}>{inner}</a>
            ) : (
              <div key={idx} className={row}>{inner}</div>
            );
          })}
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="mb-4 text-[13px] text-white/50">Find us online</p>
          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map((s) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`BH Ventures on ${s.label}`} title={s.label}
                whileHover={{ y: -3, scale: 1.08 }} whileFocus={{ y: -3, scale: 1.08 }}
                style={{ "--glow": s.glow, background: s.bg, color: s.fg } as CSSProperties}
                className="flex h-10 w-10 items-center justify-center rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.4)] outline-none transition hover:shadow-[0_0_24px_var(--glow)] focus-visible:ring-2 focus-visible:ring-[#2DD4BF]">
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: EASE }} className={glass}>
        <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 -z-10 h-44 w-44 rounded-full bg-[#1D4ED8]/[0.16] blur-[60px]" />
        <h3 className={`${DISPLAY} mb-4 text-[1.5rem] tracking-[-0.02em] text-white`}>Looking for something else?</h3>
        <div className="flex flex-col">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="group -mx-3 flex items-center justify-between rounded-2xl px-3 py-3.5 transition hover:bg-white/[0.07]">
              <span className="text-[14.5px] font-medium text-white/70 transition group-hover:text-white">{link.label}</span>
              <ArrowRight size={15} className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#2DD4BF]" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}