"use server";

import { forwardLead } from "@/lib/email";

export type FormState = { ok: boolean; message: string } | null;

const COMPANY_SIZES = ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "501 to 1,000", "1,000+"] as const;
const EVENTS_PER_YEAR = ["1 to 5", "6 to 15", "16 to 50", "50+"] as const;
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

  try {
    await forwardLead({
      kind: "pilot",
      name, email, company,
      fields: {
        ...(role ? { Role: role } : {}),
        ...(size ? { "Company size": size } : {}),
        ...(events ? { "Events per year": events } : {}),
        ...(timeframe ? { "Preferred time": timeframe } : {}),
        ...(message ? { Message: message } : {}),
        Source: "Book a demo",
      },
    });
    return {
      ok: true,
      message: "Thanks. We'll be in touch within one business day to confirm a time.",
    };
  } catch {
    return { ok: false, message: "Something went wrong. Please email info@evenx.co.uk directly." };
  }
}
