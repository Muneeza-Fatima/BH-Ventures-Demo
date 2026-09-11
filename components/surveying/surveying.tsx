"use client";

import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
    Smile,
    TrendingUp,
    MessageSquare,
    Eye,
    Crosshair,
    Heart,
    Lightbulb,
    CalendarCheck,
    ClipboardList,
    Search,
    Briefcase,
    MessageSquareText,
    HelpCircle,
    ListChecks,
    Users,
    LineChart,
    FileText,
    PenSquare,
    Database,
    BarChart3,
    Sparkles,
    PieChart,
    AlertTriangle,
    CheckCircle2,
    Scale,
} from "lucide-react";
import "./surveying.css";

/* ---------- SMALL HAND-DRAWN MARKS (stand in for photography) ---------- */

/** A pushpin, used to "attach" a card to the wall. */
function Pin({ color = "#c1543c" }: { color?: string }) {
    return (
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
            <circle cx="7" cy="6" r="5.5" fill={color} stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
            <path d="M7 11 L7 17" stroke="rgba(0,0,0,0.35)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="5.2" cy="4.3" r="1.1" fill="rgba(255,255,255,0.55)" />
        </svg>
    );
}

/* ---------- MOTION VARIANTS ---------- */

// Cards settle onto the wall like they're being pinned down, rather than
// a generic fade-up — small rotation overshoot then rest.
const pinContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const pinVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.94, rotate: -3 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

/* ---------- COLOR SYSTEM ---------- */
type Swatch = { rgb: string };

const SWATCH: Record<string, Swatch> = {
    teal: { rgb: "79, 179, 164" },
    blue: { rgb: "96, 149, 214" },
    cyan: { rgb: "62, 168, 189" },
    indigo: { rgb: "141, 132, 214" },
    emerald: { rgb: "76, 158, 116" },
    amber: { rgb: "232, 185, 63" },
    rust: { rgb: "193, 84, 60" },
};

/* fixed slight rotations so the layout doesn't jitter between renders */
const ROTATIONS = [-1.4, 1.1, -0.8, 1.6, 0.6, -1.2];
const rot = (i: number) => ROTATIONS[i % ROTATIONS.length];

/* ---- 1. What We Can Evaluate ---- */
const evaluateItems = [
    { name: "Customer satisfaction", color: "teal", icon: Smile },
    { name: "Market demand", color: "blue", icon: TrendingUp },
    { name: "Product & service feedback", color: "cyan", icon: MessageSquare },
    { name: "Brand perception", color: "indigo", icon: Eye },
    { name: "Competitor positioning", color: "emerald", icon: Crosshair },
    { name: "Customer preferences", color: "amber", icon: Heart },
    { name: "Business opportunities", color: "teal", icon: Lightbulb },
    { name: "Event & campaign feedback", color: "blue", icon: CalendarCheck },
];

/* ---- 2. Research Types ---- */
const researchTypes = [
    {
        tag: "CX",
        name: "Customer Surveys",
        desc: "Understand customer needs, preferences, satisfaction, and expectations.",
        color: "teal",
        icon: ClipboardList,
    },
    {
        tag: "MKT",
        name: "Market Research",
        desc: "Explore market conditions, demand, trends, and competitive positioning.",
        color: "blue",
        icon: Search,
    },
    {
        tag: "BIZ",
        name: "Business Evaluations",
        desc: "Assess business ideas, services, initiatives, or commercial opportunities.",
        color: "indigo",
        icon: Briefcase,
    },
    {
        tag: "FDBK",
        name: "Feedback Studies",
        desc: "Collect structured feedback to identify strengths, weaknesses, and areas for improvement.",
        color: "emerald",
        icon: MessageSquareText,
    },
];

/* ---- 3. Our Approach ---- */
const approachSteps = [
    {
        step: "01",
        name: "Define the Question",
        desc: "Establish exactly what the research needs to answer.",
        icon: HelpCircle,
    },
    {
        step: "02",
        name: "Choose the Method",
        desc: "Select an appropriate survey, evaluation, or data-collection approach.",
        icon: ListChecks,
    },
    {
        step: "03",
        name: "Reach Relevant Respondents",
        desc: "Gather information from audiences relevant to the research objective.",
        icon: Users,
    },
    {
        step: "04",
        name: "Interpret the Findings",
        desc: "Turn collected data into understandable insights and practical conclusions.",
        icon: LineChart,
    },
];

/* ---- 4. What You Receive ---- */
const receiveItems = [
    { name: "Survey methodology", icon: FileText },
    { name: "Questionnaire design", icon: PenSquare },
    { name: "Data collection framework", icon: Database },
    { name: "Response analysis", icon: BarChart3 },
    { name: "Key findings", icon: Sparkles },
    { name: "Charts & visual summaries", icon: PieChart },
    { name: "Limitations & considerations", icon: AlertTriangle },
    { name: "Actionable recommendations", icon: CheckCircle2 },
];

/* ---- 5. From Data to Decisions ---- */
const decisionFlow = [
    {
        name: "Customer Understanding",
        desc: "Discover preferences, expectations, and satisfaction levels.",
        color: "teal",
        icon: Users,
    },
    {
        name: "Market Insights",
        desc: "Identify trends, opportunities, and competitive considerations.",
        color: "blue",
        icon: TrendingUp,
    },
    {
        name: "Idea Validation",
        desc: "Use structured feedback to assess potential products, services, or initiatives.",
        color: "cyan",
        icon: CheckCircle2,
    },
    {
        name: "Improvement Opportunities",
        desc: "Highlight areas where businesses can improve their customer experience or offering.",
        color: "amber",
        icon: Sparkles,
    },
    {
        name: "Evidence-Based Decisions",
        desc: "Turn research findings into clear insights that support better business decisions.",
        color: "rust",
        icon: Scale,
        final: true,
    },
];

/* ---------- SECTIONS ---------- */

/* 1. What We Can Evaluate — field-note tags, each pinned to the wall at
   a slight, fixed angle; hovering lifts the tag straight and forward. */
export function WhatWeEvaluate() {
    return (
        <section className="sv-section">
            <h2 className="sv-heading">What we can evaluate</h2>
            <motion.div
                className="sv-check-grid"
                variants={pinContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {evaluateItems.map((item, i) => {
                    const Icon = item.icon;
                    const sw = SWATCH[item.color];
                    return (
                        <motion.div
                            key={item.name}
                            variants={pinVariant}
                            className="sv-check-item sv-paper"
                            style={{ "--c-rgb": sw.rgb, transform: `rotate(${rot(i)}deg)` } as CSSProperties}
                        >
                            <span className="sv-check-box">
                                <Icon size={13} strokeWidth={2.25} />
                            </span>
                            <span className="sv-check-label">{item.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 2. Research Types — case-file folders: a paper tab, a short case code
   instead of a fake step number, and an ink-stamp icon mark. */
export function ResearchTypes() {
    return (
        <section className="sv-section">
            <h2 className="sv-heading">Research types</h2>
            <motion.div
                className="sv-index-grid"
                variants={pinContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {researchTypes.map((r) => {
                    const Icon = r.icon;
                    const sw = SWATCH[r.color];
                    return (
                        <motion.div
                            key={r.name}
                            variants={pinVariant}
                            className="sv-index-card sv-paper"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <span style={{ position: "absolute", top: -13, left: 16 }}>
                                <Pin color={`rgb(${sw.rgb})`} />
                            </span>
                            <span className="sv-index-tag">{r.tag}</span>
                            <span className="sv-index-icon">
                                <Icon size={18} strokeWidth={2} />
                            </span>
                            <h3 className="sv-index-name">{r.name}</h3>
                            <p className="sv-index-desc">{r.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 3. Our Approach — a dashed "chain of custody" thread linking four
   numbered stops, each stamped onto a small paper disc. */
export function OurApproach() {
    return (
        <section className="sv-section">
            <h2 className="sv-heading">Our approach</h2>
            <motion.div
                className="sv-flow"
                variants={pinContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <span className="sv-flow-line" />
                {approachSteps.map((s) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={s.name} variants={pinVariant} className="sv-flow-step">
                            <span className="sv-flow-node">
                                <Icon size={17} strokeWidth={2} />
                                <span className="sv-flow-num">{s.step}</span>
                            </span>
                            <h3 className="sv-flow-name">{s.name}</h3>
                            <p className="sv-flow-desc">{s.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 4. What You Receive — an itemized ledger sheet with a perforated top
   and bottom edge, like a torn-off receipt of deliverables. */
export function WhatYouReceive() {
    return (
        <section className="sv-section">
            <h2 className="sv-heading">What you receive</h2>
            <motion.div
                className="sv-manifest-sheet sv-paper"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="sv-manifest"
                    variants={pinContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {receiveItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.name}
                                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
                                className="sv-manifest-row"
                            >
                                <span className="sv-manifest-num">{String(i + 1).padStart(2, "0")}</span>
                                <Icon size={14} strokeWidth={2} className="sv-manifest-icon" />
                                <span className="sv-manifest-name">{item.name}</span>
                                <span className="sv-manifest-leader" />
                                <CheckCircle2 size={15} strokeWidth={2.25} className="sv-manifest-check" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}

/* 5. From Data to Decisions — a threaded thumbnail run ending in an
   ink-stamped "APPROVED" seal that stamps down once it's reached. */
export function DataToDecisions() {
    return (
        <section className="sv-section">
            <h2 className="sv-heading">From data to decisions</h2>
            <p className="sv-subheading">What the research can help you decide.</p>
            <motion.div
                className="sv-pipeline"
                variants={pinContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {decisionFlow.map((d, i) => {
                    const Icon = d.icon;
                    const sw = SWATCH[d.color];
                    return (
                        <React.Fragment key={d.name}>
                            <motion.div
                                variants={pinVariant}
                                className={`sv-pipeline-card sv-paper${d.final ? " sv-pipeline-card--final" : ""}`}
                                style={{ "--c-rgb": sw.rgb } as CSSProperties}
                            >
                                <span className="sv-pipeline-icon">
                                    <Icon size={17} strokeWidth={2} />
                                </span>
                                <h3 className="sv-pipeline-name">{d.name}</h3>
                                <p className="sv-pipeline-desc">{d.desc}</p>
                                {d.final && (
                                    <motion.span
                                        className="sv-stamp"
                                        initial={{ opacity: 0, scale: 1.8, rotate: -12 }}
                                        whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ duration: 0.35, delay: 0.65, ease: "easeOut" }}
                                    >
                                        EVIDENCE
                                        <br />
                                        BASED
                                    </motion.span>
                                )}
                            </motion.div>
                            {i < decisionFlow.length - 1 && <span className="sv-pipeline-thread" aria-hidden="true" />}
                        </React.Fragment>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* ---------- COMBINED WRAPPER ---------- */
export default function SurveyingSections() {
    return (
        <>
            <WhatWeEvaluate />
            <ResearchTypes />
            <OurApproach />
            <WhatYouReceive />
            <DataToDecisions />
        </>
    );
}