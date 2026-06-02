"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Do I need any coding experience to start?",
    a: "None at all. Every guide assumes zero prior knowledge — we explain what each command does, why it's needed, and how to confirm it worked. The 'Explain like I'm 5' toggle is there whenever a concept gets confusing.",
  },
  {
    q: "Is DevPath.hub free?",
    a: "The core guides, roadmaps, projects, and the error solver are free. We may add optional paid extras later (certificates, mentorship), but learning the fundamentals will always be free.",
  },
  {
    q: "How is this different from YouTube tutorials or roadmap.sh?",
    a: "Tutorials show you what to type; we explain why. Roadmaps give you a list; we give you the actual step-by-step path, the fixes for errors you'll hit, and projects to build — all in one place with progress tracking.",
  },
  {
    q: "What if I get stuck on an error?",
    a: "Each tech has a searchable error solver: paste your error and get the likely cause plus a copy-paste fix. We built the common mistakes right into the learning flow so you're never stranded.",
  },
  {
    q: "Which technologies are covered?",
    a: "We're starting with Next.js, Flutter, and CI/CD, each with full setup guides, multi-level roadmaps, projects, errors, and tool comparisons. More stacks are on the way — and you can vote on what's next.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Absolutely. Mark steps complete as you go, bookmark guides for later, and pick a Beginner, Intermediate, or Advanced track per topic. Your progress is saved so you can always pick up where you left off.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
            >
              <span className="font-medium">{item.q}</span>
              <svg
                className={cn("size-5 shrink-0 text-muted transition-transform", isOpen && "rotate-45")}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
