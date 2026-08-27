"use client";

import EnquiryForm from "@/components/contact/EnquiryForm";
import { motion } from "framer-motion";

const assurancePoints = [
  "No obligation consultation",
  "Quick response within 24 hours",
  "Personalised property recommendations",
  "Site visit coordination on your schedule",
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "#FAFAF8" }}
      aria-labelledby="contact-heading"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div>
              <p className="section-label">Get In Touch</p>
              <h2
                id="contact-heading"
                className="font-heading font-bold text-charcoal leading-tight"
                style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)" }}
              >
                Find the Right Property{" "}
                <span style={{ color: "#c9a84c" }}>For You</span>
              </h2>
              <div className="gold-rule" />
            </div>

            <p
              className="font-body leading-relaxed"
              style={{ color: "#666666", fontSize: "clamp(0.9rem, 1.05vw, 1rem)" }}
            >
              Tell us what you are looking for and our property consultant will
              connect with you to guide you through the best options based on
              your requirements, location preference and budget.
            </p>

            {/* Assurance Points */}
            <ul className="space-y-3.5" aria-label="Why contact us">
              {assurancePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5"
                    style={{
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: "#c9a84c",
                      fontSize: "0.55rem",
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="font-body text-sm leading-relaxed" style={{ color: "#555555" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust quote */}
            <div
              className="p-6"
              style={{
                background: "rgba(201,168,76,0.05)",
                borderLeft: "2px solid #c9a84c",
              }}
            >
              <p
                className="font-heading italic"
                style={{ color: "#111111", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", lineHeight: 1.6 }}
              >
                &ldquo;20+ Years. 2000+ Families. One Foundation — Trust.&rdquo;
              </p>
              <p
                className="font-body mt-2"
                style={{ color: "#aaaaaa", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                — Vrindavan Group
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            <div
              className="bg-white p-8 md:p-10 shadow-card"
              style={{
                borderTop: "3px solid #c9a84c",
                border: "1px solid #e8e3d8",
                borderTopColor: "#c9a84c",
                borderTopWidth: "3px",
              }}
            >
              <EnquiryForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
