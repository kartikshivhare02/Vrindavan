"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Shield, Sparkles, Building2, Users, Award } from "lucide-react";
import { gsap } from "gsap";

export default function ScrollVideoHero() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt automatic playback on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some low-power modes; muted playsInline handles most
      });
    }

    // Smooth entrance animation for text
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        }
      );
    }, heroContentRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal"
      aria-label="Vrindavan Group Hero"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/video/vrindavan-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          poster="/images/projects/vrindavan-grand/main.jpg"
        />
        {/* Cinematic Dual-Tone Dark Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(10, 24, 18, 0.45) 0%, rgba(10, 15, 12, 0.88) 80%, rgba(8, 12, 10, 0.96) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-black/35 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Centered Hero Content (Appears without scrolling) ── */}
      <div
        ref={heroContentRef}
        className="container-wide relative z-10 text-center flex flex-col items-center justify-center pt-32 pb-24 px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow badge */}
        <div className="hero-anim-item opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            16+ Years of Trust & Excellence
          </span>
        </div>

        {/* Main Brand Headline */}
        <h1
          className="hero-anim-item opacity-0 font-heading font-bold text-white tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          VRINDAVAN <span style={{ color: "#c9a84c" }}>GROUP</span>
        </h1>

        {/* Subtitle / Tagline */}
        <p
          className="hero-anim-item opacity-0 font-heading font-medium italic text-brand-gold/95 mb-6 text-lg md:text-2xl tracking-wide max-w-2xl"
        >
          &ldquo;Building Landmarks. Creating Communities.&rdquo;
        </p>

        {/* Supporting description */}
        <p
          className="hero-anim-item opacity-0 font-body text-white/80 text-sm md:text-base leading-relaxed max-w-2xl mb-8"
        >
          Central India&apos;s premier real estate developer. Delivering RERA-approved
          township developments, premium residential plots, and lifestyle destinations across
          Indore&apos;s top growth corridors.
        </p>

        {/* Key Metrics Pill Bar */}
        <div className="hero-anim-item opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-10">
          <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-white text-lg md:text-xl">16+</span>
            <span className="font-body text-[11px] text-white/70 uppercase tracking-wider">Years of Trust</span>
          </div>
          <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-brand-gold text-lg md:text-xl">20+</span>
            <span className="font-body text-[11px] text-white/70 uppercase tracking-wider">Developments</span>
          </div>
          <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-white text-lg md:text-xl">4000+</span>
            <span className="font-body text-[11px] text-white/70 uppercase tracking-wider">Happy Families</span>
          </div>
          <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-brand-gold text-lg md:text-xl">100%</span>
            <span className="font-body text-[11px] text-white/70 uppercase tracking-wider">RERA Approved</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="hero-anim-item opacity-0 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="btn-base btn-gold text-xs px-8 py-3.5 shadow-xl hover:shadow-brand-gold/20 flex items-center gap-2 group transition-all"
            id="hero-explore-projects"
          >
            <span>Explore Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#about"
            className="btn-base btn-outline-white text-xs px-7 py-3.5 backdrop-blur-sm hover:bg-white/10 transition-all"
            id="hero-learn-more"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="btn-base bg-white/10 text-white border border-white/20 text-xs px-7 py-3.5 backdrop-blur-sm hover:bg-white/20 transition-all"
            id="hero-contact-us"
          >
            Contact
          </a>
        </div>
      </div>

      {/* ── Scroll Down Indicator (Jumps straight to About Us) ── */}
      <a
        href="#about"
        aria-label="Scroll to About Vrindavan Group"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/60 hover:text-brand-gold transition-colors group cursor-pointer"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll to Explore
        </span>
        <ChevronDown size={18} className="animate-bounce text-brand-gold" />
      </a>
    </section>
  );
}
