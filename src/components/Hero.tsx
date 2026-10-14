"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import SplitTitle from "./SplitTitle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const LINE = "block font-display text-[clamp(3.6rem,10.5vw,11.5rem)] leading-[0.86] tracking-[-0.045em]";

const WORDS = ["full-stack products", "GenAI pipelines", "3D web experiences", "scalable APIs"];

// Cycles through WORDS, each one sliding up out of a mask.
function RotatingWord() {
  const root = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(".rw-word", { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out" });
    },
    { scope: root, dependencies: [index] },
  );

  return (
    <span ref={root} className="line-mask inline-block align-bottom">
      <span key={index} className="rw-word font-serif italic text-accent">
        {WORDS[index]}
      </span>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useGSAP(
    () => {
      const scroll = { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true };

      ScrollTrigger.create({ ...scroll, onUpdate: (self) => (progress.current = self.progress) });

      // The name lines drift apart while the windows scatter behind them.
      gsap.to(".hero-l1", { xPercent: -10, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-l2", { xPercent: 8, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-meta", { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...scroll, end: "45% bottom" } });

      const intro = gsap.from(".hero-in", {
        y: 28,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
        paused: true,
      });
      return onReady(() => intro.play());
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[170vh]">
      <div className="grain sticky top-0 h-svh overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 72% 45%, var(--accent-glow), transparent 60%)" }}
        />

        {mounted && (
          <HeroScene
            progress={progress}
            dark={resolvedTheme !== "light"}
            className="pointer-events-none absolute inset-0"
          />
        )}

        <div className="hero-meta pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-between px-[var(--margin)]">
          <p className="hero-in t-label text-muted">
            ( Portfolio · {new Date().getFullYear()} )
          </p>
          <p className="hero-in t-label hidden items-center gap-2 text-muted sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Available for new opportunities
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-[6svh] z-10 px-[var(--margin)]">
          <h1 className="pointer-events-none mb-8 lg:mb-10">
            <span className="hero-l1 block">
              <SplitTitle text="Md. Nasimur" className={LINE} when="ready" />
            </span>
            <span className="hero-l2 ml-[0.6em] block lg:ml-[1.4em]">
              <SplitTitle text="Rahman" className={`${LINE} font-serif italic`} when="ready" delay={0.15} />
            </span>
          </h1>

          <div className="hero-meta grid gap-6 lg:grid-cols-12 lg:items-end">
            <p className="hero-in t-h3 lg:col-span-6">
              Software Engineer who builds <br className="hidden sm:block" />
              <RotatingWord />
            </p>

            <p className="hero-in max-w-md text-muted lg:col-span-4">
              Over three years shipping production work at ShellBeeHaken with React, Next.js and Node.js, from
              payments and real-time systems to brand-aware GenAI content pipelines.
            </p>

            <div className="hero-in flex flex-wrap gap-3 lg:col-span-2 lg:flex-col lg:items-end">
              <a
                href="#projects"
                className="t-label rounded-full bg-fg px-5 py-3 text-bg transition-colors hover:bg-accent hover:text-bone"
              >
                View work ↓
              </a>
              <a
                href={site.resume}
                download="Md-Nasimur-Rahman-Resume.pdf"
                className="t-label rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
