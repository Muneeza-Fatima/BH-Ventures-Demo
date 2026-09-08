import { KnowledgeChunk } from "./knowledge-base";

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2);
}

export function retrieveRelevantChunks(
    query: string,
    chunks: KnowledgeChunk[],
    topK = 4
): KnowledgeChunk[] {
    const queryWords = new Set(tokenize(query));
    if (queryWords.size === 0) return chunks.slice(0, topK);

    const scored = chunks.map((chunk) => {
        let score = 0;
        for (const word of tokenize(`${chunk.title} ${chunk.text}`)) {
            if (queryWords.has(word)) score += 1;
        }
        for (const word of tokenize(chunk.title)) {
            if (queryWords.has(word)) score += 3;
        }
        return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.filter((s) => s.score > 0).slice(0, topK);
    return top.length > 0 ? top.map((s) => s.chunk) : chunks.slice(0, topK);
}