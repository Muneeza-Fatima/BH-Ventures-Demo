"use client";

import { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import { X, Send, RotateCcw, User, Sun, Moon, Copy, Check, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./chatbot.css";

type Message = { role: "user" | "assistant"; content: string; time: string };
type Theme = "light" | "dark";

const SUGGESTED_PROMPTS = [
    "What services do you offer?",
    "Tell me about your trading programs",
    "What is BH Ventures' Web3 Studio?",
    "How can I contact the team?",
];

const CONTACT_EMAIL = "info@bhventures.ae";

function formatTime() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

// The chatbot's face: a rounded speech-bubble shape (with a little tail,
// like a real chat bubble — not a hexagon/monogram) in the brand's
// teal→turquoise gradient, with a simple smiling face. Used everywhere
// the widget needs to identify itself: header crest, message avatars,
// the proactive-greeting bubble, and the launcher.
// Icon file lives at public/images/icons/bot-icon.png — update the src
// below if you move or rename it. Used everywhere the widget needs to
// identify itself: header crest, message avatars, the proactive-greeting
// bubble, and the launcher.
function ChatBubbleIcon() {
    return (
        <Image
            src="/images/icons/bot-icon.png"
            alt=""
            width={46}
            height={46}
            className="h-full w-full object-contain"
        />
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
    const [theme, setTheme] = useState<Theme>("light");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm the **BH Ventures** assistant. Ask me about our services, ventures, or how to get in touch.",
            time: formatTime(),
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [transcriptCopied, setTranscriptCopied] = useState(false);
    const [showProactive, setShowProactive] = useState(false);
    const [proactiveDismissed, setProactiveDismissed] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const titleId = useId();

    useEffect(() => {
        if (open) {
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [messages, open, loading]);

    // A one-time proactive nudge, not a repeating pattern — appears once
    // if the visitor hasn't opened or dismissed it.
    useEffect(() => {
        if (open || proactiveDismissed) {
            setShowProactive(false);
            return;
        }
        const t = setTimeout(() => setShowProactive(true), 3500);
        return () => clearTimeout(t);
    }, [open, proactiveDismissed]);

    function dismissProactive(e: React.MouseEvent) {
        e.stopPropagation();
        setShowProactive(false);
        setProactiveDismissed(true);
    }

    function openFromProactive() {
        setShowProactive(false);
        setProactiveDismissed(true);
        setOpen(true);
    }

    async function sendUserMessage(textToSend?: string) {
        const text = (textToSend ?? input).trim();
        if (!text || loading) return;

        const nextMessages: Message[] = [...messages, { role: "user", content: text, time: formatTime() }];
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
                {
                    role: "assistant",
                    content: data.reply || "I couldn't generate a response — please try again.",
                    time: formatTime(),
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I hit a connection issue. Please check your internet or visit our **Contact** page directly.",
                    time: formatTime(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function resetChat() {
        setMessages([{ role: "assistant", content: "Chat cleared. What can I help you with?", time: formatTime() }]);
    }

    async function copyMessage(content: string, index: number) {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex((cur) => (cur === index ? null : cur)), 1500);
        } catch {
            // clipboard access denied — silently ignore
        }
    }

    async function copyTranscript() {
        const text = messages.map((m) => `${m.role === "user" ? "You" : "BH Ventures"} (${m.time}): ${m.content}`).join("\n\n");
        try {
            await navigator.clipboard.writeText(text);
            setTranscriptCopied(true);
            setTimeout(() => setTranscriptCopied(false), 1800);
        } catch {
            // clipboard access denied — silently ignore
        }
    }

    return (
        <div className="chatbot-root" data-theme={theme}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="chatbot-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-header-row">
                                <div className="chatbot-header-left">
                                    <div className="chatbot-crest">
                                        <ChatBubbleIcon />
                                        <span className="chatbot-status-dot" />
                                    </div>
                                    <div>
                                        <div className="chatbot-title-row">
                                            <h3 className="chatbot-title" id={titleId}>BH Ventures</h3>
                                            <span className="chatbot-badge">AI</span>
                                        </div>
                                        <p className="chatbot-subtitle">Online now</p>
                                    </div>
                                </div>

                                <div className="chatbot-header-actions">
                                    <div className="chatbot-theme-toggle" role="group" aria-label="Theme">
                                        <button
                                            onClick={() => setTheme("light")}
                                            className={`chatbot-theme-btn${theme === "light" ? " is-active" : ""}`}
                                            aria-label="Light theme"
                                            aria-pressed={theme === "light"}
                                        >
                                            <Sun size={13} />
                                        </button>
                                        <button
                                            onClick={() => setTheme("dark")}
                                            className={`chatbot-theme-btn${theme === "dark" ? " is-active" : ""}`}
                                            aria-label="Dark theme"
                                            aria-pressed={theme === "dark"}
                                        >
                                            <Moon size={12} />
                                        </button>
                                    </div>
                                    <button onClick={resetChat} className="chatbot-icon-btn" title="Restart chat" aria-label="Restart chat">
                                        <RotateCcw size={15} />
                                    </button>
                                    <button onClick={() => setOpen(false)} className="chatbot-icon-btn" aria-label="Close chat">
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="chatbot-header-seam" />
                        </div>

                        <div ref={scrollRef} className="chatbot-messages">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.18 }}
                                    className={`chatbot-message-row ${m.role}`}
                                >
                                    {m.role === "assistant" && (
                                        <div className="chatbot-avatar-small assistant">
                                            <ChatBubbleIcon />
                                        </div>
                                    )}

                                    <div className={`chatbot-message-col ${m.role}`}>
                                        <div className="chatbot-bubble-wrap">
                                            <div className={`chatbot-bubble ${m.role}`}>
                                                <FormattedContent text={m.content} />
                                            </div>
                                            {m.role === "assistant" && (
                                                <button
                                                    onClick={() => copyMessage(m.content, i)}
                                                    className={`chatbot-copy-btn${copiedIndex === i ? " is-copied" : ""}`}
                                                    aria-label="Copy message"
                                                >
                                                    {copiedIndex === i ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                            )}
                                        </div>
                                        <span className="chatbot-msg-time">{m.time}</span>
                                    </div>

                                    {m.role === "user" && (
                                        <div className="chatbot-avatar-small user">
                                            <User size={13} />
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
                                        <ChatBubbleIcon />
                                    </div>
                                    <div className="chatbot-typing-bubble">
                                        <span className="chatbot-typing-dot" />
                                        <span className="chatbot-typing-dot" />
                                        <span className="chatbot-typing-dot" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="chatbot-quick-actions">
                            <a href={`mailto:${CONTACT_EMAIL}`} className="chatbot-quick-btn">
                                <Mail size={12} />
                                Email us
                            </a>
                            <button onClick={copyTranscript} className="chatbot-quick-btn">
                                {transcriptCopied ? <Check size={12} /> : <Copy size={12} />}
                                {transcriptCopied ? "Copied" : "Copy chat"}
                            </button>
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
                                    aria-label="Message"
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

            <AnimatePresence>
                {!open && showProactive && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="chatbot-proactive"
                        onClick={openFromProactive}
                    >
                        <div className="chatbot-proactive-avatar">
                            <ChatBubbleIcon />
                        </div>
                        <p className="chatbot-proactive-text">
                            Looking into a venture, trading program, or the Web3 Studio? Ask away — I'm here to help.
                        </p>
                        <button onClick={dismissProactive} className="chatbot-proactive-close" aria-label="Dismiss">
                            <X size={12} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="chatbot-trigger-wrap">
                {!open && <span className="chatbot-tooltip">Chat with BH Ventures</span>}
                {!open && <span className="chatbot-pulse-ring" />}
                <button
                    onClick={() => {
                        setShowProactive(false);
                        setProactiveDismissed(true);
                        setOpen((v) => !v);
                    }}
                    className={`chatbot-trigger-btn${open ? " is-open" : ""}`}
                    aria-label={open ? "Close chat" : "Open chat"}
                >
                    {open ? <X size={24} strokeWidth={2.4} /> : <ChatBubbleIcon />}
                </button>
                {!open && showProactive && <span className="chatbot-trigger-badge">1</span>}
            </div>
        </div>
    );
}