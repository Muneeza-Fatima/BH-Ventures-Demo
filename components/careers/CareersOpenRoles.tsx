"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Inbox, ArrowRight, MapPin, Briefcase, Clock3 } from "lucide-react";
import { careerJobs, type CareerJob } from "./careersJobsData";
import CareersJobModal from "./CareersJobModal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CareersOpenRoles() {
  const hasOpenRoles = careerJobs.length > 0;

  const departments = useMemo(
    () => Array.from(new Set(careerJobs.map((job) => job.department))),
    []
  );

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);

  const filteredJobs =
    activeFilter === "All"
      ? careerJobs
      : careerJobs.filter((job) => job.department === activeFilter);

  return (
    <section
      id="careers-open-roles"
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
          h-[380px]
          w-[600px]
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-[#00CDB5]/[0.05]
          blur-[120px]
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12 lg:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-10" />

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
              Open Opportunities
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-10" />
          </div>

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.05]
              tracking-[-0.05em]
              text-white
              sm:text-[2.6rem]
              lg:text-[3rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.6rem]!
            "
          >
            Current{" "}
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
              openings.
            </span>
          </h2>
        </motion.div>

        {hasOpenRoles ? (
          <>
            {/* FILTER PILLS */}

            <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5 sm:mb-10">
              {["All", ...departments].map((filter) => {
                const isActive = filter === activeFilter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      relative rounded-full border px-4 py-2 text-[12px] font-bold
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "border-[#14B8A6]/70 bg-[#14B8A6] text-[#07151A] shadow-[0_0_18px_rgba(20,184,166,0.28)]"
                          : "border-white/[0.12] bg-white/[0.03] text-white/60 hover:border-white/[0.22] hover:text-white"
                      }
                    `}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* JOB GRID */}

            <motion.div
              layout
              className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="
                      group
                      relative
                      flex
                      flex-col
                      gap-4
                      rounded-2xl
                      border
                      border-white/[0.10]
                      bg-white/[0.03]
                      p-5

                      transition-all
                      duration-300
                      ease-out

                      hover:-translate-y-1
                      hover:border-[#2DD4BF]/45
                      hover:bg-white/[0.05]
                      hover:shadow-[0_16px_40px_rgba(0,0,0,0.25),0_0_28px_rgba(45,212,191,0.16)]

                      sm:p-6
                    "
                  >
                    <div>
                      <h3 className="text-[16px] font-bold leading-tight text-white sm:text-[17px]">
                        {job.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-white/55">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#2DD4BF]" />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#2DD4BF]" />
                          {job.department}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#2DD4BF]" />
                          {job.employmentType}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="
                        group/apply
                        flex
                        items-center
                        justify-center
                        gap-2
                        self-end
                        rounded-full
                        border
                        border-[#14B8A6]/60
                        bg-[#14B8A6]/[0.08]
                        px-5
                        py-2.5
                        text-[12px]
                        font-bold
                        text-white

                        transition-all
                        duration-300
                        ease-out

                        hover:border-[#14B8A6]/90
                        hover:bg-[#14B8A6]
                        hover:text-[#07151A]
                        hover:shadow-[0_10px_28px_rgba(20,184,166,0.30)]
                      "
                    >
                      Apply Now
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/apply:translate-x-1" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <CareersJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="
              relative
              mx-auto
              flex
              max-w-[640px]
              flex-col
              items-center
              overflow-hidden
              rounded-[26px]
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-6
              py-12
              text-center

              sm:px-10
              sm:py-14
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-[220px]
                w-[380px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#14B8A6]/[0.10]
                blur-[90px]
              "
            />

            <span
              className="
                relative
                z-10
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-[#2DD4BF]/25
                bg-[#0E4A44]/40
                text-[#5EEAD4]
              "
            >
              <Inbox size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>

            <div className="relative z-10 mt-5 inline-flex items-center gap-2">
              <span className="relative flex h-[7px] w-[7px] shrink-0 items-center justify-center">
                <span className="relative h-[7px] w-[7px] rounded-full bg-white/30" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                No Open Roles Right Now
              </span>
            </div>

            <h3 className="relative z-10 mt-4 max-w-[440px] text-[19px] font-bold leading-snug text-white sm:text-[21px]">
              We&apos;re not actively hiring for a specific role at the
              moment.
            </h3>

            <p className="relative z-10 mt-3 max-w-[460px] text-[13.5px] font-medium leading-6 text-white/60 sm:text-[14px]">
              We still welcome interest from people who see a fit with how
              BH Ventures operates. Send your profile and we&apos;ll keep it
              on file for the right opportunity.
            </p>

            <Link href="/contact" className="group relative mt-7">
              <span
                className="
                  relative
                  flex
                  min-h-[48px]
                  min-w-[200px]
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-full

                  border
                  border-[#14B8A6]/70
                  bg-[#14B8A6]

                  px-7

                  text-[13px]
                  font-bold
                  text-[#07151A]

                  shadow-[0_0_18px_rgba(20,184,166,0.22)]

                  transition-all
                  duration-300
                  ease-out

                  group-hover:-translate-y-0.5
                  group-hover:bg-[#2DD4BF]
                  group-hover:shadow-[0_14px_38px_rgba(45,212,191,0.38)]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-[-20%]
                    left-[-70%]
                    w-[45%]
                    rotate-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent
                    opacity-0

                    transition-all
                    duration-700
                    ease-out

                    group-hover:left-[125%]
                    group-hover:opacity-100
                  "
                />

                <span className="relative z-10 whitespace-nowrap">
                  Send Your Profile
                </span>

                <ArrowRight
                  className="
                    relative
                    z-10
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
