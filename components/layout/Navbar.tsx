"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
          scrolled
            ? "bg-[#09150f]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5 lg:py-4"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5 lg:py-6"
        }`}
        role="banner"
      >
        <div className="container-wide flex items-center justify-between">
          {/* ── Brand Logo ── */}
          <Link
            href="/"
            className="block group"
            aria-label="Vrindavan Group — Home"
          >
            <div
              className="relative transition-all duration-300 flex items-center"
              style={{
                width: scrolled ? "185px" : "215px",
                height: scrolled ? "52px" : "62px",
              }}
            >
              <Image
                src="/logo/vrindavan-logo.png"
                alt="Vrindavan Group"
                fill
                sizes="(max-width: 768px) 160px, 215px"
                className="object-contain object-left group-hover:brightness-110 transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Navigation Links ── */}
          <nav
            className="hidden lg:flex items-center gap-9"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative font-body text-[0.98rem] font-medium tracking-wide text-white/90 hover:text-brand-gold transition-colors duration-300 py-1
                  after:absolute after:bottom-0 after:left-0 after:h-[2px]
                  after:bg-brand-gold after:transition-all after:duration-300
                  after:w-0 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA & Phone ── */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${siteConfig.channelPartner.phone}`}
              className="flex items-center gap-2.5 text-[0.92rem] font-medium text-white/90 hover:text-brand-gold transition-colors duration-300 group"
              title="Call Vrindavan Group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-charcoal transition-all">
                <Phone size={14} />
              </div>
              <span className="tracking-wide font-body">
                {siteConfig.channelPartner.phone}
              </span>
            </a>
            <a
              href="/#contact"
              className="btn-base btn-gold text-xs uppercase tracking-wider px-6 py-3 font-semibold shadow-lg hover:shadow-brand-gold/30 flex items-center gap-1.5 transition-all"
              id="navbar-enquire-btn"
            >
              <span>Enquire Now</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden w-11 h-11 rounded-sm bg-white/10 border border-white/15 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/40 transition-all"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[200] flex flex-col bg-[#0b1812] text-white"
            initial={{ x: "100%" }}
            animate={{
              x: 0,
              transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              x: "100%",
              transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div
                style={{ position: "relative", width: "160px", height: "48px" }}
              >
                <Image
                  src="/logo/vrindavan-logo.png"
                  alt="Vrindavan Group"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 rounded-sm bg-white/10 border border-white/15 flex items-center justify-center text-white hover:text-brand-gold transition-all"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: 36, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: i * 0.05 + 0.15,
                      duration: 0.45,
                      ease: [0.19, 1, 0.22, 1],
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 font-heading font-bold text-white hover:text-brand-gold transition-colors border-b border-white/10"
                    style={{ fontSize: "clamp(1.8rem, 6vw, 2.4rem)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <motion.div
              className="p-8 space-y-3.5 border-t border-white/10 bg-black/30"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.4, duration: 0.4 },
              }}
            >
              <a
                href={`tel:${siteConfig.channelPartner.phone}`}
                className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors py-1"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                  <Phone size={14} />
                </div>
                <span className="font-body text-sm font-medium">
                  {siteConfig.channelPartner.phone}
                </span>
              </a>
              <a
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-base btn-gold w-full justify-center text-xs uppercase tracking-wider py-3.5 font-bold shadow-lg"
                id="mobile-enquire-btn"
              >
                <span>Enquire Now</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-outline-white w-full justify-center text-xs uppercase tracking-wider py-3.5"
                id="mobile-whatsapp-btn"
              >
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
