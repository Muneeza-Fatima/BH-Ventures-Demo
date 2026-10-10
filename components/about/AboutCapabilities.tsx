"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeftRight,
  Cpu,
  Megaphone,
  Sparkles,
  Plus,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Capability = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  /* Colour of the row's left border and point boxes */
  accent: string;
};

const capabilities: Capability[] = [
  {
    icon: ArrowLeftRight,
    title: "International Trade",
    bullets: [
      "Cross-border trade & market access",
      "Strategically selected international markets",
      "Import, export & distribution",
      "UAE free-zone trade platform",
    ],
    image: "/images/about/story/story-trade-v2.jpg",
    imageAlt: "Container port with cargo ship, truck and aircraft",
    accent: "#14B8A6",
  },
  {
    icon: Cpu,
    title: "Technology & Data",
    bullets: [
      "Web3, AI & modern digital infrastructure",
      "Applied to real business problems",
      "Structured data & insight",
      "Smarter, faster decision-making",
    ],
    image: "/images/about/story/story-technology-hands.jpg",
    imageAlt: "Robotic hand reaching toward a human hand",
    accent: "#3B82F6",
  },
  {
    icon: Megaphone,
    title: "Marketing & Business Development",
    bullets: [
      "Positioning & growth strategy",
      "Partnerships & pipeline development",
      "Curated events & gatherings",
      "Visibility and reach for ventures",
    ],
    image: "/images/about/story/story-licensed-activities.jpg",
    imageAlt: "Partners placing an architectural model on a boardroom table",
    accent: "#F59E0B",
  },
  {
    icon: Sparkles,
    title: "Innovation & Strategic Ventures",
    bullets: [
      "Testing new operating models",
      "Combining disciplines others keep separate",
      "One multi-sector venture platform",
      "Founder-led execution",
    ],
    image: "/images/about/story/story-innovation-globe.png",
    imageAlt: "Hands holding a glowing digital globe",
    accent: "#A855F7",
  },
];

const headerReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const listReveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rowReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function AboutCapabilities() {
  /* First row starts open so the section never looks empty. */
  const [open, setOpen] = useState(0);

  return (
    <section
      id="about-capabilities"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]
        py-16
        sm:py-20
        lg:py-24
        xl:py-28
      "
    >
      {/* Same soft drifting glow as the hero (classes in about.css) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="about-glow-a absolute left-[-6%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#14B8A6]/[0.18] blur-[120px]" />
        <div className="about-glow-b absolute left-[40%] top-[-10%] h-[440px] w-[440px] rounded-full bg-[#1D4ED8]/[0.14] blur-[120px]" />
        <div className="about-glow-c absolute bottom-[-20%] right-[-8%] h-[560px] w-[560px] rounded-full bg-[#0F766E]/[0.20] blur-[130px]" />
      </div>

      <div
        className="
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          px-6
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}
        <motion.div
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-col gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#2DD4BF]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4] sm:text-[12px]">
                What We Operate
              </span>
            </div>

            <h2
              className="
                font-heading
                text-[2.1rem]
                font-bold
                leading-[1.12]
                tracking-[-0.028em]
                text-white
                sm:text-[2.5rem]
                lg:text-[2.875rem]
              "
            >
              Four capabilities.{" "}
              <span className="text-[#5EEAD4]">One platform.</span>
            </h2>
          </div>

          <p className="max-w-[440px] text-[15px] font-normal leading-[1.75] text-white/70 sm:text-[16px] lg:pb-1.5 lg:text-right">
            Each capability stands on its own, but the real value comes from
            how they work together inside a single venture platform.
          </p>
        </motion.div>

        {/* =====================================================
            EXPANDING ROWS
            Hover (mouse), tap or keyboard opens a row: its bullets
            unfold and the matching image slides in on the right.
        ===================================================== */}
        <motion.ul
          variants={listReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="border-t border-white/15 [-webkit-tap-highlight-color:transparent]"
        >
          {capabilities.map((capability, index) => {
            const isOpen = open === index;
            const Icon = capability.icon;

            return (
              <motion.li
                key={capability.title}
                variants={rowReveal}
                onMouseEnter={() => {
                  /* Hover opens rows only on real mouse devices; touch uses tap. */
                  if (window.matchMedia("(hover: hover)").matches) setOpen(index);
                }}
                className={`
                  relative
                  border-b
                  border-white/15
                  transition-colors
                  duration-500
                  ${isOpen ? "bg-white/[0.04]" : ""}
                `}
              >
                {/* Coloured left border: thin when closed, thick when open */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    transition-[width]
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isOpen ? "w-[4px]" : "w-[2px]"}
                  `}
                  style={{ backgroundColor: capability.accent }}
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`capability-${index}`}
                  onClick={() => setOpen(index)}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    py-6
                    pl-5
                    pr-2
                    text-left
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-[#2DD4BF]

                    sm:gap-6
                    sm:py-7
                    sm:pl-7
                    lg:py-8
                  "
                >
                  <span
                    className={`
                      w-8
                      shrink-0
                      text-[13px]
                      font-bold
                      tracking-[0.12em]
                      transition-colors
                      duration-300
                      sm:w-10
                      sm:text-[14px]
                      ${isOpen ? "text-[#5EEAD4]" : "text-white/40"}
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={`
                      hidden
                      shrink-0
                      transition-colors
                      duration-300
                      sm:block
                      ${isOpen ? "text-[#5EEAD4]" : "text-white/50"}
                    `}
                  />

                  <span
                    className={`
                      font-heading
                      min-w-0
                      flex-1
                      text-[19px]
                      font-bold
                      leading-[1.2]
                      tracking-[-0.02em]
                      transition-colors
                      duration-300
                      sm:text-[24px]
                      lg:text-[30px]
                      ${isOpen ? "text-white" : "text-white/75 group-hover:text-white"}
                    `}
                  >
                    {capability.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border-[1.5px]
                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        isOpen
                          ? "rotate-45 border-[#2DD4BF] bg-[#2DD4BF] text-[#06251F]"
                          : "border-white/30 text-white/70"
                      }
                    `}
                  >
                    <Plus size={18} strokeWidth={2} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`capability-${index}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-6
                          pb-8
                          pl-5
                          pr-2

                          sm:pl-[calc(1.75rem+2.5rem+1.5rem)]
                          lg:grid-cols-[1fr_minmax(0,460px)]
                          lg:gap-12
                          lg:pb-10
                        "
                      >
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:content-start">
                          {capability.bullets.map((bullet, i) => (
                            <motion.li
                              key={bullet}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE }}
                              style={{ borderLeftColor: capability.accent }}
                              className="
                                flex
                                items-start
                                gap-3
                                rounded-[14px]
                                border
                                border-white/15
                                border-l-[3px]
                                bg-white/[0.05]
                                px-4
                                py-3
                                text-[14px]
                                font-medium
                                leading-[1.5]
                                text-white/85
                                sm:text-[15px]
                              "
                            >
                              <span
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: capability.accent }}
                              />
                              {bullet}
                            </motion.li>
                          ))}
                        </ul>

                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                          className="
                            relative
                            aspect-[16/9]
                            w-full
                            overflow-hidden
                            rounded-[18px]
                            border
                            border-white/15
                          "
                        >
                          <Image
                            src={capability.image}
                            alt={capability.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 460px, 100vw"
                            className="object-cover object-center"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
