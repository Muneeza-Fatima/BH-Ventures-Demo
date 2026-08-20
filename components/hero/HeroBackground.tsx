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
        "
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Main readability overlay */}
      <div className="absolute inset-0 bg-[#0B1220]/35" />

      {/* Desktop text readability */}
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