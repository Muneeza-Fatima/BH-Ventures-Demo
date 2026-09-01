"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, MapPin, Briefcase, Clock3, ArrowRight } from "lucide-react";
import type { CareerJob } from "./careersJobsData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function MetaPill({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-semibold text-white/70">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#2DD4BF]" aria-hidden="true" />
      {label}
    </span>
  );
}

export default function CareersJobModal({
  job,
  onClose,
}: {
  job: CareerJob | null;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!job) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [job, onClose]);

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          key="career-job-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6"
        >
          <motion.div
            key="career-job-modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              ease: EASE,
            }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-job-modal-title"
            className="
              relative
              max-h-[88vh]
              w-full
              max-w-[640px]
              overflow-y-auto
              rounded-[28px]
              border
              border-white/[0.12]
              bg-[#0B1220]/[0.97]
              p-6
              shadow-[0_40px_120px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
              sm:p-8
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#14B8A6]/15 blur-3xl"
            />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close job details"
              className="
                absolute
                right-5
                top-5
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.10]
                bg-white/[0.05]
                text-white/70

                transition-all
                duration-300

                hover:bg-white/[0.10]
                hover:text-white
              "
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative pr-10">
              <h2
                id="career-job-modal-title"
                className="text-[22px] font-extrabold tracking-[-0.03em] text-white sm:text-[26px]"
              >
                {job.title}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <MetaPill icon={MapPin} label={job.location} />
                <MetaPill icon={Briefcase} label={job.department} />
                <MetaPill icon={Clock3} label={job.employmentType} />
              </div>
            </div>

            <div className="relative mt-7 space-y-6">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.20em] text-[#5EEAD4]">
                  About the Role
                </h3>

                <p className="mt-3 text-[14px] font-medium leading-7 text-white/70">
                  {job.aboutRole}
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.20em] text-[#5EEAD4]">
                  Requirements
                </h3>

                <ul className="mt-3 space-y-2.5">
                  {job.requirements.map((requirement) => (
                    <li
                      key={requirement}
                      className="flex items-start gap-2.5 text-[14px] font-medium leading-6 text-white/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2DD4BF]"
                      />

                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={job.applyHref}
              className="
                group
                relative
                mt-8
                flex
                min-h-[50px]
                w-full
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

                hover:-translate-y-0.5
                hover:bg-[#2DD4BF]
                hover:shadow-[0_14px_38px_rgba(45,212,191,0.38)]

                sm:w-auto
              "
            >
              <span className="relative z-10">Apply for This Role</span>

              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
