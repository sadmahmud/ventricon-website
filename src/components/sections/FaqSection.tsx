import Link from "next/link";
import { cn } from "@/lib/utils";
import { generalFaqs } from "@/lib/process";
import { site, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Layout";
import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/lib/types";

/**
 * FAQ block with an accordion. Pass `items` to reuse it on service pages;
 * defaults to the general set from `src/lib/process.ts`.
 */
export function FaqSection({
  items = generalFaqs,
  className,
  id = "faq",
  heading = "Questions we get asked before kick-off.",
  eyebrow = "FAQ",
  lede = "Straight answers on how we work, what things cost and what you own at the end.",
  showContactAside = true,
}: {
  items?: Faq[];
  className?: string;
  id?: string;
  heading?: string;
  eyebrow?: string;
  lede?: string;
  showContactAside?: boolean;
}) {
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <Section id={id} className={cn("relative", className)}>
      <Container>
        <div
          className={cn(
            "grid gap-12",
            showContactAside && "lg:grid-cols-[0.8fr_1.2fr] lg:gap-16",
          )}
        >
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={eyebrow} eyebrowIcon="lightbulb" title={heading} lede={lede} />

            {showContactAside ? (
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-900/50 p-6">
                <Eyebrow icon="users">Still deciding?</Eyebrow>
                <p className="text-sm leading-relaxed text-slate-400">
                  Ask us directly — including the awkward questions about
                  budget, timelines and what happens if it doesn&apos;t work.
                  We answer those too.
                </p>
                <div className="flex flex-col gap-2.5">
                  <Button href="/contact" size="sm" icon="arrowRight" fullWidth>
                    Ask a question
                  </Button>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center justify-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
                  >
                    <Icon name="mail" className="h-3.5 w-3.5" />
                    {site.contact.email}
                  </a>
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
                    >
                      <Icon name="whatsapp" className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <Accordion items={items} allowMultiple defaultOpen={0} idBase="faq" />

            <p className="text-xs text-slate-500">
              Didn&apos;t find your answer?{" "}
              <Link
                href="/contact"
                className="text-brand-200 underline underline-offset-4 hover:text-white"
              >
                Send us the question
              </Link>{" "}
              — we&apos;ll answer it and add it here.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
