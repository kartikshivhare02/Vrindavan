"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  heroFramesCache,
  startHeroFramesPreload,
  TOTAL_HERO_FRAMES,
  getHeroFramePath,
} from "@/lib/heroFrameLoader";

gsap.registerPlugin(ScrollTrigger);

// ─── Configuration ─────────────────────────────────────────────────────────
const TOTAL_FRAMES = TOTAL_HERO_FRAMES;
const FRAME_PATH = getHeroFramePath;

/** Lerp factor — controls cinematic inertia (0.08 = slow, 0.18 = snappy) */
const LERP_FACTOR = 0.12;

/** How many frames to eagerly preload on initial load */
const EAGER_PRELOAD_COUNT = 30;

/** Mobile: max cached frames to avoid OOM (frames outside this window are evicted) */
const MOBILE_CACHE_WINDOW = 60;

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

// ─── Cover-crop draw helper ──────────────────────────────────────────────────
function drawCoverFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  if (!imgW || !imgH) return;

  const canvasAspect = canvasW / canvasH;
  const imgAspect = imgW / imgH;

  let sx = 0, sy = 0, sw = imgW, sh = imgH;

  if (imgAspect > canvasAspect) {
    // Image is wider — crop sides
    sw = imgH * canvasAspect;
    sx = (imgW - sw) / 2;
  } else {
    // Image is taller — crop top/bottom
    sh = imgW / canvasAspect;
    sy = (imgH - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ScrollVideoHero() {
  // DOM refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const textStageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation state refs (never cause React re-renders)
  const rafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const loadingSet = useRef<Set<number>>(new Set());
  const isMobile = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasDims = useRef({ w: 0, h: 0 });

  // ── Canvas resize (respects devicePixelRatio) ──────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    canvasDims.current = { w, h };

    // Redraw current frame after resize
    const img = heroFramesCache.get(Math.round(currentFrameRef.current));
    if (img?.complete && img.naturalWidth) {
      ctx.clearRect(0, 0, w, h);
      drawCoverFrame(ctx, img, w, h);
    }
  }, []);

  // ── Load a single frame ───────────────────────────────────────────────────
  const loadFrame = useCallback(
    (index: number, onLoad?: (img: HTMLImageElement) => void) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (heroFramesCache.has(index)) {
        if (onLoad) onLoad(heroFramesCache.get(index)!);
        return;
      }
      if (loadingSet.current.has(index)) return;

      loadingSet.current.add(index);
      const img = new window.Image();
      img.src = FRAME_PATH(index);
      img.onload = () => {
        heroFramesCache.set(index, img);
        loadingSet.current.delete(index);
        if (onLoad) onLoad(img);
      };
      img.onerror = () => {
        loadingSet.current.delete(index);
      };
    },
    []
  );

  // ── Prioritized preload around a given frame ───────────────────────────────
  const preloadAround = useCallback(
    (center: number, radius: number) => {
      // Load outward from center: center, center+1, center-1, center+2, ...
      for (let i = 0; i <= radius; i++) {
        loadFrame(center + i);
        if (i > 0) loadFrame(center - i);
      }
    },
    [loadFrame]
  );

  // ── Get nearest available frame (never show black) ─────────────────────────
  const getNearestLoadedFrame = useCallback((target: number): HTMLImageElement | null => {
    if (heroFramesCache.has(target)) return heroFramesCache.get(target)!;

    for (let radius = 1; radius < 30; radius++) {
      if (heroFramesCache.has(target - radius)) return heroFramesCache.get(target - radius)!;
      if (heroFramesCache.has(target + radius)) return heroFramesCache.get(target + radius)!;
    }
    return null;
  }, []);

  // ── RAF render loop (lerp + draw) ─────────────────────────────────────────
  const renderLoop = useCallback(() => {
    const ctx = ctxRef.current;
    const { w, h } = canvasDims.current;

    // Lerp current frame toward target
    const diff = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(diff) > 0.05) {
      currentFrameRef.current += diff * LERP_FACTOR;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    const frameIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentFrameRef.current))
    );

    const img = getNearestLoadedFrame(frameIdx);
    if (ctx && img && w && h) {
      ctx.clearRect(0, 0, w, h);
      drawCoverFrame(ctx, img, w, h);
    }

    // Update the progress line DOM directly (no React state)
    const progressLine = document.getElementById("hero-progress-line");
    if (progressLine) {
      const pct = (targetFrameRef.current / (TOTAL_FRAMES - 1)) * 100;
      progressLine.style.height = `${pct}%`;
    }

    // Prioritize loading frames near current scroll position
    preloadAround(frameIdx, 8);

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [getNearestLoadedFrame, preloadAround]);

  // ── Main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    isMobile.current = window.innerWidth < 768;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    // Initialize canvas context
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    // Size canvas immediately
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    canvasDims.current = { w, h };

    // ── Reduced motion fallback ──────────────────────────────────────────────
    if (prefersReduced) {
      // Just show first frame statically, no pinning
      loadFrame(0, (img) => {
        drawCoverFrame(ctx, img, w, h);
      });
      return;
    }

    // ── Phase 1: Draw first frame immediately if available ──────────────────
    loadFrame(0, (img) => {
      drawCoverFrame(ctx, img, w, h);
    });

    // ── Phase 2: Start high-performance worker pool preload ──────────────────
    startHeroFramesPreload(16);

    // ── Initialize text stages ───────────────────────────────────────────────
    textStageRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 40 });
    });

    // ── Start RAF render loop ────────────────────────────────────────────────
    rafRef.current = requestAnimationFrame(renderLoop);

    // ── GSAP ScrollTrigger — pin + drive targetFrame ─────────────────────────
    const ctx2 = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        pin: pinContainerRef.current || section,
        start: "top top",
        end: "+=400%",
        // scrub: true means instant progress updates — our RAF lerp does the easing
        scrub: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Map progress [0,1] → frame index [0, TOTAL_FRAMES-1]
          targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

          // Fade out scroll indicator after first scroll
          if (progress > 0.02 && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 0,
              y: -10,
              duration: 0.5,
              overwrite: true,
            });
          }

          // Show/hide text stages based on progress
          heroStages.forEach((stage, i) => {
            const el = textStageRefs.current[i];
            if (!el) return;

            const { startPct, endPct } = stage;
            const midFade = (endPct - startPct) * 0.15;

            if (progress >= startPct && progress <= endPct) {
              let localProgress: number;
              if (progress < startPct + midFade) {
                // Fade in
                localProgress = (progress - startPct) / midFade;
                gsap.to(el, {
                  opacity: localProgress,
                  y: (1 - localProgress) * 30,
                  duration: 0,
                });
              } else if (progress > endPct - midFade) {
                // Fade out
                localProgress =
                  1 - (progress - (endPct - midFade)) / midFade;
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
                y: progress < startPct ? 30 : -20,
                duration: 0,
              });
            }
          });
        },
      });
    }, section);

    // ── Resize handler ───────────────────────────────────────────────────────
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      ctx2.revert();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      loadingSet.current.clear();
      ctxRef.current = null;
    };
  }, [loadFrame, renderLoop, resizeCanvas]);

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen"
      id="hero"
      aria-label="Vrindavan Group — Cinematic Hero"
    >
      <div
        ref={pinContainerRef}
        className="hero-pin-wrapper relative w-full h-screen overflow-hidden"
      >
        {/* Canvas — scroll-controlled frame sequence (replaces video) */}
        <canvas
        ref={canvasRef}
        className="hero-canvas"
        aria-hidden="true"
      />

      {/* Dark gradient overlay — z-index: 10 */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette bottom — z-index: 10 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(248,245,240,0.9) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Text Overlay Container — z-index: 20 */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 flex items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="container-wide">
          {heroStages.map((stage, i) => (
            <div
              key={i}
              ref={(el) => {
                textStageRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center"
              aria-hidden={i > 0}
            >
              <div className="container-wide">
                <div className="max-w-3xl">
                  {/* Eyebrow */}
                  {stage.eyebrow && (
                    <p className="font-body text-xs md:text-sm font-medium tracking-[0.3em] text-brand-gold mb-4 uppercase">
                      {stage.eyebrow}
                    </p>
                  )}

                  {/* Main Title */}
                  <h1
                    className="font-heading font-bold text-white leading-[0.9] mb-4 whitespace-pre-line"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 8rem)",
                    }}
                  >
                    {stage.title}
                  </h1>

                  {/* Subtitle */}
                  {stage.subtitle && (
                    <p
                      className="font-body font-light tracking-[0.15em] text-white/80 uppercase mb-4"
                      style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)" }}
                    >
                      {stage.subtitle}
                    </p>
                  )}

                  {/* Body */}
                  {stage.body && (
                    <p
                      className="font-body text-white/70 leading-relaxed max-w-lg"
                      style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.125rem)" }}
                    >
                      {stage.body}
                    </p>
                  )}

                  {/* CTAs */}
                  {stage.ctas && stage.ctas.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-8">
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
            </div>
          ))}
        </div>
      </div>

      {/* Progress Line — z-index: 30 */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div
          className="w-px bg-white/20 relative overflow-hidden"
          style={{ height: 80 }}
        >
          <div
            id="hero-progress-line"
            className="absolute top-0 left-0 right-0 bg-brand-gold"
            style={{ height: "0%" }}
          />
        </div>
        <span
          className="text-white/40 text-[10px] font-body tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>

      {/* Scroll Indicator — z-index: 30 */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-6 h-9 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll-down" />
        </div>
        <p className="font-body text-white/60 text-xs tracking-[0.2em] uppercase">
          Scroll to Explore
        </p>
      </div>

      {/* Corner decoration — z-index: 30 */}
      <div
        className="absolute top-6 right-8 z-30 hidden lg:block"
        aria-hidden="true"
      >
        <p className="font-body text-white/30 text-[10px] tracking-widest uppercase">
          {new Date().getFullYear()}
        </p>
      </div>
      </div>
    </section>
  );
}
