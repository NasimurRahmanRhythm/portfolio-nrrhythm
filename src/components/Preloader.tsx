"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { setReady } from "@/lib/ready";
import { site } from "@/lib/site";

const SEEN = "preloader-seen";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN) === "1";
        sessionStorage.setItem(SEEN, "1");
      } catch {}

      // Once per visit, and never for people who asked for less motion.
      if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReady();
        setDone(true);
        return;
      }

      const state = { v: 0 };
      gsap
        .timeline({ onComplete: () => setDone(true) })
        .from(".pl-line > span", { yPercent: 110, duration: 0.9, stagger: 0.08, ease: "power3.out" })
        .to(
          state,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".pl-line > span", { yPercent: -110, duration: 0.6, stagger: 0.05, ease: "power3.in" }, "+=0.1")
        .add(() => setReady())
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink p-[var(--margin)] text-bone"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <span className="t-label opacity-50">
        {site.role} · {site.location}
      </span>
      <div className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
        <span className="pl-line line-mask">
          <span>Md. Nasimur</span>
        </span>
        <span className="pl-line line-mask pl-[0.6em]">
          <span className="font-serif italic">Rahman</span>
        </span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="relative h-px flex-1 bg-bone/15">
          <span className="pl-bar absolute inset-0 origin-left scale-x-0 bg-bone" />
        </div>
        <span ref={count} className="t-h5 tabular-nums">
          000
        </span>
      </div>
    </div>
  );
}
