"use client";

import { useMemo, useState } from "react";
import type { Roadmap, Level } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Eli5Toggle } from "./Eli5Toggle";
import { ButtonLink } from "@/components/ui/Button";
import { levelLabel, cn } from "@/lib/utils";

const LEVELS: Level[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

/**
 * Renders a tech's roadmaps with a level filter and per-step progress that the
 * learner can tick off. Progress lives in component state for the prototype;
 * wiring it to the `UserProgress` model is a later step.
 */
export function RoadmapView({ roadmaps }: { roadmaps: Roadmap[] }) {
  const available = useMemo(
    () => LEVELS.filter((l) => roadmaps.some((r) => r.level === l)),
    [roadmaps],
  );
  const [level, setLevel] = useState<Level>(available[0] ?? "BEGINNER");
  const [done, setDone] = useState<Set<string>>(new Set());

  const visible = roadmaps.filter((r) => r.level === level);
  const totalSteps = visible.reduce((n, r) => n + r.steps.length, 0);
  const completed = visible.reduce(
    (n, r) => n + r.steps.filter((s) => done.has(s.id)).length,
    0,
  );
  const pct = totalSteps ? Math.round((completed / totalSteps) * 100) : 0;

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Level filter */}
      <div className="flex flex-wrap items-center gap-2">
        {available.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              level === l
                ? "bg-brand-600 text-white"
                : "border border-border bg-surface text-muted hover:text-foreground",
            )}
          >
            {levelLabel(l)}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {totalSteps > 0 && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Your progress</span>
            <span className="text-muted">
              {completed}/{totalSteps} steps · {pct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-600 transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {visible.map((roadmap) => (
        <div key={roadmap.id} className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{roadmap.title}</h3>
          <p className="mb-4 text-sm text-muted">{roadmap.description}</p>

          <ol className="flex flex-col">
            {roadmap.steps.map((step, i) => {
              const isDone = done.has(step.id);
              const last = i === roadmap.steps.length - 1;
              return (
                <li key={step.id} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => toggle(step.id)}
                      aria-pressed={isDone}
                      aria-label={isDone ? "Mark step incomplete" : "Mark step complete"}
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                        isDone
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-border bg-surface text-muted hover:border-brand-500",
                      )}
                    >
                      {isDone ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        step.order
                      )}
                    </button>
                    {!last && <span className="my-1 w-0.5 grow bg-border" />}
                  </div>

                  <div className={cn("flex-1 pb-8", last && "pb-0")}>
                    <h4 className={cn("font-semibold", isDone && "text-muted line-through")}>
                      {step.title}
                    </h4>
                    <Eli5Toggle
                      className="mt-1.5"
                      normal={step.content}
                      eli5={step.eli5Content}
                    />
                    {step.codeSnippet && (
                      <div className="mt-3">
                        <CodeBlock code={step.codeSnippet} label="example" />
                      </div>
                    )}
                    {step.playgroundUrl && (
                      <div className="mt-3">
                        <ButtonLink href={step.playgroundUrl} variant="outline" size="sm">
                          Open in playground ↗
                        </ButtonLink>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
