"use client";

import {
    useState,
    useEffect,
    Fragment,
    FormEvent,
    ReactNode,
    CSSProperties,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
// Note: ReactNode is still used below by ProcessStep.icon (SVG icons for the
// "How we work" section), which are unchanged — only FocusArea now uses images.
import "./web3.css";

/* ---------- MOTION VARIANTS ---------- */
const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.09,
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

const aboutCardVariant: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const licenseVariant: Variants = {
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

const cardVariant: Variants = {
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

const processDetailVariant: Variants = {
    hidden: { opacity: 0, scale: 0.97, y: -6 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.97,
        y: -6,
        transition: {
            duration: 0.22,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const modalOverlayVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 12,
        transition: {
            duration: 0.2,
        },
    },
};

interface EngagementStage {
    slug: string;
    name: string;
    tagline: string;
    detail: string;
    color: string; // hex, used for this card's accent
    rgb: string; // same color as "r, g, b" for rgba()
    icon: ReactNode;
}

const ENGAGEMENT_STAGES: EngagementStage[] = [
    {
        slug: "idea",
        name: "Idea Stage",
        tagline: "Concept, not yet validated",
        detail: "You have a direction but need the concept stress-tested against the current ecosystem before committing resources.",
        color: "#2fd9c4",
        rgb: "47, 217, 196",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6" />
                <path d="M10 21h4" />
                <path d="M12 3a6 6 0 00-3.6 10.8c.5.4.8 1 .8 1.7V16h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0012 3z" />
            </svg>
        ),
    },
    {
        slug: "mvp",
        name: "MVP / Early Build",
        tagline: "Something exists, needs direction",
        detail: "You've started building and need product strategy, positioning, or partner introductions to move toward launch.",
        color: "#f2b84b",
        rgb: "242, 184, 75",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M8 21h8" />
                <path d="M9 17l0 4" />
                <path d="M15 17l0 4" />
                <path d="M7 9l3 3-3 3" />
                <path d="M13 14h4" />
            </svg>
        ),
    },
    {
        slug: "scaling",
        name: "Scaling",
        tagline: "Live, looking to grow",
        detail: "You're live and need support on go-to-market, ecosystem coordination, or structuring the next phase of growth.",
        color: "#8c7cf0",
        rgb: "140, 124, 240",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
            </svg>
        ),
    },
];

// Replaces the old "Sectors we work in" chip list (DeFi / NFT / DAO Tooling /
// Infrastructure / GameFi / RWA / Other). That list appears nowhere in the
// internal briefing and the brief explicitly requires prior approval + sign-off
// before publishing any "focus areas" copy. These four terms are safe to use
// because they're pulled verbatim from the already-approved definition text
// above ("blockchain, decentralised technologies, digital assets, and related
// infrastructure") rather than asserting a new, unapproved sector taxonomy.
interface FocusArea {
    slug: string;
    label: string;
    // Path to the image file for this card. Drop your own files in
    // /public/images/web3/ (or wherever your project's public assets live)
    // and update these paths — nothing else needs to change.
    image: string;
}

const FOCUS_AREAS: FocusArea[] = [
    {
        slug: "blockchain",
        label: "Blockchain",
        image: "/images/web3/blockchain.png",
    },
    {
        slug: "decentralised-tech",
        label: "Decentralised Technology",
        image: "/images/web3/decentralised.png",
    },
    {
        slug: "digital-assets",
        label: "Digital Assets",
        image: "/images/web3/assets.png",
    },
    {
        slug: "infrastructure",
        label: "Infrastructure",
        image: "/images/web3/infrastructure.png",
    },
];

// Building process. Steps below follow the 5-stage "Discover → Scale"
// sequence requested explicitly by the client. Note: "Validate" and "Scale"
// go beyond the four activities named in the internal briefing (identify /
// assemble / develop / guide) — flag for sign-off per the brief's "Notes for
// the website section" before this goes live.
interface ProcessStep {
    slug: string;
    num: string;
    name: string;
    line: string;
    description: string;
    color: string; // hex, used for the card's border ring / glow / icon
    rgb: string; // same color as "r, g, b" for use in rgba()
    icon: ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        slug: "discover",
        num: "01",
        name: "Discover",
        line: "Find the signal",
        description:
            "We look at the Web3 space — blockchain, decentralised technologies, digital assets, and related infrastructure — to identify opportunities worth building around.",
        color: "#2fd9c4",
        rgb: "47, 217, 196",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <line x1="20" y1="20" x2="15.3" y2="15.3" />
            </svg>
        ),
    },
    {
        slug: "validate",
        num: "02",
        name: "Validate",
        line: "Prove the case",
        description:
            "We pressure-test the market, the need, and the technical direction before committing serious resources.",
        color: "#f2b84b",
        rgb: "242, 184, 75",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 9-7 9-7-9 7-9z" />
            </svg>
        ),
    },
    {
        slug: "build",
        num: "03",
        name: "Build",
        line: "Ship the product",
        description:
            "We assemble the specialised talent needed and develop the product or protocol itself, working alongside the venture rather than handing off a spec.",
        color: "#8c7cf0",
        rgb: "140, 124, 240",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.5l1.8 4.6 4.7 1.9-4.7 1.9L12 15.5l-1.8-4.6-4.7-1.9 4.7-1.9L12 2.5z" />
                <path d="M19 15.5l0.9 2.2 2.2 0.9-2.2 0.9-0.9 2.2-0.9-2.2-2.2-0.9 2.2-0.9 0.9-2.2z" />
            </svg>
        ),
    },
    {
        slug: "launch",
        num: "04",
        name: "Launch",
        line: "Win the first users",
        description:
            "We guide the venture through its early stages, providing support and resources under one roof as it goes to market.",
        color: "#f0609b",
        rgb: "240, 96, 155",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
            </svg>
        ),
    },
    {
        slug: "scale",
        num: "05",
        name: "Scale",
        line: "Compound growth",
        description:
            "We stay involved as the venture grows, so the support it had from day one carries through past the early stages.",
        color: "#4baef2",
        rgb: "75, 174, 242",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="12" r="2.6" />
                <circle cx="17" cy="12" r="2.6" />
            </svg>
        ),
    },
];

// Replace with your real WhatsApp Business number, digits only, country code first (no +, no spaces).
const WHATSAPP_NUMBER = "971XXXXXXXXX";

interface Web3QuoteModalProps {
    stage: EngagementStage | null;
    onClose: () => void;
}

function Web3QuoteModal({ stage: initialStage, onClose }: Web3QuoteModalProps) {
    const [selectedSlug, setSelectedSlug] = useState(initialStage?.slug ?? "");
    const selectedStageData = ENGAGEMENT_STAGES.find((s) => s.slug === selectedSlug);

    // lock page scroll while the modal is open — same fix used in
    // AutomobileExtras / DatesSection
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const project = (form.elements.namedItem("project") as HTMLInputElement).value;
        const focus = (form.elements.namedItem("focus") as HTMLInputElement).value;
        const timeline = (form.elements.namedItem("timeline") as HTMLInputElement).value;
        const budget = (form.elements.namedItem("budget") as HTMLInputElement).value;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const contact = (form.elements.namedItem("contact") as HTMLInputElement).value;

        const lines = [
            "Hi, I'd like to talk about a Web3 venture:",
            project && `Project: ${project}`,
            selectedStageData && `Stage: ${selectedStageData.name}`,
            focus && `What we're building: ${focus}`,
            timeline && `Timeline: ${timeline}`,
            budget && `Budget range: ${budget}`,
            `Name: ${name}`,
            `Contact: ${contact}`,
        ].filter(Boolean);

        const message = encodeURIComponent(lines.join("\n"));
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");

        onClose();
    }

    return (
        <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="web3-quote-overlay"
            onClick={onClose}
        >
            <motion.div
                variants={modalContentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="web3-quote-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="web3-quote-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <h3 className="web3-quote-title">Tell us about your venture</h3>
                <p className="web3-quote-sub">
                    Share where you're at and what you're building — we&apos;ll get back to
                    you to talk through the next step.
                </p>

                <form className="web3-quote-form" onSubmit={handleSubmit}>
                    <label className="web3-quote-field">
                        Project Name
                        <input
                            type="text"
                            name="project"
                            placeholder="What are you building?"
                        />
                    </label>

                    <label className="web3-quote-field">
                        Stage
                        <select
                            name="stage"
                            value={selectedSlug}
                            onChange={(e) => setSelectedSlug(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a stage
                            </option>
                            {ENGAGEMENT_STAGES.map((s) => (
                                <option key={s.slug} value={s.slug}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="web3-quote-field">
                        What space are you building in?
                        <input
                            type="text"
                            name="focus"
                            placeholder="e.g. on-chain payments, tokenised assets…"
                        />
                    </label>

                    <label className="web3-quote-field">
                        Timeline
                        <input
                            type="text"
                            name="timeline"
                            placeholder="e.g. Launching in 3 months"
                        />
                    </label>

                    <label className="web3-quote-field">
                        Budget Range
                        <input
                            type="text"
                            name="budget"
                            placeholder="e.g. $10k – $30k"
                        />
                    </label>

                    <label className="web3-quote-field">
                        Your Name
                        <input type="text" name="name" required placeholder="Your name" />
                    </label>

                    <label className="web3-quote-field">
                        Phone or Email
                        <input type="text" name="contact" required placeholder="you@example.com" />
                    </label>

                    <button type="submit" className="web3-quote-submit web3-sheen">
                        Send via WhatsApp
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default function Web3Extras() {
    const [selectedStage, setSelectedStage] = useState<EngagementStage | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProcessSlug, setActiveProcessSlug] = useState<string | null>(null);

    // Mirrors the grid-template-columns breakpoints in web3.css
    // (base = 2 cols, >=640px = 3, >=900px = 5). We need the live column count
    // so the detail panel can be injected at the end of the clicked card's row
    // instead of after the whole grid.
    const [processColumns, setProcessColumns] = useState(2);

    useEffect(() => {
        const wide = window.matchMedia("(min-width: 900px)");
        const mid = window.matchMedia("(min-width: 640px)");

        const update = () => setProcessColumns(wide.matches ? 5 : mid.matches ? 3 : 2);
        update();

        wide.addEventListener("change", update);
        mid.addEventListener("change", update);
        return () => {
            wide.removeEventListener("change", update);
            mid.removeEventListener("change", update);
        };
    }, []);

    const activeProcessIndex = PROCESS_STEPS.findIndex((s) => s.slug === activeProcessSlug);
    const activeProcessStep = activeProcessIndex >= 0 ? PROCESS_STEPS[activeProcessIndex] : null;

    // Index of the last card sitting in the same row as the active card. The
    // detail panel is rendered straight after that card, so it always opens
    // directly underneath the row you clicked in.
    const detailAfterIndex =
        activeProcessIndex < 0
            ? -1
            : Math.min(
                Math.floor(activeProcessIndex / processColumns) * processColumns +
                processColumns -
                1,
                PROCESS_STEPS.length - 1
            );

    function openModal(stage: EngagementStage | null) {
        setSelectedStage(stage);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setSelectedStage(null);
    }

    return (
        <>
            {/* ---------- ABOUT (service-focused overview, matches SERVICES copy) ---------- */}
            <motion.section
                className="web3-about"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={aboutCardVariant} className="web3-about-card web3-sheen">
                    <span className="web3-about-quote-mark" aria-hidden="true">&ldquo;</span>
                    <span className="web3-about-eyebrow">Overview</span>
                    <div className="web3-about-body">
                        <p>
                            <span className="web3-about-dropcap">W</span>
                            e help founders and innovation teams take Web3 concepts
                            from early ideation through ecosystem research, product
                            strategy, and partner coordination, structured,
                            research-driven venture building, not hype.
                        </p>
                        <p>
                            That includes concept validation and ecosystem research,
                            product and tokenomics strategy, partner and ecosystem
                            coordination, and launch planning support, hands-on help
                            at every stage, from first idea to market.
                        </p>
                    </div>
                </motion.div>
            </motion.section>

            {/* ---------- LICENSED ACTIVITY NOTE ---------- */}
            <motion.div
                variants={licenseVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="web3-license web3-sheen"
            >
                <span className="web3-license-text">
                    <strong>Web3 Venture Studio</strong> is listed as one of the licensed
                    activities of BH Ventures FZE - LLC.
                </span>
                <span className="web3-license-source">Source: Trade-license activities extract (supplied)</span>
            </motion.div>

            {/* ---------- ENGAGEMENT STAGES ---------- */}
            <motion.section
                className="web3-stages"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    Tell us where you&apos;re at
                </motion.h2>
                <motion.p variants={headingVariants} className="web3-stages-intro">
                    Every venture walks in at a different point — pick the stage
                    closest to yours and we&apos;ll meet you there.
                </motion.p>
                <motion.div variants={containerVariants} className="web3-stages-grid">
                    {ENGAGEMENT_STAGES.map((stage) => (
                        <motion.button
                            key={stage.slug}
                            variants={cardVariant}
                            type="button"
                            className="web3-stage-card web3-sheen"
                            style={{ "--accent": stage.color, "--accent-rgb": stage.rgb } as CSSProperties}
                            onClick={() => openModal(stage)}
                            aria-label={`Talk to us about your ${stage.name.toLowerCase()} project`}
                        >
                            <span className="web3-stage-icon">{stage.icon}</span>
                            <span className="web3-stage-name">{stage.name}</span>
                            <span className="web3-stage-tagline">{stage.tagline}</span>
                            <p className="web3-stage-detail">{stage.detail}</p>
                            <span className="web3-stage-cta">Talk to us →</span>
                        </motion.button>
                    ))}
                </motion.div>
                <motion.p variants={headingVariants} className="web3-stages-note">
                    Not sure which stage fits?{" "}
                    <button
                        type="button"
                        className="web3-stages-note-link"
                        onClick={() => openModal(null)}
                    >
                        Tell us anyway
                    </button>{" "}
                    — we&apos;ll help you figure it out.
                </motion.p>
            </motion.section>

            {/* ---------- WHAT WE FOCUS ON ---------- */}
            {/* Replaces the old unapproved sector chip list. Uses only the
                terminology already approved in the definition copy above. */}
            <motion.section
                className="web3-focus"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    What we focus on
                </motion.h2>
                <motion.div variants={containerVariants} className="web3-focus-grid">
                    {FOCUS_AREAS.map((area) => (
                        <motion.div key={area.slug} variants={cardVariant} className="web3-focus-card web3-sheen">
                            <img
                                src={area.image}
                                alt={area.label}
                                className="web3-focus-image"
                                loading="lazy"
                            />
                            <span className="web3-focus-scrim" aria-hidden="true" />
                            <span className="web3-focus-label">{area.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.p variants={headingVariants} className="web3-focus-note">
                    Not sure where your project fits? Tell us what you&apos;re building and
                    we&apos;ll figure it out together.
                </motion.p>
            </motion.section>

            {/* ---------- BUILDING PROCESS ---------- */}
            <motion.section
                className="web3-process"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    How we work
                </motion.h2>
                <motion.p variants={headingVariants} className="web3-process-intro">
                    Every venture moves through the same disciplined loop: discovery,
                    validation, build, launch, and scale.
                </motion.p>

                <motion.div variants={containerVariants} className="web3-process-grid">
                    {PROCESS_STEPS.map((step, index) => {
                        const isActive = step.slug === activeProcessSlug;
                        return (
                            <Fragment key={step.slug}>
                                <motion.button
                                    variants={cardVariant}
                                    type="button"
                                    className={`web3-process-card${isActive ? " is-active" : ""}`}
                                    style={{ "--step-color": step.color, "--step-rgb": step.rgb } as CSSProperties}
                                    onClick={() => setActiveProcessSlug(isActive ? null : step.slug)}
                                    aria-pressed={isActive}
                                >
                                    {/* Stagger moved inline: the detail panel now sits
                                        between cards, so the old :nth-child() delays in
                                        the CSS would land on the wrong elements. */}
                                    <span
                                        className="web3-process-card-border"
                                        aria-hidden="true"
                                        style={{ animationDelay: `${-3.6 + index * 0.9}s` }}
                                    />
                                    <span className="web3-process-card-num">{step.num}</span>
                                    <span className="web3-process-card-icon">{step.icon}</span>
                                    <span className="web3-process-card-name">{step.name}</span>
                                    <span className="web3-process-card-line">{step.line}</span>
                                </motion.button>

                                <AnimatePresence>
                                    {activeProcessStep && index === detailAfterIndex && (
                                        <motion.div
                                            key={activeProcessStep.slug}
                                            variants={processDetailVariant}
                                            initial="hidden"
                                            animate="show"
                                            exit="exit"
                                            className="web3-process-detail"
                                            style={{
                                                "--step-color": activeProcessStep.color,
                                                "--step-rgb": activeProcessStep.rgb,
                                            } as CSSProperties}
                                        >
                                            <span className="web3-process-detail-num">
                                                {activeProcessStep.num}
                                            </span>
                                            <div className="web3-process-detail-body">
                                                <h3 className="web3-process-detail-title">
                                                    {activeProcessStep.name}
                                                </h3>
                                                <p className="web3-process-detail-desc">
                                                    {activeProcessStep.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Fragment>
                        );
                    })}
                </motion.div>
            </motion.section>

            {/* ---------- WHY WORK WITH US NOW (honest, pre-launch) ---------- */}
            <motion.section
                className="web3-why"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.h2 variants={headingVariants} className="service-detail-heading">
                    Why work with us now
                </motion.h2>
                <motion.div variants={containerVariants} className="web3-why-grid">
                    <motion.div variants={cardVariant} className="web3-why-card web3-sheen">
                        <h3>Founder-led, hands-on</h3>
                        <p>You work directly with the founding team on every engagement — no account managers, no hand-offs.</p>
                    </motion.div>
                    <motion.div variants={cardVariant} className="web3-why-card web3-sheen">
                        <h3>Process over promises</h3>
                        <p>A structured, research-driven approach at every stage, not vague guarantees.</p>
                    </motion.div>
                    <motion.div variants={cardVariant} className="web3-why-card web3-sheen">
                        <h3>Founding-partner terms</h3>
                        <p>Early clients help shape how we work, and get priority attention while we build.</p>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ---------- CTA ---------- */}
            <motion.section
                className="service-detail-cta web3-cta"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2 variants={ctaVariants}>Ready to talk through your venture?</motion.h2>
                <motion.button
                    variants={ctaVariants}
                    type="button"
                    className="web3-quote-btn web3-sheen"
                    onClick={() => openModal(null)}
                >
                    Start the Conversation →
                </motion.button>
            </motion.section>

            <AnimatePresence>
                {modalOpen && <Web3QuoteModal stage={selectedStage} onClose={closeModal} />}
            </AnimatePresence>
        </>
    );
}