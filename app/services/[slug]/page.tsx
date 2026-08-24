import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import "@/components/services.css";
import "@/components/service-detail.css";

const CATEGORY_MAP: Record<string, string> = {
    "global trade": "trade",
    "web3": "web3",
    "venture building": "web3",
    "artificial intelligence": "ai",
    "analytics": "ai",
    "marketing": "marketing",
    "advertising": "marketing",
    "consulting": "trade",
    "events": "web3",
};

function getCategory(badge: string) {
    const key = badge.toLowerCase();
    const match = Object.keys(CATEGORY_MAP).find((k) => key.includes(k));
    return match ? CATEGORY_MAP[match] : "default";
}

export function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return {};
    return {
        title: `${service.title} | BH Ventures FZE LLC`,
        description: service.desc,
    };
}

export default async function ServiceDetailPage({ params }: { params: ParamsPromise }) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) notFound();

    const category = getCategory(service.badge);
    const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

    return (
        <main className="service-detail-page" data-category={category}>
            <ServiceDetailHero
                image={service.image}
                video={service.video}
                title={service.title}
                sub={service.sub}
                badge={service.badge}
                category={category}
            />

            <div className="service-detail-inner">
                <Link href="/services" className="service-detail-back">
                    ← Back to services
                </Link>

                <section className="service-detail-overview">
                    <span className="service-detail-eyebrow">Overview</span>
                    <p className="service-detail-desc">{service.desc}</p>
                </section>

                <section className="service-detail-included">
                    <h2 className="service-detail-heading">What&apos;s included</h2>
                    <ul className="service-detail-included-list">
                        {service.whatsIncluded.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="service-detail-process">
                    <h2 className="service-detail-heading">How it works</h2>
                    <ol className="service-detail-process-list">
                        {service.process.map((step, i) => (
                            <li key={step.title}>
                                <span className="service-detail-process-num">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="service-detail-highlights">
                    {service.highlights.map((h, i) => (
                        <div key={`${h.label}-${i}`} className="service-detail-highlight-card">
                            <span className="service-detail-highlight-value">{h.value}</span>
                            <span className="service-detail-highlight-label">{h.label}</span>
                        </div>
                    ))}
                </section>

                <section className="service-detail-cta">
                    <h2>Ready to talk {service.title.toLowerCase()}?</h2>
                    <Link href="/#contact" className="service-detail-cta-btn">
                        Get in touch
                    </Link>
                </section>

                <section className="service-detail-related">
                    <h2 className="service-detail-heading">Related services</h2>
                    <div className="service-detail-related-grid">
                        {related.map((r) => (
                            <Link key={r.slug} href={`/services/${r.slug}`} className="service-detail-related-card">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={r.image} alt={r.title} />
                                <span>{r.title}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}