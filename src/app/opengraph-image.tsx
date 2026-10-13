import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social share card, generated at build time (1200×630).
 *
 * Rendered with inline styles only — Satori (the renderer behind ImageResponse)
 * supports a CSS subset, so Tailwind classes are not available here.
 */
export const alt = `${site.name} — ${site.promise}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const services = [
  "Branding & Design",
  "Website & E-commerce",
  "Digital Marketing",
  "AI & Automation",
  "Business Systems",
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 74px",
          background:
            "linear-gradient(145deg, #04060c 0%, #0a101c 45%, #17233b 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient accent glows */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(47,116,245,0.35)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(124,83,245,0.32)",
            filter: "blur(90px)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                border: "1.5px solid rgba(139,185,255,0.45)",
                background: "rgba(10,16,28,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                color: "#7ce9f7",
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 34,
                  letterSpacing: 7,
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                {site.name}
              </div>
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: 4,
                  color: "#8bb9ff",
                  marginTop: 6,
                }}
              >
                BUSINESS SOLUTIONS &amp; TECHNOLOGY
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 15,
              letterSpacing: 2,
              color: "#9fb3cc",
              border: "1px solid rgba(139,185,255,0.25)",
              borderRadius: 999,
              padding: "10px 20px",
            }}
          >
            ventricon.com
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
              lineHeight: 1.02,
            }}
          >
            BUILD. GROW.
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 1.02,
              backgroundImage:
                "linear-gradient(100deg, #7ce9f7 0%, #5b95fb 45%, #c1b0ff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            TRANSFORM.
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              color: "#a9b8cc",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Business solutions powered by strategy, creativity &amp; technology.
          </div>
        </div>

        {/* Service chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {services.map((service) => (
            <div
              key={service}
              style={{
                fontSize: 17,
                color: "#c7d2e0",
                border: "1px solid rgba(139,185,255,0.22)",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 999,
                padding: "11px 20px",
              }}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
