// =============================================================================
// VRINDAVAN GROUP — PROJECT DATA
// Priority order:
// 1. Grand
// 2. Corridor
// 3. Prime
// 4. Park
// 5. Pride
// 6. Platinum
// 7. Premium
// 8. Shailputri Pride
// 9. Shailputri Sky
// 10. Vrindavan Heritage
// 11. Vrindavan Green
// 12. Vrindavan Paradise
// 13. Vrindavan Exotica
// 14. Vrindavan Residency
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
  propertyTypes: string[] | string; // e.g., ["Residential Plots", "Villas"]
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
  coordinates?: { lat: number; lng: number };
}

export const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/Bbh2KBct435KMRVKA";
export const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4!2d75.7962981!3d22.6517804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ffa1dcf006ff%3A0x702107c994a34b5b!2sVrindavan%20Grand!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin";

export const projects: Project[] = [
  // ── 01. Vrindavan Grand ────────────────────────────────────────────────────
  {
    slug: "vrindavan-grand",
    name: "Vrindavan Grand",
    shortName: "Grand",
    index: "01",
    location: "Rangwasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/Bbh2KBct435KMRVKA",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4!2d75.7962981!3d22.6517804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ffa1dcf006ff%3A0x702107c994a34b5b!2sVrindavan%20Grand!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin",
    coordinates: { lat: 22.6517804, lng: 75.7962981 },
    area: "Surya Mandir, RRCAT Road",
    status: "Ready to Move",
    reraNumber: "P-IND-24-4671",
    startingPrice: "6100/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "1000 sq.ft. to 1800 sq.ft.",
    possessionDate: "Ready to Move",
    tagline: "Grand Living, Thoughtfully Designed.",
    description:
      "Vrindavan Grand is a flagship residential development by Vrindavan Group, designed to offer families a premium living environment with modern amenities, prime connectivity, lush landscaped gardens, and the trusted Vrindavan benchmark of excellence.",
    highlights: [
      "RERA Approved Planning",
      "Prime Surya Mandir Location",
      "Modern Community Amenities",
      "16+ Years Trusted Developer",
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
          { name: "St.Nobert,Golden International", distance: "5 min" },
          { name: "IPS,IIPS,Medicaps", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "10 min" },
          { name: "Indore Airport", distance: "20 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Multi-Specialty Hospital", distance: "5 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Kalyan Mart", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 02. Vrindavan Corridor ────────────────────────────────────────────────
  {
    slug: "vrindavan-corridor",
    name: "Vrindavan Corridor",
    shortName: "Corridor",
    index: "02",
    location: "Puwarda Junarda,Super Corridor, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/vb9THFLHCVX6wHHG8?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=Vrindavan+corridor+Super+Corridor+Indore&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.7562, lng: 75.8055 },
    area: "Super Corridor",
    status: "Under Development",
    reraNumber: "P-IND-25-6000",
    startingPrice: "4000/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "800,1000,1200 sq.ft.",
    possessionDate: "2027",
    tagline: "Connected to What Matters.",
    description:
      "Vrindavan Corridor is strategically positioned along key growth corridors of Indore, offering residents seamless access to IT hubs, premium educational institutes, airport connectivity, and upscale lifestyle destinations.",
    highlights: [
      "Strategic Super Corridor Location",
      "RERA Approved",
      "Modern Sports & Leisure Amenities",
      "High Appreciation Potential",
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
          { name: "Symbiosis & NMIMS", distance: "5 min" },
          { name: "VIBGYOR", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Indore Airport", distance: "10 min" },
          { name: "Metro Station", distance: "5 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Aurobindo Hospital", distance: "12 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "City Center & Mall", distance: "10 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 03. Vrindavan Prime ───────────────────────────────────────────────────
  {
    slug: "vrindavan-prime",
    name: "Vrindavan Prime",
    shortName: "Prime",
    index: "03",
    location: "Rangwasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/to5zCTgDVGCXMmLFA?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6468515,75.7994956&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6468515, lng: 75.7994956 },
    area: "Rangwasa, Rau",
    status: "Ready to Move",
    reraNumber: "P-IND-23-4240",
    startingPrice: "4800/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "800,1000 sq.ft.",
    possessionDate: "Ready To Move",
    tagline: "Prime Address. Lifetime Value.",
    description:
      "Vrindavan Prime offers families an enviable residential address in the flourishing Rau-Rangwasa belt of Indore. Built with high-spec paved roads, continuous utilities, children's play parks, and dedicated security.",
    highlights: [
      "Prime Suburban Address",
      "Quality Infrastructure",
      "Active Gated Community",
      "16+ Years Trusted Developer",
    ],
    mainImage: "/images/projects/vrindavan-prime/main.png",
    galleryImages: [
      "/images/projects/vrindavan-prime/main.png",
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
          { name: "IPS Academy & Emerald Heights", distance: "5 min" },
          { name: "IIM,IIPS,IPS", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Rau Railway Station", distance: "5 min" },
          { name: "Indore Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Choithram Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Local Markets", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 04. Vrindavan Park ────────────────────────────────────────────────────
  {
    slug: "vrindavan-park",
    name: "Vrindavan Park",
    shortName: "Park",
    index: "04",
    location: "Bajrang Palia Road, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/tBxq6oaHcPFdV1ad8?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.8485701,75.8703013&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.8485701, lng: 75.8703013 },
    area: "Bajrang Palia Road",
    status: "Under Development",
    reraNumber: "",
    startingPrice: "3500/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "600,1000 sq.ft.",
    possessionDate: "Under Development",
    tagline: "Where Every Family Finds Home.",
    description:
      "Vrindavan Park is a peaceful residential development crafted for families looking to settle in Indore with absolute confidence — offering expansive greenery, children's recreation, and transparent clear-title ownership.",
    highlights: [
      "Serene Nature Living",
      "RERA Approved Layout",
      "Family-Centric Infrastructure",
      "Immediate Possession Available",
    ],
    mainImage: "/images/projects/vrindavan-park/main.jpg",
    galleryImages: [
      "/images/projects/vrindavan-park/vrindavan-park-01.jpg",
      "/images/projects/vrindavan-park/vrindavan-park-02.jpg",
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
          { name: "Prominent Schools", distance: "5 min" },
          { name: "Engineering Colleges", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "20 min" },
          { name: "Indore Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "District Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Shopping Center", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 05. Vrindavan Pride ───────────────────────────────────────────────────
  {
    slug: "vrindavan-pride",
    name: "Vrindavan Pride",
    shortName: "Pride",
    index: "05",
    location: "Bajrang Paliya, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/i5vQ32xTccx6SbjH7?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.8497584,75.8739618&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.8497584, lng: 75.8739618 },
    area: "BajRang Paliya",
    status: "Under Development",
    reraNumber: "Upcoming",
    startingPrice: "3200/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "600,1000 sq.ft.",
    possessionDate: "Upcoming",
    tagline: "Pride in Every Square Foot.",
    description:
      "Vrindavan Pride combines urban convenience with healthy, active living. Located along the prominent Bajrang Paliya corridor, it offers lush landscaped parks, sports facilities, a private temple, and wide concrete roads.",
    highlights: [
      "High Growth Corridor",
      "Modern Gym & Sports Turf",
      "Gated Security & CCTV",
      "RERA Approved Layout",
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
          { name: "Leading Schools", distance: "5 min" },
          { name: "Higher Colleges", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Indore Railway Station", distance: "20 min" },
          { name: "Indore Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Multi-Specialty Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Lifestyle Center", distance: "5 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 06. Vrindavan Platinum ────────────────────────────────────────────────
  {
    slug: "vrindavan-platinum",
    name: "Vrindavan Platinum",
    shortName: "Platinum",
    index: "06",
    location: "Kewati, AB Bypass Road, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/D8wRdpZ8FoVvQJhq7?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6072203,75.7700735&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6072203, lng: 75.7700735 },
    area: "AB Bypass Road",
    status: "Under Development",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["Residential Plots"],
    sizeRange: "600,800,1000 sq.ft.",
    possessionDate: "Upcoming 2028",
    tagline: "Live Life in its Best Form.",
    description:
      "Vrindavan Platinum is an exclusive gated township designed for luxury and grand community lifestyle. Featuring sprawling residential plots, modern clubhouse amenities, tree-lined boulevards, and supreme connectivity to Indore's bypass.",
    highlights: [
      "Elite Gated Community",
      "Prime Bypass Connectivity",
      "Clubhouse & Fitness Amenities",
      "High Return Investment",
    ],
    mainImage: "/images/projects/vrindavan-platinum/main.png",
    galleryImages: [],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "Delhi Public School & Choithram", distance: "8 min" },
          { name: "Prestige Institute", distance: "12 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Bypass Junction", distance: "3 min" },
          { name: "Indore Airport", distance: "25 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Medanta & Apollo Hospital", distance: "15 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Phoenix Citadel Mall", distance: "12 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 07. Vrindavan Premium ─────────────────────────────────────────────────
  {
    slug: "vrindavan-premium",
    name: "Vrindavan Premium",
    shortName: "Premium",
    index: "07",
    location: "Rangwasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/wDbWdnVKgnMKBn5e6?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6505151,75.7971725&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6505151, lng: 75.7971725 },
    area: "Rangwasa, Rau",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["Residential Plots"],
    sizeRange: "1000 sq.ft.",
    possessionDate: "READY TO MOVE",
    tagline: "Elevated Living. Lifetime Value.",
    description:
      "Vrindavan Premium is crafted for families seeking an elevated residential lifestyle in Indore — combining premium plot sizing, sports turf, fitness center, landscaped gardens, and a welcoming neighborhood atmosphere.",
    highlights: [
      "Premium Plot Dimensions",
      "RERA Approved Development",
      "Sports Turf & Fitness Gym",
      "Close to Top Schools & Markets",
    ],
    mainImage: "/images/projects/vrindavan-premium/gallery-1.jpeg",
    galleryImages: [
      "/images/projects/vrindavan-premium/gallery-1.jpeg",
      "/images/projects/vrindavan-premium/main.jpeg",
      "/images/projects/vrindavan-prime/gallery-4.jpeg",
      "/images/projects/vrindavan-prime/gallery-5.jpeg",
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
          { name: "ST.NOBERT,GOLDEN INTERNATIONAL", distance: "5 min" },
          { name: "MEDICAPS,IIPS,IPS", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Rau Railway Station", distance: "5 min" },
          { name: "Indore Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Choithram Netralaya", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Local Supermarkets", distance: "5 min" }],
      },
    ],
    isFeatured: false,
  },

  // ── 08. Shailputri Pride ──────────────────────────────────────────────────
  {
    slug: "vrindavan-shaiputri-pride",
    name: "Shailputri Pride",
    shortName: "Shailputri Pride",
    index: "08",
    location: "Rangwasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/Bbh2KBct435KMRVKA",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4!2d75.7962981!3d22.6517804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ffa1dcf006ff%3A0x702107c994a34b5b!2sVrindavan%20Grand!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin",
    coordinates: { lat: 22.6517804, lng: 75.7962981 },
    area: "Rangwasa, Rau",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["Flats", "Duplex", "Homes"],
    sizeRange: "650 sq.ft 1BHK, 1165,1140 sq.ft. 2BHK",
    possessionDate: "Immediate Possession",
    tagline: "Pride in Every Home.",
    description:
      "Shailputri Pride is an integrated residential community offering well-ventilated flats, spacious duplexes, and independent homes designed with devotion to quality, comfort, and enduring community bonds.",
    highlights: [
      "Multi-Unit Living (Flats & Duplex)",
      "Ready to Move",
      "Gated Security & Temple",
      "Excellent Rau-Rangwasa Connectivity",
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
          { name: "ST.NOBERT,GOLDEN INTERNATIONAL", distance: "5 min" },
          { name: "IIM,IDLIYC,IPS", distance: "10 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Railway Station", distance: "20 min" },
          { name: "Indore Airport", distance: "15 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Hospital & Clinics", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Daily Needs", distance: "5 min" }],
      },
    ],
    isFeatured: false,
  },

  // ── 09. Shailputri Sky ────────────────────────────────────────────────────
  {
    slug: "shailputri-sky",
    name: "Shailputri Sky",
    shortName: "Shailputri Sky",
    index: "09",
    location: "BIJALPUR, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/TBuK6R3N2H1breyr8?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6685276,75.8458717&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6685276, lng: 75.8458717 },
    area: "BIJALPUR, RAU, INDORE",
    status: "Under Development",
    reraNumber: "",
    startingPrice: "5200/-",
    propertyTypes: ["Premium Apartments", "Penthouses"],
    sizeRange: "2, 3, 4 BHK",
    possessionDate: "Possession in 2027",
    tagline: "Elevate Your Lifestyle Above the Skyline.",
    description:
      "Shailputri Sky represents high-rise luxury and modern architectural elegance in Indore. Offering panoramic city views, expansive private balconies, infinity deck amenities, and curated modern wellness facilities.",
    highlights: [
      "High-Rise Luxury Living",
      "Sky Deck & Panoramic Views",
      "Prime Bijalpur-Rau Location",
      "World-Class Amenities",
    ],
    mainImage: "/images/projects/shailputri-sky/main.jpeg",
    galleryImages: [
      "/images/projects/shailputri-sky/main.jpeg",
      "/images/projects/shailputri-sky/gallery-1.jpeg",
      "/images/projects/shailputri-sky/gallery-2.jpeg",
      "/images/projects/shailputri-sky/gallery-3.jpeg",
    ],
    amenities: [
      "Sky Lounge",
      "Gym",
      "Swimming Pool",
      "Landscaped Garden",
      "Kids Play Area",
      "CCTV Surveillance",
      "Covered Parking",
      "High-Speed Elevators",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "Medi-Caps University", distance: "6 min" },
          { name: "IPS Academy", distance: "8 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "AB Road Junction", distance: "4 min" },
          { name: "Indore Airport", distance: "18 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Choithram Hospital", distance: "12 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Treasure Island Mall / Rau Market", distance: "10 min" }],
      },
    ],
    isFeatured: false,
  },

  // ── 10. Vrindavan Heritage ────────────────────────────────────────────────
  {
    slug: "vrindavan-heritage",
    name: "Vrindavan Heritage",
    shortName: "Heritage",
    index: "10",
    location: "Rangawasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/qVJanC7hMvdE2Wu8A?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6489786,75.7803343&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6489786, lng: 75.7803343 },
    area: "Rangawasa, Rau, Indore",
    status: "Under Development",
    reraNumber: "",
    startingPrice: "3000/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "1200 sq.ft. to 3000 sq.ft.",
    possessionDate: "Immediate Possession",
    tagline: "Timeless Architecture, Modern Comfort.",
    description:
      "Vrindavan Heritage brings timeless architectural grace and regal serenity together. Nestled in lush surroundings in the Rau-Rangwasa belt with wide paved avenues, grand entrance gates, private community temple, and serene neighborhood vibes.",
    highlights: [
      "Grand Heritage Architecture Theme",
      "Spacious Plot Sizing",
      "Rau Educational & Tech Hub",
      "Ready Infrastructure & Clear Titles",
    ],
    mainImage: "/images/projects/vrindavan-heritage/main.png",
    galleryImages: [
      "/images/projects/vrindavan-heritage/main.png",
      "/images/projects/vrindavan-heritage/gallery-1.png",
    ],
    amenities: [
      "Grand Entrance Gate",
      "Temple",
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Water Infrastructure",
      "Security",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "ST.NOBERT", distance: "5 min" },
          { name: "IIPS,IPS,MEDICAPS", distance: "8 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Indore Junction Station", distance: "15 min" },
          { name: "Ring Road", distance: "7 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Apple Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart", distance: "8 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 11. Vrindavan Green ───────────────────────────────────────────────────
  {
    slug: "vrindavan-green",
    name: "Vrindavan Green",
    shortName: "Green",
    index: "11",
    location: "Rangwasa, Rau, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/LCJCp1DncUDLV2G56?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6468515,75.7994956&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6468515, lng: 75.7994956 },
    area: "RAU INDORE",
    status: "Ready to Move",
    reraNumber: "",
    startingPrice: "",
    propertyTypes: ["Eco Plots", "Residential Plots"],
    sizeRange: "600,800,1000 sq.ft.",
    possessionDate: "Ready To Move",
    tagline: "Pure Nature. Pure Harmony.",
    description:
      "Vrindavan Green is an eco-conscious residential development immersed in pristine natural landscapes, oxygen-rich tree-lined boulevards, herbal gardens, and modern sustainable township infrastructure.",
    highlights: [
      "Eco-Friendly Green Township",
      "Lush Landscaped Boulevards",
      "High Growth Corridor",
      "100% Clear Title Documentation",
    ],
    mainImage: "/images/projects/vrindavan-green/main.jpeg",
    galleryImages: [
      "/images/projects/vrindavan-green/main.jpeg",
      "/images/projects/vrindavan-green/gallery-1.jpeg",
      "/images/projects/vrindavan-green/gallery-2.jpeg",
      "/images/projects/vrindavan-green/gallery-3.jpeg",
      "/images/projects/vrindavan-green/gallery-5.jpeg",
    ],
    amenities: [
      "Botanical & Herbal Garden",
      "Jogging & Cycling Track",
      "Kids Play Area",
      "Internal Roads",
      "Solar Street Lighting",
      "Water Harvesting & Supply",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "St.Nobert,Golden international school", distance: "7 min" },
          { name: "IIPS,IPS,Medicaps University", distance: "12 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Ujjain 4-Lane Highway / AB Road", distance: "2 min" },
          { name: "Indore Airport", distance: "20 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Super Specialty Hospital", distance: "12 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "DMart & Shopping Zone", distance: "6 min" }],
      },
    ],
    isFeatured: false,
  },

  // ── 12. Vrindavan Paradise ────────────────────────────────────────────────
  {
    slug: "vrindavan-paradise",
    name: "Vrindavan Paradise",
    shortName: "Paradise",
    index: "12",
    location: "Talawali-Chandraghata Road, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.google.com/?q=Talawali+Chandraghata+Road+Indore",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=Talawali+Chandraghata+Road+Indore+Madhya+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.795, lng: 75.895 },
    area: "Talawali-Chandraghata Road",
    status: "Under Development",
    reraNumber: "Upcoming",
    startingPrice: "",
    propertyTypes: ["Residential Plots"],
    sizeRange: "1000,1200 sq.ft.",
    possessionDate: "Upcoming 2028",
    tagline: "Live Life in its Best Form.",
    description:
      "Vrindavan Paradise is an exclusive gated township on Talawali-Chandraghata Road designed for elevated community living, featuring well-planned residential plots, modern clubhouse amenities, tree-lined boulevards, and supreme connectivity to Indore's bypass.",
    highlights: [
      "Elite Gated Community",
      "Prime Bypass Connectivity",
      "Clubhouse & Leisure Amenities",
      "High Appreciation Value",
    ],
    mainImage: "/images/projects/vrindavan-paradise/main.png",
    galleryImages: [],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Landscaped Garden",
      "Kids Play Area",
      "Internal Roads",
      "Street Lighting",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "Delhi Public School & Choithram", distance: "8 min" },
          { name: "Prestige Institute", distance: "12 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Bypass Junction", distance: "3 min" },
          { name: "Indore Airport", distance: "25 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Medanta & Apollo Hospital", distance: "15 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Phoenix Citadel Mall", distance: "12 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 13. Vrindavan Exotica ─────────────────────────────────────────────────
  {
    slug: "vrindavan-exotica",
    name: "Vrindavan Exotica",
    shortName: "Exotica",
    index: "13",
    location: "Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/8xRKLCwwsHCq9UYc6?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.6497524,75.7941453&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.6497524, lng: 75.7941453 },
    area: "Super Corridor Link",
    status: "Under Development",
    reraNumber: "Upcoming",
    startingPrice: "",
    propertyTypes: ["Residential Plots", "Villas"],
    sizeRange: "1000 sq.ft. to 2400 sq.ft.",
    possessionDate: "Upcoming 2028",
    tagline: "Exotic Living. Unmatched Elegance.",
    description:
      "Vrindavan Exotica is a premier luxury development crafted for modern families seeking nature, architecture, and high-end township infrastructure. Featuring landscaped avenues, premium sports turf, clubhouse, and unmatched connectivity.",
    highlights: [
      "Luxury Township Concept",
      "Grand Gated Entrance & Security",
      "Sports Turf & Wellness Club",
      "High Appreciation Potential",
    ],
    mainImage: "/images/projects/vrindavan-exotica/main.png",
    galleryImages: [],
    amenities: [
      "Clubhouse",
      "Gym",
      "Landscaped Garden",
      "Kids Play Area",
      "Sports Turf",
      "Internal Roads",
      "Street Lighting",
      "Security",
      "Temple",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "Symbiosis & NMIMS", distance: "5 min" },
          { name: "Top International Schools", distance: "8 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Metro Station", distance: "5 min" },
          { name: "Indore Airport", distance: "12 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Aurobindo Hospital", distance: "10 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "City Center Malls", distance: "10 min" }],
      },
    ],
    isFeatured: true,
  },

  // ── 14. Vrindavan Residency ────────────────────────────────────────────────
  {
    slug: "vrindavan-residency",
    name: "Vrindavan Residency",
    shortName: "Residency",
    index: "14",
    location: "Near IIM Indore, Rau-Pithampur Road, Indore, Madhya Pradesh",
    googleMapsUrl: "https://maps.app.goo.gl/CUM9F7Qn1nXKNCpz5?g_st=aw",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=22.631089,75.794877&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.631089, lng: 75.794877 },
    area: "Near IIM Indore, Rau-Pithampur Road",
    status: "Ready to Move",
    reraNumber: "P-IND-22-3606",
    startingPrice: "6000/-",
    propertyTypes: ["Residential Plots"],
    sizeRange: "600 to 1200 sq.ft.",
    possessionDate: "Ready to Move",
    tagline: "Prime Living Near IIM Indore.",
    description:
      "Vrindavan Residency is an exclusive ready-to-move residential development strategically located near IIM Indore along the Rau-Pithampur corridor. Offering thoughtfully planned residential plots with complete infrastructure, wide internal roads, lush green parks, and seamless connectivity.",
    highlights: [
      "RERA Approved (P-IND-22-3606)",
      "Prime Location Near IIM Indore",
      "Ready to Move Residential Plots",
      "Rau-Pithampur Growth Corridor",
    ],
    mainImage: "/images/projects/vrindavan-residency/main.jpg",
    galleryImages: [
      "/images/projects/vrindavan-residency/main.jpg",
      "/images/projects/vrindavan-residency/gallery-2.jpeg",
      "/images/projects/vrindavan-residency/gallery-3.jpeg",
    ],
    amenities: [
      "Landscaped Garden",
      "Internal Concrete Roads",
      "Street Lighting",
      "Water Supply Line",
      "24/7 Gated Security",
      "Drainage & Sewage Line",
      "Temple Area",
      "Kids Play Zone",
    ],
    locationAdvantages: [
      {
        category: "Education",
        items: [
          { name: "IIM Indore", distance: "2 min" },
          { name: "Emerald Heights School", distance: "6 min" },
          { name: "Medicaps University", distance: "8 min" },
        ],
      },
      {
        category: "Transport",
        items: [
          { name: "Rau Railway Station", distance: "5 min" },
          { name: "AB Road Bypass", distance: "7 min" },
          { name: "Indore Airport", distance: "25 min" },
        ],
      },
      {
        category: "Healthcare",
        items: [{ name: "Choithram Hospital & Research", distance: "12 min" }],
      },
      {
        category: "Shopping & Lifestyle",
        items: [{ name: "Rau Commercial Hub & Markets", distance: "4 min" }],
      },
    ],
    isFeatured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  const s = slug.toLowerCase();
  return projects.find(
    (p) =>
      p.slug.toLowerCase() === s ||
      (s === "shailputri-pride" && p.slug === "vrindavan-shaiputri-pride") ||
      (s === "vrindavan-shaiputri-pride" && p.slug === "vrindavan-shaiputri-pride") ||
      (s === "vrindavan-pride" && p.slug.toLowerCase() === "vrindavan-pride")
  );
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.isFeatured);
}
