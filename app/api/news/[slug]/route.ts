import { NextResponse } from "next/server";
import { getPublishedNewsArticleBySlug } from "@/lib/services/news";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = await getPublishedNewsArticleBySlug(slug);

  if (!article) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: article });
}
