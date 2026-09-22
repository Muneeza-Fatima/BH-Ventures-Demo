const projects = [
{
number: "01",
category: "Technology & AI",
title: "Intelligence, built for what's next.",
description:
"Exploring intelligent technologies that help businesses turn complex information into meaningful opportunities.",
status: "ACTIVE",
statusType: "active",
tags: ["AI", "Technology", "Innovation"],
image:
"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
},
{
number: "02",
category: "Trade & Commerce",
title: "Connecting markets without borders.",
description:
"Building technology-enabled approaches to modern trade, commerce, and international business.",
status: "IN DEVELOPMENT",
statusType: "development",
tags: ["Trade", "Commerce", "Global"],
image:
"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=85",
},
{
number: "03",
category: "Digital Infrastructure",
title: "Infrastructure for a digital future.",
description:
"Developing scalable digital foundations designed to support the businesses and platforms of tomorrow.",
status: "EXPLORING",
statusType: "exploring",
tags: ["Digital", "Infrastructure", "Technology"],
image:
"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
},
{
number: "04",
category: "Mobility",
title: "Rethinking how the world moves.",
description:
"Exploring opportunities where mobility, technology, and smarter infrastructure come together.",
status: "EXPLORING",
statusType: "exploring",
tags: ["Mobility", "Future", "Innovation"],
image:
"https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
},
{
number: "05",
category: "Emerging Technology",
title: "Ideas beyond today's boundaries.",
description:
"Investigating emerging technologies and new possibilities that could shape future industries.",
status: "IN DEVELOPMENT",
statusType: "development",
tags: ["Research", "Emerging Tech", "Future"],
image:
"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85",
},
{
number: "06",
category: "Digital Commerce",
title: "Creating better ways to connect.",
description:
"Exploring platforms that bring businesses, customers, and new markets closer together.",
status: "ACTIVE",
statusType: "active",
tags: ["Commerce", "Digital", "Markets"],
image:
"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
},
];

const sectors = [
{
number: "01",
title: "Technology & AI",
text: "Intelligent systems, automation, data, and emerging technologies.",
},
{
number: "02",
title: "Trade & Commerce",
text: "Connecting businesses, markets, and opportunities across borders.",
},
{
number: "03",
title: "Digital Infrastructure",
text: "Building scalable foundations for tomorrow's digital economy.",
},
{
number: "04",
title: "Mobility",
text: "Exploring smarter ways to connect people, places, and systems.",
},
];

export default function PortfolioPage() {
return (
<main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102332]">

{/* =====================================================
PAGE ANIMATIONS
====================================================== */}

<style>{`
.portfolio-reveal {
opacity: 0;
transform: translateY(30px);
animation: portfolioReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.delay-1 {
animation-delay: 0.12s;
}

.delay-2 {
animation-delay: 0.24s;
}

.delay-3 {
animation-delay: 0.36s;
}

.delay-4 {
animation-delay: 0.48s;
}

.delay-5 {
animation-delay: 0.6s;
}

.portfolio-image {
transition:
transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
filter 0.5s ease;
}

.portfolio-project:hover .portfolio-image {
transform: scale(1.05);
filter: brightness(1.05);
}

.portfolio-project {
transition:
transform 0.4s ease,
box-shadow 0.4s ease;
}

.portfolio-project:hover {
transform: translateY(-6px);
box-shadow: 0 25px 60px rgba(10, 30, 45, 0.12);
}

.floating-orb {
animation: floatingOrb 6s ease-in-out infinite;
}

.slow-pulse {
animation: slowPulse 4s ease-in-out infinite;
}

@keyframes portfolioReveal {
from {
opacity: 0;
transform: translateY(30px);
}

to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes floatingOrb {
0%,
100% {
transform: translateY(0);
}

50% {
transform: translateY(-12px);
}
}

@keyframes slowPulse {
0%,
100% {
opacity: 0.45;
}

50% {
opacity: 0.9;
}
}

@media (prefers-reduced-motion: reduce) {
.portfolio-reveal,
.floating-orb,
.slow-pulse {
animation: none;
opacity: 1;
transform: none;
}
}
`}</style>


{/* =====================================================
HERO
====================================================== */}

<section className="relative overflow-hidden bg-[#f7f7f4]">

{/* Decorative background */}

<div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#b8ded7]/30 blur-3xl" />

<div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#d7e9e5]/40 blur-3xl" />


<div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:px-10 sm:pb-28 lg:px-16 lg:pt-24">

<div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

{/* HERO TEXT */}

<div>

<div className="portfolio-reveal flex items-center gap-3">

<span className="h-px w-9 bg-[#4baea4]" />

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b9188]">
Our Portfolio
</p>

</div>


<h1 className="mt-7 text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-[#102332] sm:text-6xl lg:text-7xl">

<span className="portfolio-reveal delay-1 block">
Building ventures
</span>

<span className="portfolio-reveal delay-2 block">
for a{" "}
<span className="text-[#3f9f96]">
global future.
</span>
</span>

</h1>


<p className="portfolio-reveal delay-3 mt-7 max-w-xl text-base leading-7 text-[#64727a] sm:text-lg">
We identify opportunities, develop ideas, and build
ventures across technology, trade, innovation, and
emerging industries.
</p>


<div className="portfolio-reveal delay-4 mt-9 flex flex-wrap gap-4">

<a
href="#portfolio"
className="rounded-full bg-[#102332] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1c3b4f]"
>
Explore Portfolio
</a>

<a
href="#sectors"
className="rounded-full border border-[#b9c8c7] px-7 py-3.5 text-sm font-semibold text-[#102332] transition hover:border-[#4baea4] hover:text-[#3b9188]"
>
Explore Sectors
</a>

</div>

</div>


{/* HERO VISUAL */}

<div className="portfolio-reveal delay-3 relative">

<div className="relative overflow-hidden rounded-[28px]">

<img
src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90"
alt="Dubai skyline representing global ventures"
className="h-[430px] w-full object-cover sm:h-[520px]"
/>

{/* Image overlay */}

<div className="absolute inset-0 bg-gradient-to-tr from-[#102332]/75 via-[#102332]/15 to-transparent" />


{/* Small markup */}

<div className="absolute left-6 top-6 rounded-full border border-white/30 bg-[#102332]/30 px-4 py-2 backdrop-blur-md">

<div className="flex items-center gap-2">

<span className="h-2 w-2 rounded-full bg-[#73c9be]" />

<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
UAE · Dubai
</span>

</div>

</div>


{/* Bottom information */}

<div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">

<p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9ddbd4]">
Global Perspective
</p>

<h2 className="mt-3 max-w-lg text-2xl font-semibold leading-tight text-white sm:text-3xl">
Where technology, capital, and opportunity meet.
</h2>

</div>

</div>

</div>

</div>

</div>

</section>


{/* =====================================================
INTRO
====================================================== */}

<section className="bg-white py-20 sm:py-24">

<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

<div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b9188]">
Our Approach
</p>

</div>


<div>

<h2 className="max-w-4xl text-3xl font-medium leading-tight text-[#102332] sm:text-5xl">
We look beyond individual ideas to identify
opportunities that can become lasting ventures.
</h2>

<p className="mt-7 max-w-2xl text-base leading-7 text-[#66757d]">
Our portfolio brings together projects at different
stages — from established initiatives to concepts
we're actively exploring and developing.
</p>

</div>

</div>

</div>

</section>


{/* =====================================================
SECTORS
====================================================== */}

<section
id="sectors"
className="bg-[#eef3f1] py-20 sm:py-24"
>

<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

<div className="mb-12">

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b9188]">
Where We Operate
</p>

<h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-[#102332] sm:text-5xl">
Exploring the spaces where tomorrow is being built.
</h2>

</div>


<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

{sectors.map((sector) => (

<div
key={sector.number}
className="group rounded-2xl border border-[#d7e1df] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#83c7c0] hover:shadow-xl"
>

<div className="flex items-center justify-between">

<span className="text-xs font-semibold text-[#4baea4]">
{sector.number}
</span>

<span className="text-lg text-[#b4c4c2] transition group-hover:text-[#4baea4]">
↗
</span>

</div>


<h3 className="mt-12 text-xl font-semibold text-[#102332]">
{sector.title}
</h3>

<p className="mt-3 text-sm leading-6 text-[#718087]">
{sector.text}
</p>


<div className="mt-7 border-t border-[#e6ecea] pt-4">

<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4baea4]">
Explore
</span>

</div>

</div>

))}

</div>

</div>

</section>


{/* =====================================================
PORTFOLIO PROJECTS
====================================================== */}

<section
id="portfolio"
className="bg-[#102332] py-20 text-white sm:py-24"
>

<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

{/* Heading */}

<div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">

<div>

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#80cfc6]">
Selected Portfolio
</p>

<h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
What we're
<br />
<span className="text-[#80cfc6]">
working on.
</span>
</h2>

</div>

<p className="max-w-md text-sm leading-7 text-[#a8b7be]">
A selection of ventures and opportunities across
technology, commerce, infrastructure, and emerging
industries.
</p>

</div>


{/* PROJECT GRID */}

<div className="grid gap-6 md:grid-cols-2">

{projects.map((project) => (

<article
key={project.number}
className="portfolio-project overflow-hidden rounded-[26px] border border-white/10 bg-[#162d3c]"
>

{/* PROJECT IMAGE */}

<div className="relative h-64 overflow-hidden">

<img
src={project.image}
alt={project.title}
className="portfolio-image h-full w-full object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-t from-[#102332] via-[#102332]/20 to-transparent" />


{/* Number */}

<span className="absolute left-6 top-6 text-sm font-medium text-white/60">
{project.number}
</span>


{/* Category */}

<span className="absolute right-6 top-6 rounded-full border border-white/20 bg-[#102332]/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
{project.category}
</span>


{/* Image title */}

<h3 className="absolute bottom-6 left-6 right-6 text-2xl font-semibold leading-tight sm:text-3xl">
{project.title}
</h3>

</div>


{/* PROJECT CONTENT */}

<div className="p-6 sm:p-7">

<p className="text-sm leading-7 text-[#aebdc3]">
{project.description}
</p>


{/* TAGS */}

<div className="mt-6 flex flex-wrap gap-2">

{project.tags.map((tag) => (

<span
key={tag}
className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#aebdc3]"
>
{tag}
</span>

))}

</div>


{/* STATUS MARKUP */}

<div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

<div className="flex items-center gap-2">

<span
className={`h-2 w-2 rounded-full ${
project.statusType === "active"
? "bg-[#78cfc5] shadow-[0_0_10px_rgba(120,207,197,0.7)]"
: project.statusType === "development"
? "bg-[#e4bd70] shadow-[0_0_10px_rgba(228,189,112,0.6)]"
: "bg-[#9fb7c0]"
}`}
/>

<span
className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
project.statusType === "active"
? "text-[#78cfc5]"
: project.statusType === "development"
? "text-[#e4bd70]"
: "text-[#b0c0c6]"
}`}
>
{project.status}
</span>

</div>


<a
href="#contact"
className="text-xs font-semibold text-white transition hover:text-[#78cfc5]"
>
Explore →
</a>

</div>

</div>

</article>

))}

</div>

</div>

</section>


{/* =====================================================
FUTURE OPPORTUNITIES
====================================================== */}

<section className="relative overflow-hidden bg-white py-20 sm:py-28">

{/* Technology-style background */}

<div className="pointer-events-none absolute right-[-150px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-[#9ccbc5]/30" />

<div className="pointer-events-none absolute right-[-30px] top-1/2 h-[330px] w-[330px] -translate-y-1/2 rounded-full border border-[#9ccbc5]/30" />

<div className="pointer-events-none absolute right-[90px] top-1/2 h-[170px] w-[170px] -translate-y-1/2 rounded-full border border-[#9ccbc5]/40" />


{/* Small glowing nodes */}

<div className="slow-pulse absolute right-[250px] top-[25%] h-3 w-3 rounded-full bg-[#55afa6]" />

<div className="slow-pulse absolute right-[130px] top-[65%] h-2 w-2 rounded-full bg-[#55afa6]" />


<div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

<div className="max-w-3xl">

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b9188]">
Future Opportunities
</p>

<h2 className="mt-5 text-4xl font-semibold leading-tight text-[#102332] sm:text-6xl">
The next opportunity
<br />
<span className="text-[#3f9f96]">
could start here.
</span>
</h2>

<p className="mt-7 max-w-2xl text-base leading-8 text-[#68767d] sm:text-lg">
We continuously explore new technologies, markets,
partnerships, and ideas that can become the ventures
of tomorrow.
</p>

<a
href="/contact"
className="mt-9 inline-flex rounded-full bg-[#102332] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d3b4d]"
>
Explore Opportunities →
</a>

</div>

</div>

</section>


{/* =====================================================
FINAL CTA
====================================================== */}

<section
id="contact"
className="bg-[#102332] px-6 py-20 text-center text-white sm:py-28"
>

<div className="mx-auto max-w-3xl">

<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#80cfc6]">
Partner With Us
</p>

<h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
Let's build what's next.
</h2>

<p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#aab9bf]">
Whether you're building a company, developing technology,
entering a market, or exploring a partnership, we'd like
to hear from you.
</p>

<a
href="/contact"
className="mt-9 inline-flex rounded-full bg-[#80cfc6] px-8 py-4 text-sm font-semibold text-[#102332] transition hover:bg-[#a1ded7]"
>
Start a Conversation →
</a>

</div>

</section>

</main>
);
}