import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service. EvenX",
  description:
    "The terms governing your use of EvenX. Written in plain English, aligned with UK law.",
};

const toc = [
  { id: "who-we-are",    label: "Who we are" },
  { id: "the-service",   label: "The service" },
  { id: "accounts",      label: "Accounts and eligibility" },
  { id: "subscriptions", label: "Subscriptions and billing" },
  { id: "trial",         label: "Free trial" },
  { id: "acceptable",    label: "Acceptable use" },
  { id: "content",       label: "Your content" },
  { id: "ip",            label: "Intellectual property" },
  { id: "ai",            label: "Eva and AI features" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "termination",   label: "Termination" },
  { id: "warranties",    label: "Warranties and disclaimers" },
  { id: "liability",     label: "Limitation of liability" },
  { id: "indemnity",     label: "Indemnification" },
  { id: "changes",       label: "Changes" },
  { id: "law",           label: "Governing law" },
  { id: "contact",       label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="The rules of the road for using EvenX."
      intro="These terms set out the agreement between you and EvenX Ltd when you use our platform. We've kept them as plain as we can while staying enforceable."
      lastUpdated="1 August 2026"
      toc={toc}
    >
      <LegalSection id="who-we-are" index={1} title="Who we are">
        <p>
          EvenX is a product of <strong>EvenX Ltd</strong>, a company registered in England &amp;
          Wales under company number 16776145, with our data protection registration held with
          the Information Commissioner's Office under reference ZC170755. In these terms,
          "EvenX", "we", "us" and "our" refer to EvenX Ltd.
        </p>
        <p>
          "You" and "your" refer to the person or organisation using the service. If you are
          agreeing to these terms on behalf of a company, you confirm you have authority to bind
          that company.
        </p>
      </LegalSection>

      <LegalSection id="the-service" index={2} title="The service">
        <p>
          EvenX is a software-as-a-service platform that helps teams plan, coordinate and deliver
          corporate events. Features include event workspaces, timelines, task and vendor
          management, budgets, approvals, reporting, and the Eva AI assistant.
        </p>
        <p>
          We work continuously to improve the service. We may add, change or remove features from
          time to time. Where a change materially reduces functionality on a paid plan, we will
          give reasonable prior notice.
        </p>
      </LegalSection>

      <LegalSection id="accounts" index={3} title="Accounts and eligibility">
        <p>
          You must be at least 18 years old to use EvenX. When you create an account, you agree
          to provide accurate information and keep your credentials secure. You are responsible
          for activity on your account.
        </p>
        <p>
          Admin users may invite other people to the workspace and assign roles. Admins are
          responsible for ensuring their organisation's use of EvenX complies with these terms.
        </p>
      </LegalSection>

      <LegalSection id="subscriptions" index={4} title="Subscriptions and billing">
        <p>
          Paid plans are billed monthly or annually in advance in GBP, exclusive of VAT. Payment
          is processed by our payment provider Stripe. Your subscription renews automatically for
          the same term unless cancelled before the renewal date.
        </p>
        <p>
          If you upgrade during a billing period, the difference is charged on a prorated basis.
          If you downgrade, the change takes effect at the start of the next billing period. Fees
          are non-refundable except where required by law.
        </p>
        <p>
          If payment fails, we will attempt to collect again and notify you. If payment remains
          outstanding after 14 days, we may suspend the account. Your data is retained during
          suspension for at least 30 days.
        </p>
      </LegalSection>

      <LegalSection id="trial" index={5} title="Free trial">
        <p>
          Every plan includes a two-month free trial with no credit card required to start. You
          have full access to the plan you select during the trial. If you decide to continue, we
          will bill you at the end of the trial. You can cancel at any point during the trial
          without charge.
        </p>
      </LegalSection>

      <LegalSection id="acceptable" index={6} title="Acceptable use">
        <p>You agree not to use EvenX to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Infringe intellectual property or privacy rights</li>
          <li>Send unsolicited communications or spam</li>
          <li>Upload malware or attempt to disrupt the service</li>
          <li>Reverse engineer, resell or sublicense the service</li>
          <li>Use the service to build a competing product</li>
        </ul>
      </LegalSection>

      <LegalSection id="content" index={7} title="Your content">
        <p>
          You retain ownership of everything you put into EvenX, including event plans, files, vendor
          details, budgets, messages and so on ("Customer Content"). You grant us a limited,
          non-exclusive licence to host, process and display your content solely to provide the
          service to you and your team.
        </p>
        <p>
          You are responsible for the lawfulness of Customer Content. You confirm you have the
          rights to upload and share it, and that it does not contain unlawful, harmful or
          infringing material.
        </p>
      </LegalSection>

      <LegalSection id="ip" index={8} title="Intellectual property">
        <p>
          EvenX and everything within it, including the platform itself, its design, source code
          and documentation, is owned by EvenX Ltd and its licensors. Nothing in these terms
          transfers any of that intellectual property to you. You may use the service only as
          expressly permitted.
        </p>
      </LegalSection>

      <LegalSection id="ai" index={9} title="Eva and AI features">
        <p>
          Eva is our AI assistant, built into EvenX. Eva can draft plans, generate timelines,
          identify risks and prepare communications. Eva may occasionally produce output that is
          inaccurate or incomplete. You should review Eva's output before relying on it,
          particularly for decisions with financial, legal or operational consequences.
        </p>
        <p>
          We do not use your Customer Content to train foundation models operated by third
          parties. Where an AI subprocessor is used to power Eva features, we contract for
          controls that prohibit training on your data.
        </p>
      </LegalSection>

      <LegalSection id="confidentiality" index={10} title="Confidentiality">
        <p>
          Each party may receive information from the other that is confidential. Each party
          agrees to use such information only to perform this agreement and to protect it with
          the same care it uses for its own confidential information.
        </p>
      </LegalSection>

      <LegalSection id="termination" index={11} title="Termination">
        <p>
          You can cancel your subscription at any time from your workspace settings. Cancellation
          takes effect at the end of the current billing period.
        </p>
        <p>
          We may suspend or terminate your account if you materially breach these terms. Upon
          termination, your right to use EvenX ends. You may export your data for 30 days after
          termination; after that period, data is deleted in accordance with our{" "}
          <a href="/security#compliance">Security &amp; Trust</a> policy.
        </p>
      </LegalSection>

      <LegalSection id="warranties" index={12} title="Warranties and disclaimers">
        <p>
          We warrant that we will provide the service with reasonable skill and care. Except as
          expressly stated in these terms, the service is provided "as is" and we disclaim all
          other warranties, whether express or implied, including fitness for a particular
          purpose and non-infringement, to the maximum extent permitted by law.
        </p>
        <p>
          We do not warrant that the service will be uninterrupted or error-free. See our{" "}
          <a href="/security">Security &amp; Trust</a> page for our uptime target and
          infrastructure detail.
        </p>
      </LegalSection>

      <LegalSection id="liability" index={13} title="Limitation of liability">
        <p>
          Nothing in these terms limits liability for death or personal injury caused by
          negligence, fraud, or any other liability that cannot lawfully be limited.
        </p>
        <p>
          Subject to the above, our total liability under or in connection with these terms in
          any 12-month period will not exceed the fees you paid us for the service in the 12
          months immediately preceding the event giving rise to the claim.
        </p>
        <p>
          Neither party is liable to the other for indirect, special or consequential loss,
          including loss of profits, revenue, business opportunity, or anticipated savings.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" index={14} title="Indemnification">
        <p>
          You agree to indemnify us against any third-party claims arising from Customer Content
          you upload or from your use of the service in breach of these terms, subject to our
          prompt notice and reasonable cooperation.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={15} title="Changes to these terms">
        <p>
          We may update these terms from time to time. If changes are material we will notify you
          in-app or by email at least 30 days before they take effect. Continued use of EvenX
          after the effective date constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection id="law" index={16} title="Governing law">
        <p>
          These terms are governed by the laws of England &amp; Wales. Any disputes will be
          subject to the exclusive jurisdiction of the courts of England &amp; Wales.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={17} title="Contact">
        <p>
          If you have questions about these terms, email us at{" "}
          <a href="mailto:info@evenx.co.uk">info@evenx.co.uk</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
