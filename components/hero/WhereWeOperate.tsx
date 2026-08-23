"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Handshake,
  MapPin,
} from "lucide-react";

type Filter = "all" | "operations" | "partnerships";

type Country = {
  code: string;
  name: string;
  shortName: string;
  status: "operations" | "partnership";
};

const countries: Country[] = [
  {
    code: "ae",
    name: "United Arab Emirates",
    shortName: "UAE",
    status: "operations",
  },
  {
    code: "pk",
    name: "Pakistan",
    shortName: "Pakistan",
    status: "operations",
  },
  {
    code: "gb",
    name: "United Kingdom",
    shortName: "UK",
    status: "operations",
  },
  {
    code: "us",
    name: "United States",
    shortName: "US",
    status: "operations",
  },
  {
    code: "fr",
    name: "France",
    shortName: "France",
    status: "operations",
  },
  {
    code: "de",
    name: "Germany",
    shortName: "Germany",
    status: "partnership",
  },
  {
    code: "ee",
    name: "Estonia",
    shortName: "Estonia",
    status: "partnership",
  },
  {
    code: "dk",
    name: "Denmark",
    shortName: "Denmark",
    status: "partnership",
  },
  {
    code: "ua",
    name: "Ukraine",
    shortName: "Ukraine",
    status: "partnership",
  },
];

const filters: {
  id: Filter;
  label: string;
  icon: typeof Globe2;
}[] = [
  {
    id: "all",
    label: "All Locations",
    icon: Globe2,
  },
  {
    id: "operations",
    label: "Operations",
    icon: MapPin,
  },
  {
    id: "partnerships",
    label: "Partnerships",
    icon: Handshake,
  },
];

export default function WhereWeOperate() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredCountries = useMemo(() => {
    if (activeFilter === "operations") {
      return countries.filter(
        (country) => country.status === "operations"
      );
    }

    if (activeFilter === "partnerships") {
      return countries.filter(
        (country) => country.status === "partnership"
      );
    }

    return countries;
  }, [activeFilter]);

  return (
    <section
      id="where-we-operate"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-gradient-to-b
        from-[#101C30]
        to-[#0D1826]
        py-14
        sm:py-18
        md:py-20
        lg:py-24
        xl:py-28

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-16!
      "
    >
      {/* Soft top seam blending from the hero section above */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          bg-gradient-to-b
          from-[#0B1220]
          to-transparent
        "
      />

      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[15%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#00CDB5]/[0.05]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          bottom-[-80px]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#7B6CFF]/[0.045]
          blur-[100px]
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
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="
            mb-8
            max-w-[760px]
            sm:mb-10
            lg:mb-12

            [@media(min-width:1024px)_and_(max-width:1366px)]:mb-8!
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-[#00CDB5]
                to-[#00FFD5]
                sm:w-10
              "
            />

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#00FFD5]
                sm:text-[10px]
              "
            >
              Global Presence
            </span>
          </div>

          <h2
            className="
              text-[2.25rem]
              font-extrabold
              leading-[0.98]
              tracking-[-0.055em]
              text-white
              sm:text-[3rem]
              lg:text-[3.4rem]
              xl:text-[3.8rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[3rem]!
            "
          >
            Where We{" "}
            <span
              className="
                bg-gradient-to-r
                from-white
                via-[#EFFFFB]
                to-[#00FFD5]
                bg-clip-text
                text-transparent
              "
            >
              Operate.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[650px]
              text-[14px]
              font-medium
              leading-7
              text-white/60
              sm:text-[15px]
              lg:text-[16px]

              [@media(min-width:1024px)_and_(max-width:1366px)]:mt-4!
              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[14px]!
              [@media(min-width:1024px)_and_(max-width:1366px)]:leading-6!
            "
          >
            BH Ventures connects businesses, markets, and strategic
            opportunities across key international markets through
            direct operations and trusted partnerships.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-8
            xl:gap-10

            [@media(min-width:1024px)_and_(max-width:1366px)]:grid-cols-[1fr_0.82fr]!
            [@media(min-width:1024px)_and_(max-width:1366px)]:gap-7!
          "
        >
          {/* IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -110,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
            }}
            className="
              group
              relative
              min-h-[340px]
              overflow-hidden
              rounded-[26px]
              border
              border-white/[0.09]
              bg-[#101B2D]
              shadow-[0_25px_80px_rgba(0,0,0,0.18)]
              sm:min-h-[420px]
              lg:min-h-[470px]
              xl:min-h-[520px]

              [@media(min-width:1024px)_and_(max-width:1366px)]:min-h-[420px]!
            "
          >
            <div
              className="
                absolute
                inset-[10px]
                overflow-hidden
                rounded-[20px]
                border
                border-white/[0.07]
                bg-[#0D1728]
                sm:inset-[14px]
                sm:rounded-[23px]
                lg:inset-[14px]
                lg:rounded-[22px]
              "
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/operations/photo.jpg"
                  alt="BH Ventures global operations"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1366px) 55vw, 60vw"
                  className="
                    object-contain
                    object-center
                    scale-[1.2]
                    brightness-[1.05]
                    contrast-[1.03]
                    saturate-[1.03]

                    [@media(min-width:1024px)_and_(max-width:1366px)]:scale-[1.12]!
                  "
                />
              </div>

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#0B1220]/20
                  via-transparent
                  to-transparent
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[20px]
                  ring-1
                  ring-inset
                  ring-white/[0.06]
                  sm:rounded-[23px]
                  lg:rounded-[22px]
                "
              />
            </div>

            {/* Global Network */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.3,
              }}
              className="
                absolute
                left-4
                top-4
                z-20
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-[#0B1220]/75
                px-3
                py-2
                backdrop-blur-md
                sm:left-6
                sm:top-6
              "
            >
              <Globe2 className="h-3.5 w-3.5 text-[#00FFD5]" />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/75
                  sm:text-[9px]
                "
              >
                Global Network
              </span>
            </motion.div>

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-5
                right-5
                top-[70px]
                z-20
                h-px
                bg-gradient-to-r
                from-[#00FFD5]/30
                via-white/10
                to-transparent
              "
            />

            {/* Bottom label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.35,
              }}
              className="
                absolute
                bottom-5
                left-5
                right-5
                z-20
                flex
                items-end
                justify-between
                gap-4
                sm:bottom-7
                sm:left-7
                sm:right-7
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/45
                    sm:text-[9px]
                  "
                >
                  International Reach
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-semibold
                    text-white/85
                    sm:text-[11px]
                  "
                >
                  Connecting markets worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
            }}
            className="
              flex
              min-w-0
              flex-col
              rounded-[26px]
              border
              border-white/[0.09]
              bg-white/[0.035]
              p-4
              shadow-[0_25px_80px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
              sm:rounded-[28px]
              sm:p-5
              lg:p-5
              xl:p-7

              [@media(min-width:1024px)_and_(max-width:1366px)]:rounded-[24px]!
              [@media(min-width:1024px)_and_(max-width:1366px)]:p-4!
            "
          >
            <div className="mb-5">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white/40
                  "
                >
                  Explore Our Network
                </p>

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-2.5
                    py-1
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FFD5]" />

                  <span
                    className="
                      hidden
                      text-[8px]
                      font-semibold
                      text-white/40
                      sm:inline
                    "
                  >
                    Active Network
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div
              className="
                mb-5
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-3
                lg:grid-cols-1
                xl:grid-cols-3

                [@media(min-width:1024px)_and_(max-width:1366px)]:grid-cols-3!
              "
            >
              {filters.map((filter) => {
                const Icon = filter.icon;
                const active = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      flex
                      min-h-[42px]
                      min-w-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      px-2
                      py-2
                      text-[9px]
                      font-bold
                      transition-[background-color,border-color,color,transform]
                      duration-300
                      active:scale-[0.98]
                      ${
                        active
                          ? "border-[#00FFD5]/30 bg-[#00FFD5]/[0.09] text-[#00FFD5]"
                          : "border-white/[0.08] bg-white/[0.025] text-white/50 hover:border-white/15 hover:bg-white/[0.05] hover:text-white/80"
                      }
                    `}
                  >
                    <StatusCircle
                      type={
                        filter.id === "partnerships"
                          ? "partnership"
                          : filter.id === "operations"
                            ? "operations"
                            : "all"
                      }
                    />

                    <Icon
                      className={`h-3.5 w-3.5 ${
                        active ? "text-[#00FFD5]" : "text-white/35"
                      }`}
                    />

                    <span className="truncate">{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Markets */}
            <div className="mb-3 flex items-center justify-between">
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/35
                "
              >
                Markets
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-2.5
                  py-1
                  text-[8px]
                  font-bold
                  text-white/45
                "
              >
                {filteredCountries.length} Locations
              </span>
            </div>

            {/* Country List */}
            <div
              className="
                max-h-[285px]
                space-y-2
                overflow-y-auto
                overscroll-contain
                pr-1
                scrollbar-thin
                scrollbar-track-transparent
                scrollbar-thumb-white/10
                hover:scrollbar-thumb-white/20

                [@media(min-width:1024px)_and_(max-width:1366px)]:max-h-[250px]!
              "
            >
              <AnimatePresence mode="popLayout">
                {filteredCountries.map((country) => (
                  <motion.div
                    key={country.code}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      group
                      flex
                      min-w-0
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-white/[0.022]
                      px-3
                      py-2.5
                      transition-[background-color,border-color]
                      duration-300
                      hover:border-white/[0.14]
                      hover:bg-white/[0.045]
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      "
                    >
                      {/* FLAG — no background, no border */}
                      <div
                        className="
                          flex
                          h-[28px]
                          w-[40px]
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                        "
                      >
                        <Image
                          src={`https://flagcdn.com/w80/${country.code}.png`}
                          alt={`${country.name} flag`}
                          width={40}
                          height={28}
                          className="h-[19px] w-[30px] object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-[11px]
                            font-bold
                            text-white/90
                          "
                        >
                          {country.shortName}
                        </p>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.13em]
                            text-white/35
                          "
                        >
                          {country.status === "operations"
                            ? "Direct Operations"
                            : "Strategic Partnership"}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`
                          relative
                          h-2.5
                          w-2.5
                          rounded-full
                          ${
                            country.status === "operations"
                              ? "bg-[#00FFD5]"
                              : "bg-[#8B7CFF]"
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute
                            inset-[-3px]
                            rounded-full
                            opacity-20
                            ${
                              country.status === "operations"
                                ? "bg-[#00FFD5]"
                                : "bg-[#8B7CFF]"
                            }
                          `}
                        />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom Info */}
            <div
              className="
                mt-4
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#00FFD5]/10
                bg-gradient-to-br
                from-[#00FFD5]/[0.045]
                to-transparent
                p-3.5

                [@media(min-width:1024px)_and_(max-width:1366px)]:mt-3!
                [@media(min-width:1024px)_and_(max-width:1366px)]:p-3!
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#00FFD5]/10
                  bg-[#00FFD5]/[0.07]
                "
              >
                <MapPin className="h-3.5 w-3.5 text-[#00FFD5]" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold text-white/80">
                  Expanding beyond borders
                </p>

                <p
                  className="
                    mt-1
                    text-[9px]
                    leading-5
                    text-white/40
                  "
                >
                  Our network continues to grow through carefully
                  selected markets, relationships, and strategic
                  opportunities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatusCircle({
  type,
}: {
  type: "operations" | "partnership" | "all";
}) {
  if (type === "all") {
    return (
      <span
        className="
          relative
          flex
          h-3
          w-3
          shrink-0
          overflow-hidden
          rounded-full
        "
        aria-label="Operations and Partnerships"
      >
        <span className="h-full w-1/2 bg-[#00FFD5]" />
        <span className="h-full w-1/2 bg-[#8B7CFF]" />
      </span>
    );
  }

  const isOperations = type === "operations";

  return (
    <span
      className={`
        relative
        h-3
        w-3
        shrink-0
        rounded-full
        ${isOperations ? "bg-[#00FFD5]" : "bg-[#8B7CFF]"}
      `}
    >
      <span
        className={`
          absolute
          inset-[-3px]
          rounded-full
          opacity-20
          ${isOperations ? "bg-[#00FFD5]" : "bg-[#8B7CFF]"}
        `}
      />
    </span>
  );
}