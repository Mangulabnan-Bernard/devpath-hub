import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChallengeBySlug, allChallengeSlugs } from "@/lib/data";
import { LevelBadge } from "@/components/ui/Badge";
import { Submissions } from "@/components/challenges/Submissions";
import { SubmitForm } from "@/components/challenges/SubmitForm";
import { formatDate, daysUntil } from "@/lib/utils";

type Params = { params: Promise<{ challengeId: string }> };

export function generateStaticParams() {
  return allChallengeSlugs().map((challengeId) => ({ challengeId }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { challengeId } = await params;
  const challenge = await getChallengeBySlug(challengeId);
  if (!challenge) return { title: "Challenge not found" };
  return { title: challenge.title, description: challenge.description };
}

export default async function ChallengePage({ params }: Params) {
  const { challengeId } = await params;
  const challenge = await getChallengeBySlug(challengeId);
  if (!challenge) notFound();

  const days = daysUntil(challenge.endDate);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/challenges" className="hover:text-foreground">Challenges</Link>
        <span>/</span>
        <span className="text-foreground">{challenge.title}</span>
      </nav>

      {/* Header */}
      <header className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600/10 to-accent-600/10 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-border">
            {challenge.techName}
          </span>
          <LevelBadge level={challenge.level} />
          {challenge.isActive ? (
            <span className="text-xs font-medium text-emerald-500">{days} days left</span>
          ) : (
            <span className="text-xs font-medium text-muted">Ended</span>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{challenge.title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{challenge.description}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Prize" value={challenge.prize} />
          <Stat label="Participants" value={`${challenge.participants}`} />
          <Stat label="Starts" value={formatDate(challenge.startDate)} />
          <Stat label="Ends" value={formatDate(challenge.endDate)} />
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Leaderboard */}
        <section>
          <h2 className="mb-5 text-xl font-bold">
            Leaderboard
            <span className="ml-2 text-sm font-normal text-muted">{challenge.submissions.length} submissions</span>
          </h2>
          {challenge.submissions.length > 0 ? (
            <Submissions submissions={challenge.submissions} />
          ) : (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
              No submissions yet. Be the first to ship!
            </p>
          )}
        </section>

        {/* Submit */}
        <aside>
          <div className="sticky top-24">
            <h2 className="mb-5 text-xl font-bold">Submit your entry</h2>
            {challenge.isActive ? (
              <SubmitForm />
            ) : (
              <p className="rounded-2xl border border-border bg-surface-2 p-5 text-sm text-muted">
                This challenge has ended. Browse the active ones to join the next build.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface/60 p-3 ring-1 ring-border">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-0.5 truncate font-semibold">{value}</p>
    </div>
  );
}
