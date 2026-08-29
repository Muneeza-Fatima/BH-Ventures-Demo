"use client";

import { useState, useEffect, FormEvent } from "react";
import "./web3.css";

interface EngagementStage {
    slug: string;
    name: string;
    tagline: string;
    detail: string;
}

const ENGAGEMENT_STAGES: EngagementStage[] = [
    {
        slug: "idea",
        name: "Idea Stage",
        tagline: "Concept, not yet validated",
        detail: "You have a direction but need the concept stress-tested against the current ecosystem before committing resources.",
    },
    {
        slug: "mvp",
        name: "MVP / Early Build",
        tagline: "Something exists, needs direction",
        detail: "You've started building and need product strategy, positioning, or partner introductions to move toward launch.",
    },
    {
        slug: "scaling",
        name: "Scaling",
        tagline: "Live, looking to grow",
        detail: "You're live and need support on go-to-market, ecosystem coordination, or structuring the next phase of growth.",
    },
];

const SECTORS = ["DeFi", "NFT", "DAO Tooling", "Infrastructure", "GameFi", "RWA", "Other"];

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
        const sector = (form.elements.namedItem("sector") as HTMLSelectElement).value;
        const timeline = (form.elements.namedItem("timeline") as HTMLInputElement).value;
        const budget = (form.elements.namedItem("budget") as HTMLInputElement).value;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const contact = (form.elements.namedItem("contact") as HTMLInputElement).value;

        const lines = [
            "Hi, I'd like to talk about a Web3 venture:",
            project && `Project: ${project}`,
            selectedStageData && `Stage: ${selectedStageData.name}`,
            sector && `Sector: ${sector}`,
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
        <div className="web3-quote-overlay" onClick={onClose}>
            <div className="web3-quote-modal" onClick={(e) => e.stopPropagation()}>
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
                        Sector
                        <select name="sector" defaultValue="" required>
                            <option value="" disabled>
                                Select a sector
                            </option>
                            {SECTORS.map((sector) => (
                                <option key={sector} value={sector}>
                                    {sector}
                                </option>
                            ))}
                        </select>
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

                    <button type="submit" className="web3-quote-submit">
                        Send via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function Web3Extras() {
    const [selectedStage, setSelectedStage] = useState<EngagementStage | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

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
            {/* ---------- ENGAGEMENT STAGES ---------- */}
            <section className="web3-stages">
                <h2 className="service-detail-heading">Where are you starting from?</h2>
                <div className="web3-stages-grid">
                    {ENGAGEMENT_STAGES.map((stage) => (
                        <button
                            key={stage.slug}
                            type="button"
                            className="web3-stage-card"
                            onClick={() => openModal(stage)}
                            aria-label={`Talk to us about your ${stage.name.toLowerCase()} project`}
                        >
                            <span className="web3-stage-name">{stage.name}</span>
                            <span className="web3-stage-tagline">{stage.tagline}</span>
                            <p className="web3-stage-detail">{stage.detail}</p>
                            <span className="web3-stage-cta">Talk to us →</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ---------- SECTORS COVERED ---------- */}
            <section className="web3-sectors">
                <h2 className="service-detail-heading">Sectors we work in</h2>
                <div className="web3-sectors-list">
                    {SECTORS.map((sector) => (
                        <span key={sector} className="web3-sector-chip">{sector}</span>
                    ))}
                </div>
                <p className="web3-sectors-note">
                    Not sure where your project fits? Tell us what you&apos;re building and
                    we&apos;ll figure it out together.
                </p>
            </section>

            {/* ---------- WHY WORK WITH US NOW (honest, pre-launch) ---------- */}
            <section className="web3-why">
                <h2 className="service-detail-heading">Why work with us now</h2>
                <div className="web3-why-grid">
                    <div className="web3-why-card">
                        <h3>Founder-led, hands-on</h3>
                        <p>You work directly with the founding team on every engagement — no account managers, no hand-offs.</p>
                    </div>
                    <div className="web3-why-card">
                        <h3>Process over promises</h3>
                        <p>A structured, research-driven approach at every stage, not vague guarantees.</p>
                    </div>
                    <div className="web3-why-card">
                        <h3>Founding-partner terms</h3>
                        <p>Early clients help shape how we work, and get priority attention while we build.</p>
                    </div>
                </div>
            </section>

            {/* ---------- CTA ---------- */}
            <section className="service-detail-cta web3-cta">
                <h2>Ready to talk through your venture?</h2>
                <button type="button" className="web3-quote-btn" onClick={() => openModal(null)}>
                    Start the Conversation →
                </button>
            </section>

            {modalOpen && <Web3QuoteModal stage={selectedStage} onClose={closeModal} />}
        </>
    );
}