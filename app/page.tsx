import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ScrollVideoHero from "@/components/hero/ScrollVideoHero";
import About from "@/components/home/About";
import WhyVrindavan from "@/components/home/WhyVrindavan";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import LifestyleSection from "@/components/home/LifestyleSection";
import LocationSection from "@/components/home/LocationSection";
import TrustSection from "@/components/home/TrustSection";
import Directors from "@/components/home/Directors";
import ChannelPartner from "@/components/home/ChannelPartner";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.companyName,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: "Vrindavan Group Real Estate Indore" }],
    locale: "en_IN",
    type: "website",
  },
};

// FAQ Schema for rich search results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are Vrindavan Group projects in Indore RERA approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all active residential projects developed by Vrindavan Group in Indore are RERA approved with transparent documentation.",
      },
    },
    {
      "@type": "Question",
      name: "Where are Vrindavan Group residential plots located in Indore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vrindavan Group projects are located in prime connectivity hubs across Indore including Super Corridor, Rau, SuryaMandir RRCAT, and AB Road.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are provided in Vrindavan Group townships?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Townships feature modern infrastructure including landscaped gardens, sports turfs, temples, internal wide roads, street lighting, security, and underground utility water infrastructure.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* 1. CINEMATIC SCROLL-CONTROLLED HERO */}
      <ScrollVideoHero />

      {/* 2. ABOUT VRINDAVAN GROUP */}
      <About />

      {/* 3. WHY VRINDAVAN */}
      <WhyVrindavan />

      {/* 4. PROJECTS SHOWCASE */}
      <ProjectsShowcase />

      {/* 5. LIFESTYLE / FACILITIES */}
      <LifestyleSection />

      {/* 6. PRIME LOCATION / CONNECTIVITY */}
      <LocationSection />

      {/* 7. RERA / TRUST (Our Commitment) */}
      <TrustSection />

      {/* 8. DIRECTORS & LEADERSHIP */}
      <Directors />

      {/* 9. CHANNEL PARTNER */}
      <ChannelPartner />

      {/* 10. TESTIMONIALS */}
      <Testimonials />

      {/* 11. LEAD GENERATION FORM */}
      <ContactSection />

      {/* 12. CINEMATIC FINAL CTA */}
      <FinalCTA />
    </>
  );
}
