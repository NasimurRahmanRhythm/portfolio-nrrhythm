# Md. Nasimur Rahman: Portfolio

Personal portfolio of Md. Nasimur Rahman (Rhythm), Software Engineer at ShellBeeHaken Ltd.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) and React 19
- Tailwind CSS v4 (design tokens live in `src/app/globals.css`)
- GSAP + ScrollTrigger for animation, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- `next-themes` for the dark / light switch

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Other commands

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint check
```

## Structure

```
src/
  app/           layout, page and global styles
  components/    page sections and shared UI (Navbar, Footer, Preloader, Cursor…)
  lib/           gsap setup, site data, preloader "ready" signal
public/assets/   profile photo and resume
```
