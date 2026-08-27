"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Lightbulb,
  BarChart2,
  Home,
  Star,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: <Lightbulb size={16} />, label: "Project Consultation" },
  { icon: <Home size={16} />, label: "Property Recommendations" },
  { icon: <BarChart2 size={16} />, label: "Investment Guidance" },
  { icon: <MapPin size={16} />, label: "Site Visit Coordination" },
  { icon: <Star size={16} />, label: "Pricing & Availability" },
  { icon: <MessageSquare size={16} />, label: "End-to-End Buyer Support" },
];

export default function ChannelPartner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    siteConfig.channelPartner.whatsappMessage
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".partner-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="channel-partner"
      className="section-padding bg-white"
      aria-labelledby="partner-heading"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image + Badge */}
          <div className="partner-reveal opacity-0 relative flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-full bg-ivory border-2 border-brand-gold/20"
                style={{ width: "280px", height: "280px" }}
              >
                {/* Hardik Shivhare — Channel Partner photo */}
                <Image
                  src="/images/hardikshivhare.png"
                  alt={`${siteConfig.channelPartner.name} — Authorised Channel Partner, Vrindavan Group`}
                  fill
                  className="object-cover object-center"
                  sizes="280px"
                  priority
                />
              </div>

              {/* Authorized badge */}
              <div className="absolute -top-1 -right-1 bg-brand-green text-white px-3 py-1.5 rounded-full shadow-md z-10">
                <p className="font-body tracking-wider uppercase" style={{ fontSize: "0.55rem", fontWeight: 700 }}>
                  Authorised Partner
                </p>
              </div>

              {/* Decorative circular line */}
              <div
                className="absolute -top-2.5 -left-2.5 border border-brand-gold/20 rounded-full pointer-events-none"
                style={{ width: "300px", height: "300px" }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="partner-reveal opacity-0">
              <p className="font-body text-xs font-medium tracking-[0.3em] text-brand-gold uppercase mb-4">
                Your Property Consultant
              </p>
              <h2
                id="partner-heading"
                className="font-heading font-bold text-charcoal"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {siteConfig.channelPartner.name}
              </h2>
              <p className="font-body text-brand-green font-medium tracking-wide mt-1">
                {siteConfig.channelPartner.title}
              </p>
            </div>

            <div className="partner-reveal opacity-0 h-px w-16 bg-brand-gold" aria-hidden="true" />

            <p className="partner-reveal opacity-0 font-body text-charcoal-mid leading-relaxed">
              {siteConfig.channelPartner.name} is an authorised channel partner
              assisting buyers and investors in discovering suitable Vrindavan
              Group properties based on their requirements, preferred location,
              budget and investment goals.
            </p>
            <p className="partner-reveal opacity-0 font-body text-charcoal-mid leading-relaxed">
              From the initial project consultation to site-visit coordination,
              he provides a personalised point of contact throughout your
              property discovery journey.
            </p>

            {/* Services */}
            <div
              className="partner-reveal opacity-0 grid grid-cols-2 gap-3"
              role="list"
              aria-label="Services offered"
            >
              {services.map((service) => (
                <div
                  key={service.label}
                  role="listitem"
                  className="flex items-center gap-2 p-3 rounded-sm bg-ivory border border-ivory-dark hover:border-brand-gold/40 transition-colors duration-300"
                >
                  <span className="text-brand-green flex-shrink-0">
                    {service.icon}
                  </span>
                  <span className="font-body text-charcoal-mid text-xs font-medium">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="partner-reveal opacity-0 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig.channelPartner.phone}`}
                className="btn-base btn-primary group"
                id="partner-call-btn"
                aria-label={`Call ${siteConfig.channelPartner.name}`}
              >
                <Phone size={14} />
                Call {siteConfig.channelPartner.name.split(" ")[0]}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-outline group"
                id="partner-whatsapp-btn"
                aria-label={`WhatsApp ${siteConfig.channelPartner.name}`}
              >
                <MessageSquare size={14} />
                WhatsApp
              </a>
              <a
                href="#contact"
                className="btn-base btn-gold group"
                id="partner-visit-btn"
              >
                <Calendar size={14} />
                Schedule Site Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
