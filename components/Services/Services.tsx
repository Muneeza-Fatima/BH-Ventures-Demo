"use client";

import { useEffect, useRef } from "react";
import ServiceCard from "@/components/Services/ServiceCard";
import { SERVICES } from "@/data/services";
import "./services.css";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".service-reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      // rootMargin keeps cards invisible until they are genuinely close
      // to the viewport, so the browser doesn’t trigger all CSS transitions
      // at once while the section is still far below the fold.
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="services-grid-bg" />
      <div className="services-glow-bg" />

      <div className="services-inner">
        <div className="service-reveal services-header">
          <span className="services-eyebrow">
            <span className="services-eyebrow-line" />
            Explore the lineup
            <span className="services-eyebrow-line services-eyebrow-line--reverse" />
          </span>
          <h2 className="services-title">
            Pick your discipline.
            <br />
            <em className="services-title-gradient">We&apos;ll take it from there.</em>
          </h2>
          <p className="services-subtitle">
            <span className="subtitle-word" data-category="trade">Trade.</span>{" "}
            <span className="subtitle-word" data-category="web3">Web3.</span>{" "}
            <span className="subtitle-word" data-category="ai">AI.</span>{" "}
            <span className="subtitle-word" data-category="marketing">Marketing.</span>{" "}
            <span className="subtitle-rest">
              Nine services, one address for all of them — each engineered to the
              same exacting standard.
            </span>
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <div
              key={service.key}
              className="service-reveal"
              // Cap the stagger at 300 ms so the last card (index 9)
              // doesn’t wait 405 ms before starting its reveal.
              style={{ "--reveal-delay": `${Math.min(i * 40, 300)}ms` } as React.CSSProperties}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}