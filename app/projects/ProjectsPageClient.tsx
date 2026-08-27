"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Shield, CheckCircle2, Search, Phone, MessageSquare } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";

export default function ProjectsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "featured">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTab = filterTab === "all" || (filterTab === "featured" && project.isFeatured);
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [searchQuery, filterTab]);

  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    siteConfig.channelPartner.whatsappMessage
  );

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-20">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-brand-green text-white pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden mb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(201,168,76,0.02) 0px,
              rgba(201,168,76,0.02) 1px,
              transparent 1px,
              transparent 8px
            )`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="font-body text-xs font-semibold tracking-[0.25em] text-brand-gold uppercase mb-3">
            Vrindavan Group Portfolio
          </p>
          <h1
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
          >
            Our Landmark <span style={{ color: "#c9a84c" }}>Projects</span>
          </h1>
          <p
            className="font-body leading-relaxed text-white/70 text-sm md:text-base max-w-2xl mx-auto"
          >
            Explore our range of thoughtfully planned residential developments across Indore.
            Built with transparency, quality infrastructure, and long-term community value.
          </p>
        </div>
      </section>

      {/* ── FILTER & SEARCH BAR ── */}
      <div className="container-wide mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border border-[#e8e3d8] rounded-sm shadow-sm">
          {/* Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-5 py-2.5 text-xs font-body uppercase font-semibold tracking-wider transition-all duration-300 ${
                filterTab === "all"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-[#f5f3ee] text-[#555] hover:bg-[#eae6dd]"
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilterTab("featured")}
              className={`px-5 py-2.5 text-xs font-body uppercase font-semibold tracking-wider transition-all duration-300 ${
                filterTab === "featured"
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-[#f5f3ee] text-[#555] hover:bg-[#eae6dd]"
              }`}
            >
              Featured ({projects.filter((p) => p.isFeatured).length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search project by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-body bg-[#faf9f6] border border-[#e8e3d8] focus:outline-none focus:border-brand-gold text-charcoal placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* ── PROJECTS LIST ── */}
      <div className="container-wide">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#e8e3d8]">
            <p className="font-heading font-semibold text-lg text-charcoal mb-2">No projects found</p>
            <p className="font-body text-xs text-gray-500">Try adjusting your search or filter options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project, idx: number) => (
              <article
                key={project.slug}
                className="group bg-white border border-[#e8e3d8] overflow-hidden flex flex-col transition-all duration-400 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-brand-gold/40"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e3d8]">
                  {/\.(mp4|webm|ogg|mov)$/i.test(project.mainImage) ? (
                    <video
                      src={project.mainImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={project.mainImage}
                      alt={project.name}
                      fill
                      priority={idx < 3}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-1 text-[0.65rem] font-bold font-body uppercase bg-brand-green text-white tracking-wider rounded-xs">
                      {project.index}
                    </span>
                    {project.isFeatured && (
                      <span className="px-2.5 py-1 text-[0.65rem] font-bold font-body uppercase bg-brand-gold text-charcoal tracking-wider rounded-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* RERA Badge if available */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                    <span className="flex items-center gap-1 text-[0.7rem] font-body font-medium text-white/90">
                      <MapPin size={12} className="text-brand-gold" />
                      {project.location}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-heading font-bold text-xl text-charcoal mb-1 group-hover:text-brand-gold transition-colors duration-300">
                    {project.name}
                  </h2>
                  <p className="font-body text-xs font-medium text-brand-gold mb-3 italic">
                    &ldquo;{project.tagline}&rdquo;
                  </p>

                  <p className="font-body text-xs text-gray-600 line-clamp-3 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.65rem] font-body bg-[#f5f3ee] text-[#555] border border-[#e8e3d8]"
                      >
                        <CheckCircle2 size={10} className="text-brand-gold" />
                        {hl}
                      </span>
                    ))}
                  </div>

                  {/* Footer CTAs */}
                  <div className="mt-auto pt-4 border-t border-[#f0ebe0] flex items-center justify-between gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn-base btn-gold text-[0.72rem] py-2 px-4 flex items-center gap-2 flex-1 justify-center"
                    >
                      <span>Explore Project</span>
                      <ArrowRight size={13} />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white transition-colors duration-300"
                      title="Enquire on WhatsApp"
                      aria-label={`Enquire about ${project.name} on WhatsApp`}
                    >
                      <MessageSquare size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ── CONSULTATION CTA ── */}
      <section className="container-wide mt-20">
        <div className="bg-brand-green text-white p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <p className="font-body text-xs font-semibold tracking-[0.2em] text-brand-gold uppercase mb-2">
              Direct Property Consultation
            </p>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              Need Help Choosing the Right Project?
            </h3>
            <p className="font-body text-xs md:text-sm text-white/75 leading-relaxed">
              Connect directly with {siteConfig.channelPartner.name} ({siteConfig.channelPartner.title}) to get complete site visits, floor plans, pricing details, and RERA guidance.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={`tel:${siteConfig.channelPartner.phone}`}
              className="btn-base btn-gold w-full sm:w-auto justify-center px-6 py-3 text-xs flex items-center gap-2"
            >
              <Phone size={14} />
              <span>Call {siteConfig.channelPartner.phone}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-outline-gold w-full sm:w-auto justify-center px-6 py-3 text-xs flex items-center gap-2"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
