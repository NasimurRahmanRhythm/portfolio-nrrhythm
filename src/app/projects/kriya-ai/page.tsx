import type { Metadata } from "next";
import Link from "next/link";
import SplitTitle from "@/components/SplitTitle";
import Reveal from "@/components/Reveal";
import KriyaPipeline from "@/components/projects/KriyaPipeline";
import NextProject from "@/components/projects/NextProject";
import { getProject, nextProject } from "@/lib/projects";
import { kriya } from "@/lib/kriya";

const project = getProject("kriya-ai")!;

export const metadata: Metadata = {
  title: `${project.title} | Md. Nasimur Rahman`,
  description: project.summary,
};

export default function KriyaCaseStudy() {
  const next = nextProject(project.slug);

  return (
    <article>
      {/* Hero */}
      <header className="grain relative overflow-hidden px-[var(--margin)] pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 80% 10%, var(--accent-glow), transparent 55%)" }}
        />
        <p className="t-label relative mb-10 flex flex-wrap items-center gap-3 text-muted">
          <Link href="/#projects" className="link-u">
            ← All projects
          </Link>
          <span className="rounded-full bg-accent px-3 py-1 text-bone">Case study</span>
          ShellBeeHaken · Private
        </p>
        <h1 className="relative">
          <SplitTitle
            text="Kriya AI"
            when="ready"
            className="block font-display text-[clamp(4rem,14vw,15rem)] leading-[0.85] tracking-[-0.045em]"
          />
          <span className="ml-[0.4em] block">
            <SplitTitle
              text="AI Marketing Co-pilot"
              when="ready"
              delay={0.15}
              className="font-serif text-[clamp(2rem,6vw,6rem)] italic leading-[0.95] text-accent"
            />
          </span>
        </h1>

        <div className="relative mt-16 grid gap-12 lg:grid-cols-12">
          <p className="t-h3 lg:col-span-7">{project.tagline} {project.summary}</p>
          <dl className="space-y-5 lg:col-span-4 lg:col-start-9">
            {kriya.meta.map((m) => (
              <div key={m.label} className="border-b border-line pb-4">
                <dt className="t-label text-muted">{m.label}</dt>
                <dd className="mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Impact */}
      <section className="border-y border-line bg-surface px-[var(--margin)] py-16">
        <Reveal className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {kriya.impact.map((m) => (
            <div key={m.label}>
              <p className="whitespace-nowrap font-display text-[clamp(2rem,4.2vw,4rem)] leading-none tracking-tight">{m.value}</p>
              <p className="t-label mt-3 max-w-[16rem] text-muted">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Product + pipeline */}
      <section className="grid gap-16 px-[var(--margin)] py-28 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-5">
          <p className="t-label mb-6 text-muted">
            <span className="text-accent">(01)</span> The product
          </p>
          <div className="lg:sticky lg:top-28">
            <h2 className="t-h1 mb-8">
              From one Brand Kit to a <span className="italic text-accent">full content calendar</span>
            </h2>
            <div className="space-y-5 text-muted">
              {kriya.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-label mb-6 text-muted">How a post is made</p>
          <KriyaPipeline />
        </div>
      </section>

      {/* Workstreams */}
      {kriya.workstreams.map((ws, w) => (
        <section key={ws.title} className={`px-[var(--margin)] py-28 lg:py-40 ${w % 2 === 0 ? "bg-surface" : ""}`}>
          <header className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12">
            <p className="t-label text-muted lg:col-span-3">
              <span className="text-accent">({String(w + 2).padStart(2, "0")})</span> What I built
            </p>
            <div className="lg:col-span-9">
              <h2 className="t-h1">{ws.title}</h2>
              <p className="t-h5 mt-6 max-w-3xl text-muted">{ws.lead}</p>
            </div>
          </header>
          <Reveal as="ol" className="border-t border-line lg:ml-[25%]">
            {ws.items.map((item, i) => (
              <li key={item.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-12">
                <span className="t-label text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h5 md:col-span-4">{item.title}</h3>
                <p className="leading-relaxed text-muted md:col-span-7">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </section>
      ))}

      {/* Stack */}
      <section className="px-[var(--margin)] py-28 lg:py-40">
        <header className="mb-16 grid gap-6 lg:grid-cols-12">
          <p className="t-label text-muted lg:col-span-3">
            <span className="text-accent">(04)</span> Stack
          </p>
          <h2 className="t-h1 lg:col-span-9">
            Built with <span className="italic text-accent">care</span>
          </h2>
        </header>
        <Reveal as="ul" className="border-t border-line">
          {kriya.stack.map((s) => (
            <li key={s.group} className="grid gap-3 border-b border-line py-6 lg:grid-cols-12">
              <span className="t-label text-muted lg:col-span-3">{s.group}</span>
              <span className="t-h5 lg:col-span-9">{s.items.join(" · ")}</span>
            </li>
          ))}
        </Reveal>
        <p className="t-label mt-10 text-muted">
          Private company work, so there is no public link, code or screenshots.
        </p>
      </section>

      <NextProject slug={next.slug} name={next.name} />
    </article>
  );
}
