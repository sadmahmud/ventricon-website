import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { commitments, values } from "@/lib/process";
import { services } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading, StatBlock } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/Artwork";

/** Compact "about" strip used on the home page. */
export function AboutPreview({
  className,
  id = "about",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <Section id={id} className={cn("overflow-hidden", className)}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-md lg:mx-0">
              <div className="vc-panel relative overflow-hidden rounded-3xl p-6">
                <div
                  className="vc-grid pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-3 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink-900/60 p-3 text-center"
                    >
                      <span className="h-10 w-10">
                        <ServiceGlyph
                          id={`${service.slug}-preview`}
                          accent={service.accent}
                        />
                      </span>
                      <span className="text-[0.625rem] leading-tight text-slate-400">
                        {service.shortName}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-brand-300/25 bg-brand-500/10 p-3 text-center">
                    <Icon name="sparkles" className="h-5 w-5 text-brand-200" />
                    <span className="text-[0.625rem] leading-tight text-brand-100">
                      One team
                    </span>
                  </div>
                </div>

                <div className="relative mt-5 grid grid-cols-2 gap-4 border-t border-white/8 pt-5">
                  <StatBlock value={site.facts.clientsServed} label="Clients served" />
                  <StatBlock
                    value={site.facts.countriesServed}
                    label="Countries delivered into"
                  />
                </div>
              </div>

              <div className="vc-glow -bottom-24 -left-16 h-64 w-64 opacity-50" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About VENTRICON"
              eyebrowIcon="users"
              title="A business solutions and technology team, built around outcomes."
              lede={
                <>
                  <p>
                    {site.name} exists because most businesses don&apos;t need more
                    vendors — they need one partner who understands the whole
                    picture: how the brand reads, how the website converts, how
                    the campaigns perform, how the team works day to day.
                  </p>
                  <p className="mt-4">
                    We&apos;re a senior, cross-functional team of strategists,
                    designers, engineers, marketers and automation specialists.
                    On any engagement you work directly with the people doing
                    the work — no account layer, no handoffs to a junior bench.
                  </p>
                </>
              }
            />

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 50}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-grape-400/25 bg-grape-500/10 text-grape-300">
                      <Icon name={value.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <dt className="font-display text-[0.9375rem] font-semibold text-white">
                        {value.title}
                      </dt>
                      <dd className="text-sm leading-relaxed text-slate-400">
                        {value.body}
                      </dd>
                    </div>
                  </div>
                </Reveal>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/about" icon="arrowRight">
                More about us
              </Button>
              <Button href="/contact" variant="outline" icon="calendar">
                Book a discovery call
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Written commitments band — used on Home and About. */
export function Commitments({ className }: { className?: string }) {
  return (
    <Section className={cn("border-y border-white/6 bg-ink-900/40", className)} spacing="compact">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-sm font-semibold tracking-[0.16em] text-slate-300 uppercase">
              Our commitments to you
            </h2>
            <p className="text-xs text-slate-500">
              Written into every proposal, not just this page.
            </p>
          </div>

          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/8 bg-ink-850/50 p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10 text-pulse-400">
                    <Icon name={item.icon} className="h-4.5 w-4.5" />
                  </span>
                  <dt className="font-display text-[0.9375rem] font-semibold text-white">
                    {item.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
