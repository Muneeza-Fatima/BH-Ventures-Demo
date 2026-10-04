"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./Portfolio.module.css";
import { projects } from "@/data/projects";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const sectors = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description:
      "Intelligent systems built to solve complex business challenges.",
    tags: "AI / ML / AUTOMATION",
    image:
      "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=764&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description: "Modern technology helping businesses evolve and scale.",
    tags: "CLOUD / DIGITAL / STRATEGY",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Automotive",
    description:
      "Technology shaping the future of mobility and connected experiences.",
    tags: "MOBILITY / CONNECTED / SMART",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Business Technology",
    description:
      "Digital infrastructure designed around modern business needs.",
    tags: "PLATFORMS / SYSTEMS / INNOVATION",
    image:
      "https://images.unsplash.com/photo-1580920461931-fcb03a940df5?q=80&w=1170&auto=format&fit=crop",
  },
  {
    number: "05",
    title: "Digital Analytics",
    description:
      "Turning complex data into meaningful business intelligence.",
    tags: "DATA / INSIGHTS / INTELLIGENCE",
    image:
      "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1074&auto=format&fit=crop",
  },
  {
    number: "06",
    title: "Emerging Markets",
    description:
      "Exploring opportunities across high-growth markets and industries.",
    tags: "GROWTH / MARKETS / VENTURES",
    image:
      "https://images.unsplash.com/photo-1786340436214-76fd497c650b?q=80&w=1106&auto=format&fit=crop",
  },
];

/* ─────────────────────────────────────────────
   FRAMER VARIANTS
───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.09,
    },
  }),
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <main className={styles.portfolio}>
      <div className={styles.backgroundGrid} />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section className={styles.hero} ref={heroRef}>

        {/* Parallax image */}
        <motion.div className={styles.heroImage} style={{ y: imgY }}>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90"
            alt="Dubai skyline"
          />
        </motion.div>

        <div className={styles.heroOverlay} />

        {/* Animated glow orbs */}
        <div className={styles.heroOrbs} aria-hidden="true">
          <motion.div
            className={`${styles.orb} ${styles.orbA}`}
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`${styles.orb} ${styles.orbB}`}
            animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div className={styles.heroContent} style={{ y: contentY }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className={styles.heroEyebrowWrap}
            >
              <span className={styles.heroEyebrowLine} />
              <p className={styles.eyebrow}>BH VENTURES / PORTFOLIO</p>
            </motion.div>

            {/* Title — word by word */}
            <motion.h1
              className={styles.heroTitle}
              variants={wordContainer}
              aria-label="Ideas that move business forward."
            >
              <span className={styles.heroTitleLine}>
                {["Ideas", "that", "move"].map((w) => (
                  <motion.span
                    key={w}
                    variants={wordVariant}
                    className={styles.heroWord}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className={styles.heroTitleLine}>
                <motion.span
                  variants={wordVariant}
                  className={styles.heroWord}
                >
                  business
                </motion.span>
                <motion.span
                  variants={wordVariant}
                  className={`${styles.heroWord} ${styles.heroWordAccent}`}
                >
                  forward.
                </motion.span>
              </span>
            </motion.h1>

            {/* Description with shimmer phrase */}
            <motion.p variants={itemVariants} className={styles.heroDescription}>
              Exploring ventures, technologies and opportunities shaping the
              future of business{" "}
              <motion.span
                className={styles.heroShimmer}
                animate={{
                  backgroundPosition: [
                    "100% 50%",
                    "0% 50%",
                    "100% 50%",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                from Dubai and beyond.
              </motion.span>
            </motion.p>

            {/* Bottom scroll hint */}
            <motion.div variants={itemVariants} className={styles.heroBottom}>
              <span className={styles.heroLine} />
              <span className={styles.heroScroll}>
                Explore our work
                <motion.span
                  animate={{ y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown size={14} strokeWidth={2.5} />
                </motion.span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Location badge */}
        <motion.div
          className={styles.heroLocation}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.span
            className={styles.locationDot}
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(85,212,198,0.5)",
                "0 0 0 8px rgba(85,212,198,0)",
                "0 0 0 0px rgba(85,212,198,0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          DUBAI / UAE
        </motion.div>

        {/* Scroll progress bar */}
        <motion.div
          className={styles.heroProgressBar}
          style={{ scaleX: scrollYProgress }}
        />

      </section>

      {/* ═══════════════════════════════════════
          INTRO
      ═══════════════════════════════════════ */}

      <motion.section
        className={styles.intro}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className={styles.sectionIndex}>01</div>

        <div className={styles.introContent}>
          <p className={styles.sectionEyebrow}>OUR PORTFOLIO</p>

          <h2>
            Building opportunities
            <br />
            <span>for what comes next.</span>
          </h2>

          <p className={styles.introText}>
            BH Ventures works across technology, business and innovation to
            identify opportunities, develop ideas and build ventures designed
            for a rapidly changing world.
          </p>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════
          SECTORS
      ═══════════════════════════════════════ */}

      <section className={styles.sectors}>

        <motion.div
          className={styles.sectionHeading}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <p className={styles.sectionEyebrow}>AREAS OF FOCUS</p>
            <h2>Where we operate</h2>
          </div>
          <p
            className={`${styles.headingDescription} ${styles.sectorsDescription}`}
          >
            We explore opportunities across industries where technology,
            innovation and business can create meaningful growth.
          </p>
        </motion.div>

        <div className={styles.sectorGrid}>
          {sectors.map((sector, i) => (
            <motion.div
              className={styles.sector}
              key={sector.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <div className={styles.sectorImageWrap}>
                <img
                  src={sector.image}
                  alt={sector.title}
                  className={styles.sectorImage}
                />
                <div className={styles.sectorImageOverlay} />
              </div>

              <span className={styles.sectorNumber}>{sector.number}</span>

              <div className={styles.sectorContent}>
                <h3>{sector.title}</h3>
                <p>{sector.description}</p>
                <span className={styles.sectorTags}>{sector.tags}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════ */}

      <section className={styles.projects}>

        <motion.div
          className={styles.sectionHeading}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <p className={styles.sectionEyebrow}>SELECTED PROJECTS</p>
            <h2>What we&apos;re building</h2>
          </div>
          <p className={styles.headingDescription}>
            A selection of current initiatives and concepts across our
            portfolio.
          </p>
        </motion.div>

        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className={styles.projectCard}
              >
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.imageOverlay} />
                  <span className={styles.projectNumber}>
                    {project.number}
                  </span>
                  <span className={styles.projectCategory}>
                    {project.category}
                  </span>
                </div>

                <div className={styles.projectContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className={styles.projectFooter}>
                    <span
                      className={`${styles.status} ${project.status === "ACTIVE"
                        ? styles.active
                        : project.status === "IN DEVELOPMENT"
                          ? styles.development
                          : styles.exploring
                        }`}
                    >
                      <span className={styles.statusDot} />
                      {project.status}
                    </span>

                    <span className={styles.viewProject}>
                      <span className={styles.viewText}>View project</span>
                      <span className={styles.viewArrow} aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════
          FUTURE CTA
      ═══════════════════════════════════════ */}

      <section className={styles.future}>

        <div className={styles.futureImage}>
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai architecture"
          />
        </div>

        <div className={styles.futureOverlay} />

        <motion.div
          className={styles.futureContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={itemVariants} className={styles.sectionEyebrow}>
            LOOKING AHEAD
          </motion.p>

          <motion.h2 variants={wordContainer}>
            {["The", "next", "opportunity"].map((w) => (
              <motion.span
                key={w}
                variants={wordVariant}
                className={styles.futureWord}
              >
                {w}{" "}
              </motion.span>
            ))}
            <br />
            {["starts", "with"].map((w) => (
              <motion.span
                key={w}
                variants={wordVariant}
                className={styles.futureWord}
              >
                {w}{" "}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariant}
              className={`${styles.futureWord} ${styles.futureAccent}`}
            >
              an idea.
            </motion.span>
          </motion.h2>

          <motion.p variants={itemVariants}>
            We are continuously exploring new ventures, partnerships and
            opportunities across technology and emerging markets.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/contact" className={styles.cta}>
              Start a conversation
              <span aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>

      </section>

    </main>
  );
}