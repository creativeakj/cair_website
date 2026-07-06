import { z } from "zod";

export const merchItemSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(1, "Description is required"),
  image_url: z.array(z.string().trim().min(1)).min(1, "At least one image is required"),
  is_available: z.boolean(),
  display_order: z.number().int().min(0),
});

export type MerchItemFormValues = z.infer<typeof merchItemSchema>;
