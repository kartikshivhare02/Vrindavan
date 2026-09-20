import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Vrindavan Group Indore",
  description:
    "Privacy Policy for Vrindavan Group. Understand how we collect, use, and protect your personal information when inquiring about residential plots and properties in Indore.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Vrindavan Group Indore",
    description:
      "Learn how Vrindavan Group handles customer data, inquiry submissions, and protects your privacy.",
    url: `${siteConfig.seo.siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy <span style={{ color: "#c9a84c" }}>Policy</span>
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
            <ShieldCheck size={28} className="text-brand-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-base font-bold text-charcoal mb-1">
                Our Commitment to Your Privacy
              </h2>
              <p className="font-body text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                At <strong>{siteConfig.companyName}</strong>, we respect your privacy and are committed to protecting any personal information you share with us. We do not sell, rent, or trade your personal data with unauthorized third parties.
              </p>
            </div>
          </div>

          {/* Section 1: Information Collection */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">1</span>
              Information We Collect
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              When you interact with our website, request project brochures, schedule site visits, or submit enquiry forms, we may collect the following personal details:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm">
              {[
                "Full Name and Contact Number",
                "Email Address",
                "Preferred Project or Property Type",
                "Budget range and investment timeframe",
                "Location / City of Residence",
                "Device & browser analytical data (IP, browser type)",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-charcoal/80 bg-[#fafaf8] p-2.5 border border-[#ece8df]">
                  <CheckCircle2 size={15} className="text-brand-green flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">2</span>
              How We Use Your Information
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              The information provided by you is utilized strictly for professional real estate advisory and service purposes:
            </p>
            <div className="space-y-2 text-sm text-charcoal/85 pl-2">
              <p>&bull; <strong>Project Consultation:</strong> Sharing detailed floor plans, pricing sheets, RERA registration data, and brochures.</p>
              <p>&bull; <strong>Site Visit Coordination:</strong> Scheduling and assisting your physical visit to our townships across Indore.</p>
              <p>&bull; <strong>Direct Communication:</strong> Contacting you via Phone, WhatsApp, or Email regarding your specific property inquiry.</p>
              <p>&bull; <strong>Customer Support:</strong> Resolving queries and assisting with documentation through our authorized team.</p>
            </div>
          </section>

          {/* Section 3: Data Protection & Security */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">3</span>
              Data Protection & Security
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              We implement industry-standard technical and organizational security measures, including SSL encryption and restricted internal database access, to prevent unauthorized access, alteration, disclosure, or destruction of your personal data.
            </p>
          </section>

          {/* Section 4: Cookies and Tracking Technologies */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">4</span>
              Cookies & Analytics
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              Our website uses cookies and standard web analytics (such as Google Analytics) to improve user experience, monitor site performance, and understand traffic trends. You have the option to disable cookies through your browser settings without affecting the primary functionality of the website.
            </p>
          </section>

          {/* Section 5: Opt-Out & Contact Preferences */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xs font-semibold">5</span>
              Your Rights & Opt-Out Preferences
            </h2>
            <p className="font-body text-sm leading-relaxed text-charcoal/85">
              You can at any time request to update, correct, or delete your contact information from our active communication records. To stop receiving promotional WhatsApp messages or calls, simply reply with &quot;STOP&quot; or reach out to us at our official contact address below.
            </p>
          </section>

          {/* Section 6: Official Contact Information */}
          <section className="pt-6 border-t border-[#e8e3d8] space-y-4">
            <h2 className="font-heading text-lg font-bold text-charcoal">
              Contact Regarding Privacy Inquiries
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
                  <Phone size={15} className="text-brand-gold" /> Helpline / WhatsApp
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
