"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Experience cards animation
      gsap.utils.toArray(".exp-card").forEach((card: unknown, i) => {
        const cardElem = card as HTMLElement;
        // Alternate slide in from left/right based on index (even = left, odd = right)
        // For mobile, always slide up
        const isDesktop = window.innerWidth > 768;
        const xOffset = isDesktop ? (i % 2 === 0 ? -50 : 50) : 0;
        const yOffset = isDesktop ? 0 : 50;

        gsap.fromTo(
          cardElem,
          { x: xOffset, y: yOffset, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardElem,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section bg-[var(--bg-card)] border-y border-[var(--border)] relative"
    >
      <h2 className="section-title">Work Experience</h2>
      <div className="section-line"></div>

      <div className="relative mt-12 md:mt-20">
        {/* Vertical Timeline Line (Desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] -translate-x-1/2">
          <div className="timeline-line w-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)] origin-top"></div>
        </div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline Dot (Desktop only) */}
              <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--bg-card)] border-4 border-[var(--border)] z-10 items-center justify-center transition-colors duration-300">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2">
                <div
                  className={`exp-card card p-8 relative ${idx % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                >
                  {/* Small pointer triangle */}
                  <div
                    className={`hidden md:block absolute top-10 w-4 h-4 bg-[var(--bg-card)] border-t border-l border-[var(--border)] rotate-45 ${idx % 2 === 0 ? "-right-2 border-l-0 border-b" : "-left-2 border-r-0 border-b-0"}`}
                  ></div>

                  <div className="flex items-center gap-3 text-[var(--accent)] mb-2 font-semibold">
                    <Briefcase size={18} />
                    <span>{exp.company}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-[var(--fg)]">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-6 font-medium">
                    <Calendar size={14} />
                    <span>{exp.date}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-[var(--fg-muted)] leading-relaxed text-sm flex gap-3"
                      >
                        <span className="text-[var(--accent)] mt-1.5 opacity-60">
                          ▹
                        </span>
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
