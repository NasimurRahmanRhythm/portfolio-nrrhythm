import { ogCard, ogSize } from "@/lib/og";
import { getProject, projects } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project";

export function generateStaticParams() {
  return projects.filter((p) => p.slug !== "kriya-ai").map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return ogCard({
    label: ["Project", project.context, project.year].filter(Boolean).join(" · "),
    title: project.name,
    accent: project.tagline,
  });
}
