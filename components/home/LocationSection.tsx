"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, BookOpen, Train, Plane, Hospital, ShoppingBag, Road, Building, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { icon: <GraduationCap size={18} />, label: "Schools" },
  { icon: <BookOpen size={18} />,      label: "Colleges" },
  { icon: <Train size={18} />,         label: "Railway" },
  { icon: <Plane size={18} />,         label: "Airport" },
  { icon: <Hospital size={18} />,      label: "Hospitals" },
  { icon: <ShoppingBag size={18} />,   label: "Shopping" },
  { icon: <Road size={18} />,          label: "Roads" },
  { icon: <Building size={18} />,      label: "Business" },
];

const highlights = [
  "Proximity to leading educational institutions",
  "Convenient access to major transport hubs",
  "Healthcare facilities within easy reach",
  "Connected to Indore's growing infrastructure",
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".location-icon-item", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07,
        scrollTrigger: { trigger: ".location-icons-grid", start: "top 82%", once: true },
      });
      gsap.fromTo(".location-text-col", { opacity: 0, x: -28 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".location-text-col", start: "top 82%", once: true },
      });
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="section-padding"
      style={{ background: "#FAFAF8" }}
      aria-labelledby="location-heading"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Side */}
          <div className="location-text-col opacity-0">
            <p className="section-label">Connectivity</p>
            <h2
              id="location-heading"
              className="font-heading font-bold text-charcoal mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.08 }}
            >
              Connected to Everything That{" "}
              <span style={{ color: "#c9a84c" }}>Matters</span>
            </h2>
            <div className="gold-rule mb-8" />
            <p
              className="font-body leading-relaxed mb-8"
              style={{ color: "#666666", fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)" }}
            >
              Selected locations designed to keep everyday essentials and major
              connectivity within comfortable reach. We carefully evaluate each
              site&apos;s access to schools, transport, hospitals and lifestyle
              destinations before development.
            </p>

            <ul className="space-y-3.5" aria-label="Connectivity highlights">
              {highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.1em" }}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span className="font-body text-sm leading-relaxed" style={{ color: "#555555" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Icon Grid + Map */}
          <div>
            {/* 4×2 icon grid */}
            <div
              className="location-icons-grid grid grid-cols-4 gap-3 mb-5"
              role="list"
              aria-label="Nearby amenity categories"
            >
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  role="listitem"
                  className="location-icon-item opacity-0 flex flex-col items-center gap-2.5 py-5 px-2 bg-white group cursor-default text-center transition-all duration-300 hover:shadow-card"
                  style={{ border: "1px solid #e8e3d8" }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#c9a84c",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <p
                    className="font-body font-medium"
                    style={{ color: "#555555", fontSize: "0.7rem", letterSpacing: "0.05em" }}
                  >
                    {cat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Google Maps — Vrindavan Grand */}
            <div
              className="overflow-hidden relative"
              style={{ border: "1px solid #e8e3d8" }}
              aria-label="Google Maps showing Vrindavan Grand location"
            >
              <div style={{ height: 280 }}>
                <iframe
                  title="Vrindavan Grand Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4!2d75.7962981!3d22.6517804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ffa1dcf006ff%3A0x702107c994a34b5b!2sVrindavan%20Grand!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3 bg-white border-t border-[#e8e3d8] flex items-center justify-between">
                <p className="font-body text-xs text-[#555]">
                  SuryaMandir RRCAT, Indore, Madhya Pradesh
                </p>
                <a
                  href="https://maps.app.goo.gl/Bbh2KBct435KMRVKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gold text-[0.7rem] py-1.5 px-3 flex items-center gap-1.5"
                >
                  <MapPin size={12} />
                  <span>Open Maps ↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
