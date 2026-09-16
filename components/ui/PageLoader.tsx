"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1700;

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
          setTimeout(() => setVisible(false), 700);
        }, 150);
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
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: "#FAF8F5" }}
          role="status"
          aria-label="Loading Vrindavan Group"
        >
          {/* Subtle warm luxury background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(201, 168, 76, 0.15) 0%, rgba(250, 248, 245, 0.96) 80%)",
            }}
            aria-hidden="true"
          />

          {/* ── Centered Hovering / Floating Animation Stage ── */}
          <div className="relative flex items-center justify-center mb-6">
            {/* Outer Orbiting Ring 1 with Rotating Particle */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 310,
                height: 310,
                border: "1px dashed rgba(201, 168, 76, 0.25)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              {/* Gold orbiting diamond */}
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-brand-gold rounded-full shadow-md"
                style={{
                  boxShadow: "0 0 10px rgba(201, 168, 76, 0.8)",
                }}
              />
            </motion.div>

            {/* Middle Breathing Accent Ring 2 */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 240,
                height: 240,
                border: "1px solid rgba(201, 168, 76, 0.35)",
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.6, 0.2, 0.6],
                rotate: -360,
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 24, repeat: Infinity, ease: "linear" },
              }}
              aria-hidden="true"
            />

            {/* Inner Pulsing Glow Aura */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 170,
                height: 170,
                background:
                  "radial-gradient(circle, rgba(201, 168, 76, 0.22) 0%, transparent 70%)",
              }}
              animate={{
                scale: [0.9, 1.25, 0.9],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            />

            {/* ── Official Brand Logo with Hovering / Floating Effect ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{
                opacity: 1,
                scale: [1, 1.03, 1],
                y: [-7, 7, -7],
              }}
              transition={{
                opacity: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative z-10 flex items-center justify-center p-4"
            >
              <div
                className="relative drop-shadow-md"
                style={{ width: "240px", height: "76px" }}
              >
                <Image
                  src="/logo/vrindavan-logo.png"
                  alt="Vrindavan Group"
                  fill
                  priority
                  sizes="240px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Subtitle / Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="relative z-10 mb-7 text-center"
            style={{
              fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.32em",
              color: "#8c6f2d",
              textTransform: "uppercase",
            }}
          >
            16+ Years of Trust &bull; Indore
          </motion.p>

          {/* Progress bar container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-2.5"
          >
            <div
              style={{
                width: 190,
                height: 3,
                background: "rgba(201, 168, 76, 0.18)",
                borderRadius: "3px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, #a07830, #c9a84c, #dfc272)",
                  width: `${progress}%`,
                  borderRadius: "3px",
                  transition: "width 0.05s linear",
                  boxShadow: "0 0 10px rgba(201,168,76,0.5)",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "#7a6229",
              }}
            >
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
