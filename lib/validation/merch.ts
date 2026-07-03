import { z } from "zod";

export const merchEnquirySchema = z.object({
  product_slug: z.string().trim().min(1),
  product_name: z.string().trim().min(1),
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().max(2000).optional(),
});

export type MerchEnquiryInput = z.infer<typeof merchEnquirySchema>;
