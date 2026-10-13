import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.category}`,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#04060c",
    theme_color: "#04060c",
    lang: "en",
    categories: ["business", "productivity", "marketing"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
