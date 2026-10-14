"use client";

import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Java"],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "React Native (Expo)",
      "Tailwind CSS",
      "Zustand",
      "i18next",
      "GSAP",
      "Three.js / React Three Fiber",
      "Motion",
      "Recharts",
    ],
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "GraphQL", "REST", "Socket.IO", "Zod"],
  },
  {
    title: "AI & LLMs",
    skills: ["Google Vertex AI", "Gemini", "Veo", "LangChain", "LangGraph", "RAG chatbots", "Prompt engineering"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "Payments & Integrations",
    skills: ["Stripe", "SSLCommerz", "Meta Graph API", "YouTube Data API", "TikTok API", "Cloudinary"],
  },
  {
    title: "Cloud & Tools",
    skills: ["AWS Lambda", "AWS Elastic Beanstalk", "Vercel", "Kubernetes", "Firebase", "Git", "Vitest"],
  },
];

export default function Skills() {
  const all = skillCategories.flatMap((c) => c.skills);

  return (
    <section id="skills" className="relative overflow-hidden py-28 lg:py-40">
      <div className="px-[var(--margin)]">
        <SectionHead index="02" label="Skills" title="Tools I" italic="build with" />
      </div>

      <div className="mb-20 overflow-hidden border-y border-line py-6" aria-hidden="true">
        <div className="marquee">
          {[...all, ...all].map((skill, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 font-serif text-4xl italic text-muted lg:text-6xl">
              {skill}
              <span className="ml-12 h-2 w-2 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <Reveal as="ul" className="border-t border-line px-[var(--margin)]">
        {skillCategories.map((category, i) => (
          <li key={category.title} className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:py-10">
            <div className="lg:col-span-3">
              <p className="t-label text-accent">0{i + 1}</p>
              <h3 className="t-h5 mt-2">{category.title}</h3>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-9">
              {category.skills.map((skill) => (
                <li key={skill} className="t-h3 text-muted transition-colors duration-300 hover:text-fg">
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
