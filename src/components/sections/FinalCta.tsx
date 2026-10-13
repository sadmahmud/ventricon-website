import { cn } from "@/lib/utils";
import { site, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Glow } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing call to action. Every button is a real destination: the contact page,
 * a prefilled mail client, a phone dialler, and WhatsApp when configured.
 */
export function FinalCta({
  className,
  id = "get-started",
  heading = "Build. Grow. Transform.",
  lede = "Tell us what you're trying to achieve. We'll tell you honestly whether we're the right partner — and what it would take.",
  primaryLabel = "Get started",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
}: {
  className?: string;
  id?: string;
  heading?: string;
  lede?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <section id={id} className={cn("relative overflow-hidden py-20 sm:py-28", className)}>
      <Glow className="top-0 left-1/2 -translate-x-1/2 opacity-60" color="rgba(47,116,245,0.35)" />
      <Glow className="right-0 bottom-0 opacity-40" color="rgba(124,83,245,0.3)" />

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(23,52,107,0.85),rgba(10,16,28,0.92))] p-8 sm:p-12 lg:p-14">
            <div
              className="vc-dots pointer-events-none absolute inset-0 opacity-25"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-50 blur-[80px]"
              style={{ background: "rgba(61,220,151,0.25)" }}
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-6">
                <Eyebrow icon="rocket">Ready when you are</Eyebrow>

                <h2 className="text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
                  {heading}
                </h2>

                <p className="max-w-xl text-[1.0625rem] leading-relaxed text-slate-300">
                  {lede}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button href="/contact" size="lg" icon="arrowRight">
                    {primaryLabel}
                  </Button>
                  <Button
                    href={secondaryHref}
                    variant="outline"
                    size="lg"
                    icon="compass"
                  >
                    {secondaryLabel}
                  </Button>
                </div>

                <p className="text-xs text-slate-400">
                  {site.contact.responseTime} Nothing is shared with third
                  parties.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-ink-950/50 p-5 sm:p-6">
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                  Prefer to go direct?
                </p>

                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 transition-colors hover:border-brand-300/35"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-white">Email us</span>
                    <span className="truncate text-xs text-slate-400">
                      {site.contact.email}
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href={`tel:${site.contact.phoneE164}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 transition-colors hover:border-brand-300/35"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-white">Call the team</span>
                    <span className="truncate text-xs text-slate-400">
                      {site.contact.phoneDisplay}
                    </span>
                  </span>
                  <Icon
                    name="arrowUpRight"
                    className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 transition-colors hover:border-pulse-400/35"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10 text-pulse-400">
                      <Icon name="whatsapp" className="h-5 w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-white">
                        WhatsApp
                      </span>
                      <span className="truncate text-xs text-slate-400">
                        Fastest route to a human
                      </span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ) : null}

                <div className="mt-1 flex flex-col gap-1.5 border-t border-white/8 pt-4 text-xs text-slate-500">
                  {site.contact.hours.map((entry) => (
                    <div key={entry.days} className="flex justify-between gap-4">
                      <span>{entry.days}</span>
                      <span className="text-slate-400">{entry.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
