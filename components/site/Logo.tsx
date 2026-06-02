import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-sm shadow-brand-600/30">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m13 2-3 7h6l-3 7" />
          <path d="M5 14h2M17 14h2" opacity="0.5" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        DevPath<span className="text-gradient">.hub</span>
      </span>
    </Link>
  );
}
