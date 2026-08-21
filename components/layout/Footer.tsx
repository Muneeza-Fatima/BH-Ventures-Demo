"use client";

import Link from "next/link";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    color: "text-[#0A66C2]",
    hover: "hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/[0.06]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-current"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.57V9H3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:info@bhventures.ae",
    color: "text-[#14B8A6]",
    hover: "hover:border-[#14B8A6]/40 hover:bg-[#14B8A6]/[0.06]",
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
  {
    label: "Facebook",
    href: "#",
    color: "text-[#1877F2]",
    hover: "hover:border-[#1877F2]/40 hover:bg-[#1877F2]/[0.06]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-current"
        aria-hidden="true"
      >
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    color: "text-[#111111]",
    hover: "hover:border-[#111111]/25 hover:bg-black/[0.04]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] fill-current"
        aria-hidden="true"
      >
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2zm-1.1 17.9h1.73L8.27 3.98H6.41L17.8 19.9z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    color: "text-[#E1306C]",
    hover: "hover:border-[#E1306C]/40 hover:bg-[#E1306C]/[0.06]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-none stroke-current"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.3"
          cy="6.7"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "#",
    color: "text-[#FFFC00]",
    hover:
      "hover:border-[#E6E200]/50 hover:bg-[#FFFC00]/[0.10]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-current drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
        aria-hidden="true"
      >
        <path d="M12 3.1c-3.25 0-5.35 2.27-5.35 5.4v2.17c0 .56-.2.92-.7 1.2-.32.18-.7.3-1.06.43-.42.15-.74.27-.74.58 0 .5.72.72 1.38.9.48.13.93.25 1.08.53.17.31.02.77-.4 1.32-.3.39-.63.74-.63 1.03 0 .38.44.54.96.66.4.1.85.2 1.14.5.36.37.48.95.65 1.35.15.34.36.48.68.48.25 0 .57-.1.94-.21.52-.17 1.1-.37 1.76-.37.7 0 1.28.21 1.8.4.35.12.66.22.9.22.33 0 .54-.14.7-.48.18-.4.3-.98.66-1.35.3-.3.74-.4 1.14-.5.52-.12.96-.28.96-.66 0-.29-.33-.64-.63-1.03-.42-.55-.57-1.01-.4-1.32.15-.28.6-.4 1.08-.53.66-.18 1.38-.4 1.38-.9 0-.31-.32-.43-.74-.58-.36-.13-.74-.25-1.06-.43-.5-.28-.7-.64-.7-1.2V8.5c0-3.13-2.1-5.4-5.35-5.4Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    color: "text-[#111111]",
    hover: "hover:border-[#111111]/25 hover:bg-black/[0.04]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        aria-hidden="true"
      >
        <path
          d="M16.6 3c.3 1.75 1.32 2.84 3.05 3.08v3.02a8.3 8.3 0 0 1-3.02-.7v6.25c0 3.58-2.15 5.35-5.02 5.35-2.74 0-4.61-1.77-4.61-4.32 0-2.75 2.15-4.65 5.17-4.65.4 0 .8.04 1.18.13v3.02a3.7 3.7 0 0 0-1.12-.18c-1.14 0-2.1.68-2.1 1.75 0 .9.68 1.55 1.62 1.55 1.07 0 1.8-.72 1.8-2.1V3h3.05Z"
          fill="#111111"
        />
        <path
          d="M14.7 4.4c.5 1.1 1.25 1.85 2.35 2.25v1.75a8.3 8.3 0 0 1-2.35-.63V4.4Z"
          fill="#25F4EE"
        />
        <path
          d="M9.15 11.45c-1.05.55-1.55 1.35-1.55 2.45 0 .5.15.92.4 1.25-.62-.35-1-.95-1-1.7 0-1.2.85-2.1 2.15-2.3v.3Z"
          fill="#FE2C55"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    color: "text-[#FF0000]",
    hover: "hover:border-[#FF0000]/40 hover:bg-[#FF0000]/[0.06]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-current"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#E2E8E7] bg-white">
      {/* Very subtle turquoise ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[180px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#14B8A6]/[0.035]
          blur-[90px]
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          py-10
          sm:px-8
          sm:py-11
          md:px-10
          md:py-12
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
            justify-between
            gap-7
            text-center
            sm:flex-row
            sm:gap-6
            sm:text-left
          "
        >
          {/* Brand */}
          <Link
            href="/"
            className="
              group
              relative
              text-[19px]
              font-bold
              tracking-[-0.035em]
              text-[#0B1220]
              transition-colors
              duration-300
              hover:text-[#14B8A6]
            "
          >
            BH Ventures

            <span
              className="
                absolute
                -bottom-1
                left-0
                h-px
                w-0
                bg-[#14B8A6]
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </Link>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={`BH Ventures ${social.label}`}
                target={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "_blank"
                }
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={`
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E2E8E7]
                  bg-white
                  ${social.color}
                  shadow-[0_4px_18px_rgba(11,18,32,0.04)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  ${social.hover}
                  hover:shadow-[0_8px_25px_rgba(11,18,32,0.10)]
                  active:translate-y-0
                `}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px w-full bg-[#E2E8E7]" />

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
            sm:gap-4
            sm:text-left
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              leading-5
              text-[#64748B]
              sm:text-xs
            "
          >
            © {new Date().getFullYear()} BH Ventures FZE LLC. All rights
            reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#14B8A6]
              sm:text-[11px]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
            <span>Dubai</span>
            <span className="text-[#CBD5E1]">•</span>
            <span>UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}