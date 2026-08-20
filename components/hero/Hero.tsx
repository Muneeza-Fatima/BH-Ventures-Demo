"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent"; // Agar aap alag file use kar rahe hain, warna content yahan bhi rakh sakte hain

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
      {/* Background video */}
      <HeroBackground />

      {/* Hero content wrapper */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          min-h-0
          items-start

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

          [@media(min-width:1024px)_and_(max-width:1366px)]:items-start
          [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[108px]
          [@media(min-width:1024px)_and_(max-width:1366px)]:pb-[88px]
        "
      >
        <div
          className="
            w-full
            max-w-[720px]
            [@media(min-width:1024px)_and_(max-width:1366px)]:pt-2
          "
        >
          {/* Direct Content or <HeroContent /> */}
          <div className="flex flex-col text-left">
            {/* Location Tag */}
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="h-[2px] w-8 bg-cyan-400"></span>
              <span className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                DUBAI • UAE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
              Building the <br className="hidden sm:block" />
              Future of Ventures.
            </h1>

            {/* Subheading: Fixed single line with responsive size and nowrap */}
            <p className="text-[13px] sm:text-lg lg:text-xl text-gray-200 mb-6 font-medium tracking-wide whitespace-nowrap overflow-x-auto scrollbar-none py-1">
              <span className="text-cyan-400">Bridging</span> Technology & Innovation from the UAE.
            </p>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mb-8 leading-relaxed">
              <strong className="text-cyan-400 font-semibold">BH Ventures FZE LLC</strong> is a licensed free-zone company specializing in Web3 Studio, Artificial Intelligence, Digital Analytics, Marketing, and International Trading. Driving global growth through innovation and strategic ventures.
            </p>

            {/* Scroll Indicator */}
            <div className="flex items-center space-x-2 text-gray-400 text-xs tracking-widest uppercase">
              <span>Scroll to explore</span>
              <svg className="w-4 h-4 animate-bounce text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}