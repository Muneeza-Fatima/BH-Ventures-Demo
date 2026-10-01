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



export function generateStaticParams() {

  return projects.map((project) => ({

    slug: project.slug,

  }));

}



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

          <span>←</span>

          Back to Portfolio

        </Link>



        <Link

          href="/contact"

          className={styles.contactButton}

        >

          Start a Conversation

          <span>↗</span>

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



          <span>{project.location}</span>

        </div>



        <h1>{project.title}</h1>



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

          <strong>BH Ventures Team</strong>

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



      {/* CONTENT */}

      <section className={styles.contentLayout}>

        <aside className={styles.sidebar}>

          <div className={styles.sidebarCard}>

            <p className={styles.sidebarTitle}>

              KEY TAKEAWAYS

            </p>



            <ul>

              {project.takeaways.map((takeaway) => (

                <li key={takeaway}>

                  {takeaway}

                </li>

              ))}

            </ul>

          </div>



          <div className={styles.sidebarNote}>

            <strong>

              Need a deeper conversation?

            </strong>



            <p>

              Talk with our team about this initiative

              and related opportunities.

            </p>



            <Link href="/contact">

              Speak with our team →

            </Link>

          </div>

        </aside>



        <article className={styles.article}>

          {project.sections.map((section, index) => (

            <section

              className={styles.articleSection}

              key={section.heading}

            >

              {index === 0 && (

                <span className={styles.dropCap}>

                  {section.text.charAt(0)}

                </span>

              )}



              <h2>{section.heading}</h2>



              <p>

                {index === 0

                  ? section.text.slice(1)

                  : section.text}

              </p>

            </section>

          ))}



          <div className={styles.articleFooter}>

            <span>BH VENTURES</span>



            <span>

              PORTFOLIO / {project.number}

            </span>

          </div>

        </article>

      </section>



      {/* BOTTOM BACK BUTTON */}

      <div className={styles.bottomNavigation}>

        <Link

          href="/portfolio"

          className={styles.bottomBack}

        >

          <span>←</span>

          Back to Portfolio

        </Link>

      </div>

    </main>

  );

}