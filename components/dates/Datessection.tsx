"use client";

import { useState, useEffect, FormEvent } from "react";
import { BH_WHATSAPP_NUMBER, BH_WHATSAPP_DISPLAY } from "@/lib/constants";
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

const WHATSAPP_NUMBER = BH_WHATSAPP_NUMBER;

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
                    grade, and pricing via WhatsApp (<strong>{BH_WHATSAPP_DISPLAY}</strong>) directly with the supplier.
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
                <div className="service-detail-cta-group">
                    <button type="button" className="dates-quote-btn" onClick={() => openModal(null)}>
                        Request Wholesale Pricing →
                    </button>
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to request a wholesale date quote.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-detail-whatsapp-btn"
                        aria-label={`Chat directly about dates and foodstuff trading on WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                    >
                        <svg viewBox="0 0 24 24" className="service-detail-whatsapp-icon" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.148-.672.15-.2.297-.77.967-.944 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51-.174-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.297-1.042 1.017-1.042 2.479s1.067 2.876 1.215 3.075c.149.198 2.1 3.205 5.077 4.494.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                            <path d="M12.004 2a9.9 9.9 0 0 0-8.48 15.028L2 22l5.116-1.342A9.9 9.9 0 1 0 12.004 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.295-.175-3.036.796.81-2.956-.192-.304A8.08 8.08 0 1 1 12.004 19.98Z" />
                        </svg>
                        <span>WhatsApp: {BH_WHATSAPP_DISPLAY}</span>
                    </a>
                </div>
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