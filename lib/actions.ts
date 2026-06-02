"use server";

import { auth } from "./auth";
import { prisma } from "./prisma";

async function requireUser(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

// --- Roadmap progress ------------------------------------------------------

export async function getMyCompletedSteps(): Promise<string[]> {
  const userId = await requireUser();
  if (!userId || !prisma) return [];
  const rows = await prisma.userProgress.findMany({
    where: { userId, isCompleted: true, stepId: { not: null } },
    select: { stepId: true },
  });
  return rows.map((r) => r.stepId!).filter(Boolean);
}

export async function toggleStepProgress(
  stepId: string,
  roadmapId: string,
): Promise<{ ok: boolean; completed: boolean }> {
  const userId = await requireUser();
  if (!userId || !prisma) return { ok: false, completed: false };

  const existing = await prisma.userProgress.findUnique({
    where: { userId_stepId: { userId, stepId } },
  });

  if (existing) {
    const completed = !existing.isCompleted;
    await prisma.userProgress.update({
      where: { id: existing.id },
      data: { isCompleted: completed, completedAt: completed ? new Date() : null },
    });
    return { ok: true, completed };
  }

  await prisma.userProgress.create({
    data: { userId, stepId, roadmapId, isCompleted: true, completedAt: new Date() },
  });
  return { ok: true, completed: true };
}

// --- Bookmarks -------------------------------------------------------------

export async function getMyBookmarkedProjects(): Promise<string[]> {
  const userId = await requireUser();
  if (!userId || !prisma) return [];
  const rows = await prisma.bookmark.findMany({
    where: { userId, projectId: { not: null } },
    select: { projectId: true },
  });
  return rows.map((r) => r.projectId!).filter(Boolean);
}

export async function toggleProjectBookmark(
  projectId: string,
): Promise<{ ok: boolean; bookmarked: boolean }> {
  const userId = await requireUser();
  if (!userId || !prisma) return { ok: false, bookmarked: false };

  const existing = await prisma.bookmark.findFirst({ where: { userId, projectId } });
  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return { ok: true, bookmarked: false };
  }
  await prisma.bookmark.create({ data: { userId, projectId } });
  return { ok: true, bookmarked: true };
}

// --- Challenge submission votes -------------------------------------------

/** Live vote state: which submissions the user voted, and extra votes beyond
 *  the seeded base count (one row per real user vote). */
export async function getVoteState(
  submissionIds: string[],
): Promise<{ mine: string[]; extra: Record<string, number> }> {
  if (!prisma || submissionIds.length === 0) return { mine: [], extra: {} };
  const userId = await requireUser();

  const grouped = await prisma.submissionVote.groupBy({
    by: ["submissionId"],
    where: { submissionId: { in: submissionIds } },
    _count: { submissionId: true },
  });
  const extra: Record<string, number> = {};
  for (const g of grouped) extra[g.submissionId] = g._count.submissionId;

  let mine: string[] = [];
  if (userId) {
    const rows = await prisma.submissionVote.findMany({
      where: { userId, submissionId: { in: submissionIds } },
      select: { submissionId: true },
    });
    mine = rows.map((r) => r.submissionId);
  }
  return { mine, extra };
}

export async function toggleVote(
  submissionId: string,
): Promise<{ ok: boolean; voted: boolean }> {
  const userId = await requireUser();
  if (!userId || !prisma) return { ok: false, voted: false };

  const existing = await prisma.submissionVote.findUnique({
    where: { userId_submissionId: { userId, submissionId } },
  });
  if (existing) {
    await prisma.submissionVote.delete({ where: { id: existing.id } });
    return { ok: true, voted: false };
  }
  await prisma.submissionVote.create({ data: { userId, submissionId } });
  return { ok: true, voted: true };
}
