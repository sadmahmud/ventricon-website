import type { Metadata } from "next";
import { services } from "@/lib/services";
import { generalFaqs } from "@/lib/process";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ServiceNav } from "@/components/services/ServiceNav";
import { ServiceIndexSection } from "@/components/services/ServiceSections";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Services — Branding, Web, Marketing, AI & Business Systems",
  description:
    "Five capabilities under one roof: Branding & Design, Website & E-commerce, Digital Marketing, AI & Automation, and Business Systems. Scope, deliverables, timelines and pricing models for each.",
  path: "/services",
  keywords: [
    "branding services",
    "web development services",
    "digital marketing services",
    "AI automation services",
    "business systems consulting",
  ],
});

const serviceFaqsForIndex = generalFaqs.slice(0, 5);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        eyebrowIcon="layers"
        title="Five capabilities. One senior team. One accountability line."
        titleAccent="Five capabilities. "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        lede={
          <>
            <p>
              Branding &amp; Design, Website &amp; E-commerce, Digital
              Marketing, AI &amp; Automation and Business Systems. Each one is
              a complete discipline with its own deliverables, timelines and
              engagement models — and they are designed to work together.
            </p>
            <p className="mt-4">
              Use one, or use all five. What stays constant is the method:
              define the objective, agree how it will be measured, then build.
            </p>
          </>
        }
        actions={
          <>
            <Button href="/contact" size="lg" icon="arrowRight">
              Get started
            </Button>
            <Button href="/solutions" variant="outline" size="lg" icon="compass">
              Browse solutions
            </Button>
          </>
        }
        aside={
          <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
              On this page
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:border-brand-300/35 hover:text-white"
                  >
                    <Icon
                      name={service.icon}
                      className="h-4 w-4 shrink-0 text-brand-200"
                    />
                    <span className="flex-1">{service.name}</span>
                    <span className="font-mono text-[0.625rem] text-slate-500">
                      {service.engagements[1]?.duration.split(" ")[0] ?? ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Typical durations shown for the core engagement. Retainers are
              available for every service.
            </p>
          </div>
        }
      />

      {/* Sticky service navigation */}
      <div className="border-b border-white/8 bg-ink-950">
        <Container>
          <ServiceNav />
        </Container>
      </div>

      {/* Detailed section per service */}
      <div>
        {services.map((service, index) => (
          <ServiceIndexSection
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>

      {/* How the work is delivered */}
      <ProcessTimeline compact />

      {/* Why choose one partner for all five */}
      <Section className="border-t border-white/8 bg-ink-900/35">
        <Container>
          <SectionHeading
            eyebrow="One partner or several?"
            eyebrowIcon="users"
            title="When combining services is cheaper than buying them separately."
            lede="There is no penalty for hiring us for a single service. But there are three situations where doing more than one together produces a materially better result."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: "sparkles" as const,
                title: "Brand and website, together",
                body: "Positioning decided in isolation from the site leads to a rebuild six months later. Doing both means the message, the design system and the pages that carry it are decided once.",
                saving: "Saves one rebuild cycle",
              },
              {
                icon: "chart" as const,
                title: "Website and marketing, together",
                body: "A site built without knowing which campaigns will feed it produces irrelevant landing pages. Building them as a system means tracking, offers and creative line up from day one.",
                saving: "Faster time to first qualified lead",
              },
              {
                icon: "flow" as const,
                title: "Automation and systems, together",
                body: "Automating a broken process just breaks faster. Sorting the system of record first, then automating on top of it, keeps data clean and the automations maintainable.",
                saving: "Avoids rework and migration",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="h-full">
                <div className="vc-panel flex h-full flex-col gap-4 rounded-3xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-pulse-400 uppercase">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {item.saving}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/solutions" icon="compass">
              See packaged solutions
            </Button>
            <Button href="/work" variant="outline" icon="briefcase">
              Read engagement blueprints
            </Button>
          </div>
        </Container>
      </Section>

      <FaqSection
        items={serviceFaqsForIndex}
        heading="Questions about scope, pricing and process."
        eyebrow="Service FAQ"
        lede="General answers that apply across all five services. Each service page carries its own specific questions too."
      />

      <FinalCta
        heading="Which of the five do you actually need?"
        lede={`Tell us what's happening in the business and we'll tell you — including when the honest answer is a smaller engagement than you expected.`}
        primaryLabel="Get started"
        secondaryLabel="See our work"
        secondaryHref="/work"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...services.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.summary,
              path: `/services/${service.slug}`,
            }),
          ),
          faqSchema(serviceFaqsForIndex),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "VENTRICON services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.name,
              url: `${site.url}/services/${service.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
