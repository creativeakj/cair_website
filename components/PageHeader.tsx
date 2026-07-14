import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, lede }: { eyebrow: ReactNode; title: ReactNode; lede?: ReactNode }) {
  return (
    <section className="border-b border-border bg-[var(--secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl text-[var(--forest-deep)] md:text-6xl">{title}</h1>
        {lede ? <p className="mt-6 max-w-2xl text-lg text-foreground/75">{lede}</p> : null}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-20 ${className}`}>
      {children}
    </section>
  );
}
