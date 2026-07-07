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

// Resend's batch endpoint caps at 100 emails per call and (unlike a single
// send with multiple `to` addresses) keeps each recipient's address private
// from the others, so it's the right primitive for a mailing-list blast.
export async function sendBatchEmails(
  emails: Array<{ to: string; subject: string; react: ReactElement }>,
): Promise<{ sent: number }> {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping batch of ${emails.length}`);
    return { sent: 0 };
  }
  if (emails.length === 0) return { sent: 0 };

  for (let i = 0; i < emails.length; i += 100) {
    const chunk = emails.slice(i, i + 100);
    await resend.batch.send(
      chunk.map((e) => ({ from: FROM, to: [e.to], subject: e.subject, react: e.react })),
    );
  }
  return { sent: emails.length };
}
