import type { Metadata } from "next";
import { projects, workCategories } from "@/lib/work";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectorMarquee } from "@/components/sections/StatsBand";
import { WorkFilterGrid } from "@/components/work/WorkFilterGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Work — Engagement blueprints",
  description:
    "How VENTRICON runs each type of engagement: the problem, the approach, the stack and the result targets we commit to — across retail, manufacturing, logistics, healthcare, distribution and SaaS.",
  path: "/work",
  keywords: [
    "agency case studies",
    "engagement blueprints",
    "digital project examples",
    "ecommerce case study",
    "CRM implementation case study",
  ],
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        eyebrowIcon="briefcase"
        title="Engagement blueprints, published in full."
        titleAccent="Engagement blueprints, "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work" },
        ]}
        lede={
          <>
            <p>
              A logo wall tells you almost nothing. Instead, we publish how each
              type of engagement is actually run: the situation, the decisions,
              the stack, the timeline and the result targets we hold ourselves
              to.
            </p>
            <p className="mt-4">
              Client names and verified figures are shared under NDA on request.
              Sector and scale are always accurate.
            </p>
          </>
        }
        actions={
          <>
            <Button href="/contact" size="lg" icon="arrowRight">
              Discuss your project
            </Button>
            <Button href="/services" variant="outline" size="lg" icon="layers">
              See the services used
            </Button>
          </>
        }
        aside={
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <div className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold text-white">
                {projects.length}
              </span>
              <span className="text-xs text-slate-400">Published blueprints</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold text-white">
                {workCategories.length}
              </span>
              <span className="text-xs text-slate-400">Disciplines covered</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold text-white">
                {new Set(projects.map((p) => p.sector)).size}
              </span>
              <span className="text-xs text-slate-400">Sectors represented</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold text-white">
                5
              </span>
              <span className="text-xs text-slate-400">Capabilities applied</span>
            </div>
          </div>
        }
      />

      <SectorMarquee />

      {/* Filterable grid */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Filter"
            eyebrowIcon="search"
            title="Find the blueprint closest to your situation."
            lede="Filter by discipline, then open any blueprint for the full narrative — including the parts that were harder than expected."
          />

          <div className="mt-10">
            {/* Prerendered with every blueprint, then filtered on the client. */}
            <WorkFilterGrid />
          </div>
        </Container>
      </Section>

      {/* Methodology */}
      <Section className="border-t border-white/8 bg-ink-900/35">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="How we publish work"
                eyebrowIcon="shield"
                title="Why there are no logos or invented metrics here."
                lede="A page full of client logos and unattributed percentages is easy to produce and impossible to verify. So we took a different approach."
              />

              <div className="vc-prose mt-8 flex flex-col gap-4">
                <p>
                  Every blueprint states the situation in the client&apos;s
                  terms, the sequence of decisions, the platforms used and the
                  result targets we agreed to be measured against. Where a
                  number is a target rather than a delivered outcome, it is
                  labelled as one.
                </p>
                <p>
                  Clients are described by sector and scale so nothing
                  confidential is exposed. If you want to speak to a reference,
                  we&apos;ll arrange it during the proposal stage — with the
                  client&apos;s permission, on a real engagement comparable to
                  yours.
                </p>
              </div>

              <div className="mt-8">
                <Button href="/contact" variant="outline" icon="users">
                  Request a reference
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
              {[
                {
                  icon: "target" as const,
                  title: "The situation",
                  body: "What was actually broken, in the words the client used — including the constraints nobody enjoys admitting.",
                },
                {
                  icon: "compass" as const,
                  title: "The approach",
                  body: "The sequence of decisions, not just the finished artefact. Why this order, why these trade-offs.",
                },
                {
                  icon: "code" as const,
                  title: "The stack",
                  body: "The platforms and tools used, so you can judge maintainability and cost of ownership for yourself.",
                },
                {
                  icon: "chart" as const,
                  title: "The measurement",
                  body: "The metrics agreed at kick-off, with targets labelled as targets and delivered results confirmed by the client.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-ink-900/50 p-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[0.9375rem] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta
        heading="Your situation won't match any blueprint exactly."
        lede="That's expected. Bring us the specifics — the constraints, the dead ends, the deadline — and we'll tell you what we'd do and what it would cost."
        primaryLabel="Start a project"
        secondaryLabel="Compare services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "VENTRICON engagement blueprints",
            description:
              "Detailed breakdowns of how VENTRICON runs each type of engagement.",
            hasPart: projects.map((project) => ({
              "@type": "Article",
              headline: project.title,
              about: project.sector,
              url: `${site.url}/work/${project.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
