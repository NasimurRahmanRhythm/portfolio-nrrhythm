"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const container = useRef(null);
  const title1Ref = useRef(null);
  const typeTargetRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        title1Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      )
        .fromTo(
          ".type-container",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-icon",
          { scale: 0, opacity: 0, rotation: -45 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );

      // Floating animation for profile picture (different on mobile)
      const isMobile = window.innerWidth < 768;
      gsap.to(".profile-container", {
        y: isMobile ? 15 : 10,
        x: isMobile ? 5 : 0,
        rotation: isMobile ? 2 : 0,
        repeat: -1,
        yoyo: true,
        duration: isMobile ? 2.5 : 2,
        ease: "sine.inOut",
      });

      // Typing Effect
      const words = [
        "Software Engineer",
        "Full-stack Developer",
        "Problem Solver",
      ];
      
      let wordIndex = 0;
      const typeWord = () => {
        if (!typeTargetRef.current) return;
        
        const word = words[wordIndex];
        const tl = gsap.timeline({
          onComplete: () => {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWord, 500);
          }
        });

        // Type in
        tl.to({}, {
          duration: word.length * 0.1,
          onUpdate: function() {
            if (typeTargetRef.current) {
              const progress = this.progress();
              const currentLength = Math.floor(progress * word.length);
              typeTargetRef.current.textContent = word.substring(0, currentLength);
            }
          },
          ease: "none"
        });

        // Pause
        tl.to({}, { duration: 1.5 });

        // Type out
        tl.to({}, {
          duration: word.length * 0.05,
          onUpdate: function() {
            if (typeTargetRef.current) {
              const progress = this.progress();
              const currentLength = Math.floor((1 - progress) * word.length);
              typeTargetRef.current.textContent = word.substring(0, currentLength);
            }
          },
          ease: "none"
        });
      };

      typeWord();

      // Cursor blinking
      gsap.to(".cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Float animation for arrow
      gsap.to(".scroll-arrow", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-bg"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative mt-10">
        <div className="flex flex-col items-center mb-8">
          <div className="profile-container w-32 h-32 rounded-full border-4 border-[var(--accent)] overflow-hidden mb-6 shadow-xl transform transition-transform duration-300">
            <Image
              src="/assets/profile.jpg"
              alt="Md. Nasimur Rahman Rhythm"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-[var(--fg-muted)]">
              Available for new opportunities
            </span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 text-[var(--fg)]">
          <div ref={title1Ref}>
            Hi, I&apos;m{" "}
            <span className="gradient-text whitespace-normal md:whitespace-nowrap">
              Md. Nasimur Rahman
            </span>
          </div>
        </h1>

        <div className="type-container text-3xl md:text-4xl font-semibold text-[var(--accent)] mt-2 h-[1.2em]">
          <span ref={typeTargetRef}></span>
          <span className="cursor ml-1 border-l-2 border-[var(--accent)]"></span>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl mx-auto mt-8 mb-10 leading-relaxed"
        >
          Specializing in React, Next.js, and Node.js. I build scalable,
          high-performance web applications with seamless API integrations and
          modern user interfaces.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-2)] transition-all shadow-lg hover:shadow-[0_0_20px_var(--accent-glow)] transform hover:-translate-y-1 w-full sm:w-auto"
          >
            View My Work
          </a>
          <a
            href="/assets/resume.pdf"
            download="Md-Nasimur-Rahman-Resume.pdf"
            className="px-8 py-3 rounded-full border border-[var(--accent)] bg-[var(--bg-card)] text-[var(--accent)] font-medium hover:bg-[var(--accent-glow)] transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            Download My CV
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] font-medium hover:border-[var(--accent)] transition-all w-full sm:w-auto"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
