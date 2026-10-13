import type { Metadata } from "next";
import { site, fullAddress, mapsUrl, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";
import { contactGuidance } from "@/lib/process";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = buildMetadata({
  title: "Contact — start a project",
  description:
    "Tell VENTRICON about your project. Every enquiry is answered by a senior member of the team within one business day. Prefer to talk first? Email, call or WhatsApp us directly.",
  path: "/contact",
  keywords: [
    "contact VENTRICON",
    "start a project",
    "request a quote",
    "digital agency contact",
  ],
});

const contactFaqs = [
  {
    q: "How quickly will I hear back?",
    a: `Every enquiry is answered by a senior member of the team within one business day — normally with a few clarifying questions and two or three proposed times for a discovery call. ${site.contact.responseTime}`,
  },
  {
    q: "Is the discovery call free?",
    a: "Yes. The first 30-minute call is free and carries no obligation. If we're not the right partner for what you need, we'll say so on that call and point you toward someone better suited.",
  },
  {
    q: "What should I prepare before we talk?",
    a: "Nothing formal. It helps to know roughly what you're trying to achieve, what's currently in the way, who the internal owner will be, and whether there's an approved budget range. If you have analytics, a CRM export or an existing brief, bring those too.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. Send yours before the call, or ask us for our standard mutual NDA and we'll get it signed the same day.",
  },
];

export default function ContactPage() {
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Contact"
        eyebrowIcon="mail"
        title="Let's talk about what you're building."
        titleAccent="Let's talk about "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        lede={
          <p>
            Send the brief, or just describe the situation in your own words.
            Every enquiry reaches a senior member of the team — not a
            call-handling queue — and gets an answer within one business day.
          </p>
        }
        actions={
          <>
            <Button href="#contact-form" size="lg" icon="arrowRight">
              Go to the form
            </Button>
            {wa ? (
              <Button
                href={wa}
                external
                variant="outline"
                size="lg"
                icon="whatsapp"
              >
                WhatsApp us
              </Button>
            ) : (
              <Button
                href={`mailto:${site.contact.email}`}
                variant="outline"
                size="lg"
                icon="mail"
              >
                Email us
              </Button>
            )}
          </>
        }
      />

      {/* Main contact block (id="contact-form" via the form itself) */}
      {/* ?service= is applied client-side inside the form, keeping this page static. */}
      <ContactSection
        id="contact-form"
        showGuidance
        heading="Project enquiry"
        lede="Fields marked with an asterisk are required. Everything you send stays with VENTRICON — we never resell or share enquiry details."
      />

      {/* ------------------------------------------------------- supporting */}
      <Section className="border-t border-white/8 bg-ink-900/35" spacing="compact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">
                  Office hours
                </h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {site.contact.hours.map((entry) => (
                    <li
                      key={entry.days}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-slate-400">{entry.days}</span>
                      <span className="text-slate-300">{entry.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-slate-500">
                  Enquiries sent outside these hours are read first thing the
                  next working day. WhatsApp is monitored more loosely at
                  weekends for urgent, live projects.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="mapPin" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">
                  Studio
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  {fullAddress}
                </p>
                <p className="text-xs leading-relaxed text-slate-500">
                  We work remotely with clients worldwide and meet at the studio
                  by appointment. Video calls are usually more efficient than
                  travel for both sides.
                </p>
                <Button
                  href={mapsUrl}
                  external
                  variant="outline"
                  size="sm"
                  icon="external"
                >
                  Open in Google Maps
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="briefcase" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">
                  Other enquiries
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
                  <li>
                    <span className="text-slate-300">New projects:</span>{" "}
                    {site.contact.projectsEmail}
                  </li>
                  <li>
                    <span className="text-slate-300">General:</span>{" "}
                    {site.contact.email}
                  </li>
                  <li>
                    <span className="text-slate-300">Careers:</span> use the
                    general address with &ldquo;Careers&rdquo; in the subject
                  </li>
                  <li>
                    <span className="text-slate-300">Suppliers:</span> use the
                    general address with &ldquo;Supplier&rdquo; in the subject
                  </li>
                </ul>
                <Button
                  href={`mailto:${site.contact.email}`}
                  variant="quiet"
                  size="sm"
                  icon="mail"
                >
                  Email the team
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------- guidance + FAQs */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Before you write"
            eyebrowIcon="compass"
            title="Two shortcuts that save everyone time."
            lede="If you already know roughly what you need, these get you to the right place faster. If you don't, the form is the right start."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {contactGuidance.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <a
                  href={`/solutions#${item.href.split("#")[1]}`}
                  className="vc-panel vc-panel-hover group flex items-start gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-display text-[0.9375rem] font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200">
                      See the programme
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <SectionHeading
              eyebrow="Contact FAQ"
              eyebrowIcon="lightbulb"
              title="Answered before you ask."
            />
            <Accordion
              items={contactFaqs}
              allowMultiple
              defaultOpen={0}
              idBase="contact-faq"
            />
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqSchema(contactFaqs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${site.name}`,
            url: `${site.url}/contact`,
            mainEntity: {
              "@type": "Organization",
              name: site.name,
              email: site.contact.email,
              telephone: site.contact.phoneE164,
              address: {
                "@type": "PostalAddress",
                streetAddress: site.contact.address.street,
                addressLocality: site.contact.address.locality,
                addressCountry: site.contact.address.countryCode,
              },
            },
          },
        ]}
      />
    </>
  );
}
