"use client";

import "../Services/services.css";

export default function ServicesHero() {
  return (
    <section className="services-hero-section">
      {/* Background video */}
      <div className="services-hero-video-wrap" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="services-hero-video"
        >
          {/* replace with your own video filename, placed in /public/videos/ */}
          <source
            src="/videos/Generating_animated_corporate_vi_202608210655_202608210856.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="services-hero-overlay-tint" />
        <div className="services-hero-overlay-gradient" />
      </div>

      {/* content */}
      <div className="services-hero-content">
        <div className="services-hero-scrim">
          <span className="services-hero-eyebrow">
            <span className="services-hero-eyebrow-line" />
            Our Range
            <span className="services-hero-eyebrow-line services-hero-eyebrow-line--reverse" />
          </span>
          <h1 className="services-hero-title">
            <span className="hero-word">Ten</span>{" "}
            <span className="hero-word">disciplines.</span>
            <em className="services-hero-title-accent">
              <span className="hero-word">One</span>{" "}
              <span className="hero-word">standard.</span>
            </em>
          </h1>
          <p className="services-hero-subtitle">
            From global trade to Web3 Studio and AI, every service runs on the same
            precision. See how it comes together.
          </p>
        </div>
      </div>

      {/* soft fade at the bottom so it blends into the page background below */}
      <div className="services-hero-bottom-fade" />
    </section>
  );
}