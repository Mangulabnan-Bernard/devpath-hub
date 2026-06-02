import Link from "next/link";
import type { Challenge } from "@/lib/types";
import { LevelBadge } from "@/components/ui/Badge";
import { daysUntil, formatDate } from "@/lib/utils";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const days = daysUntil(challenge.endDate);
  return (
    <Link
      href={`/challenges/${challenge.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-600/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-border">
          {challenge.techName}
        </span>
        {challenge.isActive ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {days > 0 ? `${days} days left` : "Ending soon"}
          </span>
        ) : (
          <span className="text-xs font-medium text-muted">Ended {formatDate(challenge.endDate)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
          {challenge.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{challenge.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <LevelBadge level={challenge.level} />
        <div className="flex items-center gap-3 text-xs text-muted">
          <span>🏆 {challenge.prize.split(" ")[0]}</span>
          <span>👥 {challenge.participants}</span>
        </div>
      </div>
    </Link>
  );
}
