"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import type { Tech } from "@/lib/types";
import { SetupStepCard } from "./SetupStepCard";
import { RoadmapView } from "./RoadmapView";
import { ErrorSolver } from "./ErrorSolver";
import { ToolComparison } from "./ToolComparison";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";

type TabKey = "setup" | "roadmap" | "projects" | "errors" | "tools";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "setup", label: "Setup Guide", icon: "🛠️" },
  { key: "roadmap", label: "Roadmap", icon: "🗺️" },
  { key: "projects", label: "Projects", icon: "🚀" },
  { key: "errors", label: "Common Errors", icon: "🐞" },
  { key: "tools", label: "Tools", icon: "🧰" },
];

export function TechTabs({ tech, initialTab = "setup" }: { tech: Tech; initialTab?: TabKey }) {
  const [active, setActive] = useState<TabKey>(initialTab);
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate the panel in whenever the active tab changes.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(el, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 420,
      ease: "outQuad",
    });
  }, [active]);

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Tech sections"
        className="no-scrollbar sticky top-16 z-30 -mx-4 mb-8 overflow-x-auto overflow-y-hidden border-b border-border bg-background/80 px-4 backdrop-blur-md sm:mx-0 sm:px-0"
      >
        <div className="flex min-w-max gap-1">
          {TABS.map((tab) => {
            const selected = active === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors",
                  selected ? "text-brand-600 dark:text-brand-400" : "text-muted hover:text-foreground",
                )}
              >
                <span aria-hidden>{tab.icon}</span>
                {tab.label}
                {selected && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={panelRef} role="tabpanel">
        {active === "setup" && (
          <div>
            <SectionIntro title={tech.setupGuide.title} description={tech.setupGuide.description} />
            <div className="mt-8">
              {tech.setupGuide.steps.map((step) => (
                <SetupStepCard key={step.id} step={step} />
              ))}
            </div>
          </div>
        )}

        {active === "roadmap" && (
          <div>
            <SectionIntro
              title={`${tech.name} Roadmap`}
              description="A guided path from the fundamentals up. Tick off steps as you go."
            />
            <div className="mt-8">
              <RoadmapView roadmaps={tech.roadmaps} />
            </div>
          </div>
        )}

        {active === "projects" && (
          <div>
            <SectionIntro
              title={`${tech.name} Projects`}
              description="Learn by building. Each project breaks down into small, verifiable steps."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tech.projects.map((p) => (
                <ProjectCard key={p.id} project={p} techSlug={tech.slug} />
              ))}
            </div>
          </div>
        )}

        {active === "errors" && (
          <div>
            <SectionIntro
              title={`Common ${tech.name} Errors`}
              description="Search real-world errors and get the cause plus a copy-paste fix."
            />
            <div className="mt-8">
              <ErrorSolver errors={tech.errors} />
            </div>
          </div>
        )}

        {active === "tools" && (
          <div>
            <SectionIntro
              title={`${tech.name} Tools`}
              description="The ecosystem at a glance — what each tool is for, and when to reach for it."
            />
            <div className="mt-8">
              <ToolComparison tools={tech.tools} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="max-w-2xl text-muted">{description}</p>
    </div>
  );
}
