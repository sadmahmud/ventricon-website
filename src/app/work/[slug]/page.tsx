import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/lib/work";
import { serviceById } from "@/lib/services";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata, caseStudySchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading, StatBlock } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Artwork } from "@/components/ui/Artwork";
import { ProjectCard } from "@/components/sections/FeaturedWork";
import { FinalCta } from "@/components/sections/FinalCta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];

  if (!project) {
    return buildMetadata({
      title: "Blueprint not found",
      description: "This engagement blueprint does not exist.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    ogType: "article",
    keywords: [
      `${project.sector} case study`,
      ...project.services.map((id) => serviceById[id].name.toLowerCase()),
    ],
  });
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug[slug];

  if (!project) notFound();

  const related = projects
    .filter(
      (candidate) =>
        candidate.slug !== project.slug &&
        candidate.categories.some((category) =>
          project.categories.includes(category),
        ),
    )
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${project.sector} — ${project.year}`}
        eyebrowIcon="briefcase"
        title={project.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: project.client },
        ]}
        lede={
          <>
            <p className="font-mono text-[0.8125rem] tracking-wide text-brand-200/90 uppercase">
              {project.client}
            </p>
            <p className="mt-4">{project.summary}</p>
          </>
        }
        actions={
          <>
            <Button href="/contact" size="lg" icon="arrowRight">
              Discuss a similar project
            </Button>
            <Button href="/work" variant="outline" size="lg" icon="arrowLeft">
              All blueprints
            </Button>
          </>
        }
        aside={
          <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-900/60 p-5 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-white/8">
              <Artwork
                id={`${project.slug}-hero`}
                accent={project.art.accent}
                variant={project.art.variant}
                rounded="rounded-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {project.results.slice(0, 4).map((result) => (
                <StatBlock
                  key={result.label}
                  value={result.value}
                  label={result.label}
                />
              ))}
            </div>
            <p className="border-t border-white/8 pt-4 text-[0.6875rem] leading-relaxed text-slate-500">
              Figures marked &ldquo;target&rdquo; are the agreed success measures
              set at kick-off. Others are client-confirmed outcomes.
            </p>
          </div>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            {/* ------------------------------------------------- narrative */}
            <div className="flex min-w-0 flex-col gap-16">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold sm:text-[1.75rem]">
                  The situation and what we did
                </h2>
                <div className="vc-prose flex flex-col gap-4">
                  {project.narrative.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold sm:text-[1.75rem]">
                  What was in the way
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.challenge.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-ink-900/50 p-4"
                    >
                      <Icon
                        name="alert"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#f5a524]"
                      />
                      <span className="text-sm leading-relaxed text-slate-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold sm:text-[1.75rem]">
                  How we approached it
                </h2>
                <ol className="flex flex-col gap-4">
                  {project.approach.map((step, index) => (
                    <Reveal key={step.title} delay={index * 50} as="li">
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
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold sm:text-[1.75rem]">
                  Results and measurements
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.results.map((result) => (
                    <div
                      key={result.label}
                      className="rounded-2xl border border-white/8 bg-ink-900/50 p-5"
                    >
                      <p className="font-display text-2xl font-semibold text-white">
                        {result.value}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5">
                  <h3 className="font-mono text-[0.6875rem] tracking-[0.14em] text-slate-500 uppercase">
                    Stack used
                  </h3>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-xs text-slate-300"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="sticky top-28 flex flex-col gap-5">
                <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                  <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                    Services applied
                  </h2>
                  <ul className="mt-3.5 flex flex-col gap-2">
                    {project.services.map((id) => (
                      <li key={id}>
                        <Link
                          href={`/services/${serviceById[id].slug}`}
                          className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-[0.8125rem] text-slate-300 transition-colors hover:border-brand-300/35 hover:text-white"
                        >
                          <Icon
                            name={serviceById[id].icon}
                            className="h-4 w-4 shrink-0 text-brand-200"
                          />
                          <span className="flex-1">{serviceById[id].name}</span>
                          <Icon
                            name="chevronRight"
                            className="h-3.5 w-3.5 text-slate-600 transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-5">
                  <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                    Snapshot
                  </h2>
                  <dl className="mt-3.5 flex flex-col gap-2.5 text-[0.8125rem]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Sector</dt>
                      <dd className="text-right text-slate-300">{project.sector}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Year</dt>
                      <dd className="text-right text-slate-300">{project.year}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Client</dt>
                      <dd className="text-right text-slate-300">
                        Anonymised
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Reference</dt>
                      <dd className="text-right text-slate-300">
                        Available on request
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-brand-300/25 bg-brand-500/8 p-5">
                  <p className="font-display text-sm font-semibold text-white">
                    Facing something similar?
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Send the brief and we&apos;ll come back with a scope, a
                    timeline and a fixed price within one business day.
                  </p>
                  <Button
                    href="/contact"
                    size="sm"
                    icon="arrowRight"
                    fullWidth
                    className="mt-4"
                  >
                    Start a project
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length ? (
        <Section className="border-t border-white/8 bg-ink-900/35">
          <Container>
            <SectionHeading
              eyebrow="Keep reading"
              eyebrowIcon="briefcase"
              title="Related blueprints"
              lede="Engagements that share a discipline or a problem shape with this one."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.slug} project={item} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <FinalCta
        heading="Let's run this for your business."
        lede="Every blueprint above started as a conversation about a specific problem. Bring yours and we'll tell you honestly what we'd do — and what it would take."
        primaryLabel="Start a project"
        secondaryLabel="See all blueprints"
        secondaryHref="/work"
      />

      <JsonLd
        data={[
          caseStudySchema({
            title: project.title,
            description: project.summary,
            path: `/work/${project.slug}`,
            sector: project.sector,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.client, path: `/work/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: site.name,
            url: site.url,
            makesOffer: project.services.map((id) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: serviceById[id].name },
            })),
          },
        ]}
      />
    </>
  );
}
