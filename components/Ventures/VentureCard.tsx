"use client";

import { useRef, MouseEvent, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/types";
import { BH_WHATSAPP_NUMBER, BH_WHATSAPP_DISPLAY } from "@/lib/constants";

import "./venture-detail.css";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const CATEGORY_MAP: Record<string, string> = {
  "global trade": "trade",
  "web3": "web3",
  "venture building": "web3",
  "artificial intelligence": "ai",
  "analytics": "ai",
  "marketing": "marketing",
  "advertising": "marketing",
  "consulting": "trade",
  "events": "web3",
  "automobiles": "trade",
  "automobile": "trade",
};

function getCategory(badge: string | undefined) {
  if (!badge) return "default";
  const key = badge.toLowerCase();
  const match = Object.keys(CATEGORY_MAP).find((k) => key.includes(k));
  return match ? CATEGORY_MAP[match] : "default";
}

// Distinct accent per card, assigned by position so no two cards in the
// grid ever land on the same color — independent of badge text, which
// is why CATEGORY_MAP alone wasn't enough (several badges share a category,
// or don't match any key and all fall back to "default").
const ACCENT_PALETTE: { accent: string; rgb: string }[] = [
  { accent: "#2ee6c5", rgb: "46, 230, 197" },  // mint
  { accent: "#ffb648", rgb: "255, 182, 72" },  // amber
  { accent: "#a78bfa", rgb: "167, 139, 250" }, // violet
  { accent: "#ff6ec7", rgb: "255, 110, 199" }, // pink
  { accent: "#38bdf8", rgb: "56, 189, 248" },  // sky blue
  { accent: "#34d399", rgb: "52, 211, 153" },  // emerald
  { accent: "#818cf8", rgb: "129, 140, 248" }, // indigo
  { accent: "#fb923c", rgb: "251, 146, 60" },  // orange
];

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const category = getCategory(service.badge);
  const { accent, rgb } = ACCENT_PALETTE[index % ACCENT_PALETTE.length];
  // First card gets priority (eager load + preload link); rest lazy-load.
  const isFirst = index === 0;

  const accentVars = {
    "--accent": accent,
    "--accent-rgb": rgb,
  } as CSSProperties;

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "";
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card"
      data-category={category}
      style={accentVars}
    >
      <span className="service-corner service-corner-tl" />
      <span className="service-corner service-corner-tr" />
      <span className="service-corner service-corner-bl" />
      <span className="service-corner service-corner-br" />

      <div className="service-banner">
        <div className="service-image-wrap">
          {/* next/image with fill + sizes → WebP/AVIF conversion, responsive
              srcsets, and lazy loading out of the box. The parent
              .service-image-wrap is position:absolute so fill works correctly. */}
          <Image
            src={service.image}
            alt={`${service.title} concept art`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="service-image"
            priority={isFirst}
            loading={isFirst ? "eager" : "lazy"}
            decoding="async"
            quality={75}
          />
        </div>
        <div className="service-banner-glow" />
        <div className="service-banner-fade" />
        <div className="service-scanline" />
        <span className="service-badge">{service.badge}</span>
        <span className="service-index">{service.index}</span>
      </div>

      <div className="service-body">
        <h3 className="service-title">
          {service.title}
          <span className="service-sub">{service.sub}</span>
        </h3>
        <div className="service-footer">
          <Link href={`/ventures/${service.slug}`} className="service-detail-btn">
            View Detail
          </Link>
          <div className="service-card-actions">
            <a
              href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I'm interested in *${service.title}* at BH Ventures.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-card-whatsapp-btn"
              title={`Send through WhatsApp (${BH_WHATSAPP_DISPLAY})`}
              aria-label={`Send inquiry for ${service.title} through WhatsApp to ${BH_WHATSAPP_DISPLAY}`}
            >
              <svg viewBox="0 0 24 24" className="service-card-whatsapp-icon" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.148-.672.15-.2.297-.77.967-.944 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51-.174-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.297-1.042 1.017-1.042 2.479s1.067 2.876 1.215 3.075c.149.198 2.1 3.205 5.077 4.494.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                <path d="M12.004 2a9.9 9.9 0 0 0-8.48 15.028L2 22l5.116-1.342A9.9 9.9 0 1 0 12.004 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.295-.175-3.036.796.81-2.956-.192-.304A8.08 8.08 0 1 1 12.004 19.98Z" />
              </svg>
              <span className="service-card-whatsapp-label">WhatsApp</span>
            </a>
            <Link href={`/ventures/${service.slug}`} className="service-arrow" aria-label={`View ${service.title} details`}>
              →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}