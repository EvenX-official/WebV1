"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "../Section";
import { EASE } from "@/lib/motion";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as an active event?",
    a: "An active event is one your team is planning, coordinating or delivering in EvenX. Once an event is completed and archived, it no longer counts toward your plan limit. You can archive and restore events at any time.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes two months free with no credit card required to start. You have full access to your chosen plan during the trial. If you decide to continue, we bill you at the end of the free period. Cancel any time.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade or downgrade at any point. Upgrades take effect immediately with a prorated charge; downgrades take effect at the start of the next billing cycle. Your event history and settings carry over.",
  },
  {
    q: "How does Eva, the AI event planner, work?",
    a: "Eva is built into EvenX and does not require a separate subscription. She reads your event brief, builds the plan, generates the timeline and budget, drafts tasks and communications, and flags risks as your team works. Every action Eva takes is reviewable, reversible and traceable — your team stays in control.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes. Paying annually is equivalent to two months free versus the monthly price on every plan. Annual customers also get first access to new capabilities and integrations.",
  },
  {
    q: "Can we invite external stakeholders and vendors?",
    a: "Yes. Vendors, sponsors, venues and external stakeholders can be invited into scoped workspaces with view or comment access — they do not count toward your team member limit. Core and Pro plans include richer vendor lifecycle tools.",
  },
  {
    q: "How is our data protected?",
    a: "EvenX is hosted in the UK and EU with encryption in transit and at rest, role-based access controls, SSO on Pro, and full audit logs. We do not train third-party models on your data. Full details are in our security overview.",
  },
  {
    q: "Do you integrate with our existing tools?",
    a: "Native integrations with Google Workspace, Microsoft 365, Slack, Teams, calendars, and common accounting, procurement and CRM systems are on our roadmap and will ship with the Pro plan. In the meantime, EvenX works alongside your current stack and we can advise on the best interim workflow for your team.",
  },
  {
    q: "What happens if we exceed a plan limit?",
    a: "We will never surprise-bill you. If you reach your active event or team member limit, we prompt you to upgrade or archive events. Your existing work is never locked or lost.",
  },
  {
    q: "How do we get set up?",
    a: "Starter customers self-serve in under 10 minutes. Core and Pro include a guided onboarding session with our team, template imports from your existing tools, and dedicated support for the first month.",
  },
];

function Item({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-surface-border last:border-b-0">
      <button
        onClick={onToggle}
        className="group w-full flex items-start justify-between gap-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] font-medium text-content-strong leading-snug">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="shrink-0 mt-0.5 h-7 w-7 rounded-full border border-surface-border grid place-items-center text-content-muted group-hover:text-content-strong group-hover:border-surface-border-strong transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={2.2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-12 text-[14.5px] text-content-muted leading-[1.6] max-w-[720px]">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <Section
      id="faq"
      eyebrow="Answers first"
      title="Frequently asked questions"
      intro="Everything you'd normally have to ask a salesperson."
    >
      <div className="mx-auto max-w-[880px] rounded-2xl border border-surface-border bg-white shadow-card px-6 md:px-8">
        {FAQS.map((f, i) => (
          <Item
            key={f.q}
            q={f.q}
            a={f.a}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
      <div className="mt-8 text-center text-[14px] text-content-muted">
        Still have a question?{" "}
        <a href="mailto:hello@evenx.co.uk" className="text-brand-blue-strong font-medium hover:underline">
          Talk to our team
        </a>
        .
      </div>
    </Section>
  );
}
