"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Trophy, BookOpen, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achieve-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
      id="achievements"
      ref={sectionRef}
      className="section bg-[var(--bg-card)] border-y border-[var(--border)] relative overflow-hidden"
    >
      <h2 className="section-title">Education & Achievements</h2>
      <div className="section-line"></div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Education & Publications */}
        <div className="space-y-6">
          <div className="achieve-card card p-8 border-t-4 border-t-[var(--accent)]">
            <div className="flex items-center gap-3 text-[var(--accent)] mb-4">
              <GraduationCap size={24} />
              <h3 className="text-xl font-bold text-[var(--fg)]">Education</h3>
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <h4 className="font-bold text-base text-[var(--fg)]">
                Rajshahi University of Engineering & Technology
              </h4>
              <span className="text-xs font-medium text-[var(--fg-muted)] self-start bg-[var(--bg)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                01/2018 – 09/2023
              </span>
              <p className="text-[var(--accent-2)] text-sm font-medium mt-1">
                BSc in Computer Science and Engineering
              </p>
            </div>

            <div className="flex flex-col gap-1 pt-4 border-t border-[var(--border)]/50">
              <h4 className="font-bold text-base text-[var(--fg)]">
                Dhaka Residential Model College
              </h4>
              <span className="text-xs font-medium text-[var(--fg-muted)] self-start bg-[var(--bg)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                01/2007 – 09/2017
              </span>
              <p className="text-[var(--accent-2)] text-sm font-medium mt-1">
                HSC in Science
              </p>
            </div>
          </div>

          <div className="achieve-card card p-8 border-t-4 border-t-[var(--accent-2)] group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 text-[var(--accent-2)] mb-4">
              <BookOpen size={24} />
              <h3 className="text-lg font-bold text-[var(--fg)]">
                Publications
              </h3>
            </div>

            <h4 className="font-bold text-[var(--fg)] text-sm leading-relaxed mb-2 pr-4">
              Predicting Football Match Results: An Analysis of Feature
              Selection and Machine Learning Techniques Using a Curated Dataset
            </h4>
            <div className="text-xs text-[var(--fg-muted)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Published Research
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center bg-[var(--fg)]/5 backdrop-blur-[1px]">
              <a
                href="https://ieeexplore.ieee.org/abstract/document/10800599"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[var(--accent-2)] text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl hover:bg-[var(--accent)]"
                aria-label="View Publication"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Online Judge & Contests */}
        <div className="achieve-card card p-8 bg-[var(--bg)] border-none">
          <div className="flex items-center gap-3 text-[var(--accent)] mb-8">
            <Trophy size={24} />
            <h3 className="text-xl font-bold text-[var(--fg)]">
              Programming & Contests
            </h3>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-lg text-[var(--fg)] mb-4 border-b border-[var(--border)] pb-2 inline-block">
                Online Judge Statistics
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)] mt-1">▹</span>
                  <span>
                    <strong>Codeforces:</strong>{" "}
                    <a
                      href="https://codeforces.com/profile/rhythm_1703083"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] hover:underline transition-colors"
                    >
                      rhythm_1703083
                    </a>{" "}
                    — solved 800+ problems
                  </span>
                </li>
                <li className="flex gap-3 text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)] mt-1">▹</span>
                  <span>
                    <strong>Leetcode:</strong>{" "}
                    <a
                      href="https://leetcode.com/u/rhythm_1703083/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] hover:underline transition-colors"
                    >
                      rhythm_1703083
                    </a>{" "}
                    — solved 100+ problems
                  </span>
                </li>
                <li className="flex gap-3 text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)] mt-1">▹</span>
                  <span>
                    <strong>Others:</strong> LightOj, UVA, HackerRank, Toph,
                    etc. — solved 200+ problems
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg text-[var(--fg)] mb-4 border-b border-[var(--border)] pb-2 inline-block">
                Contests Experience
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-[var(--fg-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)] mt-2 shrink-0"></div>
                  <span>
                    14th in RUET Gyanjam 2019 (Team name:{" "}
                    <a
                      href="https://toph.co/c/ruet-gganjam-2019"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent-2)] hover:underline transition-colors font-medium"
                    >
                      Ekhon_Kichui_Parina
                    </a>
                    )
                  </span>
                </li>
                <li className="flex gap-3 text-[var(--fg-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)] mt-2 shrink-0"></div>
                  <span>
                    45th in IUT IUPC 2019 (Team name:{" "}
                    <a
                      href="https://toph.co/c/iut-ict-fest-2019"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent-2)] hover:underline transition-colors font-medium"
                    >
                      RUET_Amra_Olosh
                    </a>
                    )
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
