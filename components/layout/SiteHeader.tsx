"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { T } from "@/components/i18n/T";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

const NAV = [
  { href: "/", label: "Home", tKey: "home" },
  { href: "/about", label: "About", tKey: "about" },
  { href: "/team", label: "Team", tKey: "team" },
  { href: "/programs", label: "Programs", tKey: "programs" },
  {
    href: "/publications",
    label: "Publications",
    tKey: "publications",
    children: [
      { href: "/publications", label: "Publications", tKey: "publications" },
      { href: "/news", label: "News", tKey: "news" },
    ],
  },
  { href: "/events", label: "Events", tKey: "events" },
  { href: "/contact", label: "Contact", tKey: "contact" },
] as const;

const FLAT_NAV: { href: string; label: string; tKey: string }[] = NAV.flatMap(
  (n): { href: string; label: string; tKey: string }[] =>
    "children" in n
      ? n.children.map((c) => ({ href: c.href, label: c.label, tKey: c.tKey }))
      : [{ href: n.href, label: n.label, tKey: n.tKey }],
);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavDropdown({
  tKey,
  href,
  items,
  active,
}: {
  tKey: string;
  href: string;
  items: ReadonlyArray<{ href: string; label: string; tKey: string }>;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className={`flex items-center gap-1 ${cnActive(active)}`}>
        <Link href={href}>
          <T path={`nav.${tKey}`} />
        </Link>
        <button
          type="button"
          aria-label="Publications submenu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-0.5"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[10rem] rounded-sm border border-border bg-background py-1 shadow-lg">
          {items.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              <T path={`nav.${c.tKey}`} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? FLAT_NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase().trim()))
    : FLAT_NAV;

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
          {NAV.map((n) =>
            "children" in n ? (
              <NavDropdown
                key={n.href}
                tKey={n.tKey}
                href={n.href}
                items={n.children}
                active={n.children.some((c) => isActive(pathname, c.href))}
              />
            ) : (
              <Link key={n.href} href={n.href} className={cnActive(isActive(pathname, n.href))}>
                <T path={`nav.${n.tKey}`} />
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden lg:flex" />
          <Link
            href="/membership"
            className="hidden rounded-sm border border-[var(--forest)] bg-[var(--forest)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--forest-deep)] lg:inline-block"
          >
            <T path="nav.joinCair" />
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
        className={`lg:hidden overflow-hidden border-border/60 transition-[max-height,border] duration-300 ease-out ${open ? "max-h-[40rem] border-t" : "max-h-0"}`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          <LanguageSwitcher className="mb-3" />
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
              <T path={`nav.${n.tKey}`} />
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
            <T path="nav.joinCair" />
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
