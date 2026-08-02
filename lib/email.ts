import { Resend } from "resend";

/**
 * Transactional email helper.
 *
 * Requires two env vars to be set (in Vercel → Project Settings → Environment Variables):
 *   RESEND_API_KEY   — from https://resend.com/api-keys
 *   MAIL_FROM        — e.g. "EvenX Website <noreply@evenx.co.uk>" (evenx.co.uk must be verified in Resend)
 *
 * Until MAIL_FROM's domain is verified you can use Resend's default sender:
 *   MAIL_FROM=EvenX Website <onboarding@resend.dev>
 */
export const MAIL_TO = "info@evenx.co.uk";

const key = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? "EvenX Website <onboarding@resend.dev>";

const resend = key ? new Resend(key) : null;

export async function sendMail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }
  const { error } = await resend.emails.send({
    from,
    to: MAIL_TO,
    subject,
    html,
    replyTo,
  });
  if (error) {
    throw new Error(`RESEND_ERROR:${error.message}`);
  }
}

/** Very small helper to escape user-supplied strings before injecting into the HTML body. */
export function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
