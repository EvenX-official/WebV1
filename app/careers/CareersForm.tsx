"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitApplication, type FormState } from "./actions";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

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

export function CareersForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitApplication, null);

  return (
    <form action={action} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name">
          <Input name="name" required autoComplete="name" placeholder="Halm Murungi" />
        </Field>
        <Field label="Email">
          <Input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Which department?">
          <Select name="department" required defaultValue="">
            <option value="" disabled>
              Pick one
            </option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Location" optional>
          <Input name="location" placeholder="London / Remote UK / …" />
        </Field>
      </div>

      <Field label="LinkedIn or CV link" optional hint="A public URL is fine.">
        <Input name="link" type="url" placeholder="https://linkedin.com/in/…" />
      </Field>

      <Field label="Why EvenX? What would you want to work on?">
        <Textarea
          name="message"
          required
          rows={6}
          maxLength={6000}
          placeholder="A few sentences on what you'd bring and what you'd like to build with us."
        />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send application"} <ArrowRight className="h-4 w-4" />
        </Button>
        <span className="text-[12px] text-content-subtle">
          By applying you agree to our{" "}
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
