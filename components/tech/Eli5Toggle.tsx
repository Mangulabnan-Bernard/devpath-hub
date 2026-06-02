"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Shows a normal explanation with an optional "Explain Like I'm 5" version.
 * The toggle swaps the visible text; if no ELI5 text exists, nothing renders.
 */
export function Eli5Toggle({
  normal,
  eli5,
  className,
}: {
  normal: React.ReactNode;
  eli5?: string;
  className?: string;
}) {
  const [simple, setSimple] = useState(false);
  const hasEli5 = Boolean(eli5);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {hasEli5 && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSimple((s) => !s)}
            aria-pressed={simple}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              simple
                ? "bg-accent-600 text-white"
                : "bg-accent-500/10 text-accent-600 ring-1 ring-accent-500/20 hover:bg-accent-500/20 dark:text-accent-400",
            )}
          >
            <span aria-hidden>🧸</span>
            {simple ? "Showing ELI5" : "Explain like I'm 5"}
          </button>
        </div>
      )}
      <div
        className={cn(
          "text-sm leading-relaxed",
          simple ? "text-accent-700 dark:text-accent-300" : "text-muted",
        )}
      >
        {simple && eli5 ? eli5 : normal}
      </div>
    </div>
  );
}
