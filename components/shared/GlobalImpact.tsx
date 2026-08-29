"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 150,
    prefix: "",
    suffix: "+",
    label: "Countries Registered",
    positionClass: "left-5 sm:left-10 top-0",
  },
  {
    value: 15,
    prefix: "",
    suffix: "h",
    label: "Average Payout Processing",
    positionClass:
      "right-5 sm:right-10 top-9 sm:top-10 w-[135px] sm:w-[160px]",
  },
  {
    value: 350,
    prefix: "$",
    suffix: "K+",
    label: "Paid Out to Traders",
    positionClass: "left-5 sm:left-10 top-28 sm:top-28",
  },
  {
    value: 10,
    prefix: "",
    suffix: "K+",
    label: "Traders Worldwide",
    positionClass:
      "right-5 sm:right-10 top-[9.25rem] sm:top-[9.5rem] w-[135px] sm:w-[160px]",
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
      <span
        translate="no"
        className="notranslate text-white"
      >
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
        bg-[#111C2D]
        px-4
        py-12
        font-sans

        sm:bg-[#0B1220]

        sm:px-6
        sm:py-16

        md:px-8
        md:py-20

        lg:py-24
      "
    >
      {/* Ambient Glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[360px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#14B8A6]/[0.03]
          blur-[80px]
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
          shadow-[0_20px_55px_rgba(0,0,0,0.24)]

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

            object-contain
            object-center
            scale-[2]

            sm:scale-100
            sm:object-cover
            sm:object-center
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

        {/* Video Overlay */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#0B1220]/75
          "
        />

        {/* Center Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_38%,rgba(20,184,166,0.10),transparent_58%)]
          "
        />

        {/* Bottom Readability */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-[#0B1220]/40
            via-transparent
            to-[#0B1220]/60
          "
        />

        {/* Top Accent */}
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
          {/* Header */}

          <div
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

            {/* Main Heading */}
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
                  font-bold
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

              <span className="block font-bold">
                Across{" "}
                <span className="font-bold text-[#5EEAD4]">
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

            {/* Secondary Line */}
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

          {/* =====================================================
              STATISTICS
          ===================================================== */}

          <div
            ref={statsRef}
            className="
              relative
              mt-9
              h-[215px]
              w-full
              max-w-[390px]

              sm:mt-11
              sm:h-[235px]
              sm:max-w-[500px]

              md:max-w-[540px]
            "
          >
            {/* Subtle Center Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-16
                w-16
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#14B8A6]/[0.05]
                blur-xl
              "
            />

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={
                  statsInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 10,
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
                `}
              >
                {/* Number */}
                <div
                  className="
                    whitespace-nowrap
                    text-left
                    text-[21px]
                    font-normal
                    leading-none
                    tracking-[-0.035em]

                    sm:text-[24px]

                    transition-all
                    duration-300
                    ease-out

                    hover:z-20
                    hover:scale-[1.06]
                    hover:border-[#5EEAD4]/30
                    hover:bg-white/[0.075]
                    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_35px_rgba(0,0,0,0.22),0_0_25px_rgba(45,212,191,0.08)]

                    sm:w-[175px]
                    sm:rounded-[20px]
                    sm:px-4
                    sm:py-3.5

                    [@media(min-width:1024px)_and_(max-width:1366px)]:w-[165px]!
                  `}
                >
                  {/* Card Top Highlight */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-0
                      h-px
                      w-[65%]
                      -translate-x-1/2
                      bg-gradient-to-r
                      from-transparent
                      via-[#5EEAD4]/45
                      to-transparent
                    "
                  />

                  {/* Icon */}

                  <div
                    className="
                      relative
                      mb-2.5
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-[10px]
                      border
                      border-[#5EEAD4]/20
                      bg-[#14B8A6]/[0.09]
                      text-[#5EEAD4]
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Number */}

                  <div
                    className="
                      relative
                      whitespace-nowrap
                      text-[21px]
                      font-normal
                      leading-none
                      tracking-[-0.035em]
                      sm:text-[24px]
                      md:text-[26px]
                    "
                  >
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      active={statsVisible}
                    />
                  </div>

                  {/* Label */}

                  <p
                    className="
                      relative
                      mt-1.5
                      max-w-[125px]
                      text-[9px]
                      font-medium
                      leading-4
                      text-white/55
                      sm:max-w-[160px]
                      sm:text-[10px]
                      sm:leading-5
                    "
                  >
                    {stat.label}
                  </p>
                </div>

                {/* Label */}
                <p
                  className="
                    mt-1.5
                    max-w-[135px]
                    text-left
                    text-[9px]
                    font-medium
                    leading-4
                    text-white/55

                    sm:max-w-[160px]
                    sm:text-[10px]
                    sm:leading-5
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Accent */}

          <div
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