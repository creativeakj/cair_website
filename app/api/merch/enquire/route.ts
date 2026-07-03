import { NextResponse } from "next/server";
import { z } from "zod";
import { merchEnquirySchema } from "@/lib/validation/merch";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { MerchEnquiryNotification } from "@/lib/email-templates/MerchEnquiryNotification";

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

  const { product_name, name, email, message } = parsed.data;

  await sendEmail({
    to: internalNotificationAddress(),
    subject: `Merch enquiry: ${product_name}`,
    react: MerchEnquiryNotification({ productName: product_name, name, email, message }),
  });

  return NextResponse.json({ success: true });
}
