/**
 * ============================================================================
 * VENTRICON — single source of truth for brand + contact information.
 * ============================================================================
 * ⚠️  EDIT THIS FILE FIRST when deploying.
 *
 * Every value marked `PLACEHOLDER` below must be replaced with real company
 * details before launch. Anything left empty is automatically omitted from the
 * UI (so the site never renders a dead link or an empty social icon).
 */

export const site = {
  name: "VENTRICON",
  legalName: "VENTRICON Business Solutions & Technology",
  category: "Business Solutions & Technology",
  promise: "Build. Grow. Transform.",
  tagline: "Business solutions powered by strategy, creativity & technology.",

  /** Used for <title>, Open Graph, JSON-LD and the sitemap. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ventricon.com").replace(
    /\/+$/,
    "",
  ),

  description:
    "VENTRICON is a business solutions and technology partner. We build brands, websites, e-commerce stores, marketing engines, AI automations and the internal systems that run your company — then scale them.",

  shortDescription:
    "Branding, websites, e-commerce, digital marketing, AI automation and business systems for growth-focused companies.",

  /** Comma-separated keyword list for <meta name="keywords"> and JSON-LD. */
  keywords: [
    "business solutions company",
    "branding and design agency",
    "website development",
    "e-commerce development",
    "digital marketing agency",
    "AI automation",
    "business process automation",
    "CRM implementation",
    "digital transformation partner",
    "VENTRICON",
  ],

  contact: {
    /** PLACEHOLDER — replace with a monitored mailbox. */
    email: "hello@ventricon.com",
    /** PLACEHOLDER — used for new-project enquiries. */
    projectsEmail: "projects@ventricon.com",
    /** PLACEHOLDER — display format. */
    phoneDisplay: "+880 1700 000000",
    /** PLACEHOLDER — E.164 format, used for tel: links and schema.org. */
    phoneE164: "+8801700000000",
    /**
     * WhatsApp number in international format WITHOUT the leading "+",
     * e.g. "8801700000000". Leave empty to hide every WhatsApp call-to-action.
     * Can also be supplied at build time with NEXT_PUBLIC_WHATSAPP_NUMBER.
     */
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ?? "",

    address: {
      /** PLACEHOLDER */
      street: "Level 4, House 12, Road 5, Banani",
      /** PLACEHOLDER */
      locality: "Dhaka",
      region: "Dhaka Division",
      postalCode: "1213",
      country: "Bangladesh",
      countryCode: "BD",
    },

    /** PLACEHOLDER */
    hours: [
      { days: "Sunday – Thursday", time: "10:00 – 19:00 (GMT+6)" },
      { days: "Friday – Saturday", time: "Closed" },
    ],
    responseTime: "We reply to every enquiry within one business day.",
  },

  /**
   * Social profiles — leave blank to hide. Example:
   * linkedin: "https://www.linkedin.com/company/ventricon",
   */
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    github: "",
  },

  /** PLACEHOLDER — swap for real company facts. */
  facts: {
    /** Bump annually; the footer also self-corrects in the browser. */
    copyrightYear: 2026,
    /** ISO date of the last content update — drives sitemap lastModified. */
    contentUpdated: "2026-10-08",
    founded: 2019,
    teamSize: "12–20 specialists",
    languages: "English, বাংলা",
    clientsServed: "60+",
    countriesServed: "8",
  },

  nav: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export const fullAddress = [
  site.contact.address.street,
  site.contact.address.locality,
  site.contact.address.postalCode,
  site.contact.address.country,
]
  .filter(Boolean)
  .join(", ");

/** Real, key-less Google Maps link generated from the address above. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`;

/** Builds a wa.me deep link. Returns null when no number is configured. */
export function whatsappLink(message?: string): string | null {
  const number = site.contact.whatsapp;
  if (!number) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export const mailtoLink = `mailto:${site.contact.email}`;
export const telLink = `tel:${site.contact.phoneE164}`;

/** A "let's talk" WhatsApp message pre-filled for qualified enquiries. */
export const WHATSAPP_DEFAULT_MESSAGE = `Hello ${site.name}, I'd like to discuss a project.`;
