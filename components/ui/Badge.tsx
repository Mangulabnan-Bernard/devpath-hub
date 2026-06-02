import { cn, levelClasses, levelLabel } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A colored badge for a difficulty level. */
export function LevelBadge({ level, className }: { level: string; className?: string }) {
  return (
    <Badge className={cn(levelClasses(level), className)}>{levelLabel(level)}</Badge>
  );
}
