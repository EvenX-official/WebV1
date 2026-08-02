"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitDemo, type FormState } from "./actions";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const SIZES = ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "501 to 1,000", "1,000+"];
const EVENTS = ["1 to 5", "6 to 15", "16 to 50", "50+"];
const TIMES = ["This week", "Next week", "In the next 2 weeks", "Flexible"];

export function DemoForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitDemo, null);

  return (
    <form action={action} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name">
          <Input name="name" required autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field label="Work email">
          <Input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company">
          <Input name="company" required autoComplete="organization" placeholder="Company name" />
        </Field>
        <Field label="Your role" optional>
          <Input name="role" autoComplete="organization-title" placeholder="Head of Events" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company size" optional>
          <Select name="size" defaultValue="">
            <option value="">Select</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Events per year" optional>
          <Select name="events" defaultValue="">
            <option value="">Select</option>
            {EVENTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Preferred time for the walkthrough" optional>
        <Select name="timeframe" defaultValue="Flexible">
          {TIMES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Anything specific you want to see?" optional>
        <Textarea
          name="message"
          rows={4}
          maxLength={4000}
          placeholder="e.g. we run a summit for 400 people twice a year and struggle with vendor triage."
        />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="xl" disabled={pending}>
          {pending ? "Sending…" : "Book a demo"} <ArrowRight className="h-4 w-4" />
        </Button>
        <span className="text-[12px] text-content-subtle">
          By requesting a demo you agree to our{" "}
          <a href="/privacy" className="underline hover:text-content">
            Privacy Policy
          </a>
          .
        </span>
      </div>

      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={`flex items-start gap-2 rounded-xl border p-3 text-[13px] leading-snug ${
              state.ok
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {state.ok ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            )}
            <span>{state.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
