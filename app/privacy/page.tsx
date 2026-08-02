import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy. EvenX",
  description:
    "How EvenX collects, uses and protects your personal data, aligned with UK GDPR and the Data Protection Act 2018.",
};

const toc = [
  { id: "who-we-are",   label: "Who we are" },
  { id: "collect",      label: "What we collect" },
  { id: "how-use",      label: "How we use it" },
  { id: "legal-basis",  label: "Legal bases" },
  { id: "sharing",      label: "Sharing your data" },
  { id: "transfers",    label: "International transfers" },
  { id: "retention",    label: "How long we keep data" },
  { id: "rights",       label: "Your rights" },
  { id: "cookies",      label: "Cookies" },
  { id: "security",     label: "How we protect data" },
  { id: "children",     label: "Children" },
  { id: "changes",      label: "Changes to this policy" },
  { id: "contact",      label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle your data, in plain English."
      intro="This policy explains what personal data EvenX collects, how we use it, and the choices you have. It applies to visitors to our website, users of our platform, and applicants for jobs."
      lastUpdated="1 August 2026"
      toc={toc}
    >
      <LegalSection id="who-we-are" index={1} title="Who we are">
        <p>
          <strong>EvenX Ltd</strong> is the data controller for personal data collected through
          our website (evenx.co.uk) and our platform. We are a company registered in England
          &amp; Wales under number 16776145 and registered with the Information Commissioner's
          Office under reference ZC170755.
        </p>
        <p>
          We process personal data in accordance with the UK General Data Protection Regulation
          (UK GDPR) and the Data Protection Act 2018.
        </p>
      </LegalSection>

      <LegalSection id="collect" index={2} title="What we collect">
        <h3>When you visit the website</h3>
        <ul>
          <li>Basic technical information such as your device, browser and IP address</li>
          <li>Pages visited and general usage patterns, in aggregate form</li>
          <li>Information you submit via our contact or careers forms</li>
        </ul>
        <h3>When you use the platform</h3>
        <ul>
          <li>Account information: your name, work email, and organisation</li>
          <li>Authentication data (managed on our behalf by Clerk)</li>
          <li>Event data you or your team create in your workspace</li>
          <li>Files and attachments you upload</li>
          <li>Communication records within the workspace</li>
          <li>Usage data such as feature interactions and audit events</li>
          <li>Billing information (processed by Stripe; we do not store full card details)</li>
        </ul>
        <h3>When you apply for a job</h3>
        <ul>
          <li>Your name, contact details, department of interest and any links you share</li>
          <li>The content of your application message</li>
        </ul>
      </LegalSection>

      <LegalSection id="how-use" index={3} title="How we use it">
        <ul>
          <li>To provide, secure and improve the EvenX platform</li>
          <li>To communicate with you about your account, updates and support requests</li>
          <li>To process payments and manage subscriptions</li>
          <li>To respond to enquiries submitted through our website</li>
          <li>To evaluate job applications and manage recruitment</li>
          <li>To meet legal and regulatory obligations</li>
          <li>To analyse aggregate usage patterns and improve product decisions</li>
        </ul>
        <p>
          <strong>We do not sell your personal data.</strong> We do not use your event data or
          content to train third-party AI models.
        </p>
      </LegalSection>

      <LegalSection id="legal-basis" index={4} title="Legal bases for processing">
        <ul>
          <li>
            <strong>Contract.</strong> To provide EvenX to you and administer your subscription.
          </li>
          <li>
            <strong>Legitimate interests.</strong> To secure our systems, understand how the
            product is used, prevent fraud, and communicate about your account.
          </li>
          <li>
            <strong>Consent.</strong> For optional communications such as newsletters, where
            requested. You can withdraw consent at any time.
          </li>
          <li>
            <strong>Legal obligation.</strong> Where processing is required by law, such as
            responding to regulator requests.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" index={5} title="Sharing your data">
        <p>
          We share personal data only with the subprocessors necessary to deliver EvenX. Each
          subprocessor is bound by a data processing agreement and appropriate security controls.
        </p>
        <ul>
          <li>
            <strong>Supabase (AWS).</strong> Database and file storage. UK (London).
          </li>
          <li>
            <strong>Vercel.</strong> Application hosting and CDN. UK / EU.
          </li>
          <li>
            <strong>Stripe.</strong> Payment processing and billing. US, under UK/EU DPA.
          </li>
          <li>
            <strong>Clerk.</strong> Authentication and identity. US, SOC 2 Type II.
          </li>
          <li>
            <strong>OpenAI.</strong> Powers Eva AI features. US, DPA available. Content is not
            used to train foundation models.
          </li>
          <li>
            <strong>Resend.</strong> Transactional email delivery. US.
          </li>
        </ul>
        <p>
          We may also disclose personal data if required by law, regulation or valid legal
          process, or to protect the rights, property or safety of EvenX, our customers or
          others.
        </p>
      </LegalSection>

      <LegalSection id="transfers" index={6} title="International transfers">
        <p>
          Primary data storage is in the United Kingdom. Certain subprocessors listed above may
          process data outside the UK. Where personal data is transferred outside the UK, we rely
          on appropriate safeguards including the UK International Data Transfer Agreement (UK
          IDTA) or the EU Standard Contractual Clauses, as applicable.
        </p>
      </LegalSection>

      <LegalSection id="retention" index={7} title="How long we keep data">
        <ul>
          <li>
            <strong>Account and workspace data.</strong> For as long as your account is active,
            and up to 30 days after termination, at which point it is deleted. Encrypted backups
            are purged within the 30-day rolling backup window.
          </li>
          <li>
            <strong>Authentication logs.</strong> 90 days (via Clerk).
          </li>
          <li>
            <strong>Billing records.</strong> For as long as required by UK tax and accounting
            law (typically 6 years).
          </li>
          <li>
            <strong>Contact form submissions.</strong> Up to 24 months, unless a longer retention
            is necessary to serve you.
          </li>
          <li>
            <strong>Job applications.</strong> 12 months from receipt, then deleted unless you
            ask us to keep them for future roles.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="rights" index={8} title="Your rights">
        <p>Under UK GDPR you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Ask us to correct inaccurate data</li>
          <li>Ask us to erase your data ("right to be forgotten")</li>
          <li>Restrict or object to certain kinds of processing</li>
          <li>Receive a portable copy of your data</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:info@evenx.co.uk">info@evenx.co.uk</a>. We will respond within one
          month. You also have the right to complain to the Information Commissioner's Office
          (ico.org.uk).
        </p>
      </LegalSection>

      <LegalSection id="cookies" index={9} title="Cookies">
        <p>
          Our website uses a minimal set of cookies. Strictly necessary cookies keep you signed
          in and remember your preferences. We use privacy-friendly analytics that do not track
          you across other sites. Where we would use non-essential cookies, we will ask for your
          consent first.
        </p>
      </LegalSection>

      <LegalSection id="security" index={10} title="How we protect your data">
        <p>
          Encryption in transit (TLS 1.2/1.3) and at rest (AES-256), UK-based hosting, role-based
          access control, and audited access to production systems. For the full detail, see our{" "}
          <a href="/security">Security &amp; Trust</a> page.
        </p>
      </LegalSection>

      <LegalSection id="children" index={11} title="Children">
        <p>
          EvenX is not intended for use by anyone under 18. We do not knowingly collect personal
          data from children. If you believe a child has provided us with personal data, please
          contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" index={12} title="Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be communicated
          in-app or by email at least 30 days before they take effect. The "Last updated" date at
          the top of this page indicates when it was most recently revised.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={13} title="Contact">
        <p>
          Questions or requests about your data can be sent to{" "}
          <a href="mailto:info@evenx.co.uk">info@evenx.co.uk</a>. For security concerns, see the
          <a href="/security#disclosure"> responsible disclosure</a> section of our Security page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
