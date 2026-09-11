"use client";

import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Briefcase,
    Box,
    Factory,
    Sparkles,
    Users,
    Handshake,
    Globe,
    MapPin,
    Users2,
    Truck,
    Footprints,
    Settings2,
    ClipboardCheck,
    CalendarClock,
    Activity,
    UserPlus,
    LayoutGrid,
    BookOpen,
    CalendarCheck,
    ListChecks,
    MessageSquare,
    LifeBuoy,
    ClipboardList,
    FileText,
} from "lucide-react";
import "./exhibition.css";

/* ---------- MOTION VARIANTS ---------- */
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 26 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

/* ---------- COLOR SYSTEM ---------- */
type Swatch = { rgb: string; grad: string };

const SWATCH: Record<string, Swatch> = {
    gold: { rgb: "251, 191, 36", grad: "linear-gradient(135deg, #fde68a, #b45309)" },
    violet: { rgb: "167, 139, 250", grad: "linear-gradient(135deg, #c4b5fd, #7c3aed)" },
    teal: { rgb: "45, 212, 191", grad: "linear-gradient(135deg, #5eead4, #0f766e)" },
    crimson: { rgb: "251, 113, 133", grad: "linear-gradient(135deg, #fda4af, #be123c)" },
    blue: { rgb: "56, 189, 248", grad: "linear-gradient(135deg, #7dd3fc, #0369a1)" },
    green: { rgb: "52, 211, 153", grad: "linear-gradient(135deg, #6ee7b7, #047857)" },
};

/* ---- 1. Event Types (now a photo grid) ----
   Image paths are placeholders — drop real photos in at these paths. */
const eventTypes = [
    { name: "Trade exhibitions", color: "gold", icon: Building2, image: "/images/exhibition/trade-exhibitions.png" },
    { name: "Business & corporate events", color: "violet", icon: Briefcase, image: "/images/exhibition/corporate-events.png" },
    { name: "Product showcases", color: "teal", icon: Box, image: "/images/exhibition/product-showcases.png" },
    { name: "Industry exhibitions", color: "crimson", icon: Factory, image: "/images/exhibition/industry-exhibitions.png" },
    { name: "Brand activations", color: "blue", icon: Sparkles, image: "/images/exhibition/brand-activations.png" },
    { name: "Networking events", color: "green", icon: Users, image: "/images/exhibition/networking-events.png" },
    { name: "B2B exhibitions", color: "gold", icon: Handshake, image: "/images/exhibition/b2b-exhibitions.png" },
    { name: "Public exhibitions", color: "violet", icon: Globe, image: "/images/exhibition/public-exhibitions.png" },
];

/* ---- 2. What We Manage (the recommended ⭐ version) ---- */
const manageAreas = [
    { name: "Venue & Layout", desc: "Coordinate spaces, floor plans, booth placement, and venue requirements.", color: "gold", icon: MapPin },
    { name: "Exhibitors", desc: "Coordinate exhibitor information, requirements, schedules, and communication.", color: "violet", icon: Users2 },
    { name: "Logistics", desc: "Manage setup requirements, equipment, materials, deliveries, and event logistics.", color: "teal", icon: Truck },
    { name: "Attendee Experience", desc: "Support registration, information points, navigation, and smooth visitor flow.", color: "crimson", icon: Footprints },
    { name: "On-Site Operations", desc: "Coordinate event-day activities and respond to operational issues.", color: "blue", icon: Settings2 },
    { name: "Post-Event Review", desc: "Document attendance, feedback, outcomes, and lessons for future events.", color: "green", icon: ClipboardCheck },
];

/* ---- 3. Event Experience (now a photo strip) ---- */
const experiencePhases = [
    {
        name: "Before the Event",
        desc: "Planning, communication, scheduling, and preparation.",
        color: "gold",
        icon: CalendarClock,
        image: "/images/exhibition/before-the-event.png",
    },
    {
        name: "During the Event",
        desc: "Smooth coordination, attendee support, and on-site management.",
        color: "teal",
        icon: Activity,
        image: "/images/exhibition/during-the-event.png",
    },
    {
        name: "After the Event",
        desc: "Feedback collection, performance review, and reporting.",
        color: "violet",
        icon: ClipboardCheck,
        image: "/images/exhibition/after-the-event.png",
    },
];

/* ---- 4. Exhibitor Support ---- */
const exhibitorSupport = [
    { name: "Exhibitor onboarding", color: "gold", icon: UserPlus },
    { name: "Booth allocation", color: "violet", icon: LayoutGrid },
    { name: "Exhibitor guidelines", color: "teal", icon: BookOpen },
    { name: "Setup schedules", color: "crimson", icon: CalendarCheck },
    { name: "Requirement coordination", color: "blue", icon: ListChecks },
    { name: "Exhibitor communication", color: "green", icon: MessageSquare },
    { name: "On-site support", color: "gold", icon: LifeBuoy },
];

/* ---- 5. Event Planning Checklist (horizontal timeline) ---- */
const planningSteps = [
    { name: "Venue", icon: MapPin },
    { name: "Layout", icon: LayoutGrid },
    { name: "Exhibitors", icon: Users2 },
    { name: "Logistics", icon: Truck },
    { name: "Registration", icon: ClipboardList },
    { name: "Operations", icon: Settings2 },
    { name: "Reporting", icon: FileText },
];

/* ---------- SECTIONS ---------- */

/* 1. Event Types — equal-size photo grid (8 tiles, always fills cleanly:
   4 cols x 2 rows on desktop, 2 cols x 4 rows on tablet). */
export function EventTypes() {
    return (
        <section className="ex-section">
            <h2 className="ex-heading">Event types</h2>
            <motion.div
                className="ex-photo-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {eventTypes.map((e) => {
                    const Icon = e.icon;
                    const sw = SWATCH[e.color];
                    return (
                        <motion.div
                            key={e.name}
                            variants={cardVariants}
                            className="ex-photo-tile"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            {/* TODO: replace with a real photo at this path */}
                            <img src={e.image} alt="" className="ex-photo-img" loading="lazy" />
                            <span className="ex-photo-scrim" />
                            <span className="ex-photo-icon" style={{ backgroundImage: sw.grad }}>
                                <Icon size={14} strokeWidth={2.25} />
                            </span>
                            <span className="ex-photo-label">{e.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 2. What We Manage — a full-width photo banner with floating glass cards,
   instead of a plain grid on a flat background. */
export function WhatWeManage() {
    return (
        <section className="ex-section">
            <h2 className="ex-heading">What we manage</h2>
            <div className="ex-banner-wrap">
                {/* TODO: replace with a real photo — an exhibition hall / booth
                    setup shot works well here */}
                <img
                    src="/images/exhibition/exhibition-hall.png"
                    alt=""
                    className="ex-banner-img"
                    loading="lazy"
                />
                <span className="ex-banner-scrim" />
                <motion.div
                    className="ex-manage-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {manageAreas.map((m) => {
                        const Icon = m.icon;
                        const sw = SWATCH[m.color];
                        return (
                            <motion.div
                                key={m.name}
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                                }}
                                className="ex-manage-card"
                                style={{ "--c-rgb": sw.rgb } as CSSProperties}
                            >
                                <span className="ex-manage-icon" style={{ backgroundImage: sw.grad }}>
                                    <Icon size={18} strokeWidth={2} />
                                </span>
                                <h3 className="ex-manage-name">{m.name}</h3>
                                <p className="ex-manage-desc">{m.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* 3. Event Experience — three photo panels side by side */
export function EventExperience() {
    return (
        <section className="ex-section">
            <h2 className="ex-heading">Event experience</h2>
            <motion.div
                className="ex-strip"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {experiencePhases.map((p) => {
                    const Icon = p.icon;
                    const sw = SWATCH[p.color];
                    return (
                        <motion.div
                            key={p.name}
                            variants={cardVariants}
                            className="ex-strip-panel"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            {/* TODO: replace with a real photo at this path */}
                            <img src={p.image} alt="" className="ex-strip-img" loading="lazy" />
                            <span className="ex-strip-tint" style={{ backgroundImage: sw.grad }} />
                            <span className="ex-strip-scrim" />
                            <span className="ex-strip-icon" style={{ backgroundImage: sw.grad }}>
                                <Icon size={20} strokeWidth={2} />
                            </span>
                            <div className="ex-strip-copy">
                                <h3 className="ex-strip-name">{p.name}</h3>
                                <p className="ex-strip-desc">{p.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 4. Exhibitor Support — refined checklist, left accent bar instead of a
   full bordered box (kept text-only; a support list doesn't gain much
   from photos, so this stays distinct from the imagery-heavy sections) */
export function ExhibitorSupport() {
    return (
        <section className="ex-section">
            <h2 className="ex-heading">Exhibitor support</h2>
            <motion.div
                className="ex-support-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {exhibitorSupport.map((s) => {
                    const Icon = s.icon;
                    const sw = SWATCH[s.color];
                    return (
                        <motion.div
                            key={s.name}
                            variants={cardVariants}
                            className="ex-support-item"
                            style={{ "--c-rgb": sw.rgb } as CSSProperties}
                        >
                            <Icon size={15} strokeWidth={2.25} className="ex-support-icon" />
                            <span className="ex-support-label">{s.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}

/* 5. Event Planning Checklist — horizontal timeline over a faint photo band */
export function EventPlanningChecklist() {
    return (
        <section className="ex-section">
            <h2 className="ex-heading">Event planning checklist</h2>
            <div className="ex-timeline-wrap">
                {/* TODO: replace with a real photo — a wide, low-detail shot
                    (empty hall, floor plan, setup-in-progress) works best here
                    since it sits behind the timeline at low opacity */}
                <img
                    src="/images/exhibition/planning-checklist-backdrop.png"
                    alt=""
                    className="ex-timeline-bg"
                    loading="lazy"
                />
                <span className="ex-timeline-scrim" />
                <motion.div
                    className="ex-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <span className="ex-timeline-line" />
                    {planningSteps.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div key={s.name} variants={cardVariants} className="ex-timeline-node">
                                <span className="ex-timeline-dot">
                                    <Icon size={15} strokeWidth={2.25} />
                                </span>
                                <span className="ex-timeline-num">{i + 1}</span>
                                <span className="ex-timeline-label">{s.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ---------- COMBINED WRAPPER ---------- */
export default function ExhibitionSections() {
    return (
        <>
            <WhatWeManage />
            <EventTypes />
            <EventExperience />
            <ExhibitorSupport />
            <EventPlanningChecklist />
        </>
    );
}