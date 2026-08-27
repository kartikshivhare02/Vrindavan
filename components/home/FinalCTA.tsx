"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "2000+", label: "Happy Families" },
  { value: "RERA", label: "Approved" },
];

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden"
      style={{ minHeight: "65vh" }}
      aria-labelledby="final-cta-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/projects/CTA/CTA.jpeg"
          alt="Vrindavan Group — premium residential community"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
        />
        {/* Rich dark overlay — warm gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(10,10,8,0.88) 0%, rgba(18,14,6,0.8) 50%, rgba(10,10,8,0.92) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle gold radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Thin gold top border */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "2px", background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 container-wide section-padding flex flex-col items-center justify-center text-center"
        style={{ minHeight: "inherit" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="space-y-6 max-w-3xl"
        >
          <p className="section-label" style={{ color: "rgba(201,168,76,0.7)" }}>
            Begin Your Journey
          </p>

          <h2
            id="final-cta-heading"
            className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
          >
            Your Next Chapter{" "}
            <em className="not-italic" style={{ color: "#c9a84c" }}>
              Could Begin Here.
            </em>
          </h2>

          <div
            className="mx-auto"
            style={{ width: "3rem", height: "1px", background: "rgba(201,168,76,0.5)" }}
            aria-hidden="true"
          />

          <p
            className="font-body leading-relaxed mx-auto"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
              maxWidth: "520px",
            }}
          >
            Explore Vrindavan Group projects and find a property that fits your
            future. Our consultant is ready to guide you every step of the way.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="#projects"
              className="btn-base btn-gold group"
              id="final-cta-projects-btn"
            >
              <span>Explore Projects</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#contact"
              className="btn-base btn-outline-white group"
              id="final-cta-visit-btn"
            >
              <Calendar size={14} />
              Schedule a Site Visit
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center justify-center gap-0 pt-10 mt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            aria-label="Company statistics"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="text-center px-8 py-2">
                  <p
                    className="font-heading font-bold text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-body mt-1"
                    style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {stat.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="h-10"
                    style={{ width: "1px", background: "rgba(201,168,76,0.2)" }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
