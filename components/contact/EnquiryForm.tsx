"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Phone,
  Home,
  Wallet,
  Clock,
  Building2,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  phone: string;
  purpose: string;
  budget: string;
  timeline: string;
  interestedProject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  purpose?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const purposeOptions = ["Investment", "Residential / Self Use"];

const budgetOptions = [
  "Below ₹25 Lakh",
  "₹25–50 Lakh",
  "₹50 Lakh–₹1 Crore",
  "₹1–2 Crore",
  "₹2 Crore+",
  "Not Decided",
];

const timelineOptions = [
  "Immediately",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "6–12 Months",
  "Just Exploring",
];

const projectOptions = [
  ...projects.map((p) => p.name),
  "Not Sure / Recommend One",
];

// ── Styled input ─────────────────────────────────────────────────────────────
const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "#faf9f7",
  border: "1.5px solid #e8e3dd",
  borderRadius: "3px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.88rem",
  color: "#1a1a1a",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  lineHeight: "1.4",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#444",
  marginBottom: "6px",
};

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  id,
  icon,
  error,
  children,
}: {
  label: string;
  id: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field" style={{ opacity: 0 }}>
      <label htmlFor={id} style={labelStyle}>
        <span style={{ color: "#2d6a4f" }}>{icon}</span>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="alert"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "5px",
              fontSize: "0.75rem",
              color: "#c0392b",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnquiryForm({
  defaultProject = "",
}: {
  defaultProject?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    purpose: "",
    budget: "",
    timeline: "",
    interestedProject: defaultProject,
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.channelPartner.whatsapp,
    siteConfig.channelPartner.whatsappMessage
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-field",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef.current ?? undefined);
    return () => ctx.kill();
  }, []);

  const getFocusStyle = (fieldId: string): React.CSSProperties =>
    focusedField === fieldId
      ? { borderColor: "#2d6a4f", boxShadow: "0 0 0 3px rgba(45,106,79,0.1)" }
      : {};

  const getErrorStyle = (field: keyof FormErrors): React.CSSProperties =>
    errors[field] ? { borderColor: "#c0392b" } : {};

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!formData.purpose) {
      newErrors.purpose = "Please select your purpose.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim().slice(0, 100),
          message: formData.message.trim().slice(0, 500),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // ── Success State ───────────────────────────────────────────────────────────
  if (status === "success") {
    const thankYouUrl = formatWhatsAppUrl(
      siteConfig.channelPartner.whatsapp,
      `Hello ${siteConfig.channelPartner.name}, I just submitted an enquiry on your website. My name is ${formData.name}. Please connect at your earliest.`
    );
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 space-y-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(45,106,79,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <CheckCircle size={36} style={{ color: "#2d6a4f" }} />
        </motion.div>
        <h3
          className="font-heading font-bold"
          style={{ color: "#1a1a1a", fontSize: "1.6rem" }}
        >
          Thank You, {formData.name.split(" ")[0]}!
        </h3>
        <p
          className="font-body"
          style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "380px", margin: "0 auto" }}
        >
          {siteConfig.channelPartner.name} will be in touch with you shortly.
        </p>
        <a
          href={thankYouUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-primary inline-flex group"
          id="success-whatsapp-btn"
          style={{ margin: "0 auto" }}
        >
          <MessageSquare size={14} />
          Chat on WhatsApp
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div ref={sectionRef}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Property enquiry form"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Row 1: Name + Phone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
          className="form-row-responsive"
        >
          <Field label="Full Name" id="form-name" icon={<User size={12} />} error={errors.name}>
            <input
              id="form-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Your full name"
              style={{ ...fieldStyle, ...getFocusStyle("name"), ...getErrorStyle("name") }}
              required
              maxLength={100}
              autoComplete="name"
            />
          </Field>

          <Field label="Phone Number" id="form-phone" icon={<Phone size={12} />} error={errors.phone}>
            <input
              id="form-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              placeholder="10-digit mobile number"
              style={{ ...fieldStyle, ...getFocusStyle("phone"), ...getErrorStyle("phone") }}
              required
              maxLength={15}
              autoComplete="tel"
            />
          </Field>
        </div>

        {/* Row 2: Purpose + Budget */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
          className="form-row-responsive"
        >
          <Field label="Purpose" id="form-purpose" icon={<Home size={12} />} error={errors.purpose}>
            <div style={{ position: "relative" }}>
              <select
                id="form-purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                onFocus={() => setFocusedField("purpose")}
                onBlur={() => setFocusedField(null)}
                style={{ ...fieldStyle, ...getFocusStyle("purpose"), ...getErrorStyle("purpose"), paddingRight: "36px" }}
                required
              >
                <option value="">Select purpose</option>
                {purposeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field label="Budget" id="form-budget" icon={<Wallet size={12} />}>
            <div style={{ position: "relative" }}>
              <select
                id="form-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onFocus={() => setFocusedField("budget")}
                onBlur={() => setFocusedField(null)}
                style={{ ...fieldStyle, ...getFocusStyle("budget"), paddingRight: "36px" }}
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        {/* Row 3: Timeline + Project */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
          className="form-row-responsive"
        >
          <Field label="Buying Timeline" id="form-timeline" icon={<Clock size={12} />}>
            <div style={{ position: "relative" }}>
              <select
                id="form-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                onFocus={() => setFocusedField("timeline")}
                onBlur={() => setFocusedField(null)}
                style={{ ...fieldStyle, ...getFocusStyle("timeline"), paddingRight: "36px" }}
              >
                <option value="">When are you planning?</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field label="Interested Project" id="form-project" icon={<Building2 size={12} />}>
            <div style={{ position: "relative" }}>
              <select
                id="form-project"
                name="interestedProject"
                value={formData.interestedProject}
                onChange={handleChange}
                onFocus={() => setFocusedField("project")}
                onBlur={() => setFocusedField(null)}
                style={{ ...fieldStyle, ...getFocusStyle("project"), paddingRight: "36px" }}
              >
                <option value="">Select a project</option>
                {projectOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#888", pointerEvents: "none" }}
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>

        {/* Message */}
        <Field label="Message (Optional)" id="form-message" icon={<MessageSquare size={12} />}>
          <textarea
            id="form-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder="Tell us more — preferred location, specific requirements, or any questions…"
            style={{
              ...fieldStyle,
              ...getFocusStyle("message"),
              resize: "none",
              minHeight: "100px",
            }}
            rows={4}
            maxLength={500}
          />
        </Field>

        {/* Error Banner */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "3px",
              color: "#c0392b",
              fontSize: "0.82rem",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <AlertCircle size={15} />
            Something went wrong. Please try again or WhatsApp us directly.
          </motion.div>
        )}

        {/* Submit */}
        <div className="form-field" style={{ opacity: 0 }}>
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            id="enquiry-submit-btn"
            aria-label="Submit property consultation request"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "15px 24px",
              background: status === "loading" ? "#4a7c59" : "#2d6a4f",
              color: "white",
              border: "none",
              borderRadius: "3px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {status === "loading" ? (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                <Send size={14} />
                Request a Property Consultation
                <ArrowRight size={13} />
              </>
            )}
          </motion.button>

          <p
            className="font-body text-center mt-3"
            style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5 }}
          >
            Your information is private and used only for property enquiries.
          </p>
        </div>
      </form>

    </div>
  );
}
