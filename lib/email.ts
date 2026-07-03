import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? "CAIR <no-reply@cairglobal.org>";

export async function sendEmail(opts: { to: string | string[]; subject: string; react: ReactElement }) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping "${opts.subject}" to ${opts.to}`);
    return { skipped: true as const };
  }

  return resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    react: opts.react,
  });
}

export function internalNotificationAddress() {
  return process.env.INTERNAL_NOTIFICATIONS_EMAIL ?? "info@cairglobal.org";
}
