import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { CredentialsForm } from "@/components/auth/CredentialsForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { enabledOAuth } from "@/lib/auth";

/** Shared layout for the login/signup screens. */
export function AuthShell({ mode }: { mode: "login" | "signup" }) {
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
        <OAuthButtons github={enabledOAuth.github} google={enabledOAuth.google} />

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <CredentialsForm mode={mode} />
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
