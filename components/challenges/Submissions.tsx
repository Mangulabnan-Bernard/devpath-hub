"use client";

import { useState } from "react";
import type { ChallengeSubmission } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Leaderboard of challenge submissions with optimistic up-voting. Votes are
 * local to the prototype; wiring to the `ChallengeSubmission` model comes later.
 */
export function Submissions({ submissions }: { submissions: ChallengeSubmission[] }) {
  const [votes, setVotes] = useState<Record<string, number>>(
    () => Object.fromEntries(submissions.map((s) => [s.id, s.votes])),
  );
  const [voted, setVoted] = useState<Set<string>>(new Set());

  function vote(id: string) {
    setVotes((prev) => {
      const has = voted.has(id);
      return { ...prev, [id]: prev[id] + (has ? -1 : 1) };
    });
    setVoted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const ranked = [...submissions].sort((a, b) => votes[b.id] - votes[a.id]);

  return (
    <ul className="flex flex-col gap-3">
      {ranked.map((sub, i) => (
        <li
          key={sub.id}
          className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
        >
          <span className="w-6 shrink-0 text-center text-sm font-bold text-muted">#{i + 1}</span>
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: sub.avatarColor }}
            aria-hidden
          >
            {sub.author.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{sub.author}</p>
            <p className="truncate text-sm text-muted">{sub.blurb}</p>
            <div className="mt-1 flex gap-3 text-xs">
              <a href={sub.repoUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline dark:text-brand-400">
                Repo ↗
              </a>
              {sub.demoUrl && (
                <a href={sub.demoUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline dark:text-brand-400">
                  Demo ↗
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => vote(sub.id)}
            aria-pressed={voted.has(sub.id)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-0.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
              voted.has(sub.id)
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400"
                : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m18 15-6-6-6 6" />
            </svg>
            {votes[sub.id]}
          </button>
        </li>
      ))}
    </ul>
  );
}
