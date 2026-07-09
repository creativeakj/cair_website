import { z } from "zod";

export const eventRegistrationSchema = z.object({
  event_slug: z.string().trim().min(1),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  organization: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type EventRegistrationFormValues = z.infer<typeof eventRegistrationSchema>;
