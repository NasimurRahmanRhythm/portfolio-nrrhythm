"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // anchors: in-page "#section" links glide instead of jumping.
    const instance = new Lenis({ duration: 1.2, smoothWheel: true, anchors: { offset: -64 } });
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Re-measure scroll triggers whenever the page height changes (fonts and
  // images arriving), otherwise late sections never fire.
  useEffect(() => {
    let height = document.body.offsetHeight;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      if (document.body.offsetHeight === height) return;
      height = document.body.offsetHeight;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
