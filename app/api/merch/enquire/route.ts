import { NextResponse } from "next/server";
import { z } from "zod";
import { merchEnquirySchema } from "@/lib/validation/merch";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { MerchEnquiryNotification } from "@/lib/email-templates/MerchEnquiryNotification";
import { MerchEnquiryAcknowledgement } from "@/lib/email-templates/MerchEnquiryAcknowledgement";
import { recordMerchEnquiry } from "@/lib/services/merch-enquiries";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = merchEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: z.prettifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { product_slug, product_name, name, email, message } = parsed.data;

  try {
    await recordMerchEnquiry({ product_slug, product_name, name, email, message });
  } catch (error) {
    console.error("[merch/enquire] failed to record enquiry:", error);
    return NextResponse.json({ success: false, error: "Could not save enquiry" }, { status: 500 });
  }

  try {
    await Promise.all([
      sendEmail({
        to: internalNotificationAddress(),
        subject: `Merch enquiry: ${product_name}`,
        react: MerchEnquiryNotification({ productName: product_name, name, email, message }),
      }),
      sendEmail({
        to: email,
        subject: "We've received your enquiry — CAIR",
        react: MerchEnquiryAcknowledgement({ name, productName: product_name }),
      }),
    ]);
  } catch (error) {
    // The enquiry is already saved; a failed email shouldn't fail the request.
    console.error("[merch/enquire] failed to send emails:", error);
  }

  return NextResponse.json({ success: true });
}
