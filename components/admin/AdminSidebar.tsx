"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  CalendarDays,
  Users,
  ShoppingBag,
  MessageSquare,
  Mail,
  Rss,
  UserCircle,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/publications", label: "Publications", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
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

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-[var(--forest-deep)] text-[var(--primary-foreground)]">
      <Link href="/admin/profile" className="block border-b border-white/10 p-6 hover:bg-white/5">
        <div className="font-display text-xl">CAIR Admin</div>
        <div className="mt-1 text-xs text-white/50">{userName}</div>
      </Link>
      <nav className="flex-1 space-y-1 p-3">
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
  );
}
