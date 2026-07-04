import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  source: z.string().trim().min(1).max(200).default("footer"),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
