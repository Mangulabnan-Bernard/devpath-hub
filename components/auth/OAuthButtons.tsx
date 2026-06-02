"use client";

import { signIn } from "next-auth/react";

export function OAuthButtons({ github, google }: { github: boolean; google: boolean }) {
  if (!github && !google) {
    return (
      <p className="rounded-lg border border-dashed border-border px-3 py-2.5 text-center text-xs text-muted">
        Social login isn&apos;t configured yet — use email &amp; password below.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {github && (
        <button
          type="button"
          onClick={() => signIn("github", { redirectTo: "/dashboard" })}
          className="flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-background text-sm font-medium transition-colors hover:bg-surface-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.8c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          Continue with GitHub
        </button>
      )}
      {google && (
        <button
          type="button"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className="flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-background text-sm font-medium transition-colors hover:bg-surface-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8z" />
            <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.8L6 14.3z" />
            <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.9-2.6 3.2-4.6 6-4.6z" />
          </svg>
          Continue with Google
        </button>
      )}
    </div>
  );
}
