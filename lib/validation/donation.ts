import { z } from "zod";

export const donationEnquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
  organization: z.string().trim().optional(),
  amount: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type DonationEnquiryFormValues = z.infer<typeof donationEnquirySchema>;
