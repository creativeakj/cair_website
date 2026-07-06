import { z } from "zod";

export const newsArticleSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  body_md: z.string().trim().min(1, "Body is required"),
  featured_image_url: z.string().trim().optional().or(z.literal("")),
  author_id: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().min(1, "Category is required"),
  tags: z.array(z.string().trim().min(1)),
  status: z.enum(["draft", "published"]),
  is_featured: z.boolean(),
});

export type NewsArticleFormValues = z.infer<typeof newsArticleSchema>;
