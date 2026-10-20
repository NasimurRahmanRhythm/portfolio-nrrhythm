"use client";

import { usePathname } from "next/navigation";
import { nav, sectionHref, site, socials } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="grain relative overflow-hidden border-t border-line bg-surface">
      <div className="grid gap-10 px-[var(--margin)] py-16 md:grid-cols-12">
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
                <a href={sectionHref(pathname, link.href)} className="link-u">
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

    </footer>
  );
}
