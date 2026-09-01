import { MapPin, Mail } from "lucide-react";

/* =========================================================
   WHATSAPP / TELEGRAM MARKS
   Same glyphs already used in Navbar's contact menu — kept
   local to this module rather than importing from Navbar.
   ========================================================= */

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.148-.672.15-.2.297-.77.967-.944 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51-.174-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.297-1.042 1.017-1.042 2.479s1.067 2.876 1.215 3.075c.149.198 2.1 3.205 5.077 4.494.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.004 2a9.9 9.9 0 0 0-8.48 15.028L2 22l5.116-1.342A9.9 9.9 0 1 0 12.004 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.295-.175-3.036.796.81-2.956-.192-.304A8.08 8.08 0 1 1 12.004 19.98Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.9 3.2 18.7 20c-.24 1.18-.87 1.47-1.76.92l-4.82-3.55-2.33 2.24c-.26.26-.48.48-.99.48l.35-4.91 8.94-8.08c.39-.35-.09-.55-.61-.2L6.42 13.77l-4.66-1.46c-1.01-.32-1.03-1.01.21-1.5L20.2 4.16c.86-.32 1.62.2 1.7-.96Z" />
    </svg>
  );
}

/* =========================================================
   SOCIAL MARKS
   Same platform set + hrefs already established in Footer.tsx.
   No new links or platforms are introduced here.
   ========================================================= */

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    accent: "#0A66C2",
    glow: "rgba(10,102,194,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.57V9H3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    accent: "#1877F2",
    glow: "rgba(24,119,242,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current" aria-hidden="true">
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    accent: "#E1306C",
    glow: "rgba(225,48,108,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    accent: "#FFFFFF",
    glow: "rgba(255,255,255,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current" aria-hidden="true">
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.27 3.98H6.41L17.8 19.9Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    accent: "#25F4EE",
    glow: "rgba(37,244,238,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
        <path
          d="M16.6 3c.3 1.75 1.32 2.84 3.05 3.08v3.02a8.3 8.3 0 0 1-3.02-.7v6.25c0 3.58-2.15 5.35-5.02 5.35-2.74 0-4.61-1.77-4.61-4.32 0-2.75 2.15-4.65 5.17-4.65.4 0 .8.04 1.18.13v3.02a3.7 3.7 0 0 0-1.12-.18c-1.14 0-2.1.68-2.1 1.75 0 .9.68 1.55 1.62 1.55 1.07 0 1.8-.72 1.8-2.1V3h3.05Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    href: "#",
    accent: "#FFFC00",
    glow: "rgba(255,252,0,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current" aria-hidden="true">
        <path d="M12 3.1c-3.25 0-5.35 2.27-5.35 5.4v2.17c0 .56-.2.92-.7 1.2-.32.18-.7.3-1.06.43-.42.15-.74.27-.74.58 0 .5.72.72 1.38.9.48.13.93.25 1.08.53.17.31.02.77-.4 1.32-.3.39-.63.74-.63 1.03 0 .38.44.54.96.66.4.1.85.2 1.14.5.36.37.48.95.65 1.35.15.34.36.48.68.48.25 0 .57-.1.94-.21.52-.17 1.1-.37 1.76-.37.7 0 1.28.21 1.8.4.35.12.66.22.9.22.33 0 .54-.14.7-.48.18-.4.3-.98.66-1.35.3-.3.74-.4 1.14-.5.52-.12.96-.28.96-.66 0-.29-.33-.64-.63-1.03-.42-.55-.57-1.01-.4-1.32.15-.28.6-.4 1.08-.53.66-.18 1.38-.4 1.38-.9 0-.31-.32-.43-.74-.58-.36-.13-.74-.25-1.06-.43-.5-.28-.7-.64-.7-1.2V8.5c0-3.13-2.1-5.4-5.35-5.4Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    accent: "#FF0000",
    glow: "rgba(255,0,0,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
];

/* =========================================================
   DIRECT CHANNELS
   Corporate office, email, WhatsApp, and Telegram — the same
   verified channels already used in Navbar / Footer.
   ========================================================= */

export const directChannels = [
  {
    icon: MapPin,
    label: "Corporate Office",
    value: "Dubai, United Arab Emirates",
    detail: "BH Ventures FZE LLC is registered in the Ajman Free Zone.",
    href: null as string | null,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@bhventures.ae",
    detail: "For general questions about the platform and its ventures.",
    href: "mailto:info@bhventures.ae",
    external: false,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+971 55 946 6820",
    detail: "Typically replies within minutes.",
    href: "https://wa.me/971559466820",
    external: true,
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@bderr_04",
    detail: "Typically replies within minutes.",
    href: "https://t.me/bderr_04",
    external: true,
  },
];

/* =========================================================
   QUICK LINKS
   Only routes that exist in this project.
   ========================================================= */

export const quickLinks = [
  { label: "Explore Ventures", href: "/ventures" },
  { label: "Discover Services", href: "/services" },
  { label: "View Our Portfolio", href: "/portfolio" },
  { label: "About BH Ventures", href: "/about" },
];
