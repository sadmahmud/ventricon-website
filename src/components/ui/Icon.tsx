/**
 * VENTRICON — typed icon set.
 *
 * Hand-rolled inline SVGs (no icon-font, no runtime dependency) so icons are
 * server-rendered, tree-shaken by the compiler and themeable via `currentColor`.
 */

export type IconName =
  | "arrowRight"
  | "arrowUpRight"
  | "arrowLeft"
  | "check"
  | "checkCircle"
  | "chevronDown"
  | "chevronRight"
  | "close"
  | "menu"
  | "mail"
  | "phone"
  | "mapPin"
  | "clock"
  | "whatsapp"
  | "sparkles"
  | "palette"
  | "code"
  | "cart"
  | "megaphone"
  | "chip"
  | "robot"
  | "layers"
  | "flow"
  | "database"
  | "gauge"
  | "target"
  | "compass"
  | "shield"
  | "zap"
  | "users"
  | "briefcase"
  | "rocket"
  | "refresh"
  | "lock"
  | "globe"
  | "chart"
  | "search"
  | "calendar"
  | "lightbulb"
  | "loader"
  | "alert"
  | "quote"
  | "external";

type IconPath = { d: string; fill?: boolean };

const PATHS: Record<IconName, IconPath[]> = {
  arrowRight: [{ d: "M5 12h14M13 6l6 6-6 6" }],
  arrowUpRight: [{ d: "M7 17 17 7M8 7h9v9" }],
  arrowLeft: [{ d: "M19 12H5M11 18l-6-6 6-6" }],
  check: [{ d: "m4.5 12.5 4.5 4.5L19.5 6.5" }],
  checkCircle: [
    { d: "M21.5 12a9.5 9.5 0 1 1-4.2-7.86" },
    { d: "m8 12 3 3 9.5-9.5" },
  ],
  chevronDown: [{ d: "m6 9.5 6 6 6-6" }],
  chevronRight: [{ d: "m9.5 6 6 6-6 6" }],
  close: [{ d: "M6 6l12 12M18 6 6 18" }],
  menu: [{ d: "M3.5 7h17M3.5 12h17M3.5 17h17" }],
  mail: [
    { d: "M3 6.5h18v11H3z" },
    { d: "m3.5 7 8.5 6 8.5-6" },
  ],
  phone: [
    {
      d: "M6.6 3.5h3l1.5 4-2 1.4a11 11 0 0 0 5.9 5.9l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
    },
  ],
  mapPin: [
    { d: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" },
    { d: "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
  ],
  clock: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "M12 7.5V12l3 2" },
  ],
  whatsapp: [
    {
      d: "M20.1 11.7a8.1 8.1 0 0 1-11.9 7.1L3.5 20l1.3-4.5A8.1 8.1 0 1 1 20.1 11.7Z",
    },
    {
      d: "M8.8 8.2c.4-.2.9 0 1.1.4l.6 1.1c.2.3.1.7-.1 1l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.3-.2.7-.3 1-.1l1.1.6c.4.2.6.7.4 1.1-.4.9-1.4 1.5-2.4 1.3a8.6 8.6 0 0 1-6.8-6.8c-.2-1 .4-2 1.4-2.4Z",
    },
  ],
  sparkles: [
    { d: "M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" },
    { d: "M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" },
  ],
  palette: [
    {
      d: "M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.7 1.8-1.6 0-.8-.5-1.2-.5-2 0-.8.7-1.4 1.6-1.4h1.3a4.3 4.3 0 0 0 4.3-4.3c0-4.3-3.9-7.7-8.5-7.7Z",
    },
    { d: "M8 10.2h.01M11 7.7h.01M7 13.6h.01" },
  ],
  code: [{ d: "m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5.5l-3 13" }],
  cart: [
    { d: "M3.5 4.5h2.2l2.3 10.4h9.2l2.3-7.4H6.4" },
    { d: "M9.5 20h.01M17 20h.01" },
  ],
  megaphone: [
    { d: "M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H8l7 4V6.5l-7 4H5.5A1.5 1.5 0 0 0 4 12Z" },
    { d: "M18 9.5a4 4 0 0 1 0 5" },
  ],
  chip: [
    { d: "M7.5 7.5h9v9h-9z" },
    {
      d: "M10 3.5v4M14 3.5v4M10 16.5v4M14 16.5v4M3.5 10h4M3.5 14h4M16.5 10h4M16.5 14h4",
    },
  ],
  robot: [
    { d: "M5 9.5h14v9H5z" },
    { d: "M12 5.5v4M9 14h.01M15 14h.01M9.5 17.5h5" },
    { d: "M12 3.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" },
  ],
  layers: [
    { d: "m12 3.5 8 4.2-8 4.3-8-4.3 8-4.2Z" },
    { d: "m4 12.2 8 4.3 8-4.3" },
    { d: "m4 16.5 8 4.2 8-4.2" },
  ],
  flow: [
    { d: "M4 6.5h5.5v5H4zM14.5 12.5H20v5h-5.5z" },
    { d: "M9.5 9h2.5a2.5 2.5 0 0 1 2.5 2.5v3.5" },
  ],
  database: [
    { d: "M12 3.5c4.1 0 7.5 1.3 7.5 3s-3.4 3-7.5 3-7.5-1.3-7.5-3 3.4-3 7.5-3Z" },
    { d: "M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" },
    { d: "M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" },
  ],
  gauge: [
    { d: "M4 17.5a9 9 0 1 1 16 0" },
    { d: "m12 17.5 3.5-5" },
  ],
  target: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" },
    { d: "M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" },
  ],
  compass: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "m14.8 9.2-1.6 4.2-4.2 1.6 1.6-4.2 4.2-1.6Z" },
  ],
  shield: [
    { d: "M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-2.5Z" },
    { d: "m9.2 12 2 2 3.6-3.6" },
  ],
  zap: [{ d: "M13.5 3.5 6 13.2h4.8L10.2 20.5 18 10.6h-4.9l.4-7.1Z" }],
  users: [
    { d: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" },
    { d: "M3.5 20c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5" },
    { d: "M16 7.5a3 3 0 0 1 0 6M17.5 20c-.2-1.6-.6-2.9-1.3-3.9 2.2.2 3.6 1.7 4.1 3.9" },
  ],
  briefcase: [
    { d: "M4 8.5h16v11H4z" },
    { d: "M9.5 8.5V6.8c0-.7.6-1.3 1.3-1.3h2.4c.7 0 1.3.6 1.3 1.3v1.7" },
    { d: "M4 13h16" },
  ],
  rocket: [
    {
      d: "M13.5 4.5c3-.9 5.3-.6 6-.6.1.7.4 3-.5 6l-4.5 4.5-5-5 4-4.4Z",
    },
    { d: "M9.5 14.5 6.8 17.2M10 19.5 7.5 22M14.5 9.5h.01" },
  ],
  refresh: [
    { d: "M20 12a8 8 0 1 1-2.6-5.9" },
    { d: "M20 4.5V10h-5.4" },
  ],
  lock: [
    { d: "M6.5 10.5h11v9h-11z" },
    { d: "M9 10.5V8a3 3 0 0 1 6 0v2.5" },
  ],
  globe: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "M3.5 12h17" },
    { d: "M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2Z" },
  ],
  chart: [
    { d: "M4 19.5h16" },
    { d: "M7 19.5V12M12 19.5V6.5M17 19.5v-5" },
  ],
  search: [
    { d: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" },
    { d: "m16.2 16.2 4.3 4.3" },
  ],
  calendar: [
    { d: "M4.5 6.5h15v13h-15z" },
    { d: "M4.5 11h15M9 3.5v3.5M15 3.5v3.5" },
  ],
  lightbulb: [
    { d: "M9 17.5h6M10 20.5h4" },
    { d: "M12 3.5a5.5 5.5 0 0 0-3 10.1v3.9h6v-3.9a5.5 5.5 0 0 0-3-10.1Z" },
  ],
  loader: [{ d: "M12 3.5v4M12 16.5v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3.5 12h4M16.5 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" }],
  alert: [
    { d: "M12 9v4.5M12 16.8h.01" },
    { d: "M12 3.5 21 19.5H3L12 3.5Z" },
  ],
  quote: [
    {
      d: "M9.5 6.5C6.9 7.7 5.5 9.7 5.5 12.5v5h5.5v-5.5H8.6c.1-1.6.9-2.7 2.4-3.4l-1.5-2.1ZM19 6.5c-2.6 1.2-4 3.2-4 6v5h5.5v-5.5h-2.4c.1-1.6.9-2.7 2.4-3.4L19 6.5Z",
      fill: true,
    },
  ],
  external: [
    { d: "M14 4.5h5.5V10" },
    { d: "M19.5 4.5 11 13" },
    { d: "M18 14v5.5H4.5V6H10" },
  ],
};

export type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  /** Decorative by default; pass a title to expose it to assistive tech. */
  title?: string;
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
  title,
}: IconProps) {
  const paths = PATHS[name];

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={paths.some((p) => p.fill) ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.fill ? "currentColor" : "none"}
          stroke={path.fill ? "none" : "currentColor"}
        />
      ))}
    </svg>
  );
}

/**
 * The VENTRICON mark: a hexagon "vessel" with a pulse line inside.
 *
 * `gradientId` must be unique per rendered instance — the mark appears in both
 * the header and the footer, and SVG gradient ids are document-global.
 */
export function LogoMark({
  className = "h-9 w-9",
  gradientId = "vc-mark-grad",
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#35d3ea" />
          <stop offset="55%" stopColor="#2f74f5" />
          <stop offset="100%" stopColor="#9b7dff" />
        </linearGradient>
      </defs>
      <path
        d="M20 2.6 34.7 11v18L20 37.4 5.3 29V11L20 2.6Z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.6"
        opacity="0.55"
      />
      <path
        d="M12.5 13.5 20 28l7.5-14.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="vc-pulse-path"
        d="M9 20h4.4l1.8-3.4 2.6 7 1.9-3.6H31"
        fill="none"
        stroke="#7ce9f7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
