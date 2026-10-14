import Link from "next/link";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ProjectCover from "./projects/ProjectCover";
import { projects } from "@/lib/projects";
import { kriya } from "@/lib/kriya";

export default function Projects() {
  const [flagship, ...rest] = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative px-[var(--margin)] py-28 lg:py-40">
      <SectionHead index="04" label="Projects" title="Selected" italic="work" />

      {/* Flagship: Kriya AI */}
      <Reveal>
        <Link
          href={`/projects/${flagship.slug}`}
          className="group grain relative block overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent sm:p-10 lg:p-14"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 85% 20%, var(--accent-glow), transparent 55%)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="t-label mb-6 flex flex-wrap items-center gap-3 text-muted">
                <span className="rounded-full bg-accent px-3 py-1 text-bone">Featured</span>
                {flagship.context} · Private · {flagship.year}
              </p>
              <h3 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-tight">
                {flagship.name}
              </h3>
              <p className="t-h3 mt-3 italic text-accent">AI Marketing Co-pilot</p>
              <p className="mt-6 max-w-xl text-muted">{flagship.summary}</p>
              <p className="t-label mt-10 inline-flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2">
                Read the case study <span className="text-accent">→</span>
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
              {kriya.impact.map((m) => (
                <div key={m.label} className="bg-surface p-5">
                  <dt className="t-label text-muted">{m.label}</dt>
                  <dd className="mt-2 whitespace-nowrap font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-none tracking-tight">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Link>
      </Reveal>

      {/* Showcase */}
      <div className="mt-24 space-y-24 lg:mt-32 lg:space-y-36">
        {rest.map((project, i) => (
          <Reveal key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <ProjectCover project={project} />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <p className="t-label mb-4 text-accent">
                  {String(i + 2).padStart(2, "0")} <span className="text-muted">/ {project.year}</span>
                </p>
                <h3 className="t-h1 transition-colors duration-500 group-hover:text-accent">{project.name}</h3>
                <p className="t-h5 mt-3 italic text-muted">{project.tagline}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="t-label mt-8 inline-flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2">
                  View project <span className="text-accent">→</span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Everything else */}
      <div className="mt-28 lg:mt-40">
        <p className="t-label mb-6 text-muted">More work</p>
        <Reveal as="ul" className="border-t border-line">
          {more.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid items-baseline gap-2 border-b border-line py-6 transition-colors duration-500 hover:text-accent md:grid-cols-12"
              >
                <span className="t-h3 md:col-span-4">{project.name}</span>
                <span className="text-muted md:col-span-5">{project.tagline}</span>
                <span className="t-label text-muted md:col-span-2">{project.context ?? project.year}</span>
                <span className="hidden text-right transition-transform duration-500 group-hover:translate-x-1 md:col-span-1 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
