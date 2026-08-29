"use client";

import { useEffect, useRef } from "react";

interface ServiceDetailHeroProps {
    image: string;
    video?: string;
    title: string;
    sub: string;
    badge: string;
    category: string;
}

export default function ServiceDetailHero({
    image,
    video,
    title,
    sub,
    badge,
    category,
}: ServiceDetailHeroProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);

    // mouse-driven tilt, same pattern as the card hover
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        if (mediaRef.current) {
            mediaRef.current.style.transform = `perspective(1400px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.04)`;
        }
    }

    function handleMouseLeave() {
        if (mediaRef.current) mediaRef.current.style.transform = "";
    }

    // scroll-driven depth: media drifts back in Z and fades slightly as you scroll past the hero
    useEffect(() => {
        function onScroll() {
            const wrap = wrapRef.current;
            const media = mediaRef.current;
            if (!wrap || !media) return;
            const rect = wrap.getBoundingClientRect();
            const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
            media.style.setProperty("--scroll-z", `${progress * -140}px`);
            media.style.setProperty("--scroll-scale", `${1 + progress * 0.08}`);
            media.style.setProperty("--scroll-fade", `${1 - progress * 0.5}`);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            ref={wrapRef}
            className="detail-hero"
            data-category={category}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="detail-hero-stage">
                <div ref={mediaRef} className="detail-hero-media">
                    {video ? (
                        <video
                            className="detail-hero-media-el"
                            src={video}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={`${title} concept art`} className="detail-hero-media-el" />
                    )}
                </div>
            </div>

            <div className="detail-hero-fade" />

            <div className="detail-hero-content">
                <span className="service-badge detail-hero-badge">{badge}</span>
                <h1 className="detail-hero-title">{title}</h1>
                <p className="detail-hero-sub">{sub}</p>
            </div>
        </div>
    );
}