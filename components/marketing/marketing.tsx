"use client";

import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
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
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

/* ---------- COLOR SYSTEM ----------
   A tech-forward palette: six distinct hues from the indigo/teal/rose
   family, all built to sit cleanly on a white page (unlike the previous
   dark "broadcast" build, every colour here is a base-600 tone chosen
   for contrast against #fff, not a neon glow against black). */
type Swatch = { rgb: string };

const SWATCH: Record<string, Swatch> = {
    flame: { rgb: "234, 88, 12" },   // orange-600
    gold: { rgb: "217, 119, 6" },    // amber-600
    sky: { rgb: "2, 132, 199" },     // sky-600
    mint: { rgb: "5, 150, 105" },    // emerald-600
    violet: { rgb: "124, 58, 237" }, // violet-600
    coral: { rgb: "225, 29, 72" },   // rose-600
};

/* fixed decorative EQ / level-meter bar heights (px), so the strip
   feels alive without pulling in any real analytics data */
const EQ_PATTERNS = [
    [10, 18, 13, 22],
    [16, 9, 21, 12],
    [13, 23, 10, 17],
    [19, 12, 22, 14],
];
const METER_PATTERNS = [
    [10, 22, 16],
    [20, 12, 24],
    [14, 26, 11],
    [22, 15, 20],
    [12, 20, 26],
];

/* ---- 1. Marketing Focus Areas ----
   These six areas are genuinely worked through in order (research comes
   before you plan a campaign, brand before content, etc.), so each tile
   carries its position in that sequence.

   Images: pointing at the tech photos already in /images/marketing —
   research-insights.jpg, campaign-management.jpg, brand-positioning.jpg,
   content-communication.jpg, digital-presence.jpg and
   performance-optimization.jpg. */
const focusAreaImages = [
    {
        color: "coral",
        index: "01",
        name: "Research & Insights",
        desc: "Understand your market, competitors, customers, and opportunities.",
        image: "/images/marketing/research-insights.jpg",
    },
    {
        color: "sky",
        index: "02",
        name: "Campaign Management",
        desc: "Plan and coordinate campaigns across relevant marketing channels.",
        image: "/images/marketing/campaign-management.jpg",
    },
    {
        color: "violet",
        index: "03",
        name: "Brand & Positioning",
        desc: "Develop a clear marketing direction that reflects your business.",
        image: "/images/marketing/brand-positioning.jpg",
    },
    {
        color: "gold",
        index: "04",
        name: "Content & Communication",
        desc: "Align messaging and content with your audience and marketing goals.",
        image: "/images/marketing/content-communication.jpg",
    },
    {
        color: "mint",
        index: "05",
        name: "Digital Presence",
        desc: "Support your presence across websites, social platforms, and digital channels.",
        image: "/images/marketing/digital-presence.jpg",
    },
    {
        color: "flame",
        index: "06",
        name: "Performance & Optimization",
        desc: "Review results and identify areas for improvement over time.",
        image: "/images/marketing/performance-optimization.jpg",
    },
];

/* ---- 2. What We Focus On ---- */
const focusAreas = [
    {
        name: "Market Understanding",
        desc: "Research audiences, competitors, and market trends to identify opportunities.",
        color: "coral",
        icon: Search,
    },
    {
        name: "Strategic Direction",
        desc: "Build marketing plans around the company's goals and target customers.",
        color: "sky",
        icon: Compass,
    },
    {
        name: "Consistent Execution",
        desc: "Coordinate marketing activities across relevant channels and touchpoints.",
        color: "violet",
        icon: Workflow,
    },
    {
        name: "Continuous Improvement",
        desc: "Use performance data to refine campaigns and marketing decisions.",
        color: "mint",
        icon: RefreshCw,
    },
];

/* ---- 3. Marketing Objectives ---- */
const objectives = [
    {
        name: "Build Brand Awareness",
        desc: "Increase visibility and establish a stronger market presence.",
        color: "coral",
        icon: Eye,
    },
    {
        name: "Reach the Right Audience",
        desc: "Connect marketing activities with relevant customer segments.",
        color: "sky",
        icon: Crosshair,
    },
    {
        name: "Generate Opportunities",
        desc: "Support lead generation, customer acquisition, and business growth.",
        color: "gold",
        icon: Sparkles,
    },
    {
        name: "Improve Engagement",
        desc: "Create meaningful interactions between brands and their audiences.",
        color: "violet",
        icon: Heart,
    },
];

/* ---- 4. What You Get ---- */
const deliverables = [
    { name: "Marketing strategy", desc: "A clear, structured plan built around your business goals.", color: "coral", icon: FileText },
    { name: "Market & competitor insights", desc: "A grounded read on where you stand and where the openings are.", color: "sky", icon: Search },
    { name: "Campaign plans", desc: "Concrete plans for how each campaign runs, start to finish.", color: "gold", icon: ClipboardList },
    { name: "Channel recommendations", desc: "Which channels are worth your budget, and why.", color: "violet", icon: Layers },
    { name: "Content direction", desc: "Messaging and content guidance aligned to your audience and goals.", color: "mint", icon: PenSquare },
    { name: "Performance reports", desc: "Regular, readable reporting on what's actually working.", color: "flame", icon: LineChart },
    { name: "Optimization recommendations", desc: "Specific adjustments to keep results improving over time.", color: "coral", icon: SlidersHorizontal },
];

/* ---- 5. Performance Tracking ---- */
const metrics = [
    { name: "Reach", desc: "Audience visibility and brand exposure.", color: "coral", icon: Eye },
    { name: "Engagement", desc: "How audiences interact with marketing content.", color: "gold", icon: Heart },
    { name: "Traffic", desc: "Website and campaign traffic generated.", color: "sky", icon: Globe },
    { name: "Leads", desc: "Potential customers generated through marketing activities.", color: "mint", icon: UserPlus },
    { name: "Conversions", desc: "Actions that contribute directly to business objectives.", color: "violet", icon: CheckCircle2 },
];

/* ---------- SECTIONS ---------- */

/* 1. Marketing Focus Areas — a photo bento. Each tile is a real image
   with a duotone accent tint, a two-digit position in the sequence, and
   a caption that reveals on hover (the lead tile stays open). */
export function MarketingFocusAreas() {
    return (
        <section className="mk-section">
            <h2 className="mk-heading">Marketing focus areas</h2>
            <motion.div
                className="mk-bento-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {focusAreaImages.map((m) => {
                    const sw = SWATCH[m.color];
                    return (
                        <motion.div
                            key={m.name}
                            variants={cardVariants}
                            className="mk-bento-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <img src={m.image} alt={m.name} className="mk-bento-img" loading="lazy" />
                            <span className="mk-bento-tint" style={{ background: `rgb(${sw.rgb})` }} />
                            <span className="mk-bento-scrim" />
                            <span className="mk-bento-sweep" />
                            <span className="mk-bento-tag">{m.index}</span>
                            <div className="mk-bento-copy">
                                <h3 className="mk-bento-name">{m.name}</h3>
                                <p className="mk-bento-desc">{m.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 2. What We Focus On — a divided strip: four columns separated by
   hairline rules, each with a small decorative level meter. */
export function FocusAreas() {
    return (
        <section className="mk-section">
            <h2 className="mk-heading">What we focus on</h2>
            <motion.div
                className="mk-focus-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {focusAreas.map((f, i) => {
                    const Icon = f.icon;
                    const sw = SWATCH[f.color];
                    const bars = EQ_PATTERNS[i % EQ_PATTERNS.length];
                    return (
                        <motion.div
                            key={f.name}
                            variants={cardVariants}
                            className="mk-focus-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <div className="mk-focus-eq">
                                {bars.map((h, bi) => (
                                    <span key={bi} style={{ height: `${h}px` }} />
                                ))}
                            </div>
                            <span className="mk-focus-icon">
                                <Icon size={16} strokeWidth={2} />
                            </span>
                            <h3 className="mk-focus-name">{f.name}</h3>
                            <p className="mk-focus-desc">{f.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 3. Marketing Objectives — each icon sits inside a dial ring (a tick
   bezel built from a repeating conic gradient), like a tuned-in target. */
export function MarketingObjectives() {
    return (
        <section className="mk-section">
            <h2 className="mk-heading">Marketing objectives</h2>
            <motion.div
                className="mk-objective-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {objectives.map((o) => {
                    const Icon = o.icon;
                    const sw = SWATCH[o.color];
                    return (
                        <motion.div
                            key={o.name}
                            variants={cardVariants}
                            className="mk-objective-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span className="mk-objective-ring">
                                <span className="mk-objective-icon">
                                    <Icon size={19} strokeWidth={2} />
                                </span>
                            </span>
                            <h3 className="mk-objective-name">{o.name}</h3>
                            <p className="mk-objective-desc">{o.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 4. What You Get — a numbered list connected by a dashed line: these
   seven deliverables are handed over roughly in this order, so the
   index is informational, not decorative. */
export function WhatYouGet() {
    return (
        <section className="mk-section">
            <h2 className="mk-heading">What you get</h2>
            <motion.div
                className="mk-deliver-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                <span className="mk-deliver-line" />
                {deliverables.map((d, i) => {
                    const Icon = d.icon;
                    const sw = SWATCH[d.color];
                    return (
                        <motion.div
                            key={d.name}
                            variants={cardVariants}
                            className="mk-deliver-row"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span className="mk-deliver-node">
                                <Icon size={16} strokeWidth={2} />
                            </span>
                            <div className="mk-deliver-body">
                                <span className="mk-deliver-idx">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="mk-deliver-name">{d.name}</h3>
                                <p className="mk-deliver-desc">{d.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 5. Performance Tracking — each metric gets a small static level meter
   instead of an icon-in-a-gradient-chip, tying the card to the idea of
   something being measured. */
export function PerformanceTracking() {
    return (
        <section className="mk-section">
            <h2 className="mk-heading">Performance tracking</h2>
            <p className="mk-subheading">Marketing isn&apos;t just about launching campaigns.</p>
            <motion.div
                className="mk-metric-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {metrics.map((m, i) => {
                    const Icon = m.icon;
                    const sw = SWATCH[m.color];
                    const bars = METER_PATTERNS[i % METER_PATTERNS.length];
                    return (
                        <motion.div
                            key={m.name}
                            variants={cardVariants}
                            className="mk-metric-card"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span className="mk-metric-meter">
                                {bars.map((h, bi) => (
                                    <span key={bi} style={{ height: `${h}px` }} />
                                ))}
                            </span>
                            <div>
                                <h3 className="mk-metric-name">{m.name}</h3>
                                <p className="mk-metric-desc">{m.desc}</p>
                            </div>
                            <Icon size={14} strokeWidth={2} style={{ marginLeft: "auto", flexShrink: 0, color: `rgb(${sw.rgb})`, opacity: 0.7 }} />
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* ---------- COMBINED WRAPPER ---------- */
export default function MarketingSections() {
    return (
        <>
            <MarketingFocusAreas />
            <FocusAreas />
            <MarketingObjectives />
            <WhatYouGet />
            <PerformanceTracking />
        </>
    );
}