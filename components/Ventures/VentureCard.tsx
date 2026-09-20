"use client";

import { useRef, MouseEvent, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/types";

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

// Constant brand accent matching the BH Ventures logo (#2ee6c5 / teal-mint)
const BRAND_ACCENT = {
  accent: "#2ee6c5",
  rgb: "46, 230, 197",
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const category = getCategory(service.badge);
  // First card gets priority (eager load + preload link); rest lazy-load.
  const isFirst = index === 0;

  const accentVars = {
    "--accent": BRAND_ACCENT.accent,
    "--accent-rgb": BRAND_ACCENT.rgb,
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
          <Link href={`/ventures/${service.slug}`} className="service-arrow" aria-label={`View ${service.title} details`}>
            →
          </Link>
        </div>
      </div>
    </article>
  );
}