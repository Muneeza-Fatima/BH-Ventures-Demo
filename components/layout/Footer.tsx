"use client";

import Link from "next/link";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[17px] w-[17px] fill-current"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.57V9H3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-none stroke-current"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          className="fill-current stroke-none"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-current"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:info@bhventures.ae",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-none stroke-current"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8E7] bg-white">
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          py-8

          sm:px-8
          sm:py-9

          md:px-10
          md:py-10

          lg:px-12
          xl:px-16

          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* Main Footer */}
        <div
          className="
            flex
            flex-col
            items-center
            gap-5
            text-center

            sm:flex-row
            sm:justify-between
            sm:text-left
          "
        >
          {/* Brand */}
          <Link
            href="/"
            className="
              text-[18px]
              font-bold
              tracking-[-0.03em]
              text-[#0B1220]
              transition-colors
              duration-300
              hover:text-[#14B8A6]
            "
          >
            BH Ventures
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={`BH Ventures ${social.label}`}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E2E8E7]
                  text-[#53616B]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#14B8A6]
                  hover:bg-[#14B8A6]
                  hover:text-white
                  hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]

                  active:translate-y-0
                  active:shadow-[0_0_10px_rgba(20,184,166,0.25)]
                "
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[#E2E8E7]" />

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-3
            text-center

            sm:flex-row
            sm:text-left
          "
        >
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} BH Ventures FZE LLC. All rights
            reserved.
          </p>

          <p
            className="
              text-xs
              font-medium
              tracking-[0.04em]
              text-[#14B8A6]
            "
          >
            Dubai • UAE
          </p>
        </div>
      </div>
    </footer>
  );
}