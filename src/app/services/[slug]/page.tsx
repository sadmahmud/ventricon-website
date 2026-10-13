import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { services, getService } from "@/lib/services";
import { solutionsUsingService } from "@/lib/solutions";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, StatBlock } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServiceNav } from "@/components/services/ServiceNav";
import {
  RelatedWork,
  ServiceBenefits,
  ServiceCapabilities,
  ServiceDeliverables,
  ServiceEngagements,
  ServiceFaqs,
  ServiceProblems,
  SubHeading,
  serviceContactHref,
} from "@/components/services/ServiceSections";
import { FinalCta } from "@/components/sections/FinalCta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "This service page does not exist.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${service.name} — ${service.tagline.replace(/\.$/, "")}`,
    description: service.summary,
    path: `/services/${service.slug}`,
    keywords: [service.name.toLowerCase(), `${service.shortName.toLowerCase()} services`, ...service.stack.slice(0, 4)],
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const relatedSolutions = solutionsUsingService(service.id);

  return (
    <>
      <PageHero
        eyebrow={`Service ${String(service.order).padStart(2, "0")} — ${service.shortName}`}
        eyebrowIcon={service.icon}
        title={service.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        lede={
          <>
            <p className="font-display text-lg text-brand-100">
              {service.tagline}
            </p>
            <p className="mt-4">{service.summary}</p>
          </>
        }
        actions={
          <>
            <Button href={serviceContactHref(service)} size="lg" icon="arrowRight">
              Start a project
            </Button>
            <Button
              href={`/contact?service=${encodeURIComponent(service.name)}`}
              variant="outline"
              size="lg"
              icon="calendar"
            >
              Book a discovery call
            </Button>
          </>
        }
        aside={
          <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
              At a glance
            </p>
            <div className="mt-4 grid grid-cols-2 gap-5">
              {service.metrics.map((metric) => (
                <StatBlock
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                />
              ))}
            </div>
            <div className="mt-5 border-t border-white/8 pt-4">
              <p className="font-mono text-[0.625rem] tracking-[0.14em] text-slate-500 uppercase">
                Typical engagements
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {service.engagements.map((engagement) => (
                  <li
                    key={engagement.name}
                    className="flex items-baseline justify-between gap-3 text-xs"
                  >
                    <span className="text-slate-300">{engagement.name}</span>
                    <span className="shrink-0 font-mono text-slate-500">
                      {engagement.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />

      {/* Sidebar + content */}
      <div className="relative">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-14">
            {/* ------------------------------------------------- sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                <ServiceNav variant="links" currentSlug={service.slug} />

                <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                  <p className="font-mono text-[0.625rem] tracking-[0.14em] text-slate-500 uppercase">
                    On this page
                  </p>
                  <ul className="mt-3.5 flex flex-col gap-2 text-[0.8125rem]">
                    {[
                      ["The symptoms", "#symptoms"],
                      ["Capabilities", "#capabilities"],
                      ["Benefits", "#benefits"],
                      ["Deliverables", "#deliverables"],
                      ["Engagement models", "#engagements"],
                      ["FAQ", "#faq"],
                    ].map(([label, href]) => (
                      <li key={href}>
                        <a
                          href={href}
                          className="text-slate-400 transition-colors hover:text-brand-200"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-brand-300/25 bg-brand-500/8 p-5">
                  <p className="font-display text-sm font-semibold text-white">
                    Need a scoped estimate?
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Send us the brief and we&apos;ll reply with a fixed scope and
                    price within one business day.
                  </p>
                  <Button
                    href={serviceContactHref(service)}
                    size="sm"
                    icon="arrowRight"
                    className="mt-4"
                    fullWidth
                  >
                    Start a project
                  </Button>
                </div>
              </div>
            </aside>

            {/* ------------------------------------------------- content */}
            <div className="flex min-w-0 flex-col gap-20">
              {/* Introduction */}
              <div className="flex flex-col gap-6">
                <SubHeading
                  eyebrow="Overview"
                  title={`How we approach ${service.name}`}
                />
                <div className="vc-prose flex flex-col gap-4">
                  {service.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {service.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-[0.6875rem] text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div id="symptoms" className="scroll-mt-32">
                <ServiceProblems service={service} />
              </div>

              <div id="capabilities" className="scroll-mt-32">
                <ServiceCapabilities service={service} />
              </div>

              <div id="benefits" className="scroll-mt-32">
                <ServiceBenefits service={service} />
              </div>

              <div id="deliverables" className="scroll-mt-32">
                <ServiceDeliverables service={service} />
              </div>

              <div id="engagements" className="scroll-mt-32">
                <ServiceEngagements service={service} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Related work */}
      <section className="border-t border-white/8 bg-ink-900/35 py-16 sm:py-20">
        <Container>
          <RelatedWork service={service} />
        </Container>
      </section>

      {/* Related solutions */}
      {relatedSolutions.length ? (
        <section className="border-t border-white/8 py-16 sm:py-20">
          <Container>
            <SubHeading
              eyebrow="Packaged programmes"
              title={`Solutions that include ${service.name}`}
              lede="If you'd rather buy an outcome than a capability, these programmes bundle this service with the others required to deliver it."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSolutions.map((solution) => (
                <a
                  key={solution.slug}
                  href={`/solutions#${solution.slug}`}
                  className="vc-panel vc-panel-hover group flex flex-col gap-3 rounded-2xl p-5"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                      <Icon name={solution.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-display text-[0.9375rem] font-semibold text-white">
                      {solution.name}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-slate-400">
                    {solution.tagline}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.625rem] text-slate-500">
                    {solution.timeline}
                    <Icon
                      name="arrowRight"
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-32 border-t border-white/8 bg-ink-900/35 py-16 sm:py-20"
      >
        <Container>
          <Suspense fallback={null}>
            <ServiceFaqs service={service} />
          </Suspense>
        </Container>
      </section>

      <FinalCta
        heading={`Ready to start on ${service.name}?`}
        lede={`Tell us where you are today and what you're trying to reach. We'll reply within one business day with an honest view on scope, timeline and budget.`}
        primaryLabel="Start a project"
        secondaryLabel="See all services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
