import Link from "next/link";
import { cn } from "@/lib/utils";
import { solutions } from "@/lib/solutions";
import { serviceById } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { Solution } from "@/lib/types";

const accentBorder: Record<string, string> = {
  aqua: "hover:border-aqua-400/40",
  brand: "hover:border-brand-400/45",
  grape: "hover:border-grape-400/45",
  pulse: "hover:border-pulse-400/40",
  amber: "hover:border-[#f5a524]/40",
};

const accentIcon: Record<string, string> = {
  aqua: "border-aqua-400/30 bg-aqua-400/10 text-aqua-300",
  brand: "border-brand-400/30 bg-brand-500/10 text-brand-300",
  grape: "border-grape-400/30 bg-grape-500/10 text-grape-300",
  pulse: "border-pulse-400/30 bg-pulse-400/10 text-pulse-400",
  amber: "border-[#f5a524]/30 bg-[#f5a524]/10 text-[#f5a524]",
};

export function SolutionCard({
  solution,
  index,
  /** Anchors on the solutions index; disable on card grids elsewhere. */
  anchor = false,
}: {
  solution: Solution;
  index: number;
  anchor?: boolean;
}) {
  return (
    <Reveal delay={index * 60} className="h-full">
      <article
        id={anchor ? solution.slug : undefined}
        className={cn(
          "vc-panel vc-panel-hover flex h-full scroll-mt-32 flex-col gap-5 rounded-3xl p-6 sm:p-7",
          accentBorder[solution.accent],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl border",
              accentIcon[solution.accent],
            )}
          >
            <Icon name={solution.icon} className="h-6 w-6" />
          </span>

          <div className="flex flex-col items-end gap-1">
            <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[0.625rem] text-slate-400">
              {solution.timeline}
            </span>
            {solution.featured ? (
              <span className="rounded-full border border-brand-300/25 bg-brand-500/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-brand-200 uppercase">
                Most requested
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl font-semibold">{solution.name}</h3>
          <p className="text-sm leading-relaxed text-brand-200/90">
            {solution.tagline}
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-slate-400">
            {solution.summary}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.625rem] tracking-[0.14em] text-slate-500 uppercase">
            Best for
          </p>
          <ul className="flex flex-col gap-1.5">
            {solution.idealFor.map((item) => (
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

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {solution.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[0.6875rem] text-slate-400"
            >
              {serviceById[service].shortName}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {anchor ? (
            <Button
              href={`/contact?service=${encodeURIComponent(
                solution.services.length > 1
                  ? "Multiple services"
                  : serviceById[solution.services[0]].name,
              )}`}
              size="sm"
              icon="arrowRight"
            >
              Start this programme
            </Button>
          ) : (
            <Link
              href={`/solutions#${solution.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors hover:text-white"
            >
              See what&apos;s included
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function SolutionsGrid({
  className,
  id = "solutions",
  heading = "Outcome-first programmes, built from the five services.",
  eyebrow = "Solutions",
  lede = "Services are capabilities. Solutions are the outcome you're buying. Each programme bundles the capabilities required — with one scope, one price and one accountable team.",
  limit,
  anchorCards = false,
}: {
  className?: string;
  id?: string;
  heading?: string;
  eyebrow?: string;
  lede?: string;
  limit?: number;
  anchorCards?: boolean;
}) {
  const list = limit ? solutions.slice(0, limit) : solutions;

  return (
    <Section id={id} className={cn("relative overflow-hidden", className)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowIcon="compass"
          title={heading}
          lede={lede}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((solution, index) => (
            <SolutionCard
              key={solution.slug}
              solution={solution}
              index={index}
              anchor={anchorCards}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/solutions" variant="outline" icon="arrowRight">
            All solutions in detail
          </Button>
          <span className="text-sm text-slate-500">
            or{" "}
            <Link
              href="/contact"
              className="text-brand-200 underline underline-offset-4 hover:text-white"
            >
              tell us the problem
            </Link>{" "}
            and we&apos;ll scope it for you.
          </span>
        </div>
      </Container>
    </Section>
  );
}
