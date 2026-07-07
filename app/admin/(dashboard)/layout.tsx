import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-background md:flex-row">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
