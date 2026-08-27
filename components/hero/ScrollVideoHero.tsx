"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Configuration ─────────────────────────────────────────────────────────
const TOTAL_FRAMES = 480;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame_${String(i).padStart(6, "0")}.jpeg`;

/** Lerp factor — controls cinematic inertia (0.12 = smooth and responsive) */
const LERP_FACTOR = 0.14;

/** How many frames to eagerly preload on initial load */
const INITIAL_PRELOAD_COUNT = 24;

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
      { label: "Book Site Visit", href: "#contact", variant: "outline" },
    ],
  },
  {
    startPct: 0.22,
    endPct: 0.42,
    eyebrow: "LEGACY OF EXCELLENCE",
    title: "20+ YEARS",
    subtitle: "OF UNMATCHED TRUST & VISION",
    body: "Creating thoughtfully planned gated townships across prime growth locations in Indore.",
  },
  {
    startPct: 0.46,
    endPct: 0.64,
    eyebrow: "OUR COMMUNITY",
    title: "2000+",
    subtitle: "HAPPY & DELIGHTED FAMILIES",
    body: "Thousands of families have made Vrindavan their lifelong sanctuary of peace, luxury, and pride.",
  },
  {
    startPct: 0.68,
    endPct: 0.84,
    eyebrow: "PRIME LANDMARKS",
    title: "PREMIUM\nTOWNSHIPS",
    subtitle: "ACROSS INDORE'S GROWTH CORRIDORS",
    body: "Super Corridor, Rau, SuryaMandir RRCAT, AB Road — RERA approved, high-appreciation properties.",
  },
  {
    startPct: 0.88,
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
    sw = imgH * canvasAspect;
    sx = (imgW - sw) / 2;
  } else {
    sh = imgW / canvasAspect;
    sy = (imgH - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const textStageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation state refs (no re-renders)
  const rafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasDims = useRef({ w: 0, h: 0 });

  // ── Canvas resize helper ───────────────────────────────────────────────────
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

    const img = frameCache.current.get(Math.round(currentFrameRef.current));
    if (img?.complete && img.naturalWidth) {
      ctx.clearRect(0, 0, w, h);
      drawCoverFrame(ctx, img, w, h);
    }
  }, []);

  // ── Frame Loader ──────────────────────────────────────────────────────────
  const loadFrame = useCallback(
    (index: number, onLoad?: (img: HTMLImageElement) => void) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      if (frameCache.current.has(index)) {
        const img = frameCache.current.get(index)!;
        if (img.complete && img.naturalWidth && onLoad) {
          onLoad(img);
        }
        return;
      }
      if (loadingSet.current.has(index)) return;

      loadingSet.current.add(index);
      const img = new window.Image();
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

  // ── On-demand preload around current frame ─────────────────────────────────
  const preloadAround = useCallback(
    (center: number, radius: number) => {
      for (let i = 0; i <= radius; i++) {
        loadFrame(center + i);
        if (i > 0) loadFrame(center - i);
      }
    },
    [loadFrame]
  );

  // ── Get nearest loaded frame (zero black frames) ──────────────────────────
  const getNearestLoadedFrame = useCallback((target: number): HTMLImageElement | null => {
    const cache = frameCache.current;
    if (cache.has(target)) {
      const img = cache.get(target)!;
      if (img.complete && img.naturalWidth) return img;
    }

    for (let radius = 1; radius < 40; radius++) {
      const prev = cache.get(target - radius);
      if (prev?.complete && prev.naturalWidth) return prev;
      const next = cache.get(target + radius);
      if (next?.complete && next.naturalWidth) return next;
    }
    return null;
  }, []);

  // ── RAF render loop (strictly scroll-driven) ──────────────────────────────
  const renderLoop = useCallback(() => {
    const ctx = ctxRef.current;
    const { w, h } = canvasDims.current;

    // Lerp currentFrame towards targetFrame (set strictly by scroll progress)
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

    // Update progress bar
    const progressLine = document.getElementById("hero-progress-line");
    if (progressLine) {
      const pct = (targetFrameRef.current / (TOTAL_FRAMES - 1)) * 100;
      progressLine.style.height = `${pct}%`;
    }

    // Dynamic preload around current position
    preloadAround(frameIdx, 12);

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [getNearestLoadedFrame, preloadAround]);

  // ── Main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !canvas || !pinContainer) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    // Initial size
    resizeCanvas();

    // Load first frame immediately
    loadFrame(0, (img) => {
      const { w, h } = canvasDims.current;
      if (w && h) {
        ctx.clearRect(0, 0, w, h);
        drawCoverFrame(ctx, img, w, h);
      }
    });

    // Eagerly preload initial window
    for (let i = 1; i <= INITIAL_PRELOAD_COUNT; i++) {
      loadFrame(i);
    }

    // Initialize text stages visibility
    textStageRefs.current.forEach((el, index) => {
      if (el) {
        gsap.set(el, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 30 });
      }
    });

    // Start RAF loop
    rafRef.current = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger: Pin section and scrub targetFrame directly with scroll
    const ctx2 = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: pinContainer,
        start: "top top",
        end: "+=380%",
        scrub: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Target frame is strictly locked to scroll progress
          targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

          // Scroll indicator fade
          if (progress > 0.03 && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 0,
              y: -15,
              duration: 0.35,
              overwrite: true,
            });
          } else if (progress <= 0.03 && scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              overwrite: true,
            });
          }

          // Text stages transition based on scroll position
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

    // Resize listener
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
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
      className="relative w-full min-h-screen bg-[#0A0A0A]"
      id="hero"
      aria-label="Vrindavan Group — Scroll Controlled Hero"
    >
      <div
        ref={pinContainerRef}
        className="hero-pin-wrapper relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      >
        {/* Canvas — strictly scroll-controlled frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        />

        {/* Cinematic dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.65) 100%)",
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
                    <p className="font-body text-white/80 leading-relaxed max-w-xl mb-6 text-sm md:text-base drop-shadow">
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
            Scroll to Scrub
          </p>
        </div>
      </div>
    </section>
  );
}
