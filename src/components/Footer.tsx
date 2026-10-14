"use client";

import { useLenis } from "./SmoothScroll";
import { nav, site, socials } from "@/lib/site";

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="grain relative overflow-hidden border-t border-line bg-surface">
      <div className="grid gap-10 px-[var(--margin)] pb-6 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-label mb-4 text-muted">Have a project in mind?</p>
          <a href={`mailto:${site.email}`} className="t-h3 link-u">
            {site.email}
          </a>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="t-label mb-4 text-muted">Index</p>
          <ul className="space-y-2">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-u">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="t-label mb-4 text-muted">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">
                  {s.name} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume} download="Md-Nasimur-Rahman-Resume.pdf" className="link-u">
                Resume ↓
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="select-none px-[var(--margin)] pb-[5vw] font-display text-[20vw] leading-[0.8] tracking-[-0.05em] text-fg/90"
      >
        {site.short}
        <span className="text-accent">.</span>
      </p>

      <div className="t-label flex flex-wrap items-center justify-between gap-4 border-t border-line px-[var(--margin)] py-6 text-muted">
        <span>
          © {year} {site.name}
        </span>
        <span>Built with Next.js, GSAP &amp; Lenis</span>
        <button type="button" onClick={toTop} className="link-u uppercase">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
