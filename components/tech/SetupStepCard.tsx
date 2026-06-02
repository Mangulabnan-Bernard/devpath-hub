"use client";

import { useState } from "react";
import type { SetupStep } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Eli5Toggle } from "./Eli5Toggle";
import { cn } from "@/lib/utils";

export function SetupStepCard({ step }: { step: SetupStep }) {
  const [showVerify, setShowVerify] = useState(false);

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-brand-600/15">
          {step.order}
        </span>
        <span className="mt-2 w-px grow bg-border" />
      </div>

      <div className="flex-1 pb-10">
        <h3 className="text-lg font-semibold">{step.title}</h3>

        {step.command && (
          <div className="mt-3">
            <CodeBlock code={step.command} label="terminal" />
          </div>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InfoBlock label="What it does" tone="neutral">
            {step.explanation}
          </InfoBlock>
          <InfoBlock label="Why you need it" tone="brand">
            {step.why}
          </InfoBlock>
        </div>

        <div className="mt-4">
          <Eli5Toggle normal={null} eli5={step.eli5} />
        </div>

        {step.alternatives && (
          <p className="mt-3 text-sm text-muted">
            <span className="font-medium text-foreground">Alternatives: </span>
            {step.alternatives}
          </p>
        )}

        {step.verification && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowVerify((v) => !v)}
              aria-expanded={showVerify}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-emerald-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              How do I check it worked?
            </button>
            {showVerify && (
              <div className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-foreground">
                {step.verification}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "neutral" | "brand";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5",
        tone === "brand"
          ? "border-brand-500/20 bg-brand-500/5"
          : "border-border bg-surface-2",
      )}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
