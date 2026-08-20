"use client";

export default function HeroContent() {
  return (
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

      {/* Subheading: Responsive text sizing to prevent wrapping on small mobile screens */}
      <p className="text-[11.5px] xs:text-[13px] sm:text-lg lg:text-xl text-gray-200 mb-6 font-medium tracking-wide whitespace-nowrap overflow-x-auto scrollbar-none py-1">
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
  );
}