import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

interface LeadData {
  name: string;
  phone: string;
  purpose: string;
  budget: string;
  timeline: string;
  interestedProject: string;
  message: string;
}

function sanitize(str: string): string {
  return (str || "")
    .trim()
    .replace(/<[^>]*>/g, "") // strip HTML
    .slice(0, 500);
}

function validatePhone(phone: string): boolean {
  const cleaned = (phone || "").replace(/[\s\-\+]/g, "");
  return /^[6-9]\d{9}$/.test(cleaned);
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadData = await req.json();

    // Server-side validation
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Invalid name" },
        { status: 400 }
      );
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Sanitize all fields
    const lead = {
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      purpose: sanitize(body.purpose),
      budget: sanitize(body.budget),
      timeline: sanitize(body.timeline),
      interested_project: sanitize(body.interestedProject),
      message: sanitize(body.message),
      created_at: new Date().toISOString(),
      source: "website",
    };

    // 1. Insert into Supabase (Database)
    if (supabase) {
      const { data, error } = await supabase.from("leads").insert([lead]);

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log("Lead stored successfully in Supabase:", data);
      }
    }

    // 2. Email Notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && toEmail) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Vrindavan Group Leads <onboarding@resend.dev>",
          to: [toEmail],
          subject: `🏡 New Lead Received: ${lead.name} (${lead.phone})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #2d6a4f; margin-top: 0;">New Website Enquiry</h2>
              <p>You received a new lead submission on your Vrindavan Group website:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold; width: 35%;">Name:</td><td style="padding: 8px;">${lead.name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${lead.phone}">${lead.phone}</a> | <a href="https://wa.me/91${lead.phone.replace(/\D/g, '')}">WhatsApp Customer</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Project:</td><td style="padding: 8px;">${lead.interested_project || "General Enquiry"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Purpose:</td><td style="padding: 8px;">${lead.purpose || "N/A"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${lead.budget || "N/A"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${lead.timeline || "N/A"}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${lead.message || "N/A"}</td></tr>
              </table>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
              <p style="font-size: 0.8rem; color: #888;">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          `,
        });
        console.log("Email notification sent to", toEmail);
      } catch (emailErr) {
        console.error("Failed to send lead email notification:", emailErr);
      }
    }

    // 3. Telegram Instant Push Notification (Free & instant phone alert)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      try {
        const text = `🏡 *NEW WEBSITE LEAD*\n\n👤 *Name:* ${lead.name}\n📞 *Phone:* [${lead.phone}](tel:${lead.phone})\n🏗 *Project:* ${lead.interested_project}\n💰 *Budget:* ${lead.budget}\n⏱ *Timeline:* ${lead.timeline}\n🎯 *Purpose:* ${lead.purpose}\n💬 *Message:* ${lead.message || 'N/A'}`;
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.error("Telegram notification error:", tgErr);
      }
    }

    // Always log to console for development verification
    console.log("─── NEW LEAD SUBMISSION ──────────────────────");
    console.log(JSON.stringify(lead, null, 2));
    console.log("─────────────────────────────────────────────");

    return NextResponse.json(
      {
        success: true,
        message: "Lead received successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
