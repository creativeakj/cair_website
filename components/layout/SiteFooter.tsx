import Link from "next/link";

const FOOTER_LINKS = [
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

export async function SiteFooter() {
  "use cache";
  return (
    <footer className="mt-24 border-t border-border bg-[var(--forest-deep)] text-[var(--primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">Center for African International Relations</div>
          <p className="mt-4 max-w-md text-sm text-white/70">
            A non-governmental, non-profit, non-partisan center advancing dialogue, research, and partnership between Africa and America.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4 text-[var(--gold)]">Explore</div>
          <ul className="space-y-2 text-sm text-white/80">
            {FOOTER_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[var(--gold)]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4 text-[var(--gold)]">Headquarters</div>
          <address className="not-italic text-sm leading-relaxed text-white/80">
            713 North Chestnut Street
            <br />
            Lansing, MI 48906
            <br />
            United States
          </address>
          <div className="mt-3 text-sm text-white/60">Regional Hub · Abuja, Nigeria</div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-5 text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} Center for African International Relations. All rights reserved.</span>
          <span>Registered in the United States · Federal Republic of Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
