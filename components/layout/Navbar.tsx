"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  ContactRound,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/insights" },
];

const languages = [
  { code: "en", label: "English", short: "GB", flag: "🇬🇧" },
  { code: "ar", label: "Arabic", short: "AE", flag: "🇦🇪" },
  { code: "de", label: "German", short: "DE", flag: "🇩🇪" },
  { code: "fr", label: "French", short: "FR", flag: "🇫🇷" },
  { code: "it", label: "Italian", short: "IT", flag: "🇮🇹" },
  { code: "uk", label: "Ukrainian", short: "UA", flag: "🇺🇦" },
  { code: "pl", label: "Polish", short: "PL", flag: "🇵🇱" },
  { code: "es", label: "Spanish", short: "ES", flag: "🇪🇸" },
  { code: "pt", label: "Portuguese", short: "PT", flag: "🇵🇹" },
  { code: "hr", label: "Croatian", short: "HR", flag: "🇭🇷" },
  { code: "sv", label: "Swedish", short: "SE", flag: "🇸🇪" },
];

const LANGUAGE_STORAGE_KEY = "bh-language";

/* ========================================
   LANGUAGE STORE
======================================== */

function getLanguageSnapshot(): string {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return languages.some((language) => language.code === saved)
    ? saved ?? "en"
    : "en";
}

function getServerLanguageSnapshot(): string {
  return "en";
}

function subscribeToLanguageStore(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}

/* ========================================
   WHATSAPP ICON
======================================== */

function WhatsAppIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.148-.672.15-.2.297-.77.967-.944 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51-.174-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.297-1.042 1.017-1.042 2.479s1.067 2.876 1.215 3.075c.149.198 2.1 3.205 5.077 4.494.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.004 2a9.9 9.9 0 0 0-8.48 15.028L2 22l5.116-1.342A9.9 9.9 0 1 0 12.004 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.295-.175-3.036.796.81-2.956-.192-.304A8.08 8.08 0 1 1 12.004 19.98Z" />
    </svg>
  );
}

/* ========================================
   TELEGRAM ICON
======================================== */

function TelegramIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.9 3.2 18.7 20c-.24 1.18-.87 1.47-1.76.92l-4.82-3.55-2.33 2.24c-.26.26-.48.48-.99.48l.35-4.91 8.94-8.08c.39-.35-.09-.55-.61-.2L6.42 13.77l-4.66-1.46c-1.01-.32-1.03-1.01.21-1.5L20.2 4.16c.86-.32 1.62.2 1.7-.96Z" />
    </svg>
  );
}

/* ========================================
   COLORFUL WORLD GLOBE
======================================== */

function ColorfulWorldIcon({
  className = "h-[18px] w-[18px]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="globeOcean" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#63D8FF" />
          <stop offset="45%" stopColor="#2196F3" />
          <stop offset="100%" stopColor="#1264C8" />
        </radialGradient>

        <linearGradient id="globeLand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8EEB72" />
          <stop offset="55%" stopColor="#35B94A" />
          <stop offset="100%" stopColor="#178A3A" />
        </linearGradient>

        <linearGradient id="globeShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <clipPath id="globeClip">
          <circle cx="16" cy="16" r="14" />
        </clipPath>
      </defs>

      <circle cx="16" cy="16" r="14" fill="url(#globeOcean)" />

      <g clipPath="url(#globeClip)">
        <path
          d="M4.2 9.2 6.1 6.8l3.1-.7 2.1 1.1.9 2.2-1.6 1.2-1.7-.2-1.2 1.8-2.4-.1-1.1-1.9Z"
          fill="url(#globeLand)"
        />

        <path
          d="M12.1 14.2 14.1 14l1.6 2.1-.3 2.2-1.1 1.8-.4 3-1.5 2.1-1.2-1.4.3-2.5-1-2.3.6-2.2-.8-1.5 1.8-1.1Z"
          fill="url(#globeLand)"
        />

        <path
          d="m16.1 8.3 2.1-.8 1.7.8.8 1.3-1.3 1.1-1.6-.2-.8 1.1-1.6-.8-.1-1.3.8-1.2Z"
          fill="url(#globeLand)"
        />

        <path
          d="m17.2 12 2.4.3 1.2 1.8-.5 2.4-1.1 2.1-.9 3.1-1.5 1.2-1.1-1.8.2-2.1-1-1.9.9-2.2-.5-1.7 1.9-1.2Z"
          fill="url(#globeLand)"
        />

        <path
          d="m20.1 9.2 2.2-.6 2.2 1.3 2.1.1 1.1 1.6-1.4 1.3-2.1-.3-1.2 1.3-2.1-.5-.9-1.6-1.7-.6-.2-1.2 2-.8Z"
          fill="url(#globeLand)"
        />

        <path
          d="m24 20.7 2 .1 1.6 1.1-.7 1.7-2.1.4-1.7-1.3.9-2Z"
          fill="url(#globeLand)"
        />

        <ellipse
          cx="16"
          cy="16"
          rx="8"
          ry="14"
          fill="none"
          stroke="#D9F3FF"
          strokeOpacity="0.3"
          strokeWidth="0.7"
        />

        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="5"
          fill="none"
          stroke="#D9F3FF"
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />

        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="9"
          fill="none"
          stroke="#D9F3FF"
          strokeOpacity="0.18"
          strokeWidth="0.7"
        />

        <path
          d="M2 16h28M16 2v28"
          fill="none"
          stroke="#D9F3FF"
          strokeOpacity="0.2"
          strokeWidth="0.7"
        />

        <ellipse
          cx="11"
          cy="8"
          rx="7"
          ry="5"
          fill="url(#globeShine)"
          transform="rotate(-25 11 8)"
        />
      </g>

      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="#8EDCFF"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* ========================================
   GOOGLE TRANSLATE
======================================== */

function hideGoogleTranslationBar() {
  document
    .querySelectorAll(
      ".goog-te-banner-frame, .goog-te-banner-frame.skiptranslate, .goog-te-balloon-frame"
    )
    .forEach((element) => {
      const el = element as HTMLElement;

      el.style.display = "none";
      el.style.visibility = "hidden";
      el.style.height = "0";
      el.style.minHeight = "0";
    });

  document.body.style.top = "0px";
  document.body.style.position = "static";
  document.body.style.width = "100%";
  document.body.style.marginTop = "0px";

  document.documentElement.style.top = "0px";
  document.documentElement.style.position = "static";
  document.documentElement.style.marginTop = "0px";
}

function setGoogleLanguage(languageCode: string): boolean {
  const select = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;

  if (!select) {
    return false;
  }

  select.value = languageCode;

  select.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  );

  return true;
}

/* ========================================
   NAVBAR
======================================== */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  /*
    React 19 hydration-safe language state.

    Server snapshot = "en" / GB
    Client hydration snapshot = "en" / GB
    Browser snapshot after hydration = saved language
  */
  const currentLanguage = useSyncExternalStore(
    subscribeToLanguageStore,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  /* ========================================
     FOOTER LIGHT MODE DETECTION
  ======================================== */

  useEffect(() => {
    const footer = document.querySelector("[data-footer='true']");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLightMode(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -45% 0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ========================================
     GOOGLE TRANSLATE BAR HIDER
  ======================================== */

  useEffect(() => {
    hideGoogleTranslationBar();

    const observer = new MutationObserver(() => {
      hideGoogleTranslationBar();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    const interval = window.setInterval(() => {
      hideGoogleTranslationBar();
    }, 250);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  /* ========================================
     LANGUAGE CHANGE
  ======================================== */

  const changeLanguage = (languageCode: string) => {
    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      languageCode
    );

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: LANGUAGE_STORAGE_KEY,
        newValue: languageCode,
      })
    );

    setLanguageOpen(false);

    let attempts = 0;
    const maxAttempts = 30;

    const tryTranslate = () => {
      attempts += 1;

      const changed = setGoogleLanguage(languageCode);

      hideGoogleTranslationBar();

      if (!changed && attempts < maxAttempts) {
        window.setTimeout(tryTranslate, 250);
      }
    };

    tryTranslate();
  };

  const selectedLanguage =
    languages.find((language) => language.code === currentLanguage) ??
    languages[0];

  const openContactMenu = () => {
    setContactOpen(true);
    setIsOpen(false);
    setLanguageOpen(false);
  };

  const closeContactMenu = () => {
    setContactOpen(false);
  };

  /* ========================================
     DYNAMIC NAVBAR COLORS
  ======================================== */

  const navText = isLightMode ? "text-[#0B1220]" : "text-white";

  const navBorder = isLightMode
    ? "border-[#0B1220]/10"
    : "border-white/[0.12]";

  const navBackground = isLightMode
    ? "bg-white/95"
    : "bg-white/[0.035]";

  const navHover = isLightMode
    ? "hover:bg-[#0B1220]/[0.055] hover:text-[#0B1220]"
    : "hover:bg-white/[0.06] hover:text-white";

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <header className="fixed inset-x-0 top-0 z-[100]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#14B8A6]/60 to-transparent blur-[1px]"
        />

        <nav
          className={`
            mx-auto flex h-[64px] w-full items-center
            border-b px-3
            shadow-[0_8px_35px_rgba(0,0,0,0.10)]
            backdrop-blur-2xl backdrop-saturate-150
            transition-all duration-500
            sm:h-[66px] sm:px-5
            md:h-[68px] md:px-8
            lg:px-10
            xl:h-[70px] xl:px-12
            ${navBorder}
            ${navBackground}
          `}
        >
          {/* LOGO */}

          <Link
            href="/"
            aria-label="BH Ventures Home"
            onClick={() => {
              setIsOpen(false);
              setLanguageOpen(false);
              setContactOpen(false);
            }}
            className="group relative z-10 flex shrink-0 items-center justify-center [perspective:800px]"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-[5px] rounded-full border border-[#2DD4BF]/45 border-t-[#5EEAD4] border-r-[#14B8A6] shadow-[0_0_16px_rgba(45,212,191,0.22)] animate-[spin_10s_linear_infinite]"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[7px] rounded-full bg-[#14B8A6]/10 blur-xl opacity-60 transition-all duration-500 group-hover:bg-[#2DD4BF]/20 group-hover:opacity-100"
            />

            <span className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-[#0B1220]/80 shadow-[0_8px_25px_rgba(0,0,0,0.22)] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(18deg)_rotateX(8deg)_scale(1.05)] sm:h-[44px] sm:w-[44px] md:h-[47px] md:w-[47px] lg:h-[49px] lg:w-[49px]">
              <Image
                src="/images/bh-ventures-logo.jpeg"
                alt="BH Ventures FZE - LLC"
                width={150}
                height={150}
                priority
                className="h-full w-full rounded-full object-cover"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.20] via-transparent to-transparent"
              />
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <div
            className={`
              mx-auto hidden items-center gap-1 rounded-full
              border px-1.5 py-1
              transition-all duration-500
              lg:flex
              xl:gap-1.5
              ${
                isLightMode
                  ? "border-[#0B1220]/[0.08] bg-[#0B1220]/[0.025]"
                  : "border-white/[0.07] bg-white/[0.025]"
              }
            `}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  group relative flex items-center justify-center
                  rounded-full px-3 py-2
                  text-[12px] font-extrabold tracking-[0.01em]
                  transition-all duration-300
                  xl:px-3.5
                  ${navText}
                  ${navHover}
                `}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                />

                {item.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT SIDE */}

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            {/* Language */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((prev) => !prev)}
                aria-label="Select language"
                aria-expanded={languageOpen}
                className={`
                  flex h-[36px] items-center gap-2 rounded-full
                  border px-3 text-[11px] font-bold
                  transition-all duration-300
                  ${
                    isLightMode
                      ? "border-[#0B1220]/15 bg-[#0B1220]/[0.035] text-[#0B1220] hover:border-[#14B8A6]/50 hover:bg-[#0B1220]/[0.06]"
                      : "border-white/[0.12] bg-white/[0.06] text-white hover:border-[#2DD4BF]/50 hover:bg-white/[0.10]"
                  }
                `}
              >
                <ColorfulWorldIcon className="h-[18px] w-[18px]" />

                <span
                  className={
                    isLightMode
                      ? "text-[#0B1220]"
                      : "text-white"
                  }
                >
                  {selectedLanguage.short}
                </span>

                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    isLightMode
                      ? "text-[#0B1220]"
                      : "text-white"
                  } ${languageOpen ? "rotate-180" : ""}`}
                />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-[44px] z-[200] w-[185px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0B1220]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() =>
                        changeLanguage(language.code)
                      }
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold transition-all duration-200 ${
                        currentLanguage === language.code
                          ? "bg-[#2DD4BF]/15 text-[#5EEAD4]"
                          : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span className="text-base">
                        {language.flag}
                      </span>

                      <span>{language.label}</span>

                      <span className="ml-auto text-[10px] text-white/35">
                        {language.short}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp */}

            <button
              type="button"
              onClick={openContactMenu}
              aria-label="Contact us on WhatsApp"
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_18px_rgba(37,211,102,0.18)] transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] hover:shadow-[0_0_25px_rgba(37,211,102,0.30)]"
            >
              <WhatsAppIcon className="h-[19px] w-[19px]" />
            </button>

            {/* Telegram */}

            <button
              type="button"
              onClick={openContactMenu}
              aria-label="Contact us on Telegram"
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_0_18px_rgba(34,158,217,0.18)] transition-all duration-300 hover:scale-105 hover:bg-[#168CC5] hover:shadow-[0_0_25px_rgba(34,158,217,0.30)]"
            >
              <TelegramIcon className="h-[19px] w-[19px]" />
            </button>

            {/* CTA */}

            <Link
              href="/contact"
              className={`
                group relative flex h-[36px] shrink-0 items-center gap-1.5
                overflow-hidden rounded-full border px-4
                text-[11px] font-bold tracking-[0.01em]
                transition-all duration-300
                ${
                  isLightMode
                    ? "border-[#14B8A6]/55 bg-[#14B8A6]/[0.07] text-[#0B1220] hover:border-[#14B8A6]/80 hover:bg-[#14B8A6]/15"
                    : "border-[#14B8A6]/50 bg-[#14B8A6]/[0.06] text-white hover:border-[#2DD4BF]/80 hover:bg-[#14B8A6]/15"
                }
              `}
            >
              <span>Discover Solutions</span>

              <ArrowUpRight className="h-3.5 w-3.5 text-[#14B8A6] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* MOBILE / TABLET */}

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:hidden">
            {/* Mobile Language */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setLanguageOpen((prev) => !prev)
                }
                aria-label="Select language"
                aria-expanded={languageOpen}
                className={`
                  flex h-[32px] items-center gap-1 rounded-full
                  border px-2 text-[9px] font-extrabold
                  transition-all duration-300
                  sm:h-[35px] sm:px-2.5 sm:text-[10px]
                  ${
                    isLightMode
                      ? "border-[#0B1220]/15 bg-[#0B1220]/[0.035] text-[#0B1220]"
                      : "border-white/[0.12] bg-white/[0.06] text-white"
                  }
                `}
              >
                <ColorfulWorldIcon className="h-[15px] w-[15px] sm:h-[17px] sm:w-[17px]" />

                <span>{selectedLanguage.short}</span>

                <ChevronDown
                  className={`h-2.5 w-2.5 transition-transform duration-200 ${
                    isLightMode
                      ? "text-[#0B1220]"
                      : "text-white"
                  } ${languageOpen ? "rotate-180" : ""}`}
                />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-[39px] z-[200] max-h-[330px] w-[175px] overflow-y-auto rounded-2xl border border-white/[0.10] bg-[#0B1220]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() =>
                        changeLanguage(language.code)
                      }
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold transition-all duration-200 ${
                        currentLanguage === language.code
                          ? "bg-[#2DD4BF]/15 text-[#5EEAD4]"
                          : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span className="text-base">
                        {language.flag}
                      </span>

                      <span>{language.label}</span>

                      <span className="ml-auto text-[10px] text-white/35">
                        {language.short}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile WhatsApp */}

            <button
              type="button"
              onClick={openContactMenu}
              aria-label="Contact us on WhatsApp"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_14px_rgba(37,211,102,0.18)] transition-all duration-300 hover:scale-105 sm:h-[35px] sm:w-[35px]"
            >
              <WhatsAppIcon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            </button>

            {/* Mobile Telegram */}

            <button
              type="button"
              onClick={openContactMenu}
              aria-label="Contact us on Telegram"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_0_14px_rgba(34,158,217,0.18)] transition-all duration-300 hover:scale-105 sm:h-[35px] sm:w-[35px]"
            >
              <TelegramIcon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
            </button>

            {/* Menu */}

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#14B8A6]/60 sm:h-[35px] sm:w-[35px] ${
                isLightMode
                  ? "border-[#0B1220]/15 bg-[#0B1220] text-white"
                  : "border-white/[0.14] bg-[#0B1220] text-white"
              }`}
            >
              {isOpen ? (
                <X className="h-[16px] w-[16px]" />
              ) : (
                <Menu className="h-[16px] w-[16px]" />
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}

        <div
          className={`absolute left-3 right-3 top-[70px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B1220]/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 sm:left-5 sm:right-5 sm:top-[73px] md:left-6 md:right-6 md:top-[76px] lg:hidden ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between border-b border-white/[0.07] py-3.5 text-[13px] font-extrabold text-white transition-all hover:text-white sm:py-4 sm:text-sm"
              >
                <span>{item.label}</span>

                <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2DD4BF]" />
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#14B8A6]/60 bg-[#14B8A6]/10 text-[12px] font-bold text-white sm:mt-6 sm:min-h-[48px] sm:text-sm"
            >
              Discover Solutions

              <ArrowUpRight className="h-4 w-4 text-[#2DD4BF]" />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================
          CONTACT MENU
      ======================================== */}

      {contactOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-start justify-center bg-black/35 px-4 pt-[82px] backdrop-blur-[3px] sm:pt-[92px]"
          onClick={closeContactMenu}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Contact BH Ventures"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#0B1220]/95 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-3xl contact-panel-in sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#14B8A6]/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#229ED9]/10 blur-3xl"
            />

            <button
              type="button"
              onClick={closeContactMenu}
              aria-label="Close contact menu"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-white/70 transition-all duration-300 hover:bg-white/[0.10] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mb-4 flex justify-center">
              <div className="relative flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#2DD4BF]/30 bg-[#14B8A6]/10 shadow-[0_0_35px_rgba(20,184,166,0.16)] human-float">
                <div
                  aria-hidden="true"
                  className="absolute inset-[-7px] rounded-full border border-[#2DD4BF]/10 human-pulse"
                />

                <ContactRound
                  className="h-[34px] w-[34px] text-[#5EEAD4] drop-shadow-[0_0_10px_rgba(45,212,191,0.35)]"
                  strokeWidth={1.7}
                />
              </div>
            </div>

            <div className="relative text-center">
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-white sm:text-[24px]">
                Talk to a Human
              </h2>

              <p className="mx-auto mt-2 max-w-[350px] text-[12px] font-medium leading-[1.7] text-white/60 sm:text-[13px]">
                Connect with our expert team for personalized guidance,
                business inquiries, and dedicated support aligned with your
                objectives.
              </p>
            </div>

            <div className="relative mt-6 space-y-3">
              <a
                href="https://wa.me/971559466820"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.045] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/35 hover:bg-[#25D366]/[0.07]"
              >
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition-transform duration-300 group-hover:scale-105">
                  <WhatsAppIcon className="h-[22px] w-[22px]" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-extrabold text-white">
                    WhatsApp
                  </span>

                  <span className="mt-0.5 block text-[10px] font-medium text-white/45 sm:text-[11px]">
                    Typically replies in 5 minutes
                  </span>
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25D366]" />
              </a>

              <a
                href="https://t.me/bderr_04"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.045] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#229ED9]/35 hover:bg-[#229ED9]/[0.07]"
              >
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#229ED9]/15 text-[#229ED9] transition-transform duration-300 group-hover:scale-105">
                  <TelegramIcon className="h-[22px] w-[22px]" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-extrabold text-white">
                    Telegram
                  </span>

                  <span className="mt-0.5 block text-[10px] font-medium text-white/45 sm:text-[11px]">
                    Typically replies in 5 minutes
                  </span>
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#229ED9]" />
              </a>
            </div>

            <div className="relative mt-5 text-center">
              <Link
                href="/privacy-policy"
                onClick={closeContactMenu}
                className="text-[10px] font-medium text-white/35 transition-colors duration-300 hover:text-white/65"
              >
                By contacting us, you agree to our Terms of Service and Privacy
                Policy.
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes contactIn {
          0% {
            opacity: 0;
            transform: translateY(-14px) scale(0.97);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes humanFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-4px) rotate(2deg);
          }
        }

        @keyframes humanPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.7;
          }

          70%,
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        .contact-panel-in {
          animation: contactIn 0.35s ease-out;
        }

        .human-float {
          animation: humanFloat 2.8s ease-in-out infinite;
        }

        .human-pulse {
          animation: humanPulse 2.2s ease-out infinite;
        }
      `}</style>
    </>
  );
}