"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <HeroBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1440px]
          items-start

          px-5
          pb-5
          pt-[104px]

          sm:px-8
          sm:pb-6
          sm:pt-[108px]

          md:px-10
          md:pb-8
          md:pt-[112px]

          lg:items-center
          lg:px-12
          lg:pb-0
          lg:pt-[112px]

          xl:px-16

          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="
            w-full
            md:max-w-[600px]
            lg:max-w-[620px]
            xl:max-w-[610px]
          "
        >
          <HeroContent />
        </motion.div>
      </div>
    </section>
  );
}