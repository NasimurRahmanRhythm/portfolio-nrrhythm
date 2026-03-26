"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 1024,
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (typeof window === "undefined") return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Show cursor and reset idle timer
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Smooth move
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    // Initial idle timer
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[var(--accent)] rounded-full pointer-events-none z-[9999] transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ boxShadow: "0 0 10px var(--accent)" }}
      />
      {/* Outer bubble */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border-2 border-[var(--accent)] rounded-full pointer-events-none z-[9998] transition-all duration-500 ease-out flex items-center justify-center ${isVisible ? "opacity-60" : "opacity-0"} ${isHovering ? "scale-150 bg-[var(--accent)] border-none opacity-20" : "scale-100"}`}
        style={{
          backdropFilter: "blur(2px)",
          boxShadow: isHovering
            ? "0 0 30px var(--accent)"
            : "inset 0 0 10px var(--accent-glow)",
        }}
      >
        {/* Inner glow for bubble effect */}
        <div
          className={`w-full h-full rounded-full border border-white/20 ${isHovering ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </>
  );
}
