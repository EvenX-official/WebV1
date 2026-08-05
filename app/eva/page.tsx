import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { EvaExperience } from "@/components/site/EvaExperience";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Eva — AI Event Intelligence by EvenX",
  "Eva watches every surface of your event workspace. She reconciles budgets, chases vendors, flags risks and drafts communications so your team stays ahead.",
  "/eva"
);

export default function EvaPage() {
  return (
    <>
      <Nav />
      <main>
        <EvaExperience />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
