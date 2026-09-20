import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Mail, Phone, FileCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vrindavan Group Indore",
  description:
    "Terms and Conditions governing the use of the Vrindavan Group website, project enquiries, and property consultations in Indore, Madhya Pradesh.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | Vrindavan Group Indore",
    description:
      "Review the terms of use for Vrindavan Group website, property bookings, and residential project consultations.",
    url: `${siteConfig.seo.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  const lastUpdated = "September 2024";

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-24">
      {/* ── HERO BANNER ── */}
      <section
        className="relative bg-brand-green text-white overflow-hidden mb-12"
        style={{
          paddingTop: "clamp(96px, 11vw, 130px)",
          paddingBottom: "clamp(32px, 4vw, 50px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(201,168,76,0.02) 0px,
              rgba(201,168,76,0.02) 1px,
              transparent 1px,
              transparent 8px
            )`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto px-4 flex flex-col items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-body text-brand-gold hover:underline uppercase tracking-wider mb-3 transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <p
            className="font-body text-xs font-semibold tracking-[0.25em] text-brand-gold uppercase mb-2 text-center"
            style={{ color: "#c9a84c", textAlign: "center" }}
          >
            Legal & Compliance
          </p>
          <h1
            className="font-heading font-bold text-white mb-3 text-center"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15, textAlign: "center" }}
          >
            Terms & <span style={{ color: "#c9a84c" }}>Conditions</span>
          </h1>
          <p
            className="font-body text-xs md:text-sm text-white/70 max-w-xl mx-auto text-center"
            style={{ color: "rgba(255, 255, 255, 0.8)", textAlign: "center" }}
          >
            Last Updated: {lastUpdated} &bull; {siteConfig.companyName}, {siteConfig.city}
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <div className="container-narrow px-4">
        <div className="bg-white border border-[#e8e3d8] rounded-sm p-6 sm:p-10 md:p-12 shadow-sm space-y-10 text-charcoal">
          
          {/* Summary Box */}
          <div className="p-5 sm:p-6 bg-[#faf8f3] border-l-4 border-brand-gold rounded-sm flex items-start gap-4">
            <Scale size={28} className="text-brand-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-base font-bold text-charcoal mb-1">
                Website Usage Agreement
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions. If you disagree with any part of these terms, please refrain from using the website.
              </p>
            </div>
          </div>

          {/* Section 1: Use of Website Information */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">1</span>
              Informational & Marketing Purpose
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              The contents of this website—including project descriptions, plot layouts, photos, videos, amenities, and location maps—are published for general informational and marketing guidance. Nothing on this website constitutes a formal legal offer, contract, warranty, or commitment by <strong>{siteConfig.companyName}</strong>.
            </p>
          </section>

          {/* Section 2: Artistic Impressions & Renders */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">2</span>
              Architectural Renders & Specifications
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              All 3D architectural renders, elevation illustrations, simulated flythroughs, landscape mockups, and layout boundaries shown on this website are artistic impressions designed to illustrate the intended project vision. Actual constructed dimensions, finishes, landscaping, and boundary elevations will strictly adhere to the approved statutory plans and individual registered agreements.
            </p>
          </section>

          {/* Section 3: Pricing, Availability & Payment Plans */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">3</span>
              Pricing & Unit Availability
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Prices, inventory availability, promotional schemes, and payment milestones displayed or discussed are subject to revision without prior notice. An allotment or plot reservation is confirmed solely upon receipt of formal application, booking payment, and issuance of official receipts/allotment letters.
            </p>
          </section>

          {/* Section 4: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">4</span>
              Intellectual Property Rights
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              All trademarks, logos, brand assets, imagery, copy, videos, and website source code are the intellectual property of <strong>{siteConfig.companyName}</strong>. Reproduction, distribution, scraping, or commercial exploitation of any material without explicit written consent is strictly prohibited.
            </p>
          </section>

          {/* Section 5: Governing Law & Jurisdiction */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">5</span>
              Governing Law & Jurisdiction
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Any dispute, claim, or controversy arising out of or relating to the use of this website or communications shall be governed by and construed in accordance with the laws of India. Courts in <strong>{siteConfig.city}, {siteConfig.state}</strong> shall have exclusive jurisdiction.
            </p>
          </section>

          {/* Section 6: Official Inquiries */}
          <section className="pt-6 border-t border-[#e8e3d8] space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">
              Questions Regarding Terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-[#fafaf8] border border-[#e8e3d8] space-y-2">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Mail size={15} className="text-brand-gold" /> Official Email
                </p>
                <a href={`mailto:${siteConfig.channelPartner.email}`} className="text-brand-green hover:underline">
                  {siteConfig.channelPartner.email}
                </a>
              </div>
              <div className="p-4 bg-[#fafaf8] border border-[#e8e3d8] space-y-2">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Phone size={15} className="text-brand-gold" /> Phone Consultation
                </p>
                <a href={`tel:${siteConfig.channelPartner.phone}`} className="text-brand-green hover:underline">
                  {siteConfig.channelPartner.phone}
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
