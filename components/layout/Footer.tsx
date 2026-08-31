"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
} from "lucide-react";

/* =========================================================
   COMPANY LINKS
   ========================================================= */

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

/* =========================================================
   BUSINESS FOCUS
   ========================================================= */

const focusLinks = [
  { label: "International Trading", href: "#" },
  { label: "Business Ventures", href: "#" },
  { label: "Strategic Partnerships", href: "#" },
  { label: "Market Expansion", href: "#" },
];

/* =========================================================
   LEGAL LINKS
   ========================================================= */

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

/* =========================================================
   GLOBAL MARKETS
   ========================================================= */

const globalMarkets = [
  { code: "ae", name: "UAE" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "pk", name: "Pakistan" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "ee", name: "Estonia" },
  { code: "dk", name: "Denmark" },
  { code: "ua", name: "Ukraine" },
];

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    color: "text-[#0A66C2]",
    hover:
      "hover:border-[#0A66C2]/35 hover:bg-[#0A66C2]/[0.08] hover:shadow-[0_8px_25px_rgba(10,102,194,0.18)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] fill-current"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.57V9H3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    color: "text-[#1877F2]",
    hover:
      "hover:border-[#1877F2]/35 hover:bg-[#1877F2]/[0.08] hover:shadow-[0_8px_25px_rgba(24,119,242,0.18)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] fill-current"
        aria-hidden="true"
      >
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    color: "text-[#E1306C]",
    hover:
      "hover:border-[#E1306C]/35 hover:bg-[#E1306C]/[0.08] hover:shadow-[0_8px_25px_rgba(225,48,108,0.18)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] fill-none stroke-current"
        strokeWidth="2"
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
    label: "X",
    href: "#",
    color: "text-[#111827]",
    hover:
      "hover:border-black/20 hover:bg-black/[0.04] hover:shadow-[0_8px_25px_rgba(17,24,39,0.14)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[14px] w-[14px] fill-current"
        aria-hidden="true"
      >
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.27 3.98H6.41L17.8 19.9Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    color: "text-[#111827]",
    hover:
      "hover:border-black/20 hover:bg-black/[0.04] hover:shadow-[0_8px_25px_rgba(17,24,39,0.14)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px]"
        aria-hidden="true"
      >
        <path
          d="M16.6 3c.3 1.75 1.32 2.84 3.05 3.08v3.02a8.3 8.3 0 0 1-3.02-.7v6.25c0 3.58-2.15 5.35-5.02 5.35-2.74 0-4.61-1.77-4.61-4.32 0-2.75 2.15-4.65 5.17-4.65.4 0 .8.04 1.18.13v3.02a3.7 3.7 0 0 0-1.12-.18c-1.14 0-2.1.68-2.1 1.75 0 .9.68 1.55 1.62 1.55 1.07 0 1.8-.72 1.8-2.1V3h3.05Z"
          fill="currentColor"
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
    color: "text-[#C8C500]",
    hover:
      "hover:border-[#D8D500]/35 hover:bg-[#D8D500]/[0.08] hover:shadow-[0_8px_25px_rgba(216,213,0,0.18)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] fill-current"
        aria-hidden="true"
      >
        <path d="M12 3.1c-3.25 0-5.35 2.27-5.35 5.4v2.17c0 .56-.2.92-.7 1.2-.32.18-.7.3-1.06.43-.42.15-.74.27-.74.58 0 .5.72.72 1.38.9.48.13.93.25 1.08.53.17.31.02.77-.4 1.32-.3.39-.63.74-.63 1.03 0 .38.44.54.96.66.4.1.85.2 1.14.5.36.37.48.95.65 1.35.15.34.36.48.68.48.25 0 .57-.1.94-.21.52-.17 1.1-.37 1.76-.37.7 0 1.28.21 1.8.4.35.12.66.22.9.22.33 0 .54-.14.7-.48.18-.4.3-.98.66-1.35.3-.3.74-.4 1.14-.5.52-.12.96-.28.96-.66 0-.29-.33-.64-.63-1.03-.42-.55-.57-1.01-.4-1.32.15-.28.6-.4 1.08-.53.66-.18 1.38-.4 1.38-.9 0-.31-.32-.43-.74-.58-.36-.13-.74-.25-1.06-.43-.5-.28-.7-.64-.7-1.2V8.5c0-3.13-2.1-5.4-5.35-5.4Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    color: "text-[#FF0000]",
    hover:
      "hover:border-[#FF0000]/30 hover:bg-[#FF0000]/[0.06] hover:shadow-[0_8px_25px_rgba(255,0,0,0.18)]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] fill-current"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
];

/* =========================================================
   FOOTER
   ========================================================= */

export default function Footer() {
  return (
    <footer
      data-footer="true"
      className="
        relative
        isolate
        block
        w-full
        min-w-0
        max-w-full
        overflow-x-clip
        border-t
        border-[#0B1B2B]/10
        bg-[#F5F7FA]
        text-[#0B1B2B]
      "
    >
      {/* TOP ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#00BFA5]/60
          to-transparent
        "
      />

      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[120px]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#00BFA5]/[0.035]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          right-[-120px]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#5B7CFF]/[0.025]
          blur-[100px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div
        className="
          relative
          mx-auto
          block
          w-full
          min-w-0
          max-w-[1440px]
          px-5
          py-8
          sm:px-8
          sm:py-10
          md:px-10
          lg:px-12
          lg:py-11
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* ===================================================
            TOP SECTION
            =================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-col
            gap-7
            border-b
            border-[#0B1B2B]/10
            pb-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="min-w-0 max-w-[700px]">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BFA5]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#0B1B2B] sm:text-[10px]">
                BH Ventures
              </span>
            </div>

            <h2 className="max-w-[680px] text-[26px] font-bold leading-[1.18] tracking-[-0.04em] text-[#0B1B2B] sm:text-[32px] lg:text-[38px]">
              Building opportunities.
              <span className="text-[#00A88F]">
                {" "}
                Creating global impact.
              </span>
            </h2>

            <p className="mt-3 max-w-[620px] text-[12px] leading-6 text-[#526170] sm:text-[13px]">
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
              max-w-full
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[#00BFA5]/40
              bg-[#00BFA5]/[0.04]
              px-5
              py-3
              text-[11px]
              font-bold
              text-[#0B1B2B]
              no-underline
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#00BFA5]/70
              hover:bg-[#00BFA5]/[0.08]
            "
          >
            Connect With Us

            <ArrowUpRight
              className="
                h-4
                w-4
                shrink-0
                text-[#00A88F]
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>

        {/* ===================================================
            MAIN INFORMATION
            =================================================== */}

        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-9
            py-9
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_1fr_1fr_1fr]
            lg:gap-10
            lg:py-10
          "
        >
          {/* COMPANY */}

          <div className="min-w-0 max-w-[390px]">
            <Link
              href="/"
              className="
                inline-block
                text-[20px]
                font-bold
                tracking-[-0.04em]
                text-[#0B1B2B]
                no-underline
                transition-colors
                hover:text-[#00A88F]
              "
            >
              BH Ventures
            </Link>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.20em] text-[#718096]">
              FZE LLC
            </p>

            <p className="mt-5 text-[12px] leading-6 text-[#526170] sm:text-[13px]">
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
                  min-w-0
                  items-center
                  gap-3
                  text-[11px]
                  font-medium
                  text-[#526170]
                  transition-colors
                  hover:text-[#008F7A]
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#0B1B2B]/10
                    bg-white/70
                    text-[#00A88F]
                    shadow-sm
                  "
                >
                  <Mail className="h-[14px] w-[14px]" />
                </span>

                <span className="truncate">info@bhventures.ae</span>
              </a>

              <div className="flex min-w-0 items-center gap-3 text-[11px] font-medium text-[#526170]">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#0B1B2B]/10
                    bg-white/70
                    text-[#00A88F]
                    shadow-sm
                  "
                >
                  <MapPin className="h-[14px] w-[14px]" />
                </span>

                <span className="truncate">
                  Dubai, United Arab Emirates
                </span>
              </div>
            </div>
          </div>

          {/* COMPANY LINKS */}

          <FooterColumn
            title="Company"
            links={companyLinks}
            showArrows
          />

          {/* BUSINESS FOCUS */}

          <FooterColumn
            title="Business Focus"
            links={focusLinks}
            showArrows={false}
          />

          {/* LEGAL + SOCIAL */}

          <div className="min-w-0">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1B2B]">
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
                    max-w-full
                    items-center
                    gap-1
                    text-[11px]
                    font-medium
                    text-[#526170]
                    transition-colors
                    hover:text-[#008F7A]
                  "
                >
                  {link.label}

                  <ArrowUpRight
                    className="
                      h-3
                      w-3
                      shrink-0
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </div>

            <h3 className="mb-4 mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1B2B]">
              Connect
            </h3>

            <div className="flex max-w-full flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`BH Ventures ${social.label}`}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#0B1B2B]/10
                    bg-white/75
                    ${social.color}
                    shadow-[0_3px_12px_rgba(11,27,43,0.08)]
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${social.hover}
                  `}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            GLOBAL MARKETS
            =================================================== */}

        <div
          className="
            min-w-0
            border-y
            border-[#0B1B2B]/10
            py-6
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="flex min-w-0 items-center gap-3">
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
                  border-[#0B1B2B]/10
                  bg-white/70
                  text-[#00A88F]
                  shadow-sm
                "
              >
                <Globe2 className="h-[17px] w-[17px]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.20em] text-[#0B1B2B]">
                  Global Reach
                </p>

                <p className="mt-1 text-[12px] font-semibold text-[#0B1B2B]">
                  Connecting markets across borders
                </p>
              </div>
            </div>

            <div
              className="
                flex
                w-full
                min-w-0
                max-w-full
                flex-wrap
                items-center
                gap-2
                overflow-visible
                lg:w-auto
                lg:justify-end
              "
            >
              {globalMarkets.map((market) => (
                <div
                  key={market.code}
                  title={market.name}
                  className="
                    group
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#0B1B2B]/[0.12]
                    bg-white/70
                    px-3
                    py-1.5
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#00BFA5]/50
                    hover:bg-white
                    hover:shadow-[0_5px_18px_rgba(11,27,43,0.08)]
                  "
                >
                  <img
                    src={`https://flagcdn.com/w40/${market.code}.png`}
                    alt={`${market.name} flag`}
                    width={26}
                    height={19}
                    loading="lazy"
                    className="
                      shrink-0
                      rounded-[2px]
                      object-cover
                      shadow-[0_1px_4px_rgba(0,0,0,0.18)]
                    "
                  />

                  <span className="whitespace-nowrap text-[9px] font-semibold text-[#344454]">
                    {market.name}
                  </span>
                </div>
              ))}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#00BFA5]/35
                  bg-[#00BFA5]/[0.04]
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#0B1B2B]
                "
              >
                <Globe2 className="h-3.5 w-3.5 shrink-0 text-[#00A88F]" />
                Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            STRATEGIC LINE
            =================================================== */}

        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-3
            border-b
            border-[#0B1B2B]/10
            py-5
            sm:grid-cols-3
            sm:gap-0
          "
        >
          <div className="flex items-center gap-2 sm:justify-start">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1B2B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1B2B]">
              UAE Based
            </span>
          </div>

          <div className="flex items-center gap-2 sm:justify-center">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1B2B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1B2B]">
              Strategic Partnerships
            </span>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1B2B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B1B2B]">
              Long-Term Growth
            </span>
          </div>
        </div>

        {/* ===================================================
            COPYRIGHT
            =================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-col
            items-center
            justify-between
            gap-3
            pt-5
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <p className="text-[10px] font-medium leading-5 text-[#718096] sm:text-[11px]">
            © {new Date().getFullYear()} BH Ventures FZE LLC. All rights
            reserved.
          </p>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#718096]
              sm:text-[10px]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00BFA5]" />

            <span>Dubai</span>

            <span className="text-[#CBD5E0]">•</span>

            <span>UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
   ========================================================= */

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
    <div className="min-w-0">
      <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1B2B]">
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
                max-w-full
                items-center
                gap-1
                text-[11px]
                font-medium
                text-[#526170]
                no-underline
                transition-colors
                duration-300
                hover:text-[#008F7A]
              "
            >
              {link.label}

              {showArrows && (
                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    shrink-0
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