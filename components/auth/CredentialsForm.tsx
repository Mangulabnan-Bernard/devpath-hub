"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/(auth)/actions";

const inputCls =
  "h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function CredentialsForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    // Sign up first (creates the user), then sign in.
    if (mode === "signup") {
      const res = await signupAction(formData);
      if (!res.ok) {
        setError(res.error);
        setPending(false);
        return;
      }
    }

    // Client-side sign-in so `useSession` (and the navbar) update immediately.
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError(mode === "signup" ? "Account created — please log in." : "Invalid email or password.");
      setPending(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
      {mode === "signup" && (
        <input name="name" type="text" placeholder="Name (optional)" className={inputCls} autoComplete="name" />
      )}
      <input name="email" type="email" required placeholder="Email" className={inputCls} autoComplete="email" />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className={inputCls}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
      />
      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
