"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ChallengeSubmission } from "@/lib/types";
import { getVoteState, toggleVote } from "@/lib/actions";
import { cn } from "@/lib/utils";

/**
 * Leaderboard of challenge submissions. The seeded `votes` is the base count;
 * real user votes are persisted in the SubmissionVote table and added on top.
 * Signed-in users can toggle their vote (optimistic, then persisted).
 */
export function Submissions({ submissions }: { submissions: ChallengeSubmission[] }) {
  const { status } = useSession();
  const router = useRouter();

  const base = useMemo(
    () => Object.fromEntries(submissions.map((s) => [s.id, s.votes])),
    [submissions],
  );
  const ids = useMemo(() => submissions.map((s) => s.id), [submissions]);

  const [extra, setExtra] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    getVoteState(ids).then(({ mine, extra }) => {
      if (!active) return;
      setExtra(extra);
      setVoted(new Set(mine));
    });
    return () => {
      active = false;
    };
  }, [ids, status]);

  function countFor(id: string) {
    return (base[id] ?? 0) + (extra[id] ?? 0);
  }

  function vote(id: string) {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    const has = voted.has(id);
    // optimistic
    setExtra((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + (has ? -1 : 1) }));
    setVoted((prev) => {
      const next = new Set(prev);
      if (has) next.delete(id);
      else next.add(id);
      return next;
    });
    toggleVote(id);
  }

  const ranked = [...submissions].sort((a, b) => countFor(b.id) - countFor(a.id));

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
            {countFor(sub.id)}
          </button>
        </li>
      ))}
    </ul>
  );
}
