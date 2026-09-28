"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================================================
   ABOUT VIDEO BACKDROP
   Decorative, muted background video in the Ventures style
   (see components/hero/VentureHero.tsx). Styles live in
   app/about/about.css under `.about-page .about-video-*`.

   - Plays only while on screen (IntersectionObserver).
   - Fades in once the first frame is ready, so the section's
     own background shows through while it loads.
   - Under prefers-reduced-motion it never plays: the poster /
     first frame is shown as a still.
============================================================ */

type AboutVideoBackdropProps = {
  src: string;
  poster?: string;
  /** Final opacity of the video layer (0–1). */
  opacity: number;
  objectPosition?: string;
  /** Optional CSS background that replaces the default tint layer. */
  tint?: string;
  /** Extra classes for the wrapper, e.g. a mask. */
  className?: string;
};

export default function AboutVideoBackdrop({
  src,
  poster,
  opacity,
  objectPosition = "center",
  tint,
  className,
}: AboutVideoBackdropProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The reduced-motion preference is only known on the client, so the
  // <video> is mounted after hydration to keep server and client markup
  // identical (and to never autoplay before we know the preference).
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!mounted || !wrap || !video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(wrap);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [mounted, prefersReducedMotion]);

  // Without autoplay, `#t=0.001` asks the browser to decode and paint the
  // first frame so the still is visible even when there is no poster.
  const videoSrc = prefersReducedMotion ? `${src}#t=0.001` : src;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className ? `about-video-wrap ${className}` : "about-video-wrap"}
    >
      {mounted && (
        <video
          ref={videoRef}
          key={videoSrc}
          className="about-video"
          data-ready={ready ? "true" : undefined}
          style={
            {
              objectPosition,
              "--about-video-opacity": opacity,
            } as CSSProperties
          }
          src={videoSrc}
          poster={poster}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
        />
      )}

      <div
        className="about-video-tint"
        style={tint ? { background: tint } : undefined}
      />
      <div className="about-video-gradient" />
    </div>
  );
}
