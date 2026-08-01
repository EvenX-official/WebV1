import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Contrast } from "@/components/site/Contrast";
import { Workspace } from "@/components/site/Workspace";
import { Modules } from "@/components/site/Modules";
import { EvaExperience } from "@/components/site/EvaExperience";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Contrast />
        <Workspace />
        <Modules />
        <EvaExperience />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
