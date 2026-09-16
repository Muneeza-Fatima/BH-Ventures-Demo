import { KnowledgeChunk } from "./knowledge-base";

// -----------------------------------------------------------------------
// SYNONYM GROUPS
// -----------------------------------------------------------------------
// Each inner array is a set of words/phrases visitors might use that all
// mean the same thing on your site. Every member of a group gets rewritten
// to the group's first entry (the "canonical" term) before matching, so a
// visitor typing "cars" still hits your "automobile" chunk, "jobs" hits
// "careers", etc. Multi-word phrases are matched first (longest first) so
// "get in touch" is caught before its individual words are tokenized.
//
// Add a group any time you notice a real question missing a chunk it
// should have matched — this list is meant to grow with real usage.
const SYNONYM_GROUPS: string[][] = [
    // Automobiles / vehicles
    ["automobile", "automobiles", "car", "cars", "vehicle", "vehicles", "auto", "autos"],
    // Careers / jobs
    ["career", "careers", "job", "jobs", "hiring", "vacancy", "vacancies", "position", "positions", "employment", "recruit", "recruiting"],
    // Contact
    ["contact", "reach", "reach out", "get in touch", "touch", "email us", "call us", "whatsapp"],
    // Pricing
    ["price", "pricing", "cost", "costs", "how much", "quote", "quotation", "rate", "rates", "fee", "fees"],
    // AI
    ["ai", "artificial intelligence", "machine learning", "ml"],
    // Web3
    ["web3", "web 3", "blockchain", "crypto", "cryptocurrency", "nft", "nfts"],
    // Digital analytics
    ["analytics", "data analytics", "dashboard", "dashboards", "tracking", "metrics", "reporting"],
    // Marketing
    ["marketing", "campaign", "campaigns", "promotion", "promotions"],
    // Advertising
    ["advertising", "ads", "advertisement", "advertisements", "ppc"],
    // Social media
    ["social media", "instagram", "tiktok", "facebook", "social"],
    // Surveying / research
    ["surveying", "survey", "surveys", "market research", "research", "feedback"],
    // Exhibition / events
    ["exhibition", "exhibitions", "event", "events", "expo", "trade show"],
    // Dates (the fruit)
    ["dates", "date fruit", "date wholesale", "medjool", "ajwa"],
    // Company / about
    ["company", "about", "who are you", "who you are", "business"],
    // Services (general)
    ["service", "services", "offer", "offerings", "what you do", "what do you do"],
    // Location
    ["location", "based", "office", "address", "where are you"],
    // Founder / leadership
    ["founder", "ceo", "owner", "leadership"],
];

// Longest phrases first so multi-word matches win before single-word ones.
const PHRASE_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> =
    SYNONYM_GROUPS.flatMap((group) => {
        const canonical = group[0].replace(/\s+/g, "_");
        return group
            .slice(1)
            .sort((a, b) => b.length - a.length)
            .map((variant) => ({
                pattern: new RegExp(`\\b${variant.replace(/\s+/g, "\\s+")}\\b`, "g"),
                replacement: canonical,
            }));
    });

function applySynonyms(text: string): string {
    let result = text;
    for (const { pattern, replacement } of PHRASE_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    return result;
}

// Very light stemming: strips common suffixes so "surveys"/"surveying",
// "requirements"/"required" etc. share a root. Deliberately conservative —
// only touches longer words to avoid mangling short real words.
function stem(word: string): string {
    if (word.length <= 4) return word;
    if (word.endsWith("ing") && word.length > 6) return word.slice(0, -3);
    if (word.endsWith("ies") && word.length > 5) return word.slice(0, -3) + "y";
    if (word.endsWith("es") && word.length > 5) return word.slice(0, -2);
    if (word.endsWith("ed") && word.length > 5) return word.slice(0, -2);
    if (word.endsWith("s") && !word.endsWith("ss") && word.length > 4) return word.slice(0, -1);
    return word;
}

// Canonical terms shorter than 3 chars would otherwise be dropped by the
// min-length filter below — whitelist the ones we actually use as a
// synonym-group canonical (see SYNONYM_GROUPS above) so they survive.
const SHORT_TOKEN_WHITELIST = new Set(["ai", "ux", "ui", "hr"]);

function tokenize(text: string): string[] {
    const withSynonyms = applySynonyms(text.toLowerCase());
    return withSynonyms
        .replace(/[^a-z0-9_\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 || SHORT_TOKEN_WHITELIST.has(w))
        .map(stem);
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