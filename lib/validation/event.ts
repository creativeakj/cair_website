import { z } from "zod";

export const eventSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  image_url: z.string().trim().optional().or(z.literal("")),
  event_date: z.string().trim().min(1, "Event date is required"),
  end_date: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().min(1, "Location is required"),
  type: z.enum(["in-person", "virtual", "hybrid"]),
  category: z.string().trim().min(1, "Category is required"),
  status: z.enum(["upcoming", "registration-open", "past"]),
  is_featured: z.boolean(),
  partner_logos: z.array(z.string().trim().min(1)),
  meeting_link: z.string().trim().optional().or(z.literal("")),
});

export type EventFormValues = z.infer<typeof eventSchema>;
