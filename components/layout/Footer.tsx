"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
} from "lucide-react";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const focusLinks = [
  { label: "International Trading", href: "#" },
  { label: "Business Ventures", href: "#" },
  { label: "Strategic Partnerships", href: "#" },
  { label: "Market Expansion", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const globalMarkets = [
  { code: "ae", name: "UAE" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "cn", name: "China" },
  { code: "pk", name: "Pakistan" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-[#0A66C2]"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.57V9H3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-[#1877F2]"
        aria-hidden="true"
      >
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[20px] w-[20px] fill-none stroke-[#E1306C]"
        strokeWidth="1.9"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.3"
          cy="6.7"
          r="1"
          fill="#E1306C"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px] fill-black"
        aria-hidden="true"
      >
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2zm-1.1 17.9h1.73L8.27 3.98H6.41L17.8 19.9z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[20px] w-[20px]"
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
    label: "Snapchat",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[20px] w-[20px] fill-[#FFFC00]"
        aria-hidden="true"
      >
        <path d="M12 3.1c-3.25 0-5.35 2.27-5.35 5.4v2.17c0 .56-.2.92-.7 1.2-.32.18-.7.3-1.06.43-.42.15-.74.27-.74.58 0 .5.72.72 1.38.9.48.13.93.25 1.08.53.17.31.02.77-.4 1.32-.3.39-.63.74-.63 1.03 0 .38.44.54.96.66.4.1.85.2 1.14.5.36.37.48.95.65 1.35.15.34.36.48.68.48.25 0 .57-.1.94-.21.52-.17 1.1-.37 1.76-.37.7 0 1.28.21 1.8.4.35.12.66.22.9.22.33 0 .54-.14.7-.48.18-.4.3-.98.66-1.35.3-.3.74-.4 1.14-.5.52-.12.96-.28.96-.66 0-.29-.33-.64-.63-1.03-.42-.55-.57-1.01-.4-1.32.15-.28.6-.4 1.08-.53.66-.18 1.38-.4 1.38-.9 0-.31-.32-.43-.74-.58-.36-.13-.74-.25-1.06-.43-.5-.28-.7-.64-.7-1.2V8.5c0-3.13-2.1-5.4-5.35-5.4Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[20px] w-[20px] fill-[#FF0000]"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t border-white/[0.12]
        bg-[#07131C]/70
        text-white
        backdrop-blur-2xl
        backdrop-saturate-150
      "
    >
      {/* Glass Highlight */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-white/[0.045]
          via-transparent
          to-[#00FFD5]/[0.025]
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[260px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#00FFD5]/[0.045]
          blur-[120px]
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
          sm:py-12
          md:px-10
          lg:px-12
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* Top Section */}
        <div
          className="
            flex
            flex-col
            gap-8
            border-b
            border-white/[0.10]
            pb-9
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="max-w-[700px]">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#00FFD5]
                  shadow-[0_0_10px_rgba(0,255,213,0.75)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#00FFD5]
                  sm:text-[10px]
                "
              >
                BH Ventures
              </span>
            </div>

            <h2
              className="
                max-w-[680px]
                text-[26px]
                font-bold
                leading-[1.18]
                tracking-[-0.04em]
                text-white
                sm:text-[32px]
                lg:text-[38px]
              "
            >
              Building opportunities.
              <span className="text-[#00FFD5]">
                {" "}
                Creating global impact.
              </span>
            </h2>

            <p
              className="
                mt-3
                max-w-[620px]
                text-[12px]
                leading-6
                text-white/50
                sm:text-[13px]
                sm:leading-6
              "
            >
              BH Ventures FZE LLC is a UAE-based company focused on
              international trading, strategic ventures, business
              partnerships, and sustainable global growth.
            </p>
          </div>

          <Link
            href="/contact"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[#00FFD5]/25
              bg-transparent
              px-5
              py-3
              text-[11px]
              font-bold
              text-[#00FFD5]
              no-underline
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#00FFD5]/50
              hover:bg-[#00FFD5]/[0.04]
            "
          >
            Connect With Us

            <ArrowUpRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>

        {/* Main Information */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            py-10
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_1fr_1fr_1fr]
            lg:gap-12
            lg:py-12
          "
        >
          {/* Company */}
          <div className="max-w-[390px]">
            <Link
              href="/"
              className="
                inline-block
                text-[20px]
                font-bold
                tracking-[-0.04em]
                text-white
                no-underline
                transition-colors
                duration-300
                hover:text-[#00FFD5]
              "
            >
              BH Ventures
            </Link>

            <p
              className="
                mt-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.20em]
                text-white/30
              "
            >
              FZE LLC
            </p>

            <p
              className="
                mt-5
                text-[12px]
                leading-6
                text-white/45
                sm:text-[13px]
              "
            >
              A Dubai-based venture company connecting businesses,
              opportunities, and international markets through strategic
              growth and trusted partnerships.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="mailto:info@bhventures.ae"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-[11px]
                  font-medium
                  text-white/50
                  no-underline
                  transition-colors
                  duration-300
                  hover:text-[#00FFD5]
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.035]
                    text-[#00FFD5]
                  "
                >
                  <Mail className="h-[14px] w-[14px]" />
                </span>

                info@bhventures.ae
              </a>

              <div className="flex items-center gap-3 text-[11px] font-medium text-white/50">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.035]
                    text-[#00FFD5]
                  "
                >
                  <MapPin className="h-[14px] w-[14px]" />
                </span>

                Dubai, United Arab Emirates
              </div>
            </div>
          </div>

          {/* Company Links */}
          <FooterColumn
            title="Company"
            links={companyLinks}
            showArrows
          />

          {/* Business Focus */}
          <FooterColumn
            title="Business Focus"
            links={focusLinks}
            showArrows={false}
          />

          {/* Legal + Social */}
          <div>
            <h3
              className="
                mb-5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Legal
            </h3>

            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    group
                    flex
                    w-fit
                    items-center
                    gap-1
                    text-[11px]
                    font-medium
                    text-white/45
                    no-underline
                    transition-colors
                    duration-300
                    hover:text-[#00FFD5]
                  "
                >
                  {link.label}

                  <ArrowUpRight
                    className="
                      h-3
                      w-3
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </div>

            <h3
              className="
                mb-4
                mt-8
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Connect
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`BH Ventures ${social.label}`}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/30
                    bg-white
                    shadow-[0_3px_14px_rgba(0,0,0,0.10)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#00FFD5]/50
                    hover:shadow-[0_0_18px_rgba(0,255,213,0.15)]
                  "
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Global Markets */}
        <div className="border-y border-white/[0.10] py-7">
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-[#00FFD5]
                "
              >
                <Globe2 className="h-[17px] w-[17px]" />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.20em]
                    text-[#00FFD5]
                  "
                >
                  Global Reach
                </p>

                <p className="mt-1 text-[12px] font-semibold text-white">
                  Connecting markets across borders
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {globalMarkets.map((market) => (
                <div
                  key={market.code}
                  title={market.name}
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-white/25
                    bg-transparent
                    px-3.5
                    py-2
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#00FFD5]/45
                    hover:bg-white/[0.025]
                  "
                >
                  <Image
                    src={`https://flagcdn.com/w40/${market.code}.png`}
                    alt={`${market.name} flag`}
                    width={26}
                    height={19}
                    className="
                      h-[19px]
                      w-[26px]
                      rounded-[2px]
                      object-cover
                      shadow-[0_1px_5px_rgba(0,0,0,0.25)]
                    "
                  />

                  <span className="text-[9px] font-semibold text-white/60">
                    {market.name}
                  </span>
                </div>
              ))}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#00FFD5]/30
                  bg-transparent
                  px-3.5
                  py-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#00FFD5]
                  transition-all
                  duration-300
                  hover:border-[#00FFD5]/50
                  hover:bg-[#00FFD5]/[0.04]
                "
              >
                <Globe2 className="h-3.5 w-3.5" />
                Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-3
            pt-6
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              leading-5
              text-white/30
              sm:text-[11px]
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
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/35
              sm:text-[10px]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#00FFD5]
                shadow-[0_0_8px_rgba(0,255,213,0.7)]
              "
            />

            <span>Dubai</span>

            <span className="text-white/15">•</span>

            <span>UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  showArrows = true,
}: {
  title: string;
  links: { label: string; href: string }[];
  showArrows?: boolean;
}) {
  return (
    <div>
      <h3
        className="
          mb-5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-white
        "
      >
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="
                group
                inline-flex
                items-center
                gap-1
                text-[11px]
                font-medium
                text-white/45
                no-underline
                transition-colors
                duration-300
                hover:text-[#00FFD5]
              "
            >
              {link.label}

              {showArrows && (
                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}