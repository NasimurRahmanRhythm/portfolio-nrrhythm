"use client";

import { useRef } from "react";
import SectionHead from "./SectionHead";
import { gsap, useGSAP } from "@/lib/gsap";

const experiences = [
  {
    role: "Software Engineer I",
    company: "ShellBeeHaken Ltd.",
    date: "Jan 2025 – Present",
    bullets: [
      "Led development of production-ready frontend and backend features using Next.js, Node.js, GraphQL, and MongoDB.",
      "Integrated an AI-powered persona chatbot with agentic and RAG capabilities.",
      "Integrated and maintained Stripe-based payment systems for subscription management and individual/company ID verification.",
      "Developed serverless functions with AWS Lambda, improving scalability and reducing infrastructure costs.",
      "Implemented caching with Redis to enhance system performance and response times.",
      "Conducted code reviews and mentored junior engineers, improving code quality and reducing bugs.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "ShellBeeHaken Ltd.",
    date: "Jan 2024 – Dec 2024",
    bullets: [
      "Built and optimized RESTful APIs and integrated frontend features for high-traffic web applications.",
      "Designed reusable components and UI enhancements using React, TypeScript, and TailwindCSS.",
      "Collaborated in Agile environment with daily standups, sprints, and version control using Git.",
    ],
  },
  {
    role: "Trainee Software Engineer",
    company: "ShellBeeHaken Ltd.",
    date: "Sep 2023 – Dec 2023",
    bullets: [
      "Contributed to backend and frontend development of multiple live platforms.",
      "Implemented real-time features using Socket.IO.",
    ],
  },
  {
    role: "Intern Software Engineer",
    company: "ShellBeeHaken Ltd.",
    date: "Jan 2023 – Jun 2023",
    bullets: [
      "Gained hands-on experience in full-stack development with Next.js, Express.js, MongoDB.",
    ],
  },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The progress rail fills as the roles scroll past.
      gsap.fromTo(
        ".exp-rail",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".exp-list", start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative bg-surface px-[var(--margin)] py-28 lg:py-40">
      <SectionHead index="03" label="Experience" title="Four roles," italic="one company" />

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Sticky summary of the path from intern to engineer */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="t-h3">{experiences[0].company}</p>
            <p className="mt-3 text-muted">
              From intern to Software Engineer I, growing with the team since {experiences[experiences.length - 1].date.split(" – ")[0]}.
            </p>
            <ol className="t-label mt-8 space-y-2 text-muted">
              {[...experiences].reverse().map((exp) => (
                <li key={exp.role} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  {exp.role}
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="exp-list relative lg:col-span-8 lg:col-start-5">
          <span className="absolute left-0 top-0 hidden h-full w-px bg-line md:block" />
          <span className="exp-rail absolute left-0 top-0 hidden h-full w-px origin-top bg-accent md:block" />

          {experiences.map((exp, i) => (
            <article key={exp.role} className="exp-row relative border-b border-line pb-12 pt-2 md:pl-12 [&:not(:first-child)]:pt-12">
              <span
                className={`absolute -left-[5px] hidden h-[11px] w-[11px] rounded-full border border-accent bg-surface md:block ${
                  i === 0 ? "top-6" : "top-[4.5rem]"
                }`}
              />
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="t-h3">{exp.role}</h3>
                <span className="t-label text-muted">{exp.date}</span>
              </div>
              <ul className="space-y-3">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4 text-muted">
                    <span className="mt-3 h-px w-4 shrink-0 bg-accent" />
                    <span className="flex-1 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
