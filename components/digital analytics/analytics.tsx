"use client";

import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import {
    Radar,
    FileText,
    PieChart,
    MessageCircle,
    Compass,
    TrendingUp,
    AlertTriangle,
    LineChart,
    Target,
    DollarSign,
    Users,
    Filter,
    Repeat,
    type LucideIcon,
} from "lucide-react";
import "./analytics.css";

/* ---------- MOTION VARIANTS (matching Home Page OurCapabilities) ---------- */
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



/* ---------- DATA ---------- */

const COLOR_RGB: Record<string, string> = {
    teal: "45, 212, 191",
    amber: "245, 166, 35",
    purple: "139, 92, 246",
    pink: "236, 72, 153",
    blue: "56, 189, 248",
};

const metrics: {
    color: string;
    label: string;
    name: string;
    desc: string;
    icon: LucideIcon;
    /** Photo shown in place of the description text below the title.
     *  Swap these paths for your own images — falls back to the desc
     *  text above if left blank. */
    photo?: string;
}[] = [
        {
            color: "teal",
            label: "ACQUISITION",
            name: "CAC by channel",
            desc: "What it actually costs to win a customer, broken out by source.",
            icon: DollarSign,
            photo: "/images/analytics/cac-by-channel.jpg",
        },
        {
            color: "amber",
            label: "RETURN",
            name: "ROAS & blended ROI",
            desc: "Return on ad spend per channel, plus the blended number leadership cares about.",
            icon: TrendingUp,
            photo: "/images/analytics/roas-blended-roi.jpg",
        },
        {
            color: "purple",
            label: "VALUE",
            name: "Customer LTV",
            desc: "Lifetime value by cohort, so acquisition cost is judged against the right horizon.",
            icon: Users,
            photo: "/images/analytics/customer-ltv.jpg",
        },
        {
            color: "pink",
            label: "CONVERSION",
            name: "Funnel conversion rate",
            desc: "Where prospects drop off, from first click to closed sale.",
            icon: Filter,
            photo: "/images/analytics/funnel-conversion.jpg",
        },
        {
            color: "teal",
            label: "MIX",
            name: "Channel & spend mix",
            desc: "How budget is split today, versus where it's actually earning its keep.",
            icon: PieChart,
            photo: "/images/analytics/channel-spend-mix.jpg",
        },
        {
            color: "amber",
            label: "RETENTION",
            name: "Repeat purchase rate",
            desc: "How well you're keeping the customers you already paid to acquire.",
            icon: Repeat,
            photo: "/images/analytics/repeat-purchase.jpg",
        },
    ];

const questions = [
    {
        q: "Which channels are actually driving profitable growth?",
        a: "Attribution modeling separates the channels doing real work from the ones riding on someone else's traffic.",
        color: "teal",
        icon: TrendingUp,
    },
    {
        q: "Where is marketing spend being wasted?",
        a: "Cross-channel data makes it obvious where cost per result has quietly crept up.",
        color: "amber",
        icon: AlertTriangle,
    },
    {
        q: "Are we improving month over month, or just busy?",
        a: "A consistent reporting cadence turns activity into a trend line leadership can actually read.",
        color: "purple",
        icon: LineChart,
    },
    {
        q: "What should we do more of, and what should we stop?",
        a: "KPI dashboards built around decisions, not vanity metrics, make the next move obvious.",
        color: "pink",
        icon: Target,
    },
];

const dashboards = [
    {
        title: "GROWTH OVERVIEW — ALL CHANNELS",
        range: "LAST 30 DAYS",
        accent: "#2dd4bf",
        accentRgb: "45, 212, 191",
        accent2: "#8b5cf6",
        accent2Rgb: "139, 92, 246",
        kpis: [
            { label: "REVENUE", value: "$418K", delta: "▲ 12.4%", up: true },
            { label: "BLENDED ROAS", value: "4.1x", delta: "▲ 0.6x", up: true },
            { label: "CAC", value: "$38", delta: "▲ $3", up: false },
            { label: "CONVERSION", value: "3.2%", delta: "▲ 0.4pt", up: true },
        ],
        barHeights: [38, 52, 44, 61, 58, 73, 69, 84, 78, 91, 88, 100],
        barCaption: ["WEEK 1", "WEEK 6", "WEEK 12"],
        listLabel: "Channel mix",
        items: [
            { name: "Paid social", pct: 36 },
            { name: "Email / CRM", pct: 27 },
            { name: "Organic search", pct: 19 },
            { name: "Paid search", pct: 12 },
            { name: "Other", pct: 6 },
        ],
    },
    {
        title: "ATTRIBUTION BREAKDOWN",
        range: "LAST 90 DAYS",
        accent: "#f5a623",
        accentRgb: "245, 166, 35",
        accent2: "#ec4899",
        accent2Rgb: "236, 72, 153",
        kpis: [
            { label: "ASSISTED CONVERSIONS", value: "1,240", delta: "▲ 8.1%", up: true },
            { label: "FIRST-TOUCH REV.", value: "$162K", delta: "▲ 5.2%", up: true },
            { label: "LAST-TOUCH REV.", value: "$256K", delta: "▲ 9.7%", up: true },
            { label: "MULTI-TOUCH WEIGHT", value: "41%", delta: "▲ 3pt", up: true },
        ],
        barHeights: [45, 50, 42, 55, 60, 58, 66, 70, 68, 75, 80, 85],
        barCaption: ["MONTH 1", "MONTH 2", "MONTH 3"],
        listLabel: "Attribution by channel",
        items: [
            { name: "Paid social", pct: 31 },
            { name: "Organic search", pct: 24 },
            { name: "Email / CRM", pct: 22 },
            { name: "Paid search", pct: 15 },
            { name: "Direct", pct: 8 },
        ],
    },
    {
        title: "RETENTION & LTV",
        range: "TRAILING 12 MONTHS",
        accent: "#38bdf8",
        accentRgb: "56, 189, 248",
        accent2: "#34d399",
        accent2Rgb: "52, 211, 153",
        kpis: [
            { label: "REPEAT PURCHASE RATE", value: "34%", delta: "▲ 2.5pt", up: true },
            { label: "AVG. LTV", value: "$612", delta: "▲ $41", up: true },
            { label: "CHURN RATE", value: "4.8%", delta: "▼ 0.6pt", up: true },
            { label: "90-DAY RETENTION", value: "61%", delta: "▲ 4pt", up: true },
        ],
        barHeights: [100, 82, 74, 68, 64, 61, 59, 57, 56, 55, 54, 53],
        barCaption: ["MONTH 1", "MONTH 6", "MONTH 12"],
        listLabel: "Retention by cohort",
        items: [
            { name: "Month 1", pct: 82 },
            { name: "Month 3", pct: 68 },
            { name: "Month 6", pct: 59 },
            { name: "Month 9", pct: 55 },
            { name: "Month 12", pct: 53 },
        ],
    },
];

const deliverables: {
    name: string;
    cadence: string;
    color: string;
    icon: LucideIcon;
    desc: string;
    /** Background photo for the bento card (e.g. "/images/analytics/dashboard.jpg"). */
    image: string;
}[] = [
        {
            name: "Live dashboard access",
            cadence: "Always on",
            color: "teal",
            icon: Radar,
            desc: "Log in any time and see revenue, spend, and conversion move in real time — no waiting on a report.",
            image: "/images/analytics/dashboard-access.jpg",
        },
        {
            name: "Written performance report",
            cadence: "Monthly",
            color: "amber",
            icon: FileText,
            desc: "A plain-language summary of what moved, why, and what we're doing about it.",
            image: "/images/analytics/performance-report.jpg",
        },
        {
            name: "Attribution & spend review",
            cadence: "Monthly",
            color: "purple",
            icon: PieChart,
            desc: "Where every dollar actually went, and what it actually returned.",
            image: "/images/analytics/attribution-review.jpg",
        },
        {
            name: "Direct line for questions",
            cadence: "Ongoing",
            color: "pink",
            icon: MessageCircle,
            desc: "No ticket queue — ask and get a real answer from someone who knows your account.",
            image: "/images/analytics/direct-line.jpg",
        },
        {
            name: "Quarterly strategy check-in",
            cadence: "Quarterly",
            color: "blue",
            icon: Compass,
            image: "/images/analytics/strategy-checkin.jpg",
            desc: "A step back from the day-to-day to reset priorities against the bigger goal.",
        },
    ];

/* ---------- SECTIONS ---------- */

export function WhatWeMeasure() {
    return (
        <section className="da-section">
            <h2 className="da-heading">What we measure</h2>
            <motion.div
                className="da-metric-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {metrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <motion.div
                            key={m.name}
                            variants={cardVariants}
                            whileHover={{
                                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="da-metric-card-v2"
                            style={{ "--m-rgb": COLOR_RGB[m.color] } as CSSProperties}
                        >
                            <div className="da-metric-v2-top">
                                <span className="da-metric-v2-icon">
                                    <Icon size={20} strokeWidth={2} />
                                </span>
                                <span className="da-metric-v2-pill">{m.label}</span>
                            </div>
                            <div className="da-metric-v2-name">{m.name}</div>
                            {m.photo ? (
                                <div className="da-metric-v2-photo-wrap">
                                    <img
                                        className="da-metric-v2-photo"
                                        src={m.photo}
                                        alt={m.desc}
                                    />
                                </div>
                            ) : (
                                <p className="da-metric-v2-desc">{m.desc}</p>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* Accordion: click a question, its answer expands. Only one open at a time. */
export function QuestionsWeAnswer() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (i: number) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="da-section">
            <h2 className="da-heading">Questions we help answer</h2>
            <div className="da-qa-list">
                {questions.map((item, i) => {
                    const isOpen = openIndex === i;
                    const Icon = item.icon;
                    return (
                        <div
                            className={`da-qa-row ${isOpen ? "da-qa-open" : ""}`}
                            key={item.q}
                            style={{ "--q-rgb": COLOR_RGB[item.color] } as CSSProperties}
                        >
                            <button
                                className="da-qa-question"
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen}
                            >
                                <span className="da-qa-question-text">
                                    <span className="da-qa-icon-bubble">
                                        <Icon size={18} strokeWidth={2} />
                                    </span>
                                    <span>{item.q}</span>
                                </span>
                                <span className="da-qa-icon" aria-hidden="true">
                                    +
                                </span>
                            </button>
                            <div className="da-qa-answer-wrap">
                                <p className="da-qa-answer">{item.a}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function SampleDashboard() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const scrollToIndex = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        const clamped = (i + dashboards.length) % dashboards.length;
        el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
        setActive(clamped);
    };

    const handleScroll = () => {
        const el = trackRef.current;
        if (!el || el.clientWidth === 0) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setActive(i);
    };

    // Auto-advance: continuously cycle through the dashboards on a timer.
    // Pauses while the user is hovering/touching the carousel so it never
    // fights a manual swipe, and resumes once they move away.
    useEffect(() => {
        if (isPaused) return;

        const id = setInterval(() => {
            setActive((prev) => {
                const next = (prev + 1) % dashboards.length;
                const el = trackRef.current;
                if (el) {
                    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
                }
                return next;
            });
        }, 2000);

        return () => clearInterval(id);
    }, [isPaused]);

    // Manual arrow/dot clicks should also reset the timer so it doesn't
    // jump again right after someone just navigated by hand.
    const goTo = (i: number) => {
        setIsPaused(true);
        scrollToIndex(i);
        setTimeout(() => setIsPaused(false), 3000);
    };

    return (
        <section className="da-section">
            <h2 className="da-heading">Sample dashboards</h2>

            <div
                className="da-dash-carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <button
                    type="button"
                    className="da-dash-arrow da-dash-arrow-left"
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous dashboard"
                >
                    ‹
                </button>

                <div
                    className="da-dash-track"
                    ref={trackRef}
                    onScroll={handleScroll}
                >
                    {dashboards.map((d) => (
                        <div className="da-dash-slide" key={d.title}>
                            <div
                                className="da-dash"
                                style={
                                    {
                                        "--d-accent": d.accent,
                                        "--d-accent-rgb": d.accentRgb,
                                        "--d-accent2": d.accent2,
                                        "--d-accent2-rgb": d.accent2Rgb,
                                    } as CSSProperties
                                }
                            >
                                <div className="da-dash-top">
                                    <span className="da-dash-title">{d.title}</span>
                                    <span className="da-dash-range">{d.range}</span>
                                </div>

                                <div className="da-kpi-row">
                                    {d.kpis.map((k) => (
                                        <div className="da-kpi" key={k.label}>
                                            <div className="da-kpi-label">{k.label}</div>
                                            <div className="da-kpi-value">{k.value}</div>
                                            <div
                                                className={`da-kpi-delta ${k.up ? "da-up" : "da-down"
                                                    }`}
                                            >
                                                {k.delta}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="da-chart-block">
                                    <div className="da-bars-wrap">
                                        <div className="da-bars">
                                            {d.barHeights.map((h, i) => (
                                                <div
                                                    className="da-bar"
                                                    style={{
                                                        height: `${h}%`,
                                                        animationDelay: `${i * 60}ms`,
                                                    }}
                                                    key={i}
                                                />
                                            ))}
                                        </div>
                                        <div className="da-bars-caption">
                                            {d.barCaption.map((c) => (
                                                <span key={c}>{c}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="da-channel-list">
                                        <div className="da-channel-list-label">{d.listLabel}</div>
                                        {d.items.map((c, i) => (
                                            <div
                                                className="da-channel-row"
                                                key={c.name}
                                                style={{ animationDelay: `${i * 90}ms` }}
                                            >
                                                <span className="da-channel-name">{c.name}</span>
                                                <div className="da-channel-track">
                                                    <div
                                                        className="da-channel-fill"
                                                        style={{ width: `${c.pct * 2}%` }}
                                                    />
                                                </div>
                                                <span className="da-channel-pct">{c.pct}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="da-dash-arrow da-dash-arrow-right"
                    onClick={() => goTo(active + 1)}
                    aria-label="Next dashboard"
                >
                    ›
                </button>
            </div>

            <div className="da-dash-dots">
                {dashboards.map((d, i) => (
                    <button
                        type="button"
                        key={d.title}
                        className={`da-dash-dot ${i === active ? "da-dash-dot-active" : ""
                            }`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to ${d.title.toLowerCase()}`}
                    />
                ))}
            </div>

            <p className="da-dash-caption">
                Illustrative views — every dashboard is rebuilt around your own KPIs,
                channels, and reporting cadence.
            </p>
        </section>
    );
}

export function WhatYouReceive() {
    return (
        <section className="da-section">
            <h2 className="da-heading">What you receive</h2>
            <motion.div
                className="da-receive-grid"
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
                            className="da-receive-card"
                            style={{ "--r-rgb": COLOR_RGB[d.color] } as CSSProperties}
                        >
                            <img
                                src={d.image}
                                alt=""
                                className="da-receive-img"
                                loading="lazy"
                            />
                            <span className="da-receive-tint" />
                            <span className="da-receive-scrim" />
                            <span className="da-receive-icon">
                                <Icon size={17} strokeWidth={2.25} />
                            </span>
                            <div className="da-receive-copy">
                                <span className="da-receive-cadence">{d.cadence}</span>
                                <h3 className="da-receive-name">{d.name}</h3>
                                <p className="da-receive-desc">{d.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* ---------- OPTIONAL: combined wrapper ---------- */

export default function MissingSections() {
    return (
        <>
            <WhatWeMeasure />
            <SampleDashboard />
            <QuestionsWeAnswer />
            <WhatYouReceive />
        </>
    );
}