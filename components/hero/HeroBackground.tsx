export default function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* DESKTOP
          Left side = light but video still visible
          Right side = fully visible
      */}
      <div
        className="
          absolute
          inset-0
          hidden
          lg:block
          bg-gradient-to-r
          from-white/85
          from-0%
          via-white/65
          via-38%
          via-white/25
          via-55%
          to-transparent
          to-72%
        "
      />

      {/* MOBILE
          Top = light but video visible
          Bottom = fully visible
      */}
      <div
        className="
          absolute
          inset-0
          block
          bg-gradient-to-b
          from-white/82
          from-0%
          via-white/60
          via-35%
          via-white/25
          via-55%
          to-transparent
          to-75%
          lg:hidden
        "
      />

      {/* Very subtle brand atmosphere */}
      <div
        className="
          absolute
          -right-40
          top-10
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#14B8A6]/[0.04]
          blur-3xl
        "
      />
    </div>
  );
}