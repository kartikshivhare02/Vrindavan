"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Configuration ─────────────────────────────────────────────────────────
const TOTAL_FRAMES = 72;
const FRAME_PATH = (i: number) =>
  `/hero-webp/frame_${String(i).padStart(3, "0")}.webp`;

/** Smooth lerp factor — controls cinematic inertia (0.12 = responsive & velvety) */
const LERP_FACTOR = 0.12;

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
    endPct: 0.40,
    title: "20+ YEARS",
    subtitle: "OF TRUST & EXPERIENCE",
    body: "Creating thoughtfully planned communities and helping families find a place they can proudly call home.",
  },
  {
    startPct: 0.44,
    endPct: 0.62,
    title: "2000+",
    subtitle: "HAPPY FAMILIES",
    body: "Thousands of families. One foundation — trust.",
  },
  {
    startPct: 0.66,
    endPct: 0.82,
    title: "PREMIUM\nPROJECTS",
    subtitle: "ACROSS INDORE",
    body: "Prime locations. Modern amenities. RERA-approved developments.",
  },
  {
    startPct: 0.85,
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

  let sx = 0,
    sy = 0,
    sw = imgW,
    sh = imgH;

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

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textStageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation state refs (no re-renders)
  const rafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasDims = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // ── Resize canvas to match high-DPI displays ─────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    canvasDims.current = { w, h };

    const currentImg = frameCache.current.get(
      Math.round(currentFrameRef.current)
    );
    if (currentImg?.complete && currentImg.naturalWidth) {
      ctx.clearRect(0, 0, w, h);
      drawCoverFrame(ctx, currentImg, w, h);
    }
  }, []);

  // ── Single frame loader with memory cache ─────────────────────────────────
  const loadFrame = useCallback(
    (index: number, onLoad?: (img: HTMLImageElement) => void) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (frameCache.current.has(index)) {
        if (onLoad) onLoad(frameCache.current.get(index)!);
        return;
      }
      if (loadingSet.current.has(index)) return;

      loadingSet.current.add(index);
      const img = new Image();
      img.src = FRAME_PATH(index);
      img.onload = () => {
        frameCache.current.set(index, img);
        loadingSet.current.delete(index);
        if (onLoad) onLoad(img);
      };
      img.onerror = () => {
        loadingSet.current.delete(index);
      };
    },
    []
  );

  // ── Find nearest available frame (never display black/blank) ──────────────
  const getNearestLoadedFrame = useCallback(
    (target: number): HTMLImageElement | null => {
      const cache = frameCache.current;
      if (cache.has(target)) return cache.get(target)!;

      for (let radius = 1; radius < TOTAL_FRAMES; radius++) {
        if (cache.has(target - radius)) return cache.get(target - radius)!;
        if (cache.has(target + radius)) return cache.get(target + radius)!;
      }
      return null;
    },
    []
  );

  // ── Smooth RAF render loop (lerp + canvas draw) ───────────────────────────
  const renderLoop = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.001) {
      currentFrameRef.current += diff * LERP_FACTOR;
    } else {
      currentFrameRef.current = target;
    }

    const frameToDraw = Math.round(currentFrameRef.current);
    const ctx = ctxRef.current;
    const { w, h } = canvasDims.current;

    if (ctx && w > 0 && h > 0) {
      const img = getNearestLoadedFrame(frameToDraw);
      if (img && img.complete && img.naturalWidth) {
        ctx.clearRect(0, 0, w, h);
        drawCoverFrame(ctx, img, w, h);
      }
    }

    // Update progress percentage
    const progress = currentFrameRef.current / (TOTAL_FRAMES - 1);
    if (progressBarRef.current) {
      progressBarRef.current.style.height = `${progress * 100}%`;
    }

    // Animate text stages with smooth sine easing, scale & blur
    heroStages.forEach((stage, i) => {
      const el = textStageRefs.current[i];
      if (!el) return;

      const { startPct, endPct } = stage;
      const fadeBand = (endPct - startPct) * 0.28;

      if (progress >= startPct && progress <= endPct) {
        let opacity = 1;
        let y = 0;
        let scale = 1;
        let blur = 0;

        if (progress < startPct + fadeBand) {
          // Fading in
          const rawT = (progress - startPct) / fadeBand;
          const t = Math.sin((rawT * Math.PI) / 2);
          opacity = t;
          y = (1 - t) * 30;
          scale = 0.97 + t * 0.03;
          blur = (1 - t) * 2.5;
        } else if (progress > endPct - fadeBand) {
          // Fading out
          const rawT = (progress - (endPct - fadeBand)) / fadeBand;
          const t = Math.sin((rawT * Math.PI) / 2);
          opacity = 1 - t;
          y = -t * 24;
          scale = 1 + t * 0.02;
          blur = t * 2.5;
        }

        el.style.opacity = `${opacity}`;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        el.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";
        el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
      } else {
        el.style.opacity = "0";
        el.style.transform = `translate3d(0, ${progress < startPct ? 30 : -24}px, 0) scale(0.97)`;
        el.style.filter = "none";
        el.style.pointerEvents = "none";
      }
    });

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [getNearestLoadedFrame]);

  // ── Main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const canvas = canvasRef.current;
    if (!section || !pinContainer || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    resizeCanvas();

    // ── Phase 1: Draw frame 0 instantly on first mount ───────────────────────
    loadFrame(0, (img) => {
      drawCoverFrame(ctx, img, canvasDims.current.w, canvasDims.current.h);
    });

    if (prefersReduced) return;

    // ── Phase 2: Rapid concurrent preload of remaining 71 frames (~4 MB) ────
    // Load in small concurrent batches so all 72 frames are in memory in <500ms
    let nextIdx = 1;
    const preloadTimer = setInterval(() => {
      if (nextIdx >= TOTAL_FRAMES) {
        clearInterval(preloadTimer);
        return;
      }
      for (let b = 0; b < 6 && nextIdx < TOTAL_FRAMES; b++, nextIdx++) {
        loadFrame(nextIdx);
      }
    }, 20);

    // ── Start RAF render loop ────────────────────────────────────────────────
    rafRef.current = requestAnimationFrame(renderLoop);

    // ── GSAP ScrollTrigger to capture smooth scroll progress ─────────────────
    const ctx2 = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: pinContainer,
        start: "top top",
        end: "+=450%",
        scrub: 0.8,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map scroll progress [0, 1] to frame index [0, 71]
          targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);

          // Fade out scroll indicator gently
          if (scrollIndicatorRef.current) {
            const indOpacity = Math.max(0, 1 - self.progress * 20);
            scrollIndicatorRef.current.style.opacity = `${indOpacity}`;
            scrollIndicatorRef.current.style.transform = `translate3d(-50%, ${self.progress * -20}px, 0)`;
          }
        },
      });
    }, section);

    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearInterval(preloadTimer);
      ctx2.revert();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      frameCache.current.clear();
      loadingSet.current.clear();
      ctxRef.current = null;
    };
  }, [loadFrame, renderLoop, resizeCanvas]);

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
        {/* Hardware-Accelerated 120FPS Canvas Frame Player */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform"
          aria-hidden="true"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.65) 100%)",
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
