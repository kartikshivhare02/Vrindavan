"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Clock, Users, MapPin, Shield, Building2, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: "experience", icon: Clock,     num: "01", title: "20+ Years Experience",   description: "Two decades of real-estate development and long-term customer relationships across Indore." },
  { id: "families",   icon: Users,     num: "02", title: "2000+ Happy Families",   description: "A growing community of families who have chosen Vrindavan for their homes and investments." },
  { id: "location",   icon: MapPin,    num: "03", title: "Prime Locations",        description: "Developments well-connected to Indore's key infrastructure and lifestyle destinations." },
  { id: "rera",       icon: Shield,    num: "04", title: "RERA Approved",          description: "Projects developed with regulatory transparency, responsible planning and full compliance." },
  { id: "quality",    icon: Building2, num: "05", title: "Quality Development",    description: "Attention to planning, infrastructure, landscaping and community living at every project." },
  { id: "investment", icon: TrendingUp,num: "06", title: "Investment Potential",   description: "Projects in growing areas, designed for long-term value appreciation and community growth." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] as const, delay: i * 0.07 },
  }),
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      variants={cardVariants}
      whileHover={{ y: -3 }}
      className="group relative bg-white flex flex-col p-7 cursor-default transition-all duration-400"
      style={{ border: "1px solid #e8e3d8", minHeight: "220px" }}
      id={`why-card-${feature.id}`}
    >
      {/* Number — top right */}
      <span
        className="absolute top-5 right-5 font-heading font-bold"
        style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(201,168,76,0.3)" }}
        aria-hidden="true"
      >
        {feature.num}
      </span>

      {/* Icon */}
      <div
        className="flex items-center justify-center mb-5 flex-shrink-0 transition-colors duration-300"
        style={{
          width: "2.8rem", height: "2.8rem",
          background: "rgba(201,168,76,0.09)",
          border: "1px solid rgba(201,168,76,0.22)",
          color: "#c9a84c",
        }}
      >
        <Icon size={18} />
      </div>

      {/* Title */}
      <h3
        className="font-heading font-semibold mb-3 group-hover:text-brand-gold transition-colors duration-300"
        style={{ fontSize: "1.05rem", color: "#111111", lineHeight: 1.25 }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="font-body text-sm leading-relaxed flex-1"
        style={{ color: "#666666", lineHeight: 1.65 }}
      >
        {feature.description}
      </p>

      {/* Gold bottom line reveal */}
      <div
        className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ height: "2px", background: "#c9a84c" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function WhyVrindavan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 82%", once: true },
      });
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-vrindavan"
      className="section-padding"
      style={{ background: "#F0EDE6" }}
      aria-labelledby="why-heading"
    >
      <div className="container-wide">

        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-14 opacity-0">
          <p className="section-label">Why Choose Us</p>
          <h2
            id="why-heading"
            className="font-heading font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "#111111" }}
          >
            Why Families Choose{" "}
            <span style={{ color: "#c9a84c" }}>Vrindavan</span>
          </h2>
          <div className="gold-rule-center" style={{ marginTop: "1.25rem" }} />
          <p
            className="font-body mx-auto mt-4"
            style={{ color: "#666666", maxWidth: "400px", marginLeft: "auto", marginRight: "auto", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", lineHeight: 1.7 }}
          >
            Two decades of experience, thousands of happy families, and a
            commitment to building communities you can trust.
          </p>
        </div>

        {/* 3-column card grid — proper spacing */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Why choose Vrindavan Group"
        >
          {features.map((feature, index) => (
            <div key={feature.id} role="listitem">
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
