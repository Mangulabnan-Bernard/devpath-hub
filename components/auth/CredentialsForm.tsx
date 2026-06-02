"use client";

import { useActionState } from "react";
import { loginAction, signupAction, type AuthState } from "@/app/(auth)/actions";

const inputCls =
  "h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function CredentialsForm({ mode }: { mode: "login" | "signup" }) {
  const action = mode === "signup" ? signupAction : loginAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state?.error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400">
          {state.error}
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
