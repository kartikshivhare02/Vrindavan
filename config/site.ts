// =============================================================================
// VRINDAVAN GROUP — SITE CONFIGURATION
// Centralized configuration for business, contact, location & SEO metadata
// =============================================================================

export const siteConfig = {
  companyName: "Vrindavan Group",
  tagline: "Building Landmarks. Creating Communities.",
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",
  postalCode: "452001",
  experience: "20+",
  satisfiedFamilies: "2000+",

  // Geo Coordinates for Local SEO (Indore, MP)
  geo: {
    latitude: "22.7196",
    longitude: "75.8577",
  },

  // ── Channel Partner & Official Contact ──────────────────────────────────────
  channelPartner: {
    name: "Hardik Shivhare & Team",
    title: "Property & Investment Consultant",
    phone: "+918319590034",
    whatsapp: "+918319590034",
    email: "contact@vrindavangroup.com", // [NEEDS CLIENT INPUT] if separate official email exists
    whatsappMessage:
      "Hello Hardik, I am interested in knowing more about Vrindavan Group residential projects in Indore.",
  },

  // ── Social Media Handles ───────────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/vrindavangroupindore", // [NEEDS CLIENT INPUT] update with official links
    facebook: "https://facebook.com/vrindavangroupindore",
    youtube: "https://youtube.com/@vrindavangroupindore",
    linkedin: "https://linkedin.com/company/vrindavangroupindore",
  },

  // ── SEO & Meta Strategy ────────────────────────────────────────────────────
  seo: {
    title: "Vrindavan Group | Premium Residential Plots & Property in Indore",
    description:
      "Explore RERA-approved residential plots and luxury properties in Indore by Vrindavan Group. Strategic locations along Super Corridor, Rau, and AB Road with modern amenities.",
    keywords:
      "Vrindavan Group, real estate Indore, residential plots in Indore, property in Indore, Super Corridor plots Indore, RERA approved plots Indore, buy plot in Indore, Rau Indore property, Madhya Pradesh real estate",
    ogImage: "/images/og-image.jpg",
    siteUrl: "https://vrindavangroup.com", // [NEEDS CLIENT INPUT] update if domain changes
  },

  // ── Navigation Structure ───────────────────────────────────────────────────
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Projects", href: "/projects" },
    { label: "Amenities", href: "/#lifestyle" },
    { label: "Why Vrindavan", href: "/#why-vrindavan" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
