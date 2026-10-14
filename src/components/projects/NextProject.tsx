import Link from "next/link";

export default function NextProject({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block border-t border-line px-[var(--margin)] py-20 transition-colors duration-500 hover:bg-surface lg:py-28"
    >
      <p className="t-label mb-4 text-muted">Next project</p>
      <p className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.9] tracking-tight transition-colors duration-500 group-hover:text-accent">
        {name} <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
      </p>
    </Link>
  );
}
