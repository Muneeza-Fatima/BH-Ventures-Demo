"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-[70%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#14B8A6]/60
          to-transparent
          blur-[1px]
        "
      />

      {/* Glass Navbar */}
      <nav
        className="
          mx-auto
          flex
          h-[64px]
          w-full
          items-center

          border-b
          border-white/[0.08]

          bg-white/[0.025]
          backdrop-blur-2xl
          backdrop-saturate-150

          px-4

          shadow-[0_8px_35px_rgba(0,0,0,0.08)]

          sm:h-[66px]
          sm:px-6

          md:h-[68px]
          md:px-8

          lg:px-10

          xl:h-[70px]
          xl:px-12
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="BH Ventures Home"
          onClick={() => setIsOpen(false)}
          className="
            group
            relative
            z-10
            flex
            shrink-0
            items-center
          "
        >
          {/* Logo glow */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              rounded-full
              bg-[#14B8A6]/10
              opacity-0
              blur-xl
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          <Image
            src="/images/bh-ventures-logo.jpeg"
            alt="BH Ventures FZE - LLC"
            width={150}
            height={150}
            priority
            className="
              h-[38px]
              w-auto
              max-w-[112px]
              object-contain

              transition-transform
              duration-300
              group-hover:scale-[1.03]

              sm:h-[40px]
              sm:max-w-[125px]

              md:h-[42px]
              md:max-w-[135px]

              lg:h-[44px]
              lg:max-w-none
            "
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="
            mx-auto
            hidden
            items-center
            gap-1
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.02]
            px-1.5
            py-1
            backdrop-blur-xl

            lg:flex

            xl:gap-1.5
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                group
                relative
                flex
                items-center
                justify-center
                rounded-full
                px-3
                py-2

                text-[12px]
                font-semibold
                tracking-[0.01em]
                text-white/70

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:text-white

                xl:px-3.5
              "
            >
              {/* Hover underline */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-3
                  bottom-0
                  h-px
                  origin-center
                  scale-x-0
                  bg-gradient-to-r
                  from-transparent
                  via-[#2DD4BF]
                  to-transparent
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:scale-x-100
                  group-hover:opacity-100
                "
              />

              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="
            group
            relative
            hidden
            shrink-0
            items-center
            gap-1.5
            overflow-hidden
            rounded-full

            border
            border-[#14B8A6]/50
            bg-[#14B8A6]/[0.06]

            px-4
            py-2

            text-[11px]
            font-bold
            tracking-[0.01em]
            text-white

            shadow-[0_0_20px_rgba(20,184,166,0.05)]

            backdrop-blur-xl

            transition-all
            duration-300

            hover:border-[#2DD4BF]/80
            hover:bg-[#14B8A6]/15
            hover:shadow-[0_0_25px_rgba(20,184,166,0.16)]

            lg:inline-flex
          "
        >
          {/* CTA shine */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              -left-[80%]
              w-[45%]
              skew-x-[-20deg]
              bg-white/20
              blur-sm
              transition-all
              duration-700
              group-hover:left-[130%]
            "
          />

          <span className="relative z-10">
            Discover Solutions
          </span>

          <ArrowUpRight
            className="
              relative
              z-10
              h-3.5
              w-3.5
              text-[#2DD4BF]
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>

        {/* Mobile / Tablet Right Side */}
        <div
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-2

            sm:gap-2.5

            md:gap-3

            lg:hidden
          "
        >
          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="
              group
              relative
              flex
              h-[35px]
              items-center
              justify-center
              gap-1
              overflow-hidden
              whitespace-nowrap
              rounded-full

              border
              border-[#14B8A6]/60
              bg-[#14B8A6]/[0.06]

              px-3

              text-[9px]
              font-bold
              text-white

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-[#2DD4BF]
              hover:bg-[#14B8A6]/15

              min-[400px]:text-[10px]

              sm:h-[37px]
              sm:px-3.5
              sm:text-[11px]
            "
          >
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[100%]
                w-1/2
                skew-x-[-20deg]
                bg-white/20
                blur-sm
                transition-all
                duration-700
                group-hover:left-[130%]
              "
            />

            <span className="relative z-10">
              Discover Solutions
            </span>

            <ArrowUpRight
              className="
                relative
                z-10
                h-3
                w-3
                text-[#2DD4BF]
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              group
              relative
              z-20
              flex
              h-[35px]
              w-[35px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full

              border
              border-white/[0.12]
              bg-white/[0.035]

              text-white

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-[#14B8A6]/60
              hover:bg-[#14B8A6]/10

              sm:h-[37px]
              sm:w-[37px]
            "
          >
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-full
                bg-[#14B8A6]/10
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            {isOpen ? (
              <X className="relative z-10 h-[17px] w-[17px]" />
            ) : (
              <Menu className="relative z-10 h-[17px] w-[17px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          absolute
          left-3
          right-3
          top-[72px]
          overflow-hidden
          rounded-2xl

          border
          border-white/[0.08]

          bg-white/[0.035]
          backdrop-blur-2xl
          backdrop-saturate-150

          shadow-[0_20px_60px_rgba(0,0,0,0.28)]

          transition-all
          duration-300

          sm:left-5
          sm:right-5
          sm:top-[74px]

          md:left-6
          md:right-6
          md:top-[76px]

          lg:hidden

          ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }
        `}
      >
        {/* Menu top glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-[70%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#14B8A6]/60
            to-transparent
          "
        />

        <div
          className="
            mx-auto
            w-full
            max-w-xl
            px-4
            pb-5
            pt-3

            sm:px-6
            sm:pb-6
            sm:pt-4
          "
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.07]

                  py-3.5

                  text-[13px]
                  font-semibold
                  text-white/75

                  transition-all
                  duration-200

                  hover:pl-1
                  hover:text-white

                  sm:py-4
                  sm:text-sm
                "
              >
                <span>{item.label}</span>

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    text-white/20
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#2DD4BF]
                  "
                />
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="
                group
                relative
                mt-5
                flex
                min-h-[46px]
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-full

                border
                border-[#14B8A6]/60
                bg-[#14B8A6]/10

                text-[12px]
                font-bold
                text-white

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-[#2DD4BF]
                hover:bg-[#14B8A6]/20

                sm:mt-6
                sm:min-h-[48px]
                sm:text-sm
              "
            >
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-[80%]
                  w-1/2
                  skew-x-[-20deg]
                  bg-white/20
                  blur-sm
                  transition-all
                  duration-700
                  group-hover:left-[130%]
                "
              />

              <span className="relative z-10">
                Discover Solutions
              </span>

              <ArrowUpRight
                className="
                  relative
                  z-10
                  h-4
                  w-4
                  text-[#2DD4BF]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}