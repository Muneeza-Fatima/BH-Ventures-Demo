"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import WhereWeOperate from "./WhereWeOperate";

export default function Hero() {
  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}
      <section
        className="
          relative
          isolate
          w-full
          min-w-0
          overflow-hidden
          bg-[#0B1220]

          min-h-[auto]

          lg:min-h-[100svh]

          [@media(min-width:1024px)_and_(max-width:1366px)]:min-h-0!
          [@media(min-width:1024px)_and_(max-width:1366px)]:overflow-visible!
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
            min-w-0
            max-w-[1440px]
            items-start

            px-3
            pt-[82px]
            pb-[72px]

            sm:px-7
            sm:pt-[88px]
            sm:pb-[82px]

            md:px-10
            md:pt-[94px]
            md:pb-[92px]

            lg:min-h-[100svh]
            lg:items-center
            lg:px-12
            lg:pt-20
            lg:pb-24

            xl:px-16

            2xl:max-w-[1600px]
            2xl:px-20

            [@media(min-width:1024px)_and_(max-width:1366px)]:min-h-0!
            [@media(min-width:1024px)_and_(max-width:1366px)]:items-start!
            [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
            [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[108px]!
            [@media(min-width:1024px)_and_(max-width:1366px)]:pb-[54px]!
          "
        >
          <div
            className="
              home-hero-content
              relative
              w-full
              min-w-0
              max-w-[680px]

              max-md:overflow-hidden
              max-md:rounded-[28px]
              max-md:border
              max-md:border-[#2DD4BF]/25
              max-md:bg-[#0B1220]/45
              max-md:px-4
              max-md:py-7
              max-md:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              max-md:backdrop-blur-[6px]

              [@media(min-width:1024px)_and_(max-width:1366px)]:max-w-[650px]!
              [@media(min-width:1024px)_and_(max-width:1366px)]:pt-0!
            "
          >
            {/* Mobile: teal light sweeping across the card's top edge */}
            <span
              aria-hidden="true"
              className="
                home-hero-sweep
                pointer-events-none
                absolute
                left-0
                top-0
                h-px
                w-1/3
                bg-gradient-to-r
                from-transparent
                via-[#5EEAD4]
                to-transparent
                md:hidden
              "
            />

            <HeroContent />
          </div>
        </div>
      </section>

      {/* =====================================================
          WHERE WE OPERATE
          ===================================================== */}
      <WhereWeOperate />
    </>
  );
}