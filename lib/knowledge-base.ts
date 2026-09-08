import { SERVICES } from "@/data/services";
import { careerJobs } from "@/components/careers/careersJobsData";
import { directChannels, quickLinks } from "@/components/contact/contactData";

export type KnowledgeChunk = { id: string; title: string; text: string };

function buildServiceChunks(): KnowledgeChunk[] {
    return SERVICES.map((s) => ({
        id: `service:${s.slug}`,
        title: s.title,
        text: [
            `Service: ${s.title} (${s.sub})`,
            s.desc,
            `What's included: ${s.whatsIncluded.join("; ")}`,
            `Process: ${s.process.map((p) => `${p.title} - ${p.desc}`).join(" | ")}`,
            `Key facts: ${s.highlights.map((h) => `${h.label}: ${h.value}`).join(", ")}`,
        ].join("\n"),
    }));
}

function buildCareerChunks(): KnowledgeChunk[] {
    if (careerJobs.length === 0) {
        return [
            {
                id: "careers:none",
                title: "Careers",
                text: "There are currently no open positions listed on the careers page. Interested candidates can reach out via the contact page or email to express interest for future roles.",
            },
        ];
    }
    return careerJobs.map((j) => ({
        id: `career:${j.id}`,
        title: j.title,
        text: [
            `Job: ${j.title} (${j.department}, ${j.employmentType}, ${j.location})`,
            j.aboutRole,
            `Requirements: ${j.requirements.join("; ")}`,
        ].join("\n"),
    }));
}

function buildContactChunks(): KnowledgeChunk[] {
    const channels = directChannels
        .map((c) => `${c.label}: ${c.value}${c.detail ? ` — ${c.detail}` : ""}`)
        .join("\n");
    const links = quickLinks.map((l) => `${l.label}: ${l.href}`).join("\n");
    return [
        {
            id: "contact:channels",
            title: "Contact",
            text: `Contact channels:\n${channels}\n\nUseful pages on the site:\n${links}`,
        },
    ];
}

export function buildKnowledgeBase(): KnowledgeChunk[] {
    return [...buildServiceChunks(), ...buildCareerChunks(), ...buildContactChunks()];
}