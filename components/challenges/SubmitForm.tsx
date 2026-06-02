"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Submission form for a challenge. In the prototype it validates and shows a
 * success state locally; a later step wires it to POST /api/challenges/[id]/submit.
 */
export function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [repo, setRepo] = useState("");
  const [demo, setDemo] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repo.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-semibold">Entry submitted!</p>
        <p className="mt-1 text-sm text-muted">
          Sign in to track votes on your submission once judging opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
      <Field label="GitHub repository" required>
        <input
          type="url"
          required
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="https://github.com/you/project"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </Field>
      <Field label="Live demo (optional)">
        <input
          type="url"
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
          placeholder="https://your-demo.vercel.app"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </Field>
      <Button type="submit" className="w-full">Submit entry</Button>
      <p className="text-center text-xs text-muted">You&apos;ll need an account to appear on the leaderboard.</p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
