// =============================================================================
// VRINDAVAN GROUP — PROJECT DATA
// Populate placeholders with actual data when available
// DO NOT invent prices, RERA numbers, or addresses
// =============================================================================

export interface LocationAdvantage {
  category: string;
  items: { name: string; distance: string }[];
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  index: string; // "01", "02", etc.
  location: string; // e.g., "Indore, Madhya Pradesh"
  area?: string; // Specific area name if known
  status: string; // "Under Development" | "Ready to Move" | "New Launch"
  reraNumber: string; // "" if not available yet
  startingPrice: string; // "" if not available yet
  propertyTypes: string[]; // e.g., ["Residential Plots", "Villas"]
  sizeRange: string; // e.g., "1200–2400 sq.ft." or ""
  possessionDate: string; // "" if not available
  tagline: string;
  description: string;
  highlights: string[];
  mainImage: string; // Path relative to /public
  galleryImages: string[]; // Paths relative to /public or external URLs
  amenities: string[];
  locationAdvantages: LocationAdvantage[];
  isFeatured?: boolean;
  googleMapsUrl?: string;
  googleMapEmbedUrl?: string;
}

export const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/Bbh2KBct435KMRVKA";
export const DEFAULT_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4!2d75.7962981!3d22.6517804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ffa1dcf006ff%3A0x702107c994a34b5b!2sVrindavan%20Grand!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin";

// Unsplash placeholder images (architectural/residential, royalty-free)
const PLACEHOLDER_MAIN =
  "/images/projects/CTA/CTA.png";

const PLACEHOLDER_GALLERY = [
  "/images/projects/CTA/CTA.png",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=75",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=75",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=75",
];

export const projects: Project[] = [
  {
    slug: "vrindavan-grand",
    name: "Vrindavan Grand",
    shortName: "Grand",
    index: "01",
    location: "Rangwasa,Indore, Madhya Pradesh",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "SuryaMandir RRCAT",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "800sqft to 1800sqft",
    possessionDate: "",
    googleMapEmbedUrl: "",
    tagline: "Grand Living, Thoughtfully Designed.",
    description:
      "Vrindavan Grand is a thoughtfully planned residential development by Vrindavan Group, designed to offer families a quality living environment with modern amenities, prime connectivity and the trusted Vrindavan standard of development.",
    highlights: [
      "RERA Approved",
      "Prime Location",
      "Modern Amenities",
      "Trusted Developer",
    ],
    mainImage: "/images/projects/vrindavan-grand/main.jpg",
    galleryImages: [
      "/images/projects/vrindavan-grand/main.jpg",
      "/images/projects/vrindavan-grand/vrindavan-grand-02.jpg",
      "/images/projects/vrindavan-grand/vrindavan-grand-03.jpg",
      "/images/projects/vrindavan-grand/vrindavan-grand-05.jpg",
      "/images/projects/vrindavan-grand/vrindavan-grand-06.jpg",
    ],
    amenities: [
      "Landscaped Garden",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Community Spaces",
      "Temple",
      "Kids Play Area",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School ", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "10 min" },
          { name: "Airport", distance: "20 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "5 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart, Kalyan Mart", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },
  {
    slug: "vrindavan-corridor",
    name: "Vrindavan Corridor",
    shortName: "Corridor",
    index: "02",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/awRRhHUQvSQTYQiLA?g_st=ac",
    area: "Super Corridor",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "1000sqft to 2400sqft",
    possessionDate: "",
    googleMapEmbedUrl: "",
    tagline: "Connected to What Matters.",
    description:
      "Vrindavan Corridor is strategically positioned along key connectivity corridors of Indore, offering residents access to important infrastructure, educational institutions and lifestyle destinations.",
    highlights: [
      "Strategic Connectivity",
      "RERA Approved",
      "Modern Amenities",
      "Investment Potential",
    ],
    mainImage: "/images/projects/vrindavan-corridor/main.jpeg",
    galleryImages: [
      "/images/projects/vrindavan-corridor/main.jpeg",
      "/images/projects/vrindavan-corridor/gallery-1.jpeg",
      "/images/projects/vrindavan-corridor/gallery-2.jpeg",
      "/images/projects/vrindavan-corridor/gallery-3.jpeg",
    ],
    amenities: [
      "Landscaped Garden",
      "Sports Turf",
      "Gym",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "15 min" },
          { name: "Airport", distance: "10 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "15 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "City center", distance: "10 min" }],
      },
    ],
    isFeatured: true,
  },
  {
    slug: "vrindavan-prime",
    name: "Vrindavan Prime",
    shortName: "Prime",
    index: "03",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "Rangawasa, Rau",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "600sqft to 1500sqft",
    possessionDate: "[Possession Date Placeholder]",
    tagline: "Prime Address. Lifetime Value.",
    description:
      "Vrindavan Prime offers families a prime residential address in Indore with a focus on quality infrastructure, thoughtful planning and long-term community value.",
    highlights: [
      "Prime Address",
      "Quality Infrastructure",
      "Modern Lifestyle",
      "Trusted Developer",
    ],
    mainImage: "/images/projects/vrindavan-prime/main.jpeg",
    galleryImages: [
      "/images/projects/vrindavan-prime/main.jpeg",
      "/images/projects/vrindavan-prime/gallery-1.jpeg",
      "/images/projects/vrindavan-prime/gallery-2.jpeg",
      "/images/projects/vrindavan-prime/gallery-3.jpeg",
      "/images/projects/vrindavan-prime/gallery-4.jpeg",
      "/images/projects/vrindavan-prime/gallery-5.jpeg",
      "/images/projects/vrindavan-prime/gallery-6.jpeg",
      "/images/projects/vrindavan-prime/gallery-7.jpeg",
    ],
    amenities: [
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Temple",
      "Community Spaces",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School ", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "15 min" },
          { name: "Airport", distance: "10 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Dmart,Kalyan Mart", distance: "5 min" }],
      },
    ],
    isFeatured: false,
  },
  {
    slug: "vrindavan-premium",
    name: "Vrindavan Premium",
    shortName: "Premium",
    index: "04",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "Rangawasa,Rau",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "800sqft to 1800sqft",
    possessionDate: "[Possession Date Placeholder]",
    tagline: "Prime Location. Lifetime Value.",
    description:
      "Vrindavan Premium is designed for families seeking an elevated residential lifestyle in Indore — combining premium planning, modern amenities and the trusted Vrindavan community experience.",
    highlights: [
      "Premium Lifestyle",
      "RERA Approved",
      "Quality Amenities",
      "Growing Community",
    ],
    mainImage: "/images/projects/vrindavan-premium/gallery-1.jpeg",
    galleryImages: [
      "/images/projects/vrindavan-premium/gallery-1.jpeg",
      "/images/projects/vrindavan-premium/main.jpeg",

    ],
    amenities: [
      "Gym",
      "Sports Turf",
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School ", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "[20 min]" },
          { name: "Airport", distance: "[15 min]" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "[10 min]" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Dmart,kalyan Mart", distance: "[5 min]" }],
      },
    ],
    isFeatured: false,
  },
  {
    slug: "vrindavan-shaiputri-pride",
    name: "Vrindavan Shaiputri Pride",
    shortName: "Shaiputri Pride",
    index: "05",
    location: "Rangwas,Rau,Indore",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "Rangwasa,Rau",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["FLATS", "Duplex", "HOMES"],
    sizeRange: "600sqft to 1500sqft",
    possessionDate: "[Possession Date Placeholder]",
    tagline: "Pride in Every Home.",
    description:
      "Vrindavan Shaiputri Pride is a community development that reflects the values of pride, togetherness and quality living — a place where families can truly belong.",
    highlights: [
      "Community Living",
      "RERA Approved",
      "Modern Infrastructure",
      "Trusted Developer",
    ],
    mainImage: "/images/projects/vrindavan-shaiputri-pride/main.mp4",
    galleryImages: [
      "/images/projects/vrindavan-shaiputri-pride/main.mp4",
      "/images/projects/vrindavan-shaiputri-pride/gallery-1.jpeg",
      "/images/projects/vrindavan-shaiputri-pride/gallery-2.jpeg",
      "/images/projects/vrindavan-shaiputri-pride/gallery-3.jpeg",
      "/images/projects/vrindavan-shaiputri-pride/gallery-4.jpeg",
      "/images/projects/vrindavan-shaiputri-pride/gallery-5.jpeg",
      "/images/projects/vrindavan-shaiputri-pride/gallery-6.jpeg",

    ],
    amenities: [
      "Temple",
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Community Spaces",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School", distance: "[5   min]" },
          { name: "College ", distance: "[10 min]" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "20 min" },
          { name: "Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "[10 min]" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Dmart,kalyan Mart", distance: "[5 min]" }],
      },
    ],
    isFeatured: false,
  },
  {
    slug: "vrindavan-Pride",
    name: "Vrindavan Pride",
    shortName: "Pride",
    index: "06",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "Ujjain Road",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "600sqft to 1500sqft",
    possessionDate: "Immediate",
    tagline: "Where Green Meets Home.",
    description:
      "Vrindavan Park brings the refreshing feeling of green living to Indore — a development thoughtfully designed around landscaped spaces and active lifestyle amenities.",
    highlights: [
      "Green Living",
      "Landscaped Spaces",
      "Modern Amenities",
      "RERA Approved",
    ],
    mainImage: "/images/projects/vrindavan-pride/main2.jpg",
    galleryImages: [
      "/images/projects/vrindavan-pride/main2.jpg",
      "/images/projects/vrindavan-pride/gallery-1.jpg",
      "/images/projects/vrindavan-pride/gallery-2.jpg",
      "/images/projects/vrindavan-pride/gallery-3.jpg",
    ],
    amenities: [
      "Landscaped Garden",
      "Sports Turf",
      "Kids Play Area",
      "Gym",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "20 min" },
          { name: "Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Dmart", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },
  {
    slug: "vrindavan-park",
    name: "Vrindavan Park",
    shortName: "Park",
    index: "07",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: DEFAULT_MAPS_URL,
    area: "Bajranag Paliya Road",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["PLOTS"],
    sizeRange: "600sqft to 1500sqft",
    possessionDate: "Immediate",
    tagline: "Where Every Family Finds Home.",
    description:
      "Vrindavan Park is a residential development crafted for families looking to settle in Indore with confidence — offering the quality, transparency and community trust that Vrindavan Group is known for.",
    highlights: [
      "Family-Focused",
      "RERA Approved",
      "Quality Infrastructure",
      "Trusted Developer",
    ],
    mainImage: "/images/projects/vrindavan-park/main.jpg",
    galleryImages: [
      "/images/projects/vrindavan-park/main.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-02.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-03.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-04.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-05.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-06.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-07.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-08.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-09.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-10.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-11.jpg",
    ],
    amenities: [
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
      "Temple",
      "Community Spaces",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "School", distance: "5 min" },
          { name: "College ", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "20 min" },
          { name: "Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Dmart", distance: "5 min" }],
      },
    ],
    isFeatured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.isFeatured);
}
