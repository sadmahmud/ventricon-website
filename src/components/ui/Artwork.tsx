import { cn } from "@/lib/utils";
import type { Accent, ServiceId } from "@/lib/types";

/**
 * Deterministic, dependency-free artwork.
 *
 * Every project card and service hero gets a generated gradient composition
 * seeded by its accent + variant, so the portfolio looks deliberate without a
 * single stock photograph (and therefore without a single layout shift,
 * licence cost or CDN request).
 */

const accentStops: Record<Accent, [string, string, string]> = {
  brand: ["#1a56db", "#2f74f5", "#8bb9ff"],
  aqua: ["#0b7f92", "#12b5cf", "#7ce9f7"],
  grape: ["#5b32c9", "#7c53f5", "#c1b0ff"],
  pulse: ["#0f7a55", "#16b97a", "#7ce9b4"],
  amber: ["#a8641a", "#f5a524", "#ffd27a"],
};

const serviceAccent: Record<ServiceId, Accent> = {
  "branding-design": "grape",
  "website-ecommerce": "brand",
  "digital-marketing": "amber",
  "ai-automation": "aqua",
  "business-systems": "pulse",
};

export function serviceArtworkAccent(service: ServiceId): Accent {
  return serviceAccent[service];
}

/** Abstract layered artwork used as card / hero visuals. */
export function Artwork({
  accent = "brand",
  variant = 0,
  className,
  id,
  rounded = "rounded-2xl",
}: {
  accent?: Accent;
  variant?: number;
  className?: string;
  id: string;
  rounded?: string;
}) {
  const [dark, mid, light] = accentStops[accent];
  const gradientId = `${id}-grad`;
  const blurId = `${id}-blur`;

  // Deterministic per-variant geometry.
  const v = variant % 6;
  const wave = [
    "M0 132c48-34 86 22 140-8s96-58 160-24 100 76 160 44V240H0Z",
    "M0 96c62 18 96 62 160 44s104-72 168-56 92 74 152 62V240H0Z",
    "M0 150c56-42 108 12 168-6s92-64 152-46 88 70 148 50V240H0Z",
    "M0 110c54 30 100-16 154 4s102 66 166 44 96-58 148-32V240H0Z",
    "M0 140c60-26 100 30 158 10s98-70 162-50 92 66 152 46V240H0Z",
    "M0 100c44 40 98 4 152 24s106 62 168 40 94-56 148-28V240H0Z",
  ][v];

  const hexes = [
    "M118 26l42 24v48l-42 24-42-24V50z",
    "M62 34l36 21v42l-36 21-36-21V55z",
    "M182 52l30 17v35l-30 17-30-17V69z",
    "M96 20l34 20v40l-34 20-34-20V40z",
    "M150 40l38 22v44l-38 22-38-22V62z",
    "M78 44l30 17v35l-30 17-30-17V61z",
  ][v];

  return (
    <svg
      viewBox="0 0 660 240"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", rounded, className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dark} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
        <filter id={blurId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="42" />
        </filter>
      </defs>

      <rect width="660" height="240" fill="#070b14" />
      <g filter={`url(#${blurId})`} opacity="0.6">
        <circle cx="150" cy="70" r="90" fill={mid} />
        <circle cx="520" cy="180" r="110" fill={dark} />
      </g>

      <path d={wave} fill={`url(#${gradientId})`} opacity="0.82" />
      <path
        d={hexes}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="1.4"
      />
      <path
        d="M0 196h660"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1"
        strokeDasharray="6 8"
      />
    </svg>
  );
}

/** Compact mark used as the visual for service cards. */
export function ServiceGlyph({
  accent = "brand",
  className,
  id,
}: {
  accent?: Accent;
  className?: string;
  id: string;
}) {
  const [, mid, light] = accentStops[accent];
  const gradientId = `${id}-glyph`;

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
      </defs>
      <path
        d="M60 8 106 36v48L60 112 14 84V36z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M60 26 90 44v36L60 98 30 80V44z"
        fill={`url(#${gradientId})`}
        opacity="0.16"
      />
      <path
        d="M60 30v64M32 46l56 32M88 46 32 78"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        opacity="0.65"
      />
    </svg>
  );
}

/**
 * Abstract "process" diagram: five connected stages with a live pulse path.
 * Pure SVG + CSS animation, so it costs nothing at runtime.
 */
export function ProcessDiagram({ className }: { className?: string }) {
  const stops = [
    { x: 60, label: "01" },
    { x: 200, label: "02" },
    { x: 340, label: "03" },
    { x: 480, label: "04" },
    { x: 620, label: "05" },
  ];

  return (
    <svg
      viewBox="0 0 680 160"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="VENTRICON process: Discover, Strategize, Build, Launch, Grow."
    >
      <defs>
        <linearGradient id="vc-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#35d3ea" />
          <stop offset="50%" stopColor="#2f74f5" />
          <stop offset="100%" stopColor="#9b7dff" />
        </linearGradient>
      </defs>

      <line
        x1="60"
        y1="80"
        x2="620"
        y2="80"
        stroke="rgba(139,185,255,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <path
        className="vc-pulse-path"
        d="M60 80h140l30-16 34 34 32-40 30 22h234"
        fill="none"
        stroke="url(#vc-line)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {stops.map((stop) => (
        <g key={stop.label}>
          <circle
            cx={stop.x}
            cy="80"
            r="18"
            fill="#070b14"
            stroke="rgba(139,185,255,0.35)"
            strokeWidth="1.2"
          />
          <text
            x={stop.x}
            y="85"
            textAnchor="middle"
            fill="#b9d5ff"
            fontSize="13"
            fontFamily="ui-monospace, monospace"
          >
            {stop.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
