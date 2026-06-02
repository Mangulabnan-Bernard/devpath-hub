import Link from "next/link";
import { Logo } from "@/components/site/Logo";

const PROVIDERS = [
  { name: "GitHub", icon: "github" },
  { name: "Google", icon: "google" },
] as const;

/**
 * Shared layout for the login/signup screens. The OAuth buttons are visual
 * placeholders in the prototype — they'll be wired to NextAuth providers later.
 */
export function AuthShell({
  mode,
}: {
  mode: "login" | "signup";
}) {
  const isSignup = mode === "signup";
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20">
      <Logo />
      <h1 className="mt-8 text-2xl font-bold">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {isSignup ? "Start your journey from zero to hero." : "Pick up where you left off."}
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-surface p-6">
        <div className="flex flex-col gap-3">
          {PROVIDERS.map((p) => (
            <button
              key={p.name}
              type="button"
              className="flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-background text-sm font-medium transition-colors hover:bg-surface-2"
            >
              <ProviderIcon name={p.icon} />
              Continue with {p.name}
            </button>
          ))}
        </div>

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <form className="flex flex-col gap-3">
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <button
            type="button"
            className="h-11 rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {isSignup ? "Create account" : "Log in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-muted">
        {isSignup ? "Already have an account? " : "New to DevPath.hub? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
          {isSignup ? "Log in" : "Create one"}
        </Link>
      </p>
    </div>
  );
}

function ProviderIcon({ name }: { name: "github" | "google" }) {
  if (name === "github") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.8c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8z" />
      <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.8L6 14.3z" />
      <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.9-2.6 3.2-4.6 6-4.6z" />
    </svg>
  );
}
