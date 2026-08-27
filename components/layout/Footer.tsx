"use client";

import Link from "next/link";
import { Phone, MessageSquare, ArrowUpRight, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { formatWhatsAppUrl } from "@/lib/utils";

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    siteConfig.channelPartner.whatsappMessage
  );

  return (
    <footer
      className="font-body"
      role="contentinfo"
      aria-label="Site footer"
      style={{ background: "#0A0A0A", color: "rgba(255,255,255,0.5)" }}
    >
      {/* Gold top accent */}
      <div
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
        aria-hidden="true"
      />

      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Text-based logo — always visible on dark bg */}
            <Link href="/" className="inline-block" aria-label="Vrindavan Group Home">
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "0.07em",
                    lineHeight: 1,
                  }}
                >
                  VRINDAVAN
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
                    fontSize: "0.52rem",
                    fontWeight: 600,
                    color: "#c9a84c",
                    letterSpacing: "0.55em",
                    marginTop: "5px",
                  }}
                >
                  GROUP
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Creating thoughtfully planned real-estate communities in Indore
              for over two decades. Built on trust. Designed for families.
            </p>

            {/* Stats */}
            <div className="flex gap-6">
              <div>
                <p className="font-heading font-bold text-white" style={{ fontSize: "1.6rem" }}>
                  {siteConfig.experience}
                </p>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Yrs Experience
                </p>
              </div>
              <div style={{ width: "1px", background: "rgba(201,168,76,0.15)", alignSelf: "stretch" }} aria-hidden="true" />
              <div>
                <p className="font-heading font-bold text-white" style={{ fontSize: "1.6rem" }}>
                  {siteConfig.satisfiedFamilies}
                </p>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Families
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {([
                { href:"https://www.instagram.com/vrindavangroup.indore?igsi=MW1rMnJwOXZic2owdA==", label: "Instagram", Icon: SocialIcons.Instagram, id: "footer-instagram" },
                { href:"https://www.facebook.com/profile.php?id=100054539501007",  label: "Facebook",  Icon: SocialIcons.Facebook,  id: "footer-facebook" },
              ] as const).map(({ href, label, Icon, id }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 text-white/50 hover:text-brand-gold"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={id}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h3
              className="font-body font-semibold text-white"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home",          href: "/" },
                { label: "About Us",      href: "/#about" },
                { label: "Projects",      href: "/projects" },
                { label: "Amenities",     href: "/#lifestyle" },
                { label: "Why Vrindavan", href: "/#why-vrindavan" },
                { label: "Contact",       href: "/#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-brand-gold transition-colors duration-300 flex items-center gap-1 group"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-5">
            <h3
              className="font-body font-semibold text-white"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Our Projects
            </h3>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm hover:text-brand-gold transition-colors duration-300 flex items-center gap-1 group"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span>{project.name}</span>
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3
              className="font-body font-semibold text-white"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Property Consultant
            </h3>
            <div className="space-y-1">
              <p className="text-white font-medium text-sm">{siteConfig.channelPartner.name}</p>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
                {siteConfig.channelPartner.title}
              </p>
            </div>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.channelPartner.phone}`}
                className="flex items-center gap-3 text-sm hover:text-brand-gold transition-colors group"
                style={{ color: "rgba(255,255,255,0.5)" }}
                id="footer-phone"
              >
                <Phone size={13} className="text-brand-gold" />
                {siteConfig.channelPartner.phone}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-brand-gold transition-colors group"
                style={{ color: "rgba(255,255,255,0.5)" }}
                id="footer-whatsapp"
              >
                <MessageSquare size={13} className="text-brand-gold" />
                WhatsApp
              </a>
            </div>
            <Link
              href="/#contact"
              className="btn-base btn-outline-gold w-full text-[0.68rem] py-2.5 px-4 justify-center"
              id="footer-enquire-btn"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}
        >
          <p>© {currentYear} {siteConfig.companyName}. All Rights Reserved.</p>
          <div className="flex flex-col items-center md:items-start gap-1">
            <p style={{ color: "rgba(255,255,255,0.18)" }}>
              Sales assistance through authorised channel partner.
            </p>
            <div className="flex items-center gap-1.5 justify-center md:justify-start" style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.68rem" }}>
              <Globe size={11} className="text-brand-gold/70" />
              <span>Web by <a href="tel:+919098908188" className="hover:text-brand-gold transition-colors font-medium">Kartikey Shivhare (+91 9098908188)</a></span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms",          label: "Terms" },
              { href: "/disclaimer",     label: "Disclaimer" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="hover:text-brand-gold transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
