import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Terms of use",
  description:
    "The terms that apply to using the VENTRICON website, including content ownership, acceptable use, third-party links and liability.",
  path: "/terms",
});

const LAST_UPDATED = "8 October 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Legal"
        eyebrowIcon="shield"
        title="Terms of use"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms" },
        ]}
        lede={
          <p>
            These terms cover your use of the {site.name} website. Client
            engagements are governed by a separate signed agreement — this page
            is about the site itself.
          </p>
        }
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="font-mono text-xs tracking-wide text-slate-500 uppercase">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="vc-prose mt-10 flex flex-col gap-5">
            <h2 className="font-display text-xl font-semibold text-white">
              1. Acceptance
            </h2>
            <p>
              By using this website you accept these terms. If you do not agree
              with them, please do not use the site.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              2. Information on this website
            </h2>
            <p>
              Content here — service descriptions, engagement blueprints,
              timelines, indicative pricing shapes and result targets — is
              provided for general information. It describes how we typically
              work and does not constitute a binding offer, a quotation or
              professional advice for your specific situation.
            </p>
            <p>
              Where a figure is described as a <strong>target</strong>, it is
              the success measure we agree with a client at kick-off. Delivered
              outcomes vary with market conditions, internal execution, budget
              and data quality, and no specific result is guaranteed unless it
              is stated in a signed agreement.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              3. Engagement blueprints and references
            </h2>
            <p>
              The work published in our portfolio is described by sector and
              scale. Client identities, confidential figures and named
              references are shared only with permission, typically under a
              mutual non-disclosure agreement during a proposal process.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              4. Intellectual property
            </h2>
            <p>
              The {site.name} name, logo, design system and the content of this
              website are our property or used under licence. You may read,
              share and quote this content with attribution and a link. You may
              not copy it wholesale, resell it, or present it as your own work.
            </p>
            <p>
              Intellectual property in deliverables created for a client is
              governed by that client&apos;s agreement, which — in our standard
              terms — transfers ownership of approved deliverables to the client
              on final payment.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              5. Acceptable use
            </h2>
            <ul>
              <li>Do not attempt to gain unauthorised access to the site or its systems.</li>
              <li>Do not use the contact form to send spam, bulk marketing or unlawful content.</li>
              <li>Do not scrape or harvest content or contact details in bulk.</li>
              <li>Do not misrepresent who you are or who you represent.</li>
            </ul>
            <p>
              The contact form is rate limited and monitored. We may block
              traffic that abuses it.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              6. Third-party links and services
            </h2>
            <p>
              This site links to third-party platforms (for example Google Maps,
              WhatsApp, social networks). We are not responsible for their
              content, availability or privacy practices, and their terms apply
              once you leave our site.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              7. Availability and changes
            </h2>
            <p>
              We aim to keep this website available and accurate, but we do not
              guarantee uninterrupted availability. We may change, suspend or
              withdraw any part of the site, and may update these terms at any
              time by publishing a revised version on this page.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              8. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, {site.legalName} is not
              liable for indirect or consequential loss arising from use of this
              website or reliance on its general content. Nothing in these terms
              limits liability that cannot lawfully be limited, and nothing here
              overrides the terms of a signed client agreement.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              9. Governing law
            </h2>
            <p>
              These terms are governed by the laws of {site.contact.address.country}.
              Disputes relating to this website will be subject to the exclusive
              jurisdiction of the courts of {site.contact.address.locality},{" "}
              {site.contact.address.country}.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              10. Contact
            </h2>
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" icon="mail">
                Contact us
              </Button>
              <Button href="/privacy" variant="outline" icon="shield">
                Privacy notice
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
    </>
  );
}
