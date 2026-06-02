"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Counts up from 0 to `to` the first time it scrolls into view, using anime.js.
 * Renders `prefix + number + suffix` (e.g. 50 + "k+"). Respects reduced motion.
 */
export function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (n: number) => {
      el.textContent = `${prefix}${Math.round(n)}${suffix}`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(to);
      return;
    }
    render(0);

    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          o.disconnect();
          const obj = { v: 0 };
          animate(obj, {
            v: to,
            duration,
            ease: "out(3)",
            onUpdate: () => render(obj.v),
          });
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, prefix, suffix, duration]);

  return <span ref={ref} className={className}>{prefix}{to}{suffix}</span>;
}
