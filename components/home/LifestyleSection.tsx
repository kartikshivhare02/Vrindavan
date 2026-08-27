"use client";

import { motion } from "framer-motion";
import {
  CreditCard, MapPin, Star, Dumbbell,
  Trophy, Flower2, Church, ShieldCheck,
} from "lucide-react";

const amenities = [
  { id: "finance",   Icon: CreditCard,  title: "Easy Finance",        description: "Assistance for convenient financing options." },
  { id: "location",  Icon: MapPin,       title: "Prime Locations",     description: "Close to schools, transport & lifestyle." },
  { id: "amenities", Icon: Star,         title: "Modern Amenities",    description: "Facilities for everyday comfort and active living." },
  { id: "gym",       Icon: Dumbbell,     title: "Fitness & Gym",       description: "Dedicated spaces for fitness and wellness." },
  { id: "sports",    Icon: Trophy,       title: "Sports Turf",         description: "Recreational areas for all age groups." },
  { id: "garden",    Icon: Flower2,      title: "Landscaped Gardens",  description: "Green spaces to relax and connect." },
  { id: "temple",    Icon: Church,       title: "Temple",              description: "A peaceful spiritual space in the community." },
  { id: "security",  Icon: ShieldCheck,  title: "Safe & Secure",       description: "Thoughtful planning for every resident's safety." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] as const } },
};

export default function LifestyleSection() {
  return (
    <section
      id="lifestyle"
      className="relative section-padding"
      style={{ background: "#111111" }}
      aria-labelledby="lifestyle-heading"
    >
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label">Lifestyle &amp; Amenities</p>
          <h2
            id="lifestyle-heading"
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}
          >
            Designed Around{" "}
            <em className="not-italic" style={{ color: "#c9a84c" }}>Your Lifestyle</em>
          </h2>
          <div className="gold-rule-center" style={{ marginTop: "1.25rem" }} />
          <p
            className="font-body mx-auto mt-4"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "clamp(0.88rem, 1.1vw, 0.98rem)",
              maxWidth: "460px",
              lineHeight: 1.7,
            }}
          >
            Every Vrindavan development is built with amenities that make everyday living richer.
          </p>
        </motion.div>

        {/* ── Single unified bordered frame ── */}
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.25)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4"
            role="list"
            aria-label="Amenities and features"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {amenities.map((item, i) => {
              const { Icon } = item;
              /* Border logic: right border for all except last in each row,
                 bottom border for top row only */
              const col = i % 4;                    // 0-3 (desktop), 0-1 (mobile)
              const row = Math.floor(i / 4);        // 0 or 1
              const lastDesktopCol = col === 3;
              const lastDesktopRow = row === 1;

              return (
                <motion.div
                  key={item.id}
                  role="listitem"
                  variants={itemVariants}
                  className="group flex flex-col items-center text-center cursor-default transition-colors duration-350"
                  style={{
                    padding: "clamp(1.5rem, 3vw, 2.5rem) 1rem",
                    borderRight: lastDesktopCol ? "none" : "1px solid rgba(201,168,76,0.15)",
                    borderBottom: lastDesktopRow ? "none" : "1px solid rgba(201,168,76,0.15)",
                  }}
                  whileHover={{ backgroundColor: "rgba(201,168,76,0.06)" }}
                  id={`amenity-${item.id}`}
                >
                  {/* Icon */}
                  <motion.div
                    className="flex items-center justify-center mb-5"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      background: "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.35)",
                      color: "#c9a84c",
                      flexShrink: 0,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="font-heading font-semibold mb-2 text-white group-hover:text-brand-gold transition-colors duration-300"
                    style={{ fontSize: "0.9rem", lineHeight: 1.3, color: "white" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.72rem",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>

    </section>
  );
}
