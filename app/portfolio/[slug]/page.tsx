import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, projects } from "@/data/projects";

import styles from "./ProjectDetails.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ───────── ARROW ICON ───────── */

function ArrowIcon({
  direction = "right",
}: {
  direction?: "left" | "right" | "upRight";
}) {
  const paths = {
    left: "M19 12H5M11 6l-6 6 6 6",
    right: "M5 12h14M13 6l6 6-6 6",
    upRight: "M7 17L17 7M8 7h9v9",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

/* ───────── STATIC PARAMS ───────── */

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/* ───────── PAGE ───────── */

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const words = project.sections
    .map((section) => section.text)
    .join(" ")
    .concat(` ${project.scenario}`)
    .split(/\s+/)
    .filter(Boolean).length;

  const readMinutes = Math.max(1, Math.round(words / 200));

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject =
    projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  return (
    <main className={styles.page}>
      <div className={styles.progress} aria-hidden="true" />

      {/* ═══════════════ HERO ═══════════════ */}

      <header className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbA}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbB}`} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* LEFT — text */}
          <div className={styles.heroText}>
            <Link href="/portfolio" className={styles.backLink}>
              <span>
                <ArrowIcon direction="left" />
              </span>
              All projects
            </Link>

            <span className={styles.category}>{project.category}</span>

            <h1>{project.title}</h1>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.heroActions}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  View live project
                  <span>
                    <ArrowIcon direction="upRight" />
                  </span>
                </a>
              )}

              <Link href="/contact" className={styles.ghostButton}>
                Start a conversation
              </Link>
            </div>
          </div>

          {/* RIGHT — framed image */}
          <div className={styles.heroMediaWrap}>
            <div className={styles.heroMedia}>
              <img src={project.image} alt={project.title} />
              <div className={styles.heroMediaShade} />
            </div>

            <span className={styles.mediaBadge}>
              BH VENTURES / {project.number}
            </span>
          </div>
        </div>
      </header>

      {/* ═══════════════ ARTICLE ═══════════════ */}

      <article className={styles.article}>
        <div className={styles.articleMeta}>
          <span>{project.status}</span>
          <span>{project.location}</span>
          <span>{readMinutes} min read</span>
        </div>

        {project.sections[0] && (
          <section className={styles.articleRow}>
            <div className={styles.rowHead}>
              <span className={styles.rowNumber} aria-hidden="true">01</span>
              <h2>The problem</h2>
            </div>
            <p>{project.sections[0].text}</p>
          </section>
        )}

        {project.video && (
          <figure className={styles.articleVideo}>
            <video
              controls
              playsInline
              preload="none"
              poster={project.image}
              aria-label={`${project.title} project demonstration`}
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <figcaption>{project.title} project demonstration</figcaption>
          </figure>
        )}

        {project.sections.length > 1 && (
          <section className={styles.articleRow}>
            <div className={styles.rowHead}>
              <span className={styles.rowNumber} aria-hidden="true">
                {String(project.sections.length).padStart(2, "0")}
              </span>
              <h2>The solution</h2>
            </div>
            <div className={styles.articleCopy}>
              {project.sections.slice(1).map((section) => (
                <p key={section.heading}>{section.text}</p>
              ))}
            </div>
          </section>
        )}

        <section className={styles.articleRow}>
          <div className={styles.rowHead}>
            <span className={styles.rowNumber} aria-hidden="true">
              {String(project.sections.length + 1).padStart(2, "0")}
            </span>
            <h2>An illustrative scenario</h2>
          </div>
          <p>{project.scenario}</p>
        </section>

        <footer className={styles.articleTech}>
          <span>Built with</span>
          <div className={styles.techList}>
            {project.tech.map((technology) => (
              <span key={technology} className={styles.techTag}>
                {technology}
              </span>
            ))}
          </div>
        </footer>
      </article>

      {/* ═══════════════ CTA ═══════════════ */}

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div>
            <h2>Want to talk about this project?</h2>
            <p>
              Talk with our team about this initiative and related
              opportunities.
            </p>
          </div>

          <Link href="/contact" className={styles.ctaButton}>
            Speak with our team
            <span>
              <ArrowIcon direction="right" />
            </span>
          </Link>
        </div>
      </section>

      {/* ═══════════════ NEXT PROJECT ═══════════════ */}

      {nextProject && (
        <section className={styles.nextSection}>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className={styles.nextCard}
          >
            <img src={nextProject.image} alt="" className={styles.nextImage} />
            <div className={styles.nextOverlay} />

            <div className={styles.nextContent}>
              <span className={styles.nextLabel}>
                Next project · {nextProject.number}
              </span>
              <strong>{nextProject.title}</strong>
              <span className={styles.nextCategory}>
                {nextProject.category}
              </span>
            </div>

            <span className={styles.nextArrow}>
              <ArrowIcon direction="right" />
            </span>
          </Link>
        </section>
      )}

      <div className={styles.bottomNavigation}>
        <Link href="/portfolio" className={styles.bottomBack}>
          <span>
            <ArrowIcon direction="left" />
          </span>
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}