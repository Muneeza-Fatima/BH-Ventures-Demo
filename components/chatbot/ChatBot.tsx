"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, RotateCcw, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./chatbot.css";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
    "What services do you offer?",
    "Tell me about your trading programs",
    "What is BH Ventures' Web3 Studio?",
    "How can I contact the team?",
];

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

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I am the **BH Ventures AI Assistant**. How can I assist you with our services, ventures, or partnerships today?",
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
                { role: "assistant", content: data.reply || "I am currently unable to generate a response. Please try again." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I ran into a connection issue. Please check your internet or visit our **Contact** page directly.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function resetChat() {
        setMessages([{ role: "assistant", content: "Chat cleared. How else can I assist you today?" }]);
    }

    return (
        <div className="chatbot-root">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.94 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="chatbot-panel"
                    >
                        <div className="chatbot-header">
                            <div className="chatbot-header-left">
                                <div className="chatbot-avatar">
                                    <Bot size={20} strokeWidth={2.2} />
                                    <span className="chatbot-avatar-dot" />
                                </div>
                                <div>
                                    <div className="chatbot-title-row">
                                        <h3 className="chatbot-title">BH Ventures</h3>
                                        <span className="chatbot-badge">AI</span>
                                    </div>
                                    <p className="chatbot-subtitle">Virtual Assistant • Online</p>
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
                                            <Sparkles size={14} />
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
                                    <p className="chatbot-suggestions-label">Quick questions:</p>
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
                                        <Sparkles size={14} />
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
                            <div className="chatbot-footer-note">BH Ventures AI Assistant • Powered by Google Gemini</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="chatbot-trigger-wrap">
                {!open && <span className="chatbot-tooltip">Chat with BH Assistant</span>}
                <button onClick={() => setOpen((v) => !v)} className="chatbot-trigger-btn" aria-label={open ? "Close chat" : "Open chat"}>
                    {!open && <span className="chatbot-pulse-ring" />}
                    {open ? <X size={24} strokeWidth={2.4} /> : <MessageCircle size={24} strokeWidth={2.2} />}
                </button>
            </div>
        </div>
    );
}