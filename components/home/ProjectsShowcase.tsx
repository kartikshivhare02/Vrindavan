"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CARD_WIDTH = 280; // px

export default function ProjectsShowcase() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = CARD_WIDTH * 2 + 24;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      });
      gsap.fromTo(scrollRef.current, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: scrollRef.current, start: "top 85%", once: true },
      });
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
      style={{ background: "#FAFAF8" }}
      aria-labelledby="projects-heading"
    >
      <div className="container-wide">

        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 opacity-0"
        >
          <div>
            <p className="section-label">Our Portfolio</p>
            <h2
              id="projects-heading"
              className="font-heading font-bold"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "#111111", lineHeight: 1.05 }}
            >
              Our{" "}
              <em className="not-italic" style={{ color: "#c9a84c" }}>Projects</em>
            </h2>
            <p
              className="font-body mt-2"
              style={{ color: "#888888", fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              {projects.length} thoughtfully planned developments across Indore
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll projects left"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid #e8e3d8", color: "#444444", background: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c"; (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e3d8"; (e.currentTarget as HTMLButtonElement).style.color = "#444444"; }}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll projects right"
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid #e8e3d8", color: "#444444", background: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c"; (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e3d8"; (e.currentTarget as HTMLButtonElement).style.color = "#444444"; }}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ── Horizontal scroll strip ── */}
        <div
          ref={scrollRef}
          className="opacity-0"
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "0.5rem",
          }}
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              role="listitem"
              id={`project-card-${project.slug}`}
              aria-label={`View ${project.name}`}
              className="group flex-shrink-0"
              style={{
                width: `${CARD_WIDTH}px`,
                scrollSnapAlign: "start",
                display: "block",
                textDecoration: "none",
              }}
            >
              {/* ── Image ── */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", background: "#e8e3d8" }}
              >
                {/\.(mp4|webm|ogg|mov)$/i.test(project.mainImage) ? (
                  <video
                    src={project.mainImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <Image
                    src={project.mainImage}
                    alt={`${project.name} — ${project.location}`}
                    fill
                    className="object-cover transition-transform duration-800 ease-out group-hover:scale-[1.06]"
                    priority={i < 3}
                    sizes="300px"
                  />
                )}

                {/* Status badge */}
                {project.status && project.status !== "[Status Placeholder]" && (
                  <div className="absolute top-3 left-3">
                    <span
                      style={{
                        background: "#c9a84c",
                        color: "#111111",
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        padding: "3px 9px",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                )}

                {/* Gold bottom border on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ height: "2px", background: "#c9a84c" }}
                  aria-hidden="true"
                />
              </div>

              {/* ── Info below image ── */}
              <div
                className="pt-4 pb-2"
                style={{ background: "#FAFAF8" }}
              >
                {/* Location */}
                <p
                  className="flex items-center gap-1.5 mb-1.5"
                  style={{
                    color: "#c9a84c",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  <MapPin size={9} style={{ flexShrink: 0 }} />
                  {project.location}
                </p>

                {/* Name */}
                <h3
                  className="font-heading font-bold group-hover:text-brand-gold transition-colors duration-300"
                  style={{ fontSize: "1.05rem", color: "#111111", lineHeight: 1.2 }}
                >
                  {project.name}
                </h3>

                {/* CTA link */}
                <div
                  className="flex items-center gap-1.5 mt-2"
                  style={{
                    color: "#888888",
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                  }}
                >
                  <span className="group-hover:text-brand-gold transition-colors duration-300">Explore Project</span>
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300 group-hover:text-brand-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll track indicator */}
        <div
          className="mt-6 flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? "2rem" : "0.4rem",
                height: "2px",
                background: i === 0 ? "#c9a84c" : "#d4c9bb",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
