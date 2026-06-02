"use client";

import { useMemo, useState } from "react";
import type { CommonError } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";

export function ErrorSolver({ errors }: { errors: CommonError[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(errors[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return errors;
    return errors.filter((e) =>
      [e.errorMessage, e.cause, e.solution, ...e.tags].join(" ").toLowerCase().includes(q),
    );
  }, [errors, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste an error or search by keyword…"
          className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No matching errors yet. Try a different keyword — or ask the AI assistant.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((err) => {
            const open = openId === err.id;
            return (
              <div key={err.id} className="overflow-hidden rounded-xl border border-border bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : err.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-500" aria-hidden>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </span>
                  <code className="flex-1 font-mono text-sm text-rose-600 dark:text-rose-400">{err.errorMessage}</code>
                  <svg
                    className={cn("shrink-0 text-muted transition-transform", open && "rotate-180")}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {open && (
                  <div className="flex flex-col gap-4 border-t border-border px-4 py-4">
                    <Field label="Cause" tone="amber">{err.cause}</Field>
                    <Field label="Solution" tone="emerald">{err.solution}</Field>
                    {err.codeSnippet && <CodeBlock code={err.codeSnippet} label="fix" />}
                    <div className="flex flex-wrap gap-1.5">
                      {err.tags.map((t) => (
                        <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted ring-1 ring-border">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "amber" | "emerald";
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className={cn("mb-1 text-xs font-semibold uppercase tracking-wider", tone === "amber" ? "text-amber-500" : "text-emerald-500")}>
        {label}
      </p>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
