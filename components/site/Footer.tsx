import Link from "next/link";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { href: "/tech", label: "Tech Guides" },
      { href: "/tech/nextjs/roadmap", label: "Roadmaps" },
      { href: "/tech/nextjs/projects", label: "Projects" },
      { href: "/challenges", label: "Challenges" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/tech/nextjs/errors", label: "Error Solver" },
      { href: "/tech/nextjs/tools", label: "Tool Comparisons" },
      { href: "/ai-help", label: "AI Assistant" },
      { href: "/sandbox", label: "Sandbox" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted">
              From zero to hero — every step explained, every error solved, every project built.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} DevPath.hub. Built for learners.</p>
          <p>Made with Next.js, Tailwind &amp; anime.js</p>
        </div>
      </div>
    </footer>
  );
}
