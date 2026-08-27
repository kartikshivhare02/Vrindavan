import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import PageLoader from "@/components/ui/PageLoader";

const playfair = localFont({
  src: [
    { path: "../public/fonts/PlayfairDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/PlayfairDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/PlayfairDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/PlayfairDisplay-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: `%s | Vrindavan Group Indore`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  metadataBase: new URL(siteConfig.seo.siteUrl),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.companyName,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Vrindavan Group — Premium Real Estate & Residential Projects in Indore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Comprehensive JSON-LD Structured Data Schema for Local SEO & Real Estate
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${siteConfig.seo.siteUrl}#organization`,
      name: siteConfig.companyName,
      url: siteConfig.seo.siteUrl,
      logo: `${siteConfig.seo.siteUrl}/images/logo.png`,
      image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
      description: siteConfig.seo.description,
      telephone: siteConfig.channelPartner.phone,
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.state,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      areaServed: {
        "@type": "City",
        name: "Indore",
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.youtube,
        siteConfig.social.linkedin,
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.seo.siteUrl}#channelpartner`,
      name: siteConfig.channelPartner.name,
      jobTitle: siteConfig.channelPartner.title,
      telephone: siteConfig.channelPartner.phone,
      worksFor: {
        "@id": `${siteConfig.seo.siteUrl}#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.seo.siteUrl}#website`,
      url: siteConfig.seo.siteUrl,
      name: siteConfig.companyName,
      publisher: {
        "@id": `${siteConfig.seo.siteUrl}#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PageLoader />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
