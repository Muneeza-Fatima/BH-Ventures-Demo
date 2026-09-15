"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import "./advertising.css";

interface AdvertisingSectionsProps {
    desc: string;
    whatsIncluded: string[];
    process: { title: string; desc: string }[];
    highlights: { label: string; value: string }[];
}

const PHOTOS = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70&auto=format",
    "https://images.unsplash.com/photo-1762417582194-7f0978f43fa0?w=600&q=70&auto=format",
    "https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?w=600&q=70&auto=format",
    "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=600&q=70&auto=format",
];

const CHANNELS = [
    { name: "Social media advertising", photo: PHOTOS[2], angle: -3 },
    { name: "Search advertising", photo: PHOTOS[0], angle: 2 },
    { name: "Display & digital advertising", photo: PHOTOS[1], angle: -2 },
    { name: "Content promotion", photo: PHOTOS[3], angle: 2 },
    { name: "Retargeting campaigns", photo: PHOTOS[0], angle: -2 },
    { name: "Local & targeted campaigns", photo: PHOTOS[2], angle: 3 },
];

const FOCUS_AREAS = [
    { mark: "A", name: "Right audience", desc: "Identify and reach audiences relevant to the campaign objective." },
    { mark: "B", name: "Clear messaging", desc: "Align creative and messaging with the brand and campaign goals." },
    { mark: "C", name: "Channel selection", desc: "Choose appropriate channels based on audience and objectives." },
    { mark: "D", name: "Performance", desc: "Track campaign results and identify opportunities for improvement." },
];

const OBJECTIVES = [
    { num: "01", name: "Build Awareness", desc: "Increase visibility and introduce your brand to relevant audiences." },
    { num: "02", name: "Drive Traffic", desc: "Bring targeted visitors to your website, product, or campaign landing page." },
    { num: "03", name: "Generate Leads", desc: "Reach potential customers and encourage meaningful inquiries." },
    { num: "04", name: "Promote Products", desc: "Put specific products, services, or offers in front of relevant audiences." },
    { num: "05", name: "Measure Performance", desc: "Track campaign results and use the data to guide future decisions." },
    { num: "06", name: "Retain Customers", desc: "Build loyalty and encourage repeat engagement with your brand." },
];

const METRICS = [
    { name: "Reach", desc: "How many people the campaign reaches." },
    { name: "Engagement", desc: "How audiences interact with the content." },
    { name: "Traffic", desc: "Visitors driven to the website or landing page." },
    { name: "Leads", desc: "Potential customers generated through campaigns." },
    { name: "Conversions", desc: "Actions completed against the campaign objective." },
];

/* ---------- MOTION VARIANTS ---------- */
const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const posterVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const sheetVariant: Variants = {
    hidden: (angle: number) => ({
        opacity: 0,
        y: 30,
        scale: 0.94,
        rotate: angle * 1.8,
    }),
    show: (angle: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: angle,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const mockLayoutVariant: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const markVariant: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: (delay: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay,
            type: "spring" as const,
            stiffness: 420,
            damping: 18,
        },
    }),
};

const noteVariant: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const indexCardVariant: Variants = {
    hidden: (angle: number) => ({
        opacity: 0,
        y: 28,
        scale: 0.94,
        rotate: angle * 1.8,
    }),
    show: (angle: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: angle,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const ticketVariant: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const flowLineVariant: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
        scaleX: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const flowCardVariant: Variants = {
    hidden: { opacity: 0, y: 26, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const statCardVariant: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const metricCardVariant: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

/* ========================================
   ADVERTISING -- full replacement for the generic
   What's included / How it works / Highlights block, plus
   Campaign channels, What we focus on, Campaign objectives, and
   Performance metrics.
   ======================================== */
export default function AdvertisingSections({
    whatsIncluded,
    process,
    highlights,
}: AdvertisingSectionsProps) {
    return (
        <div className="adx-theme-blue">
            {/* ---------- CAMPAIGN CHANNELS -- cream tear-sheet wall ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    Campaign channels
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--wall">
                    <motion.div variants={containerVariants} className="adx-wall">
                        {CHANNELS.map((c, i) => (
                            <motion.div
                                key={c.name}
                                className="adx-sheet"
                                custom={c.angle}
                                variants={sheetVariant}
                            >
                                <span className="adx-sheet-tape" />
                                <div className="adx-sheet-photo">
                                    <Image
                                        src={c.photo}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 220px"
                                        quality={70}
                                        loading={i === 0 ? "eager" : "lazy"}
                                        priority={i === 0}
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <p className="adx-sheet-label">{c.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ---------- WHAT WE FOCUS ON -- cream redline proof ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    What we focus on
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--proof">
                    <div className="adx-proof">
                        <motion.div variants={mockLayoutVariant} className="adx-layout-mock">
                            <div className="adx-layout-mock-head" />
                            <div className="adx-layout-mock-image" />
                            <div className="adx-layout-mock-line" />
                            <div className="adx-layout-mock-line" />
                            <div className="adx-layout-mock-line" />
                            <motion.span variants={markVariant} custom={0.2} className="adx-mark" style={{ top: "14px", left: "58%" }}>
                                A
                            </motion.span>
                            <motion.span variants={markVariant} custom={0.3} className="adx-mark" style={{ top: "96px", left: "14px" }}>
                                B
                            </motion.span>
                            <motion.span variants={markVariant} custom={0.4} className="adx-mark" style={{ top: "184px", left: "68%" }}>
                                C
                            </motion.span>
                            <motion.span variants={markVariant} custom={0.5} className="adx-mark" style={{ top: "232px", left: "26%" }}>
                                D
                            </motion.span>
                        </motion.div>
                        <motion.div variants={containerVariants} className="adx-notes">
                            {FOCUS_AREAS.map((f) => (
                                <motion.div key={f.mark} variants={noteVariant} className="adx-note">
                                    <span className="adx-note-mark">{f.mark}</span>
                                    <div>
                                        <h3 className="adx-note-title">{f.name}</h3>
                                        <p className="adx-note-desc">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>

            {/* ---------- WHAT'S INCLUDED -- cream index cards (flex-wrap, no dead space) ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    What&apos;s included
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--index">
                    <motion.div variants={containerVariants} className="adx-index-grid">
                        {whatsIncluded.map((item, i) => {
                            const tilt = (i % 2 === 0 ? -1 : 1) * 1.4;
                            return (
                                <motion.div
                                    key={item}
                                    className="adx-index-card"
                                    custom={tilt}
                                    variants={indexCardVariant}
                                >
                                    <div className="adx-index-photo">
                                        <Image
                                            src={PHOTOS[i % PHOTOS.length]}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 100vw, 220px"
                                            quality={70}
                                            loading="lazy"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <span className="adx-index-check">✓</span>
                                    <p className="adx-index-label">{item}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ---------- HOW IT WORKS -- cream ticket stubs ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    How it works
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--tickets">
                    <div className="adx-ticket-scroll">
                        <motion.div variants={containerVariants} className="adx-ticket-strip">
                            {process.map((step, i) => (
                                <motion.div key={step.title} variants={ticketVariant} className="adx-ticket">
                                    <div className="adx-ticket-photo">
                                        <Image
                                            src={PHOTOS[i % PHOTOS.length]}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 100vw, 220px"
                                            quality={65}
                                            loading="lazy"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="adx-ticket-perf" />
                                    <div className="adx-ticket-body">
                                        <span className="adx-ticket-num">{String(i + 1).padStart(2, "0")}</span>
                                        <h3 className="adx-ticket-name">{step.title}</h3>
                                        <p className="adx-ticket-desc">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>

            {/* ---------- CAMPAIGN OBJECTIVES -- cream flow poster, 6 cards, flex-wrap ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    Campaign objectives
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--flow">
                    <motion.div
                        variants={flowLineVariant}
                        className="adx-flow-line"
                        aria-hidden="true"
                        style={{ originX: 0 }}
                    />
                    <motion.div variants={containerVariants} className="adx-flow-grid">
                        {OBJECTIVES.map((o) => (
                            <motion.div key={o.num} variants={flowCardVariant} className="adx-flow-card">
                                <span className="adx-flow-num">{o.num}</span>
                                <h3 className="adx-flow-name">{o.name}</h3>
                                <p className="adx-flow-desc">{o.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ---------- HIGHLIGHTS -- cream stamped stats ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.div variants={posterVariants} className="adx-poster adx-poster--stats">
                    <motion.div variants={containerVariants} className="adx-stat-grid">
                        {highlights.map((h) => (
                            <motion.div key={h.label} variants={statCardVariant} className="adx-stat-card">
                                <span className="adx-stat-pin" />
                                <p className="adx-stat-value">{h.value}</p>
                                <p className="adx-stat-label">{h.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ---------- PERFORMANCE METRICS -- cream dotted strip ---------- */}
            <motion.section
                className="adx-poster-section"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    Performance metrics we track
                </motion.h2>
                <motion.div variants={posterVariants} className="adx-poster adx-poster--metrics">
                    <motion.div variants={containerVariants} className="adx-metrics-row">
                        {METRICS.map((m) => (
                            <motion.div key={m.name} variants={metricCardVariant} className="adx-metric-card">
                                <span className="adx-metric-dot" />
                                <h3 className="adx-metric-name">{m.name}</h3>
                                <p className="adx-metric-desc">{m.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>
        </div>
    );
}