"use server";

import { sendMail, esc } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,000+"] as const;
const EVENTS_PER_YEAR = ["1–5", "6–15", "16–50", "50+"] as const;
const TIMEFRAMES = ["This week", "Next week", "In the next 2 weeks", "Flexible"] as const;

export async function submitDemo(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") || "")) return { ok: true, message: "Thanks." };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const size = String(formData.get("size") || "").trim();
  const events = String(formData.get("events") || "").trim();
  const timeframe = String(formData.get("timeframe") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !company) {
    return { ok: false, message: "Please share your name, work email and company." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }
  if (size && !COMPANY_SIZES.includes(size as (typeof COMPANY_SIZES)[number])) {
    return { ok: false, message: "Please pick a company size from the list." };
  }
  if (events && !EVENTS_PER_YEAR.includes(events as (typeof EVENTS_PER_YEAR)[number])) {
    return { ok: false, message: "Please pick an event volume from the list." };
  }
  if (timeframe && !TIMEFRAMES.includes(timeframe as (typeof TIMEFRAMES)[number])) {
    return { ok: false, message: "Please pick a preferred timeframe from the list." };
  }
  if (message.length > 4000) {
    return { ok: false, message: "Please keep your note under 4,000 characters." };
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0B0F17;line-height:1.55">
      <h2 style="margin:0 0 12px;font-size:16px">New demo request</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Company</td><td>${esc(company)}</td></tr>
        ${role ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Role</td><td>${esc(role)}</td></tr>` : ""}
        ${size ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Company size</td><td>${esc(size)}</td></tr>` : ""}
        ${events ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Events per year</td><td>${esc(events)}</td></tr>` : ""}
        ${timeframe ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Preferred time</td><td>${esc(timeframe)}</td></tr>` : ""}
      </table>
      ${message ? `<hr style="border:none;border-top:1px solid #E6E8EE;margin:16px 0" /><div style="white-space:pre-wrap;font-size:14px">${esc(message)}</div>` : ""}
    </div>`;

  try {
    await sendMail({
      subject: `Demo request · ${company} · ${name}`,
      replyTo: email,
      html,
    });
    return {
      ok: true,
      message: "Thanks. We'll be in touch within one business day to confirm a time.",
    };
  } catch (err) {
    const m = err instanceof Error ? err.message : "";
    if (m === "EMAIL_NOT_CONFIGURED") {
      return { ok: false, message: "Demo requests aren't wired up yet. Please email info@evenx.co.uk directly." };
    }
    return { ok: false, message: "Something went wrong. Please email info@evenx.co.uk directly." };
  }
}
