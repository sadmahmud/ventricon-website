import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/process";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ProcessDiagram } from "@/components/ui/Artwork";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The five-stage VENTRICON engagement model: Discover → Strategize → Build →
 * Launch → Grow. Rendered as a vertical timeline on mobile and a connector
 * rail on desktop.
 */
export function ProcessTimeline({
  className,
  id = "how-we-work",
  compact = false,
}: {
  className?: string;
  id?: string;
  compact?: boolean;
}) {
  return (
    <Section id={id} className={cn("relative overflow-hidden", className)}>
      <div
        className="vc-grid pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="How we work"
          eyebrowIcon="flow"
          title="Five stages, no surprises."
          lede="A repeatable engagement model refined across brand, web, marketing, automation and systems projects. You always know which stage you're in, what's expected of you, and what happens next."
        />

        {!compact ? (
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/8 bg-ink-900/50 p-6 sm:p-8">
            <ProcessDiagram />
            <p className="mt-4 text-center text-xs text-slate-500">
              Each stage has an owner, a deliverable and an explicit exit
              criterion.
            </p>
          </div>
        ) : null}

        <ol className="mt-14 flex flex-col gap-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.index} delay={index * 70} as="li">
              <div
                className={cn(
                  "vc-panel vc-panel-hover group grid gap-5 rounded-3xl p-6 sm:p-7",
                  "lg:grid-cols-[7rem_1fr_1.1fr] lg:items-start lg:gap-8",
                )}
              >
                {/* ------------------------------------------------- index */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                  <span className="font-display text-3xl leading-none font-bold text-transparent [-webkit-text-stroke:1px_rgba(139,185,255,0.45)] sm:text-4xl">
                    {step.index}
                  </span>
                  <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-slate-400 uppercase">
                    {step.duration}
                  </span>
                </div>

                {/* ------------------------------------------------- title */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-slate-400">
                    {step.summary}
                  </p>
                </div>

                {/* ------------------------------------------------- points */}
                <ul className="flex flex-col gap-2.5 lg:border-l lg:border-white/8 lg:pl-8">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                        strokeWidth={2.2}
                      />
                      <span className="text-sm leading-relaxed text-slate-400">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/contact" icon="arrowRight">
            Start with a discovery call
          </Button>
          <Button href="/about#how-we-work" variant="outline" icon="compass">
            How we run engagements
          </Button>
        </div>
      </Container>
    </Section>
  );
}
