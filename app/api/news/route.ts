import { NextResponse } from "next/server";
import { getPublishedNewsArticles } from "@/lib/services/news";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;

  const data = await getPublishedNewsArticles({ category, tag });
  return NextResponse.json({ success: true, data });
}
