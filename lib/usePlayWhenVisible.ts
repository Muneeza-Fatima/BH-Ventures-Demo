"use client";

import { useEffect, type RefObject } from "react";

/**
 * Plays a muted background video only while its container is on screen
 * and pauses it as soon as it scrolls away (or the tab is hidden).
 *
 * Phones can hardware-decode only a few videos at once; leaving every
 * autoplay video running after it scrolls past makes the others fall
 * back to slow software decoding, which is what makes videos and
 * scrolling stutter.
 *
 * Videos registered with the same `group` take turns on touch devices:
 * only the one most visible on screen plays, the rest hold their frame.
 * On desktop every visible video in the group plays.
 */

type Member = {
  video: HTMLVideoElement;
  ratio: number;
  el: HTMLElement;
};

const groups = new Map<string, Set<Member>>();

const isTouch = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

function play(video: HTMLVideoElement) {
  if (video.paused) video.play().catch(() => {});
}

function pause(video: HTMLVideoElement) {
  if (!video.paused) video.pause();
}

function syncGroup(name: string) {
  const members = groups.get(name);
  if (!members) return;
  const pageVisible = document.visibilityState === "visible";

  if (!isTouch()) {
    members.forEach((m) => (pageVisible && m.ratio > 0 ? play(m.video) : pause(m.video)));
    return;
  }

  // Touch: pick the single most visible member (closest to the centre on a tie).
  let best: Member | null = null;
  let bestScore = -Infinity;
  const mid = window.innerHeight / 2;
  members.forEach((m) => {
    if (m.ratio <= 0) return;
    const r = m.el.getBoundingClientRect();
    const score = m.ratio * 1000 - Math.abs(r.top + r.height / 2 - mid) / 1000;
    if (score > bestScore) {
      bestScore = score;
      best = m;
    }
  });
  members.forEach((m) => (pageVisible && m === best ? play(m.video) : pause(m.video)));
}

export function usePlayWhenVisible(
  containerRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled = true,
  group?: string
) {
  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!enabled || !el || !vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;

    // Each video without a group is its own group of one.
    const name = group ?? `solo-${Math.random().toString(36).slice(2)}`;
    const member: Member = { video: vid, ratio: 0, el };
    if (!groups.has(name)) groups.set(name, new Set());
    groups.get(name)!.add(member);

    const observer = new IntersectionObserver(
      ([entry]) => {
        member.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
        syncGroup(name);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );

    const onVisibility = () => syncGroup(name);

    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      pause(vid);
      const set = groups.get(name);
      set?.delete(member);
      if (set && set.size === 0) groups.delete(name);
    };
  }, [containerRef, videoRef, enabled, group]);
}
