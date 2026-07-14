import Link from "next/link";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { T } from "@/components/i18n/T";
import { SHOW_PUBLICATIONS } from "@/lib/feature-flags";

const EXPLORE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/programs", label: "Programs" },
  { href: "/membership", label: "Membership" },
] as const;

const INSIGHTS_LINKS = [
  ...(SHOW_PUBLICATIONS ? [{ href: "/publications", label: "Publications" }] : []),
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/merch", label: "Merch" },
] as const;

export async function SiteFooter() {
  "use cache";
  return (
    <footer className="mt-24 border-t border-border bg-[var(--forest-deep)] text-[var(--primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-display text-2xl">Center for African International Relations</div>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            <T path="footer.tagline" />
          </p>
          <div className="mt-6">
            <div className="eyebrow mb-2 text-[var(--gold)]">Stay informed</div>
            <p className="mb-3 text-sm text-white/60">New publications, news, and events — no spam.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow mb-4 text-[var(--gold)]">Explore</div>
          <ul className="space-y-2 text-sm text-white/80">
            {EXPLORE_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[var(--gold)]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow mb-4 text-[var(--gold)]">Insights</div>
          <ul className="space-y-2 text-sm text-white/80">
            {INSIGHTS_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[var(--gold)]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-[var(--gold)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Registered in the United States · Federal Republic of Nigeria</span>
            <Link href="/privacy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
