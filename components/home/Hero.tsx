"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createScope, type Scope } from "animejs";
import { ButtonLink } from "@/components/ui/Button";

const CMD = "npx create-next-app@latest my-app";

/**
 * Animated landing hero. Uses an anime.js scope so all selectors are bound to
 * this component's root and cleaned up on unmount. The headline animates word
 * by word; supporting elements follow on a staggered timeline.
 */
export function Hero({
  stats,
}: {
  stats?: { lessons: number; projects: number; learners: number };
}) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scope.current = createScope({ root: root.current! }).add(() => {
      if (reduce) {
        animate(".hero-anim, .hero-word", { opacity: 1, duration: 0 });
        const t = root.current?.querySelector<HTMLElement>(".hero-type");
        if (t) t.textContent = CMD;
        return;
      }
      animate(".hero-word", {
        opacity: [0, 1],
        translateY: [24, 0],
        rotateX: [-40, 0],
        duration: 900,
        delay: stagger(70),
        ease: "outExpo",
      });
      animate(".hero-anim", {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 800,
        delay: stagger(110, { start: 380 }),
        ease: "outExpo",
      });
      // Gentle continuous drift on the floating chips.
      animate(".hero-orbit", {
        translateY: [0, -14],
        duration: 2600,
        alternate: true,
        loop: true,
        delay: stagger(300),
        ease: "inOutSine",
      });
      // Slow drift on the background glow blobs.
      animate(".hero-blob", {
        translateX: [0, 24],
        translateY: [0, -18],
        duration: 9000,
        alternate: true,
        loop: true,
        delay: stagger(1500),
        ease: "inOutSine",
      });
      // Typewriter effect for the command line.
      const typeEl = root.current?.querySelector<HTMLElement>(".hero-type");
      if (typeEl) {
        const obj = { i: 0 };
        animate(obj, {
          i: CMD.length,
          duration: 1300,
          delay: 950,
          ease: "linear",
          onUpdate: () => {
            typeEl.textContent = CMD.slice(0, Math.round(obj.i));
          },
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  const words = ["From", "Zero", "to", "Hero", "Developer"];

  return (
    <section ref={root} className="relative overflow-hidden">
      {/* Background flourishes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="hero-blob absolute -left-24 top-10 size-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="hero-blob absolute -right-16 top-32 size-80 rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="hero-anim inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted opacity-0">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Wikipedia for developer journeys
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight [perspective:800px] sm:text-6xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block">
                <span
                  className={
                    "hero-word inline-block opacity-0 " +
                    (w === "Hero" || w === "Zero" ? "text-gradient" : "")
                  }
                >
                  {w}
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="hero-anim mt-6 max-w-md text-lg text-muted opacity-0">
            Every step explained. Every error solved. Every project built. Master any
            stack from absolute scratch — no prior knowledge assumed.
          </p>

          <div className="hero-anim mt-8 flex flex-wrap gap-3 opacity-0">
            <ButtonLink href="/tech" size="lg">
              Explore Tech Guides
            </ButtonLink>
            <ButtonLink href="/challenges" variant="outline" size="lg">
              Join Challenges
            </ButtonLink>
          </div>

          <div className="hero-anim mt-10 flex items-center gap-6 opacity-0 text-sm text-muted">
            <Stat value={stats ? `${stats.lessons}+` : "100+"} label="Lessons" />
            <span className="h-8 w-px bg-border" />
            <Stat value={stats ? `${stats.projects}` : "20"} label="Projects" />
            <span className="h-8 w-px bg-border" />
            <Stat value="0" label="Assumptions" />
          </div>
        </div>

        {/* Visual: a mock guide card */}
        <div className="hero-anim relative opacity-0">
          <FloatingChip className="hero-orbit -left-4 top-6" emoji="🧸" text="Explain like I'm 5" />
          <FloatingChip className="hero-orbit -right-2 top-24" emoji="✅" text="Verified step" />
          <FloatingChip className="hero-orbit bottom-6 left-8" emoji="🐞" text="Error solved" />

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-brand-900/10">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-xs text-muted">setup · step 3 of 4</span>
            </div>
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Create a Next.js app
              </p>
              <div className="mt-2 rounded-lg bg-slate-900 px-3 py-2.5 font-mono text-[13px] text-slate-100">
                <span className="text-emerald-400">$</span>{" "}
                <span className="hero-type" />
                <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-slate-300" aria-hidden />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-surface-2 p-2.5 ring-1 ring-border">
                  <p className="font-semibold">What it does</p>
                  <p className="mt-0.5 text-muted">Scaffolds a full project for you.</p>
                </div>
                <div className="rounded-lg bg-brand-500/5 p-2.5 ring-1 ring-brand-500/20">
                  <p className="font-semibold">Why you need it</p>
                  <p className="mt-0.5 text-muted">Best-practice setup, zero config.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

function FloatingChip({ className, emoji, text }: { className?: string; emoji: string; text: string }) {
  return (
    <div
      className={
        "absolute z-10 hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium shadow-lg sm:flex " +
        (className ?? "")
      }
    >
      <span aria-hidden>{emoji}</span>
      {text}
    </div>
  );
}
