"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#0B1220]
        min-h-0
        md:min-h-[100svh]
      "
    >
      <HeroBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          items-start
          min-h-0

          px-5
          pt-[82px]
          pb-[104px]

          sm:px-7
          sm:pt-[88px]
          sm:pb-[112px]

          md:min-h-[100svh]
          md:px-10
          md:pt-[94px]
          md:pb-[120px]

          lg:items-center
          lg:px-12
          lg:pt-20
          lg:pb-[128px]

          xl:px-16

          2xl:max-w-[1600px]
          2xl:px-20

          /* iPad Air + iPad Pro */
          [@media(min-width:1024px)_and_(max-width:1366px)]:items-start
          [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[108px]
          [@media(min-width:1024px)_and_(max-width:1366px)]:pb-[88px]
        "
      >
        <div
          className="
            w-full
            max-w-[680px]

            [@media(min-width:1024px)_and_(max-width:1366px)]:pt-2
          "
        >
          <HeroContent />
        </div>
      </div>
    </section>
  );
}