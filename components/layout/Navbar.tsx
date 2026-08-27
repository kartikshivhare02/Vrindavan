"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    siteConfig.channelPartner.whatsappMessage
  );
  const navLinks = siteConfig.nav;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "navbar-scrolled py-2" : "py-3"
        }`}
        role="banner"
      >
        <div className="container-wide flex items-center justify-between">

          {/* ── Logo — Clean transparent PNG directly on navbar ── */}
          <Link href="/" className="block" aria-label="Vrindavan Group — Home">
            <div
              className="relative transition-all duration-400 flex items-center"
              style={{
                width: scrolled ? "140px" : "165px",
                height: scrolled ? "44px" : "52px",
              }}
            >
              <Image
                src="/logo/vrindavan-logo.png"
                alt="Vrindavan Group"
                fill
                sizes="(max-width: 768px) 140px, 165px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative font-body text-[0.78rem] font-medium tracking-wider transition-colors duration-300
                  after:absolute after:bottom-[-4px] after:left-0 after:h-px
                  after:bg-brand-gold after:transition-all after:duration-400
                  after:w-0 hover:after:w-full
                  ${scrolled ? "text-charcoal hover:text-brand-gold" : "text-white hover:text-brand-gold"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${siteConfig.channelPartner.phone}`}
              className={`flex items-center gap-2 text-[0.78rem] font-medium transition-colors duration-300 ${
                scrolled ? "text-charcoal-mid" : "text-white/85"
              } hover:text-brand-gold`}
            >
              <Phone size={13} />
              <span className="tracking-wide">{siteConfig.channelPartner.phone}</span>
            </a>
            <a href="/#contact" className="btn-base btn-gold text-[0.7rem] px-5 py-2.5" id="navbar-enquire-btn">
              <span>Enquire Now</span>
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} className={scrolled ? "text-charcoal" : "text-white"} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "#FAFAF8" }}
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const } }}
            exit={{ x: "100%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #e8e3d8" }}>
              {/* Logo in mobile menu header */}
              <div style={{ position: "relative", width: "130px", height: "42px" }}>
                <Image src="/logo/vrindavan-logo.png" alt="Vrindavan Group" fill sizes="130px" className="object-contain object-left" />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: "1px solid #e8e3d8", color: "#111111" }}
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: 48, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: i * 0.06 + 0.15, duration: 0.5, ease: [0.19, 1, 0.22, 1] as const } }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 font-heading font-bold text-charcoal hover:text-brand-gold transition-colors duration-300"
                    style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)", borderBottom: "1px solid #e8e3d8" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="p-8 space-y-3"
              style={{ borderTop: "1px solid #e8e3d8" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5 } }}
            >
              <a href={`tel:${siteConfig.channelPartner.phone}`} className="flex items-center gap-3" style={{ color: "#666666" }}>
                <Phone size={14} />
                <span className="font-body text-sm">{siteConfig.channelPartner.phone}</span>
              </a>
              <a href="/#contact" onClick={() => setMobileOpen(false)} className="btn-base btn-gold w-full justify-center text-[0.72rem] py-3" id="mobile-enquire-btn">
                <span>Enquire Now</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-base btn-outline-gold w-full justify-center text-[0.72rem] py-3" id="mobile-whatsapp-btn">
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
