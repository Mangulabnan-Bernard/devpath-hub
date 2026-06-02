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
  if (!tech) return { title: "Not found" };
  return {
    title: tech.name,
    description: tech.description,
  };
}

export default async function TechOverviewPage({ params }: Params) {
  const { slug } = await params;
  const tech = await getTechBySlug(slug);
  if (!tech) notFound();

  return <TechPageShell tech={tech} initialTab="setup" />;
}
