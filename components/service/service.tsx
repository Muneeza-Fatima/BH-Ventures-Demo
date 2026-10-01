"use client";

import { useState, useId, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent, SyntheticEvent } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Droplets,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { BH_WHATSAPP_NUMBER, BH_WHATSAPP_DISPLAY } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/contact/contactData";
import "./service.css";

/* ================================================================
   FRAMER-MOTION VARIANTS — matching home page HeroContent style
   ================================================================ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const copyContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const itemUpSlow = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
};

const headingWord = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.75, ease: EASE, delay: 0.35 } },
};

const statItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const pillTop = {
  hidden: { opacity: 0, y: -12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 0.55 } },
};

const pillBottom = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 0.7 } },
};

/* Viewport Scroll Animation Variants (matching home page motion) */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionHeaderMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

const gridContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const gridContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const cardUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

const cardSlideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const cardSlideRight = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const cardScale = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};


/* ------------------------------------------------------------------ */
/* Verified Unsplash External Images (High Resolution & Free License) */
/* ------------------------------------------------------------------ */
const IMG_HERO = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=2200";
const IMG_FACILITY = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=85&w=1600";
const IMG_POWER = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800";
const IMG_COOLING = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";
const IMG_SECURITY = "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800";
const IMG_AI_ROUTING = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800";
const IMG_HARDWARE = "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800";
const IMG_CTA = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600";
/* ------------------------------------------------------------------ */
/* Animated hero images (Unsplash helper + fallback)                  */
/* ------------------------------------------------------------------ */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const FALLBACK_IMG = "/service-hero.jpg";

// If any remote image fails, swap in the local fallback once.
const onImgError = (e: SyntheticEvent<HTMLImageElement>) => {
  const el = e.currentTarget;
  if (!el.dataset.fb) {
    el.dataset.fb = "1";
    el.src = FALLBACK_IMG;
  }
};

const HERO_SLIDES = [
  { src: "/service-hero.jpg", label: "OSLO CAMPUS // HALL A" },
  { src: U("1558346490-a72e53ae2d4f", 2000), label: "ROW 14-B // ASIC RACKS" },
  { src: U("1544197150-b99a580bb7a8", 2000), label: "TIER-3 SERVER CORRIDOR" },
  { src: U("1451187580459-43490279c0fa", 2000), label: "GLOBAL NODE NETWORK" },
  { src: U("1497435334941-8c899ee9e8e9", 2000), label: "WIND + HYDRO POWER FEED" },
  { src: U("1518546305927-5a555bb7020d", 2000), label: "BTC BLOCK SETTLEMENT" },
];

const FLOAT_PHOTOS = [
  { src: U("1629654297299-c8506221ca97", 600), cls: "fp-a", tag: "S21 Pro Hydro" },
  { src: U("1518770660439-4636190af475", 600), cls: "fp-b", tag: "38% Cooler" },
  { src: "/hero/ai-router.jpg", cls: "fp-c", tag: "AI Router" },
  { src: U("1509391366360-2e959784a276", 600), cls: "fp-d", tag: "Zero-Carbon" },
];

/* ------------------------------------------------------------------ */
/* Data Definitions                                                   */
/* ------------------------------------------------------------------ */
const HIGHLIGHTS = [
  { val: "4.82 EH/s", label: "Active Hashrate" },
  { val: "99.98%", label: "Uptime SLA" },
  { val: "12 Sites", label: "Global Facilities" },
];

const SPECS = [
  { val: "4.82 EH/s", label: "Total Facility Computing Power" },
  { val: "12 Data Centres", label: "Iceland, Norway, UAE, Texas" },
  { val: "1.08 PUE", label: "Ultra-Efficient Power Usage" },
  { val: "100% Green", label: "Zero-Carbon Renewable Sourced" },
];

const OPERATIONS = [
  {
    title: "100% Clean Energy",
    metric: "0g CO₂ / kWh",
    desc: "Long-term direct hydro and geothermal power purchase agreements in the Nordics ensure uninterrupted zero-carbon operations.",
    img: IMG_POWER,
    icon: Zap,
  },
  {
    title: "Immersion Liquid Cooling",
    metric: "38% Cooler Temps",
    desc: "Dielectric fluid circulation removes thermal bottlenecks, protects chips from dust oxidation, and enables sustained peak overclocking.",
    img: IMG_COOLING,
    icon: Droplets,
  },
  {
    title: "Biometric Site Security",
    metric: "SOC 2 Type II",
    desc: "Armed 24/7 physical security, biometric mantrap checkpoints, perimeter radar, and segregated network enclaves.",
    img: IMG_SECURITY,
    icon: ShieldCheck,
  },
  {
    title: "AI Hashrate Router",
    metric: "Instant Arbitrage",
    desc: "Autonomous smart-stratum engine continuously redirects compute power to optimal pools and highest-fee block templates.",
    img: IMG_AI_ROUTING,
    icon: Activity,
  },
];

const HARDWARE_FLEET = [
  {
    name: "Antminer S21 Pro Hydro",
    hashrate: "234 TH/s",
    efficiency: "15.0 J/TH",
    algo: "SHA-256 (Bitcoin)",
    status: "Active Fleet",
  },
  {
    name: "Whatsminer M60S+",
    hashrate: "192 TH/s",
    efficiency: "18.0 J/TH",
    algo: "SHA-256 (Bitcoin)",
    status: "Active Fleet",
  },
  {
    name: "Bitmain Antminer L9",
    hashrate: "16.2 GH/s",
    efficiency: "0.21 J/MH",
    algo: "Scrypt (LTC / DOGE)",
    status: "Dual-Mining Ready",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Select Hashrate Tier",
    body: "Choose the computational volume and contract length tailored to your capital allocation strategy.",
  },
  {
    n: "02",
    title: "Fund Contract",
    body: "Deposit securely via BTC, USDT, USDC, or direct institutional bank wire. Instant ledger confirmation.",
  },
  {
    n: "03",
    title: "Immediate Machine Hashing",
    body: "Your purchased terahash capacity is assigned to running enterprise rigs in our global data centres within 60 seconds.",
  },
  {
    n: "04",
    title: "Daily Automated Payouts",
    body: "Gross block rewards minus transparent hosting fees land directly in your account wallet every 24 hours.",
  },
];

const PLANS = [
  {
    name: "Starter Hash",
    hash: "25 TH/s",
    duration: "180 Days",
    hardware: "Antminer S21 Tier",
    fee: "1.1 ¢ / TH / day",
    coin: "BTC",
    payout: "Daily Automated",
    minDeposit: "$199",
    featured: false,
    badge: "",
  },
  {
    name: "Growth Pool",
    hash: "100 TH/s",
    duration: "365 Days",
    hardware: "Hydro Immersion Fleet",
    fee: "0.95 ¢ / TH / day",
    coin: "BTC / LTC",
    payout: "Daily Automated",
    minDeposit: "$699",
    featured: false,
    badge: "",
  },
  {
    name: "Pro Allocation",
    hash: "350 TH/s",
    duration: "730 Days",
    hardware: "Next-Gen S21 Pro Hydro",
    fee: "0.82 ¢ / TH / day",
    coin: "BTC / LTC / DOGE",
    payout: "Daily Automated",
    minDeposit: "$2,199",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Institutional Syndicate",
    hash: "1.5 PH/s+",
    duration: "Custom Term",
    hardware: "Dedicated Container Pod",
    fee: "Sub-0.70 ¢ Tier",
    coin: "Any Supported Coin",
    payout: "Daily / API Settlement",
    minDeposit: "Custom Quote",
    featured: false,
    badge: "Enterprise SLA",
  },
];

const COINS = [
  {
    ticker: "BTC",
    name: "Bitcoin",
    algo: "SHA-256",
    symbol: "₿",
    bg: "linear-gradient(135deg, #f7931a, #c76a00)",
    payout: "Daily Payouts",
  },
  {
    ticker: "LTC",
    name: "Litecoin",
    algo: "Scrypt",
    symbol: "Ł",
    bg: "linear-gradient(135deg, #0284c7, #1e40af)",
    payout: "Merged with DOGE",
  },
  {
    ticker: "DOGE",
    name: "Dogecoin",
    algo: "AuxPoW Scrypt",
    symbol: "Ð",
    bg: "linear-gradient(135deg, #c2a633, #8a731b)",
    payout: "Daily Payouts",
  },
  {
    ticker: "KAS",
    name: "Kaspa",
    algo: "kHeavyHash",
    symbol: "K",
    bg: "linear-gradient(135deg, #06b6d4, #0891b2)",
    payout: "Block Settlement",
  },
];

const FAQS = [
  {
    q: "How does BH Ventures cloud mining differ from buying physical rigs?",
    a: "When you mine with BH Ventures, you eliminate hardware sourcing markups, international shipping delays, import tariffs, loud noise, high residential electricity costs, and ongoing hardware maintenance. You purchase dedicated computing power already hashing in our climate-controlled, immersion-cooled industrial facilities.",
  },
  {
    q: "When do my daily mining payouts begin?",
    a: "Mining commences immediately upon payment confirmation. Payouts accumulate in real-time and settle automatically to your portal balance every 24 hours at 00:00 UTC.",
  },
  {
    q: "How are maintenance and electricity fees calculated?",
    a: "Fees are fixed per terahash per day (e.g., $0.0082 / TH / day for Pro plans). They are deducted automatically from your gross daily mined Bitcoin, meaning you never receive an out-of-pocket invoice.",
  },
  {
    q: "Can I withdraw mined cryptocurrency at any time?",
    a: "Yes. Your earned cryptocurrency can be transferred to any external cold-storage or exchange wallet at any moment with zero withdrawal lockups or penalties.",
  },
  {
    q: "Are the facilities accessible for institutional audits?",
    a: "Yes. For Institutional Syndicate partners ($50k+ contracts), we facilitate scheduled on-site audits at our Nordic and Iceland campuses accompanied by our operations engineering leads.",
  },
];

const SAMPLE_SPECTRUM = [45, 62, 55, 78, 68, 85, 74, 92, 88, 70, 83, 95, 89, 76, 91, 84, 98, 92];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function CloudMining() {
  const hashId = useId();
  const daysId = useId();
  const priceId = useId();

  // Interactive Coin selection in Hero HUD
  const [activeHeroCoin, setActiveHeroCoin] = useState<"BTC" | "LTC" | "DOGE">("BTC");

  // Interactive Calculator State
  const [hashrate, setHashrate] = useState(150); // TH/s
  const [contractDays, setContractDays] = useState(365); // days
  const [btcPrice, setBtcPrice] = useState(68000); // USD

  /* ---------- Hero slideshow + parallax ---------- */
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);

  // preload every slide once so crossfades never flash blank
  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  // auto-advance (disabled for reduced-motion users)
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);

  // mouse parallax for floating photos
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const nearX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const nearY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const farX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const farY = useTransform(sy, [-0.5, 0.5], [22, -22]);

  const onHeroMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Calculation logic based on network difficulty (~880 EH/s, 3.125 BTC block reward, 144 blocks/day)
  const networkHashEh = 880;
  const btcPerThPerDay = (3.125 * 144) / (networkHashEh * 1e6);
  const grossBtc = hashrate * contractDays * btcPerThPerDay;
  const grossUsd = grossBtc * btcPrice;
  const feeRateCents = 0.88; // 0.88 cents / TH / day
  const totalFeesUsd = (hashrate * contractDays * feeRateCents) / 100;
  const netProfitUsd = Math.max(0, grossUsd - totalFeesUsd);
  const estimatedCost = (hashrate * 14.5 * (contractDays / 365)); // baseline hardware lease
  const roiPct = estimatedCost > 0 ? ((netProfitUsd / estimatedCost) * 100).toFixed(1) : "0";

  // Data for active coin in HUD
  const heroCoinData = {
    BTC: {
      rate: "4,821.40",
      unit: "TH/s",
      estDaily: "~0.00284 BTC",
      efficiency: "99.82%",
      algo: "SHA-256",
      status: "18,420 Rigs Active",
    },
    LTC: {
      rate: "94.60",
      unit: "GH/s",
      estDaily: "~1.45 LTC",
      efficiency: "99.78%",
      algo: "Scrypt",
      status: "3,200 Rigs Active",
    },
    DOGE: {
      rate: "186.20",
      unit: "GH/s",
      estDaily: "~1,280 DOGE",
      efficiency: "99.91%",
      algo: "AuxPoW Scrypt",
      status: "Merged Mining",
    },
  }[activeHeroCoin];

  return (
    <div className="cm-page">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO — SPLIT-SCREEN + FRAMER-MOTION
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-hero" aria-labelledby="cm-hero-title">

        {/* ── LEFT: Animated Copy Panel ── */}
        <motion.div
          className="cm-hero-left"
          variants={copyContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="cm-hero-particles" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="cm-hero-particle" />
            ))}
          </div>

          {/* Badge */}
          <motion.div variants={itemUp} className="cm-hero-badge">
            <span className="cm-hero-badge-icon" aria-hidden="true">
              <Activity size={13} />
            </span>
            <span className="cm-pulse-dot" />
            <span>4.82 EH/s Live • 12 Global Facilities</span>
          </motion.div>

          {/* Headline — word-by-word */}
          <motion.h1
            id="cm-hero-title"
            className="cm-hero-title"
            variants={headingContainer}
            aria-label="Mine Bitcoin with Hyperscale Cloud Hashrate"
          >
            <span className="block">
              <motion.span variants={headingWord} className="inline-block">Mine</motion.span>{" "}
              <motion.span variants={headingWord} className="inline-block">Bitcoin</motion.span>{" "}
              <motion.span variants={headingWord} className="inline-block">with</motion.span>
            </span>
            <span className="block">
              <motion.span variants={headingWord} className="inline-block cm-gradient-text">
                Hyperscale
              </motion.span>
            </span>
            <span className="block">
              <motion.span variants={headingWord} className="inline-block">Cloud</motion.span>{" "}
              <motion.span variants={headingWord} className="inline-block">Hashrate</motion.span>
            </span>
          </motion.h1>

          {/* Shimmer accent line — same clip-path trick as home page */}
          <motion.div variants={itemUp} className="cm-hero-accent-line">
            <span className="cm-accent-bar" aria-hidden="true" />
            <motion.span
              className="cm-accent-shimmer"
              animate={{ backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] }}
              transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
            >
              Institutional Grade
            </motion.span>
            <span className="cm-accent-rest">— 100% renewable energy</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={itemUpSlow} className="cm-hero-subtitle">
            No hardware, no maintenance. Purchase dedicated hashrate hashing in our
            immersion-cooled global facilities and receive automated daily payouts
            directly to your wallet.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemUp} className="cm-hero-actions">
            <a href="#plans" className="cm-btn cm-btn-primary">
              View Mining Plans
              <ArrowRight size={17} />
            </a>
            <a href="#calc" className="cm-btn cm-btn-ghost">
              <Sliders size={16} />
              Calculate Returns
            </a>
          </motion.div>

          {/* Stats — staggered */}
          <motion.div
            className="cm-hero-highlights"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.5 } } }}
          >
            {HIGHLIGHTS.map((item) => (
              <motion.div key={item.label} variants={statItem} className="cm-highlight-item">
                <div className="cm-highlight-val">{item.val}</div>
                <div className="cm-highlight-lbl">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemUp} className="cm-hero-scroll">
            <span className="cm-hero-scroll-label">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={18} className="cm-hero-scroll-icon" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Animated photo slideshow + floating photos + HUD ── */}
        <div
          className="cm-hero-right"
          onMouseMove={onHeroMove}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {/* Ken Burns slideshow */}
          <div className="cm-hero-slides" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.img
                key={slide}
                src={HERO_SLIDES[slide].src}
                alt=""
                className="cm-hero-img"
                onError={onImgError}
                initial={{ opacity: 0, scale: 1.18, x: 24 }}
                animate={{ opacity: 1, scale: 1.04, x: -10 }}
                exit={{ opacity: 0, transition: { duration: 1.2 } }}
                transition={{
                  opacity: { duration: 1.2 },
                  scale: { duration: 7, ease: "linear" },
                  x: { duration: 7, ease: "linear" },
                }}
              />
            </AnimatePresence>
          </div>
          <div className="cm-hero-sweep" aria-hidden="true" />
          <div className="cm-hero-img-fade" aria-hidden="true" />
          <div className="cm-hero-img-tint" aria-hidden="true" />
          <div className="cm-hero-img-bottom" aria-hidden="true" />

          {/* Floating photo cards (mouse parallax) */}
          {FLOAT_PHOTOS.map((p, i) => (
            <motion.div
              key={p.cls}
              className={`cm-float-photo ${p.cls}`}
              style={{ x: i % 2 ? farX : nearX, y: i % 2 ? farY : nearY }}
              aria-hidden="true"
            >
              <motion.div
                className="cm-float-photo-inner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  reduce
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, scale: 1, y: [0, -12, 0], rotate: [0, i % 2 ? 2 : -2, 0] }
                }
                transition={{
                  opacity: { delay: 0.8 + i * 0.2, duration: 0.6 },
                  scale: { delay: 0.8 + i * 0.2, duration: 0.6, ease: EASE },
                  y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <img src={p.src} alt="" loading="lazy" onError={onImgError} />
                <span>{p.tag}</span>
              </motion.div>
            </motion.div>
          ))}

          {/* HUD card slides in from right */}
          <motion.div
            className="cm-hero-art"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            {/* Top pill */}
            <motion.div
              className="cm-floating-pill top-right"
              variants={pillTop}
              initial="hidden"
              animate="visible"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>99.98% SLA Uptime</span>
            </motion.div>

            <div className="cm-hud-card">
              <div className="cm-hud-header">
                <div className="cm-hud-terminal-id">
                  <Activity size={14} />
                  <span>BH-NODE-OSLO-04 // HUD</span>
                </div>
                <div className="cm-hud-status-badge">
                  <span className="cm-pulse-dot" />
                  <span>Online</span>
                </div>
              </div>

              <div className="cm-hud-tabs" role="tablist" aria-label="Select coin">
                {(["BTC", "LTC", "DOGE"] as const).map((coin) => (
                  <button
                    key={coin}
                    type="button"
                    role="tab"
                    aria-selected={activeHeroCoin === coin}
                    onClick={() => setActiveHeroCoin(coin)}
                    className={`cm-hud-tab-btn ${activeHeroCoin === coin ? "active" : ""}`}
                  >
                    {coin === "BTC" && "₿ BTC"}
                    {coin === "LTC" && "Ł LTC"}
                    {coin === "DOGE" && "Ð DOGE"}
                  </button>
                ))}
              </div>

              <div className="cm-hud-hero-stat">
                <div className="cm-hud-stat-label">Total Hashrate ({activeHeroCoin})</div>
                {/* Number animates on coin switch */}
                <motion.div
                  key={activeHeroCoin}
                  className="cm-hud-stat-value"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {heroCoinData.rate}{" "}
                  <span className="cm-hud-stat-unit">{heroCoinData.unit}</span>
                </motion.div>
              </div>

              {/* Bars grow up on load */}
              <div className="cm-bars-graph" aria-hidden="true">
                {SAMPLE_SPECTRUM.map((height, i) => (
                  <motion.div
                    key={i}
                    className="cm-bar-item"
                    style={{ height: `${height}%` }}
                    initial={{ scaleY: 0, originY: "bottom" }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.45, delay: 0.55 + i * 0.025, ease: EASE }}
                  />
                ))}
              </div>

              {/* Mini stats stagger in */}
              <div className="cm-hud-grid">
                {[
                  { label: "Pool Eff.", value: heroCoinData.efficiency },
                  { label: "Daily Reward", value: heroCoinData.estDaily },
                  { label: "Temp", value: "36.4°C" },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    className="cm-hud-mini-stat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease: EASE }}
                  >
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </motion.div>
                ))}
              </div>

              <div className="text-[10px] text-white/45 flex items-center justify-between border-t border-white/[0.07] pt-2.5 mt-0.5 font-mono">
                <span>Algo: {heroCoinData.algo}</span>
                {/* Breathing status text */}
                <motion.span
                  className="text-emerald-400 font-semibold"
                  animate={{ opacity: [1, 0.45, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {heroCoinData.status}
                </motion.span>
              </div>
            </div>

            {/* Bottom pill */}
            <motion.div
              className="cm-floating-pill bottom-left"
              variants={pillBottom}
              initial="hidden"
              animate="visible"
            >
              <Zap size={13} className="text-cyan-400" />
              <span>100% Zero-Carbon Power</span>
            </motion.div>
          </motion.div>

          {/* Caption + progress bars */}
          <div className="cm-hero-caption">
            <AnimatePresence mode="wait">
              <motion.span
                key={slide}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <i className="cm-pulse-dot" /> {HERO_SLIDES[slide].label}
              </motion.span>
            </AnimatePresence>
            <div className="cm-hero-progress">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={i === slide ? "on" : ""}
                >
                  <b key={i === slide ? `on-${slide}` : `off-${i}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FACILITY / INFRASTRUCTURE
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section cm-section-alt" id="facility">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Global Footprint</span>
            </div>
            <h2 className="cm-section-title">
              Where Your <span className="cm-gradient-text">Hashrate Runs</span>
            </h2>
            <p className="cm-section-desc">
              High-density server halls designed from the ground up for maximum computational efficiency,
              sub-ambient thermodynamic cooling, and zero carbon emissions.
            </p>
          </motion.div>

          <motion.div
            className="cm-facility-card"
            variants={cardScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="cm-facility-img-wrap">
              {/* External High-Resolution Facility Photography */}
              <img
                src={IMG_FACILITY}
                alt="BH Ventures Hyperscale Data Centre corridor with glowing server racks"
                className="cm-facility-img"
                loading="lazy"
              />
              <div className="cm-facility-img-overlay" />
              <div className="cm-facility-live-tag">
                <span className="cm-pulse-dot" />
                <span>OSLO CAMPUS // ROW 14-B</span>
              </div>
            </div>

            <div className="cm-facility-content">
              <h3 className="text-2xl font-bold text-white mb-3">
                Industrial Scale Computing Power
              </h3>
              <p className="text-white/75 text-sm leading-relaxed mb-4">
                Our facilities operate under long-term power purchase agreements (PPAs) in low-cost,
                cold-climate jurisdictions. Redundant power feeds and on-site spare part inventories ensure
                continuous hashing through all market cycles.
              </p>

              <motion.div
                className="cm-facility-specs"
                variants={gridContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {SPECS.map((s) => (
                  <motion.div key={s.label} className="cm-spec-box" variants={cardUp}>
                    <div className="cm-spec-val">{s.val}</div>
                    <div className="cm-spec-lbl">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex items-center gap-3 text-xs text-cyan-300 font-mono">
                <CheckCircle2 size={16} />
                <span>Audited Tier-3+ Facilities • Direct Grid Substation Interconnects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. OPERATIONS & ENGINEERING (PHOTO CARDS)
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section" id="operation">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Engineering Excellence</span>
            </div>
            <h2 className="cm-section-title">
              What Keeps the <span className="cm-gradient-text">Machines Running</span>
            </h2>
            <p className="cm-section-desc">
              Proprietary immersion architecture, clean hydroelectric power sources, and multi-tenant
              security standards that safeguard your mining contracts.
            </p>
          </motion.div>

          <motion.div
            className="cm-ops-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            {OPERATIONS.map((op) => {
              const IconComp = op.icon;
              return (
                <motion.div key={op.title} className="cm-op-card" variants={cardUp}>
                  <div className="cm-op-img-box">
                    <img
                      src={op.img}
                      alt={op.title}
                      className="cm-op-img"
                      loading="lazy"
                    />
                    <div className="cm-op-gradient" />
                    <div className="cm-op-icon-pill">
                      <IconComp size={19} />
                    </div>
                  </div>
                  <div className="cm-op-body">
                    <h3 className="cm-op-title">{op.title}</h3>
                    <p className="cm-op-desc">{op.desc}</p>
                    <div className="cm-op-metric-tag">
                      <Zap size={13} />
                      <span>{op.metric}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ENTERPRISE HARDWARE FLEET
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section cm-section-alt">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Industrial Hardware</span>
            </div>
            <h2 className="cm-section-title">
              Next-Gen <span className="cm-gradient-text">ASIC Fleet</span>
            </h2>
            <p className="cm-section-desc">
              We exclusively deploy top-of-the-line 3nm and 5nm ASIC microprocessors from Bitmain and MicroBT,
              maximizing hash output per watt of consumed energy.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {HARDWARE_FLEET.map((hw) => (
              <motion.div
                key={hw.name}
                variants={cardUp}
                className="cm-hw-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Cpu size={20} />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/25">
                    {hw.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{hw.name}</h3>
                <p className="text-xs text-white/50 font-mono mb-4">{hw.algo}</p>

                <div className="space-y-2 border-t border-white/8 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Hash Capacity</span>
                    <span className="font-mono font-bold text-white">{hw.hashrate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Power Efficiency</span>
                    <span className="font-mono text-cyan-300 font-semibold">{hw.efficiency}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* External Hardware Photo Showcase */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-sky-500/20 max-h-[260px] group shadow-xl"
            variants={cardScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={IMG_HARDWARE}
              alt="High-density ASIC mining cluster racks"
              className="w-full h-full object-cover object-center max-h-[260px] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070e1c] via-[#070e1c]/80 to-transparent flex items-center p-8">
              <div className="max-w-md">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span className="cm-pulse-dot" />
                  Continuous Hardware Refresh Cycle
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Immersion &amp; Hydro Optimized</h3>
                <p className="text-sm text-white/70">
                  Every 18 months, depreciated units are replaced with current generation silicon to preserve optimal hashrate output per megawatt.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HOW IT WORKS
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section" id="how">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Simplicity by Design</span>
            </div>
            <h2 className="cm-section-title">
              How Cloud Mining <span className="cm-gradient-text">Works</span>
            </h2>
            <p className="cm-section-desc">
              From plan selection to automated daily wallet distributions in 4 transparent steps.
            </p>
          </motion.div>

          <motion.div
            className="cm-steps-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} className="cm-step-card" variants={cardUp}>
                <div className="cm-step-badge">{s.n}</div>
                <h3 className="cm-step-title">{s.title}</h3>
                <p className="cm-step-body">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PRICING PLANS
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section cm-section-alt" id="plans">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Transparent Contracts</span>
            </div>
            <h2 className="cm-section-title">
              Enterprise Mining <span className="cm-gradient-text">Plans</span>
            </h2>
            <p className="cm-section-desc">
              Every contract includes live telemetry dashboard access, 100% green energy SLAs,
              and daily automated payouts.
            </p>
          </motion.div>

          <motion.div
            className="cm-plans-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {PLANS.map((p) => (
              <motion.div
                key={p.name}
                className={`cm-plan-card ${p.featured ? "cm-plan-featured" : ""}`}
                variants={cardUp}
              >
                {p.badge && <div className="cm-plan-tag">{p.badge}</div>}

                <div className="cm-plan-name">{p.name}</div>
                <div className="cm-plan-hardware">{p.hardware}</div>

                <div className="cm-plan-hashrate">{p.hash}</div>
                <div className="cm-plan-duration">{p.duration}</div>

                <ul className="cm-plan-specs-list">
                  <li className="cm-plan-spec-row">
                    <span className="cm-plan-spec-label">Maintenance Fee</span>
                    <span className="cm-plan-spec-val">{p.fee}</span>
                  </li>
                  <li className="cm-plan-spec-row">
                    <span className="cm-plan-spec-label">Target Coin</span>
                    <span className="cm-plan-spec-val">{p.coin}</span>
                  </li>
                  <li className="cm-plan-spec-row">
                    <span className="cm-plan-spec-label">Settlement</span>
                    <span className="cm-plan-spec-val">{p.payout}</span>
                  </li>
                  <li className="cm-plan-spec-row">
                    <span className="cm-plan-spec-label">Min Allocation</span>
                    <span className="cm-plan-spec-val text-cyan-300 font-bold">{p.minDeposit}</span>
                  </li>
                </ul>

                <a
                  href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    p.minDeposit === "Custom Quote"
                      ? `Hi BH Ventures, I'm interested in the Institutional Syndicate mining plan (${p.hash}, ${p.duration}). Please connect me with your enterprise team for a custom quote.`
                      : `Hi BH Ventures, I would like to deploy the ${p.name} mining plan (${p.hash}, ${p.duration}, ${p.minDeposit} min allocation). Please share setup and payment details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cm-btn cm-btn-whatsapp w-full"
                  aria-label={`Order ${p.name} via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                >
                  <WhatsAppIcon className="cm-whatsapp-btn-icon" />
                  <span>{p.minDeposit === "Custom Quote" ? "Contact on WhatsApp" : "Deploy via WhatsApp"}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center text-xs mt-8 max-w-2xl mx-auto flex flex-col items-center gap-2"
            variants={cardUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
              <WhatsAppIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Direct OTC Onboarding &amp; Setup via WhatsApp ({BH_WHATSAPP_DISPLAY})</span>
            </div>
            <span className="text-slate-500">
              All plans include zero hardware depreciation risk. Mined output is settled on proportional
              network share and subject to live Bitcoin difficulty and market price.
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE ROI CALCULATOR
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section" id="calc">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Real-Time Estimation</span>
            </div>
            <h2 className="cm-section-title">
              Mining Profitability <span className="cm-gradient-text">Calculator</span>
            </h2>
            <p className="cm-section-desc">
              Simulate your estimated Bitcoin mining yields and net returns with custom hashrate allocations.
            </p>
          </motion.div>

          <div className="cm-calc-box">
            {/* Input Sliders */}
            <motion.div
              className="cm-calc-inputs"
              variants={cardSlideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="cm-slider-group">
                <div className="cm-slider-header">
                  <label htmlFor={hashId} className="cm-slider-label">Hashrate Power (TH/s)</label>
                  <span className="cm-slider-val">{hashrate} TH/s</span>
                </div>
                <input
                  id={hashId}
                  type="range"
                  min="25"
                  max="1000"
                  step="25"
                  value={hashrate}
                  onChange={(e) => setHashrate(Number(e.target.value))}
                  className="cm-range-input"
                  aria-label="Hashrate Power in TH/s"
                />
              </div>

              <div className="cm-slider-group">
                <div className="cm-slider-header">
                  <label htmlFor={daysId} className="cm-slider-label">Contract Duration (Days)</label>
                  <span className="cm-slider-val">{contractDays} Days</span>
                </div>
                <input
                  id={daysId}
                  type="range"
                  min="90"
                  max="730"
                  step="30"
                  value={contractDays}
                  onChange={(e) => setContractDays(Number(e.target.value))}
                  className="cm-range-input"
                  aria-label="Contract Duration in Days"
                />
              </div>

              <div className="cm-slider-group">
                <div className="cm-slider-header">
                  <label htmlFor={priceId} className="cm-slider-label">BTC Price Assumption (USD)</label>
                  <span className="cm-slider-val">${btcPrice.toLocaleString()}</span>
                </div>
                <input
                  id={priceId}
                  type="range"
                  min="40000"
                  max="160000"
                  step="1000"
                  value={btcPrice}
                  onChange={(e) => setBtcPrice(Number(e.target.value))}
                  className="cm-range-input"
                  aria-label="BTC Price Assumption in USD"
                />
              </div>

              <div className="text-xs text-white/55 leading-relaxed border-t border-white/8 pt-4">
                Assumes network hashrate of 880 EH/s and 3.125 BTC block reward.
                All calculations incorporate our sub-ambient 0.88¢/TH/day electricity &amp; maintenance tariff.
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              className="cm-calc-results-panel"
              variants={cardSlideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div>
                <div className="cm-net-profit-badge">Estimated Net Return</div>
                <motion.div
                  key={netProfitUsd}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="cm-net-profit-val"
                >
                  ${Math.round(netProfitUsd).toLocaleString()}
                </motion.div>

                <div className="cm-calc-breakdown">
                  <div className="cm-breakdown-row">
                    <span>Gross BTC Mined</span>
                    <strong className="text-cyan-300">{grossBtc.toFixed(5)} BTC</strong>
                  </div>
                  <div className="cm-breakdown-row">
                    <span>Gross USD Value</span>
                    <strong>${Math.round(grossUsd).toLocaleString()}</strong>
                  </div>
                  <div className="cm-breakdown-row">
                    <span>Hosting &amp; Power Fees</span>
                    <strong className="text-amber-400">-${Math.round(totalFeesUsd).toLocaleString()}</strong>
                  </div>
                  <div className="cm-breakdown-row">
                    <span>Projected Contract ROI</span>
                    <strong className="text-emerald-400 font-bold">~{roiPct}%</strong>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi BH Ventures, I used your mining calculator and would like to lock in ${hashrate} TH/s for ${contractDays} days (projected ROI ~${roiPct}%). Please provide payment and contract details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cm-btn cm-btn-primary w-full mt-4"
                aria-label={`Lock In Hashrate via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
              >
                <WhatsAppIcon className="cm-whatsapp-btn-icon" />
                <span>Lock In via WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SUPPORTED COINS
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section cm-section-alt" id="coins">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Multi-Asset Capability</span>
            </div>
            <h2 className="cm-section-title">
              Supported <span className="cm-gradient-text">Proof-of-Work</span> Coins
            </h2>
            <p className="cm-section-desc">
              Choose your target coin or utilize our multi-algo switching engine to maximize return yields.
            </p>
          </motion.div>

          <motion.div
            className="cm-coins-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {COINS.map((c) => (
              <motion.div key={c.ticker} className="cm-coin-card" variants={cardUp}>
                <div
                  className="cm-coin-avatar"
                  style={{ background: c.bg }}
                >
                  {c.symbol}
                </div>
                <div className="cm-coin-name">{c.name} ({c.ticker})</div>
                <div className="cm-coin-algo">{c.algo}</div>
                <div className="cm-coin-badge-payout">{c.payout}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. LIVE DASHBOARD PREVIEW
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section" id="dashboard">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Live Control</span>
            </div>
            <h2 className="cm-section-title">
              Your Command Center, <span className="cm-gradient-text">Always On</span>
            </h2>
            <p className="cm-section-desc">
              Monitor active terahash delivery, daily block rewards, pool efficiency, and wallet
              withdrawals in real time from any desktop or mobile device.
            </p>
          </motion.div>

          <motion.div
            className="cm-dash-showcase"
            variants={cardScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="cm-dash-showcase-bar">
              <div className="flex items-center gap-3">
                <div className="cm-dash-dots">
                  <div className="cm-dash-dot" />
                  <div className="cm-dash-dot" />
                  <div className="cm-dash-dot" />
                </div>
                <span className="text-xs font-mono text-white/70">
                  BH-VENTURES-DASHBOARD // PORTAL-STABLE-v4.12
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="cm-pulse-dot" />
                <span>All 18,420 Rigs Operational</span>
              </div>
            </div>

            <div className="cm-dash-body">
              <motion.div
                className="cm-dash-stats-row"
                variants={gridContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div className="cm-dash-tile" variants={cardUp}>
                  <div className="cm-dash-tile-label">Allocated Hashrate</div>
                  <div className="cm-dash-tile-val text-cyan-300">150.0 TH/s</div>
                </motion.div>
                <motion.div className="cm-dash-tile" variants={cardUp}>
                  <div className="cm-dash-tile-label">Pool Efficiency</div>
                  <div className="cm-dash-tile-val text-emerald-400">99.84%</div>
                </motion.div>
                <motion.div className="cm-dash-tile" variants={cardUp}>
                  <div className="cm-dash-tile-label">Mined (Last 30 Days)</div>
                  <div className="cm-dash-tile-val">0.02418 BTC</div>
                </motion.div>
                <motion.div className="cm-dash-tile" variants={cardUp}>
                  <div className="cm-dash-tile-label">Auto-Payout Wallet</div>
                  <div className="cm-dash-tile-val text-white/80 font-mono text-sm truncate">
                    bc1q...9x4k
                  </div>
                </motion.div>
              </motion.div>

              {/* Vector Chart Representation */}
              <div className="bg-[rgba(6,12,24,0.75)] border border-sky-500/15 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-white/60 mb-4 font-mono">
                  <span>HASHRATE STABILITY (LAST 24 HOURS)</span>
                  <span className="text-cyan-300">AVERAGE: 150.2 TH/s</span>
                </div>
                <div className="h-32 w-full flex items-end gap-2" aria-hidden="true">
                  {[65, 70, 68, 74, 82, 79, 85, 90, 87, 92, 94, 91, 95, 93, 98, 95, 96, 99].map(
                    (val, idx) => (
                      <motion.div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t-sm"
                        style={{ originY: "bottom" }}
                        initial={{ height: "0%" }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.15 + idx * 0.025, ease: EASE_OUT }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FAQ SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section cm-section-alt" id="faq">
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={sectionHeaderMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="cm-eyebrow">
              <span className="cm-eyebrow-line" />
              <span>Got Questions?</span>
            </div>
            <h2 className="cm-section-title">
              Frequently Asked <span className="cm-gradient-text">Questions</span>
            </h2>
            <p className="cm-section-desc">
              Everything you need to know about our institutional cloud mining operations, contracts, and security.
            </p>
          </motion.div>

          <motion.div
            className="cm-faq-wrap"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FAQS.map((faq) => (
              <motion.details key={faq.q} className="cm-faq-item" variants={cardUp}>
                <summary className="cm-faq-question">
                  <span>{faq.q}</span>
                  <div className="cm-faq-icon">+</div>
                </summary>
                <div className="cm-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </motion.div>

          {/* Risk Disclaimer */}
          <motion.div
            className="cm-risk-banner max-w-4xl mx-auto"
            variants={cardUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <strong>Regulatory Risk Disclaimer:</strong> Cryptocurrency mining and digital asset investments carry
            inherent financial risks. Mining returns depend directly on Bitcoin network difficulty, global hashrate changes,
            and market asset valuations which fluctuate continuously. Past performance does not guarantee future earnings.
            BH Ventures does not provide tax, legal, or investment advice.
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FINAL HIGH-IMPACT CALL TO ACTION
          ───────────────────────────────────────────────────────────── */}
      <section className="cm-section">
        <div className="cm-wrap">
          <motion.div
            className="cm-cta-banner"
            variants={cardScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="cm-cta-backdrop"
              style={{ backgroundImage: `url(${IMG_CTA})` }}
              aria-hidden="true"
            />
            <motion.div
              className="cm-cta-content"
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="cm-eyebrow justify-center" variants={cardUp}>
                <span className="cm-eyebrow-line" />
                <span>Start Mining Today</span>
                <span className="cm-eyebrow-line" />
              </motion.div>

              <motion.h2 className="cm-cta-title" variants={cardUp}>
                Deploy Your Cloud Hashrate in <span className="cm-gradient-text">Under 5 Minutes</span>
              </motion.h2>

              <motion.p className="cm-cta-desc" variants={cardUp}>
                Join institutional funds, family offices, and private investors generating automated
                daily Bitcoin rewards through BH Ventures&apos; global renewable mining infrastructure.
              </motion.p>

              <motion.div className="cm-cta-buttons" variants={cardUp}>
                <a href="#plans" className="cm-btn cm-btn-primary">
                  Choose a Mining Plan
                  <ArrowRight size={18} />
                </a>
                <Link href="/contact" className="cm-btn cm-btn-ghost">
                  Speak with Institutional Team
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}