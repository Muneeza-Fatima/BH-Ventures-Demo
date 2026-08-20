"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 150,
    prefix: "",
    suffix: "+",
    label: "Countries Registered",
    positionClass: "left-2 sm:left-6 top-0",
  },
  {
    value: 15,
    prefix: "",
    suffix: "h",
    label: "Average Payout Processing",
    positionClass: "right-2 sm:right-6 top-10 sm:top-14",
  },
  {
    value: 350,
    prefix: "$",
    suffix: "K+",
    label: "Paid Out to Traders",
    positionClass: "left-2 sm:left-6 top-28 sm:top-32",
  },
  {
    value: 10,
    prefix: "",
    suffix: "K+",
    label: "Traders Worldwide",
    positionClass: "right-6 sm:right-12 top-40 sm:top-46",
  },
];

function CountUp({
  value,
  prefix,
  suffix,
  active,
}: {
  value: number;
  prefix: string;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;

    started.current = true;

    let frame = 0;
    const duration = 1800;
    const start = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setCount(value);
      }
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [active, value]);

  return (
    <>
      <span className="text-white">
        {prefix}
        {count}
      </span>

      <span
        className="
          bg-gradient-to-r
          from-[#2DD4BF]
          to-[#10B981]
          bg-clip-text
          text-transparent
          [-webkit-background-clip:text]
        "
      >
        {suffix}
      </span>
    </>
  );
}

export default function GlobalImpact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.25,
  });

  /*
   * Video playback
   *
   * Important:
   * No pause/play loop.
   * No currentTime manipulation.
   * No visibility listener fighting with normal playback.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      startVideo();
    } else {
      video.addEventListener("canplay", startVideo, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("canplay", startVideo);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#0B1220]
        px-4
        py-12
        font-sans

        sm:px-6
        sm:py-16

        md:px-8
        md:py-20

        lg:py-24
      "
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#14B8A6]/[0.035]
          blur-[100px]
        "
      />

      {/* Main Card */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-5xl
          overflow-hidden
          rounded-[24px]

          border
          border-white/[0.10]

          bg-[#0F1B2D]

          shadow-[0_25px_70px_rgba(0,0,0,0.28)]

          sm:rounded-[30px]
        "
      >
        {/* Background Video */}

        <video
          ref={videoRef}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source
            src="/videos/global-impact.mp4"
            type="video/mp4"
          />
        </video>

        {/* Lightweight overlay */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#0B1220]/75
          "
        />

        {/* Center glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_38%,rgba(20,184,166,0.12),transparent_58%)]
          "
        />

        {/* Bottom readability */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-[#0B1220]/45
            via-transparent
            to-[#0B1220]/65
          "
        />

        {/* Top accent */}
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
            via-[#2DD4BF]/60
            to-transparent
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            items-center

            px-5
            py-12

            sm:px-10
            sm:py-16

            md:px-14
            md:py-20

            lg:px-20
            lg:py-22
          "
        >
          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={
              sectionInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              max-w-[650px]
              text-center
            "
          >
            {/* Eyebrow */}
            <div
              className="
                mb-4
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-7
                  bg-[#14B8A6]/60
                  sm:w-9
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#5EEAD4]

                  sm:text-[10px]
                  md:text-xs
                "
              >
                Global Trading Community
              </span>

              <span
                className="
                  h-px
                  w-7
                  bg-[#14B8A6]/60
                  sm:w-9
                "
              />
            </div>

            {/* Heading */}
            <h2
              className="
                font-bold
                leading-[1.08]
                tracking-[-0.04em]
                text-white

                text-[28px]

                sm:text-[34px]

                md:text-[40px]

                lg:text-[44px]
              "
            >
              <span className="block">
                Global Reach.
              </span>

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#2DD4BF]
                  via-[#5EEAD4]
                  to-[#10B981]
                  bg-clip-text
                  text-transparent
                  [-webkit-background-clip:text]
                "
              >
                Real Opportunities.
              </span>

              <span className="block">
                Trusted by Traders
              </span>

              <span className="block">
                Across{" "}
                <span className="text-[#5EEAD4]">
                  150+ Countries.
                </span>
              </span>
            </h2>

            {/* Accent */}
            <div
              className="
                mx-auto
                mt-5
                h-px
                w-10
                bg-gradient-to-r
                from-transparent
                via-[#2DD4BF]
                to-transparent
              "
            />

            {/* Description */}
            <p
              className="
                mx-auto
                mt-5
                max-w-[590px]
                text-[12px]
                font-light
                leading-6
                text-white/65

                sm:text-sm
                sm:leading-7
              "
            >
              Our trading programs connect traders worldwide
              with structured opportunities, training accounts,
              and commission-based earning potential—without
              requiring them to risk their own trading capital.
            </p>

            {/* Secondary line */}
            <p
              className="
                mx-auto
                mt-2
                max-w-[560px]
                text-[11px]
                font-medium
                leading-5
                text-[#99F6E4]/75

                sm:text-xs
                sm:leading-6
              "
            >
              Built to create accessible opportunities and
              sustainable growth for traders worldwide.
            </p>
          </motion.div>

          {/* Statistics */}
          <div
            ref={statsRef}
            className="
              relative
              mt-9
              h-[225px]
              w-full
              max-w-[390px]

              sm:mt-11
              sm:h-[255px]
              sm:max-w-[500px]

              md:max-w-[540px]
            "
          >
            {/* Very subtle center glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-20
                w-20
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#14B8A6]/[0.07]
                blur-2xl
              "
            />

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={
                  statsInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                transition={{
                  duration: 0.45,
                  delay: 0.08 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  absolute
                  ${stat.positionClass}
                  max-w-[145px]

                  sm:max-w-[170px]
                `}
              >
                {/* Stat card */}
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-xl

                    border
                    border-white/[0.10]

                    bg-white/[0.045]

                    px-3
                    py-2

                    shadow-[0_8px_25px_rgba(0,0,0,0.16)]

                    backdrop-blur-[4px]

                    transition-colors
                    duration-200

                    hover:border-[#2DD4BF]/25
                    hover:bg-white/[0.06]
                  "
                >
                  {/* Top highlight */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      right-3
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#2DD4BF]/45
                      to-transparent
                    "
                  />

                  {/* Number */}
                  <div
                    className="
                      relative
                      text-[19px]
                      font-semibold
                      leading-none
                      tracking-[-0.03em]

                      sm:text-[22px]

                      md:text-[24px]
                    "
                  >
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      active={statsInView}
                    />
                  </div>
                </div>

                {/* Label */}
                <p
                  className="
                    mt-1.5
                    max-w-[145px]
                    text-[9px]
                    font-medium
                    leading-4
                    text-white/50

                    sm:max-w-[165px]
                    sm:text-[10px]
                    sm:leading-5
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0.6,
            }}
            animate={
              statsInView
                ? {
                    opacity: 1,
                    scaleX: 1,
                  }
                : {
                    opacity: 0,
                    scaleX: 0.6,
                  }
            }
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="
              mt-0
              h-px
              w-16
              bg-gradient-to-r
              from-transparent
              via-[#2DD4BF]/70
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}