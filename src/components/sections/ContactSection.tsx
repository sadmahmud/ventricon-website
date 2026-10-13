import { cn } from "@/lib/utils";
import { site, fullAddress, mapsUrl, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";
import { contactGuidance } from "@/lib/process";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Glow, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Contact section: direct channels on the left, validated enquiry form on the
 * right. Reused on the home page and the dedicated /contact page.
 */
export function ContactSection({
  className,
  id = "contact",
  defaultService = "",
  showGuidance = false,
  heading = "Start a project with VENTRICON.",
  eyebrow = "Contact",
  lede = "Tell us what you're building or fixing. You'll get a considered reply from a senior member of the team within one business day — not an automated sequence.",
  locale = "en",
}: {
  className?: string;
  id?: string;
  defaultService?: string;
  showGuidance?: boolean;
  heading?: string;
  eyebrow?: string;
  lede?: string;
  locale?: "en" | "bn";
}) {
  const isBn = locale === "bn";
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <Section id={id} className={cn("relative overflow-hidden", className)}>
      <Glow className="top-20 -left-24 opacity-40" color="rgba(47,116,245,0.3)" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ------------------------------------------------------- aside */}
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow={isBn ? "যোগাযোগ" : eyebrow} eyebrowIcon="mail" title={isBn ? "VENTRICON-এর সাথে আপনার প্রজেক্ট শুরু করুন।" : heading} lede={isBn ? "আপনি কী তৈরি করতে চান বা কোন সমস্যার সমাধান করতে চান তা জানান। আমাদের টিম সাধারণত এক কর্মদিবসের মধ্যে উত্তর দেয়।" : lede} />

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-4 transition-colors hover:border-brand-300/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">
                    {isBn ? "সাধারণ যোগাযোগ" : "General enquiries"}
                  </span>
                  <span className="truncate text-sm text-slate-400">
                    {site.contact.email}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isBn ? "নতুন প্রজেক্টের জন্য:" : "For new projects:"} {site.contact.projectsEmail}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${site.contact.phoneE164}`}
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-4 transition-colors hover:border-brand-300/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">
                    {isBn ? "কল অথবা WhatsApp" : "Call or WhatsApp"}
                  </span>
                  <span className="text-sm text-slate-400">
                    {site.contact.phoneDisplay}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isBn ? "রবিবার – বৃহস্পতিবার, ১০:০০ – ১৯:০০ (GMT+6)" : "Sunday – Thursday, 10:00 – 19:00 (GMT+6)"}
                  </span>
                </span>
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-ink-900/50 p-4 transition-colors hover:border-brand-300/35"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="mapPin" className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">{isBn ? "অফিস / স্টুডিও" : "Studio"}</span>
                  <span className="text-sm text-slate-400">{fullAddress}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-200">
                    {isBn ? "ম্যাপে দেখুন" : "Open in Maps"}
                    <Icon name="arrowUpRight" className="h-3 w-3" />
                  </span>
                </span>
              </a>

              {wa ? (
                <Button href={wa} external variant="outline" icon="whatsapp">
                  {isBn ? "WhatsApp-এ মেসেজ করুন" : "Message us on WhatsApp"}
                </Button>
              ) : null}
            </div>

            {showGuidance && !isBn ? (
              <div className="flex flex-col gap-3">
                <Eyebrow icon="compass">Not sure where to start?</Eyebrow>
                <ul className="flex flex-col gap-2.5">
                  {contactGuidance.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-4 transition-colors hover:border-brand-300/35"
                      >
                        <Icon
                          name={item.icon}
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-200"
                        />
                        <span className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-white">
                            {item.title}
                          </span>
                          <span className="text-xs leading-relaxed text-slate-400">
                            {item.body}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
                {isBn ? "এরপর কী হবে" : "What happens next"}
              </p>
              <ol className="mt-4 flex flex-col gap-3">
                {(isBn
                  ? [
                      "আমরা আপনার তথ্য দেখে এক কর্মদিবসের মধ্যে উত্তর দেব।",
                      "ব্যবসা ও লক্ষ্য বোঝার জন্য ৩০ মিনিটের একটি discovery call হবে।",
                      "Scope, timeline, fixed price ও success measure সহ লিখিত proposal দেওয়া হবে।",
                      "সমাধানটি উপযুক্ত হলে kick-off শুরু হবে; না হলে আমরা আরও উপযুক্ত পথ দেখাব।",
                    ]
                  : [
                      "We read your enquiry and reply within one business day.",
                      "A 30-minute discovery call to understand the business and the objective.",
                      "A written proposal: scope, timeline, fixed price and success measures.",
                      "If it's a fit, we book a kick-off. If not, we'll point you somewhere better.",
                    ]
                ).map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 font-mono text-[0.625rem] text-slate-300">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-400">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* -------------------------------------------------------- form */}
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[linear-gradient(165deg,rgba(18,28,48,0.92),rgba(7,11,20,0.94))] p-6 sm:p-8">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {isBn ? "প্রজেক্ট সম্পর্কে জানুন" : "Project enquiry"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBn ? (
                      <><span className="text-[#ff8f8f]">*</span> চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক।</>
                    ) : (
                      <>Fields marked <span className="text-[#ff8f8f]">*</span> are required.</>
                    )}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-pulse-400/25 bg-pulse-400/10 px-3 py-1 text-[0.6875rem] text-pulse-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-pulse-400" aria-hidden="true" />
                  {isBn ? "নতুন প্রজেক্ট গ্রহণ করছি" : "Accepting new projects"}
                </span>
              </div>

              <ContactForm defaultService={defaultService} id="project-enquiry" locale={locale} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
