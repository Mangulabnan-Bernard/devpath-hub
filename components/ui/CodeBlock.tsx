import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

/** A dark, copyable code block with an optional filename/label header. */
export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 text-slate-100",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-700/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          {label && <span className="ml-2 font-mono text-xs text-slate-400">{label}</span>}
        </div>
        <CopyButton value={code} />
      </div>
      <pre className="code-scroll overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
