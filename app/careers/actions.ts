"use server";

import { sendMail, esc } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

const DEPARTMENTS = [
  "Engineering",
  "Product & Design",
  "Sales",
  "Marketing",
  "Customer Success",
  "Operations",
  "Founder's Office",
  "Other",
] as const;

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") || "")) return { ok: true, message: "Thanks." };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const department = String(formData.get("department") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const link = String(formData.get("link") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !department || !message) {
    return {
      ok: false,
      message: "Please share your name, email, department and a short note.",
    };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }
  if (!DEPARTMENTS.includes(department as (typeof DEPARTMENTS)[number])) {
    return { ok: false, message: "Please pick a department from the list." };
  }
  if (link && !/^https?:\/\/\S+$/.test(link)) {
    return { ok: false, message: "Your link should start with http:// or https://" };
  }
  if (message.length > 6000) {
    return { ok: false, message: "Please keep your note under 6,000 characters." };
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0B0F17;line-height:1.55">
      <h2 style="margin:0 0 12px;font-size:16px">New job application</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#727A88">Department</td><td>${esc(department)}</td></tr>
        ${location ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">Location</td><td>${esc(location)}</td></tr>` : ""}
        ${link ? `<tr><td style="padding:4px 12px 4px 0;color:#727A88">CV / LinkedIn</td><td><a href="${esc(link)}">${esc(link)}</a></td></tr>` : ""}
      </table>
      <hr style="border:none;border-top:1px solid #E6E8EE;margin:16px 0" />
      <div style="white-space:pre-wrap;font-size:14px">${esc(message)}</div>
    </div>`;

  try {
    await sendMail({
      subject: `Careers · ${department} · ${name}`,
      replyTo: email,
      html,
    });
    return {
      ok: true,
      message:
        "Thanks. We read every application and reply within one week, even when there isn't a fit right now.",
    };
  } catch (err) {
    const m = err instanceof Error ? err.message : "";
    if (m === "EMAIL_NOT_CONFIGURED") {
      return {
        ok: false,
        message: "Applications aren't wired up yet. Please email info@evenx.co.uk directly.",
      };
    }
    return {
      ok: false,
      message: "Something went wrong sending your application. Please email info@evenx.co.uk directly.",
    };
  }
}
