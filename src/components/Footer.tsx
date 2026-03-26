export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border)] py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--fg-muted)]">
        <p>© {currentYear} Md. Nasimur Rahman. All rights reserved.</p>

        <p className="mt-4 md:mt-0 flex items-center gap-2">
          Built with{" "}
          <span className="text-[var(--accent)] font-semibold">Next.js 15</span>{" "}
          & <span className="text-[var(--accent-2)] font-semibold">GSAP</span>
        </p>
      </div>
    </footer>
  );
}
