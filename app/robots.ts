import type { MetadataRoute } from "next";
import { crawlHost } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${crawlHost()}/sitemap.xml`,
  };
}
