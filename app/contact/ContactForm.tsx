"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact, type FormState } from "./actions";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const TOPICS = ["General", "Sales", "Support", "Partnership", "Press"] as const;

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, null);

  return (
    <form action={action} className="space-y-4">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

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
        <Field label="Company" optional>
          <Input name="company" autoComplete="organization" placeholder="Company name" />
        </Field>
        <Field label="What's this about?">
          <Select name="topic" defaultValue="General">
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="How can we help?">
        <Textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us a bit about what you're trying to do."
          maxLength={4000}
        />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send message"} <ArrowRight className="h-4 w-4" />
        </Button>
        <span className="text-[12px] text-content-subtle">
          By sending you agree to our{" "}
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
