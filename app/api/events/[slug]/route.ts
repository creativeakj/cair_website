import { NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/services/events";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: event });
}
