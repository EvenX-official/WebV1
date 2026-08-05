import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Workspace } from "@/components/site/Workspace";
import { Modules } from "@/components/site/Modules";
import { Contrast } from "@/components/site/Contrast";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { JsonLd, FAQ_SCHEMA, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Platform Features — EvenX Event Operations Platform",
  "Vendor coordination, budget tracking, team task management, guest management and Eva AI — everything your event operations team needs in one place.",
  "/platform"
);

export default function PlatformPage() {
  return (
    <>
      <Nav />
      <main>
        <Contrast />
        <Workspace />
        <Modules />
        <CTA />
      </main>
      <Footer />
      <JsonLd data={FAQ_SCHEMA} />
    </>
  );
}
