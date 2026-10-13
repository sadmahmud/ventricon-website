import type { IconName } from "@/components/ui/Icon";

/** The five VENTRICON capability areas. */
export type ServiceId =
  | "branding-design"
  | "website-ecommerce"
  | "digital-marketing"
  | "ai-automation"
  | "business-systems";

export type Accent = "aqua" | "brand" | "grape" | "pulse" | "amber";

export type Service = {
  id: ServiceId;
  slug: ServiceId;
  order: number;
  /** Full display name, e.g. "Branding & Design". */
  name: string;
  /** Short label for navigation and chips. */
  shortName: string;
  /** One-line promise used on cards. */
  tagline: string;
  /** 1–2 sentence summary for grids, meta descriptions and cards. */
  summary: string;
  /** Long-form intro for the service detail page hero. */
  intro: string[];
  /** What the engagement typically produces, in plain business language. */
  outcomesIntro: string;
  icon: IconName;
  accent: Accent;
  /** "Signs you need this" — written from the client's point of view. */
  problems: { title: string; body: string }[];
  /** Capability groups — what we actually do. */
  capabilities: { title: string; body: string; icon: IconName }[];
  /** Commercial / business benefits. */
  benefits: { title: string; body: string }[];
  /** Tangible items the client keeps at handover. */
  deliverables: string[];
  /** Service-specific process detail (4 steps). */
  process: { title: string; body: string }[];
  /** The numbers we instrument and report on — never vanity metrics. */
  metrics: { value: string; label: string }[];
  /** Tools and platforms we work in. */
  stack: string[];
  /** Engagement models with indicative durations. */
  engagements: {
    name: string;
    duration: string;
    bestFor: string;
    includes: string[];
    featured?: boolean;
  }[];
  faqs: { q: string; a: string }[];
  /** Pre-fills the "Service needed" field on the contact form. */
  ctaLabel: string;
};

export type Solution = {
  slug: string;
  name: string;
  tagline: string;
  /** Who it is designed for. */
  audience: string;
  /** The business problem in the client's words. */
  problem: string;
  summary: string;
  includes: string[];
  outcomes: string[];
  services: ServiceId[];
  timeline: string;
  idealFor: string[];
  featured?: boolean;
  icon: IconName;
  accent: Accent;
};

export type WorkCategoryId =
  | "branding"
  | "web"
  | "ecommerce"
  | "marketing"
  | "ai"
  | "systems";

export type WorkCategory = {
  id: WorkCategoryId;
  label: string;
};

export type Project = {
  slug: string;
  /** Client descriptor — anonymised sector + scale, not a company name. */
  client: string;
  sector: string;
  year: string;
  title: string;
  /** One-sentence hook shown on cards. */
  summary: string;
  categories: WorkCategoryId[];
  services: ServiceId[];
  /** 2–3 paragraph narrative for the case-study page. */
  narrative: string[];
  challenge: string[];
  approach: { title: string; body: string }[];
  stack: string[];
  results: { value: string; label: string }[];
  /** Optional pull-quote. */
  quote?: { text: string; author: string };
  /** Deterministic gradient artwork seed + palette for the card visual. */
  art: { accent: Accent; variant: number };
};

export type Step = {
  index: string;
  title: string;
  summary: string;
  points: string[];
  duration: string;
};

export type Faq = { q: string; a: string };

/** Payload accepted by POST /api/contact. */
export type ContactPayload = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
  consent: boolean;
  /** Spam honeypot — must stay empty. */
  company_website?: string;
};

export type DeliveryChannelStatus = "sent" | "skipped" | "failed";

export type DeliveryReport = {
  channel: string;
  status: DeliveryChannelStatus;
  detail?: string;
};

export type ContactApiSuccess = {
  ok: true;
  reference: string;
  receivedAt: string;
  delivery: DeliveryReport[];
  /** True when no outbound integration is configured yet. */
  storedLocally: boolean;
  /** Direct fallback link so a real lead is never lost. */
  fallback: { email: string; whatsapp: string | null };
};

export type ContactApiError = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
  retryAfterSeconds?: number;
};

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
