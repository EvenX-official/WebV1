import type { Metadata } from "next";

// Technical SEO foundations (Halm, 4 Aug 2026). Positioning is
// "Event Operations Platform" throughout, never "event management software".
export const SITE = "https://evenx.co.uk";
const OG_IMAGE = `${SITE}/og-image.png`;

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE}${path}`,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

// FAQ schema for homepage and platform page. The Cvent/Eventbrite answer is
// the corrected version from Halm's 4 Aug 11:56 email.
export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EvenX?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EvenX is an event operations platform built for professional in-house event teams. It brings together vendor coordination, budget tracking, task management, guest management and Eva AI in one place so teams can plan and execute events without spreadsheets or group chats.",
      },
    },
    {
      "@type": "Question",
      name: "What is an event operations platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An event operations platform is purpose-built software for the execution layer of event planning — coordinating vendors, tracking budgets, managing tasks and team responsibilities, and keeping everything moving as the event date approaches. Unlike general project management tools, an event operations platform understands how events actually work.",
      },
    },
    {
      "@type": "Question",
      name: "How is EvenX different from tools like Cvent or Eventbrite?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cvent is built for large enterprise procurement teams with months to implement and budgets to match. Eventbrite solves ticketing and registration. EvenX is built for the professional in-house event team that needs operational rigour — vendor coordination, budget tracking, task management, approval workflows — without the complexity, cost, or lengthy onboarding of enterprise software. It is the difference between a platform built for your scale and one that was retrofitted for it.",
      },
    },
    {
      "@type": "Question",
      name: "Is EvenX suitable for small event teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EvenX is designed for in-house event teams of all sizes, from a solo event manager to a team of 25 or more.",
      },
    },
  ],
};

export const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EvenX",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "EvenX is the event operations platform for professional event teams. Coordinate vendors, track budgets, manage tasks and team coordination in one place with Eva AI working ahead of your team.",
  url: SITE,
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  publisher: {
    "@type": "Organization",
    name: "EvenX Ltd",
    url: SITE,
    logo: `${SITE}/logo.png`,
  },
};

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EvenX Ltd",
  url: SITE,
  logo: `${SITE}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@evenx.co.uk",
    contactType: "customer support",
  },
  address: { "@type": "PostalAddress", addressCountry: "GB" },
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
