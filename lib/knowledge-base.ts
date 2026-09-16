import { SERVICES } from "@/data/services";
import { careerJobs } from "@/components/careers/careersJobsData";
import { directChannels, quickLinks } from "@/components/contact/contactData";

export type KnowledgeChunk = { id: string; title: string; text: string };

// ---------- HOME ----------
function buildHomeChunks(): KnowledgeChunk[] {
    return [
        {
            id: "page:home",
            title: "Home / About BH Ventures",
            text: `BH Ventures FZE LLC is a licensed free-zone company based in Dubai, UAE,
specializing in Web3 Studio, Artificial Intelligence, Digital Analytics, Marketing,
and International Trading. Tagline: "Building the Future of Ventures" — bridging
technology and innovation from the UAE.`,
        },
        {
            id: "home:global-growth",
            title: "Global Growth Pillars (Homepage)",
            text: `Strategic Market Expansion: Identifying high-potential markets and creating
opportunities for sustainable international growth.

Diversified Business Ventures: Building and supporting ventures across trading,
technology, digital solutions, and emerging industries.

Technology-Driven Innovation: Leveraging AI, Web3, analytics, and modern digital
infrastructure to create smarter business solutions.`,
        },
        {
            id: "home:our-capabilities",
            title: "Our Capabilities (Homepage)",
            text: `International Trading: Global trading and market access across strategically
selected international markets.

Strategic Ventures: Identifying, developing, and supporting high-potential business
opportunities.

AI & Web3 Solutions: Technology-driven solutions across artificial intelligence, Web3,
and emerging digital ecosystems.`,
        },
    ];
}

// ---------- ABOUT ----------
function buildAboutChunks(): KnowledgeChunk[] {
    return [
        {
            id: "about:hero",
            title: "About Us — Overview",
            text: `BH Ventures FZE LLC is a UAE free-zone company based in Dubai. Our story:
"Where Trade Meets Technology." We bridge traditional international trade with modern
technology, AI, and digital innovation under one founder-led platform.`,
        },
        {
            id: "about:mission-vision",
            title: "Mission & Vision",
            text: `Vision: To become a trusted multi-sector ventures company — one that bridges
traditional trade with cutting-edge technology and creates value through innovation and
execution.

Mission: Identify opportunity. Build capability. Create value. We identify high-potential
opportunities in technology and trade, build professional capabilities, and create lasting
value for clients, partners, and stakeholders through integrity, innovation, and execution
excellence.`,
        },
        {
            id: "about:values",
            title: "Company Values",
            text: `Our core values:
- Integrity: Doing what's right, every time.
- Innovation: Seeking better ways to build and operate.
- Ownership: Taking direct accountability for outcomes.
- Client Focus: Decisions made around real client needs.
- Accuracy: Precision in detail, not just direction.
- Compliance: Operating within clear regulatory standards.`,
        },
        {
            id: "about:facts",
            title: "Key Facts About BH Ventures",
            text: `- UAE Based: Operating from the United Arab Emirates.
- Dubai: Registered as a UAE free-zone entity.
- Licensed Activities: 10 licensed activities across trade, technology, and business services.
- Multi-Sector Platform: Connecting multiple disciplines under one venture platform.
- Founder-Led: Direct leadership and accountability.
- Trade + Technology: Bridging traditional commerce with modern technology.`,
        },
        {
            id: "about:capabilities",
            title: "Our Capabilities",
            text: `International Trade: Cross-border trade & market access, strategically selected
international markets, import/export & distribution, UAE free-zone trade platform.

Technology & Data: Web3, AI & modern digital infrastructure applied to real business
problems, structured data & insight, smarter and faster decision-making.

Marketing & Business Development: Positioning & growth strategy, partnerships & pipeline
development, curated events & gatherings, visibility and reach for ventures.

Innovation & Strategic Ventures: Testing new operating models, combining disciplines
others keep separate, one multi-sector venture platform, founder-led execution.`,
        },
        {
            id: "about:global-reach",
            title: "Global Reach",
            text: `Global Reach: Operating from the UAE with direct reach into international markets
across multiple regions.

Strategic Partnerships: Trusted partnerships that extend the platform's reach beyond
direct operations.

Market Expansion: Pursuing new markets and business lines as trade and technology create
fresh opportunity.

Multi-Sector Flexibility: One licensed platform, structured to move across disciplines
rather than staying fixed to one.`,
        },
        {
            id: "about:story",
            title: "Our Story / Company Journey",
            text: `Foundation: BH Ventures FZE LLC is registered as a UAE free-zone entity on a simple
thesis — trade and technology belong on one platform, not two.

Trade: Cross-border trade gives the platform market access and distribution reach across
strategically selected regions.

Technology: Web3, AI, and modern digital infrastructure are applied to real operating
ventures — tools to move faster and decide smarter.

Innovation: Data, marketing, business development, and events combine with trade and
technology inside one coherent venture platform.

Global Opportunity: A licensed portfolio of ten business activities operates under a
single founder-led platform, built for what comes next.`,
        },
        {
            id: "about:founder",
            title: "Founder & CEO",
            text: `Badar Ul Haq is the Founder & Chief Executive Officer of BH Ventures. BH Ventures is
a founder-led company — every venture carries direct accountability back to a single point
of leadership, rather than being spread across layers of process. That leadership is built
around professional standards and a long-term view, bringing traditional trade and modern
technology together under one disciplined, execution-focused platform. Known for:
Founder-Led leadership, Direct Accountability, and Long-Term Vision.`,
        },
        {
            id: "about:cta-contact",
            title: "About Page — Contact & Global Presence",
            text: `BH Ventures has one corporate base in the UAE, with clear channels for people who
want to work with them. Call to action: "Building Opportunities. Creating Value." — explore
the services and ventures BH Ventures is building across trade, technology, and innovation.`,
        },
    ];
}

// ---------- SERVICES ----------
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

// ---------- SERVICE DETAIL PAGES (deeper content per service) ----------
function buildServiceDetailChunks(): KnowledgeChunk[] {
    return [
        {
            id: "service-detail:web3",
            title: "Web3 Venture Studio — Details",
            text: `Web3 Venture Studio is a licensed activity of BH Ventures FZE LLC. We help founders
and innovation teams take Web3 concepts from early ideation through ecosystem research,
product strategy, and partner coordination — structured, research-driven venture building,
not hype. That includes concept validation and ecosystem research, product and tokenomics
strategy, partner and ecosystem coordination, and launch planning support — hands-on help
at every stage, from first idea to market.

Focus areas: Blockchain, Decentralised Technology, Digital Assets, Infrastructure.

Process: Discover (look at the Web3 space to identify opportunities worth building around)
→ Validate (pressure-test the market, need, and technical direction before committing
resources) → Build (assemble specialised talent and develop the product/protocol,
working alongside the venture) → Launch (guide the venture through early stages with
support and resources under one roof) → Scale (stay involved as the venture grows).

We meet founders wherever they are: Idea Stage, MVP / Early Build, or Scaling.`,
        },
        {
            id: "service-detail:surveying",
            title: "Surveying & Market Research — Details",
            text: `What we evaluate: Customer satisfaction, market demand, product & service feedback,
brand perception, competitor positioning, customer preferences, business opportunities,
event & campaign feedback.

Research types:
- Customer Surveys (CX): Understand customer needs, preferences, satisfaction, and expectations.
- Market Research (MKT): Explore market conditions, demand, trends, and competitive positioning.
- Business Evaluations (BIZ): Assess business ideas, services, initiatives, or commercial opportunities.
- Feedback Studies (FDBK): Collect structured feedback to identify strengths, weaknesses, and improvement areas.

Our approach: Define the Question → Choose the Method → Reach Relevant Respondents →
Interpret the Findings.

What you receive: Survey methodology, questionnaire design, data collection framework,
response analysis, key findings, charts & visual summaries, limitations & considerations,
actionable recommendations.

What the research can help you decide: Customer Understanding, Market Insights, Idea
Validation, Improvement Opportunities, Evidence-Based Decisions.`,
        },
        {
            id: "service-detail:exhibition",
            title: "Exhibition & Event Management — Details",
            text: `Event types we manage: Trade exhibitions, business & corporate events, product
showcases, industry exhibitions, brand activations, networking events, B2B exhibitions,
public exhibitions.

What we manage: Venue & Layout (spaces, floor plans, booth placement, venue requirements),
Exhibitors (information, requirements, schedules, communication), Logistics (setup,
equipment, materials, deliveries), Attendee Experience (registration, information points,
navigation, visitor flow), On-Site Operations (event-day coordination), Post-Event Review
(attendance, feedback, outcomes, lessons for future events).

Event experience phases: Before the Event (planning, communication, scheduling,
preparation), During the Event (coordination, attendee support, on-site management),
After the Event (feedback collection, performance review, reporting).

Exhibitor support: Exhibitor onboarding, booth allocation, exhibitor guidelines, setup
schedules, requirement coordination, exhibitor communication, on-site support.

Event planning checklist covers: Venue, Layout, Exhibitors, Logistics, Registration,
Operations, Reporting.`,
        },
        {
            id: "service-detail:digital-analytics",
            title: "Digital Analytics — Details",
            text: `What we measure: CAC by channel (Acquisition), ROAS & blended ROI (Return),
Customer LTV (Value), Funnel conversion rate (Conversion), Channel & spend mix (Mix),
Repeat purchase rate (Retention).

Questions we help answer: what it costs to win a customer by source, return on ad spend
per channel plus the blended figure, lifetime value by cohort, where prospects drop off in
the funnel, how budget is split versus where it earns its keep, and how well you're
retaining existing customers.

What you receive: Live dashboard access (real-time revenue, spend, and conversion data),
a written performance report (plain-language summary of what moved and why), an
attribution & spend review, a direct line for questions (no ticket queue), and a quarterly
strategy check-in.

Note: sample dashboard figures shown on the website are illustrative only — every real
dashboard is rebuilt around the client's own KPIs, channels, and reporting cadence.`,
        },
        {
            id: "service-detail:ai-innovation",
            title: "AI Innovation & Opportunity Assessment — Details",
            text: `Where AI tends to pay off: Customer Experience (AI-powered chat, personalization,
support, engagement), Operations (repetitive processes suited to AI/automation), Data &
Analytics (predictive analytics, intelligent reporting, decision support), Product
Innovation (AI features for existing or future products), Internal Productivity (reducing
repetitive team work), Automation (workflows where AI improves efficiency).

Where you are in your AI journey: Explore (have an idea but unsure where AI fits),
Validate (have use-cases and want to test feasibility), Prioritize (multiple opportunities,
need to know what comes first), Plan (know what to build, need a practical roadmap).

What you get: AI opportunity report, prioritized use-case list, feasibility assessment,
technology recommendations, implementation roadmap, risk & limitation overview, estimated
effort and complexity per use-case, and next-step recommendations for each opportunity.`,
        },
        {
            id: "service-detail:marketing",
            title: "Marketing — Details",
            text: `What we focus on: Research & Insights (understand market, competitors, customers,
opportunities), Campaign Management (plan and coordinate campaigns across channels), Brand
& Positioning (develop clear marketing direction), Content & Communication (align
messaging with audience and goals), Digital Presence (websites, social platforms, digital
channels), Performance & Optimization (review results, identify improvements).

Marketing objectives: Market Understanding, Strategic Direction, Consistent Execution,
Continuous Improvement, Build Brand Awareness, Reach the Right Audience, Generate
Opportunities, Improve Engagement.

What you get: Marketing strategy, market & competitor insights, campaign plans, channel
recommendations, content direction, performance reports, optimization recommendations.

Performance tracking covers: Reach, Engagement, Traffic, Leads, Conversions. Marketing
isn't just about launching campaigns — it's about consistent, measured execution.`,
        },
        {
            id: "service-detail:social-media",
            title: "Social Media Management — Details",
            text: `Platforms we manage: Instagram, TikTok, LinkedIn, Facebook, X (Twitter), YouTube
Shorts.

What we track: Engagement rate (likes/comments/shares relative to reach), Follower growth
(net growth by platform, month over month), Reach & impressions, Performance by content
pillar (which themes/formats work), Response time (comment/DM reply speed as a trust
signal), Social-to-site conversion (clicks and leads driven back to your site/store).

Content formats used: Reel, Article, Short video, Post, Thread, Carousel, Short.

What you receive: Content calendar access, draft review before publishing, community
management coverage, performance reports, and a strategy check-in. Sample content
calendars shown are illustrative — every real calendar is built around the client's actual
platforms, posting cadence, and campaign schedule.`,
        },
        {
            id: "service-detail:automobiles",
            title: "International Trading — Automobiles — Details",
            text: `Supported brands (17+): Toyota, Nissan, Lexus, Mazda, Ford, MG, BYD, BMW,
Mercedes-Benz, Range Rover, Jetour, Ferrari, Lamborghini, Hyundai, Porsche, Tesla, Dodge,
Land Rover.

Vehicle categories: Sedans (executive and family, volume and premium segments), SUVs
(compact, mid-size, full-size), Luxury Vehicles (prestige marques), Performance Vehicles
(sports cars and high-performance variants), Electric Vehicles (battery-electric and
plug-in hybrid, established and new-energy brands), Commercial / Fleet Vehicles (vans,
pickups, fleet models), Premium Pre-Owned (carefully selected, where available).

Key stats: 17+ brands supported, global export network, typical response time 5 minutes.

Pricing: Price on Request — Dealer Confirmation Required. Final pricing depends on vehicle
model, year, trim and configuration, current dealer stock, export destination, and
shipping/documentation costs. A formal quotation is issued only after the sales team has
received and documented dealer confirmation. Note: Brand logos, trademarks, and vehicle
imagery remain the property of their respective owners — BH Ventures is not an authorised
dealer of any brand unless separately verified.`,
        },
        {
            id: "service-detail:advertising",
            title: "Advertising — Details",
            text: `Campaign channels: Social media advertising, search advertising, display & digital
advertising, content promotion, retargeting campaigns, local & targeted campaigns.

What we focus on: Right audience (identify and reach relevant audiences), Clear messaging
(align creative with brand and campaign goals), Channel selection (choose channels based on
audience/objectives), Performance (track results, identify improvements).

Campaign objectives: Build Awareness, Drive Traffic, Generate Leads, Promote Products,
Measure Performance, Retain Customers.

Performance metrics tracked: Reach, Engagement, Traffic, Leads, Conversions.`,
        },
        {
            id: "service-detail:dates",
            title: "International Trading — Dates (Wholesale) — Details",
            text: `Date varieties available: Medjool, Ajwa, Mabroom, Sukkari, Rabi, Mazafati, Kalute,
Deglet Noor, Safawi.

Process: Share your requirement (variety, grade, quantity, destination country) and the
sales team confirms variety, grade, and pricing directly with the supplier. Pricing varies
by variety, grade, season, and order volume — contact us for a current wholesale quote.

All dates are sourced, graded, and packed to destination-market food-safety standards.
Final pricing and availability are confirmed at the time of quote.`,
        },
    ];
}

// ---------- VENTURES ----------
// NOT FOUND in components.zip — no Ventures data/components were included.
// Add real content here once you share the Ventures page source.
function buildVenturesChunks(): KnowledgeChunk[] {
    return [];
}

// ---------- PORTFOLIO ----------
// NOT FOUND in components.zip — no Portfolio data/components were included.
function buildPortfolioChunks(): KnowledgeChunk[] {
    return [];
}

// ---------- INSIGHTS ----------
// NOT FOUND in components.zip — no Insights/blog data/components were included.
function buildInsightsChunks(): KnowledgeChunk[] {
    return [];
}

// ---------- CAREERS ----------
function buildCareersValuesChunks(): KnowledgeChunk[] {
    return [
        {
            id: "careers:values",
            title: "What We Value in Our Team (Careers Page)",
            text: `Innovation: We test new operating models and combine disciplines others keep
separate, rather than defending one fixed way of working.

Integrity: Decisions and commitments hold up under scrutiny — with partners, with
clients, and with each other.

Sustainability: We build for the long term — ventures designed to hold up over time,
not just perform in the short run.`,
        },
    ];
}

function buildCareerChunks(): KnowledgeChunk[] {
    if (careerJobs.length === 0) {
        return [
            {
                id: "careers:none",
                title: "Careers",
                text: "There are currently no open positions listed on the careers page. Interested candidates can reach out via the contact page or email to express interest for future roles.",
            },
            ...buildCareersValuesChunks(),
        ];
    }
    return [
        ...careerJobs.map((j) => ({
            id: `career:${j.id}`,
            title: j.title,
            text: [
                `Job: ${j.title} (${j.department}, ${j.employmentType}, ${j.location})`,
                j.aboutRole,
                `Requirements: ${j.requirements.join("; ")}`,
            ].join("\n"),
        })),
        ...buildCareersValuesChunks(),
    ];
}

// ---------- CONTACT ----------
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

// ---------- COMBINE ALL PAGES ----------
export function buildKnowledgeBase(): KnowledgeChunk[] {
    return [
        ...buildHomeChunks(),
        ...buildAboutChunks(),
        ...buildServiceChunks(),
        ...buildServiceDetailChunks(),
        ...buildVenturesChunks(),
        ...buildPortfolioChunks(),
        ...buildInsightsChunks(),
        ...buildCareerChunks(),
        ...buildContactChunks(),
    ];
}