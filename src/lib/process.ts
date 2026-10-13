import type { Faq, Step } from "@/lib/types";
import type { IconName } from "@/components/ui/Icon";

/**
 * ============================================================================
 * VENTRICON — how we work, why us, and standing commitments
 * ============================================================================
 */

/** The five-stage VENTRICON engagement model. */
export const processSteps: Step[] = [
  {
    index: "01",
    title: "Discover",
    summary:
      "We start by understanding the business, not the deliverable.",
    points: [
      "Stakeholder interviews with founders, sales, operations and support",
      "Review of current brand, website, marketing and internal tools",
      "Customer conversations to hear the real buying objections",
      "Competitor and market scan to find genuine differentiation",
    ],
    duration: "Week 1–2",
  },
  {
    index: "02",
    title: "Strategize",
    summary:
      "A written plan with scope, sequence, budget and success measures.",
    points: [
      "Define the single objective and the metric that proves it worked",
      "Agree scope, deliverables, timeline and what is explicitly out of scope",
      "Prioritise the work by expected return and implementation effort",
      "Lock the plan in a shared workspace you can review at any point",
    ],
    duration: "Week 2–3",
  },
  {
    index: "03",
    title: "Build",
    summary:
      "Senior people design, write and engineer it — with weekly visibility.",
    points: [
      "Design and development in short cycles, not one big reveal",
      "A weekly progress note covering shipped, in progress and blocked",
      "Your feedback at each milestone, structured so it stays fast",
      "Quality gates for accessibility, performance and security",
    ],
    duration: "Week 3–8",
  },
  {
    index: "04",
    title: "Launch",
    summary: "A rehearsed, monitored release — not a hopeful 'go live'.",
    points: [
      "Pre-launch checklist: redirects, tracking, forms, backups, rollback",
      "Staging review and sign-off against the agreed success measures",
      "Monitoring, alerts and a hypercare window after release",
      "Team training, documentation and full ownership handover",
    ],
    duration: "Launch week",
  },
  {
    index: "05",
    title: "Grow",
    summary:
      "We measure what shipped and improve it on a fixed cadence.",
    points: [
      "Dashboards tracking the metrics we committed to at the start",
      "Monthly reviews with written decisions, not just reporting",
      "Continuous testing across offers, pages and campaigns",
      "Roadmap updates as the data tells us what to do next",
    ],
    duration: "Ongoing",
  },
];

/** "Why VENTRICON" pillars used on the home and about pages. */
export const whyVentricon: {
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    title: "Senior people on your work",
    body: "You work directly with the strategist, designer and engineer doing the work. No account layer translating your brief into a ticket.",
    icon: "users",
  },
  {
    title: "Strategy before execution",
    body: "We refuse to start designing until we can state the objective, the audience and the measure of success in one paragraph you agree with.",
    icon: "compass",
  },
  {
    title: "Cross-functional by default",
    body: "Brand, web, marketing, automation and systems sit under one roof, so your website, campaigns and CRM actually share the same assumptions.",
    icon: "layers",
  },
  {
    title: "Measured, not asserted",
    body: "Every engagement is instrumented. You get the same dashboards we use, with definitions agreed before work starts.",
    icon: "chart",
  },
  {
    title: "You own everything",
    body: "Code, design files, ad accounts, domains and automations are in your name. No hostage hosting, no proprietary lock-in, no exit fee.",
    icon: "lock",
  },
  {
    title: "Built to be maintained",
    body: "Documented, version-controlled and handed over with training, so your team can operate it without calling us for routine changes.",
    icon: "refresh",
  },
];

/** The VENTRICON operating values, shown on the About page. */
export const values: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Clarity over cleverness",
    body: "Plain language, honest scope and realistic timelines. If something won't work, you hear it before you spend on it.",
    icon: "lightbulb",
  },
  {
    title: "Own the outcome",
    body: "We measure ourselves on your booked jobs, orders, pipeline and hours saved — not on deliverables shipped.",
    icon: "target",
  },
  {
    title: "Respect the operator",
    body: "Everything we build is judged by whether a busy person under pressure can actually use it on a normal Tuesday.",
    icon: "shield",
  },
  {
    title: "Document everything",
    body: "If it isn't written down, it doesn't survive a staff change. Our work is designed to outlast the people who built it.",
    icon: "database",
  },
];

/** Written commitments that replace vague agency assurances. */
export const commitments: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Reply within one business day",
    body: "Every enquiry gets a considered human answer within one working day — including the ones we're not the right fit for.",
    icon: "clock",
  },
  {
    title: "Fixed scope, fixed price",
    body: "Project work is quoted as a fixed scope and price. Changes are discussed and agreed before they cost anything.",
    icon: "shield",
  },
  {
    title: "Weekly visibility",
    body: "One written update per week covering what shipped, what's next and anything at risk. No silence, no surprises.",
    icon: "calendar",
  },
  {
    title: "Full asset ownership",
    body: "All approved deliverables transfer to you on final payment, including source files, accounts and documentation.",
    icon: "lock",
  },
];

/** Team roles — presented as capability groups rather than invented profiles. */
export const teamRoles: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Strategy & Brand",
    body: "Positioning research, naming, messaging and verbal identity. Leads discovery on every engagement.",
    icon: "compass",
  },
  {
    title: "Design",
    body: "Visual identity, design systems, UX and interface design across web, product and print.",
    icon: "palette",
  },
  {
    title: "Engineering",
    body: "Front-end and back-end development, integrations, performance, accessibility and security.",
    icon: "code",
  },
  {
    title: "Growth",
    body: "Paid media, SEO, content, lifecycle automation, analytics and conversion optimisation.",
    icon: "chart",
  },
  {
    title: "Automation & AI",
    body: "Process mapping, workflow integrations, AI assistants, guardrails and governance.",
    icon: "robot",
  },
  {
    title: "Business Systems",
    body: "CRM, ERP and portal implementation, data migration, BI dashboards and adoption training.",
    icon: "database",
  },
  {
    title: "Client Partnership",
    body: "Single point of contact, scope management, weekly reporting and quarterly business reviews.",
    icon: "briefcase",
  },
];

/** General FAQs — also emitted as FAQPage structured data. */
export const generalFaqs: Faq[] = [
  {
    q: "What does a typical engagement with VENTRICON look like?",
    a: "It starts with a discovery call and a written proposal covering scope, timeline, fixed price and the metric we'll be measured on. Most projects run through the same five stages — Discover, Strategize, Build, Launch, Grow — with a weekly progress note and your feedback at each milestone.",
  },
  {
    q: "How quickly can we start?",
    a: "Discovery calls are typically scheduled within two business days, and most projects begin within one to two weeks of an approved proposal, depending on current capacity and how quickly content and access are ready on your side.",
  },
  {
    q: "How is pricing structured?",
    a: "Projects are quoted as fixed scope and price so you know the total before committing. Ongoing work — marketing management, design capacity, automation and systems support — runs as a monthly retainer with a defined capacity and deliverables. Ad spend, licences and third-party subscriptions are paid directly by you so you keep ownership and history.",
  },
  {
    q: "Do you work with businesses outside Bangladesh?",
    a: "Yes. We work with clients across South Asia, the Middle East, Europe and North America. Delivery runs remotely with scheduled overlap hours in your timezone, and we confirm the working rhythm before kick-off so nothing depends on guesswork.",
  },
  {
    q: "What do you need from us to get started?",
    a: "A decision-maker who can approve scope quickly, access to your existing accounts and systems, and honest input from the people who do the work day to day. We handle the rest, including writing and setting up what doesn't exist yet.",
  },
  {
    q: "Who owns the work you produce?",
    a: "You do. On final payment, IP in all approved deliverables transfers to you, including source files, code repositories, ad accounts, analytics properties and documentation. We don't hold your website, domain or data hostage.",
  },
  {
    q: "Can we hire you for one specific service only?",
    a: "Absolutely. Many clients start with a single well-scoped project — a website rebuild, an automation audit or a brand refresh — and expand later if it makes sense. We'd rather do one thing properly than sell a programme you don't need.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a hypercare window with monitoring and support. After that you can take over with the training and documentation we provide, or continue on a retainer for maintenance, optimisation and growth work.",
  },
];

/** Used for the "not sure where to start" path from the contact page. */
export const contactGuidance = [
  {
    title: "You need a brand and a website",
    body: "Start with Launch a New Business — brand system plus a fast, editable site with tracking from day one.",
    href: "/solutions#launch-a-new-business",
    icon: "rocket" as IconName,
  },
  {
    title: "You need more enquiries",
    body: "Start with Generate Qualified Leads, or the Digital Marketing service if tracking is already healthy.",
    href: "/solutions#generate-qualified-leads",
    icon: "target" as IconName,
  },
  {
    title: "Your team is drowning in admin",
    body: "Start with Automate Your Operations — we map the processes first, then build the highest-return fix.",
    href: "/solutions#automate-your-operations",
    icon: "flow" as IconName,
  },
  {
    title: "Nothing agrees except the spreadsheet",
    body: "Start with Unify Business Systems — audit, target architecture, migration and adoption.",
    href: "/solutions#unify-business-systems",
    icon: "database" as IconName,
  },
];
