import type { Metadata } from "next";
import { site, whatsappLink, WHATSAPP_DEFAULT_MESSAGE, fullAddress, mapsUrl } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container, Section } from "@/components/ui/Layout";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "যোগাযোগ — VENTRICON",
  description: "আপনার ব্যবসার প্রজেক্ট, সমস্যা বা লক্ষ্য সম্পর্কে VENTRICON-কে জানান।",
  path: "/bn/contact",
  keywords: ["VENTRICON যোগাযোগ", "প্রজেক্ট শুরু", "ব্যবসায়িক সমাধান"],
});

export default function BanglaContactPage() {
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);

  return (
    <>
      <PageHero
        size="compact"
        eyebrow="যোগাযোগ"
        eyebrowIcon="mail"
        title="আপনার ব্যবসার পরবর্তী পদক্ষেপ নিয়ে কথা বলি।"
        titleAccent="আপনার ব্যবসার "
        breadcrumbs={[
          { label: "হোম", href: "/bn" },
          { label: "যোগাযোগ" },
        ]}
        lede={
          <p>
            আপনার প্রজেক্ট, সমস্যা বা লক্ষ্য আমাদের জানান। VENTRICON-এর টিম সাধারণত
            এক কর্মদিবসের মধ্যে আপনার সাথে যোগাযোগ করবে।
          </p>
        }
        actions={
          <>
            <Button href="#contact-form" size="lg" icon="arrowRight">
              ফর্ম পূরণ করুন
            </Button>
            {wa ? (
              <Button href={wa} external variant="outline" size="lg" icon="whatsapp">
                WhatsApp-এ কথা বলুন
              </Button>
            ) : (
              <Button href={`mailto:${site.contact.email}`} variant="outline" size="lg" icon="mail">
                ইমেইল করুন
              </Button>
            )}
          </>
        }
      />

      <ContactSection
        id="contact-form"
        showGuidance={false}
        locale="bn"
        heading="VENTRICON-এর সাথে আপনার প্রজেক্ট শুরু করুন।"
        eyebrow="যোগাযোগ"
        lede="আপনি কী তৈরি করতে চান বা কোন সমস্যার সমাধান করতে চান তা জানান।"
      />

      <Section className="border-t border-white/8 bg-ink-900/35" spacing="compact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">অফিস সময়</h2>
                <ul className="flex flex-col gap-2 text-sm">
                  {site.contact.hours.map((entry) => (
                    <li key={entry.days} className="flex items-baseline justify-between gap-4">
                      <span className="text-slate-400">{entry.days}</span>
                      <span className="text-slate-300">{entry.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="mapPin" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">অফিস / স্টুডিও</h2>
                <p className="text-sm leading-relaxed text-slate-400">{fullAddress}</p>
                <Button href={mapsUrl} external variant="outline" size="sm" icon="external">
                  Google Maps-এ দেখুন
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-ink-950/50 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                  <Icon name="briefcase" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-[1.0625rem] font-semibold text-white">সরাসরি যোগাযোগ</h2>
                <p className="text-sm text-slate-400">{site.contact.email}</p>
                <p className="text-sm text-slate-400">{site.contact.phoneDisplay}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
