import type { Metadata } from "next";
import { getTechs } from "@/lib/data";
import { TechCard } from "@/components/cards/TechCard";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tech Guides",
  description: "Browse guided learning paths for every stack — setup, roadmaps, projects, errors, and tools.",
};

export default async function TechListPage() {
  const techs = await getTechs();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="All Technologies"
          title="Choose your path"
          description="Pick a stack and go from zero to shipping. Every track includes a setup guide, a roadmap, hands-on projects, an error solver, and curated tools."
        />
      </Reveal>
      <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger from="up">
        {techs.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </Reveal>
    </div>
  );
}
