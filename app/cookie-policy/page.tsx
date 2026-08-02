import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy. EvenX",
  description:
    "The cookies EvenX uses, why we use them, and how you can manage them.",
};

const toc = [
  { id: "what",    label: "What are cookies" },
  { id: "we-use",  label: "What cookies EvenX uses" },
  { id: "manage",  label: "How to manage cookies" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookie Policy"
      title="The cookies we use, in plain English."
      intro="This page lists the cookies EvenX sets on your device, why we set them, and how you can turn them off."
      lastUpdated="1 August 2026"
      toc={toc}
    >
      <LegalSection id="what" index={1} title="What are cookies">
        <p>
          Cookies are small text files that a website places on your device to remember you between
          visits or across pages. Some cookies are strictly necessary for the site to work. Others
          help us understand how the site is used so we can improve it.
        </p>
      </LegalSection>

      <LegalSection id="we-use" index={2} title="What cookies EvenX uses">
        <h3>Essential cookies</h3>
        <p>
          Set by our authentication provider (Clerk) to keep you signed in and to protect the
          service from abuse. These cookies are necessary for the platform to function and cannot
          be declined. They contain no marketing or profiling information.
        </p>
        <h3>Analytics cookies</h3>
        <p>
          Used to understand aggregate site usage, such as which pages are visited and where
          people arrive from. They are only set if you accept cookies in the banner. Declining
          switches them off and clears any that were previously set.
        </p>
      </LegalSection>

      <LegalSection id="manage" index={3} title="How to manage cookies">
        <p>
          You can change your choice at any time by clearing the site's data in your browser and
          reloading the page. You can also block or delete cookies at the browser level. Popular
          browsers include the following help pages:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Blocking essential cookies may prevent parts of the platform from working correctly.
        </p>
      </LegalSection>

      <LegalSection id="contact" index={4} title="Contact">
        <p>
          Questions about our cookie use can be sent to{" "}
          <a href="mailto:support@evenx.co.uk">support@evenx.co.uk</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
