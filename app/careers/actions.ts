"use server";

import { forwardLead } from "@/lib/email";

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

  try {
    await forwardLead({
      kind: "contact",
      name, email,
      fields: {
        Subject: "Careers application",
        ...(department ? { Department: department } : {}),
        ...(location ? { Location: location } : {}),
        ...(link ? { "CV / LinkedIn": link } : {}),
        Message: message,
        Source: "Careers page",
      },
    });
    return {
      ok: true,
      message:
        "Thanks. We read every application and reply within one week, even when there isn't a fit right now.",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong. Please email info@evenx.co.uk directly.",
    };
  }
}
