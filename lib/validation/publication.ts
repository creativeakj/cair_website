import { z } from "zod";

export const publicationSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  summary: z.string().trim().min(1, "Summary is required"),
  abstract: z.string().trim().min(1, "Abstract is required"),
  authors: z.array(z.string().trim().min(1)).min(1, "At least one author is required"),
  category: z.enum(["Policy", "Research", "Report", "Data", "Other"]),
  file_url: z.string().trim().min(1, "A PDF file is required"),
  cover_image_url: z.string().trim().optional().or(z.literal("")),
  published_date: z.string().trim().min(1, "Published date is required"),
  year: z.number().int().min(2000).max(2100),
  is_featured: z.boolean(),
});

export type PublicationFormValues = z.infer<typeof publicationSchema>;
