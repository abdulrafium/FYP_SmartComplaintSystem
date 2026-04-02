const nodemailer = require("nodemailer")
const fs = require("fs")
const path = require("path")

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendComplaintConfirmation(complaint, department, role) {
    try {
      const templatePath = path.join(__dirname, "../templates/complaint_received.html")
      let htmlTemplate = fs.readFileSync(templatePath, "utf8")

      // Replace placeholders
      htmlTemplate = htmlTemplate
        .replace("{{complainantName}}", complaint.complainant.fullName)
        .replace("{{trackingId}}", complaint.trackingId)
        .replace("{{department}}", department?.name || "To be determined")
        .replace("{{role}}", role?.name || "Manual review required")
        .replace("{{urgency}}", complaint.classification.urgency)
        .replace("{{description}}", complaint.description)
        .replace(
          "{{trackingUrl}}",
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/track/${complaint.trackingId}`,
        )
        .replace("{{submissionDate}}", new Date(complaint.createdAt).toLocaleDateString())

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: complaint.complainant.email,
        subject: `Complaint Received - ${complaint.trackingId}`,
        html: htmlTemplate,
      }

      await this.transporter.sendMail(mailOptions)
      console.log(`Confirmation email sent to ${complaint.complainant.email}`)
    } catch (error) {
      console.error("Send confirmation email error:", error)
      throw error
    }
  }

  async sendStatusUpdate(complaint, newStatus) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: complaint.complainant.email,
        subject: `Complaint Update - ${complaint.trackingId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Complaint Status Update</h2>
            <p>Dear ${complaint.complainant.fullName},</p>
            <p>Your complaint <strong>${complaint.trackingId}</strong> has been updated.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>New Status:</strong> ${newStatus.toUpperCase()}</p>
              <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            ${
              complaint.resolution?.description
                ? `
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669;">Resolution</h3>
                <p>${complaint.resolution.description}</p>
              </div>
            `
                : ""
            }
            <p>You can track your complaint status at: 
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/track/${complaint.trackingId}">
                Track Complaint
              </a>
            </p>
            <p>Best regards,<br>Sukkur IBA University Support Team</p>
          </div>
        `,
      }

      await this.transporter.sendMail(mailOptions)
      console.log(`Status update email sent to ${complaint.complainant.email}`)
    } catch (error) {
      console.error("Send status update email error:", error)
      throw error
    }
  }

  async testConnection() {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error("Email service connection test failed:", error)
      return false
    }
  }
}

module.exports = new NotificationService()
