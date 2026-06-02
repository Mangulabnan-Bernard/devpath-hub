import type { Metadata } from "next";
import { getChallenges } from "@/lib/data";
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Time-boxed community challenges — build, ship, vote, and win.",
};

export default async function ChallengesPage() {
  const challenges = await getChallenges();
  const active = challenges.filter((c) => c.isActive);
  const past = challenges.filter((c) => !c.isActive);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Community Challenges"
          title="Build something. Ship it. Win."
          description="Short, focused build challenges with real prizes. Submit a repo and a live demo, then climb the leaderboard with community votes."
        />
      </Reveal>

      <section className="mt-12">
        <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          Active now
        </h2>
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
          {active.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </Reveal>
      </section>

      {past.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-lg font-semibold text-muted">Past challenges</h2>
          <Reveal className="grid gap-5 opacity-90 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
            {past.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </Reveal>
        </section>
      )}
    </div>
  );
}
