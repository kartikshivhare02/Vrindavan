"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(15);
  const progressRef = useRef(15);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Check if already visited in this session
    if (typeof window !== "undefined" && sessionStorage.getItem("vg-loader-shown")) {
      setLoading(false);
      setVisible(false);
      return;
    }

    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Smooth progress simulation
    const interval = setInterval(() => {
      if (!isLoadedRef.current) {
        // Increment up to 88% while waiting for real assets
        if (progressRef.current < 88) {
          const step = Math.max(1, (88 - progressRef.current) * 0.12);
          progressRef.current = Math.min(88, progressRef.current + step);
          setProgress(Math.round(progressRef.current));
        }
      } else {
        // Assets are ready — accelerate to 100%
        if (progressRef.current < 100) {
          const step = Math.max(3, (100 - progressRef.current) * 0.35);
          progressRef.current = Math.min(100, progressRef.current + step);
          setProgress(Math.round(progressRef.current));
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "";
            sessionStorage.setItem("vg-loader-shown", "1");
            setTimeout(() => setVisible(false), 900);
          }, 350);
        }
      }
    }, 40);

    const onAllLoaded = () => {
      // Allow minimal 1.2s for brand showcase before closing
      setTimeout(() => {
        isLoadedRef.current = true;
      }, 1000);
    };

    if (document.readyState === "complete") {
      onAllLoaded();
    } else {
      window.addEventListener("load", onAllLoaded, { once: true });
    }

    // Safety fallback: auto-complete after 3.5s max even on slow networks
    const fallbackTimer = setTimeout(() => {
      isLoadedRef.current = true;
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", onAllLoaded);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
          style={{ background: "#0A0A0A" }}
          role="status"
          aria-label="Loading Vrindavan Group"
        >
          {/* Radial gold glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Animated pulse rings */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              border: "1px solid rgba(201,168,76,0.15)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 150,
              height: 150,
              border: "1px solid rgba(201,168,76,0.25)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            aria-hidden="true"
          />

          {/* ── Brand Logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 mb-2 text-center"
          >
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              VRINDAVAN
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#c9a84c",
                letterSpacing: "0.65em",
                marginTop: "8px",
                textTransform: "uppercase",
              }}
            >
              GROUP
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 mb-8"
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.35em",
              color: "rgba(201,168,76,0.65)",
              textTransform: "uppercase",
            }}
          >
            A Tradition of Trust & Excellence
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div
              style={{
                width: 180,
                height: 2,
                background: "rgba(255,255,255,0.08)",
                position: "relative",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  background:
                    "linear-gradient(90deg, #966f27, #c9a84c, #e8d49a)",
                  width: `${progress}%`,
                  transition: "width 0.08s linear",
                  boxShadow: "0 0 10px rgba(201,168,76,0.6)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "0.625rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
