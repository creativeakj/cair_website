"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/programs", label: "Programs" },
  { href: "/publications", label: "Publications" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase().trim()))
    : NAV;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/cair-logo.png"
            alt="CAIR — Center for African International Relations"
            width={282}
            height={95}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cnActive(isActive(pathname, n.href))}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/membership"
            className="hidden rounded-sm border border-[var(--forest)] bg-[var(--forest)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--forest-deep)] lg:inline-block"
          >
            Join CAIR
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden overflow-hidden border-border/60 transition-[max-height,border] duration-300 ease-out ${open ? "max-h-[36rem] border-t" : "max-h-0"}`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages…"
              className="h-10 w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          {filtered.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className={`rounded-sm px-2 py-3 text-base transition-colors hover:bg-accent ${
                isActive(pathname, n.href) ? "font-medium text-[var(--forest-deep)]" : "text-foreground/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
          {filtered.length === 0 && (
            <span className="px-2 py-3 text-sm text-muted-foreground">No pages found</span>
          )}
          <Link
            href="/membership"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-sm border border-[var(--forest)] bg-[var(--forest)] px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--forest-deep)]"
          >
            Join CAIR
          </Link>
        </nav>
      </div>
    </header>
  );
}

function cnActive(active: boolean) {
  return `text-sm transition-colors hover:text-[var(--forest-deep)] ${
    active ? "font-medium text-[var(--forest-deep)]" : "text-foreground/75"
  }`;
}
