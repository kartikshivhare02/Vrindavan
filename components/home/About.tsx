"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

interface Stat { value: string; label: string; suffix?: string; }

const stats: Stat[] = [
  { value: "20", label: "Years of Trust", suffix: "+" },
  { value: "4000", label: "Families Served", suffix: "+" },
  { value: "10", label: "Developments", suffix: "+" },
  { value: "RERA", label: "Approved" },
];

function AnimatedStat({ stat, delay }: { stat: Stat; delay: number }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statRef.current;
    const valueEl = valueRef.current;
    if (!el || !valueEl) return;
    const isNumeric = !isNaN(Number(stat.value));

    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay,
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    });

    if (isNumeric) {
      const target = parseInt(stat.value, 10);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target, duration: 1.8, ease: "power2.out", delay: delay + 0.3,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        onUpdate: () => { if (valueEl) valueEl.textContent = Math.round(counter.val).toString(); },
      });
    }
  }, [stat, delay]);

  return (
    <div
      ref={statRef}
      className="opacity-0 text-center p-6"
      style={{ borderRight: "1px solid rgba(201,168,76,0.12)" }}
    >
      <p
        className="font-heading font-bold leading-none mb-2"
        style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#111111" }}
      >
        <span ref={valueRef}>{stat.value}</span>
        {stat.suffix && (
          <span style={{ color: "#c9a84c" }}>{stat.suffix}</span>
        )}
      </p>
      <p
        className="font-body uppercase"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#888888" }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      // Subtle parallax on image
      gsap.fromTo(imgRef.current, { scale: 1.06 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", scrub: 1.5 },
      });
      // Text reveal
      const textEls = textRef.current?.querySelectorAll(".reveal-el");
      if (textEls) {
        gsap.fromTo(textEls, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: textRef.current, start: "top 77%", once: true },
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
      style={{ background: "#FAFAF8" }}
      aria-labelledby="about-heading"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Image Column */}
          <div className="relative" style={{ aspectRatio: "4/5" }}>
            {/* Decorative gold frame */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: 0,
                border: "1px solid rgba(201,168,76,0.2)",
                transform: "translate(14px, 14px)",
                zIndex: 0,
              }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden w-full h-full" style={{ zIndex: 1 }}>
              <div ref={imgRef} className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/projects/CTA/CTA.jpeg"
                  alt="Vrindavan Group premium residential development in Indore"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Subtle bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }}
                aria-hidden="true"
              />
            </div>

            {/* Experience badge */}
            <div
              className="absolute bottom-8 left-8 z-20 px-6 py-4"
              style={{ background: "#111111" }}
            >
              <p className="font-heading font-bold text-white leading-none" style={{ fontSize: "2.2rem" }}>
                {siteConfig.experience}
                <span style={{ color: "#c9a84c" }}>+</span>
              </p>
              <p
                className="font-body text-white/50 mt-1"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                Years of Trust
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div ref={textRef} className="space-y-7">
            <p className="reveal-el section-label">About Vrindavan Group</p>

            <h2
              id="about-heading"
              className="reveal-el font-heading font-bold text-charcoal leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
            >
              Building More Than{" "}
              <span style={{ color: "#c9a84c" }}>Properties</span>.{" "}
              Building Trust.
            </h2>

            <div className="reveal-el gold-rule" />

            <div
              className="reveal-el space-y-4 leading-relaxed"
              style={{ color: "#666666", fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)" }}
            >
              <p>
                Vrindavan Group is one of Indore&apos;s most trusted real-estate
                developers  focused on creating thoughtfully planned residential
                communities in carefully selected locations.
              </p>
              <p>
                With over two decades of experience, our journey has been built
                on transparency, quality craftsmanship, and long-term customer
                relationships that outlast the transaction.
              </p>
            </div>

            <blockquote
              className="reveal-el py-5 pl-6"
              style={{ borderLeft: "2px solid #c9a84c" }}
            >
              <p
                className="font-heading italic"
                style={{ color: "#111111", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.6 }}
              >
                &ldquo;20+ Years. 4000+ Families. One Foundation — Trust.&rdquo;
              </p>
            </blockquote>

            {/* Stats row */}
            <div
              className="reveal-el grid grid-cols-4 gap-0 overflow-hidden"
              style={{ borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)", borderLeft: "1px solid rgba(201,168,76,0.12)" }}
            >
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} stat={stat} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
