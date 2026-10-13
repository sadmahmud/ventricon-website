import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { commitments, teamRoles, values } from "@/lib/process";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading, StatBlock } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/Artwork";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "About — a business solutions and technology partner",
  description:
    "VENTRICON is a senior, cross-functional team of strategists, designers, engineers, marketers and automation specialists. How we're organised, what we believe, and the commitments we make in writing.",
  path: "/about",
  keywords: [
    "about VENTRICON",
    "business solutions team",
    "digital agency team structure",
    "agency commitments",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        eyebrowIcon="users"
        title="One team, accountable for the whole outcome."
        titleAccent="One team, "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        lede={
          <>
            <p>
              {site.name} is a business solutions and technology practice. We
              work with growth-focused companies that have outgrown piecemeal
              vendors — where the brand, the website, the campaigns and the
              internal systems need to agree with each other.
            </p>
            <p className="mt-4">
              We&apos;re deliberately structured as a small senior team rather
              than a large junior one. On every engagement the people who
              diagnose the problem are the people who do the work.
            </p>
          </>
        }
        actions={
          <>
            <Button href="/contact" size="lg" icon="arrowRight">
              Talk to us
            </Button>
            <Button href="/work" variant="outline" size="lg" icon="briefcase">
              See how we work
            </Button>
          </>
        }
        aside={
          <div className="grid grid-cols-2 gap-5 rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <StatBlock value={site.facts.teamSize} label="Core team size" />
            <StatBlock value={String(site.facts.founded)} label="Working with clients since" />
            <StatBlock value={site.facts.languages} label="Working languages" />
            <StatBlock value="5 → 1" label="Services under one accountability line" />
          </div>
        }
      />

      {/* -------------------------------------------------------------- story */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Why we exist"
                eyebrowIcon="compass"
                title="Most businesses don't have a vendor problem. They have a coordination problem."
              />

              <div className="vc-prose flex flex-col gap-4">
                <p>
                  It usually looks like this: a designer built the brand, an
                  agency built the website, a freelancer runs the ads, and
                  somebody&apos;s cousin set up the CRM. Each piece is
                  individually fine. Together they don&apos;t add up — the
                  website says one thing, the ads say another, the CRM
                  doesn&apos;t know what a qualified lead is, and nobody can
                  prove which part is actually producing revenue.
                </p>
                <p>
                  We exist to close that gap. By holding brand, web, marketing,
                  automation and systems under one roof, the assumptions stay
                  consistent from positioning down to the data model — and
                  there is exactly one team to hold accountable for whether it
                  worked.
                </p>
                <p>
                  {" "}
                  <strong>The practical consequence:</strong> when something
                  isn&apos;t working, you don&apos;t get three vendors pointing
                  at each other. You get us, telling you what we got wrong and
                  what we&apos;re changing.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="vc-panel rounded-3xl p-6">
                <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                  What we do, in one line each
                </h3>
                <ul className="mt-4 flex flex-col gap-3.5">
                  {services.map((service) => (
                    <li key={service.id} className="flex items-start gap-3.5">
                      <span className="h-9 w-9 shrink-0">
                        <ServiceGlyph
                          id={`about-${service.slug}`}
                          accent={service.accent}
                        />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-[0.8125rem] font-semibold text-white transition-colors hover:text-brand-200"
                        >
                          {service.name}
                        </Link>
                        <span className="text-xs leading-relaxed text-slate-400">
                          {service.summary}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/8 bg-ink-900/50 p-6">
                <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                  How the work usually arrives
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {solutions.slice(0, 4).map((solution) => (
                    <li key={solution.slug} className="flex items-start gap-3">
                      <Icon
                        name={solution.icon}
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                      />
                      <span className="text-sm text-slate-300">
                        <Link
                          href={`/solutions#${solution.slug}`}
                          className="transition-colors hover:text-brand-200"
                        >
                          {solution.name}
                        </Link>
                        <span className="text-slate-500">
                          {" "}
                          — {solution.audience.toLowerCase()}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/solutions"
                  variant="outline"
                  size="sm"
                  icon="arrowRight"
                  className="mt-5"
                >
                  All solutions
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- values */}
      <Section className="border-y border-white/8 bg-ink-900/35">
        <Container>
          <SectionHeading
            eyebrow="How we think"
            eyebrowIcon="lightbulb"
            title="Four principles we actually run the business on."
            lede="These aren't wall posters. They decide who we hire, which projects we accept and when we tell a client to spend less."
          />

          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 50} className="h-full">
                <div className="vc-panel flex h-full flex-col gap-3 rounded-2xl p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-grape-400/25 bg-grape-500/10 text-grape-300">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <dt className="font-display text-[0.9375rem] font-semibold text-white">
                    {value.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-400">
                    {value.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- team */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we're organised"
            eyebrowIcon="users"
            title="Capability groups, not a hierarchy of account managers."
            lede="Every engagement draws named people from these groups. You always know who is doing what, and you speak to them directly."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 40} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/22 bg-brand-500/10 text-brand-200">
                    <Icon name={role.icon} className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                      {role.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {role.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={teamRoles.length * 40} className="h-full">
              <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-brand-300/25 bg-[linear-gradient(150deg,rgba(47,116,245,0.14),rgba(10,16,28,0.9))] p-5">
                <div className="flex flex-col gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/8 text-white">
                    <Icon name="users" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                    Specialists on tap
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    For specialist needs — photography, video, legal review,
                    penetration testing, translation — we bring in trusted
                    partners we&apos;ve worked with before, managed by us and
                    included in the same scope.
                  </p>
                </div>
                <Button href="/contact" variant="secondary" size="sm" icon="arrowRight">
                  Meet the team
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- how we work */}
      <ProcessTimeline compact />

      {/* -------------------------------------------------------- commitments */}
      <Section className="border-t border-white/8 bg-ink-900/35">
        <Container>
          <SectionHeading
            eyebrow="In writing"
            eyebrowIcon="shield"
            title="Commitments that appear in every proposal."
            lede="Not aspirations — clauses. If we miss one, you're entitled to ask why, and we'll put it right."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item, index) => (
              <Reveal key={item.title} delay={index * 50} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/8 bg-ink-900/50 p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-pulse-400/25 bg-pulse-400/10 text-pulse-400">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[0.9375rem] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection
        heading="Before you get in touch."
        eyebrow="About FAQ"
        lede="The practical questions about working with a team of our size and structure."
      />

      <FinalCta
        heading="Build. Grow. Transform."
        lede="If you'd like a partner who'll tell you the truth about scope, cost and risk — start with a conversation. No pitch deck, no pressure."
        primaryLabel="Start a conversation"
        secondaryLabel="See our work"
        secondaryHref="/work"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${site.name}`,
            description:
              "How VENTRICON is organised, what it believes and the commitments it makes.",
            url: `${site.url}/about`,
            mainEntity: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
    </>
  );
}
