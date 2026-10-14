"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code, FolderGit2 } from "lucide-react";
import SectionHead from "./SectionHead";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FAM (AI-Powered Nutrition & Learning Platform)",
    description:
      "A full-stack nutrition and learning platform featuring AI-powered RAG chatbots, Stripe subscriptions, and AWS Lambda-driven event notifications.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS Lambda"],
    sourceUrl: "",
    demoUrl: "",
  },
  {
    title: "Kriyakarak (Service Marketplace Platform)",
    description:
      "A service marketplace platform connecting users across Bangladesh, featuring real-time messaging with Socket.IO and optimized REST APIs.",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.IO"],
    sourceUrl: "",
    demoUrl: "https://kriyakarak.com/",
  },
  {
    title: "Honnemiru (Japanese Video-Based Survey Platform)",
    description:
      "A Japanese video-based survey platform with advanced survey creation, filtering, and optimized GraphQL-powered backend workflows.",
    tech: ["Next.js", "TypeScript", "GraphQL"],
    sourceUrl: "",
    demoUrl: "https://shellbeehaken.com/portfolio/5",
  },
  {
    title: "Mapage (Salon Management Platform)",
    description:
      "A comprehensive salon management dashboard featuring job and notification modules, administrative workflows, and streamlined communication.",
    tech: ["React", "Node.js", "MongoDB"],
    sourceUrl: "",
    demoUrl: "https://introduction.mapage.net/",
  },
  {
    title: "Personal Portfolio",
    description:
      "A high-performance personal portfolio showcasing full-stack projects, technical expertise, and modern frontend animations using GSAP.",
    tech: ["Next.js", "GSAP", "Tailwind CSS"],
    sourceUrl: "https://github.com/NasimurRahmanRhythm/portfolio-nrrhythm",
    demoUrl: "",
  },
  {
    title: "Twitter Clone (Social Media App)",
    description:
      "A scalable social media platform featuring real-time messaging, CRUD social interactions, and optimized backend performance with Socket.IO.",
    tech: ["Next.js", "MongoDB", "Socket.IO"],
    sourceUrl: "https://github.com/NasimurRahmanRhythm/Twitter-Clone-Project",
    demoUrl: "",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden px-[var(--margin)] py-28 lg:py-40"
    >
      <SectionHead index="04" label="Projects" title="Selected" italic="work" />

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card card p-8 group h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center">
                <FolderGit2 size={24} />
              </div>
              <div className="flex gap-4 text-[var(--fg-muted)]">
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors"
                    aria-label="View Source"
                  >
                    <Code size={20} />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors"
                    aria-label="View Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>

            <p className="text-[var(--fg-muted)] leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
              {project.tech.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs font-mono font-medium text-[var(--accent)] bg-[var(--accent-glow)] px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
