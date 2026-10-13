import Link from "next/link";
import { cn } from "@/lib/utils";
import { serviceById } from "@/lib/services";
import { projectsUsingService } from "@/lib/work";
import { ProjectCard } from "@/components/sections/FeaturedWork";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Badge, Container, StatBlock } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/Artwork";
import { Accordion } from "@/components/ui/Accordion";
import type { Service } from "@/lib/types";

/** Prefilled enquiry link for a service. */
export function serviceContactHref(service: Service): string {
  return `/contact?service=${encodeURIComponent(service.name)}`;
}

const accentText: Record<string, string> = {
  aqua: "text-aqua-300",
  brand: "text-brand-300",
  grape: "text-grape-300",
  pulse: "text-pulse-400",
  amber: "text-[#f5a524]",
};

const accentChip: Record<string, string> = {
  aqua: "border-aqua-400/25 bg-aqua-400/8 text-aqua-300",
  brand: "border-brand-400/25 bg-brand-500/8 text-brand-300",
  grape: "border-grape-400/25 bg-grape-500/8 text-grape-300",
  pulse: "border-pulse-400/25 bg-pulse-400/8 text-pulse-400",
  amber: "border-[#f5a524]/25 bg-[#f5a524]/8 text-[#f5a524]",
};

/* ---------------------------------------------------------------- headings */

export function SubHeading({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-brand-200/80 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-[1.75rem]">{title}</h2>
      {lede ? (
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-slate-400">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ sub-sections */

export function ServiceProblems({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-8">
      <SubHeading
        eyebrow="Sound familiar?"
        title="The symptoms that bring people here"
        lede="If two or more of these are true, the problem is usually structural — not a matter of trying harder."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {service.problems.map((problem, index) => (
          <Reveal key={problem.title} delay={index * 50}>
            <div className="flex h-full flex-col gap-2 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[#f5a524]/25 bg-[#f5a524]/10 text-[#f5a524]">
                  <Icon name="alert" className="h-3.5 w-3.5" />
                </span>
                <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                  {problem.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {problem.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ServiceCapabilities({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-8">
      <SubHeading
        eyebrow="What we do"
        title="Capabilities"
        lede="The work is delivered in these groups. Not every engagement needs all of them — the discovery stage decides which are worth funding."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {service.capabilities.map((capability, index) => (
          <Reveal key={capability.title} delay={index * 40}>
            <div className="vc-panel vc-panel-hover flex h-full flex-col gap-3 rounded-2xl p-5">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl border",
                  accentChip[service.accent],
                )}
              >
                <Icon name={capability.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                {capability.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {capability.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ServiceBenefits({ service }: { service: Service }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="flex flex-col gap-6">
        <SubHeading
          eyebrow="Why it pays"
          title="Business benefits"
          lede="What changes for the business — not what looks good in a portfolio."
        />

        <div className="flex flex-wrap gap-2">
          {service.stack.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[0.6875rem] text-slate-400"
            >
              {tool}
            </span>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          We work in the tools your team already uses or can realistically adopt.
          If a platform isn&apos;t the right fit, we&apos;ll say so.
        </p>
      </div>

      <dl className="grid gap-5 sm:grid-cols-2">
        {service.benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 50}>
            <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
              <span className="grid h-8 w-8 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10 text-pulse-400">
                <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <dt className="font-display text-[0.9375rem] font-semibold text-white">
                {benefit.title}
              </dt>
              <dd className="text-sm leading-relaxed text-slate-400">
                {benefit.body}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

export function ServiceDeliverables({ service }: { service: Service }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="flex flex-col gap-6">
        <SubHeading
          eyebrow="What you get"
          title="Deliverables"
          lede={service.outcomesIntro}
        />

        <ul className="flex flex-col gap-2.5">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Icon
                name="checkCircle"
                className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", accentText[service.accent])}
              />
              <span className="text-sm leading-relaxed text-slate-300">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button href={serviceContactHref(service)} icon="arrowRight">
            Start a project
          </Button>
          <Button href="/work" variant="outline" icon="briefcase">
            See related work
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <SubHeading
          eyebrow="How it runs"
          title="Inside the engagement"
          lede="Four working stages inside the wider VENTRICON process."
        />

        <ol className="flex flex-col gap-4">
          {service.process.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                className={cn(
                  "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border font-mono text-xs",
                  accentChip[service.accent],
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
          {service.metrics.map((metric) => (
            <StatBlock
              key={metric.label}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceEngagements({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-8">
      <SubHeading
        eyebrow="Engagement models"
        title="Ways to work with us"
        lede="Indicative shapes and durations for this service. Every engagement is quoted as a fixed scope when it's a project, or a defined capacity when it's a retainer."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {service.engagements.map((engagement, index) => (
          <Reveal key={engagement.name} delay={index * 60}>
            <div
              className={cn(
                "flex h-full flex-col gap-4 rounded-3xl border p-6",
                engagement.featured
                  ? "border-brand-300/35 bg-[linear-gradient(160deg,rgba(47,116,245,0.14),rgba(10,16,28,0.9))]"
                  : "border-white/8 bg-ink-900/50",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-white">
                  {engagement.name}
                </h3>
                {engagement.featured ? (
                  <Badge tone="brand">Popular</Badge>
                ) : null}
              </div>

              <span className="font-mono text-xs tracking-wide text-slate-400">
                {engagement.duration}
              </span>

              <p className="text-sm leading-relaxed text-slate-400">
                <span className="text-slate-300">Best for:</span>{" "}
                {engagement.bestFor}
              </p>

              <ul className="mt-auto flex flex-col gap-2 border-t border-white/8 pt-4">
                {engagement.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-300"
                      strokeWidth={2.4}
                    />
                    <span className="text-[0.8125rem] leading-relaxed text-slate-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ServiceFaqs({ service }: { service: Service }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
      <div className="flex flex-col gap-5">
        <SubHeading
          eyebrow="FAQ"
          title={`${service.shortName}: questions, answered`}
        />
        <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5">
          <p className="text-sm leading-relaxed text-slate-400">
            Something not covered here? Ask us directly — we answer scope,
            pricing and timeline questions the same day.
          </p>
          <Button
            href={serviceContactHref(service)}
            size="sm"
            icon="arrowRight"
            className="mt-4"
          >
            Ask about {service.shortName}
          </Button>
        </div>
      </div>

      <Accordion
        items={service.faqs}
        allowMultiple
        defaultOpen={0}
        idBase={`faq-${service.slug}`}
      />
    </div>
  );
}

export function RelatedWork({ service }: { service: Service }) {
  const related = projectsUsingService(service.slug).slice(0, 3);
  if (!related.length) return null;

  return (
    <div className="flex flex-col gap-8">
      <SubHeading
        eyebrow="Related work"
        title="Engagement blueprints using this service"
        lede="Each blueprint documents the problem, the approach, the stack and the result targets we commit to."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {related.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div>
        <Button href="/work" variant="outline" icon="arrowRight">
          All engagement blueprints
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- related services */

export function RelatedServices({ current }: { current: Service }) {
  const others = Object.values(serviceById).filter(
    (service) => service.id !== current.id,
  );

  return (
    <div className="flex flex-col gap-8">
      <SubHeading
        eyebrow="Works well with"
        title="Services that pair with this one"
        lede="Most clients start with one capability and extend once the first result is proven. These combinations come up most often."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {others.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="vc-panel vc-panel-hover group flex items-start gap-4 rounded-2xl p-5"
          >
            <span className="h-11 w-11 shrink-0">
              <ServiceGlyph id={`rel-${service.slug}`} accent={service.accent} />
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2 font-display text-[0.9375rem] font-semibold text-white">
                {service.name}
                <Icon
                  name="arrowUpRight"
                  className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                />
              </span>
              <span className="text-sm leading-relaxed text-slate-400">
                {service.tagline}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ index blocks */

/**
 * Full service section used on the /services index page: everything a visitor
 * needs to qualify the service before opening the dedicated page.
 */
export function ServiceIndexSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-heading`}
      className={cn(
        "scroll-mt-40 border-t border-white/8 py-16 sm:py-20",
        isEven ? "bg-ink-950" : "bg-ink-900/35",
      )}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ------------------------------------------------------ intro */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-14 w-14 shrink-0">
                <ServiceGlyph id={`index-${service.slug}`} accent={service.accent} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-slate-500 uppercase">
                  Service {String(service.order).padStart(2, "0")}
                </span>
                <h2
                  id={`${service.slug}-heading`}
                  className="text-2xl font-semibold sm:text-[1.75rem]"
                >
                  {service.name}
                </h2>
              </div>
            </div>

            <p className={cn("font-display text-lg font-medium", accentText[service.accent])}>
              {service.tagline}
            </p>

            {service.intro.map((paragraph) => (
              <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-slate-400">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 pt-1">
              <Button href={`/services/${service.slug}`} icon="arrowRight">
                Full {service.shortName} page
              </Button>
              <Button
                href={serviceContactHref(service)}
                variant="outline"
                icon="calendar"
              >
                Start a project
              </Button>
            </div>
          </div>

          {/* --------------------------------------------------- details */}
          <div className="flex flex-col gap-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                  Capabilities
                </h3>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {service.capabilities.map((capability) => (
                    <li key={capability.title} className="flex items-start gap-2.5">
                      <Icon
                        name={capability.icon}
                        className={cn("mt-0.5 h-4 w-4 shrink-0", accentText[service.accent])}
                      />
                      <span className="text-[0.8125rem] leading-relaxed text-slate-300">
                        {capability.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                  <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                    Benefits
                  </h3>
                  <ul className="mt-3.5 flex flex-col gap-3">
                    {service.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit.title} className="flex flex-col gap-1">
                        <span className="text-[0.8125rem] font-semibold text-white">
                          {benefit.title}
                        </span>
                        <span className="text-xs leading-relaxed text-slate-400">
                          {benefit.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                  <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                    Typical timeline
                  </h3>
                  <ul className="mt-3.5 flex flex-col gap-2">
                    {service.engagements.map((engagement) => (
                      <li
                        key={engagement.name}
                        className="flex items-baseline justify-between gap-3 text-[0.8125rem]"
                      >
                        <span className="text-slate-300">{engagement.name}</span>
                        <span className="shrink-0 font-mono text-xs text-slate-500">
                          {engagement.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                  Deliverables
                </h3>
                <Link
                  href={`/services/${service.slug}#deliverables`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white"
                >
                  Full list
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </Link>
              </div>
              <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                {service.deliverables.slice(0, 6).map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pulse-400"
                      strokeWidth={2.4}
                    />
                    <span className="text-xs leading-relaxed text-slate-400">
                      {item}
                    </span>
                  </li>
                ))}
                <li className="text-xs text-slate-500">
                  +{Math.max(service.deliverables.length - 6, 0)} more
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
