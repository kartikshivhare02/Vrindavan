"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero Text Stages ────────────────────────────────────────────────────────
interface HeroStage {
  startPct: number;
  endPct: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string;
  ctas?: { label: string; href: string; variant: "primary" | "outline" }[];
}

const heroStages: HeroStage[] = [
  {
    startPct: 0,
    endPct: 0.18,
    eyebrow: "WELCOME TO",
    title: "VRINDAVAN\nGROUP",
    subtitle: "Building Landmarks. Creating Communities.",
    ctas: [
      { label: "Explore Projects", href: "/projects", variant: "primary" },
    ],
  },
  {
    startPct: 0.22,
    endPct: 0.42,
    title: "20+ YEARS",
    subtitle: "OF TRUST & EXPERIENCE",
    body: "Creating thoughtfully planned communities and helping families find a place they can proudly call home.",
  },
  {
    startPct: 0.46,
    endPct: 0.62,
    title: "2000+",
    subtitle: "HAPPY FAMILIES",
    body: "Thousands of families. One foundation — trust.",
  },
  {
    startPct: 0.65,
    endPct: 0.8,
    title: "PREMIUM\nPROJECTS",
    subtitle: "ACROSS INDORE",
    body: "Prime locations. Modern amenities. RERA-approved developments.",
  },
  {
    startPct: 0.84,
    endPct: 1,
    title: "Your Next Address\nStarts Here.",
    ctas: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      {
        label: "Schedule a Site Visit",
        href: "#contact",
        variant: "outline",
      },
    ],
  },
];

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textStageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may need user gesture on some strict mobile browsers
      });
    }

    if (prefersReduced) {
      // Just make first stage visible
      if (textStageRefs.current[0]) {
        gsap.set(textStageRefs.current[0], { opacity: 1, y: 0 });
      }
      return;
    }

    // Initialize all stages: first stage visible, others hidden
    textStageRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          willChange: "transform, opacity",
        });
      }
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: pinContainer,
        start: "top top",
        end: "+=350%",
        scrub: 0.8,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update side progress line
          if (progressBarRef.current) {
            progressBarRef.current.style.height = `${progress * 100}%`;
          }

          // Subtle video zoom/parallax during scroll
          if (videoRef.current) {
            gsap.set(videoRef.current, {
              scale: 1 + progress * 0.08,
              opacity: 1 - progress * 0.15,
            });
          }

          // Fade out scroll indicator
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: progress > 0.03 ? 0 : 1,
              y: progress > 0.03 ? -10 : 0,
              duration: 0.3,
              overwrite: true,
            });
          }

          // Animate text stages
          heroStages.forEach((stage, i) => {
            const el = textStageRefs.current[i];
            if (!el) return;

            const { startPct, endPct } = stage;
            const fadeBand = (endPct - startPct) * 0.2;

            if (progress >= startPct && progress <= endPct) {
              let opacity = 1;
              let y = 0;

              if (progress < startPct + fadeBand) {
                // Fading in
                const t = (progress - startPct) / fadeBand;
                opacity = t;
                y = (1 - t) * 24;
              } else if (progress > endPct - fadeBand) {
                // Fading out
                const t = (progress - (endPct - fadeBand)) / fadeBand;
                opacity = 1 - t;
                y = -t * 20;
              }

              gsap.set(el, { opacity, y });
            } else {
              gsap.set(el, {
                opacity: 0,
                y: progress < startPct ? 30 : -20,
              });
            }
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen"
      id="hero"
      aria-label="Vrindavan Group — Cinematic Hero"
    >
      <div
        ref={pinContainerRef}
        className="hero-pin-wrapper relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Hardware Accelerated Background Video */}
        <video
          ref={videoRef}
          src="/video/vrindavan-hero.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.65) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom subtle blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(250,250,248,0.35) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Text Overlay Container */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          aria-live="polite"
        >
          <div className="container-wide w-full h-full relative">
            {heroStages.map((stage, i) => (
              <div
                key={i}
                ref={(el) => {
                  textStageRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center"
                style={{
                  pointerEvents: "auto",
                }}
              >
                <div className="max-w-3xl">
                  {/* Eyebrow */}
                  {stage.eyebrow && (
                    <p className="font-body text-xs md:text-sm font-medium tracking-[0.3em] text-brand-gold mb-3 uppercase">
                      {stage.eyebrow}
                    </p>
                  )}

                  {/* Main Title */}
                  <h1
                    className="font-heading font-bold text-white leading-[0.95] mb-4 whitespace-pre-line text-shadow-sm"
                    style={{
                      fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
                    }}
                  >
                    {stage.title}
                  </h1>

                  {/* Subtitle */}
                  {stage.subtitle && (
                    <p
                      className="font-body font-light tracking-[0.15em] text-white/90 uppercase mb-4"
                      style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.25rem)" }}
                    >
                      {stage.subtitle}
                    </p>
                  )}

                  {/* Body */}
                  {stage.body && (
                    <p
                      className="font-body text-white/80 leading-relaxed max-w-lg mb-4"
                      style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
                    >
                      {stage.body}
                    </p>
                  )}

                  {/* CTAs */}
                  {stage.ctas && stage.ctas.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-6">
                      {stage.ctas.map((cta, ci) => (
                        <Link
                          key={ci}
                          href={cta.href}
                          className={`btn-base ${
                            cta.variant === "primary"
                              ? "btn-gold"
                              : "btn-outline-white"
                          } group shadow-lg`}
                          id={`hero-cta-${i}-${ci}`}
                        >
                          {cta.label}
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Line — Left side */}
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div
            className="w-[2px] bg-white/20 relative overflow-hidden rounded-full"
            style={{ height: 90 }}
          >
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 right-0 bg-brand-gold transition-[height] duration-75 ease-out"
              style={{ height: "0%" }}
            />
          </div>
          <span
            className="text-white/50 text-[9px] font-body tracking-[0.25em] uppercase font-semibold"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-5 h-8 rounded-full border border-white/60 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/90 rounded-full animate-scroll-down" />
          </div>
          <p className="font-body text-white/70 text-[11px] tracking-[0.25em] uppercase">
            Scroll to Explore
          </p>
        </div>

        {/* Year Label */}
        <div
          className="absolute top-8 right-8 z-30 hidden lg:block"
          aria-hidden="true"
        >
          <p className="font-body text-white/40 text-[11px] tracking-widest uppercase font-medium">
            Est. 2004 • Indore
          </p>
        </div>
      </div>
    </section>
  );
}
