import { MapPin, Mail } from "lucide-react";

/* =========================================================
   WHATSAPP / TELEGRAM MARKS
   Kept local to this module so AboutContact does not depend
   on components/contact (which is out of scope for this page).
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
   DIRECT CHANNELS
   Corporate office, email, WhatsApp, and Telegram — the same
   verified channels used on the (separate) /contact page.
   ========================================================= */

export const directChannels = [
  {
    icon: MapPin,
    label: "Corporate Office",
    value: "Dubai, United Arab Emirates",
    href: null as string | null,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@bhventures.ae",
    href: "mailto:info@bhventures.ae",
    external: false,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+971 55 946 6820",
    href: "https://wa.me/971559466820",
    external: true,
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@bderr_04",
    href: "https://t.me/bderr_04",
    external: true,
  },
];
