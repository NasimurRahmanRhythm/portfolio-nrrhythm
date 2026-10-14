import SplitTitle from "./SplitTitle";

type Props = { index: string; label: string; title: string; italic?: string };

// "(02) Skills" label above a large title whose last words sit in italic serif.
export default function SectionHead({ index, label, title, italic }: Props) {
  return (
    <header className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12">
      <p className="t-label text-muted lg:col-span-3">
        <span className="text-accent">({index})</span> {label}
      </p>
      <h2 className="t-h1 flex flex-wrap items-baseline gap-x-[0.25em] lg:col-span-9">
        <SplitTitle text={title} className="t-h1" />
        {italic && <SplitTitle text={italic} className="t-h1 italic text-accent" delay={0.1} />}
      </h2>
    </header>
  );
}
