"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Code, AppWindow } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
      id="contact"
      ref={sectionRef}
      className="section bg-[var(--bg)] relative"
    >
      <h2 className="section-title text-center">Get In Touch</h2>
      <div className="section-line mx-auto mb-12"></div>

      <p className="text-center text-[var(--fg-muted)] max-w-2xl mx-auto mb-12 text-lg">
        Whether you have a question, a project opportunity, or just want to say
        hi, I&apos;ll try my best to get back to you!
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Email */}
        <a 
          href="mailto:rhythm4538@gmail.com"
          className="contact-item card p-6 text-center flex flex-col items-center gap-4 group hover:-translate-y-2 transition-transform"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
            <Mail size={28} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--fg)] mb-1">Email</h3>
            <p className="text-sm text-[var(--fg-muted)] break-all px-2">
              rhythm4538@gmail.com
            </p>
          </div>
          <div className="mt-auto pt-2 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            Send Email ↗
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/md-nasimur-rahman-rhythm/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item card p-6 text-center flex flex-col items-center gap-4 group hover:-translate-y-2 transition-transform"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[#0077B5] group-hover:text-white transition-colors">
            <AppWindow size={28} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--fg)] mb-1">LinkedIn</h3>
            <p className="text-sm text-[var(--fg-muted)]">Connect with me</p>
          </div>
          <div className="mt-auto pt-2 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            Visit Profile ↗
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/NasimurRahmanRhythm"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item card p-6 text-center flex flex-col items-center gap-4 group hover:-translate-y-2 transition-transform"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[#333] group-hover:text-white transition-colors">
            <Code size={28} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--fg)] mb-1">GitHub</h3>
            <p className="text-sm text-[var(--fg-muted)]">
              View my repositories
            </p>
          </div>
          <div className="mt-auto pt-2 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            Visit Profile ↗
          </div>
        </a>
      </div>
    </section>
  );
}
