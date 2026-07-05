import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const QUICK_LINKS = [
  { href: "/about", label: "About CAIR" },
  { href: "/publications", label: "Publications" },
  { href: "/news", label: "News & Insights" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[var(--forest-deep)] text-[var(--primary-foreground)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[var(--gold)]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[var(--accent)]/20 blur-3xl"
      />

      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Compass className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.5} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="gold-rule" />
          <span className="eyebrow">Error 404</span>
          <span className="gold-rule" />
        </div>

        <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
          This page wandered off <span className="text-[var(--gold)]">the map.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-white/75">
          The page you&apos;re looking for doesn&apos;t exist, has moved, or the link may
          be out of date. Let&apos;s get you back on course.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)] shadow-lg shadow-[var(--gold)]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--gold)]/30"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border border-white/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="eyebrow mb-4 text-[var(--gold)]">Or find your way to</div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-[var(--gold)] hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
