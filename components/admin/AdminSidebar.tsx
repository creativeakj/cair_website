"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  CalendarDays,
  ClipboardList,
  Users,
  ShoppingBag,
  MessageSquare,
  Mail,
  Rss,
  UserCircle,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/publications", label: "Publications", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/event-registrations", label: "Event Registrations", icon: ClipboardList },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/merch", label: "Merch", icon: ShoppingBag },
  { href: "/admin/merch-enquiries", label: "Merch Enquiries", icon: MessageSquare },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/subscribers", label: "Subscribers", icon: Rss },
  { href: "/admin/admins", label: "Admins", icon: ShieldCheck },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? session?.user?.email ?? "Admin";
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border bg-[var(--forest-deep)] px-4 text-[var(--primary-foreground)] md:hidden">
        <span className="font-display text-lg">CAIR Admin</span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-sm hover:bg-white/10"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 -translate-x-full flex-col border-r border-border bg-[var(--forest-deep)] text-[var(--primary-foreground)] transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        <Link href="/admin/profile" className="hidden border-b border-white/10 p-6 hover:bg-white/5 md:block">
          <div className="font-display text-xl">CAIR Admin</div>
          <div className="mt-1 text-xs text-white/50">{userName}</div>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
