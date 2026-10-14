"use client";

import { useRef } from "react";
import Image from "next/image";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { gsap, useGSAP } from "@/lib/gsap";

const STATEMENT =
  "I build products end to end: fast, accessible interfaces, solid APIs underneath, and lately the GenAI systems that turn a brand into a content engine. I care about clean code, measurable results and the small details that make a page feel alive.";

const focus = [
  {
    title: "Frontend Engineering",
    body: "Next.js, React and TypeScript with SSR, client-side performance work and fluid GSAP / Three.js motion.",
  },
  {
    title: "Backend Systems",
    body: "Node.js, Express, GraphQL and REST over MongoDB, PostgreSQL and Supabase, with Redis caching and real-time Socket.IO.",
  },
  {
    title: "AI, Cloud & Payments",
    body: "Agentic RAG chatbots, Vertex AI pipelines, AWS Lambda, Stripe and SSLCommerz integrations.",
  },
];

const stats = [
  { value: "3+", label: "Years in production" },
  { value: "1,100+", label: "Problems solved" },
  { value: "7.5", label: "IELTS band" },
  { value: "IEEE", label: "Published research" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Words brighten one by one as the statement scrolls through the viewport.
      gsap.fromTo(
        ".about-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.fromTo(
        ".about-photo",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".about-frame", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative px-[var(--margin)] py-28 lg:py-40">
      <SectionHead index="01" label="About" title="Engineer with a" italic="designer's eye" />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="about-frame relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-surface lg:col-span-4 lg:max-w-none">
          <Image
            src="/assets/profile.jpg"
            alt="Md. Nasimur Rahman"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="about-photo scale-[1.18] object-cover"
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="about-statement t-h3 mb-16">
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} className="about-word">
                {word}{" "}
              </span>
            ))}
          </p>

          <Reveal as="ol" className="border-t border-line">
            {focus.map((item, i) => (
              <li key={item.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-12">
                <span className="t-label text-accent sm:col-span-1">0{i + 1}</span>
                <h3 className="t-h5 sm:col-span-4">{item.title}</h3>
                <p className="text-muted sm:col-span-7">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight">{s.value}</p>
            <p className="t-label mt-3 text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
