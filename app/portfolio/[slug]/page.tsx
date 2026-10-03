import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProjectBySlug,
  projects,
} from "@/data/projects";

import styles from "./ProjectDetails.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// =====================================================
// ARROW ICON (SVG, renders the same on every device)
// =====================================================

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

// =====================================================
// STATIC PROJECT PAGES
// =====================================================

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// =====================================================
// PROJECT DETAILS PAGE
// =====================================================

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>

      {/* NAVIGATION */}

      <nav className={styles.topNav}>

        <Link
          href="/portfolio"
          className={styles.backButton}
        >
          <span>
            <ArrowIcon direction="left" />
          </span>
          Back to Portfolio
        </Link>

        <Link
          href="/contact"
          className={styles.contactButton}
        >
          Start a Conversation
        </Link>

      </nav>

      {/* HEADER */}

      <section className={styles.header}>

        <div className={styles.meta}>

          <span className={styles.category}>
            {project.category}
          </span>

          <span className={styles.status}>
            <span className={styles.statusDot} />
            {project.status}
          </span>

          <span>
            {project.location}
          </span>

        </div>

        <h1>
          {project.title}
        </h1>

        <p className={styles.description}>
          {project.description}
        </p>

      </section>

      {/* AUTHOR */}

      <section className={styles.author}>

        <div className={styles.authorAvatar}>
          BH
        </div>

        <div>
          <strong>
            BH Ventures Team
          </strong>

          <span>
            Dubai, UAE · Portfolio &amp; Analysis
          </span>
        </div>

      </section>

      {/* HERO IMAGE */}

      <section className={styles.heroImage}>

        <img
          src={project.image}
          alt={project.title}
        />

        <div className={styles.heroImageOverlay} />

        <div className={styles.heroImageLabel}>
          BH VENTURES / {project.number}
        </div>

      </section>

      {/* LIVE PROJECT BUTTON */}

      {project.liveUrl && (
        <div className={styles.liveProjectWrapper}>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveProjectButton}
          >
            <span>
              View Live Project
            </span>

            <span className={styles.liveArrow}>
              <ArrowIcon direction="upRight" />
            </span>
          </a>

        </div>
      )}

      {/* CONTENT */}

      <section className={styles.contentLayout}>

        {/* SIDEBAR */}

        <aside className={styles.sidebar}>

          <div className={styles.sidebarCard}>

            <p className={styles.sidebarTitle}>
              KEY TAKEAWAYS
            </p>

            <ul>
              {project.takeaways.map(
                (takeaway) => (
                  <li key={takeaway}>
                    {takeaway}
                  </li>
                )
              )}
            </ul>

          </div>

          {/* TECHNOLOGIES */}

          <div className={styles.sidebarCard}>

            <p className={styles.sidebarTitle}>
              TECHNOLOGY
            </p>

            <div className={styles.techList}>

              {project.tech.map(
                (technology) => (
                  <span
                    key={technology}
                    className={styles.techTag}
                  >
                    {technology}
                  </span>
                )
              )}

            </div>

          </div>

          {/* CONTACT */}

          <div className={styles.sidebarNote}>

            <strong>
              Need a deeper conversation?
            </strong>

            <p>
              Talk with our team about this
              initiative and related opportunities.
            </p>

            <Link href="/contact">
              Speak with our team
              <ArrowIcon direction="right" />
            </Link>

          </div>

        </aside>

        {/* ARTICLE */}

        <article className={styles.article}>

          {project.sections.map(
            (section, index) => (

              <section
                className={styles.articleSection}
                key={section.heading}
              >

                {index === 0 && (
                  <span
                    className={styles.dropCap}
                  >
                    {section.text.charAt(0)}
                  </span>
                )}

                <h2>
                  {section.heading}
                </h2>

                <p>
                  {index === 0
                    ? section.text.slice(1)
                    : section.text}
                </p>

              </section>

            )
          )}

          {/* ARTICLE FOOTER */}

          <div className={styles.articleFooter}>

            <span>
              BH VENTURES
            </span>

            <span>
              PORTFOLIO / {project.number}
            </span>

          </div>

        </article>

      </section>

      {/* BOTTOM NAVIGATION */}

      <div className={styles.bottomNavigation}>

        <Link
          href="/portfolio"
          className={styles.bottomBack}
        >

          <span>
            <ArrowIcon direction="left" />
          </span>

          Back to Portfolio

        </Link>

      </div>

    </main>
  );
}