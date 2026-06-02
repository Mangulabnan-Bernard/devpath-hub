import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTechs } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { LevelBadge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  // No DB? Shouldn't happen when signed in, but guard anyway.
  if (!prisma) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted">
        Database isn&apos;t configured.
      </div>
    );
  }

  const [completedCount, bookmarks, votesCast, techs] = await Promise.all([
    prisma.userProgress.count({ where: { userId, isCompleted: true } }),
    prisma.bookmark.findMany({ where: { userId, projectId: { not: null } }, orderBy: { createdAt: "desc" } }),
    prisma.submissionVote.count({ where: { userId } }),
    getTechs(),
  ]);

  // Resolve bookmarked project ids to project + tech for linking.
  const projectIndex = new Map(
    techs.flatMap((t) => t.projects.map((p) => [p.id, { project: p, techSlug: t.slug }])),
  );
  const savedProjects = bookmarks
    .map((b) => (b.projectId ? projectIndex.get(b.projectId) : undefined))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const name = session.user.name || session.user.email?.split("@")[0] || "there";

  const STATS = [
    { value: completedCount, label: "Steps completed" },
    { value: savedProjects.length, label: "Saved projects" },
    { value: votesCast, label: "Votes cast" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-1">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Dashboard
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {name} 👋</h1>
        <p className="text-muted">Pick up where you left off.</p>
      </header>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="text-3xl font-extrabold text-gradient">{s.value}</div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Saved projects</h2>
        {savedProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted">No bookmarks yet. Save a project to find it here later.</p>
            <div className="mt-4">
              <ButtonLink href="/tech/nextjs/projects" size="sm">Browse projects</ButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {savedProjects.map(({ project, techSlug }) => (
              <Link
                key={project.id}
                href={`/tech/${techSlug}/projects/${project.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand-500/50"
              >
                <div className="flex items-center justify-between">
                  <LevelBadge level={project.level} />
                  <span className="text-xs text-muted">~{project.estimatedHours}h</span>
                </div>
                <h3 className="font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{project.title}</h3>
                <p className="line-clamp-2 text-sm text-muted">{project.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Keep learning</h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/tech">Explore tech guides</ButtonLink>
          <ButtonLink href="/challenges" variant="outline">Join a challenge</ButtonLink>
        </div>
      </section>
    </div>
  );
}
