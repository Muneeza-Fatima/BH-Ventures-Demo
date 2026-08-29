"use client";

export default function HeroBackground() {
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
      <video
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
          transition-opacity
          duration-500
          ease-out
          ${
            videoLoaded
              ? "opacity-[0.92]"
              : "opacity-0"
          }
        `}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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