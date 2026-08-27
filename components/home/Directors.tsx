"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Quote, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const directors = [
  {
    id: "dir-1",
    name: "Sumit Jain ",
    position: "Managing Director",
    photo: "/images/directors/sumitjain.jpeg",
    awards: ["Best Developer Award 2023", "Excellence in Real Estate MP"],
    quote: "We don't just build structures — we build the foundation of families' dreams.",
  },
  {
    id: "dir-2",
    name: "Manish Jain",
    position: "Chairman",
    photo: "/images/directors/manishbhaiya2.jpeg",
    awards: ["DAINIK BHASKAR EMINENCE AWARD 2024", "Infrastructure Excellence Award"],
    quote: "Quality is never an accident; it is always the result of intelligent effort.",
  },
  {
    id: "dir-3",
    name: "Vishal Joshi",
    position: "Director",
    photo: "/images/directors/vishal.png",
    awards: ["Top Real Estate Brand Indore 2023", "Consumer Trust Award"],
    quote: "Every home we deliver is a promise kept and a relationship earned.",
  },
  {
    id: "dir-4",
    name: "Harshit Sultania",
    position: "Director",
    photo: "/images/directors/harshit.jpeg",
    awards: ["Best CFO in Real Estate Central India", "RERA Compliance Champion"],
    quote: "Discipline in planning today creates landmarks that stand for generations.",
  },
];

export default function Directors() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dir-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".dir-heading", start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".dir-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".dir-cards-grid", start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="directors"
      className="section-padding"
      style={{ background: "#FAFAF8" }}
      aria-labelledby="directors-heading"
    >
      <div className="container-wide">
        <div className="dir-heading opacity-0 text-center mb-14">
          <p className="section-label">Leadership</p>
          <h2
            id="directors-heading"
            className="font-heading font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "#111111", lineHeight: 1.05 }}
          >
            The Visionaries{" "}
            <em className="not-italic" style={{ color: "#c9a84c" }}>Behind Vrindavan</em>
          </h2>
          <p
            className="font-body mt-4 mx-auto"
            style={{ color: "#888888", fontSize: "clamp(0.88rem, 1.1vw, 1rem)", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}
          >
            Decades of experience, hundreds of families homed, and a shared commitment
            to building communities that endure.
          </p>
        </div>

        <div
          className="dir-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
          role="list"
          aria-label="Company directors"
        >
          {directors.map((dir) => (
            <article
              key={dir.id}
              id={dir.id}
              role="listitem"
              className="dir-card opacity-0 group flex flex-col bg-white border border-[#e8e3d8] overflow-hidden transition-all duration-400 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-[#c9a84c]/40"
              style={{ borderRadius: "2px" }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "1/1", background: "#e8e3d8" }}
              >
                <Image
                  src={dir.photo}
                  alt={dir.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 23vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: "#c9a84c" }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="mb-4">
                  <h3
                    className="font-heading font-bold leading-tight mb-1"
                    style={{ fontSize: "1.05rem", color: "#111111" }}
                  >
                    {dir.name}
                  </h3>
                  <p
                    className="font-body"
                    style={{ color: "#c9a84c", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {dir.position}
                  </p>
                </div>

                <div
                  className="flex items-start gap-2 mb-4 px-3 py-2.5"
                  style={{ background: "rgba(201,168,76,0.06)", borderLeft: "2px solid #c9a84c" }}
                >
                  <Quote size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#c9a84c" }} />
                  <p
                    className="font-body italic"
                    style={{ color: "#555555", fontSize: "0.75rem", lineHeight: 1.5 }}
                  >
                    {dir.quote}
                  </p>
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Trophy size={11} style={{ color: "#c9a84c" }} />
                    <p
                      className="font-body font-semibold"
                      style={{ color: "#888888", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      Awards
                    </p>
                  </div>
                  {dir.awards.map((award, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Award size={10} className="flex-shrink-0 mt-0.5" style={{ color: "#c9a84c" }} />
                      <p
                        className="font-body"
                        style={{ color: "#555555", fontSize: "0.72rem", lineHeight: 1.45 }}
                      >
                        {award}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
          aria-label="Company achievements"
        >
          {[
            { num: "20+", label: "Years of Experience" },
            { num: "8", label: "Completed Projects" },
            { num: "10+", label: "Ongoing Projects" },
            { num: "4000+", label: "Happy Families" },
            { num: "4", label: "National Awards" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4"
              style={{ border: "1px solid #e8e3d8" }}
            >
              <p
                className="font-heading font-bold"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#c9a84c", lineHeight: 1 }}
              >
                {stat.num}
              </p>
              <p
                className="font-body mt-1"
                style={{ color: "#888888", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
