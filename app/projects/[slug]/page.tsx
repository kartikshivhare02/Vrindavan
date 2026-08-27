import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Shield,
  Home,
  Maximize,
  Calendar,
  Tag,
  CheckCircle2,
  ArrowLeft,
  Phone,
  MessageSquare,
} from "lucide-react";
import { projects, getProjectBySlug, DEFAULT_MAP_EMBED_URL } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";
import ProjectGallery from "@/components/projects/ProjectGallery";
import EnquiryForm from "@/components/contact/EnquiryForm";

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic metadata per project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) {
    return { title: "Project Not Found | Vrindavan Group Indore" };
  }

  const pageTitle = `${project.name} ${project.area ? `(${project.area})` : ""} — Residential Property in ${project.location || "Indore"}`;
  const metaDesc = `${project.name} by Vrindavan Group located in ${project.location}. ${project.description.slice(0, 140)}... Explore amenities, map location & enquiry details.`;

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: `${project.name}, ${project.name} Indore, property in ${project.area || project.location}, residential plots ${project.location}, Vrindavan Group Indore`,
    openGraph: {
      title: `${project.name} — Real Estate Project in Indore`,
      description: metaDesc,
      url: `${siteConfig.seo.siteUrl}/projects/${project.slug}`,
      siteName: siteConfig.companyName,
      locale: "en_IN",
      type: "website",
      images: [{ url: project.mainImage, width: 1200, height: 630, alt: `${project.name} Indore` }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDesc,
      images: [project.mainImage],
    },
    alternates: {
      canonical: `${siteConfig.seo.siteUrl}/projects/${project.slug}`,
    },
  };
}

const amenityIcons: Record<string, string> = {
  "Landscaped Garden": "🌿",
  Gym: "🏋️",
  "Sports Turf": "⚽",
  Temple: "🛕",
  "Kids Play Area": "🛝",
  "Internal Roads": "🛣️",
  Security: "🔒",
  "Street Lighting": "💡",
  "Water Infrastructure": "💧",
  "Community Spaces": "👥",
  "Safe & Secure Environment": "🔐",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) notFound();

  const whatsappMessage = `Hello ${siteConfig.channelPartner.name}, I am interested in ${project.name}. Please share more details.`;
  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    whatsappMessage
  );

  // Rich JSON-LD Structured Data for Real Estate
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${siteConfig.seo.siteUrl}/projects/${project.slug}#listing`,
        name: project.name,
        description: project.description,
        url: `${siteConfig.seo.siteUrl}/projects/${project.slug}`,
        image: `${siteConfig.seo.siteUrl}${project.mainImage}`,
        datePosted: "2024-01-01",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: project.location,
          addressRegion: siteConfig.state,
          addressCountry: "IN",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.seo.siteUrl}/projects/${project.slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.seo.siteUrl}/projects` },
          { "@type": "ListItem", position: 3, name: project.name, item: `${siteConfig.seo.siteUrl}/projects/${project.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Project Hero & Breadcrumbs ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col justify-between min-h-[75vh] md:min-h-[82vh] pt-28 md:pt-32 pb-16"
        aria-label={`${project.name} hero image`}
      >
        {/\.(mp4|webm|ogg|mov)$/i.test(project.mainImage) ? (
          <video
            src={project.mainImage}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.mainImage}
            alt={`${project.name} — ${project.location}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Rich dark gradient overlay for optimal text & navbar contrast */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,24,18,0.85) 0%, rgba(10,18,14,0.55) 45%, rgba(10,15,12,0.92) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top: Integrated Breadcrumbs */}
        <div className="relative z-10 container-wide mb-8">
          <nav
            className="inline-flex items-center gap-2 text-xs font-body px-3.5 py-1.5 rounded-xs bg-black/30 backdrop-blur-md border border-white/10 text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <span className="text-brand-gold/60">/</span>
            <Link href="/projects" className="hover:text-brand-gold transition-colors">
              Projects
            </Link>
            <span className="text-brand-gold/60">/</span>
            <span className="text-brand-gold font-medium">{project.name}</span>
          </nav>
        </div>

        {/* Bottom: Project Title & Details */}
        <div className="relative z-10 container-wide flex flex-col justify-end">
          {/* Project index & RERA Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-body text-white/50 text-xs tracking-widest uppercase">
              Project {project.index} of {projects.length}
            </span>
            {project.reraNumber && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold text-charcoal rounded-xs text-[0.7rem] font-bold uppercase tracking-wider">
                <Shield size={12} />
                RERA: {project.reraNumber}
              </div>
            )}
          </div>

          <h1
            className="font-heading font-bold text-white leading-tight mb-3"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {project.name}
          </h1>

          <a
            href={project.googleMapsUrl || "https://maps.app.goo.gl/Bbh2KBct435KMRVKA"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold font-body text-sm mb-2 transition-colors group"
            title="Open project location on Google Maps"
          >
            <MapPin size={14} className="text-brand-gold group-hover:scale-110 transition-transform" />
            <span>{project.location} {project.area ? `(${project.area})` : ""}</span>
            <span className="text-[0.65rem] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-xs border border-brand-gold/30">View on Google Maps ↗</span>
          </a>

          <p className="font-body text-brand-gold font-medium text-base md:text-lg italic mb-6">
            &ldquo;{project.tagline}&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#project-enquiry"
              className="btn-base btn-gold text-xs px-6 py-3"
              id="project-hero-enquire"
            >
              Enquire Now
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-outline-white text-xs px-6 py-3 flex items-center gap-2"
              id="project-hero-whatsapp"
            >
              <MessageSquare size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Project Overview ──────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="overview-heading"
      >
        <div className="container-narrow">
          <h2
            id="overview-heading"
            className="font-heading font-bold text-charcoal mb-8"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Project Overview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <Home size={18} />,
                label: "Type",
                value: project.propertyTypes.join(", ") || "[Property Type]",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: project.area || "[Location]",
              },
              {
                icon: <Maximize size={18} />,
                label: "Size Range",
                value: project.sizeRange || "[Size Range]",
              },
              {
                icon: <Tag size={18} />,
                label: "Starting Price",
                value: project.startingPrice || "[Price on Request]",
              },
              {
                icon: <Calendar size={18} />,
                label: "Possession",
                value: project.possessionDate || "[Date TBD]",
              },
              {
                icon: <Shield size={18} />,
                label: "RERA",
                value: project.reraNumber || "[RERA Applied / TBD]",
              },
              {
                icon: <CheckCircle2 size={18} />,
                label: "Status",
                value: project.status,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-sm bg-ivory border border-ivory-dark"
              >
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  {item.icon}
                  <p className="font-body text-xs text-charcoal-mid uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
                <p className="font-body font-medium text-charcoal text-sm leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading font-semibold text-charcoal text-2xl mb-4">
                About {project.name}
              </h3>
              <div className="h-px w-12 bg-brand-gold mb-6" aria-hidden="true" />
              <p className="font-body text-charcoal-mid leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mt-6 space-y-3" aria-label="Project highlights">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-brand-green flex-shrink-0" />
                    <span className="font-body text-charcoal-mid text-sm">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "4/3" }}
            >
              {/\.(mp4|webm|ogg|mov)$/i.test(project.galleryImages[0] || project.mainImage) ? (
                <video
                  src={project.galleryImages[0] || project.mainImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={project.galleryImages[0] || project.mainImage}
                  alt={`${project.name} — development view`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────────── */}
      {project.galleryImages.length > 0 && (
        <section
          className="section-padding bg-ivory-dark"
          aria-labelledby="gallery-heading"
        >
          <div className="container-narrow">
            <h2
              id="gallery-heading"
              className="font-heading font-bold text-charcoal mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Project Gallery
            </h2>
            <ProjectGallery
              images={project.galleryImages}
              projectName={project.name}
            />
          </div>
        </section>
      )}

      {/* ── Amenities ─────────────────────────────────────────────────────────── */}
      {project.amenities.length > 0 && (
        <section
          className="section-padding bg-white"
          aria-labelledby="amenities-heading"
        >
          <div className="container-narrow">
            <h2
              id="amenities-heading"
              className="font-heading font-bold text-charcoal mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Amenities
            </h2>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              role="list"
              aria-label="Project amenities"
            >
              {project.amenities.map((amenity) => (
                <div
                  key={amenity}
                  role="listitem"
                  className="flex flex-col items-center gap-3 p-5 rounded-sm bg-ivory border border-ivory-dark hover:border-brand-gold/40 hover:shadow-card transition-all duration-300 text-center"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {amenityIcons[amenity] || "✦"}
                  </span>
                  <p className="font-body text-charcoal-mid text-xs font-medium leading-tight">
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Location Advantages ───────────────────────────────────────────────── */}
      {project.locationAdvantages.length > 0 && (
        <section
          className="section-padding bg-charcoal"
          aria-labelledby="location-adv-heading"
        >
          <div className="container-narrow">
            <h2
              id="location-adv-heading"
              className="font-heading font-bold text-white mb-8"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Everything You Need,{" "}
              <span className="text-brand-gold">Close to Home</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.locationAdvantages.map((cat) => (
                <div
                  key={cat.category}
                  className="p-6 rounded-sm bg-white/5 border border-white/10"
                >
                  <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                    {cat.category}
                  </h3>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-2"
                      >
                        <span className="font-body text-white/60 text-xs leading-relaxed">
                          {item.name}
                        </span>
                        <span className="font-body text-brand-gold text-xs font-medium flex-shrink-0">
                          {item.distance}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Google Maps Container */}
            <div className="mt-8 rounded-sm overflow-hidden border border-white/10 relative">
              <div style={{ height: 280 }} className="w-full">
                <iframe
                  title={`${project.name} Location on Google Maps`}
                  src={project.googleMapEmbedUrl || DEFAULT_MAP_EMBED_URL}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 bg-charcoal-light/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <MapPin size={14} className="text-brand-gold" />
                  <span>{project.name} — {project.area || project.location}</span>
                </div>
                <a
                  href={project.googleMapsUrl || "https://maps.app.goo.gl/Bbh2KBct435KMRVKA"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gold text-xs px-4 py-2 flex items-center gap-2"
                >
                  <MapPin size={13} />
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Project Enquiry Form ──────────────────────────────────────────────── */}
      <section
        id="project-enquiry"
        className="section-padding bg-ivory"
        aria-labelledby="project-enquiry-heading"
      >
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-body text-xs font-medium tracking-[0.3em] text-brand-gold uppercase mb-4">
                Get in Touch
              </p>
              <h2
                id="project-enquiry-heading"
                className="font-heading font-bold text-charcoal mb-4"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                Enquire About{" "}
                <span className="text-brand-green">{project.name}</span>
              </h2>
              <p className="font-body text-charcoal-mid leading-relaxed mb-8">
                Share your requirements and our property consultant will provide
                personalised guidance for this project.
              </p>

              {/* Channel Partner Mini Card */}
              <div className="p-5 rounded-sm bg-white border border-ivory-dark flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-white font-bold">HS</span>
                </div>
                <div>
                  <p className="font-body font-medium text-charcoal">
                    {siteConfig.channelPartner.name}
                  </p>
                  <p className="font-body text-brand-green text-xs mb-3">
                    {siteConfig.channelPartner.title}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={`tel:${siteConfig.channelPartner.phone}`}
                      className="flex items-center gap-1.5 text-xs text-charcoal-mid hover:text-brand-green transition-colors"
                      id="project-partner-phone"
                    >
                      <Phone size={12} />
                      Call
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-charcoal-mid hover:text-brand-green transition-colors"
                      id="project-partner-whatsapp"
                    >
                      <MessageSquare size={12} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-ivory-dark rounded-sm p-8 shadow-card">
              <EnquiryForm defaultProject={project.name} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Projects ────────────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-labelledby="other-projects-heading"
      >
        <div className="container-narrow">
          <h2
            id="other-projects-heading"
            className="font-heading font-bold text-charcoal mb-8"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            Explore Other Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.slug !== project.slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group relative overflow-hidden rounded-sm block"
                  style={{ aspectRatio: "4/3" }}
                  aria-label={`View ${p.name}`}
                >
                  {/\.(mp4|webm|ogg|mov)$/i.test(p.mainImage) ? (
                    <video
                      src={p.mainImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={p.mainImage}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,26,26,0.8) 0%, transparent 60%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/60 text-xs mb-1">{p.location}</p>
                    <h3 className="font-heading font-bold text-white text-lg">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/projects"
              className="btn-base btn-outline"
              id="back-to-all-projects"
            >
              <ArrowLeft size={14} />
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
