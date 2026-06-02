import type { Tool } from "@/lib/types";

/**
 * Side-by-side tool comparison. Renders as a table on desktop and stacks into
 * cards on small screens.
 */
export function ToolComparison({ tools }: { tools: Tool[] }) {
  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-2 text-left">
              <Th>Tool</Th>
              <Th>Purpose</Th>
              <Th>Why use it</Th>
              <Th>Alternatives</Th>
              <Th>Best for</Th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.id} className="border-t border-border align-top">
                <td className="p-4">
                  <div className="font-semibold">{tool.name}</div>
                  {tool.docsUrl && (
                    <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline dark:text-brand-400">
                      Docs ↗
                    </a>
                  )}
                </td>
                <td className="p-4 text-muted">{tool.purpose}</td>
                <td className="p-4 text-muted">{tool.whyUseIt}</td>
                <td className="p-4 text-muted">{tool.alternatives}</td>
                <td className="p-4 text-muted">{tool.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {tools.map((tool) => (
          <div key={tool.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{tool.name}</h3>
              <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted ring-1 ring-border">{tool.purpose}</span>
            </div>
            <dl className="mt-3 flex flex-col gap-2.5 text-sm">
              <Row label="Why use it">{tool.whyUseIt}</Row>
              <Row label="Alternatives">{tool.alternatives}</Row>
              <Row label="Best for">{tool.bestFor}</Row>
            </dl>
            {tool.docsUrl && (
              <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-brand-600 hover:underline dark:text-brand-400">
                Read the docs ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted">{children}</th>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}
