"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "Vrindavan Group ke saath plot lene ka experience bahut achha raha. Location achhi hai aur poori process transparent thi. Family ke future ke liye ek achha decision laga.",
    author: "Homebuyer",
    project: "Vrindavan Green",
    initials: "HB",
  },
  {
    id: 2,
    quote: "Hum apne dream home ke liye ek trusted project dhundh rahe the. Vrindavan Group ki team ne har step par properly guide kiya. Overall experience kaafi smooth raha.",
    author: "Plot Buyer",
    project: "Vrindavan ",
    initials: "PB",
  },
  {
    id: 3,
    quote: "Investment ke purpose se Vrindavan Group mein property li thi. Location aur development dono achhe lage. Team ka behaviour bhi professional aur supportive raha.",
    author: "Investor",
    project: "Vrindavan Grand",
    initials: "IV",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "#F0EDE6" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Customer Stories</p>
          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-charcoal"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}
          >
            Trusted By{" "}
            <span style={{ color: "#c9a84c", fontStyle: "italic" }}>Generations</span>{" "}
            of Homebuyers
          </h2>
          <div className="gold-rule-center" style={{ marginTop: "1.5rem" }} />
          <p
            className="font-body mx-auto mt-4"
            style={{ color: "#666666", maxWidth: "480px", marginLeft : "auto", marginRight: "auto", fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
          >
            Over 4000 families have chosen Vrindavan Group. Their experiences speak for themselves.
          </p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1], delay: i * 0.1 }}
              role="listitem"
              className="group relative bg-white flex flex-col gap-6 p-8 transition-all duration-400"
              style={{ border: "1px solid #e8e3d8" }}
            >
              {/* Large decorative quote mark */}
              <div
                className="absolute top-4 right-6 select-none pointer-events-none font-heading font-bold"
                style={{ fontSize: "6rem", lineHeight: 1, color: "rgba(201,168,76,0.1)" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Quote icon */}
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: "#c9a84c",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Quote text */}
              <p
                className="font-body italic flex-1 leading-relaxed"
                style={{ color: "#555555", fontSize: "0.92rem" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: "#e8e3d8" }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "#c9a84c" }}
                >
                  <span
                    className="font-heading font-bold text-charcoal"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm" style={{ color: "#111111" }}>
                    {t.author}
                  </p>
                  <p className="font-body text-xs" style={{ color: "#aaaaaa", letterSpacing: "0.05em" }}>
                    {t.project}
                  </p>
                </div>
              </div>

              {/* Gold bottom border reveal */}
              <div
                className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ height: "2px", background: "#c9a84c" }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        <p
          className="text-center mt-8 font-body"
          style={{ color: "#aaaaaa", fontSize: "0.72rem", letterSpacing: "0.06em" }}
        >
        </p>
      </div>
    </section>
  );
}
