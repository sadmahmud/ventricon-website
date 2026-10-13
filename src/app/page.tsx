import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { generalFaqs } from "@/lib/process";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { SectorMarquee } from "@/components/sections/StatsBand";
import { WhyVentricon } from "@/components/sections/WhyVentricon";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { AboutPreview, Commitments } from "@/components/sections/AboutPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Business Solutions & Technology`,
  sufficed: false,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectorMarquee />

      {/* 1 — Services */}
      <ServiceGrid id="services" />

      {/* 2 — Why VENTRICON */}
      <WhyVentricon />

      {/* 3 — How we work */}
      <ProcessTimeline />

      {/* 4 — Featured work */}
      <FeaturedWork />

      {/* 5 — About */}
      <AboutPreview />
      <Commitments />

      {/* 6 — Final CTA */}
      <FinalCta />

      {/* 7 — Contact */}
      <ContactSection />

      <JsonLd data={faqSchema(generalFaqs.slice(0, 6))} />
    </>
  );
}
