import Image from "next/image";
import type { Project } from "@/lib/projects";

// Screenshot of the project, or a typographic placeholder until one exists.
export default function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="grain relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.name} screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-cubic group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <span className="t-label text-muted">{project.tech.slice(0, 3).join(" · ")}</span>
          <span className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight">
            {project.name}
          </span>
        </div>
      )}
    </div>
  );
}
