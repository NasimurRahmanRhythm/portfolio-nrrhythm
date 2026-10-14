"use client";

import { useRef } from "react";
import SplitTitle from "./SplitTitle";
import Reveal from "./Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, socials } from "@/lib/site";

// Round button that leans toward the pointer while it hovers nearby.
function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <a
      ref={ref}
      href={href}
      className="t-label flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-accent text-center text-bone transition-colors duration-500 hover:bg-fg hover:text-bg lg:h-44 lg:w-44"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="grain relative overflow-hidden px-[var(--margin)] py-28 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 20% 80%, var(--accent-glow), transparent 55%)" }}
      />

      <p className="t-label relative mb-10 text-muted">
        <span className="text-accent">(06)</span> Contact
      </p>

      <h2 className="relative">
        <SplitTitle text="Let's build" className="block font-display text-[clamp(3.4rem,11vw,12rem)] leading-[0.86] tracking-[-0.045em]" />
        <span className="ml-[0.5em] block">
          <SplitTitle
            text="something."
            className="font-serif text-[clamp(3.4rem,11vw,12rem)] italic leading-[0.86] tracking-[-0.03em] text-accent"
            delay={0.1}
          />
        </span>
      </h2>

      <Reveal className="relative mt-16 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="t-h5 max-w-lg text-muted">
            Whether you have a question, a project or a role in mind, or just want to say hi, my inbox is open. I&apos;ll
            get back to you as soon as I can.
          </p>
          <a href={`mailto:${site.email}`} className="t-h3 link-u mt-8 inline-block break-all">
            {site.email}
          </a>
        </div>

        <ul className="lg:col-span-3 lg:col-start-8">
          {socials.map((s) => (
            <li key={s.name} className="border-b border-line">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 transition-colors hover:text-accent"
              >
                <span className="t-h5">{s.name}</span>
                <span className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex lg:col-span-2 lg:col-start-11 lg:justify-end">
          <MagneticLink href={`mailto:${site.email}`}>
            Say
            <br />
            hello
          </MagneticLink>
        </div>
      </Reveal>
    </section>
  );
}
