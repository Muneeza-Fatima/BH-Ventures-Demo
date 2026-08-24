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
        poster="/images/hero-poster.jpg"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          opacity-85
        "
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light overlay taake video zinda aur clear lage */}
      <div className="absolute inset-0 bg-[#0B1220]/20" />

      {/* Subtle Desktop Gradient */}
      <div className="absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-[#0B1220]/50 to-transparent lg:block" />

      {/* Subtle Mobile Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/30 to-[#0B1220]/20 lg:hidden" />
    </div>
  );
}