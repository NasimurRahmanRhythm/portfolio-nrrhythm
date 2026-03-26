"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, Globe, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up content
      gsap.fromTo(
        ".about-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-[var(--bg-card)] border-y border-[var(--border)] relative overflow-hidden mt-20"
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-2)] rounded-full blur-[100px] opacity-[0.03] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <h2 className="section-title about-content">About Me</h2>
      <div className="section-line about-content"></div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="about-content">
          <p className="text-base leading-relaxed text-[var(--fg-muted)] mb-6 font-sans">
            I&apos;m a full-stack developer skilled in{" "}
            <strong className="text-[var(--fg)] font-semibold">
              React, Next.js, Node.js, Express, and MongoDB
            </strong>
            , with deep expertise in server-side rendering (SSR), client-side
            optimization, and seamless API integration.
          </p>
          <p className="text-base leading-relaxed text-[var(--fg-muted)] mb-6 font-sans">
            Over my career, I&apos;ve proven my ability to deliver high-quality
            production features, working in Agile environments. I am proficient
            in integrating{" "}
            <strong className="text-[var(--fg)] font-semibold">
              Stripe payments, AWS Lambda, and Redis caching
            </strong>{" "}
            to build robust and scalable applications. I also bring an AI edge,
            with experience in building agentic RAG-powered chatbots and
            high-performance, data-driven architectures.
          </p>
          <p className="text-base leading-relaxed text-[var(--fg-muted)] font-sans">
            I thrive on performance optimization and writing clean, maintainable
            code that stands the test of time. I also have extensive experience
            tackling complex UI/UX challenges, bringing even the most intricate
            and demanding frontend designs to life with precision and fluid
            animations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 about-content">
          <div className="card p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center mb-2">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-[var(--fg)] text-lg">
              Frontend Engineering
            </h3>
            <p className="text-sm text-[var(--fg-muted)]">
              Next.js, React, Tailwind CSS, GSAP
            </p>
          </div>

          <div className="card p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center mb-2">
              <Server size={24} />
            </div>
            <h3 className="font-bold text-[var(--fg)] text-lg">
              Backend Systems
            </h3>
            <p className="text-sm text-[var(--fg-muted)]">
              Node.js, GraphQL, MongoDB, PostgreSQL
            </p>
          </div>

          <div className="card p-6 flex flex-col items-center text-center gap-3 sm:col-span-2">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center mb-2">
              <BrainCircuit size={24} />
            </div>
            <h3 className="font-bold text-[var(--fg)] text-lg">
              Cloud & Architecture
            </h3>
            <p className="text-sm text-[var(--fg-muted)]">
              AWS Lambda, Redis Caching, AI Chatbot Architecture, Kubernetes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
