"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Settings2,
  Timer,
  Network,
  TrendingUp,
} from "lucide-react";
import { BH_WHATSAPP_NUMBER, BH_WHATSAPP_DISPLAY } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/contact/contactData";
import "./service.css";

/* ================================================================
   FRAMER-MOTION VARIANTS
   ================================================================ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.95, ease: EASE_OUT, delay: 0.15 + i * 0.13 },
  }),
};

/* ================================================================
   IMAGES (decorative only)
   ================================================================ */
const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${w}`;

const IMG = {
  datacenter: "photo-1558494949-ef010cbdcc31", // your original server-room photo
  robotArm: "photo-1606206873764-fd15e242df52", // industrial robotic arm, blue-lit factory
  robotBlue: "photo-1716191299980-a6e8827ba10b", // blue industrial robot arm
  machineBlue: "photo-1581093803931-46e730e7622e", // blue and silver industrial machine
  factory: "photo-1717386255767-52643970d483", // factory floor with machines
  bigMachine: "photo-1717386255773-1e3037c81788", // large machine in a large building
  panel: "photo-1717386255773-a456c611dc4e", // machine control panel
  orange: "photo-1647427060118-4911c9821b82", // factory with orange machines
  gears: "photo-1524514587686-e2909d726e9b", // close-up metal gears
};

const HERO_SLIDES = [IMG.robotArm, IMG.machineBlue, IMG.factory, IMG.panel];
const SLIDE_MS = 2000;

/* ================================================================
   DATA
   ================================================================ */

const LIVE_PRICE_USDT = "0.0422";
const LIVE_BTC_PRICE = "$84,802";

const VIRTUAL_STEPS = [
  {
    n: "STEP 1",
    title: "Choose your capacity",
    icon: Settings2,
  },
  {
    n: "STEP 2",
    title: "Choose your duration",
    icon: Timer,
  },
  {
    n: "STEP 3",
    title: "Choose where your hashrate goes",
    icon: Network,
  },
];

const EFFICIENCY_PLANS = [
  {
    id: "standard",
    name: "Standard Efficiency",
    price: 12,
    unit: "TH",
    efficiency: "15 J/TH",
    features: [
      "15 J/TH Efficiency",
      "12 per TH/s Cost",
      "5 Years Contract",
      "98% Uptime Target",
      "0.08/kWh Hosting Rate",
    ],
    featured: false,
  },
  {
    id: "high",
    name: "High Efficiency",
    price: 21,
    unit: "TH",
    efficiency: "12 J/TH",
    features: [
      "12 J/TH Efficiency",
      "21 per TH/s Cost",
      "5 Years Contract",
      "98% Uptime Target",
      "0.08/kWh Hosting Rate",
    ],
    featured: true,
  },
];

const FIXED_PACKAGES = [
  {
    id: "spark",
    name: "Spark",
    days: 7,
    price: 59.05,
    miners: 1,
    speed: 200,
    estBtc: "0.00064988",
    popular: false,
  },
  {
    id: "core",
    name: "Core",
    days: 7,
    price: 236.19,
    miners: 4,
    speed: 800,
    estBtc: "0.00259953",
    popular: true,
  },
  {
    id: "rig",
    name: "Rig",
    days: 30,
    price: 2530.62,
    miners: 10,
    speed: 2000,
    estBtc: "0.02785210",
    popular: false,
  },
  {
    id: "fleet",
    name: "Fleet",
    days: 30,
    price: 12653.11,
    miners: 50,
    speed: 10000,
    estBtc: "0.13926050",
    popular: false,
  },
];

const CONTRACT_INFO_CARDS = [
  {
    title: "Contract Terms",
    desc: "Fixed 5-year contract period for all cloud mining plans.",
  },
  {
    title: "Payment Schedule",
    desc: "Hosting fees must be paid within 15 days of the billing period.",
  },
  {
    title: "Uptime Target",
    desc: "Plans are modeled around a 98% uptime target, confirmed in the final offer.",
  },
];

const FAQS = [
  {
    q: "What is the difference between Virtual Mining and Long-term Contracts?",
    a: "Virtual Mining is our on-demand model paid in USDT, starting from 1 to 30 days with no hardware commitment or maintenance fees\u2014ideal for flexible testing and active miners. Long-Term Contracts are fixed 5-year institutional agreements with dedicated hashrate tiers (15 J/TH or 12 J/TH), designed for large-scale, cost-efficient Bitcoin accumulation.",
  },
  {
    q: "How do Virtual Mining packages and Flexible Mining work?",
    a: "We offer fixed packages (Spark, Core, Rig, Fleet) for 7 or 30 days starting from 59.05 USDT, as well as Flexible Mining where you customize your exact budget (50 to 50,000 USDT) and mining speed (200 to 20,000 TH/s). The hashrate runs at 0.0422 USDT per TH/s per day until your balance is utilized, with proactive top-up alerts to ensure continuous mining.",
  },
  {
    q: "Can I connect my hashrate to my own mining pool?",
    a: "Yes. You can mine directly to SegPool for automated wallet payouts, or point your capacity to any SHA-256 stratum-compatible pool (Antpool, F2Pool, Foundry USA, or Binance Pool) by providing your stratum URL and worker credentials.",
  },
  {
    q: "How and when are Bitcoin mining rewards distributed?",
    a: "Mining begins as soon as your payment or contract is confirmed. Daily Bitcoin rewards accumulate continuously and are credited directly to your specified wallet address every 24 hours (00:00 UTC) with no withdrawal lockups or hidden fees.",
  },
  {
    q: "Do I need any technical knowledge or mining equipment?",
    a: "None at all. BH Ventures manages all hardware procurement, rack installation, electrical delivery, cooling, and firmware maintenance within our institutional data centers. You monitor your live performance and receive BTC directly to your wallet.",
  },
];

const REVENUE_ROWS = [
  { year: 2026, note: "(88 days rem.)", annual: 354, cumulative: 354 },
  { year: 2027, note: "", annual: 1470, cumulative: 1824 },
  { year: 2028, note: "", annual: 1470, cumulative: 3293 },
  { year: 2029, note: "", annual: 1470, cumulative: 4763 },
  { year: 2030, note: "", annual: 1470, cumulative: 6233 },
  { year: 2031, note: "", annual: 1470, cumulative: 7703 },
];

const BTC_PRICE_OPTIONS = ["Current ($85k)", "$80k", "$100k", "$150k"];
const BTC_PRICE_VALUES: Record<string, number> = {
  "Current ($85k)": 85000,
  "$80k": 80000,
  "$100k": 100000,
  "$150k": 150000,
};

/* ================================================================
   COMPONENT
   ================================================================ */
export default function CloudMining() {
  const [reduce, setReduce] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReduce(event.matches);
    };

    mediaQuery.addEventListener?.("change", handler);
    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  const [activeTab, setActiveTab] = useState<"virtual" | "longterm">("virtual");
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "high">("standard");
  const [hashrate, setHashrate] = useState(100);
  const [efficiencyPlan, setEfficiencyPlan] = useState<"15" | "12">("15");
  const [btcPriceLabel, setBtcPriceLabel] = useState("Current ($85k)");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  // Flexible mining state
  const [flexAmount, setFlexAmount] = useState(500);
  const [flexSpeed, setFlexSpeed] = useState(1000);

  // Hero slideshow (continuous 2-second cycle)
  useEffect(() => {
    if (mounted && reduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [mounted, reduce]);

  const pricePerTh = efficiencyPlan === "15" ? 12 : 21;
  const powerConsumption = (hashrate * parseInt(efficiencyPlan)) / 1000;
  const totalPrice = hashrate * pricePerTh;

  const btcMultiplier = BTC_PRICE_VALUES[btcPriceLabel] / 85000;
  const adjustedRows = REVENUE_ROWS.map((r) => ({
    ...r,
    annual: Math.round(r.annual * btcMultiplier),
    cumulative: Math.round(r.cumulative * btcMultiplier),
  }));

  // Flexible mining computed values
  const FLEX_PRICE_PER_TH_DAY = 0.0422; // USDT
  const flexDailyUsdt = flexSpeed * FLEX_PRICE_PER_TH_DAY;
  const flexDuration = flexDailyUsdt > 0 ? Math.floor(flexAmount / flexDailyUsdt) : 0;
  const flexMiners = Math.max(1, Math.floor(flexSpeed / 200));
  const flexEstBtc = (flexSpeed * flexDuration * 3.125 * 144) / (880 * 1e6);

  const amountFill = ((flexAmount - 50) / (50000 - 50)) * 100;
  const speedFill = ((flexSpeed - 200) / (20000 - 200)) * 100;

  // ── Navigation helpers ─────────────────────────────────────────
  const scrollToSection = (
    targetId: string,
    tab?: "virtual" | "longterm"
  ) => {
    if (tab) setActiveTab(tab);
    // Wait one frame for AnimatePresence to mount the new panel, then scroll
    const delay = tab ? 120 : 0;
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  };

  return (
    <div className="cm-page">

      {/* ─────────────────────────────────────────────────────────────
          1. HERO — Cloud Mining Simplified
          ───────────────────────────────────────────────────────────── */}
      <section className="cms-hero" aria-labelledby="cms-hero-title">
        <div className="cms-hero-stage" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.img
              key={slide}
              src={u(HERO_SLIDES[slide])}
              alt=""
              className="cms-hero-bg"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: mounted && reduce ? 1.02 : 1.14 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.7, ease: "easeInOut" },
                scale: { duration: (SLIDE_MS + 600) / 1000, ease: "linear" },
              }}
            />
          </AnimatePresence>
          <div className="cms-hero-shade" />
          <div className="cms-hero-grid" />
          <div className="cms-hero-sweep" />
        </div>

        <div className="cms-hero-inner">
          <motion.div
            className="cms-hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="cms-hero-eyebrow">
              <span className="cms-hero-eyebrow-line" />
              <span className="cms-hero-eyebrow-text">
                DUBAI • UAE · ENTERPRISE MINING INFRASTRUCTURE
              </span>
            </motion.div>

            <h1 id="cms-hero-title" className="cms-hero-title">
              <span className="cms-mask">
                <motion.span className="cms-line" variants={lineReveal} custom={0}>
                  Cloud Mining
                </motion.span>
              </span>
              <span className="cms-mask">
                <motion.span className="cms-line cms-line-fx" variants={lineReveal} custom={1}>
                  Simplified
                </motion.span>
              </span>
            </h1>
            <motion.p className="cms-hero-subtitle" variants={cardUp}>
              <span className="cms-brand-glow">BH Ventures</span> delivers institutional-grade, hosted Bitcoin hashrate with 98% uptime targets, transparent terms, and zero hardware maintenance.
            </motion.p>
            <motion.div className="cms-hero-actions" variants={cardUp}>
              <motion.a
                href="#plans"
                className="cm-btn cm-btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.preventDefault(); scrollToSection("plans", "longterm"); }}
              >
                <span>View Plans</span>
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#estimate"
                className="cms-ghost-link"
                whileHover={{ x: 3 }}
                onClick={(e) => { e.preventDefault(); scrollToSection("estimate", "longterm"); }}
              >
                <span>Estimate Output</span> <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="cms-hero-visual"
            initial={{ opacity: 0, x: 45, rotate: 1.5 }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              y: mounted && !reduce ? [0, -8, 0] : 0,
            }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.25,
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-hidden="true"
          >
            <div className="cms-hero-ring" />
            <div className="cms-hero-img-wrap">
              <AnimatePresence initial={false}>
                <motion.img
                  key={slide}
                  src={u(HERO_SLIDES[slide], 1000)}
                  alt="Cloud mining data center"
                  className="cms-hero-img"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="cms-hero-img-overlay" />
              <span className="cms-corner cms-corner-tl" />
              <span className="cms-corner cms-corner-tr" />
              <span className="cms-corner cms-corner-bl" />
              <span className="cms-corner cms-corner-br" />
              <div className="cms-hero-scan" />
            </div>
            <motion.div
              className="cms-hero-live-badge"
              animate={mounted && !reduce ? { scale: [1, 1.03, 1] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="cm-pulse-dot" />
              <span>Live Network</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="cms-hero-progress" role="tablist" aria-label="Hero images">
          {HERO_SLIDES.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === slide}
              aria-label={`Show image ${i + 1}`}
              className={i === slide ? "on" : i < slide ? "done" : ""}
              onClick={() => setSlide(i)}
            >
              <b />
            </button>
          ))}
        </div>

        <motion.div
          className="cms-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TAB BAR
          ───────────────────────────────────────────────────────────── */}
      <div className="cms-tab-bar" role="tablist" aria-label="Mining plan type">
        <motion.button
          role="tab"
          aria-selected={activeTab === "virtual"}
          className={`cms-tab-btn ${activeTab === "virtual" ? "active" : ""}`}
          onClick={() => setActiveTab("virtual")}
          id="tab-virtual"
          aria-controls="panel-virtual"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="cms-tab-main">Virtual Mining</span>
          <span className="cms-tab-sub">Pay in USDT · from 1 day</span>
          {activeTab === "virtual" && (
            <motion.span
              layoutId="cms-tab-indicator"
              className="cms-tab-indicator"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          )}
        </motion.button>
        <motion.button
          role="tab"
          aria-selected={activeTab === "longterm"}
          className={`cms-tab-btn ${activeTab === "longterm" ? "active" : ""}`}
          onClick={() => setActiveTab("longterm")}
          id="tab-longterm"
          aria-controls="panel-longterm"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="cms-tab-main">Long-term Contract</span>
          <span className="cms-tab-sub">5-year cloud mining plans</span>
          {activeTab === "longterm" && (
            <motion.span
              layoutId="cms-tab-indicator"
              className="cms-tab-indicator"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          )}
        </motion.button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VIRTUAL MINING PANEL
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === "virtual" && (
          <motion.div
            key="virtual"
            id="panel-virtual"
            role="tabpanel"
            aria-labelledby="tab-virtual"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <section className="cms-section cms-section-light cms-has-orbs" id="virtual-mining">
              <span className="cms-orb cms-orb-a" aria-hidden="true" />
              <span className="cms-orb cms-orb-b" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cm-section-header"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="cms-header-eyebrow">
                    <span className="cms-header-eyebrow-line" />
                    <span className="cms-badge-pill">NEW · PAY IN USDT</span>
                    <span className="cms-header-eyebrow-line cms-header-eyebrow-line--r" />
                  </div>
                  <h2 className="cms-section-title-dark">
                    BH Ventures Virtual Mining is live
                  </h2>
                  <p className="cms-section-desc-dark">
                    Mining capacity no longer has to start with hardware. Access standardized SHA-256
                    mining power running in BH Ventures data centers — without buying, hosting or operating
                    the machines behind it.
                  </p>
                </motion.div>

                <motion.div
                  className="cms-steps-row"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {VIRTUAL_STEPS.map((step) => {
                    const IconComp = step.icon;
                    return (
                      <motion.div
                        key={step.n}
                        className="cms-step-card"
                        variants={cardUp}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      >
                        <div className="cms-step-icon-wrap">
                          <IconComp size={22} />
                        </div>
                        <div className="cms-step-text">
                          <div className="cms-step-n">{step.n}</div>
                          <div className="cms-step-title">{step.title}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="cms-live-ticker"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="cm-pulse-dot" />
                  <span>
                    Live price: <strong>{LIVE_PRICE_USDT} USDT per TH/s per day</strong>
                    {" · "}BTC {LIVE_BTC_PRICE}
                    {" · "}updated every 15 minutes
                  </span>
                </motion.div>
              </div>
            </section>

            {/* ─── Pool Options + No-hardware features ─── */}
            <section className="cms-section cms-section-dark cms-pool-section">
              <div className="cms-bg-photo" aria-hidden="true">
                <img src={u(IMG.datacenter)} alt="" />
              </div>
              <div className="cm-wrap">
                {/* Two option cards */}
                <motion.div
                  className="cms-pool-cards"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <motion.div
                    className="cms-pool-card"
                    variants={cardUp}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <div className="cms-pool-media" aria-hidden="true">
                      <img src={u(IMG.robotBlue, 900)} alt="" />
                    </div>
                    <div className="cms-pool-body">
                      <h3 className="cms-pool-card-title">Mine to SegPool</h3>
                      <p className="cms-pool-card-desc">
                        Point your hashrate to SegPool, Segments&apos; own mining pool, and
                        receive your BTC earnings directly to your wallet address.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="cms-pool-card"
                    variants={cardUp}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <div className="cms-pool-media" aria-hidden="true">
                      <img src={u(IMG.bigMachine, 900)} alt="" />
                    </div>
                    <div className="cms-pool-body">
                      <h3 className="cms-pool-card-title">Or bring your own pool</h3>
                      <p className="cms-pool-card-desc">
                        Already mining elsewhere? Enter any compatible SHA-256 stratum
                        pool and worker — your capacity connects to it like any other
                        machine.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* No-X features */}
                <motion.div
                  className="cms-no-features"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div
                    className="cms-no-feature"
                    variants={cardUp}
                    whileHover={{ y: -5, scale: 1.025 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <span className="cms-no-icon" aria-hidden="true">
                      {/* Box / hardware icon */}
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <line x1="3.27" y1="6.96" x2="12" y2="12.01" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                        <line x1="20.73" y1="6.96" x2="12" y2="12.01" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                      </svg>
                    </span>
                    <span className="cms-no-label">No hardware procurement</span>
                  </motion.div>

                  <motion.div
                    className="cms-no-feature"
                    variants={cardUp}
                    whileHover={{ y: -5, scale: 1.025 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <span className="cms-no-icon" aria-hidden="true">
                      {/* Server/infrastructure icon */}
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                        <line x1="14" y1="2" x2="14" y2="22" strokeDasharray="3 3" />
                      </svg>
                    </span>
                    <span className="cms-no-label">No infrastructure deployment</span>
                  </motion.div>

                  <motion.div
                    className="cms-no-feature"
                    variants={cardUp}
                    whileHover={{ y: -5, scale: 1.025 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <span className="cms-no-icon" aria-hidden="true">
                      {/* Wrench/maintenance icon */}
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    </span>
                    <span className="cms-no-label">No machines to operate or maintain</span>
                  </motion.div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="cms-usdt-tagline"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Pay in USDT. Deploy mining capacity. Mine BTC.
                </motion.p>
              </div>
            </section>

            {/* ─── Fixed packages ─── */}

            <section className="cms-section cms-section-light cms-has-orbs" id="fixed-packages">
              <span className="cms-orb cms-orb-b" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cm-section-header"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h2 className="cms-section-title-dark">Fixed packages</h2>
                  <p className="cms-section-desc-dark">
                    A set amount of capacity for a predefined duration. Pick a package and start mining.
                  </p>
                </motion.div>

                <motion.div
                  className="cms-packages-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {FIXED_PACKAGES.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      className={`cms-pkg-card ${pkg.popular ? "cms-pkg-card--popular" : ""}`}
                      variants={cardUp}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      {pkg.popular && (
                        <div className="cms-pkg-popular-badge">MOST POPULAR</div>
                      )}
                      <div className="cms-pkg-header">
                        <span className="cms-pkg-name">{pkg.name}</span>
                        <span className="cms-pkg-days">· {pkg.days}d</span>
                      </div>
                      <div className="cms-pkg-price">
                        {pkg.price.toFixed(2)}
                        <span className="cms-pkg-currency">USDT</span>
                      </div>
                      <div className="cms-pkg-specs">
                        <div className="cms-pkg-spec-row">
                          <span>Days of mining</span>
                          <span>{pkg.days}</span>
                        </div>
                        <div className="cms-pkg-spec-row">
                          <span>Virtual miners</span>
                          <span className="cms-pkg-miners">
                            <span className="cms-miners-dots">
                              {Array.from({ length: Math.min(pkg.miners, 5) }).map((_, i) => (
                                <span
                                  key={i}
                                  className="cms-miner-dot"
                                  style={{ "--i": i } as CSSProperties}
                                />
                              ))}
                              {pkg.miners > 5 && (
                                <span className="cms-miners-extra">+{pkg.miners - 5}</span>
                              )}
                            </span>
                            {pkg.miners}
                          </span>
                        </div>
                        <div className="cms-pkg-spec-row">
                          <span>Mining speed</span>
                          <span>{pkg.speed.toLocaleString()} TH/s</span>
                        </div>
                        <div className="cms-pkg-spec-row">
                          <span>Est. earnings</span>
                          <span className="cms-pkg-btc">≈ {pkg.estBtc} BTC</span>
                        </div>
                      </div>
                      <motion.a
                        href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hi BH Ventures, I'd like to buy the ${pkg.name}·${pkg.days}d virtual mining package (${pkg.speed.toLocaleString()} TH/s, ${pkg.price} USDT). Please share payment details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cms-pkg-btn"
                        aria-label={`Buy ${pkg.name} ${pkg.days}-day package`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Buy {pkg.name} · {pkg.days}d
                      </motion.a>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─── Flexible mining ─── */}
            <section className="cms-section cms-section-tint cms-has-orbs" id="flexible-mining">
              <span className="cms-orb cms-orb-a" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cm-section-header"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h2 className="cms-section-title-dark">Flexible mining</h2>
                  <p className="cms-section-desc-dark">
                    Set your budget and mining speed. Your capacity keeps running until the balance is
                    used — top it up with USDT to keep going.
                  </p>
                </motion.div>

                <motion.div
                  className="cms-flex-box"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {/* Inputs */}
                  <div className="cms-flex-inputs">
                    <div className="cms-flex-field">
                      <div className="cms-flex-field-header">
                        <label className="cms-flex-label" htmlFor="flex-amount">Initial amount</label>
                      </div>
                      <div className="cms-flex-input-row">
                        <input
                          id="flex-amount"
                          type="number"
                          min={50}
                          max={50000}
                          step={50}
                          value={flexAmount}
                          onChange={(e) => setFlexAmount(Math.max(50, Math.min(50000, Number(e.target.value))))}
                          className="cms-flex-number"
                          aria-label="Initial amount in USDT"
                        />
                        <span className="cms-flex-unit">USDT</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={50000}
                        step={50}
                        value={flexAmount}
                        onChange={(e) => setFlexAmount(Number(e.target.value))}
                        className="cms-flex-range"
                        style={{ "--p": `${amountFill}%` } as CSSProperties}
                        aria-label="Initial amount slider"
                      />
                      <div className="cms-flex-range-labels">
                        <span>min. 50 USDT</span>
                        <span>max. 50,000 USDT</span>
                      </div>
                    </div>

                    <div className="cms-flex-field">
                      <div className="cms-flex-field-header">
                        <label className="cms-flex-label" htmlFor="flex-speed">Mining speed</label>
                      </div>
                      <div className="cms-flex-input-row">
                        <input
                          id="flex-speed"
                          type="number"
                          min={200}
                          max={20000}
                          step={200}
                          value={flexSpeed}
                          onChange={(e) => setFlexSpeed(Math.max(200, Math.min(20000, Number(e.target.value))))}
                          className="cms-flex-number"
                          aria-label="Mining speed in TH/s"
                        />
                        <span className="cms-flex-unit">TH/s</span>
                      </div>
                      <input
                        type="range"
                        min={200}
                        max={20000}
                        step={200}
                        value={flexSpeed}
                        onChange={(e) => setFlexSpeed(Number(e.target.value))}
                        className="cms-flex-range"
                        style={{ "--p": `${speedFill}%` } as CSSProperties}
                        aria-label="Mining speed slider"
                      />
                      <div className="cms-flex-range-labels">
                        <span>min. 200 TH/s</span>
                        <span>max. 20,000 TH/s</span>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="cms-flex-results">
                    <div className="cms-flex-result-rows">
                      <div className="cms-flex-result-row">
                        <span>Mining duration</span>
                        <strong>{flexDuration} days</strong>
                      </div>
                      <div className="cms-flex-result-row">
                        <span>Virtual miners</span>
                        <strong className="cms-flex-miners-val">
                          <span className="cms-miners-dots">
                            {Array.from({ length: Math.min(flexMiners, 5) }).map((_, i) => (
                              <span
                                key={i}
                                className="cms-miner-dot"
                                style={{ "--i": i } as CSSProperties}
                              />
                            ))}
                          </span>
                          {flexMiners}
                        </strong>
                      </div>
                      <div className="cms-flex-result-row">
                        <span>Est. earnings</span>
                        <strong className="cms-flex-btc-val">≈ {flexEstBtc.toFixed(8)} BTC</strong>
                      </div>
                    </div>

                    <motion.a
                      href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi BH Ventures, I'd like to start flexible mining with ${flexAmount} USDT initial balance and ${flexSpeed.toLocaleString()} TH/s speed (est. ${flexDuration} days). Please share payment details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cms-flex-start-btn"
                      aria-label={`Start flexible mining via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start mining
                    </motion.a>
                    <p className="cms-flex-note">
                      Running low? We email you a top-up link before your balance runs out, so your hashrate keeps going.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="cms-section cms-section-dark cms-aurora-section">
              <div className="cms-bg-photo" aria-hidden="true">
                <img src={u(IMG.gears)} alt="" />
              </div>
              <div className="cm-wrap">
                <motion.div
                  className="cms-cta-inline"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div>
                    <h3 className="cms-cta-inline-title">Start Virtual Mining Today</h3>
                    <p className="cms-cta-inline-desc">
                      No hardware. No hosting. No minimum commitment — start from 1 day.
                    </p>
                  </div>
                  <motion.a
                    href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi BH Ventures, I'm interested in Virtual Mining. Please share setup and payment details."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cm-btn cm-btn-whatsapp"
                    aria-label={`Start Virtual Mining via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <WhatsAppIcon className="cm-whatsapp-btn-icon" />
                    <span>Get Started via WhatsApp</span>
                  </motion.a>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            LONG-TERM CONTRACT PANEL
            ───────────────────────────────────────────────────────────── */}
        {activeTab === "longterm" && (
          <motion.div
            key="longterm"
            id="panel-longterm"
            role="tabpanel"
            aria-labelledby="tab-longterm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <section className="cms-section cms-section-light cms-has-orbs" id="plans">
              <span className="cms-orb cms-orb-a" aria-hidden="true" />
              <span className="cms-orb cms-orb-b" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cm-section-header"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h2 className="cms-section-title-dark">Choose Your Efficiency Plan</h2>
                  <p className="cms-section-desc-dark">
                    Select the plan that best fits your infrastructure goals. All plans use a 5-year
                    term and a 98% uptime target.
                  </p>
                </motion.div>

                <motion.div
                  className="cms-efficiency-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {EFFICIENCY_PLANS.map((plan) => (
                    <motion.div
                      key={plan.id}
                      className={`cms-efficiency-card ${plan.featured ? "cms-efficiency-card--dark" : "cms-efficiency-card--light"
                        } ${selectedPlan === plan.id ? "selected" : ""}`}
                      variants={cardUp}
                      whileHover={{ y: -6, scale: 1.015 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      onClick={() => setSelectedPlan(plan.id as "standard" | "high")}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selectedPlan === plan.id}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setSelectedPlan(plan.id as "standard" | "high");
                      }}
                    >
                      {selectedPlan === plan.id && !plan.featured && (
                        <div className="cms-selected-badge">SELECTED</div>
                      )}
                      <h3 className="cms-plan-name">{plan.name}</h3>
                      <div className="cms-plan-price">
                        <span className="cms-plan-price-val">${plan.price}</span>
                        <span className="cms-plan-price-unit">/{plan.unit}</span>
                      </div>
                      <p className="cms-plan-efficiency-label">
                        Efficiency: {plan.efficiency}
                      </p>
                      <ul className="cms-plan-features">
                        {plan.features.map((f) => (
                          <li key={f} className="cms-plan-feature-row">
                            <CheckCircle2 size={15} className="cms-check-icon" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─── Estimate Mining Output ─── */}
            <section className="cms-section cms-section-tint cms-has-orbs" id="estimate">
              <span className="cms-orb cms-orb-b" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cms-estimate-box"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <h2 className="cms-estimate-title">Estimate Mining Output</h2>
                  <p className="cms-estimate-desc">
                    Review modeled output for the{" "}
                    {efficiencyPlan === "15" ? "Standard Efficiency" : "High Efficiency"}; actual results depend on
                    network difficulty, BTC price, fees, and uptime.
                  </p>

                  <div className="cms-estimate-form">
                    <div className="cms-form-group">
                      <label className="cms-form-label" htmlFor="hashrate-input">
                        Hashrate Amount (TH/s)
                      </label>
                      <div className="cms-input-wrap">
                        <input
                          id="hashrate-input"
                          type="number"
                          min={1}
                          max={10000}
                          value={hashrate}
                          onChange={(e) => setHashrate(Math.max(1, Number(e.target.value)))}
                          className="cms-number-input"
                          aria-label="Hashrate amount in TH/s"
                        />
                        <span className="cms-input-unit">TH/s</span>
                      </div>
                    </div>

                    <div className="cms-form-group">
                      <label className="cms-form-label">Efficiency Plan</label>
                      <div className="cms-toggle-group" role="group" aria-label="Efficiency plan">
                        <button
                          type="button"
                          className={`cms-toggle-btn ${efficiencyPlan === "15" ? "active" : ""}`}
                          onClick={() => { setEfficiencyPlan("15"); setSelectedPlan("standard"); }}
                          aria-pressed={efficiencyPlan === "15"}
                        >
                          15 J/TH
                        </button>
                        <button
                          type="button"
                          className={`cms-toggle-btn ${efficiencyPlan === "12" ? "active" : ""}`}
                          onClick={() => { setEfficiencyPlan("12"); setSelectedPlan("high"); }}
                          aria-pressed={efficiencyPlan === "12"}
                        >
                          12 J/TH
                        </button>
                      </div>
                    </div>

                    <motion.a
                      href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi BH Ventures, I'd like to request a ${efficiencyPlan === "15" ? "Standard Efficiency (15 J/TH)" : "High Efficiency (12 J/TH)"} plan for ${hashrate} TH/s. Total price: $${totalPrice.toLocaleString()}. Please share contract and payment details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cms-request-btn"
                      aria-label={`Request mining plan via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Plan
                    </motion.a>

                    <div className="cms-output-row">
                      <div className="cms-output-item">
                        <span className="cms-output-label">Efficiency</span>
                        <span className="cms-output-val">{efficiencyPlan} J/TH</span>
                      </div>
                      <div className="cms-output-item">
                        <span className="cms-output-label">Power Consumption</span>
                        <span className="cms-output-val">{powerConsumption.toFixed(2)} kW</span>
                      </div>
                      <div className="cms-output-item">
                        <span className="cms-output-label">Total Price</span>
                        <span className="cms-output-val">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ─── Cumulative Revenue Chart ─── */}
            <section className="cms-section cms-section-light cms-has-orbs" id="revenue">
              <span className="cms-orb cms-orb-a" aria-hidden="true" />
              <div className="cm-wrap">
                <motion.div
                  className="cms-revenue-box"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="cms-chart-wrap" aria-label="Cumulative revenue projection chart">
                    <div className="cms-chart-yaxis" aria-hidden="true">
                      {["$8k", "$6k", "$4k", "$2k", "$0k"].map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </div>
                    <div className="cms-chart-area">
                      <svg
                        viewBox="0 0 600 200"
                        preserveAspectRatio="none"
                        className="cms-chart-svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
                          </linearGradient>
                          <linearGradient id="revenueStroke" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="100%" stopColor="#0284c7" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d="M0,200 L0,170 L120,145 L240,110 L360,75 L480,35 L600,5 L600,200 Z"
                          fill="url(#revenueGrad)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <motion.polyline
                          points="0,170 120,145 240,110 360,75 480,35 600,5"
                          fill="none"
                          stroke="url(#revenueStroke)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
                        />
                      </svg>
                      <div className="cms-chart-xaxis" aria-hidden="true">
                        {[2026, 2027, 2028, 2029, 2030, 2031].map((y) => (
                          <span key={y}>{y}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="cms-chart-footnote">
                    *Forecast assumes constant network difficulty and the selected BTC price.
                  </p>

                  <div className="cms-revenue-table-wrap">
                    <div className="cms-revenue-table-header">
                      <span className="cms-revenue-table-title">Cumulative Revenue</span>
                      <div className="cms-btc-price-toggle" role="group" aria-label="BTC price scenario">
                        {BTC_PRICE_OPTIONS.map((opt) => (
                          <motion.button
                            key={opt}
                            type="button"
                            className={`cms-btc-price-btn ${btcPriceLabel === opt ? "active" : ""}`}
                            onClick={() => setBtcPriceLabel(opt)}
                            aria-pressed={btcPriceLabel === opt}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <table className="cms-revenue-table" aria-label="Cumulative revenue by year">
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Annual Revenue</th>
                          <th scope="col">Cumulative Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adjustedRows.map((row) => (
                          <tr key={row.year}>
                            <td>
                              <span className="cms-table-year">{row.year}</span>
                              {row.note && (
                                <span className="cms-table-note">{row.note}</span>
                              )}
                            </td>
                            <td className="cms-table-annual">${row.annual.toLocaleString()}</td>
                            <td className="cms-table-cumulative">${row.cumulative.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cms-revenue-disclaimer">
                    <TrendingUp size={14} />
                    <span>
                      Modeled projections only. Actual returns depend on network difficulty, BTC price,
                      uptime, and fees.
                    </span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ─── Contract info cards ─── */}
            <section className="cms-section cms-section-dark cms-aurora-section">
              <div className="cms-bg-photo" aria-hidden="true">
                <img src={u(IMG.orange)} alt="" />
              </div>
              <div className="cm-wrap">
                <motion.div
                  className="cms-contract-cards"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {CONTRACT_INFO_CARDS.map((card) => (
                    <motion.div
                      key={card.title}
                      className="cms-contract-card"
                      variants={cardUp}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      <h3 className="cms-contract-card-title">{card.title}</h3>
                      <p className="cms-contract-card-desc">{card.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          3. FAQ SECTION (shared)
          ───────────────────────────────────────────────────────────── */}
      <section className="cms-section cms-section-light cms-has-orbs" id="faq">
        <span className="cms-orb cms-orb-a" aria-hidden="true" />
        <span className="cms-orb cms-orb-b" aria-hidden="true" />
        <div className="cm-wrap">
          <motion.div
            className="cm-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="cms-section-title-dark">Frequently Asked Questions</h2>
            <p className="cms-section-desc-dark">
              Everything you need to know about our cloud mining operations and contracts.
            </p>
          </motion.div>

          <motion.div
            className="cms-faq-wrap"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                className={`cms-faq-item ${openFaq === i ? "is-open" : ""}`}
                variants={cardUp}
              >
                <motion.button
                  className="cms-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                  whileHover={{ x: 2 }}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    className={`cms-faq-icon ${openFaq === i ? "open" : ""}`}
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    +
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="cms-faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cms-risk-banner"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <strong>Risk Disclaimer:</strong> Cryptocurrency mining and digital asset investments carry
            inherent financial risks. Mining returns depend on Bitcoin network difficulty, global
            hashrate changes, and market valuations which fluctuate continuously. Past performance does
            not guarantee future earnings. BH Ventures does not provide tax, legal, or investment advice.
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FINAL CTA
          ───────────────────────────────────────────────────────────── */}
      <section className="cms-section cms-section-dark cms-cta-section cms-aurora-section">
        <div className="cms-bg-photo cms-bg-photo--strong" aria-hidden="true">
          <img src={u(IMG.robotArm)} alt="" />
        </div>
        <div className="cm-wrap">
          <motion.div
            className="cms-final-cta"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="cm-eyebrow" variants={cardUp}>
              <span className="cm-eyebrow-line" />
              <span>Start Mining Today</span>
              <span className="cm-eyebrow-line cm-eyebrow-line--r" />
            </motion.div>

            <motion.h2 className="cms-cta-title" variants={cardUp}>
              Deploy Your Cloud Hashrate in{" "}
              <span className="cm-gradient-text">Under 5 Minutes</span>
            </motion.h2>

            <motion.p className="cms-cta-desc" variants={cardUp}>
              Join institutional funds, family offices, and private investors generating automated
              daily Bitcoin rewards through BH Ventures&apos; global renewable mining infrastructure.
            </motion.p>

            <motion.div className="cms-cta-btns" variants={cardUp}>
              <motion.a
                href="#plans"
                className="cm-btn cm-btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.preventDefault(); scrollToSection("plans", "longterm"); }}
              >
                Choose a Mining Plan
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href={`https://wa.me/${BH_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi BH Ventures, I'd like to speak with your institutional mining team about cloud hashrate options."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cm-btn cm-btn-whatsapp"
                aria-label={`Contact BH Ventures via WhatsApp (${BH_WHATSAPP_DISPLAY})`}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon className="cm-whatsapp-btn-icon" />
                <span>Speak with Our Team</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}