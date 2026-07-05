import { NextResponse } from "next/server";
import { getPublicationBySlug } from "@/lib/services/publications";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: publication });
}
