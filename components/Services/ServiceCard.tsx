"use client";

import { useRef, MouseEvent, CSSProperties } from "react";
import Link from "next/link";
import type { Service } from "@/lib/types";

import "./service-detail.css";

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={`${service.title} concept art`}
            className="service-image"
            loading="lazy"
            decoding="async"
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
          <Link href={`/services/${service.slug}`} className="service-detail-btn">
            View Detail
          </Link>
          <Link href={`/services/${service.slug}`} className="service-arrow" aria-label={`View ${service.title} details`}>
            →
          </Link>
        </div>
      </div>
    </article>
  );
}