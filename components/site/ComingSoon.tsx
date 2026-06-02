import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/anim/Reveal";

/** A polished placeholder for routes that are planned but not built yet. */
export function ComingSoon({
  emoji,
  title,
  description,
  bullets,
}: {
  emoji: string;
  title: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <Reveal from="scale">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-4xl ring-1 ring-border">
          {emoji}
        </span>
      </Reveal>
      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
        <span className="size-1.5 rounded-full bg-amber-500" />
        Coming soon
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-muted">{description}</p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <svg className="mt-0.5 size-4 shrink-0 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/tech">Explore tech guides</ButtonLink>
        <ButtonLink href="/" variant="outline">Back home</ButtonLink>
      </div>
    </div>
  );
}
