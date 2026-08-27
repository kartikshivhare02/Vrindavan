"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Eye, Heart, Hammer, Headset, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: <Shield size={20} />,       num: "01", label: "RERA Approved Projects" },
  { icon: <Eye size={20} />,          num: "02", label: "Transparent Process" },
  { icon: <Heart size={20} />,        num: "03", label: "Customer-Focused" },
  { icon: <Hammer size={20} />,       num: "04", label: "Quality Infrastructure" },
  { icon: <Headset size={20} />,      num: "05", label: "Reliable Support" },
  { icon: <CheckCircle2 size={20} />, num: "06", label: "Regulatory Compliance" },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".trust-badge", { opacity: 0, y: 24, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".trust-badges-grid", start: "top 82%", once: true },
      });
      gsap.fromTo(".trust-heading", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".trust-heading", start: "top 82%", once: true },
      });
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f2a1e 0%, #1a3d2b 50%, #0f2a1e 100%)" }}
      aria-labelledby="trust-heading"
    >
      {/* Gold grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(201,168,76,0.015) 0px,
            rgba(201,168,76,0.015) 1px,
            transparent 1px,
            transparent 8px
          )`,
        }}
        aria-hidden="true"
      />
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div>
            <p className="section-label">Our Commitment</p>
            <h2
              id="trust-heading"
              className="trust-heading opacity-0 font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 1.05 }}
            >
              Transparency You{" "}
              <span style={{ color: "#c9a84c" }}>Can Build On</span>
            </h2>

            <div className="mb-8" style={{ width: "3rem", height: "1px", background: "rgba(201,168,76,0.5)" }} />

            <p
              className="font-body leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)" }}
            >
              Vrindavan Group believes that trust starts with transparency. Our
              developments focus on responsible planning, clear communication
              and regulatory compliance — because every family deserves
              confidence in the home they choose.
            </p>

            {/* RERA Callout */}
            <div
              className="flex items-center gap-5 p-6"
              style={{
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "#c9a84c",
                }}
              >
                <Shield size={20} />
              </div>
              <div>
                <p className="font-heading font-semibold text-white" style={{ fontSize: "1.1rem" }}>
                  RERA Approved
                </p>
                <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                  All Vrindavan Group projects comply with RERA guidelines.
                  Numbers available project-wise.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Badges */}
          <div
            className="trust-badges-grid grid grid-cols-2 sm:grid-cols-3 gap-3"
            role="list"
            aria-label="Trust commitments"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                role="listitem"
                className="trust-badge opacity-0 flex flex-col items-center gap-4 py-7 px-4 text-center group cursor-default transition-all duration-350"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center transition-colors duration-300 group-hover:scale-110 transition-transform"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#c9a84c",
                  }}
                >
                  {badge.icon}
                </div>
                <div>
                  <p
                    className="font-body font-medium"
                    style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", lineHeight: 1.4 }}
                  >
                    {badge.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
