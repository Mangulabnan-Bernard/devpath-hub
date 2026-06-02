import Link from "next/link";
import type { Project } from "@/lib/types";
import { LevelBadge } from "@/components/ui/Badge";

export function ProjectCard({ project, techSlug }: { project: Project; techSlug: string }) {
  return (
    <Link
      href={`/tech/${techSlug}/projects/${project.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-600/5"
    >
      <div className="flex items-center justify-between">
        <LevelBadge level={project.level} />
        <span className="text-xs text-muted">~{project.estimatedHours}h</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted ring-1 ring-border">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="text-muted">{project.steps.length} steps</span>
        <span className="inline-flex items-center gap-1 font-medium text-brand-600 transition-transform group-hover:translate-x-0.5 dark:text-brand-400">
          Start project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
