import Link from "next/link";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/work";
import { serviceById } from "@/lib/services";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  index = 0,
  className,
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  return (
    <Reveal delay={index * 60} className={cn("h-full", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="vc-panel vc-panel-hover group flex h-full flex-col overflow-hidden rounded-3xl hover:-translate-y-1"
      >
        <div className="relative h-44 overflow-hidden border-b border-white/8">
          <Artwork
            id={`${project.slug}-card`}
            accent={project.art.accent}
            variant={project.art.variant}
            rounded=""
            className="transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-slate-200 uppercase backdrop-blur">
            {project.sector}
          </span>
          <span className="absolute top-4 right-4 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 font-mono text-[0.625rem] text-slate-300 backdrop-blur">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-brand-200/80 uppercase">
            {project.client}
          </p>

          <h3 className="text-lg leading-snug font-semibold">{project.title}</h3>

          <p className="text-sm leading-relaxed text-slate-400">
            {project.summary}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[0.6875rem] text-slate-400"
              >
                {serviceById[service].shortName}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors group-hover:text-white">
            Read the blueprint
            <Icon
              name="arrowRight"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * Featured work teasers for the home page. Shows the first three published
 * engagement blueprints with a link through to the full, filterable index.
 */
export function FeaturedWork({
  className,
  id = "featured-work",
  limit = 3,
}: {
  className?: string;
  id?: string;
  limit?: number;
}) {
  const featured = projects.slice(0, limit);

  return (
    <Section id={id} className={className}>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured work"
            eyebrowIcon="briefcase"
            title="Engagement blueprints, not portfolio wallpaper."
            lede="We publish how each engagement type is scoped, sequenced and measured. Each blueprint states the problem, the approach, the stack and the result targets we commit to."
          />

          <Button
            href="/work"
            variant="outline"
            icon="arrowRight"
            className="shrink-0"
          >
            All {projects.length} blueprints
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-slate-500">
          Client names and verified figures are shared under NDA on request. Each
          blueprint documents the engagement model we run — including the
          targets we hold ourselves to.
        </p>
      </Container>
    </Section>
  );
}
