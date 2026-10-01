"use client";

import Link from "next/link";
import styles from "./Portfolio.module.css";
import { projects } from "@/data/projects";

const sectors = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description:
      "Intelligent systems built to solve complex business challenges.",
    tags: "AI / ML / AUTOMATION",
    image: "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description:
      "Modern technology helping businesses evolve and scale.",
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
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "04",
    title: "Business Technology",
    description:
      "Digital infrastructure designed around modern business needs.",
    tags: "PLATFORMS / SYSTEMS / INNOVATION",
    image: "https://images.unsplash.com/photo-1580920461931-fcb03a940df5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "05",
    title: "Digital Analytics",
    description:
      "Turning complex data into meaningful business intelligence.",
    tags: "DATA / INSIGHTS / INTELLIGENCE",
    image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "06",
    title: "Emerging Markets",
    description:
      "Exploring opportunities across high-growth markets and industries.",
    tags: "GROWTH / MARKETS / VENTURES",
    image: "https://images.unsplash.com/photo-1786340436214-76fd497c650b?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Portfolio() {
  return (
    <main className={styles.portfolio}>
      <div className={styles.backgroundGrid} />

      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90"
            alt="Dubai skyline"
          />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            BH VENTURES / PORTFOLIO
          </p>

          <h1 className={styles.heroTitle}>
            Ideas that move
            <span>business forward.</span>
          </h1>

          <p className={styles.heroDescription}>
            Exploring ventures, technologies and opportunities shaping the
            future of business from Dubai and beyond.
          </p>

          <div className={styles.heroBottom}>
            <span className={styles.heroLine} />

            <span className={styles.heroScroll}>
              Explore our work
              <span>↓</span>
            </span>
          </div>
        </div>

        <div className={styles.heroLocation}>
          <span className={styles.locationDot} />
          DUBAI / UAE
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className={styles.intro}>
        <div className={styles.sectionIndex}>01</div>

        <div className={styles.introContent}>
          <p className={styles.sectionEyebrow}>
            OUR PORTFOLIO
          </p>

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
      </section>

      {/* ================= SECTORS ================= */}

      <section className={styles.sectors}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>
              AREAS OF FOCUS
            </p>

            <h2>Where we operate</h2>
          </div>

          <p
            className={`${styles.headingDescription} ${styles.sectorsDescription}`}
          >
            We explore opportunities across industries where technology,
            innovation and business can create meaningful growth.
          </p>
        </div>

        <div className={styles.sectorGrid}>
          {sectors.map((sector) => (
            <div
              className={styles.sector}
              key={sector.number}
            >
              <div className={styles.sectorImageWrap}>
                <img
                  src={sector.image}
                  alt={sector.title}
                  className={styles.sectorImage}
                />
                <div className={styles.sectorImageOverlay} />
              </div>

              <span className={styles.sectorNumber}>
                {sector.number}
              </span>

              <div className={styles.sectorContent}>
                <h3>{sector.title}</h3>

                <p>{sector.description}</p>

                <span className={styles.sectorTags}>
                  {sector.tags}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section className={styles.projects}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>
              SELECTED PROJECTS
            </p>

            <h2>What we're building</h2>
          </div>

          <p className={styles.headingDescription}>
            A selection of current initiatives and concepts across our
            portfolio.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <Link
              href={`/portfolio/${project.slug}`}
              className={styles.projectCard}
              key={project.slug}
            >
              <div className={styles.projectImage}>
                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className={styles.imageOverlay} />

                <span className={styles.projectNumber}>
                  {project.number}
                </span>

                <span className={styles.projectCategory}>
                  {project.category}
                </span>

                <span className={styles.viewProject}>
                  View
                  <span>↗</span>
                </span>
              </div>

              <div className={styles.projectContent}>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className={styles.projectFooter}>
                  <span
                    className={`${styles.status} ${
                      project.status === "ACTIVE"
                        ? styles.active
                        : project.status === "IN DEVELOPMENT"
                          ? styles.development
                          : styles.exploring
                    }`}
                  >
                    <span className={styles.statusDot} />
                    {project.status}
                  </span>

                  <span className={styles.cardArrow}>
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FUTURE ================= */}

      <section className={styles.future}>
        <div className={styles.futureImage}>
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai architecture"
          />
        </div>

        <div className={styles.futureOverlay} />

        <div className={styles.futureContent}>
          <p className={styles.sectionEyebrow}>
            LOOKING AHEAD
          </p>

          <h2>
            The next opportunity
            <br />
            starts with <span>an idea.</span>
          </h2>

          <p>
            We are continuously exploring new ventures, partnerships and
            opportunities across technology and emerging markets.
          </p>

          <Link
            href="/contact"
            className={styles.cta}
          >
            Start a conversation
            <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}