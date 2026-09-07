"use client";

import React, { CSSProperties } from "react";
import {
    Calendar,
    FileCheck2,
    MessagesSquare,
    BarChart3,
    Compass,
    type LucideIcon,
} from "lucide-react";
import "./social-media.css";

/* ---------- CUSTOM BRAND ICONS ----------
   lucide-react no longer ships brand/logo icons (Instagram, Facebook,
   LinkedIn, YouTube, Twitter/X were removed over trademark concerns),
   so all six platform marks below are small hand-rolled SVGs on the
   same 24x24 / currentColor convention as lucide's generic icons. */

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M13.5 21v-8h2.7l.4-3H13.5V8c0-.87.24-1.46 1.49-1.46H16.7V3.9c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.62 1.31-3.62 3.72V10H8.3v3h2.6v8h2.6Z" />
        </svg>
    );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4V9Z" />
        </svg>
    );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8Z"
                stroke="currentColor"
                strokeWidth={1.6}
            />
            <path d="M10 15.2V8.8L15.5 12 10 15.2Z" fill="currentColor" />
        </svg>
    );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M16.6 5.82a4.9 4.9 0 0 1-1.02-1.36 4.86 4.86 0 0 1-.44-1.96h-3.02v13.36a2.9 2.9 0 1 1-2.06-2.78V10.9a5.94 5.94 0 1 0 5.08 5.88V9.4a7.9 7.9 0 0 0 4.56 1.46V7.84a4.85 4.85 0 0 1-3.1-2.02Z" />
        </svg>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M13.6 10.6 20.8 3h-1.7l-6.2 6.6L7.9 3H3l7.5 10.2L3 21h1.7l6.6-7 5.3 7H21l-7.4-10.4Zm-2.3 2.5-.8-1.1L4.9 4.2h2.6l4.9 6.7.8 1.1 6.4 8.7h-2.6l-5.2-7.1Z" />
        </svg>
    );
}

/* ---------- DATA ---------- */

const COLOR_RGB: Record<string, string> = {
    teal: "45, 212, 191",
    amber: "245, 166, 35",
    purple: "139, 92, 246",
    pink: "236, 72, 153",
    blue: "14, 165, 233",
    indigo: "99, 102, 241",
    red: "239, 68, 68",
};

// Covers both hand-rolled SVG functions and Lucide ForwardRef icons
type IconComponent = ((props: React.SVGProps<SVGSVGElement>) => React.ReactElement) | LucideIcon;

const platforms: {
    name: string;
    color: string;
    note: string;
    icon: IconComponent;
    image?: string;
}[] = [
        { name: "Instagram", color: "pink", note: "Reels, carousels, stories", icon: InstagramIcon, image: "/images/platforms/instagram.png" },
        { name: "TikTok", color: "teal", note: "Short-form video", icon: TikTokIcon, image: "/images/platforms/tiktok.png" },
        { name: "LinkedIn", color: "blue", note: "Thought leadership, B2B", icon: LinkedinIcon, image: "/images/platforms/linkedin.png" },
        { name: "Facebook", color: "indigo", note: "Community, groups, ads", icon: FacebookIcon, image: "/images/platforms/facebook.png" },
        { name: "X (Twitter)", color: "amber", note: "Real-time, conversation", icon: XIcon, image: "/images/platforms/x_twitter.png" },
        { name: "YouTube Shorts", color: "red", note: "Vertical video, discovery", icon: YoutubeIcon, image: "/images/platforms/youtube_shorts.png" },
    ];

const trackedMetrics = [
    {
        color: "teal",
        label: "ENGAGEMENT",
        name: "Engagement rate",
        desc: "Likes, comments, and shares relative to reach — not just raw counts.",
    },
    {
        color: "amber",
        label: "GROWTH",
        name: "Follower growth",
        desc: "Net growth by platform, tracked month over month.",
    },
    {
        color: "purple",
        label: "VISIBILITY",
        name: "Reach & impressions",
        desc: "How far content is actually traveling beyond your existing audience.",
    },
    {
        color: "pink",
        label: "CONTENT",
        name: "Performance by pillar",
        desc: "Which content themes and formats are actually working, and which aren't.",
    },
    {
        color: "teal",
        label: "COMMUNITY",
        name: "Response time",
        desc: "How quickly comments and DMs get a reply — a real trust signal.",
    },
    {
        color: "amber",
        label: "CONVERSION",
        name: "Social-to-site conversion",
        desc: "Clicks and leads driven from social back to your site or store.",
    },
];

const PLATFORM_ICONS: Record<string, IconComponent> = {
    Instagram: InstagramIcon,
    TikTok: TikTokIcon,
    LinkedIn: LinkedinIcon,
    Facebook: FacebookIcon,
    "X (Twitter)": XIcon,
    "YouTube Shorts": YoutubeIcon,
};

const weekDays = [
    {
        day: "MON",
        date: "3",
        posts: [{ platform: "Instagram", type: "Reel", time: "10:00 AM", color: "pink" }],
    },
    {
        day: "TUE",
        date: "4",
        posts: [{ platform: "LinkedIn", type: "Article", time: "9:00 AM", color: "blue" }],
    },
    {
        day: "WED",
        date: "5",
        posts: [
            { platform: "TikTok", type: "Short video", time: "6:00 PM", color: "teal" },
            { platform: "Facebook", type: "Post", time: "1:00 PM", color: "indigo" },
        ],
    },
    {
        day: "THU",
        date: "6",
        posts: [{ platform: "X (Twitter)", type: "Thread", time: "11:00 AM", color: "amber" }],
    },
    {
        day: "FRI",
        date: "7",
        posts: [{ platform: "Instagram", type: "Carousel", time: "12:00 PM", color: "pink" }],
    },
    {
        day: "SAT",
        date: "8",
        posts: [{ platform: "YouTube Shorts", type: "Short", time: "5:00 PM", color: "red" }],
    },
    { day: "SUN", date: "9", posts: [] },
];

const deliverables: {
    name: string;
    cadence: string;
    color: string;
    icon: IconComponent;
    /** Drop your own photo/illustration path here, e.g. "/images/deliverables/calendar.jpg".
     *  Leave undefined and the card falls back to a large tinted icon watermark. */
    image?: string;
}[] = [
        { name: "Content calendar access", cadence: "Monthly", color: "teal", icon: Calendar, image: "/images/platforms/content_calendar.png" },
        { name: "Draft review before publishing", cadence: "Weekly", color: "amber", icon: FileCheck2, image: "/images/platforms/draft_review.png" },
        { name: "Community management coverage", cadence: "Daily", color: "purple", icon: MessagesSquare, image: "/images/platforms/community_management.png" },
        { name: "Performance report", cadence: "Monthly", color: "pink", icon: BarChart3, image: "/images/platforms/performance_report.png" },
        { name: "Strategy check-in", cadence: "Quarterly", color: "blue", icon: Compass, image: "/images/platforms/strategy_checkin.png" },
    ];

/* ---------- SECTIONS ---------- */

export function PlatformsWeManage() {
    return (
        <section className="sm-section">
            <h2 className="sm-heading">Platforms we manage</h2>
            <div className="sm-platform-grid">
                {platforms.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <div
                            className="sm-platform-card"
                            key={p.name}
                            style={
                                {
                                    animationDelay: `${i * 60}ms`,
                                    "--m-rgb": COLOR_RGB[p.color],
                                } as CSSProperties
                            }
                        >
                            {p.image ? (
                                <>
                                    <div
                                        className="sm-platform-bg-blur"
                                        style={{ backgroundImage: `url(${p.image})` }}
                                    />
                                    <div className="sm-platform-fg-wrap">
                                        <img className="sm-platform-fg" src={p.image} alt="" />
                                    </div>
                                </>
                            ) : (
                                <div className="sm-platform-fallback">
                                    <Icon className="sm-platform-fallback-icon" />
                                </div>
                            )}
                            <div className="sm-platform-overlay" />
                            <div className="sm-platform-content">
                                <div className="sm-platform-name">{p.name}</div>
                                <p className="sm-platform-note">{p.note}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export function WhatWeTrack() {
    return (
        <section className="sm-section">
            <h2 className="sm-heading">What we track</h2>
            <div className="sm-track-grid">
                {trackedMetrics.map((m, i) => (
                    <div
                        className="sm-track-card"
                        key={m.name}
                        style={
                            {
                                animationDelay: `${i * 80}ms`,
                                "--m-rgb": COLOR_RGB[m.color],
                            } as CSSProperties
                        }
                    >
                        <div className="sm-track-icon-wrap">
                            <span className="sm-track-ring" />
                            <span className={`sm-track-icon sm-chip-${m.color}`}>✓</span>
                        </div>
                        <div className="sm-track-body">
                            <div className="sm-track-label">{m.label}</div>
                            <div className="sm-track-name">{m.name}</div>
                            <p className="sm-track-desc">{m.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function SampleContentCalendar() {
    return (
        <section className="sm-section">
            <h2 className="sm-heading">Sample content calendar</h2>
            <div className="sm-calendar">
                <div className="sm-calendar-top">
                    <span className="sm-calendar-title">THIS WEEK — ALL PLATFORMS</span>
                    <span className="sm-calendar-range">WEEK OF NOV 3</span>
                </div>
                <div className="sm-calendar-grid">
                    {weekDays.map((d, i) => (
                        <div
                            className={`sm-calendar-day${d.posts.length ? " has-posts" : ""}`}
                            key={d.day}
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div className="sm-calendar-day-head">
                                <span className="sm-calendar-day-name">{d.day}</span>
                                <span className="sm-calendar-day-date">{d.date}</span>
                            </div>
                            <div className="sm-calendar-posts">
                                {d.posts.length === 0 ? (
                                    <span className="sm-calendar-empty">—</span>
                                ) : (
                                    d.posts.map((p, j) => {
                                        const Icon = PLATFORM_ICONS[p.platform];
                                        return (
                                            <div
                                                className={`sm-post-chip sm-edge-${p.color}`}
                                                key={j}
                                            >
                                                <span
                                                    className={`sm-post-chip-icon sm-stub-${p.color}`}
                                                >
                                                    {Icon ? <Icon width={11} height={11} /> : null}
                                                </span>
                                                <span className="sm-post-chip-text">
                                                    <span className="sm-post-type">{p.type}</span>
                                                    <span className="sm-post-meta">
                                                        {p.platform} · {p.time}
                                                    </span>
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="sm-calendar-caption">
                Illustrative view — every calendar is built around your actual
                platforms, posting cadence, and campaign schedule.
            </p>
        </section>
    );
}

export function WhatYouReceive() {
    return (
        <section className="sm-section">
            <h2 className="sm-heading">What you receive</h2>
            <div className="sm-ticket-grid">
                {deliverables.map((d, i) => {
                    const Icon = d.icon;
                    return (
                        <div
                            className="sm-ticket"
                            key={d.name}
                            style={
                                {
                                    animationDelay: `${i * 70}ms`,
                                    "--m-rgb": COLOR_RGB[d.color],
                                } as CSSProperties
                            }
                        >
                            {d.image ? (
                                <>
                                    <div
                                        className="sm-ticket-bg-blur"
                                        style={{ backgroundImage: `url(${d.image})` }}
                                    />
                                    <div className="sm-ticket-fg-wrap">
                                        <img className="sm-ticket-fg" src={d.image} alt="" />
                                    </div>
                                </>
                            ) : (
                                <div className="sm-ticket-fallback">
                                    <Icon className="sm-ticket-fallback-icon" />
                                </div>
                            )}
                            <div className="sm-ticket-overlay" />
                            <span className={`sm-ticket-pill sm-chip-${d.color}`}>
                                {d.cadence}
                            </span>
                            <div className="sm-ticket-content">
                                <span className="sm-ticket-eyebrow">Included</span>
                                <span className="sm-ticket-name">{d.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ---------- OPTIONAL: combined wrapper ---------- */

export default function SocialMediaExtras() {
    return (
        <>
            <PlatformsWeManage />
            <WhatWeTrack />
            <SampleContentCalendar />
            <WhatYouReceive />
        </>
    );
}