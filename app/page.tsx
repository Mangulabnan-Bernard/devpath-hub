import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Faq } from "@/components/home/Faq";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechCard } from "@/components/cards/TechCard";
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { ButtonLink } from "@/components/ui/Button";
import { getTechs, getFeaturedTechs, getActiveChallenges, getPlatformStats } from "@/lib/data";

const STEPS = [
  { num: "01", icon: "🧭", title: "Pick your path", body: "Choose a technology and a difficulty level — Beginner, Intermediate, or Advanced." },
  { num: "02", icon: "📖", title: "Follow guided steps", body: "Every command is explained: what it does, why you need it, and how to verify it worked." },
  { num: "03", icon: "🛠️", title: "Build real projects", body: "Apply what you learn with starter code and small, verifiable steps to a working app." },
  { num: "04", icon: "🐞", title: "Solve errors instantly", body: "Hit a wall? Search the built-in error solver for the cause and a copy-paste fix." },
];

const FEATURES = [
  { icon: "💡", title: '"Why this step?" explanations', body: "Never run a command blindly. Every step explains what it does and why it matters." },
  { icon: "🐞", title: "Built-in error solver", body: "Hit an error? Search the cause and a copy-paste fix without leaving the guide." },
  { icon: "🚀", title: "Project-based learning", body: "Build real, deployable apps with starter code and step-by-step guidance." },
  { icon: "🧸", title: '"Explain like I\'m 5" mode', body: "Toggle plain-English analogies for any concept the moment it gets confusing." },
  { icon: "⚖️", title: "Tool comparisons", body: "Choose the right tools with side-by-side pros, cons, and best-for guidance." },
  { icon: "🏆", title: "Challenges & gamification", body: "Earn badges, climb leaderboards, and ship projects in community challenges." },
];

const LEVELS = [
  {
    level: "Beginner",
    emoji: "🌱",
    tagline: "Never written code before",
    points: ["Install your tools the right way", "Understand every term as it appears", "Build your very first app"],
    accent: "from-emerald-500/15 to-emerald-500/0 ring-emerald-500/20",
  },
  {
    level: "Intermediate",
    emoji: "⚡",
    tagline: "Switching stacks or filling gaps",
    points: ["Full-stack patterns & data fetching", "Auth, databases, and APIs", "Ship multi-feature projects"],
    accent: "from-amber-500/15 to-amber-500/0 ring-amber-500/20",
  },
  {
    level: "Advanced",
    emoji: "🚀",
    tagline: "Leveling up to production",
    points: ["Rendering, caching & performance", "Testing and CI/CD pipelines", "Deploy with confidence"],
    accent: "from-rose-500/15 to-rose-500/0 ring-rose-500/20",
  },
];

const TESTIMONIALS = [
  {
    quote: "The 'why this step?' boxes finally made setup click. I'd bounced off Next.js twice before — this time I shipped a blog in a weekend.",
    author: "Maya R.",
    role: "Career switcher",
    color: "#2563eb",
  },
  {
    quote: "The error solver is the killer feature. Instead of 30 browser tabs, I paste the error and get the actual fix. Saved me hours.",
    author: "Leon K.",
    role: "Self-taught dev",
    color: "#7c3aed",
  },
  {
    quote: "ELI5 mode is genuinely how I'd explain things to a junior. Great for teaching, and great for filling my own gaps without ego.",
    author: "Priya S.",
    role: "Bootcamp mentor",
    color: "#0ea5e9",
  },
];

const COMPARISON = [
  { feature: "Step-by-step guides", them: "✅", us: '✅ + "Why?"' },
  { feature: "Interactive learning", them: "❌", us: "✅ Terminals & playgrounds" },
  { feature: "Error debugging", them: "❌", us: "✅ Built-in solver" },
  { feature: "Project-based", them: "Scattered", us: "✅ Guided, with starters" },
  { feature: "Adaptive difficulty", them: "❌", us: "✅ Beginner → Advanced" },
];

export default async function HomePage() {
  const [allTechs, techs, challenges, stats] = await Promise.all([
    getTechs(),
    getFeaturedTechs(),
    getActiveChallenges(),
    getPlatformStats(),
  ]);

  const marqueeItems = allTechs.map((t) => ({
    slug: t.slug,
    name: t.name,
    iconEmoji: t.iconEmoji,
    color: t.color,
  }));

  // Real, database-backed stats (no mock numbers).
  const STATS = [
    { to: stats.learners, suffix: "", label: "Learners" },
    { to: stats.lessons, suffix: "+", label: "Lessons" },
    { to: stats.projects, suffix: "", label: "Guided projects" },
    { to: stats.errors, suffix: "", label: "Error fixes" },
  ];

  return (
    <>
      <Hero stats={{ lessons: stats.lessons, projects: stats.projects, learners: stats.learners }} />

      {/* Stats band */}
      <section className="border-y border-border bg-surface-2">
        <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4" stagger from="up">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter
                to={s.to}
                suffix={s.suffix}
                className="text-3xl font-extrabold text-gradient sm:text-4xl"
              />
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Tech marquee / logo cloud */}
      <section className="border-b border-border py-10">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted">
          Learn the stacks that power the web
        </p>
        <TechMarquee items={marqueeItems} />
      </section>

      {/* Featured techs */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Technologies"
            title="Pick a path and start building"
            description="Each track takes you from setup to shipping — with guides, roadmaps, projects, and an error solver baked in."
          />
        </Reveal>
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
          {techs.map((tech) => (
            <TechCard key={tech.id} tech={tech} />
          ))}
        </Reveal>
        <div className="mt-8">
          <ButtonLink href="/tech" variant="outline">
            Browse all technologies →
          </ButtonLink>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="How it works"
              title="From zero to shipped in four steps"
              description="A clear, repeatable loop — no guesswork about what to do next."
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger from="up">
            {STEPS.map((step) => (
              <div key={step.num} className="relative rounded-2xl border border-border bg-surface p-6">
                <span className="absolute right-4 top-4 text-3xl font-extrabold text-border">{step.num}</span>
                <div className="mb-3 text-3xl">{step.icon}</div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Why DevPath */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why DevPath.hub"
            title="Built for people who hate getting stuck"
            description="The hand-holding tutorials wish they had. Zero assumptions, every gap filled."
          />
        </Reveal>
        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-2xl ring-1 ring-border">
                {f.icon}
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Feature spotlight — alternating rows with mini mockups */}
      <section className="border-t border-border bg-surface-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-20 sm:px-6">
          {/* Spotlight 1: ELI5 + why */}
          <Reveal className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Understand, don&apos;t memorize
              </span>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">Every step explains the &ldquo;why&rdquo;</h3>
              <p className="mt-3 text-muted">
                Most tutorials say &ldquo;just run this.&rdquo; We tell you what each command does, why it&apos;s
                needed, and how to confirm it worked — and the ELI5 toggle turns any concept into a plain-English
                analogy the instant it gets fuzzy.
              </p>
              <div className="mt-5">
                <ButtonLink href="/tech/nextjs/setup" variant="outline" size="sm">
                  See a setup guide →
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-brand-900/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Create a Next.js app</p>
              <div className="mt-2 rounded-lg bg-slate-900 px-3 py-2.5 font-mono text-[13px] text-slate-100">
                <span className="text-emerald-400">$</span> npx create-next-app@latest my-app
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-surface-2 p-2.5 ring-1 ring-border">
                  <p className="font-semibold">What it does</p>
                  <p className="mt-0.5 text-muted">Scaffolds a full project for you.</p>
                </div>
                <div className="rounded-lg bg-brand-500/5 p-2.5 ring-1 ring-brand-500/20">
                  <p className="font-semibold">Why you need it</p>
                  <p className="mt-0.5 text-muted">Best-practice setup, zero config.</p>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-2.5 py-1 text-xs font-medium text-white">
                🧸 Explain like I&apos;m 5
              </div>
            </div>
          </Reveal>

          {/* Spotlight 2: Error solver */}
          <Reveal className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1 rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-accent-900/5">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-muted">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                window is not defined
              </div>
              <div className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="font-mono text-xs text-rose-600 dark:text-rose-400">ReferenceError: window is not defined</p>
                <p className="mt-2 text-xs"><span className="font-semibold text-amber-500">Cause: </span>You used a browser-only global during server rendering.</p>
                <p className="mt-1 text-xs"><span className="font-semibold text-emerald-500">Fix: </span>Access it inside <code className="font-mono">useEffect</code>, which only runs on the client.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
                Never stay stuck
              </span>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">A built-in error solver</h3>
              <p className="mt-3 text-muted">
                Paste the error you hit and get the likely cause plus a copy-paste fix — without opening 20 browser
                tabs. The most common mistakes for each tech are built right into the learning flow.
              </p>
              <div className="mt-5">
                <ButtonLink href="/tech/nextjs/errors" variant="outline" size="sm">
                  Browse common errors →
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learning paths by level */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Adaptive difficulty"
            title="Start exactly where you are"
            description="Every topic offers three tracks, so the content meets you at your level — and grows with you."
          />
        </Reveal>
        <Reveal className="mt-12 grid gap-5 lg:grid-cols-3" stagger from="up">
          {LEVELS.map((lvl) => (
            <div key={lvl.level} className={`rounded-2xl border border-border bg-gradient-to-b ${lvl.accent} p-6 ring-1`}>
              <div className="mb-3 text-3xl">{lvl.emoji}</div>
              <h3 className="text-lg font-bold">{lvl.level}</h3>
              <p className="text-sm text-muted">{lvl.tagline}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {lvl.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <svg className="mt-0.5 size-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Comparison */}
      <section className="border-y border-border bg-surface-2">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="The difference"
              title="DevPath.hub vs. everything else"
            />
          </Reveal>
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface" from="scale">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left">
                  <th className="p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold text-muted">Tutorials &amp; roadmaps</th>
                  <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">DevPath.hub</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-muted">{row.them}</td>
                    <td className="p-4 font-medium">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Loved by learners"
            title="People are finally getting unstuck"
          />
        </Reveal>
        <Reveal className="mt-12 grid gap-5 lg:grid-cols-3" stagger from="up">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
              <div className="mb-3 text-2xl text-brand-500" aria-hidden>&ldquo;</div>
              <blockquote className="flex-1 text-sm leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: t.color }} aria-hidden>
                  {t.author.slice(0, 1)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.author}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* Active challenges */}
      <section className="border-t border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Active Challenges"
              title="Build, ship, and win"
              description="Put your skills to work in time-boxed community challenges."
            />
            <ButtonLink href="/challenges" variant="outline">
              All challenges →
            </ButtonLink>
          </Reveal>
          <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
            {challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Questions, answered"
            className="mb-10"
          />
        </Reveal>
        <Reveal from="up">
          <Faq />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal from="scale">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600 to-accent-600 px-6 py-16 text-center text-white">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Your journey from zero starts now</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Free guides, guided projects, and a community that wants you to win.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/signup" className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700 transition-transform hover:scale-[1.02]">
                  Create free account
                </Link>
                <Link href="/tech" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                  Explore guides
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
