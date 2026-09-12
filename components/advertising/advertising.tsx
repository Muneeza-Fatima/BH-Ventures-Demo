"use client";

import "./advertising.css";

interface AdvertisingSectionsProps {
    desc: string;
    whatsIncluded: string[];
    process: { title: string; desc: string }[];
    highlights: { label: string; value: string }[];
}

const PHOTOS = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1762417582194-7f0978f43fa0",
    "https://images.unsplash.com/photo-1759215524600-7971d6a4dac0",
    "https://images.unsplash.com/photo-1686061592689-312bbfb5c055",
];

const CHANNELS = [
    { name: "Social media advertising", photo: PHOTOS[2], angle: -3 },
    { name: "Search advertising", photo: PHOTOS[0], angle: 2 },
    { name: "Display & digital advertising", photo: PHOTOS[1], angle: -2 },
    { name: "Content promotion", photo: PHOTOS[3], angle: 2 },
    { name: "Retargeting campaigns", photo: PHOTOS[0], angle: -2 },
    { name: "Local & targeted campaigns", photo: PHOTOS[2], angle: 3 },
];

const FOCUS_AREAS = [
    { mark: "A", name: "Right audience", desc: "Identify and reach audiences relevant to the campaign objective." },
    { mark: "B", name: "Clear messaging", desc: "Align creative and messaging with the brand and campaign goals." },
    { mark: "C", name: "Channel selection", desc: "Choose appropriate channels based on audience and objectives." },
    { mark: "D", name: "Performance", desc: "Track campaign results and identify opportunities for improvement." },
];

const OBJECTIVES = [
    { num: "01", name: "Build Awareness", desc: "Increase visibility and introduce your brand to relevant audiences." },
    { num: "02", name: "Drive Traffic", desc: "Bring targeted visitors to your website, product, or campaign landing page." },
    { num: "03", name: "Generate Leads", desc: "Reach potential customers and encourage meaningful inquiries." },
    { num: "04", name: "Promote Products", desc: "Put specific products, services, or offers in front of relevant audiences." },
    { num: "05", name: "Measure Performance", desc: "Track campaign results and use the data to guide future decisions." },
    { num: "06", name: "Retain Customers", desc: "Build loyalty and encourage repeat engagement with your brand." },
];

const METRICS = [
    { name: "Reach", desc: "How many people the campaign reaches." },
    { name: "Engagement", desc: "How audiences interact with the content." },
    { name: "Traffic", desc: "Visitors driven to the website or landing page." },
    { name: "Leads", desc: "Potential customers generated through campaigns." },
    { name: "Conversions", desc: "Actions completed against the campaign objective." },
];

/* ========================================
   ADVERTISING -- full replacement for the generic
   What's included / How it works / Highlights block, plus
   Campaign channels, What we focus on, Campaign objectives, and
   Performance metrics.

   NOTE: the Overview is intentionally NOT duplicated here — the generic
   service-detail-overview section from page.tsx already covers it.
   `desc` is kept in props for now in case a future section needs it,
   but it's not rendered here.

   Every section uses the cream .adx-poster panel device. "What's
   included" and "Campaign objectives" use flex-wrap grids (not CSS grid
   auto-fill/auto-fit) so cards flow to fill the banner width instead of
   leaving a large empty region when the item count doesn't evenly
   divide the row.

   --accent / --accent-rgb pinned to blue via .adx-theme-blue.
   Rendered only for service.slug === "advertising".
   ======================================== */
export default function AdvertisingSections({
    whatsIncluded,
    process,
    highlights,
}: AdvertisingSectionsProps) {
    return (
        <div className="adx-theme-blue">
            {/* ---------- CAMPAIGN CHANNELS -- cream tear-sheet wall ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">Campaign channels</h2>
                <div className="adx-poster adx-poster--wall">
                    <div className="adx-wall">
                        {CHANNELS.map((c) => (
                            <div key={c.name} className="adx-sheet" style={{ transform: `rotate(${c.angle}deg)` }}>
                                <span className="adx-sheet-tape" />
                                <div className="adx-sheet-photo">
                                    <img src={`${c.photo}?w=420&q=70&auto=format&fit=crop`} alt="" loading="lazy" />
                                </div>
                                <p className="adx-sheet-label">{c.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- WHAT WE FOCUS ON -- cream redline proof ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">What we focus on</h2>
                <div className="adx-poster adx-poster--proof">
                    <div className="adx-proof">
                        <div className="adx-layout-mock">
                            <div className="adx-layout-mock-head" />
                            <div className="adx-layout-mock-image" />
                            <div className="adx-layout-mock-line" />
                            <div className="adx-layout-mock-line" />
                            <div className="adx-layout-mock-line" />
                            <span className="adx-mark" style={{ top: "14px", left: "58%" }}>A</span>
                            <span className="adx-mark" style={{ top: "96px", left: "14px" }}>B</span>
                            <span className="adx-mark" style={{ top: "184px", left: "68%" }}>C</span>
                            <span className="adx-mark" style={{ top: "232px", left: "26%" }}>D</span>
                        </div>
                        <div className="adx-notes">
                            {FOCUS_AREAS.map((f) => (
                                <div key={f.mark} className="adx-note">
                                    <span className="adx-note-mark">{f.mark}</span>
                                    <div>
                                        <h3 className="adx-note-title">{f.name}</h3>
                                        <p className="adx-note-desc">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- WHAT'S INCLUDED -- cream index cards (flex-wrap, no dead space) ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">What&apos;s included</h2>
                <div className="adx-poster adx-poster--index">
                    <div className="adx-index-grid">
                        {whatsIncluded.map((item, i) => (
                            <div
                                key={item}
                                className="adx-index-card"
                                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.4}deg)` }}
                            >
                                <div className="adx-index-photo">
                                    <img src={`${PHOTOS[i % PHOTOS.length]}?w=500&q=70&auto=format&fit=crop`} alt="" loading="lazy" />
                                </div>
                                <span className="adx-index-check">✓</span>
                                <p className="adx-index-label">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- HOW IT WORKS -- cream ticket stubs ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">How it works</h2>
                <div className="adx-poster adx-poster--tickets">
                    <div className="adx-ticket-scroll">
                        <div className="adx-ticket-strip">
                            {process.map((step, i) => (
                                <div key={step.title} className="adx-ticket">
                                    <div className="adx-ticket-photo">
                                        <img
                                            src={`${PHOTOS[i % PHOTOS.length]}?w=500&q=65&auto=format&fit=crop`}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="adx-ticket-perf" />
                                    <div className="adx-ticket-body">
                                        <span className="adx-ticket-num">{String(i + 1).padStart(2, "0")}</span>
                                        <h3 className="adx-ticket-name">{step.title}</h3>
                                        <p className="adx-ticket-desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- CAMPAIGN OBJECTIVES -- cream flow poster, 6 cards, flex-wrap ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">Campaign objectives</h2>
                <div className="adx-poster adx-poster--flow">
                    <div className="adx-flow-line" aria-hidden="true" />
                    <div className="adx-flow-grid">
                        {OBJECTIVES.map((o, i) => (
                            <div key={o.num} className="adx-flow-card" style={{ animationDelay: `${i * 0.06}s` }}>
                                <span className="adx-flow-num">{o.num}</span>
                                <h3 className="adx-flow-name">{o.name}</h3>
                                <p className="adx-flow-desc">{o.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- HIGHLIGHTS -- cream stamped stats ---------- */}
            <section className="adx-poster-section">
                <div className="adx-poster adx-poster--stats">
                    <div className="adx-stat-grid">
                        {highlights.map((h) => (
                            <div key={h.label} className="adx-stat-card">
                                <span className="adx-stat-pin" />
                                <p className="adx-stat-value">{h.value}</p>
                                <p className="adx-stat-label">{h.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- PERFORMANCE METRICS -- cream dotted strip ---------- */}
            <section className="adx-poster-section">
                <h2 className="service-detail-heading">Performance metrics we track</h2>
                <div className="adx-poster adx-poster--metrics">
                    <div className="adx-metrics-row">
                        {METRICS.map((m) => (
                            <div key={m.name} className="adx-metric-card">
                                <span className="adx-metric-dot" />
                                <h3 className="adx-metric-name">{m.name}</h3>
                                <p className="adx-metric-desc">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}