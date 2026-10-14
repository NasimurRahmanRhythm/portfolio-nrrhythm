"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const PIPELINE = [
  { step: "Brand Kit", detail: "Tone, audience, colours, logo, language" },
  { step: "Strategy", detail: "Multi-week content calendar" },
  { step: "Visual brief", detail: "Brand visual signature + per-post brief" },
  { step: "Generate", detail: "Gemini · Gemini Image · Veo 3.1" },
  { step: "Validate", detail: "Schema-enforced JSON + Zod repair" },
  { step: "Publish", detail: "Facebook · Instagram · LinkedIn · YouTube · TikTok" },
  { step: "Measure", detail: "Insights sync + analytics dashboard" },
];

// The content pipeline as a vertical rail; each stage lights up as it scrolls in.
export default function KriyaPipeline({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".kp-rail",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".kp-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: { trigger: step, start: "top 72%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative">
      <span className="absolute bottom-3 left-[7px] top-3 w-px bg-line" />
      <span className="kp-rail absolute bottom-3 left-[7px] top-3 w-px origin-top bg-accent" />
      {PIPELINE.map((p, i) => (
        <li key={p.step} className={`kp-step relative flex gap-5 ${compact ? "py-2.5" : "py-4"}`}>
          <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border border-accent bg-bg">
            <span className="absolute inset-[4px] rounded-full bg-accent" />
          </span>
          <div>
            <p className="t-label text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className={compact ? "t-h5" : "t-h3"}>{p.step}</p>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
