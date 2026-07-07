import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSubscribersAdmin } from "@/lib/services/subscribers";

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const subscribers = await getSubscribersAdmin();
  const header = ["Email", "Status", "Source", "Subscribed At"];
  const rows = subscribers.map((s) => [s.email, s.status, s.source, s.subscribed_at]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cair-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
