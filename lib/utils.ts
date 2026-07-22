import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, length = 200): string {
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Requests a content-aware crop from Cloudinary (face/subject detection via
// g_auto) so admin-uploaded photos of any dimension fill a fixed aspect
// ratio without cutting off the subject, the way a blind CSS object-cover
// center-crop would. No-ops for non-Cloudinary URLs (e.g. local placeholders).
export function cloudinaryFill(url: string, width: number, height: number): string {
  const marker = "/image/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const insertAt = i + marker.length;
  return `${url.slice(0, insertAt)}c_fill,g_auto,w_${width},h_${height}/${url.slice(insertAt)}`;
}
