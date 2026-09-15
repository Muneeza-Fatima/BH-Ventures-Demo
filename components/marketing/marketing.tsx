"use client";

import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
    Search,
    Workflow,
    RefreshCw,
    Eye,
    Crosshair,
    Sparkles,
    Heart,
    FileText,
    ClipboardList,
    Compass,
    PenSquare,
    Layers,
    LineChart,
    SlidersHorizontal,
    Globe,
    UserPlus,
    CheckCircle2,
} from "lucide-react";
import "./marketing.css";

/* ---------- MOTION VARIANTS ---------- */
const sectionHeadingVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const colorBarVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.04,
            duration: 0.45,
        },
    },
};

const chipVariants: Variants = {
    hidden: { opacity: 0, scale: 0.75, y: 6 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 420,
            damping: 20,
        },
    },
};

const bentoGridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
        },
    },
};

const bentoCardVariants: Variants = {
    hidden: { opacity: 0, y: 26, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const focusGridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.06,
        },
    },
};

const focusCardVariants: Variants = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
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

const objectiveGridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.05,
        },
    },
};

const objectiveCardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const docketListVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
        },
    },
};

const docketRowVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const metricGridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const metricCardVariants: Variants = {
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

/* ---------- COLOR SYSTEM ---------- */
type Swatch = { rgb: string; hex: string; label: string };

const SWATCH: Record<string, Swatch> = {
    cyan: { rgb: "0, 146, 184", hex: "#0092B8", label: "Process Cyan" },
    magenta: { rgb: "214, 36, 124", hex: "#D6247C", label: "Process Magenta" },
    yellow: { rgb: "232, 164, 0", hex: "#E8A400", label: "Process Yellow" },
    green: { rgb: "28, 138, 94", hex: "#1C8A5E", label: "Spot Emerald" },
    violet: { rgb: "110, 86, 207", hex: "#6E56CF", label: "Spot Violet" },
    orange: { rgb: "225, 87, 31", hex: "#E1571F", label: "Warm Scarlet" },
};
const SPOT_ORDER = ["cyan", "magenta", "yellow", "green", "violet", "orange"];

const WEDGE_STEPS = [0.18, 0.38, 0.58, 0.8, 1];

const noSelectStyle: CSSProperties = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none" as CSSProperties["msUserSelect"],
};

/* ---------- SHARED REGISTRATION MARK ---------- */
function RegMark({ size = 16, strokeWidth = 1.4 }: { size?: number; strokeWidth?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth={strokeWidth} />
            <line x1="12" y1="0.5" x2="12" y2="7" stroke="currentColor" strokeWidth={strokeWidth} />
            <line x1="12" y1="17" x2="12" y2="23.5" stroke="currentColor" strokeWidth={strokeWidth} />
            <line x1="0.5" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth={strokeWidth} />
            <line x1="17" y1="12" x2="23.5" y2="12" stroke="currentColor" strokeWidth={strokeWidth} />
        </svg>
    );
}

/* ---------- COLOR BAR (Interactive Calibration Strip) ---------- */
function ColorBar() {
    const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);

    return (
        <motion.div
            className="mk-colorbar"
            aria-hidden="true"
            variants={colorBarVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <div className="mk-colorbar-strip">
                {SPOT_ORDER.map((key, i) => (
                    <motion.span
                        className={`mk-colorbar-chip${hoveredSwatch === key ? " mk-colorbar-chip--active" : ""}`}
                        key={key}
                        variants={chipVariants}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setHoveredSwatch(key)}
                        onMouseLeave={() => setHoveredSwatch(null)}
                    >
                        <span
                            className="mk-colorbar-swatch"
                            style={{
                                background: SWATCH[key].hex,
                                boxShadow: hoveredSwatch === key ? `0 0 8px ${SWATCH[key].hex}` : undefined,
                            }}
                        />
                        <span className="mk-colorbar-num">{String(i + 1).padStart(2, "0")}</span>
                    </motion.span>
                ))}
            </div>
            {hoveredSwatch && (
                <motion.span
                    className="mk-colorbar-tooltip"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <span
                        className="mk-colorbar-tooltip-dot"
                        style={{ background: SWATCH[hoveredSwatch].hex }}
                    />
                    {SWATCH[hoveredSwatch].label} ({SWATCH[hoveredSwatch].hex})
                </motion.span>
            )}
        </motion.div>
    );
}

/* ---- 1. Marketing Focus Areas ---- */
const focusAreaImages = [
    {
        color: "magenta",
        index: "01",
        name: "Research & Insights",
        desc: "Understand your market, competitors, customers, and opportunities.",
        image: "/images/marketing/research-insights.png",
    },
    {
        color: "cyan",
        index: "02",
        name: "Campaign Management",
        desc: "Plan and coordinate campaigns across relevant marketing channels.",
        image: "/images/marketing/campaign-management.png",
    },
    {
        color: "violet",
        index: "03",
        name: "Brand & Positioning",
        desc: "Develop a clear marketing direction that reflects your business.",
        image: "/images/marketing/brand-positioning.png",
    },
    {
        color: "yellow",
        index: "04",
        name: "Content & Communication",
        desc: "Align messaging and content with your audience and marketing goals.",
        image: "/images/marketing/content-communication.png",
    },
    {
        color: "green",
        index: "05",
        name: "Digital Presence",
        desc: "Support your presence across websites, social platforms, and digital channels.",
        image: "/images/marketing/digital-presence.png",
    },
    {
        color: "orange",
        index: "06",
        name: "Performance & Optimization",
        desc: "Review results and identify areas for improvement over time.",
        image: "/images/marketing/performance-optimization.png",
    },
];

/* ---- 2. What We Focus On ---- */
const focusAreas = [
    { name: "Market Understanding", desc: "Research audiences, competitors, and market trends to identify opportunities.", color: "cyan", icon: Search },
    { name: "Strategic Direction", desc: "Build marketing plans around the company's goals and target customers.", color: "orange", icon: Compass },
    { name: "Consistent Execution", desc: "Coordinate marketing activities across relevant channels and touchpoints.", color: "violet", icon: Workflow },
    { name: "Continuous Improvement", desc: "Use performance data to refine campaigns and marketing decisions.", color: "green", icon: RefreshCw },
];

/* ---- 3. Marketing Objectives ---- */
const objectives = [
    { name: "Build Brand Awareness", desc: "Increase visibility and establish a stronger market presence.", color: "magenta", icon: Eye },
    { name: "Reach the Right Audience", desc: "Connect marketing activities with relevant customer segments.", color: "cyan", icon: Crosshair },
    { name: "Generate Opportunities", desc: "Support lead generation, customer acquisition, and business growth.", color: "yellow", icon: Sparkles },
    { name: "Improve Engagement", desc: "Create meaningful interactions between brands and their audiences.", color: "violet", icon: Heart },
];

/* ---- 4. What You Get ---- */
const deliverables = [
    { name: "Marketing strategy", desc: "A clear, structured plan built around your business goals.", color: "magenta", icon: FileText },
    { name: "Market & competitor insights", desc: "A grounded read on where you stand and where the openings are.", color: "cyan", icon: Search },
    { name: "Campaign plans", desc: "Concrete plans for how each campaign runs, start to finish.", color: "yellow", icon: ClipboardList },
    { name: "Channel recommendations", desc: "Which channels are worth your budget, and why.", color: "violet", icon: Layers },
    { name: "Content direction", desc: "Messaging and content guidance aligned to your audience and goals.", color: "green", icon: PenSquare },
    { name: "Performance reports", desc: "Regular, readable reporting on what's actually working.", color: "orange", icon: LineChart },
    { name: "Optimization recommendations", desc: "Specific adjustments to keep results improving over time.", color: "magenta", icon: SlidersHorizontal },
];

/* ---- 5. Performance Tracking ---- */
const metrics = [
    { name: "Reach", desc: "Audience visibility and brand exposure across targeted segments.", color: "magenta", icon: Eye, pointer: 24, badge: "99.4% Reach" },
    { name: "Engagement", desc: "How deeply audiences interact with marketing touchpoints and content.", color: "yellow", icon: Heart, pointer: 40, badge: "+138% Lift" },
    { name: "Traffic", desc: "Qualified website and campaign traffic generated from all active channels.", color: "cyan", icon: Globe, pointer: 56, badge: "3.8x Volume" },
    { name: "Leads", desc: "High-intent potential customers generated through coordinated activities.", color: "green", icon: UserPlus, pointer: 72, badge: "High Yield" },
    { name: "Conversions", desc: "Tangible business actions and revenue contributing to direct growth.", color: "violet", icon: CheckCircle2, pointer: 88, badge: "Scalable" },
];

/* ==========================================================
   SECTIONS WITH RICH FRAMER MOTION ANIMATIONS
========================================================== */

/* 1. Marketing Focus Areas — proof sheet with animated bento reveal */
export function MarketingFocusAreas() {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const handleCardInteract = (name: string) => {
        setActiveCard((prev) => (prev === name ? null : name));
    };

    return (
        <motion.section
            className="mk-section"
            style={noSelectStyle}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
        >
            <motion.h2 variants={sectionHeadingVariants} className="mk-heading">
                Marketing focus areas
            </motion.h2>
            <ColorBar />
            <div className="mk-sheet">
                <motion.div
                    className="mk-bento-grid"
                    variants={bentoGridVariants}
                >
                    {focusAreaImages.map((m) => {
                        const sw = SWATCH[m.color];
                        const isActive = activeCard === m.name;
                        return (
                            <motion.div
                                key={m.name}
                                variants={bentoCardVariants}
                                whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
                                whileTap={{ scale: 0.98 }}
                                className={`mk-bento-card${isActive ? " mk-bento-card--active" : ""}`}
                                style={{ "--c-rgb": sw.rgb } as CSSProperties}
                                onClick={() => handleCardInteract(m.name)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isActive}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleCardInteract(m.name);
                                    }
                                }}
                            >
                                <div className="mk-bento-photo">
                                    <Image
                                        src={m.image}
                                        alt={m.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        quality={75}
                                        loading="lazy"
                                        className="mk-bento-img"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span className="mk-bento-tint" style={{ background: sw.hex }} />
                                    <span className="mk-bento-scrim" />
                                    <span className="mk-bento-tag">
                                        <span className="mk-bento-swatch" style={{ background: sw.hex }} />
                                        {m.index}
                                    </span>
                                    <span className="mk-bento-crosshair" aria-hidden="true">
                                        <RegMark size={14} strokeWidth={1.5} />
                                    </span>
                                    <div className="mk-bento-copy">
                                        <h3 className="mk-bento-name">{m.name}</h3>
                                        <p className="mk-bento-desc">{m.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
}

/* 2. What We Focus On — divided strip with live density wedges */
export function FocusAreas() {
    return (
        <motion.section
            className="mk-section"
            style={noSelectStyle}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h2 variants={sectionHeadingVariants} className="mk-heading">
                What we focus on
            </motion.h2>
            <motion.div className="mk-focus-grid" variants={focusGridVariants}>
                {focusAreas.map((f, i) => {
                    const Icon = f.icon;
                    const sw = SWATCH[f.color];
                    return (
                        <motion.div
                            key={f.name}
                            variants={focusCardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="mk-focus-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <div className="mk-focus-wedge">
                                {WEDGE_STEPS.map((t, wi) => (
                                    <motion.span
                                        key={wi}
                                        style={{ background: `rgba(${sw.rgb}, ${t})` }}
                                        initial={{ scaleY: 0.3, opacity: 0.3 }}
                                        whileInView={{ scaleY: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.1 + i * 0.08 + wi * 0.04,
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                    />
                                ))}
                            </div>
                            <motion.span
                                className="mk-focus-icon"
                                whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0], transition: { duration: 0.35 } }}
                            >
                                <Icon size={16} strokeWidth={1.8} />
                            </motion.span>
                            <h3 className="mk-focus-name">{f.name}</h3>
                            <p className="mk-focus-desc">{f.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}

/* 3. Marketing Objectives — animated registration crosshairs */
export function MarketingObjectives() {
    return (
        <motion.section
            className="mk-section"
            style={noSelectStyle}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h2 variants={sectionHeadingVariants} className="mk-heading">
                Marketing objectives
            </motion.h2>
            <motion.div className="mk-objective-grid" variants={objectiveGridVariants}>
                {objectives.map((o) => {
                    const Icon = o.icon;
                    const sw = SWATCH[o.color];
                    return (
                        <motion.div
                            key={o.name}
                            variants={objectiveCardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.22 } }}
                            className="mk-objective-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span className="mk-objective-ring">
                                <motion.span
                                    className="mk-objective-mark"
                                    initial={{ rotate: -90, scale: 0.75, opacity: 0 }}
                                    whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <RegMark size={54} strokeWidth={1.3} />
                                </motion.span>
                                <motion.span
                                    className="mk-objective-icon"
                                    whileHover={{ scale: 1.25, transition: { duration: 0.25 } }}
                                >
                                    <Icon size={18} strokeWidth={1.8} />
                                </motion.span>
                            </span>
                            <h3 className="mk-objective-name">{o.name}</h3>
                            <p className="mk-objective-desc">{o.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}

/* 4. What You Get — production docket with staggered slide-in */
export function WhatYouGet() {
    return (
        <motion.section
            className="mk-section"
            style={noSelectStyle}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.h2 variants={sectionHeadingVariants} className="mk-heading">
                What you get
            </motion.h2>
            <motion.div className="mk-deliver-list" variants={docketListVariants}>
                {deliverables.map((d, i) => {
                    const Icon = d.icon;
                    const sw = SWATCH[d.color];
                    return (
                        <motion.div
                            key={d.name}
                            variants={docketRowVariants}
                            whileHover={{ x: 8, transition: { duration: 0.2 } }}
                            className="mk-deliver-row"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span className="mk-deliver-folio">{String(i + 1).padStart(2, "0")}</span>
                            <motion.span
                                className="mk-deliver-chip"
                                whileHover={{ scale: 1.15, rotate: -5, transition: { duration: 0.2 } }}
                            >
                                <Icon size={16} strokeWidth={1.8} />
                            </motion.span>
                            <div className="mk-deliver-body">
                                <h3 className="mk-deliver-name">{d.name}</h3>
                                <p className="mk-deliver-desc">{d.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}

/* 5. Performance Tracking — live density-wedge reading meters */
export function PerformanceTracking() {
    return (
        <motion.section
            className="mk-section"
            style={noSelectStyle}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h2 variants={sectionHeadingVariants} className="mk-heading">
                Performance tracking
            </motion.h2>
            <motion.p
                variants={sectionHeadingVariants}
                className="mk-subheading"
            >
                Marketing isn&apos;t just about launching campaigns.
            </motion.p>
            <motion.div className="mk-metric-grid" variants={metricGridVariants}>
                {metrics.map((m, i) => {
                    const Icon = m.icon;
                    const sw = SWATCH[m.color];
                    return (
                        <motion.div
                            key={m.name}
                            variants={metricCardVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="mk-metric-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <div className="mk-metric-head">
                                <motion.span
                                    className="mk-metric-head-icon"
                                    whileHover={{ scale: 1.25, rotate: 12, transition: { duration: 0.25 } }}
                                >
                                    <Icon size={15} strokeWidth={1.8} />
                                </motion.span>
                                <h3 className="mk-metric-name">{m.name}</h3>
                                <span className="mk-metric-badge">{m.badge}</span>
                            </div>
                            <div className="mk-metric-wedge">
                                {WEDGE_STEPS.map((t, wi) => (
                                    <motion.span
                                        key={wi}
                                        style={{ background: `rgba(${sw.rgb}, ${t})` }}
                                        initial={{ scaleY: 0.3, opacity: 0.3 }}
                                        whileInView={{ scaleY: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.15 + i * 0.08 + wi * 0.03,
                                            duration: 0.35,
                                            ease: "easeOut",
                                        }}
                                    />
                                ))}
                                <motion.span
                                    className="mk-metric-pointer"
                                    initial={{ left: "0%", opacity: 0 }}
                                    whileInView={{ left: `${m.pointer}%`, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.25 + i * 0.09,
                                        type: "spring",
                                        stiffness: 130,
                                        damping: 14,
                                    }}
                                />
                            </div>
                            <p className="mk-metric-desc">{m.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}

/* ---------- COMBINED WRAPPER ---------- */
export default function MarketingSections() {
    return (
        <div className="mk-wrapper">
            <MarketingFocusAreas />
            <FocusAreas />
            <MarketingObjectives />
            <WhatYouGet />
            <PerformanceTracking />
        </div>
    );
}