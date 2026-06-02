"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMyBookmarkedProjects, toggleProjectBookmark } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function BookmarkButton({ projectId }: { projectId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    let active = true;
    getMyBookmarkedProjects().then((ids) => {
      if (active) setBookmarked(ids.includes(projectId));
    });
    return () => {
      active = false;
    };
  }, [status, projectId]);

  async function onClick() {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    setPending(true);
    setBookmarked((b) => !b); // optimistic
    const res = await toggleProjectBookmark(projectId);
    if (res.ok) setBookmarked(res.bookmarked);
    setPending(false);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={bookmarked}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors disabled:opacity-60",
        bookmarked
          ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400"
          : "border-border bg-surface text-foreground hover:bg-surface-2",
      )}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
