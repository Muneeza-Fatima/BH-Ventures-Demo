"use client";

import { motion } from "framer-motion";
import { Eye, Compass } from "lucide-react";

export default function AboutMissionVision() {
  return (
    <section
      id="about-mission-vision"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]
        py-14
        sm:py-18
        md:py-20
        lg:py-24
        xl:py-28

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-16!
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-0
          h-[300px]
          w-[560px]
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-[#00FFD5]/[0.03]
          blur-[110px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          px-5
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.10]
            bg-[#0F1B2D]
            shadow-[0_20px_55px_rgba(0,0,0,0.28)]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-px
              w-[55%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#2DD4BF]/50
              to-transparent
            "
          />

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
            "
          >
            {/* =================================================
                VISION
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="
                relative
                p-8
                sm:p-10
                md:p-12
                lg:p-14
              "
            >
              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#2DD4BF]/30
                  bg-[#064E49]/50
                  text-[#5EEAD4]
                "
              >
                <Eye size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <p
                className="
                  pt-6
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.28em]
                  text-[#00FFD5]
                "
              >
                Vision
              </p>

              <h3
                className="
                  pt-4
                  max-w-[440px]
                  text-[26px]
                  font-extrabold
                  leading-[1.15]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[30px]
                "
              >
                To become a trusted multi-sector ventures company.
              </h3>

              <p
                className="
                  pt-5
                  max-w-[440px]
                  text-[14px]
                  font-medium
                  leading-7
                  text-white/60
                  sm:text-[15px]
                "
              >
                One that bridges traditional trade with cutting-edge
                technology and creates value through innovation and
                execution.
              </p>
            </motion.div>

            {/* Divider */}

            <div
              aria-hidden="true"
              className="
                hidden
                lg:block
                lg:absolute
                lg:inset-y-10
                lg:left-1/2
                lg:w-px
                lg:-translate-x-1/2
                lg:bg-gradient-to-b
                lg:from-transparent
                lg:via-white/[0.12]
                lg:to-transparent
              "
            />

            <div
              aria-hidden="true"
              className="
                mx-8
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/[0.12]
                to-transparent
                sm:mx-10
                md:mx-12
                lg:hidden
              "
            />

            {/* =================================================
                MISSION
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                p-8
                sm:p-10
                md:p-12
                lg:p-14
              "
            >
              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#2DD4BF]/30
                  bg-[#064E49]/50
                  text-[#5EEAD4]
                "
              >
                <Compass size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <p
                className="
                  pt-6
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.28em]
                  text-[#00FFD5]
                "
              >
                Mission
              </p>

              <h3
                className="
                  pt-4
                  max-w-[440px]
                  text-[26px]
                  font-extrabold
                  leading-[1.15]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[30px]
                "
              >
                Identify opportunity. Build capability. Create value.
              </h3>

              <p
                className="
                  pt-5
                  max-w-[460px]
                  text-[14px]
                  font-medium
                  leading-7
                  text-white/60
                  sm:text-[15px]
                "
              >
                We identify high-potential opportunities in technology and
                trade, build professional capabilities, and create lasting
                value for clients, partners, and stakeholders through
                integrity, innovation, and execution excellence.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
