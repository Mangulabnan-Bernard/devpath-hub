import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { techContent, challengeContent } from "../lib/content";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function reset() {
  // Delete in FK-safe order (children before parents).
  await prisma.challengeSubmission.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.projectStep.deleteMany();
  await prisma.project.deleteMany();
  await prisma.roadmapStep.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.setupStep.deleteMany();
  await prisma.setupGuide.deleteMany();
  await prisma.commonError.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.tech.deleteMany();
}

async function main() {
  await reset();

  for (const t of techContent) {
    await prisma.tech.create({
      data: {
        id: t.id,
        name: t.name,
        slug: t.slug,
        description: t.description,
        tagline: t.tagline,
        iconEmoji: t.iconEmoji,
        color: t.color,
        isFeatured: t.isFeatured,
        statsLearners: t.stats.learners,
        statsGuides: t.stats.guides,
        setupGuide: {
          create: {
            title: t.setupGuide.title,
            description: t.setupGuide.description,
            steps: {
              create: t.setupGuide.steps.map((s) => ({
                id: s.id,
                title: s.title,
                command: s.command,
                explanation: s.explanation,
                why: s.why,
                alternatives: s.alternatives,
                verification: s.verification,
                eli5: s.eli5,
                order: s.order,
              })),
            },
          },
        },
        roadmaps: {
          create: t.roadmaps.map((r, i) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            level: r.level,
            order: i,
            steps: {
              create: r.steps.map((s) => ({
                id: s.id,
                title: s.title,
                content: s.content,
                eli5Content: s.eli5Content,
                codeSnippet: s.codeSnippet,
                playgroundUrl: s.playgroundUrl,
                order: s.order,
              })),
            },
          })),
        },
        projects: {
          create: t.projects.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            description: p.description,
            level: p.level,
            starterCode: p.starterCode,
            demoUrl: p.demoUrl,
            estimatedHours: p.estimatedHours,
            tags: p.tags,
            steps: {
              create: p.steps.map((s) => ({
                id: s.id,
                title: s.title,
                content: s.content,
                codeSnippet: s.codeSnippet,
                order: s.order,
              })),
            },
          })),
        },
        errors: {
          create: t.errors.map((e, i) => ({
            id: e.id,
            errorMessage: e.errorMessage,
            cause: e.cause,
            solution: e.solution,
            codeSnippet: e.codeSnippet,
            tags: e.tags,
            order: i,
          })),
        },
        tools: {
          create: t.tools.map((tl, i) => ({
            id: tl.id,
            name: tl.name,
            description: tl.description,
            purpose: tl.purpose,
            whyUseIt: tl.whyUseIt,
            alternatives: tl.alternatives,
            bestFor: tl.bestFor,
            docsUrl: tl.docsUrl,
            order: i,
          })),
        },
      },
    });
  }

  for (const c of challengeContent) {
    const tech = await prisma.tech.findUnique({ where: { slug: c.techSlug } });
    if (!tech) throw new Error(`Challenge "${c.slug}" references unknown tech "${c.techSlug}"`);
    await prisma.challenge.create({
      data: {
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        techId: tech.id,
        techName: c.techName,
        level: c.level,
        prize: c.prize,
        startDate: new Date(c.startDate),
        endDate: new Date(c.endDate),
        isActive: c.isActive,
        participants: c.participants,
        submissions: {
          create: c.submissions.map((s) => ({
            id: s.id,
            author: s.author,
            avatarColor: s.avatarColor,
            repoUrl: s.repoUrl,
            demoUrl: s.demoUrl,
            blurb: s.blurb,
            votes: s.votes,
          })),
        },
      },
    });
  }

  console.log(`✓ Seeded ${techContent.length} techs and ${challengeContent.length} challenges`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
