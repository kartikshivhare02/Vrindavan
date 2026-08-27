"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero text stages ───────────────────────────────────────────────────────
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
    endPct: 0.2,
    eyebrow: "WELCOME TO",
    title: "VRINDAVAN\nGROUP",
    subtitle: "Building Landmarks. Creating Communities.",
    ctas: [
      { label: "Explore Projects", href: "/projects", variant: "primary" },
      { label: "Book Site Visit", href: "#contact", variant: "outline" },
    ],
  },
  {
    startPct: 0.25,
    endPct: 0.45,
    eyebrow: "LEGACY OF EXCELLENCE",
    title: "20+ YEARS",
    subtitle: "OF UNMATCHED TRUST & VISION",
    body: "Creating thoughtfully planned gated townships across prime locations in Indore.",
  },
  {
    startPct: 0.5,
    endPct: 0.7,
    eyebrow: "OUR COMMUNITY",
    title: "2000+",
    subtitle: "HAPPY & DELIGHTED FAMILIES",
    body: "Thousands of families have made Vrindavan their lifelong sanctuary of peace and pride.",
  },
  {
    startPct: 0.75,
    endPct: 0.9,
    eyebrow: "PRIME LANDMARKS",
    title: "PREMIUM\nTOWNSHIPS",
    subtitle: "ACROSS INDORE'S GROWTH CORRIDORS",
    body: "Super Corridor, Rau, SuryaMandir RRCAT, AB Road — RERA approved, high-appreciation properties.",
  },
  {
    startPct: 0.92,
    endPct: 1,
    eyebrow: "EXCLUSIVE LIVING",
    title: "Your Dream\nAddress Awaits.",
    ctas: [
      { label: "View All Projects", href: "#projects", variant: "primary" },
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const textStageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    // Start video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    // Initialize text stages visibility
    textStageRefs.current.forEach((el, index) => {
      if (el) {
        gsap.set(el, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 30 });
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

          // Progress line
          const progressLine = document.getElementById("hero-progress-line");
          if (progressLine) {
            progressLine.style.height = `${progress * 100}%`;
          }

          // Fade out scroll indicator after user begins scrolling
          if (progress > 0.03 && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 0,
              y: -15,
              duration: 0.4,
              overwrite: true,
            });
          } else if (progress <= 0.03 && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              overwrite: true,
            });
          }

          // Text stages switching
          heroStages.forEach((stage, i) => {
            const el = textStageRefs.current[i];
            if (!el) return;

            const { startPct, endPct } = stage;
            const midFade = (endPct - startPct) * 0.18;

            if (progress >= startPct && progress <= endPct) {
              let localProgress: number;
              if (progress < startPct + midFade) {
                // Fade in
                localProgress = (progress - startPct) / midFade;
                gsap.to(el, {
                  opacity: localProgress,
                  y: (1 - localProgress) * 25,
                  duration: 0,
                });
              } else if (progress > endPct - midFade) {
                // Fade out
                localProgress = 1 - (progress - (endPct - midFade)) / midFade;
                gsap.to(el, {
                  opacity: localProgress,
                  y: -(1 - localProgress) * 20,
                  duration: 0,
                });
              } else {
                // Fully visible
                gsap.to(el, { opacity: 1, y: 0, duration: 0 });
              }
            } else {
              gsap.to(el, {
                opacity: 0,
                y: progress < startPct ? 25 : -20,
                duration: 0,
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

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0A0A0A]"
      id="hero"
      aria-label="Vrindavan Group — Cinematic Hero"
    >
      <div
        ref={pinContainerRef}
        className="hero-pin-wrapper relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      >
        {/* Hardware-accelerated High Performance Native Video */}
        <video
          ref={videoRef}
          src="/video/vrindavan-hero.mp4"
          poster="/hero-frames/frame_000000.jpeg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ willChange: "transform" }}
          aria-hidden="true"
        />

        {/* Cinematic dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.65) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom feather vignette into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #F8F5F0 0%, rgba(248,245,240,0.4) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Text Overlay Stage */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          aria-live="polite"
        >
          <div className="container-wide w-full px-6 md:px-12 relative h-full flex items-center">
            {heroStages.map((stage, i) => (
              <div
                key={i}
                ref={(el) => {
                  textStageRefs.current[i] = el;
                }}
                className="absolute left-6 md:left-12 right-6 md:right-12 pointer-events-auto"
                style={{ opacity: i === 0 ? 1 : 0 }}
                aria-hidden={i > 0}
              >
                <div className="max-w-3xl">
                  {/* Eyebrow */}
                  {stage.eyebrow && (
                    <p className="font-body text-xs md:text-sm font-semibold tracking-[0.3em] text-[#c9a84c] mb-3 uppercase">
                      {stage.eyebrow}
                    </p>
                  )}

                  {/* Main Title */}
                  <h1
                    className="font-heading font-bold text-white leading-[0.95] mb-4 whitespace-pre-line drop-shadow-lg"
                    style={{
                      fontSize: "clamp(2.8rem, 7.5vw, 6.8rem)",
                    }}
                  >
                    {stage.title}
                  </h1>

                  {/* Subtitle */}
                  {stage.subtitle && (
                    <p
                      className="font-body font-normal tracking-[0.15em] text-white/90 uppercase mb-3 drop-shadow"
                      style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.25rem)" }}
                    >
                      {stage.subtitle}
                    </p>
                  )}

                  {/* Body */}
                  {stage.body && (
                    <p
                      className="font-body text-white/80 leading-relaxed max-w-xl mb-6 text-sm md:text-base drop-shadow"
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
                          } group`}
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

        {/* Video Play/Pause toggle button */}
        <div className="absolute bottom-10 right-8 z-30 hidden sm:block">
          <button
            onClick={toggleVideoPlayback}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 hover:text-white text-xs transition-all hover:bg-black/60"
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="text-[11px] uppercase tracking-wider">{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>

        {/* Progress Line */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-px bg-white/20 relative overflow-hidden"
            style={{ height: 80 }}
          >
            <div
              id="hero-progress-line"
              className="absolute top-0 left-0 right-0 bg-[#c9a84c]"
              style={{ height: "0%" }}
            />
          </div>
          <span
            className="text-white/40 text-[9px] font-body tracking-widest uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-[#c9a84c] rounded-full animate-bounce" />
          </div>
          <p className="font-body text-white/50 text-[10px] tracking-[0.25em] uppercase">
            Scroll Down
          </p>
        </div>
      </div>
    </section>
  );
}
