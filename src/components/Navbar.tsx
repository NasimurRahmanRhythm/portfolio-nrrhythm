"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLenis } from "./SmoothScroll";
import { nav, sectionHref, site, socials } from "@/lib/site";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = !mounted || resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      className="t-label flex items-center gap-2 rounded-full border border-line px-3 py-2 transition-colors hover:border-accent"
    >
      <span className={`h-2 w-2 rounded-full transition-colors ${dark ? "bg-bone" : "bg-ink"}`} />
      <span className="w-9 text-left">{dark ? "Dark" : "Light"}</span>
    </button>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone }).format(
          new Date(),
        ),
      );
    format();
    const id = window.setInterval(format, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="t-label hidden text-muted xl:block">
      Dhaka <span className="tabular-nums text-fg">{time || "--:--"}</span>
    </span>
  );
}

export default function Navbar() {
  const lenis = useLenis();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Slide away while reading down the page, come back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-[translate,background-color,border-color] duration-700 ease-cubic ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "border-b border-line bg-[var(--navbar-bg)] backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-[var(--margin)] py-4">
          <Link href="/" aria-label={`${site.name}, home`} className="font-serif text-2xl leading-none">
            {site.short}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {nav.map((link, i) => (
              <a key={link.href} href={sectionHref(pathname, link.href)} className="t-label link-u pb-0.5 text-muted transition-colors hover:text-fg">
                <span className="text-accent">0{i + 1}</span> {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocalTime />
            <ThemeToggle />
            <a
              href={sectionHref(pathname, "#contact")}
              className="t-label hidden rounded-full bg-fg px-4 py-2.5 text-bg transition-colors hover:bg-accent hover:text-bone sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="t-label flex items-center gap-3 rounded-full border border-line px-4 py-2.5 md:hidden"
            >
              <span className="relative flex h-2 w-5 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-cubic ${
                    open ? "translate-y-[3.5px] rotate-[20deg]" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-cubic ${
                    open ? "-translate-y-[3.5px] -rotate-[20deg]" : ""
                  }`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu for small screens */}
      <div
        id="site-menu"
        inert={!open}
        className={`fixed inset-0 z-[105] flex flex-col justify-between bg-bg px-[var(--margin)] pb-8 pt-24 transition-[clip-path] duration-700 ease-cubic-in md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {nav.map((link, i) => (
            <a
              key={link.href}
              href={sectionHref(pathname, link.href)}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-5xl leading-none"
            >
              <span className="t-label text-accent">0{i + 1}</span>
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-end justify-between gap-6">
          <a href={`mailto:${site.email}`} className="t-label link-u">
            {site.email}
          </a>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="t-label link-u">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
