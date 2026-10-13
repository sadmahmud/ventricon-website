import type { Solution } from "@/lib/types";

/**
 * ============================================================================
 * VENTRICON — solution packages
 * ============================================================================
 * Services are what we do; solutions are the outcome a client is buying.
 * Each solution maps to two or more services and is sold as a scoped programme.
 */

export const solutions: Solution[] = [
  {
    slug: "launch-a-new-business",
    name: "Launch a New Business",
    tagline: "From idea to a trading, credible, findable business.",
    audience: "Founders, new ventures, spin-offs and first market entries",
    problem:
      "You have a validated idea and a deadline, but no brand, no website, no funnel and no operating system — and you can't afford to get the fundamentals wrong once.",
    summary:
      "A single programme that takes a new venture from positioning to launch: brand identity, a fast marketing site, the commerce or enquiry funnel, tracking and the operating stack to run it.",
    includes: [
      "Positioning, naming and visual identity system",
      "Brand guidelines site with editable asset library",
      "Marketing website with CMS and lead capture",
      "E-commerce or booking/checkout flow where relevant",
      "Domain, hosting, SSL, email and business tooling setup",
      "Analytics, conversion tracking and launch campaign assets",
      "Lightweight CRM and enquiry routing from day one",
    ],
    outcomes: [
      "A brand that reads established, not improvised",
      "A live, fast, editable website with tracking in place",
      "A documented enquiry-to-customer path your team can run",
      "Everything owned by you, on your own accounts",
    ],
    services: ["branding-design", "website-ecommerce", "digital-marketing"],
    timeline: "6–10 weeks",
    idealFor: [
      "You are launching within a defined window",
      "You want one accountable partner, not five vendors",
      "You need brand, web and marketing working together from day one",
    ],
    featured: true,
    icon: "rocket",
    accent: "grape",
  },
  {
    slug: "grow-online-sales",
    name: "Grow Online Sales",
    tagline: "Fix the funnel, then spend behind what already converts.",
    audience: "Retailers, D2C brands, wholesalers and multi-category sellers",
    problem:
      "Traffic exists but revenue doesn't follow. Cheap clicks arrive, carts get abandoned, repeat orders don't happen, and the store feels like a cost centre instead of a growth engine.",
    summary:
      "A revenue-focused programme that repairs the storefront and checkout, rebuilds product content and merchandising, then scales paid and lifecycle marketing against real margin data.",
    includes: [
      "Store UX, product page and checkout friction audit",
      "Merchandising and catalogue architecture rebuild",
      "Product content system: imagery, copy, specs, variants",
      "Checkout, payment, shipping and tax optimisation",
      "Abandoned-cart, post-purchase and win-back automation",
      "Paid search, shopping and social campaigns with feed hygiene",
      "Cohort, margin and repeat-purchase reporting",
    ],
    outcomes: [
      "Higher conversion rate on the traffic you already pay for",
      "A lower cost per order through better attribution and creative",
      "Repeat revenue from lifecycle automation, not discounting",
      "Store operations your team can merchandise without a developer",
    ],
    services: ["website-ecommerce", "digital-marketing", "ai-automation"],
    timeline: "8–12 weeks, then ongoing growth",
    idealFor: [
      "You have product-market fit and want profitable volume",
      "Your ad account has history to learn from",
      "You can support higher order volume operationally",
    ],
    icon: "cart",
    accent: "amber",
  },
  {
    slug: "generate-qualified-leads",
    name: "Generate Qualified Leads",
    tagline: "Pipeline you can forecast, not luck you can't repeat.",
    audience: "B2B services, agencies, consultants, SaaS and high-ticket businesses",
    problem:
      "Enquiries arrive inconsistently, quality varies wildly, follow-up is manual, and you cannot say which channel produces customers — so planning next quarter is guesswork.",
    summary:
      "A demand-generation system that aligns offer, landing pages, tracking, CRM stages and follow-up automation so every lead is measured, routed and worked within minutes.",
    includes: [
      "Offer and message testing to find what converts",
      "Landing pages built to test specific offers and audiences",
      "Google, LinkedIn and Meta campaigns with lead-quality scoring",
      "GA4 and CRM closed-loop attribution",
      "Instant lead response by email and WhatsApp",
      "Pipeline stages, SLAs and follow-up sequences in your CRM",
      "Weekly pipeline review against cost per qualified lead",
    ],
    outcomes: [
      "A predictable cost per qualified lead by channel",
      "Response to every enquiry within minutes, automatically",
      "A pipeline dashboard leadership can forecast from",
      "Sales and marketing finally reading the same numbers",
    ],
    services: ["digital-marketing", "business-systems", "ai-automation"],
    timeline: "6–10 weeks, then ongoing optimisation",
    idealFor: [
      "Deal values justify paid acquisition cost",
      "Sales follow-up currently depends on memory",
      "You need board- or investor-ready reporting",
    ],
    featured: true,
    icon: "target",
    accent: "brand",
  },
  {
    slug: "automate-your-operations",
    name: "Automate Your Operations",
    tagline: "Take the repeated work off your team's plate.",
    audience: "Operations-heavy teams in logistics, services, healthcare and manufacturing",
    problem:
      "Growth has added manual workload rather than profit. Staff re-enter the same data, chase approvals, answer identical questions and rebuild reports by hand every month.",
    summary:
      "A programme that maps your processes, quantifies the waste, then builds and governs the automations and AI assistants that remove it — with humans kept in the loop where it matters.",
    includes: [
      "Process mapping with time and cost per step",
      "Automation opportunity register ranked by payback",
      "API and workflow integrations across your existing tools",
      "AI assistant trained on your documents, with citations",
      "Document, invoice and order data extraction",
      "Approval routing, escalation rules and exception alerts",
      "Monitoring, cost controls and staff training",
    ],
    outcomes: [
      "Measurable staff hours returned every week",
      "Response times cut from hours or days to minutes",
      "Fewer errors and rework from manual data handling",
      "Capacity to grow volume without adding headcount",
    ],
    services: ["ai-automation", "business-systems"],
    timeline: "4–8 weeks for the first wave, then monthly",
    idealFor: [
      "High-volume, repeatable internal processes",
      "Tools that support APIs, webhooks or exports",
      "A team open to changing how they work",
    ],
    icon: "flow",
    accent: "aqua",
  },
  {
    slug: "unify-business-systems",
    name: "Unify Business Systems",
    tagline: "One source of truth, one set of numbers, one way of working.",
    audience: "Companies of 10–200 people running on disconnected tools and spreadsheets",
    problem:
      "Sales, operations, finance and service each keep their own records. Reporting takes days, numbers contradict each other, and knowledge leaves with the person who maintained the sheet.",
    summary:
      "A systems programme that audits what you run today, designs the target architecture, implements the CRM/ERP backbone, migrates your data and drives genuine team adoption.",
    includes: [
      "Systems, data-flow and process audit",
      "Target architecture and phased implementation roadmap",
      "CRM or ERP configuration to your actual processes",
      "Customer, supplier or partner self-service portal",
      "Historical data cleaning, migration and verification",
      "Role-based access, audit logging and backup procedures",
      "Live dashboards with scheduled reporting",
      "SOPs, ownership matrix and department training",
    ],
    outcomes: [
      "Every core process has one system of record",
      "Live dashboards instead of month-end copy-paste",
      "Processes that survive staff changes",
      "Audit, access and retention controls in place before you need them",
    ],
    services: ["business-systems", "ai-automation"],
    timeline: "8–16 weeks depending on scope and migration size",
    idealFor: [
      "You have outgrown spreadsheets and shared inboxes",
      "Multiple departments need to see the same data",
      "You need a system that will still fit in three years",
    ],
    icon: "database",
    accent: "pulse",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation Partner",
    tagline: "A multi-quarter programme across brand, marketing, systems and AI.",
    audience: "Established businesses modernising every customer-facing and internal function",
    problem:
      "The business works, but it works the way it did five years ago. Competitors launch faster, customers expect more, and internal friction is capping growth more than demand is.",
    summary:
      "An end-to-end engagement run in phases across all five VENTRICON capabilities, with a shared roadmap, quarterly targets and a single accountable account team.",
    includes: [
      "Full business, brand, market and systems diagnostic",
      "Multi-quarter roadmap with sequenced, funded phases",
      "Brand and digital presence rebuild",
      "Demand generation and lifecycle marketing engine",
      "CRM, ERP and portal implementation",
      "AI and automation layer across operations",
      "Leadership dashboards and quarterly business reviews",
    ],
    outcomes: [
      "A modern brand and digital estate working as one system",
      "Acquisition, conversion and retention measured end to end",
      "Operations running on data rather than memory",
      "A technology roadmap your board can follow and fund",
    ],
    services: [
      "branding-design",
      "website-ecommerce",
      "digital-marketing",
      "ai-automation",
      "business-systems",
    ],
    timeline: "3–12 months, phased quarterly",
    idealFor: [
      "Multiple functions need upgrading, not one fix",
      "Leadership wants one partner accountable for the outcome",
      "You can commit to a phased programme with a budget",
    ],
    icon: "sparkles",
    accent: "grape",
  },
];

export const solutionBySlug = Object.fromEntries(
  solutions.map((solution) => [solution.slug, solution]),
) as Record<string, Solution>;

/** Solutions that include a given service — used for cross-linking. */
export function solutionsUsingService(serviceId: string): Solution[] {
  return solutions.filter((solution) =>
    (solution.services as readonly string[]).includes(serviceId),
  );
}
