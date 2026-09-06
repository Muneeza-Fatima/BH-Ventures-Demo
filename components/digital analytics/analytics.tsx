"use client";

import React, { useState } from "react";
import "./analytics.css";

/* ---------- DATA ---------- */

const metrics = [
    {
        color: "teal",
        label: "ACQUISITION",
        name: "CAC by channel",
        desc: "What it actually costs to win a customer, broken out by source.",
    },
    {
        color: "amber",
        label: "RETURN",
        name: "ROAS & blended ROI",
        desc: "Return on ad spend per channel, plus the blended number leadership cares about.",
    },
    {
        color: "purple",
        label: "VALUE",
        name: "Customer LTV",
        desc: "Lifetime value by cohort, so acquisition cost is judged against the right horizon.",
    },
    {
        color: "pink",
        label: "CONVERSION",
        name: "Funnel conversion rate",
        desc: "Where prospects drop off, from first click to closed sale.",
    },
    {
        color: "teal",
        label: "MIX",
        name: "Channel & spend mix",
        desc: "How budget is split today, versus where it's actually earning its keep.",
    },
    {
        color: "amber",
        label: "RETENTION",
        name: "Repeat purchase rate",
        desc: "How well you're keeping the customers you already paid to acquire.",
    },
];

const questions = [
    {
        q: "Which channels are actually driving profitable growth?",
        a: "Attribution modeling separates the channels doing real work from the ones riding on someone else's traffic.",
    },
    {
        q: "Where is marketing spend being wasted?",
        a: "Cross-channel data makes it obvious where cost per result has quietly crept up.",
    },
    {
        q: "Are we improving month over month, or just busy?",
        a: "A consistent reporting cadence turns activity into a trend line leadership can actually read.",
    },
    {
        q: "What should we do more of, and what should we stop?",
        a: "KPI dashboards built around decisions, not vanity metrics, make the next move obvious.",
    },
];

const kpis = [
    { label: "REVENUE", value: "$418K", delta: "▲ 12.4%", up: true },
    { label: "BLENDED ROAS", value: "4.1x", delta: "▲ 0.6x", up: true },
    { label: "CAC", value: "$38", delta: "▲ $3", up: false },
    { label: "CONVERSION", value: "3.2%", delta: "▲ 0.4pt", up: true },
];

const barHeights = [38, 52, 44, 61, 58, 73, 69, 84, 78, 91, 88, 100];

const channels = [
    { name: "Paid social", pct: 36 },
    { name: "Email / CRM", pct: 27 },
    { name: "Organic search", pct: 19 },
    { name: "Paid search", pct: 12 },
    { name: "Other", pct: 6 },
];

const deliverables = [
    { name: "Live dashboard access", cadence: "Always on" },
    { name: "Written performance report", cadence: "Monthly" },
    { name: "Attribution & spend review", cadence: "Monthly" },
    { name: "Direct line for questions", cadence: "Ongoing" },
    { name: "Quarterly strategy check-in", cadence: "Quarterly" },
];

/* ---------- SECTIONS ---------- */

export function WhatWeMeasure() {
    return (
        <section className="da-section">
            <h2 className="da-heading">What we measure</h2>
            <div className="da-metric-grid">
                {metrics.map((m, i) => (
                    <div
                        className="da-metric-card"
                        key={m.name}
                        style={{ animationDelay: `${i * 70}ms` }}
                    >
                        <span className={`da-chip da-chip-${m.color}`}>✓</span>
                        <div className="da-metric-label">{m.label}</div>
                        <div className="da-metric-name">{m.name}</div>
                        <p className="da-metric-desc">{m.desc}</p>
                    </div>
                ))}
            </div>
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
                    return (
                        <div
                            className={`da-qa-row ${isOpen ? "da-qa-open" : ""}`}
                            key={item.q}
                        >
                            <button
                                className="da-qa-question"
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen}
                            >
                                <span>{item.q}</span>
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
    return (
        <section className="da-section">
            <h2 className="da-heading">Sample dashboard</h2>
            <div className="da-dash">
                <div className="da-dash-top">
                    <span className="da-dash-title">GROWTH OVERVIEW — ALL CHANNELS</span>
                    <span className="da-dash-range">LAST 30 DAYS</span>
                </div>

                <div className="da-kpi-row">
                    {kpis.map((k) => (
                        <div className="da-kpi" key={k.label}>
                            <div className="da-kpi-label">{k.label}</div>
                            <div className="da-kpi-value">{k.value}</div>
                            <div className={`da-kpi-delta ${k.up ? "da-up" : "da-down"}`}>
                                {k.delta}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="da-chart-block">
                    <div className="da-bars-wrap">
                        <div className="da-bars">
                            {barHeights.map((h, i) => (
                                <div
                                    className="da-bar"
                                    style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
                                    key={i}
                                />
                            ))}
                        </div>
                        <div className="da-bars-caption">
                            <span>WEEK 1</span>
                            <span>WEEK 6</span>
                            <span>WEEK 12</span>
                        </div>
                    </div>

                    <div className="da-channel-list">
                        {channels.map((c, i) => (
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
            <p className="da-dash-caption">
                Illustrative view — every dashboard is rebuilt around your own KPIs,
                channels, and reporting cadence.
            </p>
        </section>
    );
}

export function WhatYouReceive() {
    return (
        <section className="da-section">
            <h2 className="da-heading">What you receive</h2>
            <div className="da-receive-list">
                {deliverables.map((d, i) => (
                    <div
                        className="da-receive-row"
                        key={d.name}
                        style={{ animationDelay: `${i * 70}ms` }}
                    >
                        <span className="da-receive-name">{d.name}</span>
                        <span className="da-receive-cadence">{d.cadence}</span>
                    </div>
                ))}
            </div>
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