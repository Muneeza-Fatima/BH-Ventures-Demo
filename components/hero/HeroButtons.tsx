"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeroButtons() {
  const [activeButton, setActiveButton] = useState<
    "ventures" | "contact" | null
  >(null);

  const handleClick = (button: "ventures" | "contact") => {
    setActiveButton(button);

    window.setTimeout(() => {
      setActiveButton(null);
    }, 350);
  };

  const buttonClass = `
    group
    relative
    flex
    min-h-[64px]
    w-full
    items-center
    justify-center
    overflow-hidden
    rounded-full
    bg-[#0B1220]
    p-[2px]
    shadow-[0_0_24px_rgba(20,184,166,0.20)]
    transition-all
    duration-300

    sm:min-h-[66px]
    md:min-h-[68px]

    lg:min-h-[64px]
    lg:w-auto

    hover:shadow-[0_0_32px_rgba(20,184,166,0.32)]
  `;

  const shineClass = `
    pointer-events-none
    absolute
    inset-[-100%]
    z-0
    opacity-0
    transition-opacity
    duration-200
    group-hover:opacity-100
    bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#14B8A6_320deg,#5EEAD4_338deg,#14B8A6_350deg,transparent_360deg)]
    group-hover:animate-border-shine
  `;

  return (
    <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">
      {/* Explore Our Ventures */}
      <Link
        href="/ventures"
        onClick={() => handleClick("ventures")}
        className={buttonClass}
      >
        {/* Bright Moving Border Shine */}
        <span className={shineClass} />

        {/* Button */}
        <span
          className={`
            relative
            z-10
            flex
            min-h-full
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#0B1220]
            px-8
            text-[17px]
            font-semibold
            tracking-[-0.01em]
            text-white
            transition-all
            duration-300
            ease-out

            sm:text-[18px]
            md:text-[18px]

            lg:px-10
            lg:text-[17px]

            group-hover:-translate-y-0.5
            group-hover:bg-[#0F766E]

            ${activeButton === "ventures" ? "bg-[#0F766E]" : ""}
          `}
        >
          <span className="relative z-20">
            Explore Our Ventures
          </span>
        </span>
      </Link>

      {/* Let's Talk */}
      <Link
        href="/contact"
        onClick={() => handleClick("contact")}
        className={buttonClass}
      >
        {/* Bright Moving Border Shine */}
        <span className={shineClass} />

        {/* Button */}
        <span
          className={`
            relative
            z-10
            flex
            min-h-full
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#0B1220]
            px-8
            text-[17px]
            font-semibold
            tracking-[-0.01em]
            text-white
            transition-all
            duration-300
            ease-out

            sm:text-[18px]
            md:text-[18px]

            lg:px-10
            lg:text-[17px]

            group-hover:-translate-y-0.5
            group-hover:bg-[#0F766E]

            ${activeButton === "contact" ? "bg-[#0F766E]" : ""}
          `}
        >
          <span className="relative z-20">
            Let&apos;s Talk
          </span>
        </span>
      </Link>
    </div>
  );
}