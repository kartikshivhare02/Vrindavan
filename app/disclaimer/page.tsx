import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Mail, Phone, ShieldAlert, CheckCircle2, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Disclaimer & RERA Compliance | Vrindavan Group Indore",
  description:
    "Official Real Estate Disclaimer and RERA compliance disclosure for Vrindavan Group projects, property listings, and authorized channel partner representation in Indore.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/disclaimer`,
  },
  openGraph: {
    title: "Disclaimer & RERA Compliance | Vrindavan Group Indore",
    description:
      "Read the statutory disclaimer, RERA compliance details, and authorized channel partner representations for Vrindavan Group Indore.",
    url: `${siteConfig.seo.siteUrl}/disclaimer`,
  },
};

export default function DisclaimerPage() {
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
            Statutory & Legal Notice
          </p>
          <h1
            className="font-heading font-bold text-white mb-3 text-center"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15, textAlign: "center" }}
          >
            Official <span style={{ color: "#c9a84c" }}>Disclaimer</span>
          </h1>
          <p
            className="font-body text-xs md:text-sm text-white/70 max-w-xl mx-auto text-center"
            style={{ color: "rgba(255, 255, 255, 0.8)", textAlign: "center" }}
          >
            RERA Compliance &bull; Authorized Representation &bull; {siteConfig.companyName}
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <div className="container-narrow px-4">
        <div className="bg-white border border-[#e8e3d8] rounded-sm p-6 sm:p-10 md:p-12 shadow-sm space-y-10 text-charcoal">
          
          {/* Summary Box */}
          <div className="p-5 sm:p-6 bg-[#faf8f3] border-l-4 border-brand-gold rounded-sm flex items-start gap-4">
            <AlertTriangle size={28} className="text-brand-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-base font-bold text-charcoal mb-1">
                Real Estate Statutory Disclosure
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                This website is an informational and marketing portal for <strong>{siteConfig.companyName}</strong> residential townships and developments in Indore. By accessing this platform, visitors acknowledge that all information is provided in good faith for informational purposes.
              </p>
            </div>
          </div>

          {/* Section 1: RERA Compliance */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">1</span>
              RERA Compliance & Project Verification
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Active residential projects developed by <strong>{siteConfig.companyName}</strong> comply with the Real Estate (Regulation and Development) Act, 2016 (RERA) and rules framed by the Madhya Pradesh Real Estate Regulatory Authority (MP RERA). Customers are encouraged to verify registration numbers, sanctioned layout plans, and statutory approvals on the official MP RERA portal (<a href="https://rera.mp.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand-gold font-medium underline">rera.mp.gov.in</a>) or at our sales offices prior to booking.
            </p>
          </section>

          {/* Section 2: Channel Partner Representation */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">2</span>
              Authorized Channel Partner Disclosure
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Marketing and customer advisory activities on this portal are managed in coordination with <strong>{siteConfig.channelPartner.name}</strong>, authorized Property & Investment Consultant / Channel Partner for Vrindavan Group. The channel partner acts as a sales and consultation facilitator to assist prospective buyers with project walkthroughs, pricing advisory, and site visits.
            </p>
          </section>

          {/* Section 3: Visual Representations & Artistic Impressions */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">3</span>
              Artistic Impressions & Visual Content
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Photographs, 3D computer renderings, architectural elevations, landscaped garden perspectives, maps, and video walkthroughs displayed across this site are conceptual representations. Furniture, decorative fittings, fixtures, and interior styling shown in sample designs are illustrative and not part of the standard offering unless explicitly written in the registered agreement.
            </p>
          </section>

          {/* Section 4: Accuracy & Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">4</span>
              Accuracy & Limitation of Liability
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              While every effort is made to maintain accurate and up-to-date data, {siteConfig.companyName} and its authorized partners shall not be liable for any direct, indirect, or consequential loss resulting from reliance on website content. The final terms, specifications, amenities, and payment milestones shall be solely determined by the standard executed Allotment Letter and Registered Agreement for Sale.
            </p>
          </section>

          {/* Section 5: Direct Verification & Contact */}
          <section className="pt-6 border-t border-[#e8e3d8] space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">
              For Official Verification & Site Visits
            </h2>
            <p className="font-body text-xs sm:text-sm text-charcoal/80">
              Prospective buyers are invited to visit our project sites and sales office in Indore for direct inspection of sanctioned plans and documentation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
              <div className="p-4 bg-[#fafaf8] border border-[#e8e3d8] space-y-2">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Phone size={15} className="text-brand-gold" /> Sales Helpline
                </p>
                <a href={`tel:${siteConfig.channelPartner.phone}`} className="text-brand-green hover:underline">
                  {siteConfig.channelPartner.phone}
                </a>
              </div>
              <div className="p-4 bg-[#fafaf8] border border-[#e8e3d8] space-y-2">
                <p className="font-semibold text-charcoal flex items-center gap-2">
                  <Mail size={15} className="text-brand-gold" /> Consultation Email
                </p>
                <a href={`mailto:${siteConfig.channelPartner.email}`} className="text-brand-green hover:underline">
                  {siteConfig.channelPartner.email}
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
