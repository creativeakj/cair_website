import { z } from "zod";

export const teamMemberSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1, "Name is required"),
  title: z.string().trim().min(1, "Title is required"),
  department: z.string().trim().min(1, "Department is required"),
  bio: z.string().trim().min(1, "Bio is required"),
  photo_url: z.string().trim().optional().or(z.literal("")),
  display_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;
