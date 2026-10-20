import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] flex-col justify-center px-[var(--margin)] pt-28">
      <p className="t-label mb-6 text-muted">Error 404</p>
      <h1 className="font-display text-[clamp(4rem,14vw,13rem)] leading-[0.85] tracking-[-0.045em]">
        Lost <span className="font-serif italic text-accent">page</span>
      </h1>
      <p className="t-h5 mt-8 max-w-xl text-muted">
        This page doesn&apos;t exist, or it moved. Head back to the home page to see the work.
      </p>
      <Link
        href="/"
        className="t-label mt-10 self-start rounded-full bg-fg px-6 py-3.5 text-bg transition-colors hover:bg-accent hover:text-bone"
      >
        ← Back home
      </Link>
    </section>
  );
}
