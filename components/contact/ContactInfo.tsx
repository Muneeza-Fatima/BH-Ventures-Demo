"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { directChannels, socialLinks, quickLinks } from "@/components/contact/contactData";
import { DISPLAY } from "./ContactHero";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const glass = "relative isolate overflow-hidden rounded-[32px] border border-white/[0.24] bg-gradient-to-br from-white/[0.14] to-white/[0.06] shadow-[0_24px_60px_rgba(0,0,0,0.30)] backdrop-blur-xl p-7 sm:p-8";
const tints = ["bg-[#14B8A6]/20", "bg-[#38BDF8]/20", "bg-[#2DD4BF]/15", "bg-[#1D4ED8]/30"];

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className={glass}>
        <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 -z-10 h-56 w-56 rounded-full bg-[#2DD4BF]/[0.12] blur-[70px]" />
        <h3 className={`${DISPLAY} mb-6 text-[1.7rem] tracking-[-0.02em] text-white`}>Reach us directly</h3>

        <div className="flex flex-col gap-2.5">
          {directChannels.map((channel, idx) => {
            const Icon = channel.icon;
            const inner = (
              <>
                <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#5EEAD4] transition group-hover:scale-110 ${tints[idx % tints.length]}`}>
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
            const row = `group -mx-2 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 transition hover:border-[#2DD4BF]/35 hover:bg-white/[0.06]`;
            return (
              <motion.div key={idx} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}>
                {channel.href ? (
                  <a href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}
                    className={`${row} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2DD4BF]`}>{inner}</a>
                ) : (
                  <div className={row}>{inner}</div>
                )}
              </motion.div>
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
        <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 -z-10 h-56 w-56 rounded-full bg-[#1D4ED8]/[0.14] blur-[70px]" />
        <h3 className={`${DISPLAY} mb-4 text-[1.5rem] tracking-[-0.02em] text-white`}>Looking for something else?</h3>
        <div className="flex flex-col gap-2">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="group -mx-2 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3.5 transition hover:border-[#2DD4BF]/35 hover:bg-white/[0.06]">
              <span className="text-[14.5px] font-medium text-white/75 transition group-hover:text-white">{link.label}</span>
              <ArrowRight size={15} className="text-white/35 transition group-hover:translate-x-1 group-hover:text-[#2DD4BF]" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}