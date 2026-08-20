"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
      {/* Explore Our Ventures */}
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/ventures"
          className="
            group
            relative
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            gap-2.5
            overflow-hidden
            rounded-full

            border
            border-[#2DD4BF]/55
            bg-[#0F1B2D]

            px-7
            py-3

            text-[13px]
            font-semibold
            tracking-[0.01em]
            text-white

            shadow-[0_8px_30px_rgba(0,0,0,0.22),0_0_18px_rgba(20,184,166,0.12)]
            transition-all
            duration-300
            ease-out

            hover:border-[#5EEAD4]/80
            hover:bg-[#122536]
            hover:shadow-[0_10px_35px_rgba(0,0,0,0.28),0_0_28px_rgba(20,184,166,0.22)]

            sm:min-w-[190px]
            sm:w-auto
          "
        >
          {/* Inner border */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[1px]
              rounded-full
              border
              border-white/[0.045]
            "
          />

          {/* Soft glow */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-8
              top-1/2
              h-16
              w-16
              -translate-y-1/2
              rounded-full
              bg-[#2DD4BF]/10
              blur-2xl
              transition-all
              duration-500
              group-hover:bg-[#2DD4BF]/20
            "
          />

          {/* Shine */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-[-60%]
              left-[-70%]
              w-[28%]
              rotate-[20deg]
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              opacity-0
              blur-[2px]
              transition-all
              duration-700
              group-hover:left-[125%]
              group-hover:opacity-100
            "
          />

          <span className="relative z-10 whitespace-nowrap">
            Explore Our Ventures
          </span>

          <ArrowRight
            className="
              relative
              z-10
              h-[15px]
              w-[15px]
              text-[#5EEAD4]
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-[#99F6E4]
            "
          />
        </Link>
      </motion.div>

      {/* Discover Solutions */}
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/contact"
          className="
            group
            relative
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            gap-2.5
            overflow-hidden
            rounded-full

            border
            border-[#14B8A6]/80
            bg-gradient-to-r
            from-[#14B8A6]
            to-[#10B981]

            px-7
            py-3

            text-[13px]
            font-bold
            tracking-[0.01em]
            text-[#06151A]

            shadow-[0_8px_28px_rgba(20,184,166,0.24),0_0_22px_rgba(20,184,166,0.12)]
            transition-all
            duration-300
            ease-out

            hover:border-[#5EEAD4]
            hover:from-[#2DD4BF]
            hover:to-[#14B8A6]
            hover:shadow-[0_10px_35px_rgba(20,184,166,0.35),0_0_40px_rgba(20,184,166,0.18)]

            sm:min-w-[190px]
            sm:w-auto
          "
        >
          {/* Inner highlight */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[1px]
              rounded-full
              border
              border-white/20
            "
          />

          {/* Soft inner glow */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              bg-white/10
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />

          {/* Shine sweep */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-[-70%]
              left-[-65%]
              w-[30%]
              rotate-[20deg]
              bg-gradient-to-r
              from-transparent
              via-white/60
              to-transparent
              opacity-0
              blur-[2px]
              transition-all
              duration-700
              group-hover:left-[125%]
              group-hover:opacity-100
            "
          />

          <span className="relative z-10 whitespace-nowrap">
            Discover Solutions
          </span>

          <ArrowRight
            className="
              relative
              z-10
              h-[15px]
              w-[15px]
              text-[#06151A]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </motion.div>
    </div>
  );
}