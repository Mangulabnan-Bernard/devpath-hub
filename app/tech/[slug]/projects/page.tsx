import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTechBySlug, allTechSlugs } from "@/lib/data";
import { TechPageShell } from "@/components/tech/TechPageShell";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allTechSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechBySlug(slug);
  return { title: tech ? `${tech.name} Projects` : "Not found" };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const tech = await getTechBySlug(slug);
  if (!tech) notFound();
  return <TechPageShell tech={tech} initialTab="projects" />;
}
