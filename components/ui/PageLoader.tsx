"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1800;

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("vg-loader-shown")) {
      setLoading(false);
      setVisible(false);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const raw = elapsed / DURATION;
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 2.5);
      setProgress(Math.min(eased * 100, 100));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("vg-loader-shown", "1");
          setTimeout(() => setVisible(false), 800);
        }, 200);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{ background: "#0A0A0A" }}
          role="status"
          aria-label="Loading Vrindavan Group"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Animated rings */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 220, height: 220, border: "1px solid rgba(201,168,76,0.12)" }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.08, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 150, height: 150, border: "1px solid rgba(201,168,76,0.2)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            aria-hidden="true"
          />

          {/* ── Text Logo — always visible on dark bg ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 mb-3 text-center"
          >
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                fontWeight: 700,
                color: "white",
                letterSpacing: "0.08em",
                lineHeight: 1,
              }}
            >
              VRINDAVAN
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                color: "#c9a84c",
                letterSpacing: "0.65em",
                marginTop: "6px",
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
            transition={{ delay: 0.5, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 mb-10"
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.45em",
              color: "rgba(201,168,76,0.55)",
              textTransform: "uppercase",
            }}
          >
            A Tradition of Trust
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div style={{ width: 160, height: 1, background: "rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, #a07830, #c9a84c, #e0c578)",
                  width: `${progress}%`,
                  transition: "width 0.06s linear",
                  boxShadow: "0 0 8px rgba(201,168,76,0.5)",
                }}
              />
            </div>
            <p style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)" }}>
              {Math.round(progress)}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
