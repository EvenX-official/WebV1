import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Server,
  Scale,
  KeyRound,
  Users,
  Network,
  MailWarning,
  Check,
  ArrowRight,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security & Trust. EvenX",
  description:
    "How EvenX protects your data and keeps your events running safely. Hosting, encryption, compliance, access control, subprocessors and responsible disclosure.",
};

const TOC = [
  { id: "commitment",     label: "Our commitment" },
  { id: "infrastructure", label: "Infrastructure & hosting" },
  { id: "compliance",     label: "Compliance & legal" },
  { id: "access",         label: "Access & authentication" },
  { id: "people",         label: "People & operations" },
  { id: "subprocessors",  label: "Subprocessors" },
  { id: "disclosure",     label: "Responsible disclosure" },
];

/* ---------- small building blocks ---------- */

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 first:mt-6">
      <h3 className="text-[15px] font-semibold text-content-strong">{title}</h3>
      <div className="mt-2 text-[15px] leading-[1.6] text-content-muted space-y-3">{children}</div>
    </div>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  intro,
  children,
}: {
  id: string;
  icon: typeof ShieldCheck;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-16 first:pt-0">
      <div className="flex items-start gap-4">
        <div className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-blue-soft text-brand-blue-strong border border-brand-blue/15">
          <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[26px] md:text-[32px] font-semibold tracking-tightest text-content-strong leading-tight">
            {title}
          </h2>
          {intro && <p className="mt-2 text-[15px] leading-[1.6] text-content-muted">{intro}</p>}
        </div>
      </div>
      <div className="mt-6 pl-0 sm:pl-14">{children}</div>
    </section>
  );
}

function Table({ rows, cols }: { cols: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="rounded-xl border border-surface-border overflow-hidden">
      <table className="w-full text-[14px]">
        <thead className="bg-surface-muted/60">
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-content-subtle"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-surface-border align-top">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? "font-medium text-content-strong" : "text-content-muted"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-content-muted">
          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.4} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- page ---------- */

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[420px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.06),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1120px] px-5 md:px-8 pt-20 md:pt-24 pb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              <ShieldCheck className="h-3 w-3 text-brand-blue" /> Security &amp; Trust
            </div>
            <h1 className="mt-6 font-display text-[42px] sm:text-[54px] md:text-[62px] leading-[1.02] tracking-tightest font-semibold text-content-strong max-w-[860px]">
              How we protect your data and keep your events running safely.
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-content-subtle">
              <span>Last updated: 1 August 2026</span>
              <span className="text-surface-border-strong">·</span>
              <span>EvenX Ltd</span>
              <span className="text-surface-border-strong">·</span>
              <span>Company No. 16776145 (England &amp; Wales)</span>
              <span className="text-surface-border-strong">·</span>
              <span>ICO No. ZC170755</span>
            </div>
          </div>
        </section>

        {/* Body: TOC + sections */}
        <section className="pb-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sticky TOC */}
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-24">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-3">
                  On this page
                </div>
                <ul className="space-y-1.5">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block text-[13px] text-content-muted hover:text-content-strong transition-colors py-1"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-surface-border bg-surface-muted/60 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-2">
                    Security contact
                  </div>
                  <a
                    href="mailto:support@evenx.co.uk?subject=Security%20Vulnerability%20Report"
                    className="text-[13px] font-medium text-brand-blue-strong hover:underline break-words"
                  >
                    support@evenx.co.uk
                  </a>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9 max-w-[780px]">
              <Section
                id="commitment"
                icon={ShieldCheck}
                title="Our commitment to security"
                intro="EvenX is built for teams who run real events, where a data breach or system outage has direct operational consequences. Security is not an afterthought; it is part of how we build the product."
              >
                <div className="rounded-2xl border border-surface-border bg-surface-muted/50 p-5 text-[15px] leading-[1.6] text-content-muted">
                  This page sets out our current security posture honestly. We are a growing SaaS
                  company. Where we have enterprise-grade controls in place, we say so. Where we
                  are building toward them, we say that too.
                </div>
              </Section>

              <Section
                id="infrastructure"
                icon={Server}
                title="Infrastructure & hosting"
                intro="Where your data lives, how it is transported, and how it is protected while at rest."
              >
                <SubSection title="Hosting & region">
                  <p>
                    EvenX is hosted entirely in the United Kingdom. Our application is deployed on
                    Vercel (UK/EU region) and our database runs on Supabase, hosted on AWS
                    eu-west-2 (London). Customer data does not leave the UK/EU without the
                    controls described in the Subprocessors section below.
                  </p>
                </SubSection>
                <SubSection title="Data residency">
                  <p>
                    Primary data storage is in the United Kingdom (AWS London, eu-west-2). EvenX
                    serves customers globally. Certain subprocessors, including Stripe, Clerk, and
                    OpenAI, may process data outside the UK as described in the Subprocessors
                    section. All international transfers are governed by appropriate safeguards
                    (UK IDTA or EU SCCs as applicable).
                  </p>
                </SubSection>
                <SubSection title="Encryption">
                  <p>
                    <strong className="text-content-strong">In transit.</strong> All data
                    transmitted between users and EvenX is encrypted using TLS 1.2 and TLS 1.3.
                    Unencrypted HTTP connections are automatically redirected to HTTPS.
                  </p>
                  <p>
                    <strong className="text-content-strong">At rest.</strong> All customer data
                    stored in our database is encrypted at rest using AES-256, enforced at the
                    infrastructure level by AWS and Supabase.
                  </p>
                </SubSection>
                <SubSection title="Backups">
                  <p>
                    Database backups are performed daily with a 30-day retention period. Backups
                    are encrypted and stored separately from primary data.
                  </p>
                </SubSection>
                <SubSection title="Availability">
                  <p>
                    EvenX targets 99.9% monthly uptime. Application infrastructure is managed by
                    Vercel, which provides automatic failover, global CDN and DDoS protection.
                    Database infrastructure is managed by Supabase on AWS, which provides
                    multi-AZ redundancy.
                  </p>
                </SubSection>
              </Section>

              <Section
                id="compliance"
                icon={Scale}
                title="Compliance & legal"
                intro="How EvenX is registered, insured, and governed under UK data protection law."
              >
                <SubSection title="Registrations">
                  <Table
                    cols={["Registration", "Status"]}
                    rows={[
                      ["ICO Registration (UK GDPR)", "Registered · ZC170755"],
                      ["Company Registration", "England & Wales · No. 16776145"],
                      ["Cyber Liability Insurance", "In place · underwritten by HISCOX"],
                    ]}
                  />
                </SubSection>
                <SubSection title="GDPR & data protection">
                  <p>
                    EvenX Ltd is the UK data controller for all customer data processed through
                    the platform. We process personal data in accordance with the UK General Data
                    Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                  </p>
                  <Bullets
                    items={[
                      "We collect only the data necessary to provide the service",
                      "We do not sell customer data to third parties",
                      "We do not use customer event data to train AI models",
                      "Data subjects may exercise their rights (access, erasure, portability) by contacting support@evenx.co.uk",
                      "A Data Processing Agreement (DPA) is available upon request",
                    ]}
                  />
                </SubSection>
                <SubSection title="Incident response">
                  <p>
                    EvenX maintains an internal incident response procedure. In the event of a
                    security incident that affects customer data:
                  </p>
                  <Bullets
                    items={[
                      "Affected customers are notified within 72 hours of EvenX becoming aware of the breach, in accordance with UK GDPR Article 33",
                      "Notification includes the nature of the incident, categories of data affected, and steps taken to mitigate impact",
                      "Serious incidents are reported to the ICO within the required timeframe",
                    ]}
                  />
                </SubSection>
                <SubSection title="Data deletion">
                  <p>
                    Upon account termination, customer data is deleted within 30 days. Encrypted
                    backups are purged within the 30-day retention window. Written confirmation of
                    deletion is available upon request.
                  </p>
                </SubSection>
              </Section>

              <Section
                id="access"
                icon={KeyRound}
                title="Access & authentication"
                intro="How your team signs in, what they can do once inside, and how those actions are recorded."
              >
                <SubSection title="Authentication features">
                  <p>
                    EvenX uses Clerk for authentication and identity management. Clerk is SOC 2
                    Type II certified. The following features are available to all EvenX customers:
                  </p>
                  <Bullets
                    items={[
                      "Email and password authentication with secure hashing",
                      "Google OAuth single sign-on",
                      "Role-based access control (RBAC) with Admin, Planner, Approver and Viewer roles",
                      "Automatic session expiry after 45 minutes of inactivity",
                    ]}
                  />
                  <p>
                    Enterprise SSO (SAML 2.0 / OIDC) is available on the Enterprise plan. Contact{" "}
                    <a href="mailto:support@evenx.co.uk" className="text-brand-blue-strong hover:underline">
                      support@evenx.co.uk
                    </a>{" "}
                    to discuss requirements.
                  </p>
                </SubSection>
                <SubSection title="Role-based access control">
                  <p>
                    EvenX enforces role-based permissions across the platform. Organisation billing
                    and settings are accessible to Admin roles only. Team members cannot access
                    payment information, organisation configuration, or other users' personal data
                    beyond what their role requires.
                  </p>
                </SubSection>
                <SubSection title="Audit logging">
                  <p>
                    Authentication events, including sign-in, sign-out, and password changes, are
                    logged via Clerk with a 90-day retention period.
                  </p>
                </SubSection>
              </Section>

              <Section
                id="people"
                icon={Users}
                title="People & operational security"
                intro="Who can reach production, and how the application itself is tested."
              >
                <SubSection title="Access to production systems">
                  <p>
                    Access to production systems and customer data is restricted to authorised
                    EvenX personnel on a least-privilege basis. Access is granted only where
                    required for the role. All personnel with access to production data have
                    agreed to confidentiality obligations.
                  </p>
                </SubSection>
                <SubSection title="Penetration testing">
                  <p>
                    EvenX relies on the security controls and penetration testing programmes of
                    its infrastructure partners. Vercel, Supabase, Clerk and Stripe each conduct
                    regular third-party penetration tests. Independent third-party penetration
                    testing of the EvenX application is planned prior to enterprise customer
                    onboarding.
                  </p>
                </SubSection>
              </Section>

              <Section
                id="subprocessors"
                icon={Network}
                title="Subprocessors"
                intro="Third parties that process customer data on our behalf. Each is bound by a data processing agreement."
              >
                <Table
                  cols={["Subprocessor", "Purpose", "Location"]}
                  rows={[
                    ["Supabase (AWS)", "Database & file storage", "UK (London)"],
                    ["Vercel", "Application hosting & CDN", "UK / EU"],
                    ["Stripe", "Payment processing & billing", "US (EU/UK DPA)"],
                    ["Clerk", "Authentication & identity", "US (SOC 2)"],
                    ["OpenAI", "Eva AI features", "US (DPA available)"],
                    ["Resend", "Transactional email delivery", "US"],
                  ]}
                />
                <p className="mt-4 text-[14px] leading-[1.6] text-content-muted">
                  An up-to-date subprocessor list is available upon request. EvenX will provide 30
                  days' notice of material changes to subprocessors that may affect data processing.
                </p>
              </Section>

              <Section
                id="disclosure"
                icon={MailWarning}
                title="Security contact & responsible disclosure"
                intro="If you find something, tell us. Here's how, and what you can expect back."
              >
                <SubSection title="Reporting a vulnerability">
                  <p>
                    If you discover a security vulnerability in our platform, please report it
                    responsibly. Please include a clear description of the vulnerability, steps to
                    reproduce it, and any evidence of potential impact. Do not attempt to access,
                    modify or delete customer data as part of testing.
                  </p>
                  <div className="rounded-xl border border-surface-border bg-surface-muted/50 p-4 text-[14px] text-content-strong">
                    <div>
                      <span className="text-content-subtle">Email: </span>
                      <a
                        href="mailto:support@evenx.co.uk?subject=Security%20Vulnerability%20Report"
                        className="font-medium text-brand-blue-strong hover:underline"
                      >
                        support@evenx.co.uk
                      </a>
                    </div>
                    <div className="mt-1">
                      <span className="text-content-subtle">Subject line: </span>
                      <span className="font-medium">Security Vulnerability Report</span>
                    </div>
                  </div>
                </SubSection>
                <SubSection title="Our commitment">
                  <Bullets
                    items={[
                      "We will acknowledge your report within 48 hours",
                      "We will investigate and provide an update within 10 business days",
                      "We aim to resolve confirmed vulnerabilities within 30 days of validation",
                      "We will not pursue legal action against researchers who report in good faith",
                    ]}
                  />
                  <p>
                    EvenX does not currently operate a bug bounty programme. We recognise and thank
                    all researchers who responsibly disclose vulnerabilities.
                  </p>
                </SubSection>
              </Section>

              {/* Footer CTA */}
              <div className="mt-20 rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-content-strong">
                    Need our DPA, subprocessor list or a signed security questionnaire?
                  </div>
                  <div className="mt-1 text-[13px] text-content-muted">
                    We respond within one business day.
                  </div>
                </div>
                <Link href="mailto:support@evenx.co.uk?subject=Security%20questionnaire">
                  <Button size="lg">
                    Contact security <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="mt-10 text-[12px] text-content-subtle">
                EvenX Ltd · Company No. 16776145 (England &amp; Wales) · ICO Registration No.
                ZC170755 · support@evenx.co.uk · evenx.co.uk
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
