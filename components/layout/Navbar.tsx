
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <nav
        className="
          mx-auto
          flex
          h-[72px]
          w-full
          items-center
          justify-between
          bg-[#0B1220]
          px-5
          shadow-lg
          shadow-black/5

          sm:h-[76px]
          sm:px-8

          lg:h-[82px]
          lg:px-10

          xl:px-14
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="BH Ventures Home"
          className="relative z-10 flex shrink-0 items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/bh-ventures-logo.jpeg"
            alt="BH Ventures FZE - LLC"
            width={150}
            height={150}
            priority
            className="
              h-[52px]
              w-[52px]
              object-contain

              sm:h-[56px]
              sm:w-[56px]

              lg:h-[62px]
              lg:w-[62px]
            "
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative
                text-sm
                font-medium
                text-white/80
                transition-colors
                duration-300
                hover:text-[#2DD4C3]

                after:absolute
                after:-bottom-2
                after:left-0
                after:h-px
                after:w-0
                after:bg-[#14B8A6]
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="
            hidden
            rounded-full
            bg-[#0B1220]
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            ring-1
            ring-white/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#14B8A6]
            hover:ring-[#14B8A6]
            lg:inline-flex
          "
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            relative
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            text-white
            transition-colors
            duration-300
            hover:bg-white/10
            lg:hidden
          "
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          absolute
          left-0
          right-0
          top-[72px]
          overflow-hidden
          bg-[#0B1220]
          transition-all
          duration-300
          lg:hidden
          sm:top-[76px]

          ${
            isOpen
              ? "max-h-[500px] border-t border-white/10 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-5 pb-6 pt-4 sm:px-8">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="
                  border-b
                  border-white/10
                  py-4
                  text-base
                  font-medium
                  text-white/85
                  transition-colors
                  duration-300
                  hover:text-[#2DD4C3]
                "
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="
                mt-5
                flex
                min-h-[52px]
                items-center
                justify-center
                rounded-full
                bg-[#0B1220]
                text-sm
                font-semibold
                text-white
                ring-1
                ring-white/20
                transition-all
                duration-300
                hover:bg-[#14B8A6]
                hover:ring-[#14B8A6]
              "
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

