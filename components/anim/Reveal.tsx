"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale";

const OFFSETS: Record<Direction, { x?: number[]; y?: number[]; scale?: number[] }> = {
  up: { y: [28, 0] },
  down: { y: [-28, 0] },
  left: { x: [36, 0] },
  right: { x: [-36, 0] },
  scale: { scale: [0.92, 1] },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction the content travels in from. */
  from?: Direction;
  /** Delay before the animation starts, in ms. */
  delay?: number;
  /** When true, direct children animate one-by-one with a stagger. */
  stagger?: boolean;
  /** Per-child stagger gap in ms (only used when `stagger` is true). */
  gap?: number;
  as?: "div" | "section" | "ul" | "header" | "article";
}

/**
 * Reveals its content with an anime.js entrance the first time it scrolls into
 * view. Content is hidden from first paint via the `data-reveal` /
 * `data-reveal-group` CSS rules (set at render, so there's no flash), then
 * animated in. Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  stagger: useStagger = false,
  gap = 90,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = useStagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    const reveal = () => {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const offset = OFFSETS[from];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.disconnect();
          animate(targets, {
            opacity: [0, 1],
            translateX: offset.x,
            translateY: offset.y,
            scale: offset.scale,
            delay: useStagger ? stagger(gap, { start: delay }) : delay,
            duration: 720,
            ease: "outExpo",
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, delay, useStagger, gap]);

  const revealAttr = useStagger
    ? { "data-reveal-group": "" }
    : { "data-reveal": "" };

  return (
    <Tag ref={ref as never} className={cn(className)} {...revealAttr}>
      {children}
    </Tag>
  );
}
