"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { motion, type Variants } from "framer-motion";
import {
    Globe2,
    Handshake,
    TrendingUp,
    Grid3X3,
    type LucideIcon,
} from "lucide-react";
import {
    ARTICLES,
    CATEGORIES,
    DEFAULT_NOTE,
    TYPE_LABELS,
    categoryColor,
    categoryLabel,
} from "./insights.data";
import type { Article, Block, CategoryId, ChartSpec, ContentType } from "./insights.data";
import "./insights.css";

/* ------------------------------------------------------------------
   Framer Motion variants — matches the stagger / entrance style
   used on the home page HeroContent component.
------------------------------------------------------------------- */

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Slower fade-up for bigger heading words, matching home page headingWord */
const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Stagger wrapper for the dateline heading words */
const headingContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

/** Each filter button slides in with a staggered delay */
const filterContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
};

const filterItemVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ------------------------------------------------------------------
   Design notes

   Every topic carries its own colour, taken from the taxonomy, so the
   index reads as a coloured grid rather than a flat list — and that
   same colour follows the reader in: opening an AI piece tints the
   quote rule, the chart's emphasis and the progress bar violet;
   a Web3 piece tints them teal. The colour is doing identification,
   not decoration, so it stays off body text and lives on accents only.

   Photographs are rendered duotone in the article's own colour, so
   stock imagery from a dozen sources reads as one house style. The
   four kinds of writing are told apart by the shape of their mark,
   which stays legible against every topic colour.

   The only motion that is not a reply to something the reader did is
   the card grid settling into place on first paint, once.
------------------------------------------------------------------- */

const INK = "#161C24";
const MUTED = "#5A6470";
const RULE = "#C9CCC4";

/* ------------------------------------------------------------------ */
/*  Rotating hero banner                                               */
/*                                                                      */
/*  Decorative chrome, not editorial content, so it lives here rather  */
/*  than in insights.data.ts. Full-bleed and dark by construction: a   */
/*  fixed, transparent site navbar can sit on top of it, with a        */
/*  steady scrim reserved at the top so nav text stays legible no      */
/*  matter which photo is showing underneath. Only shown on the index  */
/*  view — an article being read has its own hero image, and stacking  */
/*  this on top of it as well just pushed real content off every       */
/*  small screen.                                                      */
/* ------------------------------------------------------------------ */

const BANNER_SLIDES: { src: string; alt: string }[] = [
    { src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=85", alt: "Colorful software code on a screen" },
    { src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1600&q=85", alt: "Abstract blockchain network with connected nodes" },
    { src: "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?auto=format&fit=crop&w=1600&q=85", alt: "Financial market information on a trading display" },
    { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85", alt: "Digital analytics workspace with multiple screens" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=85", alt: "Business team collaborating in a meeting" },
    { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85", alt: "Dubai skyline illuminated at dusk" },
];

const BANNER_INTERVAL_MS = 2000;

const DISPATCH_SIGNALS = {
    ai: {
        label: "AI OPERATIONS",
        title: "Automation is infrastructure.",
        detail: "Fix one repeated task at a time.",
        confidence: "High",
    },
    web3: {
        label: "DIGITAL VENTURES",
        title: "Trust is the advantage.",
        detail: "Useful Web3 hides the complexity.",
        confidence: "Medium",
    },
    trade: {
        label: "TRADE CORRIDORS",
        title: "Routes are opening early.",
        detail: "Settlement and documentation move together.",
        confidence: "High",
    },
} as const;

function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    /* Autoplay runs regardless of the OS "reduce motion" setting.
       That flag is on by default under iOS/Android low-power modes, so
       gating the timer on it meant the banner silently froze on slide
       one for a large share of phones, with no visible way to notice
       or fix it. A slow crossfade is not the kind of motion that
       setting is meant to suppress, and there is now a real, visible
       pause button below — the thing the accessibility guideline
       actually asks for (hover-to-pause doesn't exist on touch). */
    useEffect(() => {
        if (paused) return;
        const id = window.setInterval(() => {
            setCurrent((i) => (i + 1) % BANNER_SLIDES.length);
        }, BANNER_INTERVAL_MS);
        return () => window.clearInterval(id);
    }, [paused]);

    /* Warm the browser cache for the next photo a beat before it's due,
       so the crossfade never waits on a fetch. */
    useEffect(() => {
        const next = (current + 1) % BANNER_SLIDES.length;
        const img = new window.Image();
        img.src = BANNER_SLIDES[next].src;
    }, [current]);

    return (
        <div
            className="bhi-banner"
            role="group"
            aria-roledescription="carousel"
            aria-label="BH Ventures Insights, rotating photographs"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {BANNER_SLIDES.map((slide, i) => (
                <div key={slide.src} className={`bhi-banner__slide${i === current ? " bhi-banner__slide--active" : ""}`} aria-hidden={i !== current}>
                    <img src={slide.src} alt={i === current ? slide.alt : ""} loading={i === 0 ? "eager" : "lazy"} />
                </div>
            ))}
            {/* A steady dark band, independent of which photo is showing,
                so a fixed transparent navbar reads clearly above it. */}
            <div className="bhi-banner__navscrim" aria-hidden="true" />

            <motion.div
                className="bhi-banner__content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.span variants={itemVariants} className="bhi-banner__mark">BH Ventures signals</motion.span>
                <motion.p
                    variants={headingContainerVariants}
                    className="bhi-banner__title"
                    aria-label="Insights worth building on"
                >
                    {"Insights worth building on".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            variants={wordVariants}
                            style={{ display: "inline-block", marginRight: "0.28em" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>
                <motion.p variants={itemVariants} className="bhi-banner__subtitle">
                    Field notes on AI, Web3, markets, analytics and marketing, written plainly and updated often.
                </motion.p>
                <motion.div variants={itemVariants} className="bhi-banner__row">
                    <div className="bhi-banner__dots" role="tablist" aria-label="Choose a photograph">
                        {BANNER_SLIDES.map((slide, i) => (
                            <button
                                key={slide.src}
                                type="button"
                                role="tab"
                                aria-selected={i === current}
                                aria-label={`Show photograph ${i + 1} of ${BANNER_SLIDES.length}`}
                                className={`bhi-banner__dot${i === current ? " bhi-banner__dot--active" : ""}`}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        className="bhi-banner__toggle"
                        aria-pressed={paused}
                        aria-label={paused ? "Resume rotating photographs" : "Pause rotating photographs"}
                        onClick={() => setPaused((p) => !p)}
                    >
                        {paused ? "▶" : "❚❚"}
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Marks: the shape says what kind of writing this is                 */
/* ------------------------------------------------------------------ */

const TYPE_ICONS: Record<ContentType, LucideIcon> = {
    insight: Globe2,
    trend: Handshake,
    opinion: TrendingUp,
    internal: Grid3X3,
};

function TypeMark({ type }: { type: ContentType }) {
    const Icon = TYPE_ICONS[type];

    return (
        <span className="bhi-kind">
            <span className={`bhi-kind__mark bhi-kind__mark--${type}`} aria-hidden="true">
                <Icon size={14} strokeWidth={2.2} />
            </span>
            <span className="bhi-kind__text">{TYPE_LABELS[type].name}</span>
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  Fallback cover, drawn when an article has no photograph            */
/* ------------------------------------------------------------------ */

function Cover({ kind, label }: { kind: CategoryId; label: string }) {
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
    const clip = `bhv-${uid}`;
    const line = "rgba(255,255,255,0.4)";
    const wash = categoryColor(kind);

    let shapes: ReactNode = null;

    switch (kind) {
        case "ai": {
            const nodes: [number, number][] = [[80, 92], [196, 54], [312, 112], [140, 186], [268, 196]];
            const links: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [2, 4]];
            shapes = (
                <>
                    {links.map(([a, b], i) => (
                        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={line} strokeWidth={1.5} />
                    ))}
                    {nodes.map(([x, y], i) => (
                        <rect key={i} x={x - 9} y={y - 9} width={18} height={18} fill={i === 1 ? wash : "none"} stroke={line} strokeWidth={1.5} />
                    ))}
                </>
            );
            break;
        }
        case "web3":
            shapes = (
                <>
                    <rect x={48} y={62} width={116} height={64} fill="none" stroke={line} strokeWidth={1.5} />
                    <rect x={142} y={104} width={116} height={64} fill={wash} />
                    <rect x={236} y={146} width={116} height={64} fill="none" stroke={line} strokeWidth={1.5} />
                    <line x1={164} y1={94} x2={142} y2={136} stroke={line} strokeWidth={1.5} />
                    <line x1={258} y1={136} x2={236} y2={178} stroke={line} strokeWidth={1.5} />
                </>
            );
            break;
        case "market": {
            const heights = [52, 88, 70, 122, 104, 158];
            const base = 220;
            shapes = (
                <>
                    <line x1={40} y1={base} x2={368} y2={base} stroke={line} strokeWidth={1.5} />
                    {heights.map((h, i) => {
                        const x = 48 + i * 54;
                        return <rect key={i} x={x} y={base - h} width={30} height={h} fill={i >= 4 ? wash : "none"} stroke={line} strokeWidth={1.5} />;
                    })}
                </>
            );
            break;
        }
        case "analytics":
            shapes = (
                <>
                    <circle cx={132} cy={130} r={62} fill="none" stroke={line} strokeWidth={22} />
                    <circle cx={132} cy={130} r={62} fill="none" stroke={wash} strokeWidth={22} strokeDasharray="160 230" transform="rotate(-90 132 130)" />
                    {[0, 1, 2].map((i) => (
                        <line key={i} x1={240} y1={96 + i * 34} x2={240 + (i + 1) * 40} y2={96 + i * 34} stroke={line} strokeWidth={6} />
                    ))}
                </>
            );
            break;
        case "marketing":
            shapes = (
                <>
                    {[54, 100, 146].map((r, i) => (
                        <path key={r} d={`M86 ${190 - r} A${r} ${r} 0 0 1 ${86 + r} 190`} fill="none" stroke={i === 1 ? wash : line} strokeWidth={i === 1 ? 10 : 1.5} />
                    ))}
                    <rect x={46} y={168} width={44} height={44} fill={line} />
                </>
            );
            break;
        case "future":
            shapes = (
                <>
                    <rect x={92} y={176} width={216} height={36} fill={wash} />
                    <rect x={122} y={128} width={156} height={36} fill="none" stroke={line} strokeWidth={1.5} />
                    <rect x={152} y={80} width={96} height={36} fill="none" stroke={line} strokeWidth={1.5} />
                    <line x1={200} y1={48} x2={200} y2={76} stroke={line} strokeWidth={1.5} strokeDasharray="3 5" />
                </>
            );
            break;
    }

    return (
        <svg className="bhi-cover" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
            <defs>
                <clipPath id={clip}>
                    <rect width="400" height="260" />
                </clipPath>
            </defs>
            <rect width="400" height="260" fill={INK} />
            <g clipPath={`url(#${clip})`}>{shapes}</g>
        </svg>
    );
}

/** A photograph when there is one, otherwise the drawn cover. */
function Visual({ article }: { article: Article }) {
    if (article.photo) {
        return (
            <span className="bhi-photo-wrap">
                <img className="bhi-photo__img" src={article.photo.src} alt={article.photo.alt} loading="lazy" decoding="async" />
            </span>
        );
    }
    return <Cover kind={article.category} label={`Illustration for ${categoryLabel(article.category)}`} />;
}

/* ------------------------------------------------------------------ */
/*  Charts, drawn by hand so they inherit the page's palette           */
/* ------------------------------------------------------------------ */

function Chart({ spec, accent = "#2340D6" }: { spec: ChartSpec; accent?: string }) {
    const note = spec.note === undefined ? DEFAULT_NOTE : spec.note;

    let body: ReactNode = null;
    let legend: ReactNode = null;

    switch (spec.kind) {
        case "bars": {
            const max = Math.max(...spec.data.map((d) => d.value));
            const rowH = 296 / spec.data.length;
            body = (
                <>
                    <line x1={246} x2={246} y1={10} y2={316} stroke={RULE} strokeWidth={1} />
                    {spec.data.map((d, i) => {
                        const cy = 12 + i * rowH + rowH / 2;
                        const w = Math.max(6, (d.value / max) * 296);
                        const h = Math.min(26, rowH - 14);
                        return (
                            <g key={d.label}>
                                <text x={232} y={cy + 5} textAnchor="end" className="bhi-svg-label">{d.label}</text>
                                <rect x={246} y={cy - h / 2} width={w} height={h} fill={d.highlight ? accent : "none"} stroke={d.highlight ? accent : MUTED} strokeWidth={1.25} />
                                <text x={246 + w + 10} y={cy + 5} className="bhi-svg-value">
                                    {d.value}
                                    {spec.unit ?? ""}
                                </text>
                            </g>
                        );
                    })}
                </>
            );
            break;
        }

        case "line": {
            const x0 = 58, x1 = 600, y0 = 24, y1 = 290;
            const n = spec.xLabels.length;
            const X = (i: number) => x0 + (i * (x1 - x0)) / (n - 1);
            const Y = (v: number) => y1 - (v / 100) * (y1 - y0);
            let plain = 0;
            const styled = spec.series.map((s) => {
                const style = s.accent
                    ? { stroke: accent, width: 3, dash: undefined as string | undefined }
                    : plain++ === 0
                        ? { stroke: INK, width: 1.75, dash: undefined as string | undefined }
                        : { stroke: MUTED, width: 1.75, dash: "7 6" };
                return { s, style };
            });
            body = (
                <>
                    {[0, 50, 100].map((v) => (
                        <line key={v} x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} stroke={RULE} strokeWidth={1} />
                    ))}
                    {spec.xLabels.map((l, i) =>
                        l ? <text key={i} x={X(i)} y={318} textAnchor="middle" className="bhi-svg-axis">{l}</text> : null
                    )}
                    <text transform={`translate(18 ${(y0 + y1) / 2}) rotate(-90)`} textAnchor="middle" className="bhi-svg-axis">
                        {spec.yLabel}
                    </text>
                    {styled.map(({ s, style }) => {
                        const pts = s.values.map((v, i) => `${X(i)},${Y(v)}`).join(" ");
                        const last = s.values.length - 1;
                        return (
                            <g key={s.name}>
                                <polyline points={pts} fill="none" stroke={style.stroke} strokeWidth={style.width} strokeDasharray={style.dash} strokeLinejoin="round" strokeLinecap="round" />
                                <circle cx={X(last)} cy={Y(s.values[last])} r={4.5} fill={style.stroke} />
                            </g>
                        );
                    })}
                </>
            );
            legend = (
                <ul className="bhi-legend">
                    {styled.map(({ s, style }) => (
                        <li key={s.name}>
                            <span
                                className="bhi-legend__swatch"
                                style={
                                    style.dash
                                        ? { backgroundImage: `repeating-linear-gradient(90deg, ${style.stroke} 0 7px, transparent 7px 13px)` }
                                        : { backgroundColor: style.stroke }
                                }
                            />
                            {s.name}
                        </li>
                    ))}
                </ul>
            );
            break;
        }

        case "donut": {
            const r = 88, cx = 148, cy = 168;
            const C = 2 * Math.PI * r;
            const total = spec.data.reduce((a, d) => a + d.value, 0) || 1;
            const fills = [accent, INK, RULE, MUTED];
            let acc = 0;
            body = (
                <>
                    {spec.data.map((d, i) => {
                        const len = (d.value / total) * C;
                        const el = (
                            <circle
                                key={d.label}
                                cx={cx}
                                cy={cy}
                                r={r}
                                fill="none"
                                stroke={fills[i % fills.length]}
                                strokeWidth={34}
                                strokeDasharray={`${len} ${C - len}`}
                                strokeDashoffset={-acc}
                                transform={`rotate(-90 ${cx} ${cy})`}
                            />
                        );
                        acc += len;
                        return el;
                    })}
                    {spec.data.map((d, i) => (
                        <g key={d.label} transform={`translate(312 ${92 + i * 72})`}>
                            <rect width={14} height={14} y={-2} fill={fills[i % fills.length]} />
                            <text x={26} y={10} className="bhi-svg-label">{d.label}</text>
                            <text x={26} y={38} className="bhi-svg-value">{Math.round((d.value / total) * 100)}%</text>
                        </g>
                    ))}
                </>
            );
            break;
        }

        case "matrix": {
            const x0 = 72, y0 = 22, w = 528, h = 268;
            const mx = x0 + w / 2, my = y0 + h / 2;
            body = (
                <>
                    <rect x={mx} y={y0} width={w / 2} height={h / 2} fill={accent} fillOpacity={0.08} />
                    <rect x={x0} y={y0} width={w} height={h} fill="none" stroke={RULE} strokeWidth={1} />
                    <line x1={mx} x2={mx} y1={y0} y2={y0 + h} stroke={RULE} strokeDasharray="5 5" />
                    <line x1={x0} x2={x0 + w} y1={my} y2={my} stroke={RULE} strokeDasharray="5 5" />
                    <text x={x0 + w - 12} y={y0 + 24} textAnchor="end" className="bhi-svg-quad" style={{ fill: accent }}>{spec.quadrant}</text>
                    <text x={x0 + w / 2} y={320} textAnchor="middle" className="bhi-svg-axis">{spec.xLabel}</text>
                    <text transform={`translate(20 ${y0 + h / 2}) rotate(-90)`} textAnchor="middle" className="bhi-svg-axis">{spec.yLabel}</text>
                    {spec.points.map((p) => {
                        const px = x0 + (p.x / 100) * w;
                        const py = y0 + ((100 - p.y) / 100) * h;
                        const left = p.x > 55;
                        return (
                            <g key={p.label}>
                                <circle cx={px} cy={py} r={5} fill={accent} />
                                <text x={left ? px - 12 : px + 12} y={py + 5} textAnchor={left ? "end" : "start"} className="bhi-svg-label">
                                    {p.label}
                                </text>
                            </g>
                        );
                    })}
                </>
            );
            break;
        }

        case "curve": {
            const x0 = 52, x1 = 600, y0 = 34, y1 = 284;
            const S = (t: number) => 1 / (1 + Math.exp(-9 * (t - 0.5)));
            const s0 = S(0), s1 = S(1);
            const pt = (t: number): [number, number] => [x0 + t * (x1 - x0), y1 - ((S(t) - s0) / (s1 - s0)) * (y1 - y0)];
            const line = Array.from({ length: 61 }, (_, i) => pt(i / 60)).map((p) => p.join(",")).join(" ");
            body = (
                <>
                    <line x1={x0} x2={x1} y1={y1} y2={y1} stroke={RULE} strokeWidth={1} />
                    <line x1={x0} x2={x0} y1={y0} y2={y1} stroke={RULE} strokeWidth={1} />
                    <polyline points={line} fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <text x={(x0 + x1) / 2} y={318} textAnchor="middle" className="bhi-svg-axis">{spec.xLabel}</text>
                    <text transform={`translate(18 ${(y0 + y1) / 2}) rotate(-90)`} textAnchor="middle" className="bhi-svg-axis">{spec.yLabel}</text>
                    {spec.marks.map((m) => {
                        const [px, py] = pt(m.at);
                        return (
                            <g key={m.label}>
                                <line x1={px} x2={px} y1={py} y2={y1} stroke={RULE} strokeWidth={1} />
                                <circle cx={px} cy={py} r={5} fill={accent} />
                                <text x={px} y={py - 16} textAnchor="middle" className="bhi-svg-label">{m.label}</text>
                            </g>
                        );
                    })}
                </>
            );
            break;
        }

        case "flow":
            /* Drawn as an ordered list below, not as SVG: the steps are a
               real sequence and belong in the document outline. */
            break;
    }

    return (
        <figure className="bhi-chart">
            <figcaption className="bhi-chart__title">{spec.title}</figcaption>

            {spec.kind === "flow" ? (
                <ol className="bhi-flow" style={{ "--n": spec.steps.length } as CSSProperties} aria-label={spec.summary}>
                    {spec.steps.map((s, i) => (
                        <li key={s.label} className="bhi-flow__step">
                            <span className="bhi-flow__head">
                                <span className="bhi-flow__num">{i + 1}</span>
                                <span className="bhi-flow__label">{s.label}</span>
                            </span>
                            <span className="bhi-flow__detail">{s.detail}</span>
                        </li>
                    ))}
                </ol>
            ) : (
                <div className="bhi-chart__scroll" tabIndex={0} role="group" aria-label={`${spec.title}. Scrolls sideways on small screens.`}>
                    <svg className="bhi-chart__svg" viewBox="0 0 640 336" role="img" aria-label={spec.summary}>
                        {body}
                    </svg>
                </div>
            )}

            {legend}
            {note && <p className="bhi-chart__note">{note}</p>}
        </figure>
    );
}

/* ------------------------------------------------------------------ */
/*  Prose                                                              */
/* ------------------------------------------------------------------ */

function renderBlock(b: Block, i: number, accent: string) {
    switch (b.t) {
        case "p":
            return <p key={i}>{b.text}</p>;
        case "h":
            return <h3 key={i}>{b.text}</h3>;
        case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
        case "list":
            return (
                <ul key={i}>
                    {b.items.map((it, j) => (
                        <li key={j}>{it}</li>
                    ))}
                </ul>
            );
        case "callout":
            return (
                <aside key={i} className="bhi-callout">
                    <p className="bhi-callout__label">{b.label}</p>
                    <p className="bhi-callout__text">{b.text}</p>
                </aside>
            );
        case "chart":
            return <Chart key={i} spec={b.spec} accent={accent} />;
    }
}

/* ------------------------------------------------------------------ */
/*  Reading progress: answers the reader's own scrolling               */
/* ------------------------------------------------------------------ */

function ReadingProgress({ target }: { target: RefObject<HTMLDivElement | null> }) {
    const [done, setDone] = useState(0);

    useEffect(() => {
        const update = () => {
            const el = target.current;
            if (!el) return;
            const { top, height } = el.getBoundingClientRect();
            const scrollable = height - window.innerHeight;
            setDone(scrollable <= 0 ? 1 : Math.min(1, Math.max(0, -top / scrollable)));
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [target]);

    return (
        <div className="bhi-progress" aria-hidden="true">
            <span className="bhi-progress__bar" style={{ transform: `scaleX(${done})` }} />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal: the four below-grid sections animate in the first   */
/*  time they enter the viewport, instead of just appearing.           */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.18 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return { ref, visible };
}

/** Animates the numeric portion of a label ("50+", "$150M+", "100%")
    from zero up to its value once `active` turns true. Prefix/suffix
    text around the number is left untouched. */
function useCountUp(target: string, active: boolean, duration = 1100) {
    const match = target.match(/[\d.]+/);
    const [display, setDisplay] = useState(match ? target.replace(match[0], "0") : target);

    useEffect(() => {
        if (!match) {
            setDisplay(target);
            return;
        }
        if (!active) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(target);
            return;
        }
        const end = parseFloat(match[0]);
        const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(target.replace(match[0], (end * eased).toFixed(decimals)));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return display;
}

function StatItem({ number, label, detail, active, i }: { number: string; label: string; detail: string; active: boolean; i: number }) {
    const [countActive, setCountActive] = useState(active);
    const shown = useCountUp(number, countActive);
    return (
        <motion.div
            className="bhi-stats__item"
            style={{ "--stat-i": i } as CSSProperties}
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onAnimationComplete={() => setCountActive(true)}
        >
            <span className="bhi-stats__number">{shown}</span>
            <span className="bhi-stats__label">{label}</span>
            <span className="bhi-stats__detail">{detail}</span>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function Insights() {
    const [active, setActive] = useState<CategoryId | "all">("all");
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const readerTitleRef = useRef<HTMLHeadingElement>(null);
    const firstRun = useRef(true);

    /* The open article lives in the URL hash, so a piece can be linked and shared. */
    useEffect(() => {
        const sync = () => {
            const match = window.location.hash.match(/^#insights\/(.+)$/);
            setOpenSlug(match ? decodeURIComponent(match[1]) : null);
        };
        sync();
        window.addEventListener("hashchange", sync);
        return () => window.removeEventListener("hashchange", sync);
    }, []);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        if (openSlug) readerTitleRef.current?.focus({ preventScroll: true });
    }, [openSlug]);

    const index = ARTICLES.findIndex((a) => a.slug === openSlug);
    const article = index >= 0 ? ARTICLES[index] : null;
    const next = article ? ARTICLES[(index + 1) % ARTICLES.length] : null;

    const visible = useMemo(
        () => (active === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === active)),
        [active]
    );
    const counts = useMemo(() => {
        const map = new Map<CategoryId, number>();
        for (const a of ARTICLES) map.set(a.category, (map.get(a.category) ?? 0) + 1);
        return map;
    }, []);

    const usedTypes = (Object.keys(TYPE_LABELS) as ContentType[]).filter((t) => ARTICLES.some((a) => a.type === t));
    const keyCards: Array<{ type: ContentType; icon: LucideIcon; title: string; text: string }> = [
        { type: "insight", icon: Globe2, title: TYPE_LABELS.insight.name, text: TYPE_LABELS.insight.meaning },
        { type: "trend", icon: Handshake, title: TYPE_LABELS.trend.name, text: TYPE_LABELS.trend.meaning },
        { type: "opinion", icon: TrendingUp, title: TYPE_LABELS.opinion.name, text: TYPE_LABELS.opinion.meaning },
        { type: "internal", icon: Grid3X3, title: TYPE_LABELS.internal.name, text: TYPE_LABELS.internal.meaning },
    ];

    const statsReveal = useReveal<HTMLDivElement>();
    const dispatchReveal = useReveal<HTMLDivElement>();
    const advisoryReveal = useReveal<HTMLDivElement>();
    const keyReveal = useReveal<HTMLDivElement>();

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [copied, setCopied] = useState(false);
    const [dispatchSignal, setDispatchSignal] = useState<keyof typeof DISPATCH_SIGNALS>("ai");

    const signal = DISPATCH_SIGNALS[dispatchSignal];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2400);
        }
    };

    return (
        <section className="bhi" id="insights" ref={sectionRef} aria-labelledby="bhi-title">
            {!article && <HeroBanner />}

            {!article && (
                <div className="bhi__inner">
                    <motion.div
                        className="bhi-dateline"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.div variants={itemVariants} className="bhi-dateline__top">
                            <span className="bhi-dateline__kicker">
                                <span className="bhi-dateline__kicker-dot" aria-hidden="true" />
                                BH Ventures Signals
                            </span>
                            <span className="bhi-dateline__issue" aria-hidden="true">
                                Issue N° {String(ARTICLES.length).padStart(2, "0")} — Updated weekly
                            </span>
                        </motion.div>
                        <motion.h2
                            id="bhi-title"
                            className="bhi-dateline__title"
                            variants={headingContainerVariants}
                        >
                            {["Ins", "ights"].map((part, i) =>
                                i === 0 ? (
                                    <motion.span key={i} variants={wordVariants} style={{ display: "inline" }}>{part}</motion.span>
                                ) : (
                                    <motion.span key={i} variants={wordVariants} className="bhi-dateline__title-accent" style={{ display: "inline" }}>{part}</motion.span>
                                )
                            )}
                        </motion.h2>
                        <motion.p variants={itemVariants} className="bhi-dateline__blurb">
                            Research notes from the BH Ventures team on AI, Web3, markets, analytics and marketing. Our own
                            thinking, and never about a named client.
                        </motion.p>
                        <motion.figure
                            variants={itemVariants}
                            className="bhi-dateline__image"
                        >
                            <img
                                src="/images/ai-innovation/product-innovation.jpg"
                                alt="A glowing lightbulb beside research notes and a laptop"
                            />
                            <figcaption>An idea is useful when it changes a decision.</figcaption>
                        </motion.figure>
                    </motion.div>

                    <motion.div
                        className="bhi-filters"
                        role="group"
                        aria-label="Filter insights by topic"
                        variants={filterContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        <motion.button
                            type="button"
                            className="bhi-filter"
                            aria-pressed={active === "all"}
                            onClick={() => setActive("all")}
                            style={{ "--fc": "#3fe3b0" } as CSSProperties}
                            variants={filterItemVariants}
                            whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                            Everything
                            <span className="bhi-filter__count">{ARTICLES.length}</span>
                        </motion.button>
                        {CATEGORIES.map((c) => (
                            <motion.button
                                key={c.id}
                                type="button"
                                className="bhi-filter"
                                aria-pressed={active === c.id}
                                onClick={() => setActive(c.id)}
                                style={{ "--fc": c.color } as CSSProperties}
                                variants={filterItemVariants}
                                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                            >
                                {c.label}
                                <span className="bhi-filter__count">{counts.get(c.id) ?? 0}</span>
                            </motion.button>
                        ))}
                    </motion.div>

                    {visible.length > 0 ? (
                        <motion.div
                            key={active}
                            className="bhi-grid"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                        >
                            {visible.map((a, i) => {
                                const color = categoryColor(a.category);
                                return (
                                    <motion.article
                                        key={a.slug}
                                        className={`bhi-tile${i === 0 ? " bhi-tile--feature" : ""}`}
                                        style={{ "--tile-i": i, "--accent": color } as CSSProperties}
                                        variants={{
                                            hidden: { opacity: 0, y: 24, scale: 0.97 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                            },
                                        }}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.18 }}
                                        whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.3 } }}
                                    >
                                        <a className="bhi-tile__link" href={`#insights/${a.slug}`}>
                                            <span className="bhi-tile__media">
                                                <Visual article={a} />
                                            </span>
                                            <span className="bhi-tile__body">
                                                <span className="bhi-tile__meta">
                                                    <span className="bhi-tile__index">{String(i + 1).padStart(2, "0")}</span>
                                                    <span className="bhi-tile__eyebrow" style={{ color }}>{categoryLabel(a.category)}</span>
                                                    <span className="bhi-tile__time">{a.minutes} min read</span>
                                                </span>
                                                <span className="bhi-tile__title">{a.title}</span>
                                                <span className="bhi-tile__thesis">{a.excerpt}</span>
                                                <TypeMark type={a.type} />
                                                <span className="bhi-tile__read">Read the field note <span aria-hidden="true">↗</span></span>
                                            </span>
                                        </a>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.p
                            key="empty"
                            className="bhi-empty"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            This is the only piece on this topic so far. Pick another topic, or choose Everything to see all
                            {" "}{ARTICLES.length} pieces.
                        </motion.p>
                    )}

                    {/* -------------------- Attractive Below-Cards Sections -------------------- */}

                    {/* 1. Research Highlights & Impact Counters */}
                    <motion.div
                        ref={statsReveal.ref}
                        className={`bhi-stats ${statsReveal.visible ? "bhi-reveal--in" : "bhi-reveal"}`}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <StatItem i={0} active={statsReveal.visible} number="50+" label="Strategic Briefings" detail="Original research on technology, trade & growth" />
                        <StatItem i={1} active={statsReveal.visible} number="6" label="Global Verticals" detail="AI, Web3, Trade, Digital Analytics & Marketing" />
                        <StatItem i={2} active={statsReveal.visible} number="$150M+" label="Dealflow Tracked" detail="Frontier market data and real-time execution models" />
                        <StatItem i={3} active={statsReveal.visible} number="100%" label="Proprietary Analysis" detail="Written directly by the BH Ventures team in Dubai" />
                    </motion.div>

                    {/* 2. Interactive Weekly Dispatch Newsletter */}
                    <motion.div
                        ref={dispatchReveal.ref}
                        className={`bhi-dispatch ${dispatchReveal.visible ? "bhi-reveal--in" : "bhi-reveal"}`}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.div variants={itemVariants} className="bhi-dispatch__content">
                            <motion.span variants={itemVariants} className="bhi-dispatch__badge">BH Ventures / Signals</motion.span>
                            <motion.h3 variants={itemVariants} className="bhi-dispatch__title">Stay ahead of the signal.</motion.h3>
                            <motion.p variants={itemVariants} className="bhi-dispatch__desc">
                                One useful idea on technology, trade and growth.
                            </motion.p>
                            <div className="bhi-dispatch__signals" role="tablist" aria-label="Choose a research signal">
                                {(Object.keys(DISPATCH_SIGNALS) as Array<keyof typeof DISPATCH_SIGNALS>).map((key, index) => (
                                    <button
                                        key={key}
                                        type="button"
                                        role="tab"
                                        aria-selected={dispatchSignal === key}
                                        className={`bhi-dispatch__signal${dispatchSignal === key ? " bhi-dispatch__signal--active" : ""}`}
                                        onClick={() => setDispatchSignal(key)}
                                    >
                                        <span className="bhi-dispatch__signal-number">0{index + 1}</span>
                                        {DISPATCH_SIGNALS[key].label}
                                    </button>
                                ))}
                            </div>
                            <div className="bhi-dispatch__readout" aria-live="polite">
                                <span className="bhi-dispatch__readout-label"><i aria-hidden="true" /> Now / {signal.label}</span>
                                <strong>{signal.title}</strong>
                                <span>{signal.detail}</span>
                            </div>
                            {subscribed ? (
                                <div className="bhi-dispatch__success">
                                    <span className="bhi-dispatch__check" aria-hidden="true">✓</span>
                                    <span>You are subscribed. Welcome to BH Ventures Signals.</span>
                                </div>
                            ) : (
                                <motion.form variants={itemVariants} className="bhi-dispatch__form" onSubmit={handleSubscribe}>
                                    <input
                                        type="email"
                                        className="bhi-dispatch__input"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="bhi-dispatch__btn">
                                        Subscribe
                                    </button>
                                </motion.form>
                            )}
                            <motion.p variants={itemVariants} className="bhi-dispatch__note">Weekly. Useful. Unsubscribe anytime.</motion.p>
                            <motion.a
                                variants={itemVariants}
                                className="bhi-dispatch__email-link"
                                href="/contact"
                            >
                                Talk to us <span aria-hidden="true">↗</span>
                            </motion.a>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, scale: 0.88 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            className="bhi-dispatch__visual"
                            aria-hidden="true"
                        >
                            <span className="bhi-dispatch__orbit-ring bhi-dispatch__orbit-ring--outer" />
                            <span className="bhi-dispatch__orbit-ring bhi-dispatch__orbit-ring--inner" />
                            <span className="bhi-dispatch__orbit-rotator">
                                <span className="bhi-dispatch__orbit-dot" />
                            </span>
                            <span className="bhi-dispatch__orbit-core">✦</span>
                            <span className="bhi-dispatch__chip bhi-dispatch__chip--a">Confidence: {signal.confidence}</span>
                            <span className="bhi-dispatch__chip bhi-dispatch__chip--b">Next: Thursday</span>
                        </motion.div>
                    </motion.div>

                    {/* 3. Advisory & Venture Partnership CTA */}
                    <motion.div
                        ref={advisoryReveal.ref}
                        className={`bhi-advisory ${advisoryReveal.visible ? "bhi-reveal--in" : "bhi-reveal"}`}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <div className="bhi-advisory__glow" aria-hidden="true" />
                        <motion.div variants={itemVariants} className="bhi-advisory__body">
                            <motion.span variants={itemVariants} className="bhi-advisory__eyebrow">Choose your next build</motion.span>
                            <motion.h3 variants={itemVariants} className="bhi-advisory__title">What are you trying to move forward?</motion.h3>
                            <motion.p variants={itemVariants} className="bhi-advisory__text">
                                Point us at the constraint. We connect research, operators and execution around the opportunity in front of you.
                            </motion.p>
                            <motion.div variants={itemVariants} className="bhi-advisory__actions">
                                <a href="/ventures" className="bhi-btn bhi-btn--secondary">
                                    Explore Our Ventures
                                </a>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="bhi-advisory__visual"
                        >
                            <img
                                src="/images/operations/photo.jpg"
                                alt="Growth chart representing strategic venture execution"
                            />
                            <div className="bhi-advisory__visual-overlay">
                                <span>BH / FIELD NOTE</span>
                                <strong>Research into momentum.</strong>
                            </div>
                            <span className="bhi-advisory__visual-index">04 / 04</span>
                        </motion.div>
                    </motion.div>

                    {/* 4. Reading the Marks Key */}
                    <motion.div
                        ref={keyReveal.ref}
                        className={`bhi-key-card ${keyReveal.visible ? "bhi-reveal--in" : "bhi-reveal"}`}
                        aria-label="How we label our writing"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        <motion.div variants={itemVariants} className="bhi-key-card__head">
                            <h4 className="bhi-key-card__title">Editorial Taxonomy & Marks</h4>
                            <p className="bhi-key-card__subtitle">Every piece is tagged with a distinct geometric mark indicating its analytical perspective.</p>
                        </motion.div>
                        <motion.div
                            className="bhi-key-card__grid"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
                            }}
                        >
                            {keyCards.map(({ type, icon: Icon, title, text }, i) => (
                                <motion.div
                                    className="bhi-key-card__item"
                                    key={type}
                                    style={{ "--key-i": i } as CSSProperties}
                                    variants={{
                                        hidden: { opacity: 0, y: 14, scale: 0.96 },
                                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
                                    }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <span className="bhi-key-card__index">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="bhi-key-card__icon-wrap" aria-hidden="true">
                                        <Icon className="bhi-key-card__icon" />
                                    </span>
                                    <span className="bhi-key-card__label">{title}</span>
                                    <p className="bhi-key-card__meaning">{text}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* -------------------- Upgraded Reader View -------------------- */}
            {article && next && (
                <div className="bhi__inner bhi__inner--reader">
                    <div className="bhi-reader-nav">
                        <a className="bhi-back" href="#insights">
                            <span aria-hidden="true">←</span> Back to all insights
                        </a>
                        <button type="button" className="bhi-share-btn" onClick={handleCopy}>
                            {copied ? "✓ Copied to clipboard" : "Share Article"}
                        </button>
                    </div>

                    <div className="bhi-reader" ref={sheetRef} style={{ "--accent": categoryColor(article.category) } as CSSProperties}>
                        <ReadingProgress target={sheetRef} />

                        <header className="bhi-reader__head">
                            <div className="bhi-reader__meta">
                                <span className="bhi-reader__topic" style={{ color: categoryColor(article.category), borderColor: categoryColor(article.category) }}>
                                    <span className="bhi-reader__dot" style={{ backgroundColor: categoryColor(article.category) }} />
                                    {categoryLabel(article.category)}
                                </span>
                                <TypeMark type={article.type} />
                                <span className="bhi-reader__time">{article.minutes} minute read</span>
                            </div>

                            <h1 id="bhi-title" className="bhi-reader__title" tabIndex={-1} ref={readerTitleRef}>
                                {article.title}
                            </h1>

                            <p className="bhi-reader__lede">{article.excerpt}</p>

                            <div className="bhi-reader__desk">
                                <div className="bhi-reader__desk-avatar">BH</div>
                                <div>
                                    <p className="bhi-reader__desk-name">BH Ventures Team</p>
                                    <p className="bhi-reader__desk-meta">Dubai, UAE · Proprietary Strategy & Analysis</p>
                                </div>
                            </div>
                        </header>

                        {article.photo && (
                            <div className="bhi-reader__hero-media">
                                <img src={article.photo.src} alt={article.photo.alt} />
                            </div>
                        )}

                        <div className="bhi-reader__layout">
                            <aside className="bhi-reader__aside" aria-label="Key takeaways and summary">
                                <div className="bhi-brief">
                                    <div className="bhi-brief__top">
                                        <span className="bhi-brief__spark" aria-hidden="true">✦</span>
                                        <p className="bhi-brief__title">Key Takeaways</p>
                                    </div>
                                    <ul>
                                        {article.takeaways.map((t, i) => (
                                            <li key={i}>{t}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bhi-reader-card">
                                    <p className="bhi-reader-card__title">Need tailored research?</p>
                                    <p className="bhi-reader-card__desc">Our team provides custom market analysis and technical advisory for institutional partners.</p>
                                    <a href="/contact" className="bhi-reader-card__link">Speak with our desk →</a>
                                </div>
                            </aside>

                            <div className="bhi-prose">
                                {article.body.map((b, i) => renderBlock(b, i, categoryColor(article.category)))}
                            </div>
                        </div>

                        <div className="bhi-reader__share-bar">
                            <div>
                                <p className="bhi-reader__share-title">Found this perspective insightful?</p>
                                <p className="bhi-reader__share-desc">Share this research briefing with your team or network.</p>
                            </div>
                            <button type="button" className="bhi-share-action" onClick={handleCopy}>
                                {copied ? "✓ Link Copied!" : "Copy Article Link"}
                            </button>
                        </div>
                    </div>

                    <a className="bhi-next" href={`#insights/${next.slug}`} style={{ "--accent": categoryColor(next.category) } as CSSProperties}>
                        <div className="bhi-next__content">
                            <span className="bhi-next__label">Next Insight</span>
                            <span className="bhi-next__title">{next.title}</span>
                            <span className="bhi-next__meta">{categoryLabel(next.category)} · {next.minutes} min read</span>
                        </div>
                        <span className="bhi-next__icon" aria-hidden="true">→</span>
                    </a>
                </div>
            )}
        </section>
    );
}