"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

export default function ScrollVideoHero() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Attempt automatic playback on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled
      });
    }

    // Initial entrance animation
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
          delay: 0.15,
        }
      );
    }, heroContentRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  // Monitor video playback time to hide text overlay during the last 2s logo reveal
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (!duration || isNaN(duration)) return;

    const timeRemaining = duration - currentTime;
    if (timeRemaining <= 2.2) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  };

  return (
    <section
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#070d0a] py-28 md:py-36"
      aria-label="Vrindavan Group Hero"
    >
      {/* ── Background Video: 100% Full-Screen on Mobile & Desktop ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/video/vrindavan-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        {/* Subtle, Natural Cinematic Gradient Overlay — Softens during logo reveal */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            showContent ? "opacity-100" : "opacity-25"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(6, 12, 9, 0.45) 0%, rgba(6, 12, 9, 0.2) 35%, rgba(6, 12, 9, 0.3) 65%, rgba(6, 12, 9, 0.8) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Centered Hero Content with Generous Spacing (Fades out for logo reveal) ── */}
      <div
        ref={heroContentRef}
        className={`container-wide relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6 max-w-5xl mx-auto my-auto transition-all duration-700 ease-in-out ${
          showContent
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Eyebrow badge */}
        <div className="hero-anim-item opacity-0 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/45 backdrop-blur-md border border-brand-gold/30 mb-7 shadow-2xl">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            16+ Years of Trust &amp; Excellence
          </span>
        </div>

        {/* Main Brand Headline */}
        <h1
          className="hero-anim-item opacity-0 font-heading font-bold text-white tracking-tight leading-[1.08] mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          VRINDAVAN <span style={{ color: "#c9a84c" }}>GROUP</span>
        </h1>

        {/* Subtitle / Tagline */}
        <p
          className="hero-anim-item opacity-0 font-heading font-medium italic text-brand-gold-light mb-6 text-lg sm:text-2xl md:text-3xl tracking-wide max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        >
          &ldquo;Building Landmarks. Creating Communities.&rdquo;
        </p>

        {/* Supporting description */}
        <p
          className="hero-anim-item opacity-0 font-body text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
        >
          Central India&apos;s premier real estate developer. Delivering RERA-approved
          township developments, premium residential plots, and lifestyle destinations across
          Indore&apos;s top growth corridors.
        </p>

        {/* Key Metrics Pill Bar */}
        <div className="hero-anim-item opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full max-w-3xl mb-10">
          <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-md border border-white/15 rounded-md flex flex-col items-center justify-center shadow-2xl hover:border-brand-gold/40 transition-colors">
            <span className="font-heading font-bold text-white text-xl sm:text-2xl md:text-3xl mb-1">16+</span>
            <span className="font-body text-xs sm:text-sm text-white/80 uppercase tracking-wider font-medium">Years of Trust</span>
          </div>
          <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-md border border-white/15 rounded-md flex flex-col items-center justify-center shadow-2xl hover:border-brand-gold/40 transition-colors">
            <span className="font-heading font-bold text-brand-gold text-xl sm:text-2xl md:text-3xl mb-1">20+</span>
            <span className="font-body text-xs sm:text-sm text-white/80 uppercase tracking-wider font-medium">Developments</span>
          </div>
          <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-md border border-white/15 rounded-md flex flex-col items-center justify-center shadow-2xl hover:border-brand-gold/40 transition-colors">
            <span className="font-heading font-bold text-white text-xl sm:text-2xl md:text-3xl mb-1">4000+</span>
            <span className="font-body text-xs sm:text-sm text-white/80 uppercase tracking-wider font-medium">Happy Families</span>
          </div>
          <div className="p-4 sm:p-5 bg-black/50 backdrop-blur-md border border-white/15 rounded-md flex flex-col items-center justify-center shadow-2xl hover:border-brand-gold/40 transition-colors">
            <span className="font-heading font-bold text-brand-gold text-xl sm:text-2xl md:text-3xl mb-1">100%</span>
            <span className="font-body text-xs sm:text-sm text-white/80 uppercase tracking-wider font-medium">RERA Approved</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="hero-anim-item opacity-0 flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full">
          <Link
            href="/projects"
            className="btn-base btn-gold text-xs sm:text-sm px-7 py-3.5 sm:px-9 sm:py-4 shadow-2xl hover:shadow-brand-gold/30 flex items-center gap-2.5 group transition-all"
            id="hero-explore-projects"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <a
            href="#about"
            className="btn-base bg-black/45 text-white border border-white/30 text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md hover:bg-white/15 transition-all shadow-xl"
            id="hero-learn-more"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="btn-base bg-brand-gold/20 text-brand-gold-light border border-brand-gold/40 text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 backdrop-blur-md hover:bg-brand-gold/30 transition-all shadow-xl"
            id="hero-contact-us"
          >
            Contact
          </a>
        </div>
      </div>

      {/* ── Scroll Down Indicator pinned at the very bottom ── */}
      <a
        href="#about"
        aria-label="Scroll to About Vrindavan Group"
        className={`absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/75 hover:text-brand-gold transition-all duration-700 group cursor-pointer ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Scroll to Explore
        </span>
        <ChevronDown size={18} className="animate-bounce text-brand-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
      </a>
    </section>
  );
}
