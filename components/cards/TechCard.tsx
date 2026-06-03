import Link from "next/link";
import type { Tech } from "@/lib/types";

export function TechCard({ tech }: { tech: Tech }) {
  // Real counts derived from the track's actual content (no mock numbers).
  const lessons =
    tech.setupGuide.steps.length +
    tech.roadmaps.reduce((n, r) => n + r.steps.length, 0);
  return (
    <Link
      href={`/tech/${tech.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-600/5"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: tech.color === "#000000" ? "#6366f1" : tech.color }}
      />
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl bg-surface-2 text-2xl ring-1 ring-border">
          {tech.iconEmoji}
        </span>
        <span className="text-xs font-medium text-muted">{lessons} lessons</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold">{tech.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{tech.description}</p>
      </div>
      <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
        <span>{tech.roadmaps.length} roadmaps</span>
        <span>·</span>
        <span>{tech.projects.length} projects</span>
        <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
