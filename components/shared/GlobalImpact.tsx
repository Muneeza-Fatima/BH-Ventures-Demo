"use client";

import { useEffect, useRef, useState } from "react";
import {
  Globe2,
  Clock3,
  WalletCards,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    value: 150,
    prefix: "",
    suffix: "+",
    label: "Countries Registered",
    positionClass: "left-1 sm:left-10 top-0",
    icon: Globe2,
  },
  {
    value: 15,
    prefix: "",
    suffix: "h",
    label: "Average Payout Processing",
    positionClass: "right-1 sm:right-10 top-10 sm:top-11",
    icon: Clock3,
  },
  {
    value: 350,
    prefix: "$",
    suffix: "K+",
    label: "Paid Out to Traders",
    positionClass: "left-1 sm:left-10 top-36 sm:top-36",
    icon: WalletCards,
  },
  {
    value: 10,
    prefix: "",
    suffix: "K+",
    label: "Traders Worldwide",
    positionClass:
      "right-1 sm:right-12 top-[12rem] sm:top-[12.25rem]",
    icon: UsersRound,
  },
];

/* ========================================
   COUNT UP
======================================== */

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
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;

    startedRef.current = true;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches;

    const duration = isMobile ? 850 : 1350;

    let frameId = 0;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth ease-out
      const eased =
        1 - Math.pow(1 - progress, 3);

      const nextValue = Math.round(eased * value);

      setCount(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
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
        translate="no"
        className="
          notranslate
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

/* ========================================
   GLOBAL IMPACT
======================================== */

export default function GlobalImpact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [sectionVisible, setSectionVisible] =
    useState(false);

  const [statsVisible, setStatsVisible] =
    useState(false);

  /* ========================================
     LIGHTWEIGHT SECTION OBSERVER
  ======================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "80px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ========================================
     STATS OBSERVER
  ======================================== */

  useEffect(() => {
    const statsElement = statsRef.current;

    if (!statsElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "60px 0px",
      }
    );

    observer.observe(statsElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ========================================
     LIGHTWEIGHT VIDEO
  ======================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener(
        "canplay",
        playVideo,
        { once: true }
      );
    }

    return () => {
      video.removeEventListener(
        "canplay",
        playVideo
      );
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
      {/* ========================================
          AMBIENT GLOW
      ======================================== */}

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

      {/* ========================================
          MAIN CARD
      ======================================== */}

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
        {/* ========================================
            BACKGROUND VIDEO
        ======================================== */}

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

        {/* ========================================
            OVERLAY
        ======================================== */}

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

        {/* ========================================
            CONTENT
        ======================================== */}

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
          {/* ========================================
              HEADING
          ======================================== */}

          <div
            className={`
              mx-auto
              max-w-[650px]
              text-center
              transition-opacity
              duration-500
              ${
                sectionVisible
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
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
                font-semibold
                leading-[1.08]
                tracking-[-0.04em]
                text-white

                text-[28px]

                sm:text-[34px]

                md:text-[40px]

                lg:text-[44px]
              "
            >
              <span className="block font-semibold">
                Global Reach.
              </span>

              <span
                className="
                  block
                  font-semibold
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

              <span className="block font-semibold">
                Trusted by Traders
              </span>

              <span className="block font-semibold">
                Across{" "}
                <span
                  translate="no"
                  className="
                    notranslate
                    font-semibold
                    text-[#5EEAD4]
                  "
                >
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
              Our trading programs connect traders
              worldwide with structured opportunities,
              training accounts, and commission-based
              earning potential—without requiring them
              to risk their own trading capital.
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
              Built to create accessible opportunities
              and sustainable growth for traders
              worldwide.
            </p>
          </div>

          {/* ========================================
              STATISTICS
          ======================================== */}

          <div
            ref={statsRef}
            className="
              relative
              mt-9
              h-[275px]
              w-full
              max-w-[390px]

              sm:mt-11
              sm:h-[295px]
              sm:max-w-[500px]

              md:max-w-[540px]
            "
          >
            {/* Center Glow */}

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

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`
                    group
                    absolute
                    ${stat.positionClass}

                    w-[138px]
                    overflow-hidden
                    rounded-[17px]
                    border
                    border-white/[0.12]
                    bg-white/[0.055]
                    px-3
                    py-3
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.16)]
                    backdrop-blur-xl

                    transition-[opacity,transform,border-color,background-color,box-shadow]
                    duration-500
                    ease-out

                    ${
                      statsVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }

                    sm:w-[175px]
                    sm:rounded-[20px]
                    sm:px-4
                    sm:py-3.5
                  `}
                  style={{
                    transitionDelay: statsVisible
                      ? `${index * 60}ms`
                      : "0ms",
                  }}
                >
                  {/* Shine */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -left-[85%]
                      top-[-30%]
                      h-[170%]
                      w-[45%]
                      rotate-[20deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.12]
                      to-transparent
                      opacity-0
                      transition-all
                      duration-700
                      group-hover:left-[135%]
                      group-hover:opacity-100
                    "
                  />

                  {/* Glass Highlight */}

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
                      via-[#5EEAD4]/55
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
                      shadow-[0_0_18px_rgba(20,184,166,0.08)]
                      transition-all
                      duration-300

                      group-hover:border-[#5EEAD4]/40
                      group-hover:bg-[#14B8A6]/[0.14]
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
              );
            })}
          </div>

          {/* ========================================
              BOTTOM ACCENT
          ======================================== */}

          <div
            className={`
              mt-0
              h-px
              w-16
              bg-gradient-to-r
              from-transparent
              via-[#2DD4BF]/70
              to-transparent
              transition-opacity
              duration-500
              ${
                statsVisible
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />
        </div>
      </div>
    </section>
  );
}