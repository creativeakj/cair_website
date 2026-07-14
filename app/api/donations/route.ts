import { NextResponse } from "next/server";
import { z } from "zod";
import { donationEnquirySchema } from "@/lib/validation/donation";
import { recordDonationEnquiry } from "@/lib/services/donation-enquiries";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { DonationEnquiryConfirmation } from "@/lib/email-templates/DonationEnquiryConfirmation";
import { DonationEnquiryNotification } from "@/lib/email-templates/DonationEnquiryNotification";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = donationEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: z.prettifyError(parsed.error) }, { status: 400 });
  }

  const { name, email, phone, organization, amount, message } = parsed.data;

  try {
    await recordDonationEnquiry({ name, email, phone, organization, amount, message });
  } catch (error) {
    console.error("[donations] failed to record enquiry:", error);
    return NextResponse.json({ success: false, error: "Could not save your details" }, { status: 500 });
  }

  try {
    await Promise.all([
      sendEmail({
        to: email,
        subject: "Thank you for your interest in supporting CAIR",
        react: DonationEnquiryConfirmation({ name }),
      }),
      sendEmail({
        to: internalNotificationAddress(),
        subject: `New donation enquiry: ${name}`,
        react: DonationEnquiryNotification({ name, email, phone, organization, amount, message }),
      }),
    ]);
  } catch (error) {
    // The enquiry is already saved; a failed email shouldn't fail the request.
    console.error("[donations] failed to send emails:", error);
  }

  return NextResponse.json({ success: true });
}
