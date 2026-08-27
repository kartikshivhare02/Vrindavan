import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Real Estate Projects in Indore | Residential Plots & Townships",
  description:
    "Explore all premium residential real estate projects by Vrindavan Group in Indore including Vrindavan Grand, Vrindavan Corridor, Vrindavan Prime, Vrindavan Premium, and Vrindavan Shailputri Pride.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/projects`,
  },
  openGraph: {
    title: "Real Estate Projects in Indore | Vrindavan Group",
    description:
      "Explore RERA-approved residential plots and luxury township developments across Indore's top growth corridors.",
    url: `${siteConfig.seo.siteUrl}/projects`,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: "Vrindavan Group Projects Indore" }],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
