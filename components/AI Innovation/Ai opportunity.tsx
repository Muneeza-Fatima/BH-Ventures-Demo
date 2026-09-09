"use client";

import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import {
    Settings2,
    MessagesSquare,
    BarChart3,
    Lightbulb,
    Users,
    Zap,
    Target,
    CheckCircle2,
    Database,
    ShieldAlert,
    Clock,
    Wallet,
    FileText,
    ListOrdered,
    ClipboardCheck,
    Compass,
    Map,
    AlertOctagon,
    Gauge,
    ArrowRight,
} from "lucide-react";
import "./ai-opportunity.css";

/* ---------- MOTION VARIANTS ---------- */
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

/* ---------- COLOR SYSTEM ----------
   Bold two-tone gradients (new palette — distinct from the teal/amber/
   purple/pink/blue set used elsewhere). `rgb` drives the glow/shadow tint,
   `grad` is the actual gradient painted on chips, borders, and washes. */
type Swatch = { rgb: string; grad: string; from: string; to: string };

const SWATCH: Record<string, Swatch> = {
    indigo: { rgb: "99, 102, 241", grad: "linear-gradient(135deg, #818cf8, #4f46e5)", from: "#818cf8", to: "#4f46e5" },
    fuchsia: { rgb: "217, 70, 239", grad: "linear-gradient(135deg, #e879f9, #a21caf)", from: "#e879f9", to: "#a21caf" },
    cyan: { rgb: "34, 211, 238", grad: "linear-gradient(135deg, #67e8f9, #0891b2)", from: "#67e8f9", to: "#0891b2" },
    lime: { rgb: "163, 230, 53", grad: "linear-gradient(135deg, #bef264, #65a30d)", from: "#bef264", to: "#65a30d" },
    orange: { rgb: "251, 146, 60", grad: "linear-gradient(135deg, #fdba74, #ea580c)", from: "#fdba74", to: "#ea580c" },
    rose: { rgb: "251, 113, 133", grad: "linear-gradient(135deg, #fda4af, #e11d48)", from: "#fda4af", to: "#e11d48" },
};

/* Still used by the untouched Journey / What You Get sections below */
const COLOR_RGB: Record<string, string> = {
    teal: "45, 212, 191",
    amber: "245, 166, 35",
    purple: "139, 92, 246",
    pink: "236, 72, 153",
    blue: "56, 189, 248",
};

/* ---- AI Opportunity Areas ---- */
const opportunityAreas = [
    {
        color: "orange",
        label: "CUSTOMER EXPERIENCE",
        name: "Customer Experience",
        desc: "Explore AI-powered chat, personalization, support, and engagement.",
        icon: MessagesSquare,
        image: "/images/ai-innovation/customer-experience.jpg",
    },
    {
        color: "indigo",
        label: "OPERATIONS",
        name: "Operations",
        desc: "Identify repetitive processes that could benefit from AI or automation.",
        icon: Settings2,
        image: "/images/ai-innovation/operations.jpg",
    },
    {
        color: "fuchsia",
        label: "DATA & ANALYTICS",
        name: "Data & Analytics",
        desc: "Assess opportunities for predictive analytics, intelligent reporting, and decision support.",
        icon: BarChart3,
        image: "/images/ai-innovation/data-analytics.jpg",
    },
    {
        color: "rose",
        label: "PRODUCT",
        name: "Product Innovation",
        desc: "Identify AI features that could strengthen existing or future products.",
        icon: Lightbulb,
        image: "/images/ai-innovation/product-innovation.jpg",
    },
    {
        color: "cyan",
        label: "INTERNAL",
        name: "Internal Productivity",
        desc: "Find practical ways teams can use AI to reduce repetitive work.",
        icon: Users,
        image: "/images/ai-innovation/internal-productivity.jpg",
    },
    {
        color: "lime",
        label: "AUTOMATION",
        name: "Automation",
        desc: "Evaluate workflows where AI and automation can improve efficiency.",
        icon: Zap,
        image: "/images/ai-innovation/automation.jpg",
    },
];

/* ---- Evaluation Framework ---- */
const evaluationCriteria = [
    {
        q: "Impact",
        sub: "How much value does this create?",
        a: "We size the upside if the use-case works as intended, in terms leadership actually tracks: cost, time, revenue, or risk avoided.",
        weight: "High weight",
        percent: 90,
        color: "indigo",
        icon: Target,
    },
    {
        q: "Feasibility",
        sub: "Can this be built with what we have?",
        a: "We check it against the data, tools, integrations, and skills already available before assuming anything needs to be bought or hired.",
        weight: "High weight",
        percent: 85,
        color: "orange",
        icon: CheckCircle2,
    },
    {
        q: "Data readiness",
        sub: "Is the underlying data usable?",
        a: "Accuracy, access, and volume are checked directly. A promising use-case with unusable data gets flagged, not glossed over.",
        weight: "Medium weight",
        percent: 60,
        color: "fuchsia",
        icon: Database,
    },
    {
        q: "Risk",
        sub: "What happens when it's wrong?",
        a: "We estimate how often the system will fail and what that failure costs, so the risk is priced in before launch, not after.",
        weight: "Medium weight",
        percent: 60,
        color: "rose",
        icon: ShieldAlert,
    },
    {
        q: "Time to value",
        sub: "How long until it pays off?",
        a: "A rough timeline from kickoff to a measurable result, so quick wins aren't buried behind bigger, slower bets.",
        weight: "Medium weight",
        percent: 55,
        color: "cyan",
        icon: Clock,
    },
    {
        q: "Cost to sustain",
        sub: "What does it take to keep running?",
        a: "Ongoing maintenance, monitoring, and retraining costs are counted now, not discovered a year into production.",
        weight: "Lower weight",
        percent: 35,
        color: "lime",
        icon: Wallet,
    },
];

/* ---- Where You Are in Your AI Journey ---- */
const journeyStages = [
    {
        index: "01",
        name: "Explore",
        accent: "#2dd4bf",
        accentRgb: "45, 212, 191",
        icon: Compass,
        description: "You have an idea but aren't sure where AI fits.",
        signs: [
            "No confirmed use-case yet",
            "Curious where AI could realistically help",
            "Need a starting point, not a build plan",
        ],
        next: "Next: a short assessment to find real opportunity areas.",
    },
    {
        index: "02",
        name: "Validate",
        accent: "#f5a623",
        accentRgb: "245, 166, 35",
        icon: ClipboardCheck,
        description: "You have potential use-cases and want to test their feasibility.",
        signs: [
            "A shortlist of possible use-cases",
            "Unsure which ones would actually work",
            "Want proof before committing budget",
        ],
        next: "Next: feasibility testing against your real data and systems.",
    },
    {
        index: "03",
        name: "Prioritize",
        accent: "#8b5cf6",
        accentRgb: "139, 92, 246",
        icon: ListOrdered,
        description: "You have multiple opportunities and need to know what comes first.",
        signs: [
            "More opportunities than resources",
            "Need a defensible way to rank them",
            "Ready to commit to one or two",
        ],
        next: "Next: scoring against the evaluation framework to force-rank options.",
    },
    {
        index: "04",
        name: "Plan",
        accent: "#ec4899",
        accentRgb: "236, 72, 153",
        icon: Map,
        description: "You know what you want to build and need a practical roadmap.",
        signs: [
            "A validated, prioritized use-case",
            "Need a step-by-step path to delivery",
            "Ready to move into implementation",
        ],
        next: "Next: a roadmap covering effort, complexity, and rollout order.",
    },
];

/* ---- What You Get ---- */
const deliverables = [
    {
        name: "AI opportunity report",
        cadence: "Core deliverable",
        color: "teal",
        icon: FileText,
        desc: "A clear account of where AI can realistically add value across your organization.",
    },
    {
        name: "Prioritized use-case list",
        cadence: "Core deliverable",
        color: "amber",
        icon: ListOrdered,
        desc: "Every opportunity ranked against the same criteria, so the order is a comparison, not a guess.",
    },
    {
        name: "Feasibility assessment",
        cadence: "Core deliverable",
        color: "purple",
        icon: Gauge,
        desc: "An honest read on whether each use-case can actually be built with what's available today.",
    },
    {
        name: "Technology recommendations",
        cadence: "Included",
        color: "pink",
        icon: Settings2,
        desc: "Specific tools and approaches suited to your use-cases — not a generic vendor list.",
    },
    {
        name: "Implementation roadmap",
        cadence: "Core deliverable",
        color: "blue",
        icon: Map,
        desc: "A practical, sequenced plan for building and rolling out the prioritized use-cases.",
    },
    {
        name: "Risk & limitation overview",
        cadence: "Included",
        color: "teal",
        icon: AlertOctagon,
        desc: "Where each recommendation could fail or fall short, stated plainly up front.",
    },
    {
        name: "Estimated effort and complexity",
        cadence: "Included",
        color: "amber",
        icon: Gauge,
        desc: "A realistic sense of what each use-case will take to deliver, before work begins.",
    },
    {
        name: "Next-step recommendations",
        cadence: "Included",
        color: "purple",
        icon: ArrowRight,
        desc: "The concrete next action for each opportunity, so the report doesn't end in a shrug.",
    },
];

/* ---------- SECTIONS ---------- */

export function OpportunityAreas() {
    return (
        <section className="ai-section">
            <h2 className="ai-heading">Where AI tends to pay off</h2>
            <motion.div
                className="ai-bento-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {opportunityAreas.map((m) => {
                    const Icon = m.icon;
                    const sw = SWATCH[m.color];
                    return (
                        <motion.div
                            key={m.name}
                            variants={cardVariants}
                            className="ai-bento-card"
                            style={{ "--m-rgb": sw.rgb } as CSSProperties}
                        >
                            <img
                                src={m.image}
                                alt=""
                                className="ai-bento-img"
                                loading="lazy"
                            />
                            <span className="ai-bento-tint" style={{ backgroundImage: sw.grad }} />
                            <span className="ai-bento-scrim" />
                            <span className="ai-bento-icon" style={{ backgroundImage: sw.grad }}>
                                <Icon size={17} strokeWidth={2.25} />
                            </span>
                            <div className="ai-bento-copy">
                                <span className="ai-bento-label">{m.label}</span>
                                <h3 className="ai-bento-name">{m.name}</h3>
                                <p className="ai-bento-desc">{m.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* SVG ring gauge: circumference for r=32 is 2*PI*32 ≈ 201.06 */
const RING_R = 32;
const RING_C = 2 * Math.PI * RING_R;

export function EvaluationFramework() {
    return (
        <section className="ai-section">
            <h2 className="ai-heading">How we score every use-case</h2>
            <motion.div
                className="ai-score-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {evaluationCriteria.map((item, i) => {
                    const Icon = item.icon;
                    const sw = SWATCH[item.color];
                    const offset = RING_C - (item.percent / 100) * RING_C;
                    const gradId = `ai-ring-grad-${i}`;
                    return (
                        <motion.div
                            key={item.q}
                            variants={cardVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                            }}
                            className="ai-score-card"
                            style={{ "--q-rgb": sw.rgb, "--q-grad": sw.grad } as CSSProperties}
                        >
                            <div className="ai-score-ring-wrap">
                                <svg viewBox="0 0 80 80" className="ai-score-ring-svg">
                                    <defs>
                                        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={sw.from} />
                                            <stop offset="100%" stopColor={sw.to} />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r={RING_R}
                                        className="ai-score-ring-track"
                                        fill="none"
                                        strokeWidth="7"
                                    />
                                    <circle
                                        cx="40"
                                        cy="40"
                                        r={RING_R}
                                        fill="none"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                        stroke={`url(#${gradId})`}
                                        strokeDasharray={RING_C}
                                        strokeDashoffset={offset}
                                        transform="rotate(-90 40 40)"
                                        className="ai-score-ring-fill"
                                    />
                                </svg>
                                <span className="ai-score-ring-icon" style={{ backgroundImage: sw.grad }}>
                                    <Icon size={16} strokeWidth={2.25} />
                                </span>
                            </div>

                            <span className="ai-score-weight">{item.weight}</span>
                            <h3 className="ai-score-title">{item.q}</h3>
                            <p className="ai-score-sub">{item.sub}</p>
                            <p className="ai-score-answer">{item.a}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

export function YourJourney() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const scrollToIndex = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        const clamped = (i + journeyStages.length) % journeyStages.length;
        el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
        setActive(clamped);
    };

    const handleScroll = () => {
        const el = trackRef.current;
        if (!el || el.clientWidth === 0) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setActive(i);
    };

    useEffect(() => {
        if (isPaused) return;

        const id = setInterval(() => {
            setActive((prev) => {
                const next = (prev + 1) % journeyStages.length;
                const el = trackRef.current;
                if (el) {
                    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
                }
                return next;
            });
        }, 3200);

        return () => clearInterval(id);
    }, [isPaused]);

    const goTo = (i: number) => {
        setIsPaused(true);
        scrollToIndex(i);
        setTimeout(() => setIsPaused(false), 4000);
    };

    return (
        <section className="ai-section">
            <h2 className="ai-heading">Where you are in your AI journey</h2>

            <div
                className="ai-dash-carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <button
                    type="button"
                    className="ai-dash-arrow ai-dash-arrow-left"
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous stage"
                >
                    ‹
                </button>

                <div className="ai-dash-track" ref={trackRef} onScroll={handleScroll}>
                    {journeyStages.map((stage) => {
                        const Icon = stage.icon;
                        return (
                            <div className="ai-dash-slide" key={stage.name}>
                                <div
                                    className="ai-dash"
                                    style={
                                        {
                                            "--d-accent": stage.accent,
                                            "--d-accent-rgb": stage.accentRgb,
                                        } as CSSProperties
                                    }
                                >
                                    <div className="ai-dash-top">
                                        <span className="ai-dash-title">
                                            <span className="ai-dash-index">{stage.index}</span>
                                            {stage.name}
                                        </span>
                                        <span className="ai-dash-icon">
                                            <Icon size={20} strokeWidth={2} />
                                        </span>
                                    </div>

                                    <p className="ai-dash-desc">{stage.description}</p>

                                    <div className="ai-signs-list">
                                        {stage.signs.map((sign, i) => (
                                            <div
                                                className="ai-signs-row"
                                                key={sign}
                                                style={{ animationDelay: `${i * 90}ms` }}
                                            >
                                                <CheckCircle2
                                                    size={15}
                                                    strokeWidth={2.25}
                                                    className="ai-signs-check"
                                                />
                                                <span>{sign}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="ai-dash-caption">{stage.next}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className="ai-dash-arrow ai-dash-arrow-right"
                    onClick={() => goTo(active + 1)}
                    aria-label="Next stage"
                >
                    ›
                </button>
            </div>

            <div className="ai-dash-dots">
                {journeyStages.map((stage, i) => (
                    <button
                        type="button"
                        key={stage.name}
                        className={`ai-dash-dot ${i === active ? "ai-dash-dot-active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to ${stage.name.toLowerCase()}`}
                    />
                ))}
            </div>
        </section>
    );
}

export function WhatYouGet() {
    return (
        <section className="ai-section">
            <h2 className="ai-heading">What you get</h2>
            <div className="ai-receive-wrap">
                <div className="ai-receive-banner" />
                <motion.div
                    className="ai-receive-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {deliverables.map((d) => {
                        const Icon = d.icon;
                        return (
                            <motion.div
                                key={d.name}
                                variants={cardVariants}
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="ai-receive-card"
                                data-tier={d.cadence === "Core deliverable" ? "core" : "included"}
                                style={{ "--r-rgb": COLOR_RGB[d.color] } as CSSProperties}
                            >
                                <div className="ai-receive-card-top">
                                    <span className="ai-receive-icon">
                                        <Icon size={20} strokeWidth={2} />
                                    </span>
                                    <span className="ai-receive-cadence">{d.cadence}</span>
                                </div>
                                <div className="ai-receive-name">{d.name}</div>
                                <p className="ai-receive-desc">{d.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ---------- COMBINED WRAPPER ---------- */
export default function AIOpportunitySections() {
    return (
        <>
            <OpportunityAreas />
            <EvaluationFramework />
            <YourJourney />
            <WhatYouGet />
        </>
    );
}