import { NextResponse } from "next/server";
import { getPublications } from "@/lib/services/publications";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : undefined;

  const data = await getPublications({ category, year });
  return NextResponse.json({ success: true, data });
}
