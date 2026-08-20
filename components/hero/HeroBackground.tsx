"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startVideo = () => {
      video.play().catch(() => {
        // Autoplay may be blocked by the browser.
      });
    };

    if (video.readyState >= 2) {
      startVideo();
    } else {
      video.addEventListener("canplay", startVideo, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("canplay", startVideo);
    };
  }, []);

  return (
    <div
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
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Simple readability overlay */}
      <div
        className="
          absolute
          inset-0
          bg-[#0B1220]/35
        "
      />

      {/* Stronger left readability on desktop */}
      <div
        className="
          absolute
          inset-y-0
          left-0
          hidden
          w-[65%]
          bg-gradient-to-r
          from-[#0B1220]/65
          to-transparent
          lg:block
        "
      />

      {/* Mobile readability */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-[#0B1220]/45
          to-[#0B1220]/20
          lg:hidden
        "
      />
    </div>
  );
}