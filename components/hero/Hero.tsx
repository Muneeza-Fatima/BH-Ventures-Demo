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

            px-5
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
              w-full
              min-w-0
              max-w-[680px]

              [@media(min-width:1024px)_and_(max-width:1366px)]:max-w-[650px]!
              [@media(min-width:1024px)_and_(max-width:1366px)]:pt-0!
            "
          >
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