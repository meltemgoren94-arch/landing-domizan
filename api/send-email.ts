import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "meltemgoren94@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const { name, email, phone } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                error: "Lütfen tüm alanları doldurun (name, email, phone).",
            });
        }

        // Send notification email to you
        const { data, error } = await resend.emails.send({
            from: "Domizan Form <onboarding@resend.dev>",
            to: [RECIPIENT_EMAIL],
            subject: `🚀 Yeni Ön Talep: ${name}`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">🎯 Yeni Ön Talep</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">domizan.com üzerinden yeni bir talep alındı</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; font-weight: 600; color: #475569; width: 140px; font-size: 14px;">👤 Ad Soyad</td>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; color: #1e293b; font-size: 14px;">${name}</td>
              </tr>
              <tr><td colspan="2" style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; font-weight: 600; color: #475569; width: 140px; font-size: 14px;">📧 E-posta</td>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; color: #1e293b; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr><td colspan="2" style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; font-weight: 600; color: #475569; width: 140px; font-size: 14px;">📱 Telefon</td>
                <td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; color: #1e293b; font-size: 14px;">
                  <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </td>
              </tr>
            </table>

            <!-- Timestamp -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                📅 ${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 16px;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">Bu e-posta domizan.com ön talep formundan otomatik gönderilmiştir.</p>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return res.status(500).json({ error: "E-posta gönderilemedi." });
        }

        return res.status(200).json({
            success: true,
            message: "E-posta başarıyla gönderildi.",
            id: data?.id,
        });
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ error: "Sunucu hatası oluştu." });
    }
}
