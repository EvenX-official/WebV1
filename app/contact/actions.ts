"use server";

import { forwardLead } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

const TOPICS = ["General", "Sales", "Support", "Partnership", "Press"] as const;

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot. If the hidden 'website' field is filled, this is a bot.
  // Return a fake success so the bot doesn't retry, and never forward
  // the payload to the lead pipeline.
  if (String(formData.get("website") || "").trim() !== "") {
    return { ok: true, message: "Thanks, we'll be in touch within one business day." };
  }

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

  try {
    await forwardLead({
      kind: "contact",
      name, email, company,
      fields: { Topic: topic, Message: message, Source: "Contact page" },
    });
    return { ok: true, message: "Thanks, we'll be in touch within one business day." };
  } catch {
    return {
      ok: false,
      message: "Something went wrong sending your message. Please email info@evenx.co.uk directly.",
    };
  }
}
