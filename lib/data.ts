import type { Tech, Challenge, Level } from "./types";
import { prisma } from "./prisma";
import { techContent, challengeContent } from "./content";

// ---------------------------------------------------------------------------
// Data layer.
//
// Reads from PostgreSQL via Prisma when DATABASE_URL is configured, and falls
// back to the bundled content (lib/content.ts) otherwise — so the app runs with
// or without a database. The Prisma rows are mapped back into the same shapes
// the UI already consumes (lib/types.ts), so no component changes are needed.
// ---------------------------------------------------------------------------

const u = <T>(v: T | null | undefined): T | undefined => v ?? undefined;

const techInclude = {
  setupGuide: { include: { steps: { orderBy: { order: "asc" } } } },
  roadmaps: {
    orderBy: { order: "asc" },
    include: { steps: { orderBy: { order: "asc" } } },
  },
  projects: {
    orderBy: { title: "asc" },
    include: { steps: { orderBy: { order: "asc" } } },
  },
  errors: { orderBy: { order: "asc" } },
  tools: { orderBy: { order: "asc" } },
} as const;

// Prisma's nested result type for a tech with everything included.
type TechRow = NonNullable<
  Awaited<ReturnType<NonNullable<typeof prisma>["tech"]["findFirst"]>>
> & {
  setupGuide: { title: string; description: string; steps: SetupStepRow[] } | null;
  roadmaps: RoadmapRow[];
  projects: ProjectRow[];
  errors: ErrorRow[];
  tools: ToolRow[];
};
type SetupStepRow = {
  id: string; title: string; command: string | null; explanation: string;
  why: string; alternatives: string | null; verification: string | null;
  eli5: string | null; order: number;
};
type RoadmapRow = {
  id: string; title: string; description: string; level: Level;
  steps: {
    id: string; title: string; content: string; eli5Content: string | null;
    codeSnippet: string | null; playgroundUrl: string | null; order: number;
  }[];
};
type ProjectRow = {
  id: string; slug: string; title: string; description: string; level: Level;
  starterCode: string | null; demoUrl: string | null; estimatedHours: number;
  tags: string[];
  steps: { id: string; title: string; content: string; codeSnippet: string | null; order: number }[];
};
type ErrorRow = {
  id: string; errorMessage: string; cause: string; solution: string;
  codeSnippet: string | null; tags: string[];
};
type ToolRow = {
  id: string; name: string; description: string; purpose: string;
  whyUseIt: string; alternatives: string; bestFor: string; docsUrl: string | null;
};

function mapTech(row: TechRow): Tech {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    tagline: row.tagline,
    iconEmoji: row.iconEmoji,
    color: row.color,
    isFeatured: row.isFeatured,
    stats: {
      learners: row.statsLearners,
      guides: row.statsGuides,
      projects: row.projects.length,
    },
    setupGuide: {
      title: row.setupGuide?.title ?? "",
      description: row.setupGuide?.description ?? "",
      steps: (row.setupGuide?.steps ?? []).map((s) => ({
        id: s.id, order: s.order, title: s.title,
        command: u(s.command), explanation: s.explanation, why: s.why,
        alternatives: u(s.alternatives), verification: u(s.verification), eli5: u(s.eli5),
      })),
    },
    roadmaps: row.roadmaps.map((r) => ({
      id: r.id, title: r.title, description: r.description, level: r.level,
      steps: r.steps.map((s) => ({
        id: s.id, order: s.order, title: s.title, content: s.content,
        eli5Content: u(s.eli5Content), codeSnippet: u(s.codeSnippet), playgroundUrl: u(s.playgroundUrl),
      })),
    })),
    projects: row.projects.map((p) => ({
      id: p.id, slug: p.slug, title: p.title, description: p.description, level: p.level,
      starterCode: u(p.starterCode), demoUrl: u(p.demoUrl),
      estimatedHours: p.estimatedHours, tags: p.tags,
      steps: p.steps.map((s) => ({
        id: s.id, order: s.order, title: s.title, content: s.content, codeSnippet: u(s.codeSnippet),
      })),
    })),
    errors: row.errors.map((e) => ({
      id: e.id, errorMessage: e.errorMessage, cause: e.cause, solution: e.solution,
      codeSnippet: u(e.codeSnippet), tags: e.tags,
    })),
    tools: row.tools.map((t) => ({
      id: t.id, name: t.name, description: t.description, purpose: t.purpose,
      whyUseIt: t.whyUseIt, alternatives: t.alternatives, bestFor: t.bestFor, docsUrl: u(t.docsUrl),
    })),
  };
}

type ChallengeRow = {
  id: string; slug: string; title: string; description: string;
  techName: string; level: Level; prize: string;
  startDate: Date; endDate: Date; isActive: boolean; participants: number;
  tech: { slug: string };
  submissions: {
    id: string; author: string; avatarColor: string; repoUrl: string;
    demoUrl: string | null; blurb: string; votes: number;
  }[];
};

function mapChallenge(row: ChallengeRow): Challenge {
  return {
    id: row.id, slug: row.slug, title: row.title, description: row.description,
    techSlug: row.tech.slug, techName: row.techName, level: row.level, prize: row.prize,
    startDate: row.startDate.toISOString(), endDate: row.endDate.toISOString(),
    isActive: row.isActive, participants: row.participants,
    submissions: row.submissions.map((s) => ({
      id: s.id, author: s.author, avatarColor: s.avatarColor, repoUrl: s.repoUrl,
      demoUrl: u(s.demoUrl), blurb: s.blurb, votes: s.votes,
    })),
  };
}

/** Run a Prisma query, falling back to bundled content on any failure. */
async function withDb<T>(query: (db: NonNullable<typeof prisma>) => Promise<T>, fallback: () => T): Promise<T> {
  if (!prisma) return fallback();
  try {
    return await query(prisma);
  } catch (err) {
    console.warn("[data] Prisma query failed, using bundled content:", (err as Error).message);
    return fallback();
  }
}

// --- Accessors -------------------------------------------------------------

export async function getTechs(): Promise<Tech[]> {
  return withDb(
    async (db) => (await db.tech.findMany({ include: techInclude, orderBy: { name: "asc" } }) as TechRow[]).map(mapTech),
    () => techContent,
  );
}

export async function getFeaturedTechs(): Promise<Tech[]> {
  return withDb(
    async (db) =>
      (await db.tech.findMany({ where: { isFeatured: true }, include: techInclude, orderBy: { name: "asc" } }) as TechRow[]).map(mapTech),
    () => techContent.filter((t) => t.isFeatured),
  );
}

export async function getTechBySlug(slug: string): Promise<Tech | undefined> {
  return withDb(
    async (db) => {
      const row = (await db.tech.findUnique({ where: { slug }, include: techInclude })) as TechRow | null;
      return row ? mapTech(row) : undefined;
    },
    () => techContent.find((t) => t.slug === slug),
  );
}

export async function getProject(
  techSlug: string,
  projectSlug: string,
): Promise<{ tech: Tech; project: Tech["projects"][number] } | undefined> {
  const tech = await getTechBySlug(techSlug);
  const project = tech?.projects.find((p) => p.slug === projectSlug);
  if (!tech || !project) return undefined;
  return { tech, project };
}

const challengeInclude = {
  tech: { select: { slug: true } },
  submissions: { orderBy: { votes: "desc" } },
} as const;

export async function getChallenges(): Promise<Challenge[]> {
  return withDb(
    async (db) =>
      (await db.challenge.findMany({
        include: challengeInclude,
        orderBy: [{ isActive: "desc" }, { endDate: "desc" }],
      }) as ChallengeRow[]).map(mapChallenge),
    () => challengeContent,
  );
}

export async function getActiveChallenges(): Promise<Challenge[]> {
  return withDb(
    async (db) =>
      (await db.challenge.findMany({ where: { isActive: true }, include: challengeInclude, orderBy: { endDate: "asc" } }) as ChallengeRow[]).map(mapChallenge),
    () => challengeContent.filter((c) => c.isActive),
  );
}

export async function getChallengeBySlug(slug: string): Promise<Challenge | undefined> {
  return withDb(
    async (db) => {
      const row = (await db.challenge.findUnique({ where: { slug }, include: challengeInclude })) as ChallengeRow | null;
      return row ? mapChallenge(row) : undefined;
    },
    () => challengeContent.find((c) => c.slug === slug),
  );
}

// Slugs for generateStaticParams. These read from bundled content (sync) so the
// build can enumerate routes without a database round-trip; the DB is the source
// of truth for the page bodies.
export function allTechSlugs(): string[] {
  return techContent.map((t) => t.slug);
}

export function allChallengeSlugs(): string[] {
  return challengeContent.map((c) => c.slug);
}
