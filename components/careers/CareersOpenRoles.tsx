"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Clock3 } from "lucide-react";
import { careerJobs, type CareerJob } from "./careersJobsData";
import CareersJobModal from "./CareersJobModal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Openings + talent network in one closing navy band. Real roles
   added to careersJobsData.ts appear here automatically (filters,
   grid and modal); while the list is empty, the left column shows
   an honest "no open roles" message. */
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
      className="relative w-full min-w-0 overflow-hidden bg-[#0F1B2D] py-20 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Openings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="mb-4! text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4]">
              Open opportunities
            </p>
            <h2 className="font-heading text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-white sm:text-[3rem]">
              Current openings.
            </h2>

            {hasOpenRoles ? (
              <>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {["All", ...departments].map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                          isActive
                            ? "border-[#2DD4BF] bg-[#2DD4BF] text-[#06251F]"
                            : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>

                <motion.ul layout className="mt-6 border-t border-white/15">
                  <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job) => (
                      <motion.li
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="border-b border-white/15"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedJob(job)}
                          className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span>
                            <span className="block text-[18px] font-bold text-white transition-colors group-hover:text-[#5EEAD4]">
                              {job.title}
                            </span>
                            <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-white/55">
                              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                              <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{job.department}</span>
                              <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{job.employmentType}</span>
                            </span>
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-[#5EEAD4]" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                <CareersJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
              </>
            ) : (
              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:text-[12px]">
                  No open roles right now
                </p>
                <p className="mt-4! max-w-[520px] text-[17px] font-normal leading-[1.6] text-white/85 sm:text-[20px]">
                  We&apos;re not actively hiring for a specific role at the moment.
                </p>
                <p className="mt-4! max-w-[520px] text-[14.5px] font-normal leading-[1.75] text-white/65 sm:mt-3! sm:text-[16px]">
                  We still welcome interest from people who see a fit with how
                  BH Ventures operates.
                </p>
              </div>
            )}
          </motion.div>

          {/* Talent network — kept light: no card, just text and one action */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="self-start border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4] sm:text-[12px]">
              Talent network
            </p>
            <p className="mt-4! max-w-[420px] text-[16px] font-normal leading-[1.7] text-white/80 sm:text-[18px]">
              Send your profile and we&apos;ll reach out when an opportunity
              fits what you bring.
            </p>

            <div className="mt-8 flex flex-col items-start gap-5">
              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#2DD4BF] px-6 text-[14px] font-semibold text-[#06251F] transition-colors duration-300 hover:bg-[#5EEAD4]"
              >
                Send your profile
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:info@bhventures.ae"
                className="text-[14px] font-medium text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
              >
                or email info@bhventures.ae
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
