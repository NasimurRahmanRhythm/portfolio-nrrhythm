"use client";

import { useRef } from "react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { gsap, useGSAP } from "@/lib/gsap";

const education = [
  {
    school: "Rajshahi University of Engineering & Technology",
    degree: "BSc in Computer Science and Engineering",
    date: "01/2018 – 09/2023",
  },
  {
    school: "Dhaka Residential Model College",
    degree: "HSC in Science",
    date: "01/2007 – 09/2017",
  },
];

const ielts = [
  { label: "Listening", score: 8.0 },
  { label: "Reading", score: 7.5 },
  { label: "Writing", score: 7.5 },
  { label: "Speaking", score: 7.0 },
];

const judges = [
  { name: "Codeforces", handle: "rhythm_1703083", href: "https://codeforces.com/profile/rhythm_1703083", solved: "800+" },
  { name: "LeetCode", handle: "rhythm_1703083", href: "https://leetcode.com/u/rhythm_1703083/", solved: "100+" },
  { name: "LightOJ, UVa, HackerRank, Toph", handle: "", href: "", solved: "200+" },
];

const contests = [
  { place: "14th", name: "RUET Gyanjam 2019", team: "Ekhon_Kichui_Parina", href: "https://toph.co/c/ruet-gganjam-2019" },
  { place: "45th", name: "IUT IUPC 2019", team: "RUET_Amra_Olosh", href: "https://toph.co/c/iut-ict-fest-2019" },
];

export default function Achievements() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ielts-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".ielts-bars", start: "top 85%" },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="achievements" ref={root} className="relative px-[var(--margin)] py-28 lg:py-40">
      <SectionHead index="05" label="Education & Achievements" title="Beyond the" italic="day job" />

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Education */}
        <div className="lg:col-span-6">
          <p className="t-label mb-6 text-muted">Education</p>
          <Reveal as="ul" className="border-t border-line">
            {education.map((e) => (
              <li key={e.school} className="border-b border-line py-6">
                <p className="t-label mb-2 text-accent">{e.date}</p>
                <h3 className="t-h5">{e.school}</h3>
                <p className="mt-1 text-muted">{e.degree}</p>
              </li>
            ))}
          </Reveal>
        </div>

        {/* IELTS */}
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label mb-6 text-muted">IELTS Academic</p>
          <div className="flex items-end justify-between gap-6 border-t border-line pt-6">
            <p className="font-display text-[clamp(5rem,10vw,9rem)] leading-[0.8] tracking-tight">7.5</p>
            <div className="text-right">
              <p className="t-label text-muted">Overall band / 9.0</p>
              <p className="t-h5 mt-2 italic text-accent">CEFR C1</p>
            </div>
          </div>
          <ul className="ielts-bars mt-10 space-y-5">
            {ielts.map((item) => (
              <li key={item.label}>
                <div className="t-label mb-2 flex justify-between">
                  <span className="text-muted">{item.label}</span>
                  <span>{item.score.toFixed(1)}</span>
                </div>
                <div className="h-px w-full bg-line">
                  <div
                    className="ielts-bar h-px origin-left bg-accent"
                    style={{ width: `${(item.score / 9) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Problem solving */}
        <div className="lg:col-span-6">
          <p className="t-label mb-6 text-muted">Competitive programming</p>
          <Reveal as="ul" className="border-t border-line">
            {judges.map((j) => (
              <li key={j.name} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                <div>
                  <h3 className="t-h5">{j.name}</h3>
                  {j.href && (
                    <a href={j.href} target="_blank" rel="noopener noreferrer" className="t-label link-u text-muted">
                      {j.handle} ↗
                    </a>
                  )}
                </div>
                <p className="font-display text-4xl tracking-tight">
                  {j.solved}
                  <span className="t-label ml-2 text-muted">solved</span>
                </p>
              </li>
            ))}
            {contests.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                <div>
                  <h3 className="t-h5">{c.name}</h3>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="t-label link-u text-muted">
                    Team {c.team} ↗
                  </a>
                </div>
                <p className="font-display text-4xl italic tracking-tight text-accent">{c.place}</p>
              </li>
            ))}
          </Reveal>
        </div>

        {/* Publication */}
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="t-label mb-6 text-muted">Publication</p>
          <a
            href="https://ieeexplore.ieee.org/abstract/document/10800599"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-line bg-surface p-8 transition-colors duration-500 hover:border-accent"
          >
            <p className="t-label mb-6 flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> IEEE Xplore · Published research
            </p>
            <h3 className="t-h3">
              Predicting Football Match Results: An Analysis of Feature Selection and Machine Learning Techniques
              Using a Curated Dataset
            </h3>
            <p className="t-label mt-8 text-accent transition-transform duration-500 group-hover:translate-x-2">
              Read the paper ↗
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
