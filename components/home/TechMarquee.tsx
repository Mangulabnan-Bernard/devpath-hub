import Link from "next/link";

type Item = { slug: string; name: string; iconEmoji: string; color: string };

/**
 * An infinite, seamless scrolling band of tech chips. The list is rendered
 * twice and translated -50% so the loop is seamless; it pauses on hover.
 * (Pure CSS animation — see `.animate-marquee` in globals.css.)
 */
export function TechMarquee({ items }: { items: Item[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-host relative overflow-hidden py-2">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee gap-4">
        {row.map((t, i) => (
          <Link
            key={`${t.slug}-${i}`}
            href={`/tech/${t.slug}`}
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : 0}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 transition-colors hover:border-brand-500/50"
          >
            <span
              className="flex size-9 items-center justify-center rounded-lg text-xl ring-1 ring-border transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${t.color === "#000000" ? "#6366f1" : t.color}14` }}
            >
              {t.iconEmoji}
            </span>
            <span className="whitespace-nowrap font-medium">{t.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
