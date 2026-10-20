import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitTitle from "@/components/SplitTitle";
import Reveal from "@/components/Reveal";
import ProjectCover from "@/components/projects/ProjectCover";
import NextProject from "@/components/projects/NextProject";
import { getProject, nextProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// Kriya AI has its own hand-built case study at /projects/kriya-ai.
export function generateStaticParams() {
  return projects.filter((p) => p.slug !== "kriya-ai").map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", url: `/projects/${project.slug}`, title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = nextProject(project.slug);

  const links = [
    project.links.live && { label: "Visit live site", href: project.links.live },
    project.links.source && { label: "View source", href: project.links.source },
    ...(project.links.extra ?? []),
  ].filter(Boolean) as { label: string; href: string }[];

  const meta = [
    { label: "Role", value: project.role },
    project.context && { label: "Company", value: project.context },
    project.year && { label: "Year", value: project.year },
    { label: "Stack", value: project.tech.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <header className="px-[var(--margin)] pb-16 pt-36 lg:pt-44">
        <p className="t-label mb-10 text-muted">
          <Link href="/#projects" className="link-u">
            ← All projects
          </Link>
        </p>
        <h1>
          <SplitTitle
            text={project.name}
            when="ready"
            className="block font-display text-[clamp(3.2rem,10vw,10rem)] leading-[0.88] tracking-[-0.04em]"
          />
        </h1>
        <p className="t-h3 mt-6 max-w-3xl italic text-accent">{project.tagline}</p>
      </header>

      {project.cover && (
        <div className="px-[var(--margin)]">
          <ProjectCover project={project} priority />
        </div>
      )}

      <section className="grid gap-12 px-[var(--margin)] py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="t-label mb-6 text-muted">Overview</p>
          <p className="t-h5 leading-snug">{project.summary}</p>
          {links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`t-label rounded-full px-5 py-3 transition-colors ${
                    i === 0
                      ? "bg-fg text-bg hover:bg-accent hover:text-bone"
                      : "border border-line hover:border-accent hover:text-accent"
                  }`}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <dl className="space-y-5 lg:col-span-4 lg:col-start-9">
          {meta.map((m) => (
            <div key={m.label} className="border-b border-line pb-4">
              <dt className="t-label text-muted">{m.label}</dt>
              <dd className="mt-1">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {project.highlights && (
        <section className="bg-surface px-[var(--margin)] py-20 lg:py-28">
          <p className="t-label mb-10 text-muted">What I built</p>
          <Reveal className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {project.highlights.map((h, i) => (
              <div key={h.title} className="bg-surface p-8 lg:p-10">
                <p className="t-label text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="t-h3 mt-3">{h.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{h.body}</p>
              </div>
            ))}
          </Reveal>
        </section>
      )}

      <NextProject slug={next.slug} name={next.name} />
    </article>
  );
}
