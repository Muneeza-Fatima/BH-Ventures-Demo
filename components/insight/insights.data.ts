/* ------------------------------------------------------------------
   BH Ventures · Insights — content layer

   Everything an editor touches lives here. The component in
   insights.tsx never hard-codes a title, a figure or a topic, so this
   file can be swapped for an API response from the admin panel
   without changing a line of the UI.
------------------------------------------------------------------- */

export type CategoryId = "ai" | "web3" | "market" | "analytics" | "marketing" | "future";
export type ContentType = "insight" | "trend" | "opinion" | "internal";

interface ChartBase {
    title: string;
    /** Plain-language description read aloud by screen readers. */
    summary: string;
    /** Overrides the default "illustrative" line. Pass "" to hide it. */
    note?: string;
}

export type ChartSpec =
    | (ChartBase & { kind: "bars"; unit?: string; data: { label: string; value: number; highlight?: boolean }[] })
    | (ChartBase & {
        kind: "line";
        yLabel: string;
        xLabels: string[];
        series: { name: string; values: number[]; accent?: boolean }[];
    })
    | (ChartBase & { kind: "donut"; data: { label: string; value: number }[] })
    | (ChartBase & {
        kind: "matrix";
        xLabel: string;
        yLabel: string;
        quadrant: string;
        points: { label: string; x: number; y: number }[];
    })
    | (ChartBase & { kind: "flow"; steps: { label: string; detail: string }[] })
    | (ChartBase & { kind: "curve"; xLabel: string; yLabel: string; marks: { label: string; at: number }[] });

export type Block =
    | { t: "p"; text: string }
    | { t: "h"; text: string }
    | { t: "quote"; text: string }
    | { t: "list"; items: string[] }
    | { t: "callout"; label: string; text: string }
    | { t: "chart"; spec: ChartSpec };

export interface Article {
    slug: string;
    category: CategoryId;
    type: ContentType;
    /** Written as a position, not a topic. The index reads as a list of claims. */
    title: string;
    excerpt: string;
    minutes: number;
    takeaways: string[];
    body: Block[];
    /** Optional photo. Any image URL works; it is rendered duotone. */
    photo?: { src: string; alt: string };
}

export const DEFAULT_NOTE =
    "Illustrative example. The figures are invented to show the idea and are not measured data.";

export const CATEGORIES: { id: CategoryId; label: string; color: string }[] = [
    { id: "ai", label: "AI and innovation", color: "#9B8CFA" },
    { id: "web3", label: "Web3 and digital ventures", color: "#3FE3B0" },
    { id: "market", label: "Business and markets", color: "#FFC857" },
    { id: "analytics", label: "Digital analytics", color: "#5EC8F2" },
    { id: "marketing", label: "Marketing and advertising", color: "#FF8A7A" },
    { id: "future", label: "Future trends", color: "#8CE99A" },
];

/**
 * Each kind of writing gets a shape, not a colour: a filled square,
 * an open square, a slash and a dot. The key at the foot of the index
 * explains them. Shape survives greyscale printing and colour blindness,
 * and it stays legible against every topic colour above.
 */
export const TYPE_LABELS: Record<ContentType, { name: string; meaning: string }> = {
    insight: { name: "Insight", meaning: "Practical guidance on how an idea works in business." },
    trend: { name: "Trend", meaning: "What is changing, and what may follow." },
    opinion: { name: "Opinion", meaning: "Analysis that reflects the author's judgement." },
    internal: { name: "Internal perspective", meaning: "How the BH Ventures team thinks and works." },
};

export const categoryLabel = (id: CategoryId) =>
    CATEGORIES.find((c) => c.id === id)?.label ?? "Uncategorised";

export const categoryColor = (id: CategoryId) =>
    CATEGORIES.find((c) => c.id === id)?.color ?? "#3FE3B0";

export const ARTICLES: Article[] = [
    /* ---------------------------- AI and innovation --------------------------- */
    {
        slug: "your-first-ai-project-is-the-task-everyone-complains-about",
        category: "ai",
        type: "insight",
        title: "Your first AI project is the task everyone complains about",
        excerpt: "Skip the grand strategy. Find the chore that eats the hours and start there.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Developer working with automated code on a laptop",
        },
        takeaways: [
            "Listen for the sigh: the repeated chore is your best pilot.",
            "Chores are easy to measure, low in risk, and loved by the team.",
            "Let AI draft or sort. Let a person approve.",
        ],
        body: [
            { t: "p", text: "Nobody has ever said, \u201cI can\u2019t wait to reformat this report again.\u201d That sigh is your signal." },
            { t: "h", text: "Look for the sigh" },
            {
                t: "p",
                text: "The best first AI project is rarely the impressive one. It is the repeated, rule-shaped chore that people do with half their attention: sorting the inbox, rewriting the same reply, copying figures from one file into another.",
            },
            {
                t: "chart",
                spec: {
                    kind: "bars",
                    title: "Where a small team\u2019s week can disappear",
                    unit: " h",
                    summary:
                        "Bar chart of example weekly hours. Client work is highest at 11 hours, followed by routine messages at 9, meetings at 8, formatting reports at 7 and searching for files at 5. Routine messages and formatting reports are marked as good AI pilots.",
                    data: [
                        { label: "Routine messages", value: 9, highlight: true },
                        { label: "Formatting reports", value: 7, highlight: true },
                        { label: "Searching for files", value: 5 },
                        { label: "Meetings", value: 8 },
                        { label: "Client work", value: 11 },
                    ],
                },
            },
            { t: "h", text: "Why chores beat showpieces" },
            {
                t: "list",
                items: [
                    "Easy to judge: you already know how long the task takes today.",
                    "Low risk: a mistake in a draft is caught before it reaches anyone.",
                    "Good for morale: people feel the benefit on day one, which earns trust for the next project.",
                ],
            },
            {
                t: "callout",
                label: "Try this on Monday",
                text: "Ask each person for the one task they would happily never do again. Tally the answers. The most repeated one is your pilot.",
            },
            { t: "quote", text: "If nobody complains about a task, nobody will notice you improved it." },
            { t: "h", text: "Keep a person in the loop" },
            {
                t: "p",
                text: "Let AI produce the draft, the sort or the summary. Let a person approve anything that leaves the building. You get the speed without giving up accountability.",
            },
        ],
    },
    {
        slug: "ai-amplifies-your-process-so-tidy-the-process-first",
        category: "ai",
        type: "insight",
        title: "AI amplifies your process, so tidy the process first",
        excerpt: "Give a fast tool a confusing job and you get confusing results, faster.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Technology professional working with an advanced digital system",
        },
        takeaways: [
            "AI multiplies whatever it is given, good or bad.",
            "Write the steps down before you automate any of them.",
            "Start with one slice and measure it against the old way.",
        ],
        body: [
            { t: "p", text: "Give a fast tool a confusing job and you get confusing results, faster." },
            { t: "h", text: "Where AI projects stumble" },
            {
                t: "p",
                text: "Three problems appear again and again. The steps are not written down. The information lives in five places. Nobody has said what finished looks like. AI fixes none of these. It speeds them up.",
            },
            { t: "h", text: "A safer order of work" },
            {
                t: "chart",
                spec: {
                    kind: "flow",
                    title: "From messy workflow to trusted automation",
                    note: "",
                    summary: "Five steps in order: map the process, tidy it, trial one slice, measure against the old way, then expand.",
                    steps: [
                        { label: "Map", detail: "Write the steps down as they really happen." },
                        { label: "Tidy", detail: "Fix obvious gaps, duplicates and unclear hand-offs." },
                        { label: "Trial", detail: "Automate one small slice only." },
                        { label: "Measure", detail: "Compare time and errors with the old way." },
                        { label: "Expand", detail: "Repeat on the next slice." },
                    ],
                },
            },
            {
                t: "callout",
                label: "A five-sentence test",
                text: "If you cannot explain the task to a new colleague in five sentences, it is not ready to hand to AI.",
            },
            { t: "h", text: "Tidy the information too" },
            {
                t: "p",
                text: "Keep documents in one agreed place and name them consistently. An assistant can only work with what it can find, and so can your team.",
            },
            { t: "quote", text: "Automation is a multiplier. Make sure you are multiplying something good." },
        ],
    },

    /* ------------------------- Web3 and digital ventures ---------------------- */
    {
        slug: "do-you-need-a-blockchain-four-questions",
        category: "web3",
        type: "insight",
        title: "Do you need a blockchain? Four questions to ask before you build",
        excerpt: "Blockchain is exciting and often the wrong tool. A few honest questions can save months.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Close-up of a digital blockchain network concept",
        },
        takeaways: [
            "Blockchain fits when several parties must share one trusted record.",
            "If one party controls the data anyway, use a normal database.",
            "A \u201cno\u201d is a good result: it saves cost.",
        ],
        body: [
            { t: "p", text: "Blockchain is exciting. It is also frequently the wrong tool. A few honest questions can save months of work." },
            { t: "h", text: "The four questions" },
            {
                t: "list",
                items: [
                    "Do several organisations need to read and write the same record?",
                    "Is there no single party that all of them would trust to hold it?",
                    "Would they otherwise spend time reconciling separate copies?",
                    "Does the record need to stay verifiable for years?",
                ],
            },
            {
                t: "p",
                text: "Answer yes to most and the technology may fit. Answer no to most and a standard database will be cheaper, faster and easier to run.",
            },
            {
                t: "chart",
                spec: {
                    kind: "matrix",
                    title: "Where a shared record starts to make sense",
                    xLabel: "Number of organisations sharing the record",
                    yLabel: "Need for a neutral record",
                    quadrant: "May fit",
                    summary:
                        "Two-by-two chart. Single-company inventory and one-brand loyalty points sit in the lower left, where a normal database works. Cross-company product provenance and multi-party settlement sit in the upper right, where a shared record may fit.",
                    points: [
                        { label: "Single-company inventory", x: 10, y: 12 },
                        { label: "One-brand loyalty points", x: 20, y: 32 },
                        { label: "Cross-company provenance", x: 78, y: 74 },
                        { label: "Multi-party settlement", x: 88, y: 88 },
                    ],
                },
            },
            { t: "callout", label: "The blunt rule", text: "If one party controls the data anyway, use a database." },
            { t: "h", text: "What to do if the answer is no" },
            {
                t: "p",
                text: "That is a good outcome. You have avoided cost and complexity. Build the service on ordinary tools and revisit the question if the situation changes.",
            },
        ],
    },
    {
        slug: "web3-beyond-the-hype-where-it-earns-its-keep",
        category: "web3",
        type: "trend",
        title: "Web3 beyond the hype: where the technology earns its keep",
        excerpt: "Strip away the noise and one idea remains: a record several parties can trust without trusting each other.",
        minutes: 7,
        photo: {
            src: "https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Digital finance concept representing decentralised technology",
        },
        takeaways: [
            "Traceability, settlement, credentials and ownership are the credible areas.",
            "Single-brand programmes rarely need the technology.",
            "Prove the service is wanted before adding any token.",
        ],
        body: [
            {
                t: "p",
                text: "Strip away the noise and Web3 comes down to one idea: a record that several parties can trust without having to trust one another. Where that matters, the technology can help. Where it does not, it only adds cost.",
            },
            { t: "h", text: "Four places it can earn its keep" },
            {
                t: "list",
                items: [
                    "Traceability: recording where a product came from and who handled it, across companies that would otherwise keep separate logs.",
                    "Settlement: moving value between parties with a clear, shared record of what happened.",
                    "Credentials: proving a qualification or permission in a way others can check.",
                    "Digital ownership: representing an asset or right so it can be transferred and verified.",
                ],
            },
            {
                t: "chart",
                spec: {
                    kind: "bars",
                    title: "How well common ideas match the blockchain test",
                    unit: "",
                    summary:
                        "Bar chart of example fit scores out of 100. Product traceability scores 80, cross-border settlement 70, digital credentials 65, digital asset ownership 60, and single-brand loyalty 20.",
                    data: [
                        { label: "Product traceability", value: 80, highlight: true },
                        { label: "Cross-border settlement", value: 70, highlight: true },
                        { label: "Digital credentials", value: 65, highlight: true },
                        { label: "Digital asset ownership", value: 60, highlight: true },
                        { label: "Single-brand loyalty", value: 20 },
                    ],
                },
            },
            { t: "h", text: "One place it rarely does" },
            {
                t: "p",
                text: "A loyalty scheme run by one brand does not need a blockchain. The brand controls the rules and the records already. Adding the technology raises cost, and customers seldom see a benefit.",
            },
            { t: "quote", text: "Judge the service first. The token, if there is one, comes last." },
            {
                t: "callout",
                label: "A note on rules",
                text: "Regulation of digital assets differs by country and by licence. Take qualified advice before you launch anything to the public.",
            },
        ],
    },

    /* ------------------------ Business and markets -------------------- */
    {
        slug: "trade-still-runs-on-phone-calls",
        category: "market",
        type: "opinion",
        title: "Trade still runs on phone calls. That is the opportunity.",
        excerpt: "Physical trade depends on relationships, PDFs and patience. Our view: fix the friction, keep the trader.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Financial professional reviewing market information",
        },
        takeaways: [
            "Much of a trade deal's effort goes on chasing information, not negotiating.",
            "The best tools fit how traders already work.",
            "Trust between buyer and seller stays the product.",
        ],
        body: [
            { t: "p", text: "This piece is opinion. It is how we read the market, not a forecast." },
            {
                t: "p",
                text: "A buyer sends a message. A trader checks a spreadsheet, calls a supplier, and replies. Then the PDFs start travelling. It works because the people involved know each other. It is also slow.",
            },
            { t: "h", text: "Where the time goes" },
            {
                t: "chart",
                spec: {
                    kind: "bars",
                    title: "Effort on a typical export deal",
                    unit: "%",
                    summary:
                        "Bar chart of example share of effort. Chasing documents takes 30 percent and waiting for replies 25 percent, both marked. Checking prices takes 20 percent, arranging shipping 15 percent and negotiating 10 percent.",
                    data: [
                        { label: "Chasing documents", value: 30, highlight: true },
                        { label: "Waiting for replies", value: 25, highlight: true },
                        { label: "Checking prices", value: 20 },
                        { label: "Arranging shipping", value: 15 },
                        { label: "Negotiating", value: 10 },
                    ],
                },
            },
            {
                t: "p",
                text: "If this picture is even roughly right, most of a trader's effort goes on gathering information, not on the part that needs judgement and trust.",
            },
            { t: "h", text: "What we would improve first" },
            {
                t: "list",
                items: [
                    "Documents: complete, organised and easy to find for every deal.",
                    "Visibility: what is available, at what price, and when it can ship.",
                    "Tracking: where a shipment is, without a phone call.",
                    "Replies: quick, consistent answers to routine buyer questions.",
                ],
            },
            { t: "quote", text: "The best trade technology feels like a better assistant, not a new system to learn." },
            { t: "h", text: "Our view" },
            {
                t: "p",
                text: "Technology does not replace the trader. It shortens the distance between a question and a confident answer, so the trader spends the day on relationships instead of chasing paper.",
            },
        ],
    },
    {
        slug: "how-bh-ventures-decides-what-to-build",
        category: "market",
        type: "internal",
        title: "How BH Ventures decides what to build",
        excerpt: "We are early-stage and say so. Here is the path an idea has to walk before it becomes a project.",
        minutes: 4,
        photo: {
            src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Business team collaborating around a table",
        },
        takeaways: [
            "We start from a real problem held by a real person.",
            "We test small before we build large.",
            "Every idea ends in one of three decisions: continue, change or stop.",
        ],
        body: [
            {
                t: "p",
                text: "BH Ventures is an early-stage company, and we would rather say so than pretend otherwise. What we can share is how we decide what to build, because that is where most ventures succeed or fail.",
            },
            { t: "h", text: "The path an idea walks" },
            {
                t: "chart",
                spec: {
                    kind: "flow",
                    title: "From idea to decision",
                    note: "",
                    summary: "Five stages: find a real problem, talk to potential users, build a prototype, look for a signal, then decide.",
                    steps: [
                        { label: "Problem", detail: "Name the person who has it and describe their day." },
                        { label: "Talk", detail: "Speak to five potential users." },
                        { label: "Prototype", detail: "Build the smallest version that can be tested." },
                        { label: "Signal", detail: "Do people come back and ask for more?" },
                        { label: "Decide", detail: "Continue, change direction, or stop." },
                    ],
                },
            },
            { t: "h", text: "Stay close to what we are licensed to do" },
            {
                t: "p",
                text: "Our activities span trading, Web3, analytics, marketing and AI research. Ideas that connect to these are stronger, because we can build them properly and describe them accurately.",
            },
            { t: "quote", text: "Being clear about our stage is part of being trustworthy." },
            { t: "h", text: "Keep technology light" },
            {
                t: "p",
                text: "We choose the simplest technology that solves the problem. Fast, reliable and easy to maintain beats impressive every time.",
            },
        ],
    },

    /* ----------------------------- Digital analytics ------------------------ */
    {
        slug: "the-dashboard-test-cut-what-cannot-change-a-decision",
        category: "analytics",
        type: "insight",
        title: "The dashboard test: if a number can't change a decision, cut it",
        excerpt: "Open your dashboard, pick any number, and ask what you decided because of it.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Analytics charts displayed on a laptop screen",
        },
        takeaways: [
            "Every metric needs a decision, an owner and a planned response.",
            "Most dashboards are full of numbers that nobody acts on.",
            "Review a short list on a steady weekly rhythm.",
        ],
        body: [
            { t: "p", text: "Open your dashboard. Pick any number. Ask: what did we decide because of this? If the room goes quiet, you have found something to cut." },
            { t: "h", text: "Three questions for every metric" },
            {
                t: "list",
                items: [
                    "What decision does this number inform?",
                    "Who owns it, and who can change it?",
                    "What will we do if it moves by a meaningful amount?",
                ],
            },
            {
                t: "chart",
                spec: {
                    kind: "donut",
                    title: "What happens to the numbers on a typical dashboard",
                    summary:
                        "Donut chart of example shares. Twenty percent of metrics led to a decision, forty-five percent were looked at with no action, and thirty-five percent were never opened.",
                    data: [
                        { label: "Led to a decision", value: 20 },
                        { label: "Looked at, no action", value: 45 },
                        { label: "Never opened", value: 35 },
                    ],
                },
            },
            {
                t: "callout",
                label: "Try this in ten minutes",
                text: "List every metric on your dashboard. Mark each as \u201cdecided something\u201d, \u201clooked at\u201d or \u201cnever opened\u201d. Remove the last group first.",
            },
            { t: "h", text: "Keep the rhythm" },
            {
                t: "p",
                text: "Choose one measure of growth, one of quality and one of efficiency. Review them for ten minutes at the same time each week. A few numbers checked every week beat many numbers checked rarely.",
            },
            { t: "quote", text: "A good dashboard ends a conversation faster than it starts one." },
        ],
    },
    {
        slug: "five-vanity-metrics-and-what-to-track-instead",
        category: "analytics",
        type: "insight",
        title: "Five vanity metrics, and what to track instead",
        excerpt: "Views are up. Enquiries are flat. Which one pays the invoices?",
        minutes: 6,
        photo: {
            src: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Marketing performance charts and planning materials",
        },
        takeaways: [
            "Vanity metrics rise easily and say little about the business.",
            "Track the number closest to a real customer action.",
            "Work backwards from money to find the right measure.",
        ],
        body: [
            { t: "p", text: "Views are up. Enquiries are flat. Which one pays the invoices?" },
            {
                t: "chart",
                spec: {
                    kind: "line",
                    title: "When attention grows and business does not",
                    yLabel: "Index (illustrative)",
                    xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    summary:
                        "Line chart over six months. Page views climb steadily from 30 to 92 while enquiries stay flat near 30.",
                    series: [
                        { name: "Page views", values: [30, 42, 55, 68, 80, 92] },
                        { name: "Enquiries received", values: [30, 31, 29, 32, 30, 31], accent: true },
                    ],
                },
            },
            { t: "h", text: "Five swaps" },
            {
                t: "list",
                items: [
                    "Page views: track enquiries received instead.",
                    "Followers: track conversations started instead.",
                    "Likes: track visits to your website from a post instead.",
                    "Time on site: track completed contact forms instead.",
                    "Number of calls: track calls that become a proposal instead.",
                ],
            },
            { t: "quote", text: "Choose the number closest to money, then work backwards." },
            {
                t: "p",
                text: "Vanity metrics are not useless. They are comfortable. They go up easily, they look good in a report, and they rarely ask anyone to change what they do. The better numbers are less flattering and far more useful.",
            },
        ],
    },

    /* --------------------------- Marketing and advertising -------------------- */
    {
        slug: "everyone-can-make-content-nobody-can-make-yours",
        category: "marketing",
        type: "trend",
        title: "Everyone can make content now. Nobody can make yours.",
        excerpt: "AI made competent writing cheap. A clear point of view is what is left to stand out.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Creative team developing a content strategy together",
        },
        takeaways: [
            "Competent content is now easy, so it no longer differentiates.",
            "Specific detail and a real point of view are hard to copy.",
            "Delete any sentence a competitor could have written.",
        ],
        body: [
            { t: "p", text: "Anyone can now produce a competent post in a minute. That is exactly the problem." },
            {
                t: "chart",
                spec: {
                    kind: "line",
                    title: "The crowded-feed problem",
                    yLabel: "Index (illustrative)",
                    xLabels: ["Past", "", "Now", "", "Next"],
                    summary:
                        "Line chart with three lines. Content produced rises steeply. Content that sounds distinct falls. Brands with a clear point of view rise gradually, opening a gap over the average.",
                    series: [
                        { name: "Content produced", values: [20, 35, 55, 75, 95] },
                        { name: "Content that sounds distinct", values: [80, 70, 55, 40, 30] },
                        { name: "Brands with a clear point of view", values: [30, 35, 45, 58, 70], accent: true },
                    ],
                },
            },
            { t: "h", text: "What stands out when everything sounds the same" },
            {
                t: "list",
                items: [
                    "A real point of view that someone might disagree with.",
                    "Specific detail: named steps, real examples, things you measured yourself.",
                    "A person willing to put their name to the idea.",
                    "A consistent voice across every channel.",
                ],
            },
            {
                t: "callout",
                label: "Try this before you publish",
                text: "Delete any sentence a competitor could have written. Keep what only you could say.",
            },
            { t: "quote", text: "When everyone can be competent, being specific becomes the advantage." },
        ],
    },
    {
        slug: "own-your-audience-a-channel-no-algorithm-can-switch-off",
        category: "marketing",
        type: "insight",
        title: "Own your audience: a channel no algorithm can switch off",
        excerpt: "Building only on rented platforms means your reach can change overnight, and it is not your decision.",
        minutes: 5,
        photo: {
            src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Marketing team planning a campaign in a workshop",
        },
        takeaways: [
            "Social platforms are rented land. Email and direct contact are owned.",
            "Rules and algorithms change without warning.",
            "Start with one owned channel and feed it steadily.",
        ],
        body: [
            { t: "p", text: "Building your audience only on social platforms is like running a shop on rented land. It can work well until the landlord changes the rules." },
            {
                t: "chart",
                spec: {
                    kind: "donut",
                    title: "Where a brand's reach can come from",
                    summary:
                        "Donut chart of example shares. Seventy percent of reach comes from rented platforms, twenty percent from search and ten percent from owned channels such as email and direct contact.",
                    data: [
                        { label: "Rented platforms", value: 70 },
                        { label: "Search", value: 20 },
                        { label: "Owned (email, direct)", value: 10 },
                    ],
                },
            },
            { t: "h", text: "What counts as owned" },
            {
                t: "p",
                text: "An email list, a community you host, direct messages with customers, and a website people visit by name. You choose when to reach these people, and no platform can decide otherwise.",
            },
            { t: "h", text: "Building one without a big budget" },
            {
                t: "list",
                items: [
                    "Offer one genuinely useful thing in exchange for an email address.",
                    "Send a short, regular message with something real to say.",
                    "Reply to every response. Conversations build the list.",
                ],
            },
            {
                t: "callout",
                label: "A fair warning",
                text: "Collect only what you need, tell people how you will use it, and follow the privacy rules that apply where your audience lives.",
            },
            { t: "quote", text: "Rent attention if you must. Own the relationship." },
        ],
    },

    /* ------------------------------- Future trends -------------------------- */
    {
        slug: "use-now-prepare-next-watch-sorting-tomorrows-technology",
        category: "future",
        type: "trend",
        title: "Use now, prepare next, watch: sorting tomorrow's technology",
        excerpt: "Every year brings a new list of technologies. Here is how to decide which ones deserve your attention.",
        minutes: 6,
        photo: {
            src: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Close-up of technology hardware representing future innovation",
        },
        takeaways: [
            "Judge each technology on maturity and on fit for your business.",
            "Use the proven, prepare for the promising, watch the rest.",
            "Most businesses gain more from applying mature tools well.",
        ],
        body: [
            { t: "p", text: "Every year brings a new list of technologies said to change business. Most lists are hard to act on because they never say which ones matter to you, or when." },
            { t: "h", text: "Two questions do most of the work" },
            {
                t: "p",
                text: "How mature is the technology? Is it proven and reliable, or still experimental? And how well does it fit a problem your business has today? Plot the answers and the decisions get clearer.",
            },
            {
                t: "chart",
                spec: {
                    kind: "matrix",
                    title: "A map for a small services business",
                    xLabel: "Maturity (experimental to proven)",
                    yLabel: "Fit for your business",
                    quadrant: "Use now",
                    summary:
                        "Two-by-two chart of example placements. AI drafting and summaries and analytics dashboards sit top right, in the use-now area. Multi-step AI agents and digital payments sit in the middle. Shared blockchain records and immersive 3D showrooms sit lower left, in the watch area.",
                    points: [
                        { label: "AI drafting and summaries", x: 84, y: 82 },
                        { label: "Analytics dashboards", x: 90, y: 66 },
                        { label: "Digital payments", x: 62, y: 54 },
                        { label: "Multi-step AI agents", x: 42, y: 70 },
                        { label: "Shared blockchain records", x: 36, y: 34 },
                        { label: "Immersive 3D showrooms", x: 20, y: 18 },
                    ],
                },
            },
            { t: "h", text: "How to read the map" },
            {
                t: "list",
                items: [
                    "Top right: use now, with sensible checks.",
                    "Middle: prepare next with small, low-cost pilots.",
                    "Lower left: watch from a distance and revisit in a few months.",
                ],
            },
            { t: "quote", text: "Not acting yet is a legitimate decision." },
            {
                t: "p",
                text: "Review the map every quarter and move items as the evidence changes. Your own placements will differ from ours, and that is the point.",
            },
        ],
    },
    {
        slug: "three-shifts-to-watch-agents-payments-and-shared-data",
        category: "future",
        type: "opinion",
        title: "Three shifts to watch: agents, payments and shared data",
        excerpt: "Forecasts age badly. Shifts are easier to spot than dates.",
        minutes: 6,
        photo: {
            src: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
            alt: "Server infrastructure representing shared digital data systems",
        },
        takeaways: [
            "Watch for AI that completes several steps, not just one.",
            "Digital payments and shared records are developing at different speeds.",
            "Our placements are judgement, not measurement.",
        ],
        body: [
            { t: "p", text: "Forecasts age badly. Shifts are easier to spot than dates, so we watch for direction and leave the calendar alone." },
            { t: "h", text: "Shift one: from assistants to agents" },
            {
                t: "p",
                text: "Today most AI tools answer one request at a time. The shift is towards systems that carry out several linked steps on their own. The promise is real. So is the need for clear limits on what they may do without asking.",
            },
            { t: "h", text: "Shift two: money that moves digitally" },
            {
                t: "p",
                text: "Digital payment methods and faster settlement are changing how businesses pay and get paid, especially across borders. Rules differ by country, so this is an area to follow closely and enter carefully.",
            },
            { t: "h", text: "Shift three: data that is shared, not copied" },
            {
                t: "p",
                text: "Where several organisations depend on the same records, shared systems can replace endless copies and reconciliations. Adoption will vary widely by industry.",
            },
            {
                t: "chart",
                spec: {
                    kind: "curve",
                    title: "Where each shift sits on the adoption curve today",
                    xLabel: "Time",
                    yLabel: "Adoption",
                    note: "Our judgement, not a measurement. The positions will move.",
                    summary:
                        "S-shaped adoption curve. Shared digital records sit early on the curve, AI agents sit in the middle of the steep section, and AI drafting tools sit near the mature top.",
                    marks: [
                        { label: "Shared digital records", at: 0.18 },
                        { label: "AI agents", at: 0.45 },
                        { label: "AI drafting tools", at: 0.78 },
                    ],
                },
            },
            {
                t: "callout",
                label: "Read this as opinion",
                text: "The positions on the chart are our judgement. Treat them as a starting point for your own thinking.",
            },
        ],
    },
];