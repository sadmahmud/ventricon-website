import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Privacy notice",
  description:
    "What VENTRICON collects when you use this website or send an enquiry, how it is stored and processed, how long it is kept, and how to have it removed.",
  path: "/privacy",
});

const LAST_UPDATED = "8 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        size="compact"
        eyebrow="Legal"
        eyebrowIcon="shield"
        title="Privacy notice"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy" },
        ]}
        lede={
          <p>
            This notice explains exactly what happens to information you send
            through {site.name}&apos;s website. It is written to be read, not to
            be survived.
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
              1. Who is responsible for your information
            </h2>
            <p>
              {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) is the controller of personal information
              collected through this website. You can reach us at{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
              for any privacy question or request.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              2. What we collect
            </h2>
            <ul>
              <li>
                <strong>Enquiry details you submit</strong> — your name,
                business name, email address, phone number, the service you
                selected, optional budget and timeline, and your project
                description.
              </li>
              <li>
                <strong>Technical context sent by your browser</strong> — the
                referring page and a user-agent string, recorded alongside the
                enquiry so we can understand where it came from and detect spam.
              </li>
              <li>
                <strong>A truncated IP address</strong> — used only to rate-limit
                the contact form so it cannot be abused. It is not stored with
                the enquiry.
              </li>
            </ul>
            <p>
              We do not run advertising trackers on this website, we do not sell
              data, and we do not build advertising profiles. If we add a
              privacy-respecting analytics tool in future, this notice will be
              updated before it goes live.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              3. Why we process it
            </h2>
            <p>
              We use your information to respond to your enquiry, to prepare a
              proposal, to deliver the services you ask us for, and to keep
              normal business records of those conversations. Our lawful bases
              are your consent (which you give explicitly with the checkbox on
              the contact form) and our legitimate interest in answering
              business enquiries and defending our legal position.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              4. Where it goes
            </h2>
            <p>
              Enquiries are delivered to the {site.name} team through the
              following processors, each used only for its stated purpose:
            </p>
            <ul>
              <li>
                <strong>Our hosting provider</strong> — the website and its
                server-side enquiry log run on managed infrastructure.
              </li>
              <li>
                <strong>Email delivery</strong> — a transactional email provider
                (for example Resend) or an automation platform we have
                configured, used to notify the team of your enquiry.
              </li>
              <li>
                <strong>Customer relationship management</strong> — if we record
                your enquiry in a CRM, it is used to track the sales
                conversation and support you properly.
              </li>
              <li>
                <strong>WhatsApp Business</strong> — where used, an internal
                notification is sent to our team. This is not marketing.
              </li>
            </ul>
            <p>
              We do not share enquiry details with any other third party unless
              you ask us to, or we are legally required to.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              5. How long we keep it
            </h2>
            <p>
              Enquiry and correspondence records are kept for up to 24 months
              from our last contact, after which they are deleted or
              irreversibly anonymised. Records connected to an active or
              completed contract are kept for the period required by applicable
              accounting and tax law.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              6. Your rights
            </h2>
            <p>
              You can ask us to confirm what we hold about you, correct it,
              delete it, restrict how we use it, or provide it to you in a
              portable format. You can also withdraw consent for future contact
              at any time. Email{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
              and we will respond within 30 days — usually within a few business
              days.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              7. Security
            </h2>
            <p>
              The site is served over HTTPS, enquiries are validated on the
              server before storage, access to lead data is restricted to the
              team who need it, and credentials for every integration are held
              in environment variables rather than in the codebase.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              8. Cookies
            </h2>
            <p>
              This website sets no marketing or tracking cookies. Any cookies
              used are strictly functional — for example, those required by the
              hosting platform to route requests correctly. If that changes, we
              will add a consent mechanism and update this section first.
            </p>

            <h2 className="font-display text-xl font-semibold text-white">
              9. Changes to this notice
            </h2>
            <p>
              If we change how we handle personal information, we will update
              this page and the &ldquo;last updated&rdquo; date above. Material
              changes will also be noted in the footer of the website.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" icon="mail">
                Ask a privacy question
              </Button>
              <Button href="/terms" variant="outline" icon="shield">
                Read the terms of use
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
    </>
  );
}
