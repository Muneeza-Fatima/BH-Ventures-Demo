import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgeBase } from "@/lib/knowledge-base";
import { retrieveRelevantChunks } from "@/lib/retrieve";

const CANDIDATE_MODELS = [
    process.env.GEMINI_MODEL,
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-3.5-flash-lite",
].filter(Boolean) as string[];

// Remove duplicates while preserving order
const UNIQUE_MODELS = Array.from(new Set(CANDIDATE_MODELS));

type ChatMessage = { role: "user" | "assistant"; content: string };

const BASE_SYSTEM_PROMPT = `You are the virtual assistant for BH Ventures FZE LLC, a UAE-based
trading and innovation company. Answer visitor questions using ONLY the "Relevant context"
below plus the conversation so far. If the context doesn't cover something, say you don't
have that detail and point the visitor to the contact page rather than guessing.
Be concise, friendly, and professional.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = (await req.json()) as { messages: ChatMessage[] };
        const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
        const query = lastUserMessage?.content ?? "";

        const knowledgeBase = buildKnowledgeBase();
        const relevant = retrieveRelevantChunks(query, knowledgeBase, 4);
        const context = relevant.map((c) => `### ${c.title}\n${c.text}`).join("\n\n");
        const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nRelevant context:\n${context}`;

        const contents = messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        let reply: string | null = null;
        let lastError: string | null = null;

        // Try candidate models in order until one succeeds
        for (const model of UNIQUE_MODELS) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        contents,
                    }),
                });

                if (!res.ok) {
                    const errText = await res.text();
                    console.warn(`Gemini API error on model ${model}:`, errText);
                    lastError = errText;
                    continue;
                }

                const data = await res.json();
                reply =
                    data.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join("\n") ??
                    null;

                if (reply) break;
            } catch (modelErr) {
                console.warn(`Fetch error for model ${model}:`, modelErr);
            }
        }

        if (reply) {
            return NextResponse.json({ reply });
        }

        console.error("All Gemini models failed. Last error:", lastError);
        return NextResponse.json(
            { reply: "Sorry, I am currently experiencing high demand. Please try again in a moment or visit our Contact page." },
            { status: 500 }
        );
    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json(
            { reply: "Sorry, something went wrong. Please try again or visit our Contact page." },
            { status: 500 }
        );
    }
}