"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ServiceDetailHeroProps {
    image: string;
    video?: string;
    videoMobile?: string; // optional: smaller/compressed file for narrow viewports
    title: string;
    sub: string;
    badge: string;
    category: string;
    slug?: string;
}

export default function ServiceDetailHero({
    image,
    video,
    videoMobile,
    title,
    sub,
    badge,
    category,
    slug,
}: ServiceDetailHeroProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [activeSrc, setActiveSrc] = useState(video);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const prevSrcRef = useRef(activeSrc);

    // Pick a smaller source for mobile if one was provided
    useEffect(() => {
        if (!video) return;
        const mq = window.matchMedia("(max-width: 640px)");
        const pick = () => setActiveSrc(mq.matches && videoMobile ? videoMobile : video);
        pick();
        mq.addEventListener("change", pick);
        return () => mq.removeEventListener("change", pick);
    }, [video, videoMobile]);

    // Only call load() when the active source actually changes (avoids initial mount reload lag)
    useEffect(() => {
        if (!videoRef.current) return;
        if (prevSrcRef.current !== activeSrc) {
            prevSrcRef.current = activeSrc;
            setIsVideoReady(false);
            videoRef.current.load();
        }
        videoRef.current.play().catch(() => { });
    }, [activeSrc]);

    // Gentle responsive 3D perspective tilt only on fine-pointer desktop devices
    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (typeof window !== "undefined" && window.innerWidth <= 1024) return;
        const wrap = wrapRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        if (mediaRef.current) {
            mediaRef.current.style.transform = `perspective(1400px) rotateY(${px * 3.5}deg) rotateX(${-py * 3.5}deg) scale(1.015)`;
        }
    }

    function handleMouseLeave() {
        if (mediaRef.current) mediaRef.current.style.transform = "";
    }

    // Scroll-driven depth: subtle drift back in Z as user scrolls down
    useEffect(() => {
        function onScroll() {
            const wrap = wrapRef.current;
            const media = mediaRef.current;
            if (!wrap || !media) return;
            const rect = wrap.getBoundingClientRect();
            const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
            media.style.setProperty("--scroll-z", `${progress * -100}px`);
            media.style.setProperty("--scroll-scale", `${1 + progress * 0.05}`);
            media.style.setProperty("--scroll-fade", `${1 - progress * 0.45}`);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            ref={wrapRef}
            className={`detail-hero${video ? " detail-hero--has-video" : ""}`}
            data-category={category}
            data-slug={slug}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="detail-hero-stage">
                <div
                    ref={mediaRef}
                    className={`detail-hero-media${video ? " detail-hero-media--video" : ""}`}
                >
                    {/* Instant high-res poster image loads in parallel via link preload */}
                    <Image
                        src={image}
                        alt={`${title} concept art`}
                        fill
                        priority
                        fetchPriority="high"
                        sizes="100vw"
                        quality={85}
                        className={`detail-hero-media-el detail-hero-media-el--poster${isVideoReady ? " detail-hero-media-el--poster-dim" : ""}`}
                        style={{ objectFit: "cover" }}
                    />

                    {video && (
                        <video
                            ref={videoRef}
                            src={activeSrc}
                            className={`detail-hero-media-el detail-hero-media-el--video${isVideoReady ? " detail-hero-media-el--ready" : ""}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            disablePictureInPicture
                            onCanPlay={() => setIsVideoReady(true)}
                            onPlaying={() => setIsVideoReady(true)}
                            aria-hidden="true"
                        >
                            <source src={activeSrc} type="video/mp4" />
                        </video>
                    )}
                </div>
            </div>

            <div className="detail-hero-fade" />

            <div className="detail-hero-content">
                <span className="detail-hero-badge">{badge}</span>
                <h1 className="detail-hero-title">{title}</h1>
                <p className="detail-hero-sub">{sub}</p>
            </div>
        </div>
    );
}