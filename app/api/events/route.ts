import { NextResponse } from "next/server";
import { getEvents } from "@/lib/services/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  let events = await getEvents();
  if (category) events = events.filter((e) => e.category === category);
  if (type) events = events.filter((e) => e.type === type);

  return NextResponse.json({ success: true, data: events });
}
