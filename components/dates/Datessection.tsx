"use client";

import { useState, useEffect, FormEvent } from "react";
import "./dates.css";

interface DateVariety {
    slug: string;
    name: string;
    origin: string;
    texture: string;
    image: string;
}

const DATE_VARIETIES: DateVariety[] = [
    { slug: "medjool", name: "Medjool", origin: "Palestine", texture: "Large, Soft & Caramel", image: "/images/dates/medjool.jpg" },
    { slug: "ajwa", name: "Ajwa", origin:  "Saudi Arabia", texture: "Soft & Dense", image: "/images/dates/ajwa.jpg" },
    { slug: "mabroom", name: "Mabroom", origin: " Saudi Arabia", texture: "Firm & Chewy", image: "/images/dates/mabroom.jpg" },
    { slug: "sukkari", name: "Sukkari", origin: " Saudi Arabia", texture: "Golden & Crunchy-Soft", image: "/images/dates/sukkari.jpg" },
    { slug: "rabi", name: "Rabi", origin: "Gulf Region", texture: "Medium & Balanced", image: "/images/dates/rabi.jpg" },
    { slug: "mazafati", name: "Mazafati", origin: " Iran", texture: "Very Soft & Moist", image: "/images/dates/mazafati.jpg" },
    { slug: "kalute", name: "Kalute", origin: "Iran", texture: "Semi-Dry & Chewy", image: "/images/dates/kalute.jpg" },
    { slug: "deglet-noor", name: "Deglet Noor", origin: "Algeria", texture: "Semi-Dry & Translucent", image: "/images/dates/deglet-noor.jpg" },
    { slug: "safawi", name: "Safawi", origin: " Saudi Arabia", texture: "Soft & Dark", image: "/images/dates/safawi.jpg" },
];

const AVAILABLE_GRADES = ["Premium", "Grade A", "Grade B+", "Bulk / Industrial"];

// Replace with your real WhatsApp Business number, digits only, country code first (no +, no spaces).
const WHATSAPP_NUMBER = "15551234567";

/* ---------- MODAL VARIETY MEDIA ----------
   Shows the selected variety's photo as a banner at the top of the
   quote modal. Falls back to a plain name badge if the image 404s,
   same pattern as ModalBrandMedia in the Automobiles component. */

function ModalVarietyMedia({ variety }: { variety: DateVariety }) {
    const [failed, setFailed] = useState(false);

    return (
        <div className="dates-modal-media">
            {!failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={variety.image}
                    alt={`${variety.name} dates`}
                    onError={() => setFailed(true)}
                />
            ) : (
                <div className="dates-modal-media-fallback">
                    <span className="dates-modal-media-placeholder">{variety.name}</span>
                </div>
            )}
            <div className="dates-modal-media-fade" />
        </div>
    );
}

interface DatesQuoteModalProps {
    variety: DateVariety | null;
    onClose: () => void;
}

function DatesQuoteModal({ variety: initialVariety, onClose }: DatesQuoteModalProps) {
    // controlled so the banner + WhatsApp message stay in sync with
    // whichever variety is currently selected in the dropdown — same
    // live-update pattern as the brand select in AutomobileExtras
    const [selectedSlug, setSelectedSlug] = useState(initialVariety?.slug ?? "");
    const selectedVarietyData = DATE_VARIETIES.find((v) => v.slug === selectedSlug);

    // lock page scroll while the modal is open so only the overlay
    // itself scrolls — prevents the double-scrollbar/page-shift issue
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
        const grade = (form.elements.namedItem("grade") as HTMLSelectElement).value;
        const quantity = (form.elements.namedItem("quantity") as HTMLInputElement).value;
        const destination = (form.elements.namedItem("destination") as HTMLInputElement).value;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const contact = (form.elements.namedItem("contact") as HTMLInputElement).value;

        const lines = [
            "Hi, I'd like to request a wholesale date quote:",
            selectedVarietyData ? `Variety: ${selectedVarietyData.name} (${selectedVarietyData.origin})` : null,
            grade ? `Grade: ${grade}` : null,
            quantity ? `Quantity: ${quantity}` : null,
            destination ? `Destination: ${destination}` : null,
            `Name: ${name}`,
            `Contact: ${contact}`,
        ].filter(Boolean);

        const message = encodeURIComponent(lines.join("\n"));
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");

        onClose();
    }

    return (
        <div className="dates-quote-overlay" onClick={onClose}>
            <div className="dates-quote-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="dates-quote-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                {selectedVarietyData && (
                    <ModalVarietyMedia key={selectedVarietyData.slug} variety={selectedVarietyData} />
                )}

                <h3 className="dates-quote-title">Request Dates</h3>
                <p className="dates-quote-sub">
                    Share your requirement and our sales team will confirm variety,
                    grade, and pricing directly with the supplier.
                </p>

                <form className="dates-quote-form" onSubmit={handleSubmit}>
                    <label className="dates-quote-field">
                        Variety
                        <select
                            name="variety"
                            value={selectedSlug}
                            onChange={(e) => setSelectedSlug(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a variety
                            </option>
                            {DATE_VARIETIES.map((v) => (
                                <option key={v.slug} value={v.slug}>
                                    {v.name} — {v.origin}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="dates-quote-field">
                        Grade
                        <select name="grade" defaultValue="" required>
                            <option value="" disabled>
                                Select a grade
                            </option>
                            {AVAILABLE_GRADES.map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="dates-quote-field">
                        Quantity
                        <input
                            type="text"
                            name="quantity"
                            placeholder="e.g. 500kg, monthly"
                        />
                    </label>

                    <label className="dates-quote-field">
                        Destination Country
                        <input
                            type="text"
                            name="destination"
                            placeholder="Where should the order be shipped to?"
                        />
                    </label>

                    <label className="dates-quote-field">
                        Your Name
                        <input type="text" name="name" required placeholder="Your name" />
                    </label>

                    <label className="dates-quote-field">
                        Phone or Email
                        <input type="text" name="contact" required placeholder="you@example.com" />
                    </label>

                    <button type="submit" className="dates-quote-submit">
                        Send via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function DatesSection() {
    const [selectedVariety, setSelectedVariety] = useState<DateVariety | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    function openModal(variety: DateVariety | null) {
        setSelectedVariety(variety);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setSelectedVariety(null);
    }

    return (
        <>
            {/* ---------- VARIETY GRID ---------- */}
            <section className="dates-varieties">
                <h2 className="service-detail-heading">Our date varieties</h2>
                <div className="dates-varieties-grid">
                    {DATE_VARIETIES.map((v) => (
                        <button
                            key={v.slug}
                            type="button"
                            className="date-variety-card"
                            onClick={() => openModal(v)}
                            aria-label={`Request a quote for ${v.name} dates`}
                        >
                            <div className="date-variety-image-wrap">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={v.image} alt={`${v.name} dates`} className="date-variety-image" />
                                <span className="date-variety-origin">{v.origin}</span>
                            </div>
                            <div className="date-variety-body">
                                <h3 className="date-variety-name">{v.name}</h3>
                                <span className="date-variety-texture">{v.texture}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* ---------- AVAILABLE GRADES ---------- */}
            <section className="dates-grades">
                <h2 className="service-detail-heading">Available grades</h2>
                <div className="dates-grades-list">
                    {AVAILABLE_GRADES.map((grade) => (
                        <span key={grade} className="dates-grade-chip">{grade}</span>
                    ))}
                </div>
                <p className="dates-price-disclaimer">
                    Pricing varies by variety, grade, season, and order volume. Contact us for a current wholesale quote.
                </p>
            </section>

            {/* ---------- CTA ---------- */}
            <section className="service-detail-cta dates-cta">
                <h2>Ready to source premium dates?</h2>
                <button type="button" className="dates-quote-btn" onClick={() => openModal(null)}>
                    Request Wholesale Pricing →
                </button>
            </section>

            {/* ---------- LEGAL STRIP ---------- */}
            <p className="dates-legal-strip">
                All dates are sourced, graded, and packed to destination-market food-safety standards.
                Final pricing and availability are confirmed at the time of quote.
            </p>

            {modalOpen && <DatesQuoteModal variety={selectedVariety} onClose={closeModal} />}
        </>
    );
}