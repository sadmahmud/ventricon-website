import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * ============================================================================
 * Central metadata builder
 * ============================================================================
 * Every route calls this so titles, canonicals, Open Graph and Twitter cards
 * stay consistent and cannot drift apart.
 */

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Route path with a leading slash, e.g. "/services/branding-design". */
  path: string;
  keywords?: string[];
  ogType?: "website" | "article" | "profile";
  /** Appends " | VENTRICON" when the title is a page-level string. */
  sufficed?: boolean;
  publishedTime?: string;
  noIndex?: boolean;
};

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.promise}`,
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  ogType = "website",
  sufficed = true,
  publishedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = sufficed ? `${title} | ${site.name}` : title;
  const canonical = path === "/" ? "/" : path;

  return {
    title: fullTitle,
    description,
    keywords: [...site.keywords, ...keywords],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/* --------------------------------------------------------- structured data */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.promise,
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    priceRange: "$$",
    currenciesAccepted: "USD, BDT",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: site.keywords,
    sameAs: Object.values(site.social).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "VENTRICON services",
      itemListElement: [
        "Branding & Design",
        "Website & E-commerce",
        "Digital Marketing",
        "AI & Automation",
        "Business Systems",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    serviceType: input.name,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function caseStudySchema(input: {
  title: string;
  description: string;
  path: string;
  sector: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${site.url}${input.path}`,
    about: input.sector,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}
