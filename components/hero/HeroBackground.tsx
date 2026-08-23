"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let mounted = true;

    const playVideo = async () => {
      try {
        await video.play();

        if (mounted) {
          setVideoLoaded(true);
        }
      } catch {
        // Browser may temporarily block autoplay.
        // Fallback background remains visible.
      }
    };

    const handleLoadedData = () => {
      if (mounted) {
        setVideoLoaded(true);
      }

      playVideo();
    };

    const handleCanPlay = () => {
      playVideo();
    };

    const handleError = () => {
      if (mounted) {
        setVideoLoaded(false);
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    playVideo();

    return () => {
      mounted = false;

      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
        bg-[#0B1220]
      "
    >
      {/* ================================================== */}
      {/* BASE FALLBACK */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[#0B1220]
        "
      />

      {/* ================================================== */}
      {/* AMBIENT FALLBACK GLOW */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_72%_32%,rgba(0,205,181,0.10),transparent_34%),radial-gradient(circle_at_18%_68%,rgba(90,100,255,0.08),transparent_38%)]
        "
      />

      {/* ================================================== */}
      {/* HERO VIDEO */}
      {/* ================================================== */}

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          transition-opacity
          duration-500
          ease-out
          ${
            videoLoaded
              ? "opacity-[0.88]"
              : "opacity-0"
          }
        `}
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* ================================================== */}
      {/* GLOBAL CONTRAST */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[#0B1220]/12
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
          from-[#0B1220]/68
          via-[#0B1220]/24
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
          from-[#0B1220]/62
          via-[#0B1220]/20
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
          from-[#0B1220]/58
          via-[#0B1220]/16
          to-[#0B1220]/62
          md:hidden
        "
      />

      {/* ================================================== */}
      {/* BOTTOM FADE */}
      {/* ================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[#101C30]/90
          via-[#0B1220]/45
          to-transparent
        "
      />
    </div>
  );
}