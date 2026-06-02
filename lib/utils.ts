import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function levelLabel(level: string) {
  return LEVEL_LABELS[level] ?? level;
}

/** Tailwind classes for a level badge. */
export function levelClasses(level: string) {
  switch (level) {
    case "BEGINNER":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20";
    case "INTERMEDIATE":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20";
    case "ADVANCED":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-1 ring-slate-500/20";
  }
}

/** Format an ISO date string like "Jun 14, 2026". */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Days remaining until an ISO date, relative to `now` (defaults to today). */
export function daysUntil(iso: string, now: Date = new Date()) {
  const ms = new Date(iso).getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}
