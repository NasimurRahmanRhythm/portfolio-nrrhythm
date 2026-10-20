"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay between direct children, which animate one after another. */
  stagger?: number;
  as?: "div" | "ul" | "ol";
};

// Fades its children up once they scroll into view.
export default function Reveal({ children, className = "", stagger = 0.08, as: Tag = "div" }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = Array.from(root.current!.children);
      if (prefersReducedMotion()) return;
      gsap.set(items, { y: 40, opacity: 0 });
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(items, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger });
          io.disconnect();
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(root.current!);
      return () => io.disconnect();
    },
    { scope: root },
  );

  return (
    <Tag ref={root as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
