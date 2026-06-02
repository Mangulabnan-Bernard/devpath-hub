import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getTechs } from "@/lib/data";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { LevelBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { BookmarkButton } from "@/components/tech/BookmarkButton";
import { Reveal } from "@/components/anim/Reveal";

type Params = { params: Promise<{ slug: string; projectId: string }> };

export async function generateStaticParams() {
  const techs = await getTechs();
  return techs.flatMap((tech) =>
    tech.projects.map((p) => ({ slug: tech.slug, projectId: p.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, projectId } = await params;
  const result = await getProject(slug, projectId);
  if (!result) return { title: "Project not found" };
  return { title: result.project.title, description: result.project.description };
}

export default async function ProjectPage({ params }: Params) {
  const { slug, projectId } = await params;
  const result = await getProject(slug, projectId);
  if (!result) notFound();
  const { tech, project } = result;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <Link href="/tech" className="hover:text-foreground">Tech</Link>
        <span>/</span>
        <Link href={`/tech/${tech.slug}`} className="hover:text-foreground">{tech.name}</Link>
        <span>/</span>
        <Link href={`/tech/${tech.slug}/projects`} className="hover:text-foreground">Projects</Link>
        <span>/</span>
        <span className="text-foreground">{project.title}</span>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <LevelBadge level={project.level} />
          <span className="text-sm text-muted">~{project.estimatedHours} hours</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="text-lg text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted ring-1 ring-border">{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.starterCode && (
            <ButtonLink href={project.starterCode} size="sm">⑂ Fork starter code</ButtonLink>
          )}
          {project.demoUrl && (
            <ButtonLink href={project.demoUrl} variant="outline" size="sm">View live demo ↗</ButtonLink>
          )}
          <BookmarkButton projectId={project.id} />
        </div>
      </header>

      <div className="my-10 h-px bg-border" />

      <Reveal stagger gap={70}>
        {project.steps.map((step, i) => (
          <div key={step.id} className="relative flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-brand-600/15">
                {step.order}
              </span>
              {i < project.steps.length - 1 && <span className="mt-2 w-px grow bg-border" />}
            </div>
            <div className="flex-1 pb-10">
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-muted">{step.content}</p>
              {step.codeSnippet && (
                <div className="mt-4">
                  <CodeBlock code={step.codeSnippet} label="code" />
                </div>
              )}
            </div>
          </div>
        ))}
      </Reveal>

      <div className="rounded-2xl border border-border bg-surface-2 p-6 text-center">
        <h3 className="text-lg font-semibold">Finished building?</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Ship it and share it in a community challenge — or move on to the next project.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/challenges" size="sm">Enter a challenge</ButtonLink>
          <ButtonLink href={`/tech/${tech.slug}/projects`} variant="outline" size="sm">
            More {tech.name} projects
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
