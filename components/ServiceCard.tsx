"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import type { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
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
};

function getCategory(badge: string | undefined) {
  if (!badge) return "default";
  const key = badge.toLowerCase();
  const match = Object.keys(CATEGORY_MAP).find((k) => key.includes(k));
  return match ? CATEGORY_MAP[match] : "default";
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const category = getCategory(service.badge);

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
    >
      <span className="service-corner service-corner-tl" />
      <span className="service-corner service-corner-tr" />
      <span className="service-corner service-corner-bl" />
      <span className="service-corner service-corner-br" />

      <div className="service-banner">
        <div className="service-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={service.image} alt={`${service.title} concept art`} className="service-image" />
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