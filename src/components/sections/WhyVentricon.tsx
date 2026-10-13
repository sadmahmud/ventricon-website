import { cn } from "@/lib/utils";
import { whyVentricon } from "@/lib/process";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Container, Eyebrow, Glow, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Why VENTRICON" — six differentiators plus the written commitments that
 * back them up. No stock photography: an inline SVG panel carries the visual.
 */
export function WhyVentricon({
  className,
  id = "why-ventricon",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <Section id={id} className={cn("overflow-hidden", className)}>
      <Glow className="top-10 -right-32 opacity-40" color="rgba(124,83,245,0.28)" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why VENTRICON"
              eyebrowIcon="shield"
              title="A partner that behaves like part of your team."
              lede="Most agencies sell deliverables. We sell an outcome — and we structure the whole engagement so you can see whether it's working while there's still time to change course."
            />

            <dl className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {whyVentricon.map((item, index) => (
                <Reveal key={item.title} delay={index * 50}>
                  <div className="flex flex-col gap-3">
                    <dt className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-300/22 bg-brand-500/10 text-brand-200">
                        <Icon name={item.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span className="font-display text-[1.0625rem] font-semibold text-white">
                        {item.title}
                      </span>
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* -------------------------------------------------- proof panel */}
          <Reveal delay={120}>
            <div className="vc-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div
                className="vc-dots pointer-events-none absolute inset-0 opacity-30"
                aria-hidden="true"
              />

              <div className="relative flex flex-col gap-6">
                <Eyebrow icon="clock">Written into every engagement</Eyebrow>

                <ul className="flex flex-col gap-5">
                  {[
                    {
                      title: "One page, one objective",
                      body: "Every project starts with a single sentence stating the objective and how we'll measure it. If we can't write it, we're not ready to start.",
                    },
                    {
                      title: "Fixed scope and price",
                      body: "You approve a scope, a number and a date. Changes get discussed before they get billed.",
                    },
                    {
                      title: "Weekly written update",
                      body: "Shipped, in progress, blocked — delivered by email every week, without you having to chase.",
                    },
                    {
                      title: "Exit with everything",
                      body: "Repositories, design files, accounts, dashboards and documentation transfer to you on final payment.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-pulse-400/30 bg-pulse-400/12 text-pulse-400"
                      >
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-[0.9375rem] font-semibold text-white">
                          {item.title}
                        </span>
                        <span className="text-sm leading-relaxed text-slate-400">
                          {item.body}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/8 pt-6">
                  <div className="flex flex-col">
                    <span className="font-display text-xl font-semibold text-white">
                      1 business day
                    </span>
                    <span className="text-xs text-slate-500">
                      Enquiry response commitment
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-xl font-semibold text-white">
                      {site.facts.teamSize}
                    </span>
                    <span className="text-xs text-slate-500">
                      Senior, cross-functional team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
