import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToCloudinary, type CloudinaryResourceType } from "@/lib/cloudinary";

const ALLOWED_FOLDERS = new Set([
  "team-photos",
  "publication-files",
  "publication-covers",
  "news-images",
  "merch-images",
  "event-assets",
]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File) || typeof folder !== "string" || !ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ success: false, error: "Invalid upload request" }, { status: 400 });
  }

  const resourceType: CloudinaryResourceType = folder === "publication-files" ? "raw" : "image";
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await uploadToCloudinary(buffer, { folder, resourceType, filename: file.name });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
