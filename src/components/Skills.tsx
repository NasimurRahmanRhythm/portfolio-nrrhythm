"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "C/C++", "Java", "Python"],
  },
  {
    title: "Web Technologies",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "React Native",
      "Stripe",
      "Tailwind CSS",
      "Socket.IO",
      "React GSAP",
    ],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    title: "Cloud & Tools",
    skills: ["AWS Lambda", "Kubernetes", "Git", "Firebase"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animate skill categories
      gsap.fromTo(
        ".skill-category",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stagger animate individual skill tags inside each category
      gsap.utils.toArray(".skill-category").forEach((category: unknown) => {
        const catElem = category as HTMLElement;
        const tags = catElem.querySelectorAll(".skill-tag");

        gsap.fromTo(
          tags,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: catElem,
              start: "top 85%",
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
      id="skills"
      ref={sectionRef}
      className="section bg-[var(--bg)] relative overflow-hidden"
    >
      <h2 className="section-title">Technical Skills</h2>
      <div className="section-line"></div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-category card p-8 h-full">
            <h3 className="text-xl font-bold mb-6 text-[var(--fg)] flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center text-sm font-black">
                0{idx + 1}
              </span>
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="skill-tag tag bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
