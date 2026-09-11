"use client";

import { useState, useRef, useEffect, useId } from "react";
import { X, Send, RotateCcw, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./chatbot.css";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
    "What services do you offer?",
    "Tell me about your trading programs",
    "What is BH Ventures' Web3 Studio?",
    "How can I contact the team?",
];

// Traced directly from the BH Ventures logo artwork (the interlocking H/B
// device), not a redraw — so the widget uses the real mark everywhere a
// generic bot/user icon would otherwise go.
const BH_MARK_PATH =
    "M141.61,309.42C140.80,307.31 140.82,250.62 141.64,248.51C141.99,247.59 143.22,246.44 144.39,245.94C145.55,245.44 148.30,243.93 150.50,242.57C152.70,241.21 155.62,239.48 157.00,238.72C158.38,237.95 161.30,236.28 163.50,235.00C175.58,227.97 176.17,228.29 175.92,241.83C175.77,249.61 176.04,251.55 177.37,252.53C179.39,254.00 183.61,253.63 185.83,251.77C186.75,251.01 188.62,249.85 190.00,249.19C191.38,248.52 193.85,247.15 195.50,246.13C199.47,243.69 205.16,240.43 212.50,236.41C222.63,230.86 223.00,230.26 223.00,219.48C223.00,209.83 222.43,206.62 220.90,207.56C220.40,207.87 220.00,207.69 220.00,207.18C220.00,206.66 219.21,205.94 218.25,205.59C217.29,205.24 214.70,203.86 212.50,202.52C201.35,195.75 199.44,195.49 193.12,199.86C191.68,200.86 189.82,201.98 189.00,202.35C188.18,202.72 186.15,203.91 184.50,205.00C182.85,206.08 180.60,207.43 179.50,208.00C178.40,208.57 176.15,209.92 174.50,211.00C172.85,212.09 170.82,213.32 170.00,213.74C167.59,214.96 155.05,222.34 152.15,224.24C150.69,225.20 148.82,226.29 148.00,226.67C147.18,227.04 146.22,227.77 145.87,228.28C145.53,228.80 144.29,228.91 143.11,228.54C140.98,227.86 140.97,227.74 141.24,197.85L141.50,167.85 L146.50,164.94C149.25,163.34 152.40,161.58 153.50,161.04C154.60,160.49 157.75,158.69 160.50,157.04C169.42,151.68 173.81,149.71 175.42,150.33C176.71,150.83 177.00,152.74 177.00,160.90C177.00,170.10 177.16,170.92 179.07,171.52C180.26,171.90 181.86,171.61 182.82,170.84C184.65,169.38 186.67,168.19 195.00,163.69C198.03,162.06 201.18,160.19 202.00,159.55C202.82,158.91 204.62,157.85 206.00,157.20C208.64,155.95 209.87,155.20 216.73,150.70L221.00,147.90 L221.00,126.95L221.00,106.00 L218.75,106.04C217.51,106.07 214.70,107.19 212.50,108.53C210.30,109.88 207.60,111.44 206.50,112.00C205.40,112.56 202.70,114.15 200.50,115.53C198.30,116.91 195.60,118.48 194.50,119.03C193.40,119.58 191.15,120.89 189.50,121.94C187.85,123.00 184.25,125.07 181.50,126.54C178.75,128.02 175.82,129.78 175.00,130.46C174.18,131.14 172.82,132.01 172.00,132.39C171.18,132.77 169.60,133.64 168.50,134.32C167.40,135.01 164.70,136.58 162.50,137.81C160.30,139.05 157.15,140.94 155.50,142.02C153.85,143.10 151.82,144.28 151.00,144.66C150.18,145.03 147.25,146.75 144.50,148.48C141.75,150.21 138.82,151.95 138.00,152.35C137.18,152.75 135.59,153.62 134.48,154.29C126.48,159.08 122.23,161.64 120.50,162.70C119.40,163.37 117.83,164.24 117.00,164.63C116.17,165.02 113.25,166.75 110.50,168.48C107.75,170.21 104.83,171.95 104.00,172.35C103.17,172.75 101.59,173.62 100.48,174.29C92.48,179.08 88.23,181.64 86.50,182.70C85.40,183.37 83.83,184.24 83.00,184.64C82.17,185.03 78.02,187.53 73.76,190.18C69.50,192.83 65.79,195.00 65.50,195.00C65.21,195.00 61.50,197.15 57.24,199.78C52.98,202.40 47.81,205.43 45.75,206.50L42.00,208.45 L42.00,221.19C42.00,230.13 41.63,234.24 40.75,235.01C39.18,236.37 29.85,242.42 27.93,243.32C27.14,243.68 22.45,246.49 17.50,249.57C10.93,253.64 8.10,254.90 7.00,254.22C5.72,253.42 5.52,248.36 5.59,218.39C5.64,199.20 5.75,153.24 5.84,116.25L6.00,49.00 L8.88,49.00C10.46,49.00 12.32,49.67 13.00,50.50C13.68,51.33 14.62,52.00 15.08,52.00C15.54,52.00 17.47,53.01 19.37,54.25C21.27,55.49 27.14,59.20 32.41,62.50L41.99,68.50 L41.99,120.25C42.00,148.71 42.25,172.00 42.55,172.00C42.85,172.00 45.56,170.42 48.57,168.50C51.58,166.57 54.28,165.00 54.57,165.00C54.86,165.00 57.56,163.42 60.57,161.50C63.58,159.57 66.30,158.00 66.62,158.00C66.93,158.00 68.39,157.16 69.85,156.14C72.18,154.51 75.51,152.57 85.00,147.29C86.38,146.52 89.30,144.79 91.50,143.43C93.70,142.07 96.40,140.52 97.50,139.97C98.60,139.43 101.30,137.85 103.50,136.47C105.70,135.09 108.40,133.52 109.50,132.97C110.60,132.42 113.08,131.02 115.00,129.85C116.92,128.68 120.53,126.59 123.00,125.22C125.47,123.84 128.63,121.99 130.00,121.11C135.06,117.87 136.54,116.97 138.50,116.01C139.60,115.48 142.30,113.91 144.50,112.53C146.70,111.15 149.40,109.57 150.50,109.03C151.60,108.48 154.30,106.91 156.50,105.53C158.70,104.15 161.40,102.57 162.50,102.03C163.60,101.48 166.30,99.91 168.50,98.53C170.70,97.15 173.40,95.57 174.50,95.03C175.60,94.48 178.30,92.91 180.50,91.54C182.70,90.18 185.85,88.36 187.50,87.50C189.15,86.65 191.40,85.38 192.50,84.69C193.60,84.00 196.30,82.42 198.50,81.19C200.70,79.95 203.85,78.07 205.50,77.00C207.15,75.94 209.85,74.36 211.50,73.51C213.15,72.65 215.40,71.38 216.50,70.69C217.60,70.00 220.30,68.42 222.50,67.19C224.70,65.95 227.85,64.07 229.50,63.00C231.15,61.94 233.85,60.38 235.50,59.54C237.15,58.70 240.07,57.04 242.00,55.85C243.93,54.66 246.40,53.19 247.50,52.58C248.60,51.97 250.75,50.62 252.29,49.59C257.97,45.77 257.93,45.36 257.97,108.18L258.00,164.86 L253.75,166.82C251.41,167.90 247.60,169.57 245.27,170.53C240.64,172.45 238.48,175.15 238.50,179.00C238.52,183.59 242.29,186.60 253.75,191.19L257.00,192.49 L257.00,219.63C257.00,244.58 256.86,246.82 255.25,247.37C254.29,247.70 252.04,248.88 250.25,249.99C243.37,254.25 240.40,255.99 237.50,257.46C235.85,258.30 232.70,260.12 230.50,261.51C228.30,262.90 225.60,264.50 224.50,265.07C223.40,265.64 220.70,267.19 218.50,268.51C216.30,269.84 213.15,271.61 211.50,272.45C209.85,273.30 207.15,274.83 205.50,275.85C202.42,277.77 196.42,281.26 192.00,283.72C190.62,284.48 187.70,286.21 185.50,287.57C183.30,288.93 180.60,290.47 179.50,291.00C178.40,291.53 175.70,293.09 173.50,294.46C171.30,295.82 168.15,297.63 166.50,298.47C164.85,299.30 161.70,301.12 159.50,302.51C157.30,303.90 154.60,305.45 153.50,305.96C152.40,306.47 150.15,307.80 148.50,308.93C144.90,311.40 142.43,311.57 141.61,309.42Z M114.00,307.78C112.08,306.57 105.10,302.85 98.50,299.54L86.50,293.50 L86.24,246.34L85.98,199.17 L94.74,194.40C109.90,186.13 118.89,182.02 120.47,182.63C121.82,183.15 122.00,190.56 122.00,246.00C122.00,302.33 121.84,308.85 120.42,309.39C118.12,310.28 117.84,310.21 114.00,307.78Z M87.00,74.62C87.00,31.33 87.22,23.06 88.43,22.06C89.21,21.41 96.86,17.33 105.43,13.00C119.85,5.72 121.08,5.27 122.00,7.00C123.16,9.18 123.39,106.93 122.23,108.50C121.11,110.03 90.15,125.95 88.25,125.98C87.27,126.00 87.00,115.07 87.00,74.62Z M140.67,95.33C140.30,94.97 140.00,74.81 140.00,50.55C140.00,7.28 140.04,6.42 141.98,6.28C143.82,6.14 154.86,11.46 169.75,19.66L176.00,23.10 L176.00,51.33L176.00,79.56 L173.25,80.74C171.74,81.38 164.43,85.08 157.00,88.96C143.57,95.97 141.94,96.60 140.67,95.33Z";

/** The real BH Ventures monogram — teal→turquoise gradient by default, or a
 * flat single color (e.g. for the launcher button) via `variant="flat"`. */
function BHMark({ variant = "gradient" }: { variant?: "gradient" | "flat" }) {
    const gid = useId();
    return (
        <svg viewBox="0 0 262 315" xmlns="http://www.w3.org/2000/svg">
            {variant === "gradient" && (
                <defs>
                    <linearGradient id={gid} x1="20" y1="10" x2="250" y2="300" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#7dfbe8" />
                        <stop offset="55%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0f6f66" />
                    </linearGradient>
                </defs>
            )}
            <path d={BH_MARK_PATH} fill={variant === "gradient" ? `url(#${gid})` : "currentColor"} />
        </svg>
    );
}

function FormattedContent({ text }: { text: string }) {
    const paragraphs = text.split("\n\n");

    return (
        <div>
            {paragraphs.map((para, pIdx) => {
                const lines = para.split("\n");
                return (
                    <div key={pIdx}>
                        {lines.map((line, lIdx) => {
                            const trimmed = line.trim();
                            const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
                            const content = isBullet ? trimmed.slice(2) : trimmed;

                            const parts = content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                            });

                            if (isBullet) {
                                return (
                                    <div key={lIdx} className="chatbot-bullet-line">
                                        <span className="chatbot-bullet-dot" />
                                        <span>{parts}</span>
                                    </div>
                                );
                            }

                            return <p key={lIdx}>{parts}</p>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default function BHChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm the **BH Ventures** assistant. Ask me about our services, ventures, or how to get in touch.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [messages, open, loading]);

    async function sendUserMessage(textToSend?: string) {
        const text = (textToSend ?? input).trim();
        if (!text || loading) return;

        const nextMessages: Message[] = [...messages, { role: "user", content: text }];
        setMessages(nextMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: nextMessages }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || "I couldn't generate a response — please try again." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I hit a connection issue. Please check your internet or visit our **Contact** page directly.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function resetChat() {
        setMessages([{ role: "assistant", content: "Chat cleared. What can I help you with?" }]);
    }

    return (
        <div className="chatbot-root">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="chatbot-panel"
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-header-left">
                                <div className="chatbot-mark">
                                    <BHMark />
                                    <span className="chatbot-status-dot" />
                                </div>
                                <div>
                                    <div className="chatbot-title-row">
                                        <h3 className="chatbot-title">BH Ventures</h3>
                                        <span className="chatbot-badge">AI</span>
                                    </div>
                                    <p className="chatbot-subtitle">Assistant · Online now</p>
                                </div>
                            </div>

                            <div className="chatbot-header-actions">
                                <button onClick={resetChat} className="chatbot-icon-btn" title="Restart chat" aria-label="Restart chat">
                                    <RotateCcw size={15} />
                                </button>
                                <button onClick={() => setOpen(false)} className="chatbot-icon-btn" aria-label="Close chat">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div ref={scrollRef} className="chatbot-messages">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`chatbot-message-row ${m.role}`}
                                >
                                    {m.role === "assistant" && (
                                        <div className="chatbot-avatar-small assistant">
                                            <BHMark />
                                        </div>
                                    )}

                                    <div className={`chatbot-bubble ${m.role}`}>
                                        <FormattedContent text={m.content} />
                                    </div>

                                    {m.role === "user" && (
                                        <div className="chatbot-avatar-small user">
                                            <User size={14} />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {messages.length === 1 && !loading && (
                                <div className="chatbot-suggestions">
                                    <p className="chatbot-suggestions-label">A few things to ask:</p>
                                    <div className="chatbot-suggestions-list">
                                        {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                            <button key={idx} onClick={() => sendUserMessage(prompt)} className="chatbot-suggestion-btn">
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div className="chatbot-typing-row">
                                    <div className="chatbot-avatar-small assistant">
                                        <BHMark />
                                    </div>
                                    <div className="chatbot-typing-bubble">
                                        <span className="chatbot-typing-dot" />
                                        <span className="chatbot-typing-dot" />
                                        <span className="chatbot-typing-dot" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="chatbot-input-area">
                            <div className="chatbot-input-row">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendUserMessage()}
                                    placeholder="Ask anything about BH Ventures…"
                                    disabled={loading}
                                    className="chatbot-input"
                                />
                                <button
                                    onClick={() => sendUserMessage()}
                                    disabled={loading || !input.trim()}
                                    className="chatbot-send-btn"
                                    aria-label="Send message"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="chatbot-footer-note">BH Ventures Assistant</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="chatbot-trigger-wrap">
                {!open && <span className="chatbot-tooltip">Chat with BH Ventures</span>}
                <button onClick={() => setOpen((v) => !v)} className="chatbot-trigger-btn" aria-label={open ? "Close chat" : "Open chat"}>
                    {open ? <X size={24} strokeWidth={2.4} /> : <BHMark variant="flat" />}
                    {!open && <span className="chatbot-pulse-ring" />}
                </button>
            </div>
        </div>
    );
}