import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// ✅ Gmail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    connectionTimeout: 10000,
    pool: true, // Use connection pooling
});

// Ports & URLs
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:2000"; // Vite frontend
const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:5000"; // Backend portal

// ======================= OTP Sender =======================
export const sendOTP = async(toEmail, userName, otpCode) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for OTP");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "Your OTP Code - Spark Bright Cleaning Services",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="padding: 10px 20px; background: #f1f1f1; display: inline-block; border-radius: 8px; font-size: 24px; font-weight: bold;">
            ${otpCode}
          </div>
          <p style="margin-top: 15px;">Please enter this code to continue. It will expire in 5 minutes.</p>
          <br/>
          <p>Thank you for using <strong>Spark Bright</strong>!</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(" OTP email sent to:", toEmail);
    } catch (error) {
        console.error("OTP email send error:", error);
    }
};



// ======================= Application Acceptance =======================
export const sendApplicationAcceptanceEmail = async(
    toEmail,
    userName,
    jobTitle,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for application acceptance");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `Congratulations! Your Application for ${jobTitle} has been Accepted`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;"> Congratulations!</h1>
          </div>
          <p style="font-size: 18px; color: #333;">Hello <strong>${userName}</strong>,</p>
          <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been <strong>ACCEPTED</strong>!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Visit Career Portal
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            Thank you for choosing <strong>Shehrity Career Portal</strong>
          </p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Application acceptance email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error(" Application acceptance email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Application Rejection =======================
export const sendApplicationRejectionEmail = async(
    toEmail,
    userName,
    jobTitle,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log("Gmail transporter is ready for Application Rejection");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `Update on Your Application for ${jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Thank you for applying for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>. Unfortunately, we have moved forward with other candidates.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Explore More Jobs
            </a>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log(" Application rejection email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Application rejection email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Application Received =======================
export const sendApplicationReceivedEmail = async(
    toEmail,
    jobTitle,
    name,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for Application Received");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `We’ve received your application for ${jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>We’ve successfully received your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Explore More Jobs
            </a>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Application received email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Application received email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Password Reset =======================
export const sendPasswordResetEmail = async(toEmail, userName, resetUrl) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for password reset");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: " Password Reset Request - Shehrity",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Hello ${userName}! </h2>
          <p>We received a request to reset your password. Click below:</p>
          <a href="${resetUrl}" style="background: #28a745; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none;">Reset Password</a>
          <p>If you didn’t request this, ignore this email.</p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log(" Password reset email sent:", result.messageId);
        return { success: true, message: "Password reset email sent successfully" };
    } catch (error) {
        console.error(" Password reset email error:", error);
        return { success: false, message: "Failed to send reset email." };
    }
}; // ✅ <-- Missing brace fixed here

// ======================= Email Rate Limiting =======================
let lastEmailTime = 0;
const EMAIL_DELAY = 2000; // 2 sec

const sendEmailWithDelay = async(mailOptions) => {
    const now = Date.now();
    if (now - lastEmailTime < EMAIL_DELAY) {
        await new Promise((r) => setTimeout(r, EMAIL_DELAY));
    }
    const result = await transporter.sendMail(mailOptions);
    lastEmailTime = Date.now();
    return result;
};

// ======================= Quote Notifications =======================
// Email to company when quote is submitted
export const sendQuoteNotificationToCompany = async(quoteData) => {
    try {
        await transporter.verify();
        console.log("Gmail transporter is ready for Quote Notification");

        const serviceDetails =
            quoteData.securityType === "Physical Security" ?
            `Services: ${quoteData.physicalServices?.join(", ") || "N/A"}` :
            `Services: ${quoteData.digitalServices?.join(", ") || "N/A"}`;

        const mailOptions = {
            from: `"Shehrity Quote System" <${process.env.GMAIL_USER}>`,
            to: process.env.COMPANY_EMAIL || process.env.GMAIL_USER,
            subject: `New Quote Request - ${quoteData.securityType}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;">🛡️ New Quote Request</h1>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #15487d; margin-top: 0;">Quote Details</h2>
            <p><strong>Company:</strong> ${quoteData.companyName}</p>
            <p><strong>Contact:</strong> ${quoteData.contactPerson}</p>
            <p><strong>Email:</strong> ${quoteData.email}</p>
            <p><strong>Phone:</strong> ${quoteData.phone}</p>
            <p><strong>Security Type:</strong> ${quoteData.securityType}</p>
            <p><strong>${serviceDetails}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${PORTAL_URL}/admin/quotes" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              View Quote Details
            </a>
          </div>

          <p style="font-size: 14px; color: #666; text-align: center;">
            This is an automated notification from <strong>Shehrity Quote System</strong>
          </p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Quote notification email sent to company");
        return { success: true, message: "Company notification sent successfully" };
    } catch (error) {
        console.error("Quote notification email error:", error);
        return { success: false, message: "Failed to send company notification." };
    }
};

// Email confirmation to customer who submitted quote
export const sendQuoteConfirmationToCustomer = async(quoteData) => {
    try {
        await transporter.verify();
        console.log("Gmail transporter is ready for Quote Confirmation");

        const mailOptions = {
            from: `"Shehrity Security" <${process.env.GMAIL_USER}>`,
            to: quoteData.email,
            subject: `Quote Request Received - ${quoteData.companyName}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;">✅ Quote Request Received</h1>
          </div>

          <p style="font-size: 18px; color: #333;">Hello <strong>${quoteData.contactPerson}</strong>,</p>

          <p>Thank you for your interest in <strong>Shehrity Security Services</strong>! We have successfully received your quote request for <strong>${quoteData.securityType}</strong>.</p>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #15487d; margin-top: 0;">Request Summary:</h3>
            <p><strong>Company:</strong> ${quoteData.companyName}</p>
            <p><strong>Security Type:</strong> ${quoteData.securityType}</p>
            <p><strong>Reference ID:</strong> ${quoteData._id || "Processing"}</p>
          </div>

          <p>Our team will review your requirements and contact you within <strong>24-48 hours</strong> with a customized quote and security solution tailored to your needs.</p>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">Need immediate assistance? Contact us:</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> info@shehrity.com</p>
          </div>

          <p style="font-size: 14px; color: #666; text-align: center;">
            Thank you for choosing <strong>Shehrity</strong> - Your trusted security partner!
          </p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Quote confirmation email sent to customer:", quoteData.email);
        return { success: true, message: "Customer confirmation sent successfully" };
    } catch (error) {
        console.error("Quote confirmation email error:", error);
        return { success: false, message: "Failed to send customer confirmation." };
    }
};