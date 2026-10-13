import Link from "next/link";
import type { Metadata } from "next";
import { solutions } from "@/lib/solutions";
import { services, serviceById } from "@/lib/services";
import { contactGuidance, generalFaqs } from "@/lib/process";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = buildMetadata({
  title: "Solutions — Outcome-first programmes",
  description:
    "Six packaged programmes that bundle VENTRICON's five services into a single scope: launch a business, grow online sales, generate qualified leads, automate operations, unify systems, or run a full transformation.",
  path: "/solutions",
  keywords: [
    "business launch programme",
    "ecommerce growth programme",
    "lead generation system",
    "operations automation programme",
    "digital transformation partner",
  ],
});

const solutionFaqs = [
  {
    q: "What's the difference between a service and a solution?",
    a: "A service is a capability — for example, Digital Marketing. A solution is an outcome — for example, Generate Qualified Leads, which combines marketing, CRM systems and automation to produce a measurable pipeline. If you know exactly which capability you need, buy the service. If you know the outcome but not the path, buy the solution.",
  },
  {
    q: "Can a solution be split or phased?",
    a: "Yes, and it often should be. Every programme is proposed in phases, each with its own scope, price and measurable result. Most clients commit to phase one, review the numbers, then decide on phase two with better information.",
  },
  {
    q: "How is a programme priced?",
    a: "Each phase is quoted as a fixed price against a fixed scope, so you approve the total before we begin. Retainer components — marketing management, ongoing automation, systems support — are quoted separately with defined capacity. Third-party costs like ad spend, licences and hosting are paid directly by you.",
  },
  {
    q: "What if we don't fit neatly into any of these?",
    a: "Most businesses don't, exactly. The solutions are starting points that reflect the patterns we see most often. Tell us the actual situation on the contact form and we'll propose a scope built around it rather than forcing your problem into a package.",
  },
  ...generalFaqs.slice(2, 5),
];

export default function SolutionsPage() {
  const matrix = solutions.map((solution) => ({
    solution,
    included: new Set(solution.services),
  }));

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        eyebrowIcon="compass"
        title="Buy the outcome, not a list of deliverables."
        titleAccent="Buy the outcome, "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions" },
        ]}
        lede={
          <>
            <p>
              Services are capabilities. Solutions are the business result you
              are actually after — a launch, a pipeline, more margin, less
              manual work, one source of truth.
            </p>
            <p className="mt-4">
              Each programme below bundles the capabilities required, in the
              right order, behind a single scope, a single price and one
              accountable team.
            </p>
          </>
        }
        actions={
          <>
            <Button href="/contact" size="lg" icon="arrowRight">
              Scope my programme
            </Button>
            <Button href="/services" variant="outline" size="lg" icon="layers">
              Browse services instead
            </Button>
          </>
        }
        aside={
          <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
              Choose by symptom
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {contactGuidance.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3.5 transition-colors hover:border-brand-300/35"
                  >
                    <Icon
                      name={item.icon}
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-200"
                    />
                    <span className="flex flex-col gap-1">
                      <span className="text-[0.8125rem] font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="text-xs leading-relaxed text-slate-400">
                        {item.body}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Programme cards with full detail and anchors */}
      <SolutionsGrid
        anchorCards
        heading="Six programmes we run most often."
        lede="Each one states who it's for, what it includes, what changes in the business, and how long it takes. Click through to the enquiry form and it pre-fills the right service."
      />

      {/* ------------------------------------------------- comparison matrix */}
      <Section className="border-t border-white/8 bg-ink-900/35">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            eyebrowIcon="layers"
            title="Which capabilities each programme uses."
            lede="Programmes overlap because real problems do. The matrix shows exactly which of the five services each solution draws on — so you can see where scope comes from."
          />

          <div className="mt-10 overflow-x-auto rounded-3xl border border-white/8 bg-ink-950/60">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                VENTRICON solutions mapped against the services each one
                includes.
              </caption>
              <thead>
                <tr className="border-b border-white/8">
                  <th
                    scope="col"
                    className="px-5 py-4 font-mono text-[0.6875rem] tracking-[0.14em] text-slate-500 uppercase"
                  >
                    Service
                  </th>
                  {matrix.map(({ solution }) => (
                    <th
                      key={solution.slug}
                      scope="col"
                      className="px-4 py-4 align-bottom"
                    >
                      <a
                        href={`#${solution.slug}`}
                        className="font-display text-[0.8125rem] leading-snug font-semibold text-slate-200 transition-colors hover:text-brand-200"
                      >
                        {solution.name}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-white/6 last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-4 text-[0.8125rem] font-medium text-slate-300"
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 transition-colors hover:text-brand-200"
                      >
                        <Icon
                          name={service.icon}
                          className="h-4 w-4 text-brand-300"
                        />
                        {service.name}
                      </Link>
                    </th>
                    {matrix.map(({ solution, included }) => (
                      <td key={solution.slug} className="px-4 py-4">
                        {included.has(service.id) ? (
                          <span
                            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-pulse-400"
                            aria-label={`Included in ${solution.name}`}
                          >
                            <Icon
                              name="check"
                              className="h-4 w-4"
                              strokeWidth={2.6}
                            />
                            Included
                          </span>
                        ) : (
                          <span className="text-[0.75rem] text-slate-600">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-white/2">
                  <th
                    scope="row"
                    className="px-5 py-4 text-[0.8125rem] font-medium text-slate-400"
                  >
                    Typical timeline
                  </th>
                  {matrix.map(({ solution }) => (
                    <td
                      key={solution.slug}
                      className="px-4 py-4 font-mono text-[0.6875rem] text-slate-400"
                    >
                      {solution.timeline}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- how we scope it */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="How scoping works"
                eyebrowIcon="target"
                title="Nobody buys a programme on a first phone call."
                lede="Here's exactly how we get from your enquiry to a scope you can approve with confidence."
              />

              <ol className="mt-10 flex flex-col gap-5">
                {[
                  {
                    title: "30-minute discovery call",
                    body: "We ask about the business, the objective, the constraints and what has already been tried. No pitch deck.",
                  },
                  {
                    title: "Written diagnosis",
                    body: "Within a few days you get our read on the problem, the options we see, and which programme (or single service) fits.",
                  },
                  {
                    title: "Phased proposal",
                    body: "A fixed scope and price per phase, with the metric each phase moves and what we need from your side.",
                  },
                  {
                    title: "Kick-off and weekly rhythm",
                    body: "Once approved, work starts within one to two weeks and you get a written update every week until launch.",
                  },
                ].map((step, index) => (
                  <li key={step.title}>
                    <Reveal delay={index * 50}>
                      <div className="flex gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 font-mono text-xs text-brand-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-400">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-6">
              <div className="vc-panel rounded-3xl p-6 sm:p-7">
                <h3 className="font-display text-lg font-semibold text-white">
                  What every programme includes as standard
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {[
                    "One senior point of contact who knows your account",
                    "Written weekly progress update",
                    "A named owner for every workstream",
                    "Shared dashboards with agreed metric definitions",
                    "Quality gates for accessibility, performance and security",
                    "Full documentation and training at handover",
                    "Complete ownership of everything built",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-pulse-400"
                        strokeWidth={2.4}
                      />
                      <span className="text-sm leading-relaxed text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-300/25 bg-[linear-gradient(150deg,rgba(47,116,245,0.14),rgba(10,16,28,0.9))] p-6 sm:p-7">
                <h3 className="font-display text-lg font-semibold text-white">
                  Certifying who this is not for
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  We&apos;re a poor fit if you need the cheapest possible
                  execution, if there&apos;s no internal owner for the work, or
                  if the decision has already been made and you need someone to
                  rubber-stamp it. We&apos;ll tell you that on the call rather
                  than take the engagement.
                </p>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="sm"
                  icon="arrowRight"
                  className="mt-5"
                >
                  Tell us your situation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        items={solutionFaqs}
        heading="Solution and scoping questions."
        eyebrow="Solutions FAQ"
        lede={`How programmes are structured, phased and priced at ${site.name}.`}
      />

      <FinalCta
        heading="Not sure which programme fits?"
        lede="Describe the situation in plain language — what's happening, what you've tried, what a good outcome looks like. We'll map it to a scope and tell you what it would take."
        primaryLabel="Describe the problem"
        secondaryLabel="See the services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          faqSchema(solutionFaqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "VENTRICON solutions",
            itemListElement: solutions.map((solution, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: solution.name,
              description: solution.summary,
              url: `${site.url}/solutions#${solution.slug}`,
            })),
          },
          ...solutions.map((solution) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: solution.name,
            description: solution.summary,
            serviceType: solution.name,
            provider: { "@id": `${site.url}/#organization` },
            audience: { "@type": "Audience", audienceType: solution.audience },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${solution.name} — typical scope`,
              itemListElement: solution.services.map((id) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: serviceById[id].name,
                },
              })),
            },
          })),
        ]}
      />
    </>
  );
}
