import { NextResponse } from "next/server";
import { z } from "zod";
import { incrementDownloadCount } from "@/lib/services/publications";

const bodySchema = z.object({ slug: z.string().trim().min(1) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: z.prettifyError(parsed.error) },
      { status: 400 },
    );
  }

  const found = await incrementDownloadCount(parsed.data.slug);
  if (!found) {
    return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
