import styles from "./Portfolio.module.css";

const projects = [
  {
    number: "01",
    title: "AI Business Intelligence",
    category: "Artificial Intelligence",
    description:
      "An intelligent business platform transforming complex data into practical insights and smarter decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    status: "ACTIVE",
  },
  {
    number: "02",
    title: "Connected Mobility",
    category: "Automotive Technology",
    description:
      "A technology-driven mobility concept connecting vehicles, data and modern digital experiences.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    status: "IN DEVELOPMENT",
  },
  {
    number: "03",
    title: "Digital Growth Platform",
    category: "Digital Transformation",
    description:
      "A scalable digital ecosystem helping businesses connect technology, customers and sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
    status: "ACTIVE",
  },
  {
    number: "04",
    title: "Future Commerce",
    category: "Innovation",
    description:
      "Exploring new approaches to commerce through technology, data and connected customer experiences.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    status: "EXPLORING",
  },
];

const sectors = [
  "Artificial Intelligence",
  "Digital Transformation",
  "Automotive",
  "Business Technology",
  "Digital Analytics",
  "Emerging Markets",
];

export default function Portfolio() {
  return (
    <main className={styles.portfolio}>

      {/* =========================
          BACKGROUND GRID
      ========================= */}

      <div className={styles.backgroundGrid} />


      {/* =========================
          HERO
      ========================= */}

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


      {/* =========================
          INTRO
      ========================= */}

      <section className={styles.intro}>

        <div className={styles.sectionIndex}>
          01
        </div>

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


      {/* =========================
          WHERE WE OPERATE
      ========================= */}

      <section className={styles.sectors}>

        <div className={styles.sectionHeading}>

          <div>

            <p className={styles.sectionEyebrow}>
              AREAS OF FOCUS
            </p>

            <h2>
              Where we operate
            </h2>

          </div>

          <p className={styles.headingDescription}>
            We explore opportunities across industries where technology,
            innovation and business can create meaningful growth.
          </p>

        </div>


        <div className={styles.sectorGrid}>

          {sectors.map((sector, index) => (

            <div
              className={styles.sector}
              key={sector}
            >

              <span className={styles.sectorNumber}>
                0{index + 1}
              </span>

              <h3>
                {sector}
              </h3>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          PROJECTS
      ========================= */}

      <section className={styles.projects}>

        <div className={styles.sectionHeading}>

          <div>

            <p className={styles.sectionEyebrow}>
              SELECTED PROJECTS
            </p>

            <h2>
              What we're building
            </h2>

          </div>

          <p className={styles.headingDescription}>
            A selection of current initiatives and concepts across our
            portfolio.
          </p>

        </div>


        <div className={styles.projectGrid}>

          {projects.map((project) => (

            <article
              className={styles.projectCard}
              key={project.number}
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

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>


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

            </article>

          ))}

        </div>

      </section>


      {/* =========================
          FUTURE
      ========================= */}

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

          <a
            href="/contact"
            className={styles.cta}
          >
            Start a conversation
            <span>↗</span>
          </a>

        </div>

      </section>

    </main>
  );
}