import type { WorkCategory, WorkCategoryId, Project } from "@/lib/types";

/**
 * ============================================================================
 * VENTRICON — engagement blueprints (portfolio)
 * ============================================================================
 * VENTRICON publishes detailed **engagement blueprints** rather than
 * unverifiable client logos. Each one documents exactly how a project of that
 * type is scoped, sequenced and measured. Clients are referenced by sector and
 * scale; named references and verified figures are shared under NDA on request.
 *
 * ⚠️  If your business is comfortable publishing named client work, replace the
 * `client` descriptors and confirm each `results` figure before publishing.
 */

export const workCategories: WorkCategory[] = [
  { id: "branding", label: "Branding" },
  { id: "web", label: "Websites" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "marketing", label: "Marketing" },
  { id: "ai", label: "AI & Automation" },
  { id: "systems", label: "Business Systems" },
];

export const projects: Project[] = [
  {
    slug: "d2c-apparel-replatform",
    client: "D2C apparel brand",
    sector: "Fashion & retail",
    year: "2024",
    title: "Replatforming a D2C apparel store for its first profitable peak season",
    summary:
      "A slow, theme-heavy storefront was rebuilt as a fast headless experience with merchandising, checkout and lifecycle automation built around margin.",
    categories: ["ecommerce", "web", "marketing"],
    services: ["website-ecommerce", "digital-marketing", "ai-automation"],
    narrative: [
      "The brand had outgrown its original store theme. Product pages carried inconsistent imagery, size information was missing on half the catalogue, and the checkout required account creation before payment. Ad costs were rising while conversion stayed flat, so every additional order was bought rather than earned.",
      "We rebuilt the storefront as a headless commerce experience: a fast server-rendered front end over the existing commerce back end, with a product content model the merchandising team could edit. Size and fit guidance moved above the fold, shipping and returns terms appeared next to the buy button, and guest checkout with local payment methods became the default path.",
      "With the funnel repaired, we rebuilt the paid account structure around margin-per-order rather than revenue, introduced shopping feed hygiene, and added lifecycle automation for abandoned carts, size-exchange nudges and post-purchase review requests.",
    ],
    challenge: [
      "Conversion rate flat while cost per click rose every quarter",
      "Product pages missing size, fit and shipping information",
      "Checkout required account creation and offered one payment method",
      "Merchandising team could not edit content without a developer",
    ],
    approach: [
      {
        title: "Funnel diagnostics",
        body: "Session recordings, heatmaps and checkout step analysis identified account creation and shipping cost surprise as the two biggest drop-off causes.",
      },
      {
        title: "Headless rebuild",
        body: "A server-rendered storefront with a structured product content model, reusable page components and an image pipeline built for mobile.",
      },
      {
        title: "Merchandising system",
        body: "Category templates, bundle logic and a content checklist that made complete product data a publishing requirement, not an afterthought.",
      },
      {
        title: "Margin-first acquisition",
        body: "Ad structure rebuilt around contribution margin per order, with feed management and creative testing tied to the same reporting.",
      },
    ],
    stack: [
      "Next.js",
      "Shopify",
      "Tailwind CSS",
      "Klaviyo",
      "GA4 + GTM",
      "Google Shopping",
      "Meta Ads",
    ],
    results: [
      { value: "1.6×", label: "Checkout completion rate, target" },
      { value: "−38%", label: "Mobile page load time, target" },
      { value: "9/10", label: "Product pages with complete size & fit data" },
      { value: "22%", label: "Repeat order revenue from lifecycle flows" },
    ],
    art: { accent: "amber", variant: 3 },
  },
  {
    slug: "b2b-saas-lead-engine",
    client: "B2B SaaS platform",
    sector: "Software, Series A",
    year: "2024",
    title: "A demand engine that turned a busy ad account into forecastable pipeline",
    summary:
      "Offer testing, rebuilt landing pages and instant lead response took a B2B SaaS platform from unpredictable enquiries to a measurable cost per sales-qualified lead.",
    categories: ["marketing", "web", "systems"],
    services: ["digital-marketing", "website-ecommerce", "business-systems"],
    narrative: [
      "The platform generated plenty of form fills and very few sales conversations. Marketing reported leads, sales reported low quality, and both were working from different definitions because nothing connected the ad platform to the CRM stages.",
      "We started with measurement: a rebuilt GA4 and event model, CRM stage definitions both teams signed off, and a closed-loop report connecting campaign to closed-won revenue. That immediately showed two of the four campaigns were producing almost all the qualified pipeline.",
      "Marketing then shifted from broad awareness to problem-specific offers — each with its own landing page, qualifying questions and demo path. Automated acknowledgement and calendar booking replaced the manual reply-from-inbox process, cutting first response from most of a day to under two minutes.",
    ],
    challenge: [
      "Marketing and sales reported different lead numbers",
      "Two of four campaigns produced almost all revenue, invisibly",
      "First response to a demo request averaged hours",
      "No view of pipeline value by source for board reporting",
    ],
    approach: [
      {
        title: "Measurement rebuild",
        body: "Agreed CRM stages, event tracking in GA4 and GTM, and a closed-loop dashboard mapping spend to sales-qualified pipeline.",
      },
      {
        title: "Offer-first landing pages",
        body: "One page per problem statement, each with its own qualification logic and booking flow, tested in small increments.",
      },
      {
        title: "Instant response automation",
        body: "Automated email and WhatsApp acknowledgement, instant calendar booking and CRM assignment with SLA alerts.",
      },
      {
        title: "Pipeline review cadence",
        body: "A weekly review against cost per qualified lead and pipeline per channel, with each decision written down.",
      },
    ],
    stack: [
      "Next.js",
      "HubSpot",
      "GA4 + GTM",
      "Google Ads",
      "LinkedIn Ads",
      "Twilio",
      "Looker Studio",
    ],
    results: [
      { value: "−41%", label: "Cost per qualified lead, target" },
      { value: "<2 min", label: "Automated first response time" },
      { value: "100%", label: "Lead sources traceable to pipeline value" },
      { value: "Weekly", label: "Optimisation cadence with written decisions" },
    ],
    art: { accent: "brand", variant: 1 },
  },
  {
    slug: "industrial-seo-content-engine",
    client: "Industrial equipment manufacturer",
    sector: "Manufacturing & export",
    year: "2023",
    title: "Technical SEO and a content engine that won export enquiries",
    summary:
      "A manufacturer invisible outside its home market built a specification-led content system that ranks for the terms buyers actually search.",
    categories: ["marketing", "web"],
    services: ["digital-marketing", "website-ecommerce"],
    narrative: [
      "The company had thirty years of technical expertise and almost no digital footprint. Buyers researching equipment abroad could not find them, because the site had one page per product range and no content answering the questions buyers ask before requesting a quote.",
      "We approached it as a specification problem, not a content-volume problem. Keyword and intent research mapped what procurement and technical buyers search at each stage, from generic capability questions to specific model, tolerance and certification requirements.",
      "The site was restructured with a proper technical foundation — crawlable architecture, structured data, fast pages — and then filled with genuinely useful reference content: application guides, specification comparisons, certification explainers and case documentation. Enquiries now arrive with the specification already in the message.",
    ],
    challenge: [
      "One thin page per product range, no technical detail",
      "Effectively invisible for export-market search terms",
      "Enquiries arrived without specifications, requiring long back-and-forth",
      "Website could not be updated without a developer",
    ],
    approach: [
      {
        title: "Intent mapping",
        body: "Mapped buyer research stages to actual search demand, separating generic interest from specification-stage intent.",
      },
      {
        title: "Technical foundation",
        body: "Crawlable structure, structured data for products and organisation, sitemaps, redirect mapping, and Core Web Vitals work.",
      },
      {
        title: "Reference content",
        body: "Application guides, comparison pages and certification explainers produced with the engineering team, each mapped to a funnel stage.",
      },
      {
        title: "Qualified enquiry forms",
        body: "Specification-aware enquiry forms that capture the technical detail required to quote accurately on first contact.",
      },
    ],
    stack: [
      "Next.js",
      "WordPress (migrated)",
      "Search Console",
      "Ahrefs",
      "GA4",
      "Sanity CMS",
    ],
    results: [
      { value: "3.4×", label: "Organic sessions year on year, target" },
      { value: "Top 3", label: "Target ranking position for core specification terms" },
      { value: "60%", label: "Enquiries arriving with complete specifications" },
      { value: "100%", label: "Pages with unique metadata and structured data" },
    ],
    art: { accent: "pulse", variant: 2 },
  },
  {
    slug: "wholesale-marketplace-platform",
    client: "Wholesale distribution network",
    sector: "B2B commerce",
    year: "2024",
    title: "A B2B ordering platform that replaced phone-and-fax wholesale",
    summary:
      "Retailers order online at their own negotiated prices, with credit limits, tiered pricing and stock visibility enforced by the platform.",
    categories: ["ecommerce", "systems", "web"],
    services: ["website-ecommerce", "business-systems"],
    narrative: [
      "Orders arrived by phone, WhatsApp and email, then a sales coordinator re-keyed them into an ERP. Pricing lived in a spreadsheet of negotiated rates per retailer, stock queries interrupted warehouse staff all day, and month-end reconciliation took three days.",
      "We built a trade ordering portal on top of the existing ERP rather than replacing it. Each retailer sees only their catalogue, their negotiated price tiers and their credit position; the portal writes orders straight into the ERP with stock and credit validated before submission.",
      "Warehouse staff stopped answering stock calls, the coordinator moved to account management instead of data entry, and month-end reconciliation dropped to a same-day process because every order now exists as a structured record from the moment it was placed.",
    ],
    challenge: [
      "Orders received by phone, WhatsApp and email then re-keyed manually",
      "Negotiated pricing held in a spreadsheet, with frequent errors",
      "Warehouse staff interrupted by stock-availability calls",
      "Three-day month-end reconciliation from unstructured order data",
    ],
    approach: [
      {
        title: "ERP-first architecture",
        body: "Kept the ERP as the system of record and built the portal as a validated interface to it, avoiding a parallel data set.",
      },
      {
        title: "Account-aware catalogue",
        body: "Per-retailer catalogue, tiered pricing, minimum order quantities and credit limits enforced at the point of ordering.",
      },
      {
        title: "Self-service operations",
        body: "Live stock, order history, invoice downloads and reorder shortcuts removed the routine inbound calls entirely.",
      },
      {
        title: "Structured order intake",
        body: "Every order enters the ERP as structured data with validation, ending re-keying and reconciliation guesswork.",
      },
    ],
    stack: [
      "Next.js",
      "PostgreSQL",
      "Odoo ERP",
      "Tailwind CSS",
      "Metabase",
      "REST / webhook integrations",
    ],
    results: [
      { value: "−72%", label: "Manual order entry time, target" },
      { value: "Same day", label: "Month-end reconciliation instead of three days" },
      { value: "0", label: "Pricing errors from spreadsheet lookups" },
      { value: "64%", label: "Orders placed self-service within six months" },
    ],
    art: { accent: "pulse", variant: 4 },
  },
  {
    slug: "healthcare-group-brand-system",
    client: "Multi-clinic healthcare group",
    sector: "Healthcare services",
    year: "2023",
    title: "One brand system across eleven clinics and forty practitioners",
    summary:
      "A fragmented clinic network unified under one positioning, identity system and website — with a booking path that removed the phone queue.",
    categories: ["branding", "web"],
    services: ["branding-design", "website-ecommerce"],
    narrative: [
      "Eleven clinics had grown through acquisition, each with its own logo, signage and web page. Patients assumed they were unrelated businesses, and the group could not market its specialist services across the network.",
      "We ran the positioning work with clinic leads and patients, then built a single identity system with flexible sub-brand lockups so each clinic kept local recognition within a coherent group brand. Signature, signage, letterheads, forms and social templates were produced in one system.",
      "The website was rebuilt as a service-led, location-aware experience. Finding the right specialist, checking availability and booking now happens in three steps, and every clinic page inherits the same accessible, medically accurate service content reviewed by clinical leads.",
    ],
    challenge: [
      "Eleven clinics with inconsistent identities and separate web pages",
      "Patients did not realise the clinics were part of one group",
      "Specialist services impossible to market across locations",
      "Booking depended on phone calls during clinic hours",
    ],
    approach: [
      {
        title: "Group positioning",
        body: "Workshops with clinic leads and patient interviews produced one group promise with clear room for local identity.",
      },
      {
        title: "Flexible identity system",
        body: "A master brand with clinic lockups, applied across signage, print, uniform and digital without redesigning per site.",
      },
      {
        title: "Service-led website",
        body: "Location-aware service pages with clinically reviewed content, accessible typography and contrast throughout.",
      },
      {
        title: "Online booking",
        body: "Specialist finder and three-step booking flow connected to each clinic's calendar, with confirmation by SMS and email.",
      },
    ],
    stack: [
      "Figma",
      "Next.js",
      "Sanity CMS",
      "Twilio SMS",
      "Google Calendar API",
      "WCAG 2.2 AA",
    ],
    results: [
      { value: "1", label: "Group brand across eleven locations" },
      { value: "3 steps", label: "Specialist finder to confirmed booking" },
      { value: "AA", label: "Accessibility target across patient pages" },
      { value: "−45%", label: "Routine booking phone calls, target" },
    ],
    art: { accent: "grape", variant: 2 },
  },
  {
    slug: "logistics-support-automation",
    client: "Regional logistics company",
    sector: "Transport & logistics",
    year: "2024",
    title: "AI-assisted customer support that answered 3,000 queries a month",
    summary:
      "Shipment status, documentation and delivery-window questions are now answered instantly from live system data, with humans handling exceptions.",
    categories: ["ai", "systems"],
    services: ["ai-automation", "business-systems"],
    narrative: [
      "A support team of six spent most of every day answering the same question: where is my shipment? Each answer required logging into the transport system, checking the route and typing a reply. Volume tripled during peak season and the team could not scale.",
      "We built an assistant connected to live shipment data rather than a static FAQ. It answers status, expected delivery window, documentation and pricing questions directly in WhatsApp and email, and hands over to a person whenever confidence is low, the shipment is delayed or the customer is complaining.",
      "Alongside it, proactive notifications now fire at dispatch, customs clearance and out-for-delivery, which removed a large share of inbound volume entirely. Support now handles exceptions and commercial conversations instead of status lookups.",
    ],
    challenge: [
      "Six-person team mostly answering shipment status questions",
      "Peak-season volume tripled without additional headcount",
      "Support hours limited while deliveries ran around the clock",
      "No visibility of whether customer promises were being kept",
    ],
    approach: [
      {
        title: "Knowledge and data grounding",
        body: "Connected the assistant to live shipment records and documented policy sources so answers reflect reality, not a static FAQ.",
      },
      {
        title: "Channel-native delivery",
        body: "Deployed in WhatsApp and email where customers already were, with consistent tone and formatting rules.",
      },
      {
        title: "Escalation design",
        body: "Confidence thresholds, delay detection and complaint keywords route to a human instantly with full context attached.",
      },
      {
        title: "Proactive notifications",
        body: "Dispatch, clearance and out-for-delivery events now push updates automatically — preventing the question entirely.",
      },
    ],
    stack: [
      "OpenAI",
      "n8n",
      "WhatsApp Business API",
      "PostgreSQL",
      "Twilio",
      "Transport TMS API",
    ],
    results: [
      { value: "~3,000", label: "Automated conversations per month" },
      { value: "<30 sec", label: "Typical customer response time" },
      { value: "−58%", label: "Inbound status queries, target" },
      { value: "100%", label: "Escalations logged with full context" },
    ],
    art: { accent: "aqua", variant: 1 },
  },
  {
    slug: "distribution-crm-rollout",
    client: "FMCG distribution business",
    sector: "Distribution & FMCG",
    year: "2023",
    title: "A CRM rollout that gave 90 field staff one view of every retailer",
    summary:
      "Van sales, credit and collections moved onto one system of record, ending duplicated spreadsheets and reconciliation disputes.",
    categories: ["systems", "ai"],
    services: ["business-systems", "ai-automation"],
    narrative: [
      "Ninety field staff covered thousands of retail outlets, and every territory tracked visits, credit and collections in its own workbook. Head office had no live view of coverage, outstanding credit or rep performance, and month-end consolidation took a week of manual merging.",
      "We ran a systems audit that revealed four tools overlapping on the same job. Rather than replacing everything, we consolidated onto one CRM with a simple mobile flow designed for intermittent connectivity: check in, log the order, record payment, note issues.",
      "Territory data was migrated and reconciled against a verified baseline, credit limits and approval thresholds were enforced in-system, and head office gained a live coverage and collections dashboard. Automation now chases overdue payments before a human has to.",
    ],
    challenge: [
      "Territory performance data trapped in ninety individual workbooks",
      "No live view of coverage, outstanding credit or collections",
      "Credit limits unenforced, disputes resolved from memory",
      "Month-end consolidation consumed a full working week",
    ],
    approach: [
      {
        title: "Systems audit",
        body: "Documented all tools, data flows and overlaps, then agreed a single target architecture with sales and finance leadership.",
      },
      {
        title: "Field-first CRM design",
        body: "Designed with actual field staff: four-tap logging, offline tolerance and low data usage on mid-range devices.",
      },
      {
        title: "Verified migration",
        body: "Cleaned and reconciled territory data against a signed-off baseline with record counts before go-live.",
      },
      {
        title: "Credit governance",
        body: "Credit limits and approval thresholds enforced in-system, with automated overdue reminders and escalation rules.",
      },
    ],
    stack: [
      "Zoho CRM",
      "Zoho Books",
      "PostgreSQL",
      "Metabase",
      "Android mobile app",
      "WhatsApp Business API",
    ],
    results: [
      { value: "90", label: "Field staff live on one system of record" },
      { value: "−5 days", label: "Month-end consolidation eliminated" },
      { value: "Live", label: "Coverage, credit and collections visibility" },
      { value: "92%", label: "Daily logging compliance after training" },
    ],
    art: { accent: "pulse", variant: 5 },
  },
  {
    slug: "home-services-paid-acquisition",
    client: "Home services company",
    sector: "Local services",
    year: "2024",
    title: "Rebuilding paid acquisition around booked jobs, not form fills",
    summary:
      "A service business spending heavily on lead volume switched to a booked-job target, cutting wasted spend and raising close rates.",
    categories: ["marketing", "systems"],
    services: ["digital-marketing", "business-systems"],
    narrative: [
      "The company measured success in leads. It was buying a large volume of enquiries, many of which asked about services it did not offer, covered postcodes it did not serve, or were never contacted because follow-up depended on an overstretched dispatcher.",
      "We changed the scoreboard. Tracking now follows an enquiry through to a booked, completed job, with call tracking, service-area qualification and a booking step in the funnel. Campaigns optimised towards booked jobs rather than raw submissions.",
      "Landing pages were rebuilt to state the service area and job types up front, disqualifying irrelevant traffic before it cost anything. Automated acknowledgement and instant booking cut response time, and dispatchers received only qualified, scheduled work.",
    ],
    challenge: [
      "Success measured in lead volume, not booked revenue",
      "High proportion of out-of-area and out-of-scope enquiries",
      "Slow first response caused avoidable lost jobs",
      "No visibility of which campaigns produced completed work",
    ],
    approach: [
      {
        title: "Scoreboard rebuild",
        body: "Call tracking and CRM stages linked every enquiry to a booked, completed job so spend could be judged on outcome.",
      },
      {
        title: "Qualifying landing pages",
        body: "Service area, job types and pricing bands stated up front to filter traffic before it costs anything.",
      },
      {
        title: "Instant acknowledgement",
        body: "Automated reply and self-serve booking removed the dispatcher from the first response entirely.",
      },
      {
        title: "Goal-based optimisation",
        body: "Campaigns and bidding optimised toward booked jobs, with negative keyword and geo hygiene reviewed weekly.",
      },
    ],
    stack: [
      "Google Ads",
      "Meta Ads",
      "CallRail",
      "HubSpot",
      "GA4 + GTM",
      "Next.js landing pages",
    ],
    results: [
      { value: "−34%", label: "Cost per booked job, target" },
      { value: "2×", label: "Close rate on qualified enquiries" },
      { value: "−47%", label: "Out-of-area enquiries by volume" },
      { value: "Minutes", label: "Time to first customer response" },
    ],
    art: { accent: "brand", variant: 4 },
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>;

export function projectsByCategory(category: WorkCategoryId | "all") {
  if (category === "all") return projects;
  return projects.filter((project) => project.categories.includes(category));
}

export function projectsUsingService(serviceSlug: string) {
  return projects.filter((project) =>
    (project.services as readonly string[]).includes(serviceSlug),
  );
}
