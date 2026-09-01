"use client";

import { useState, useEffect, useRef, FormEvent, ReactElement } from "react";
import Image from "next/image";

/* ---------- BRAND MARK (logo, or initials placeholder if the logo file 404s) ---------- */

function BrandMark({ brand }: { brand: { name: string; logo: string } }) {
    const [failed, setFailed] = useState(false);
    const initials = brand.name
        .split(/[\s-]+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

    return (
        <span className="auto-brand-logo-card">
            {failed ? (
                <span className="auto-brand-placeholder" aria-hidden="true">
                    {initials}
                </span>
            ) : (
                <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={40}
                    style={{ objectFit: "contain" }}
                    onError={() => setFailed(true)}
                    loading="lazy"
                />
            )}
        </span>
    );
}

/* ---------- BRAND PHOTO CARD ----------
   Falls back to the logo/initials badge if a brand has no photo yet,
   so the grid never shows a broken image while assets are gathered. */

function BrandPhotoCard({
    brand,
    onSelect,
}: {
    brand: { name: string; logo: string; photo?: string; popular?: boolean };
    onSelect: () => void;
}) {
    const [failed, setFailed] = useState(false);

    return (
        <button
            type="button"
            className="auto-photo-card"
            onClick={onSelect}
            aria-label={`Enquire about ${brand.name} vehicles`}
        >
            {brand.popular && <span className="auto-photo-badge">Popular</span>}

            {brand.photo && !failed ? (
                <Image
                    className="auto-photo-img"
                    src={brand.photo}
                    alt={`${brand.name} vehicle`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    style={{ objectFit: "cover" }}
                    onError={() => setFailed(true)}
                    loading="lazy"
                />
            ) : (
                <div className="auto-photo-fallback">
                    <BrandMark brand={brand} />
                </div>
            )}
            <div className="auto-photo-fade" />
            <span className="auto-photo-label">{brand.name}</span>
        </button>
    );
}

/* ---------- VEHICLE CATEGORY CARD ----------
   Shows the short description by default; "View detail" expands an
   accordion panel with a longer explanation. Each card owns its own
   open/closed state so cards expand independently. */

function CategoryCard({
    cat,
}: {
    cat: { title: string; desc: string; detail: string };
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="auto-category-card">
            <span className="auto-category-icon">{CATEGORY_ICONS[cat.title]}</span>
            <div className="auto-category-body">
                <h4>{cat.title}</h4>
                <p>{cat.desc}</p>

                <button
                    type="button"
                    className="auto-category-toggle"
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? "Hide detail" : "View detail"}
                    <i
                        className={`auto-category-chevron${open ? " auto-category-chevron-open" : ""}`}
                        aria-hidden="true"
                    >
                        ▾
                    </i>
                </button>

                <div
                    className={`auto-category-detail-wrap${open ? " auto-category-detail-open" : ""}`}
                >
                    <div className="auto-category-detail-inner">
                        <p>{cat.detail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- MODAL BRAND MEDIA ----------
   Shows the selected brand's photo as a banner at the top of the
   request modal. Falls back to the logo/initials badge if the brand
   has no photo yet, same pattern as BrandPhotoCard. */

function ModalBrandMedia({
    brand,
}: {
    brand: { name: string; logo: string; photo?: string };
}) {
    const [failed, setFailed] = useState(false);

    return (
        <div className="auto-modal-media">
            {brand.photo && !failed ? (
                <Image
                    src={brand.photo}
                    alt={`${brand.name} vehicle`}
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    style={{ objectFit: "cover" }}
                    onError={() => setFailed(true)}
                    loading="lazy"
                />
            ) : (
                <div className="auto-modal-media-fallback">
                    <BrandMark brand={brand} />
                </div>
            )}
            <div className="auto-modal-media-fade" />
        </div>
    );
}

/* ---------- FEATURED VEHICLE BANNER ----------
   Full-width photo/video banner per model — brand label, model name,
   a short spec tagline, and a "Book Now" CTA, matching the reference
   design. Falls back video -> poster photo -> plain gradient.

   `objectPosition` is optional per-vehicle. It can be either:
     - a plain string, applied at every screen size (legacy shape), or
     - an object with per-breakpoint values: { base, mobile, small }
       ("base" = desktop/tablet, "mobile" = <=640px, "small" = <=380px).

   Rather than writing these straight onto the element's inline `style`
   (which would out-rank the responsive breakpoint rules in
   AutomobileExtras.css and freeze the crop at the desktop value on
   every screen), each value is written as a CSS custom property.
   The stylesheet's media queries read the property that matches the
   current breakpoint, with graceful fallback to the next-widest tier
   when a narrower one isn't supplied — so a vehicle only needs to
   specify the breakpoints it actually wants to override. */

type ObjectPositionOverride = string | { base?: string; mobile?: string; small?: string };

function resolveObjectPositionVars(op?: ObjectPositionOverride): React.CSSProperties {
    if (!op) return {};
    const normalized = typeof op === "string" ? { base: op } : op;
    const vars: Record<string, string> = {};
    if (normalized.base) vars["--feat-op-base"] = normalized.base;
    if (normalized.mobile) vars["--feat-op-mobile"] = normalized.mobile;
    if (normalized.small) vars["--feat-op-small"] = normalized.small;
    return vars as React.CSSProperties;
}

function FeaturedBanner({
    vehicle,
    index,
    onSelect,
}: {
    vehicle: {
        brand: string;
        model: string;
        tagline: string;
        video?: string;
        poster?: string;
        objectPosition?: ObjectPositionOverride;
    };
    index: number;
    onSelect: () => void;
}) {
    const [videoFailed, setVideoFailed] = useState(false);
    const [photoFailed, setPhotoFailed] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px 0px", threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const showVideo = Boolean(vehicle.video) && !videoFailed;
    const showPoster = !showVideo && Boolean(vehicle.poster) && !photoFailed;

    // per-breakpoint object-position, expressed as CSS custom properties
    // so the responsive rules in the stylesheet stay in control at every
    // screen size instead of being overridden by a single inline value
    const posVars = resolveObjectPositionVars(vehicle.objectPosition);
    const imgStyle: React.CSSProperties = { objectFit: "cover", ...posVars };
    const videoStyle: React.CSSProperties | undefined = Object.keys(posVars).length
        ? posVars
        : undefined;

    return (
        <div
            ref={ref}
            className={`feat-banner${inView ? " feat-in-view" : ""}`}
            style={{ "--fx-delay": index * 0.15 } as React.CSSProperties}
        >
            {showVideo ? (
                <video
                    className="feat-banner-video"
                    style={videoStyle}
                    poster={vehicle.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoFailed(true)}
                >
                    <source src={vehicle.video} type="video/mp4" />
                </video>
            ) : showPoster ? (
                <Image
                    className="feat-banner-img"
                    src={vehicle.poster!}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    sizes="(max-width: 960px) 100vw, 960px"
                    style={imgStyle}
                    onError={() => setPhotoFailed(true)}
                    loading="lazy"
                />
            ) : (
                <div className="feat-banner-fallback" />
            )}

            <div className="feat-banner-sweep" />
            <div className="feat-banner-overlay" />

            <div className="feat-banner-content">
                <span className="feat-banner-brand">{vehicle.brand}</span>
                <h3 className="feat-banner-title">{vehicle.model}</h3>
                <p className="feat-banner-tagline">{vehicle.tagline}</p>
                <div className="feat-banner-actions">
                    <button
                        type="button"
                        className="feat-btn feat-btn-primary feat-btn-book"
                        onClick={onSelect}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}

function FeaturedVehicles({ onSelect }: { onSelect: (brand: string) => void }) {
    return (
        <section className="feat-section">
            <h2 className="service-detail-heading">Featured Vehicles</h2>
            <div className="feat-stack">
                {FEATURED_VEHICLES.map((v, i) => (
                    <FeaturedBanner key={v.brand} vehicle={v} index={i} onSelect={() => onSelect(v.brand)} />
                ))}
            </div>
        </section>
    );
}

/* ---------- CATEGORY ICONS (inline SVG, inherit --accent via currentColor) ---------- */

const CATEGORY_ICONS: Record<string, ReactElement> = {
    Sedans: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 16h18M4 16l1.5-5.5A2 2 0 0 1 7.4 9h9.2a2 2 0 0 1 1.9 1.5L20 16M7 16v2M17 16v2M8.5 12h7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="17.5" r="1.4" />
            <circle cx="17" cy="17.5" r="1.4" />
        </svg>
    ),
    SUVs: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 15.5h20M3.5 15.5l1-6A2 2 0 0 1 6.4 8h11.2a2 2 0 0 1 1.9 1.5l1 6M6 8V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="17" r="1.4" />
            <circle cx="17" cy="17" r="1.4" />
        </svg>
    ),
    "Luxury Vehicles": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 12l2-1 2.5-4.5A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.8 1L20 11l2 1M3 15.5h18" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7.5" cy="16.5" r="1.4" />
            <circle cx="16.5" cy="16.5" r="1.4" />
            <path d="M9 5.5l1-2h4l1 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    "Performance Vehicles": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 15l1.5-5A2.2 2.2 0 0 1 5.6 8.5h8.8a2.2 2.2 0 0 1 2 1.2L18 13l3.5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 15h17.5M14 8.5V6h3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6.5" cy="16.5" r="1.5" />
            <circle cx="16" cy="16.5" r="1.5" />
        </svg>
    ),
    "Electric Vehicles": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 15.5h18M4.5 15.5l1-5.5A2 2 0 0 1 7.4 8.5h9.2a2 2 0 0 1 1.9 1.5l1 5.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7.5" cy="17" r="1.4" />
            <circle cx="16.5" cy="17" r="1.4" />
            <path d="M13 4l-3 5h2.5l-1.5 4 4-5.5h-2.5L13 4z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    "Commercial / Fleet Vehicles": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 16V8.5a1 1 0 0 1 1-1h9v8.5M12 10.5h5.3a1 1 0 0 1 .8.4l2.4 3a1 1 0 0 1 .2.6V16H12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6.5" cy="17" r="1.4" />
            <circle cx="17" cy="17" r="1.4" />
        </svg>
    ),
    "Premium Pre-Owned": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 16h18M4 16l1.5-5.5A2 2 0 0 1 7.4 9h9.2a2 2 0 0 1 1.9 1.5L20 16" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="17.5" r="1.4" />
            <circle cx="17" cy="17.5" r="1.4" />
            <path d="M18 5.5l1.3 1.3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

/* ---------- DATA ---------- */

const VEHICLE_BRANDS = [
    { name: "Toyota", logo: "/images/brands/toyota.png", photo: "/images/brands/photo/toyota.jpg", popular: true },
    { name: "Nissan", logo: "/images/brands/nissan.png", photo: "/images/brands/photo/nissan.jpg" },
    { name: "Lexus", logo: "/images/brands/Lexus.png", photo: "/images/brands/photo/lexus.jpg" },
    { name: "Mazda", logo: "/images/brands/mazda.png", photo: "/images/brands/photo/mazda.jpg" },
    { name: "Ford", logo: "/images/brands/ford.png", photo: "/images/brands/photo/ford.jpg" },
    { name: "MG", logo: "/images/brands/mg.png", photo: "/images/brands/photo/mg.jpg" },
    { name: "BYD", logo: "/images/brands/byd.png", photo: "/images/brands/photo/byd.jpg" },
    { name: "BMW", logo: "/images/brands/bmw.jpg", photo: "/images/brands/photo/bmw.jpg", popular: true },
    { name: "Mercedes-Benz", logo: "/images/brands/mercedes-benz.jpg", photo: "/images/brands/photo/mercedes_benz.jpg", popular: true },
    { name: "Range Rover", logo: "/images/brands/range-rover.jpg", photo: "/images/brands/photo/range_rover.jpg" },
    { name: "Jetour", logo: "/images/brands/jetour.png", photo: "/images/brands/photo/jetour.jpg" },
    { name: "Ferrari", logo: "/images/brands/ferrari.png", photo: "/images/brands/photo/ferrari.png", popular: true },
    { name: "Lamborghini", logo: "/images/brands/lamborghini.png", photo: "/images/brands/photo/Lamborghini.png", popular: true },
    { name: "Hyundai", logo: "/images/brands/Hyundai.png", photo: "/images/brands/photo/hyundai.png" },
    { name: "Porsche", logo: "/images/brands/porsche.png", photo: "/images/brands/photo/porsche.jpg", popular: true },
    { name: "Tesla", logo: "/images/brands/tesla.png", photo: "/images/brands/photo/tesla.png", popular: true },
    { name: "Dodge", logo: "/images/brands/dodge.jpg", photo: "/images/brands/photo/dodge.png" },
];

const VEHICLE_CATEGORIES = [
    {
        title: "Sedans",
        desc: "Executive and family sedans across volume and premium segments.",
        detail: "From compact daily-drivers to full-size executive saloons, we source sedans across every major volume and premium brand. Ideal for corporate fleets, personal export, and buyers who want proven reliability with lower running costs than an SUV.",
    },
    {
        title: "SUVs",
        desc: "Compact, mid-size, and full-size sport utility vehicles for diverse needs.",
        detail: "Covers everything from compact crossovers to full-size 4x4s built for both city use and off-road terrain. A popular choice for export markets where ground clearance, cargo space, and family capacity matter most.",
    },
    {
        title: "Luxury Vehicles",
        desc: "High-end models from prestige marques emphasising comfort and status.",
        detail: "Flagship saloons, luxury SUVs, and prestige coupes from established high-end marques. We handle sourcing, specification matching, and export documentation for buyers seeking a specific trim, colour, or configuration.",
    },
    {
        title: "Performance Vehicles",
        desc: "Sports cars and high-performance variants for enthusiasts.",
        detail: "Sports cars, performance trims, and track-oriented variants for enthusiast buyers. We work with dealer networks to confirm allocation and availability before any commitment, since performance models often carry limited stock.",
    },
    {
        title: "Electric Vehicles",
        desc: "Battery-electric and plug-in hybrid models from established and new-energy brands.",
        detail: "Battery-electric and plug-in hybrid models spanning both legacy automakers and newer EV-focused brands. We can advise on destination-market charging standards and homologation requirements as part of the export process.",
    },
    {
        title: "Commercial / Fleet Vehicles",
        desc: "Vans, pickups, and fleet-oriented models for business clients.",
        detail: "Vans, pickups, and light commercial vehicles suited to business and fleet buyers. Volume orders are supported with consolidated shipping and documentation to keep per-unit export costs down.",
    },
    {
        title: "Premium Pre-Owned",
        desc: "Carefully selected pre-owned vehicles where applicable and available.",
        detail: "Where available, we source carefully inspected pre-owned vehicles as a lower-cost alternative to new. Every unit is subject to condition verification and dealer confirmation before a quote is issued.",
    },
];

const STATS = [
    { value: "17+", label: "Brands Supported" },
    { value: "7", label: "Vehicle Categories" },
    { value: "Global", label: "Export Network" },
    { value: "5 Min", label: "Typical Response" },
];

// featured video/photo banners — brand label, model name, short spec
// tagline, and a "Book Now" CTA that opens the request modal
// pre-filled with that brand. Swap in your real video/poster paths
// and adjust model/tagline copy per vehicle as needed.
//
// objectPosition can be a plain string (applied at every breakpoint)
// or a { base, mobile, small } object when the responsive CSS crop
// defaults still cut off a key part of that specific photo/video on
// narrower screens (e.g. the Mercedes grille and the Ferrari nose were
// both losing detail once the viewport got tight). Only set the tiers
// you actually need to override — anything you omit falls back to the
// next-widest tier, then to the stylesheet's own defaults.
const FEATURED_VEHICLES = [
    {
        brand: "Mercedes-Benz",
        model: "GLC",
        tagline: "Luxury SUV, export-ready stock",
        video: "/videos/Mercedes_SUV.mp4",
        poster: "/images/brands/photo/mercedes_benz.jpg",
        objectPosition: { base: "center 30%", mobile: "center 38%", small: "center 40%" },
    },
    {
        brand: "Ferrari",
        model: "488 GTB",
        tagline: "Iconic Italian performance, engineered to thrill",
        video: "/videos/ferrari.mp4",
        poster: "/images/brands/photo/ferrari.png",
        objectPosition: { base: "center 42%", mobile: "center 45%", small: "center 45%" },
    },
    {
        brand: "Toyota",
        model: "RAV4",
        tagline: "Full-size capability, flagship comfort",
        video: "/videos/Toyota_RAV4.mp4",
        poster: "/images/brands/photo/toyota.jpg",
        objectPosition: { base: "center 50%", mobile: "center 45%", small: "center 45%" },
    },
];

// replace with your real WhatsApp number, no + or spaces
const WHATSAPP_NUMBER = "971XXXXXXXXX";

/* ---------- COMPONENT ---------- */

export default function AutomobileExtras() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");

    const [model, setModel] = useState("");
    const [budget, setBudget] = useState("");
    const [destination, setDestination] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");

    function openModal(brand?: string) {
        setSelectedBrand(brand ?? "");
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const lines = [
            `Hi, I'd like to request a vehicle quote.`,
            selectedBrand && `Brand: ${selectedBrand}`,
            model && `Model / preference: ${model}`,
            budget && `Budget range: ${budget}`,
            destination && `Destination country: ${destination}`,
            name && `Name: ${name}`,
            contact && `Contact: ${contact}`,
        ].filter(Boolean);

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        closeModal();
    }

    // duplicated once for a seamless infinite-scroll loop in the marquee
    const marqueeBrands = [...VEHICLE_BRANDS, ...VEHICLE_BRANDS];

    // full brand record (with photo) for whichever brand is currently
    // selected in the modal — updates live if the dropdown is changed
    const selectedBrandData = VEHICLE_BRANDS.find((b) => b.name === selectedBrand);

    return (
        <div className="auto-wrapper">
            {/* ambient color glow behind the whole automobile section */}
            <div className="auto-glow-bg" aria-hidden="true" />

            <div className="auto-content">
                {/* ---------- STAT STRIP ---------- */}
                <section className="auto-stats">
                    {STATS.map((s) => (
                        <div key={s.label} className="auto-stat">
                            <span className="auto-stat-value">{s.value}</span>
                            <span className="auto-stat-label">{s.label}</span>
                        </div>
                    ))}
                </section>

                {/* ---------- FEATURED VEHICLES (video/photo banners) ---------- */}
                <FeaturedVehicles onSelect={openModal} />

                {/* ---------- BRAND MARQUEE (motion, showroom feel) ---------- */}
                <section className="auto-section auto-marquee-section">
                    <h2 className="service-detail-heading">Supported Brands</h2>
                    <div className="auto-marquee-mask">
                        <div className="auto-marquee-track">
                            {marqueeBrands.map((brand, i) => (
                                <button
                                    key={`${brand.name}-${i}`}
                                    type="button"
                                    className="auto-marquee-tile"
                                    onClick={() => openModal(brand.name)}
                                    aria-label={`Enquire about ${brand.name} vehicles`}
                                    tabIndex={i < VEHICLE_BRANDS.length ? 0 : -1}
                                >
                                    <BrandMark brand={brand} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* full clickable grid — photo cards, with names, for accessibility + direct selection */}
                    <div className="auto-photo-grid">
                        {VEHICLE_BRANDS.map((brand) => (
                            <BrandPhotoCard key={brand.name} brand={brand} onSelect={() => openModal(brand.name)} />
                        ))}
                    </div>
                    <p className="auto-note">
                        Brand logos, trademarks, and vehicle imagery remain the property of their
                        respective owners. BH Ventures is not an authorised dealer of any brand
                        unless separately verified. Availability is subject to dealer stock and
                        confirmation.
                    </p>
                </section>

                {/* ---------- VEHICLE CATEGORIES (with icons + expandable detail) ---------- */}
                <section className="auto-section">
                    <h2 className="service-detail-heading">Vehicle Categories</h2>
                    <div className="auto-category-grid">
                        {VEHICLE_CATEGORIES.map((cat) => (
                            <CategoryCard key={cat.title} cat={cat} />
                        ))}
                    </div>
                </section>

                {/* ---------- PRICE DISCLAIMER ---------- */}
                <div className="auto-price-disclaimer">
                    <span className="auto-price-title">Price on Request — Dealer Confirmation Required</span>
                    <p>
                        Final pricing depends on the vehicle model and year, trim and configuration,
                        current dealer stock, export destination, and shipping/documentation costs.
                        A formal quotation is issued only after the sales team has received and
                        documented dealer confirmation.
                    </p>
                    <ul>
                        <li>Vehicle model, year, and trim level</li>
                        <li>Current availability and dealer stock position</li>
                        <li>Export destination country and regulations</li>
                        <li>Shipping, insurance, and documentation costs</li>
                    </ul>
                </div>

                {/* ---------- CTA ---------- */}
                <section className="service-detail-cta auto-cta">
                    <h2>Ready to request a vehicle?</h2>
                    <p className="auto-cta-sub">
                        Tell us the brand, model, and destination — our team confirms
                        everything with the dealer before you commit to anything.
                    </p>
                    <button type="button" className="service-detail-cta-btn" onClick={() => openModal()}>
                        Request a Vehicle
                    </button>
                </section>

                {/* ---------- LEGAL STRIP ---------- */}
                <div className="auto-legal-strip">
                    BH Ventures is not an authorised dealer of any listed brand unless separately
                    verified. All vehicle information, pricing, and export eligibility are subject
                    to dealer confirmation. Export requirements vary by destination and are
                    verified individually before any arrangement is confirmed.
                </div>
            </div>

            {/* ---------- INQUIRY MODAL ---------- */}
            {modalOpen && (
                <div className="auto-modal-overlay" onClick={closeModal}>
                    <div className="auto-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="auto-modal-close" onClick={closeModal} aria-label="Close">
                            ×
                        </button>

                        {selectedBrandData && (
                            <ModalBrandMedia key={selectedBrandData.name} brand={selectedBrandData} />
                        )}

                        <h2 className="auto-modal-title">Request a Vehicle</h2>
                        <p className="auto-modal-sub">
                            Share your requirement and our sales team will confirm availability,
                            pricing, and export eligibility directly with the dealer.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="auto-field">
                                <label htmlFor="brand">Brand</label>
                                <select
                                    id="brand"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    required
                                >
                                    <option value="">Select a brand</option>
                                    {VEHICLE_BRANDS.map((b) => (
                                        <option key={b.name} value={b.name}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="auto-field">
                                <label htmlFor="model">Model / Preference</label>
                                <input
                                    id="model"
                                    type="text"
                                    placeholder="e.g. Land Cruiser GXR, 2025"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>

                            <div className="auto-field">
                                <label htmlFor="budget">Budget Range</label>
                                <input
                                    id="budget"
                                    type="text"
                                    placeholder="e.g. AED 150,000 – 180,000"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>

                            <div className="auto-field">
                                <label htmlFor="destination">Destination Country</label>
                                <input
                                    id="destination"
                                    type="text"
                                    placeholder="Where should the vehicle be exported to?"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="auto-field">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="auto-field">
                                <label htmlFor="contact">Phone or Email</label>
                                <input
                                    id="contact"
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="auto-submit-btn">
                                Send Request via WhatsApp
                            </button>
                        </form>

                        <p className="auto-modal-footer">
                            All vehicle details are subject to dealer confirmation. By submitting,
                            you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}