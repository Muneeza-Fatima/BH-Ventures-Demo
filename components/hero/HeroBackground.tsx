"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On mobile (< 768px), defer video load until page is interactive
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile) {
      // Desktop: load immediately
      setShouldLoad(true);
      return;
    }

    // Mobile: use IntersectionObserver — start loading only when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
        bg-[#0B1220]
      "
      aria-hidden="true"
    >
      {shouldLoad && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoLoaded(true)}
          className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-opacity
            duration-700
            ease-out
            ${videoLoaded ? "opacity-95" : "opacity-0"}
          `}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Light overlay taake video zinda aur clear lage */}
      <div className="absolute inset-0 bg-[#0B1220]/20" />

      <div
        className="
          absolute
          inset-0
          bg-[#0B1220]/8
        "
      />

      {/* ================================================== */}
      {/* DESKTOP READABILITY */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          hidden
          w-[64%]
          bg-gradient-to-r
          from-[#0B1220]/60
          via-[#0B1220]/18
          to-transparent
          lg:block
        "
      />

      {/* ================================================== */}
      {/* TABLET READABILITY */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          hidden
          w-[72%]
          bg-gradient-to-r
          from-[#0B1220]/55
          via-[#0B1220]/16
          to-transparent
          md:block
          lg:hidden
        "
      />

      {/* ================================================== */}
      {/* MOBILE READABILITY */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#0B1220]/50
          via-[#0B1220]/10
          to-[#0B1220]/42
          md:hidden
        "
      />

      {/* ================================================== */}
      {/* LIGHTER BOTTOM FADE */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-32
          bg-gradient-to-t
          from-[#0B1220]/45
          via-[#0B1220]/18
          to-transparent
        "
      />
    </div>
  );
}