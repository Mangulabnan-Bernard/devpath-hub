import Link from "next/link";
import type { Tech } from "@/lib/types";
import { TechTabs } from "./TechTabs";

type TabKey = "setup" | "roadmap" | "projects" | "errors" | "tools";

/** Tech header (icon, name, stats) plus the tabbed section content. */
export function TechPageShell({ tech, initialTab }: { tech: Tech; initialTab?: TabKey }) {
  const lessons =
    tech.setupGuide.steps.length +
    tech.roadmaps.reduce((n, r) => n + r.steps.length, 0);
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/tech" className="hover:text-foreground">
          Tech
        </Link>
        <span>/</span>
        <span className="text-foreground">{tech.name}</span>
      </nav>

      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-4xl ring-1 ring-border"
          style={{ boxShadow: `0 8px 30px -12px ${tech.color === "#000000" ? "#6366f1" : tech.color}55` }}
        >
          {tech.iconEmoji}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tech.name}</h1>
          <p className="mt-1 font-medium text-brand-600 dark:text-brand-400">{tech.tagline}</p>
          <p className="mt-3 max-w-2xl text-muted">{tech.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span>📘 {lessons} lessons</span>
            <span>🚀 {tech.projects.length} projects</span>
            <span>🗺️ {tech.roadmaps.length} roadmaps</span>
            <span>🐞 {tech.errors.length} error fixes</span>
          </div>
        </div>
      </header>

      <div className="mt-10">
        <TechTabs tech={tech} initialTab={initialTab} />
      </div>
    </div>
  );
}
