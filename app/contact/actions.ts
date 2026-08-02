"use server";

import { sendMail, esc } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

const TOPICS = ["General", "Sales", "Support", "Partnership", "Press"] as const;

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // honeypot — bots will fill this
  if (String(formData.get("website") || "")) return { ok: true, message: "Thanks." };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const topic = String(formData.get("topic") || "General").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in your name, email and a short message." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }
  if (message.length > 4000) {
    return { ok: false, message: "Please keep your message under 4,000 characters." };
  }
  if (!TOPICS.includes(topic as (typeof TOPICS)[number])) {
    return { ok: false, message: "Invalid topic." };
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0B0F17;line-height:1.55">
      <h2 style="margin:0 0 12px;font-size:16px">New contact form submission</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Company</td><td>${esc(company)}</td></tr>` : ""}
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Topic</td><td>${esc(topic)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #E6E8EE;margin:16px 0" />
      <div style="white-space:pre-wrap;font-size:14px">${esc(message)}</div>
    </div>`;

  try {
    await sendMail({
      subject: `Contact · ${topic} · ${name}`,
      replyTo: email,
      html,
    });
    return { ok: true, message: "Thanks, we'll be in touch within one business day." };
  } catch (err) {
    const m = err instanceof Error ? err.message : "";
    if (m === "EMAIL_NOT_CONFIGURED") {
      return {
        ok: false,
        message: "Our contact form isn't set up yet. Please email info@evenx.co.uk directly.",
      };
    }
    return {
      ok: false,
      message: "Something went wrong sending your message. Please email info@evenx.co.uk directly.",
    };
  }
}
