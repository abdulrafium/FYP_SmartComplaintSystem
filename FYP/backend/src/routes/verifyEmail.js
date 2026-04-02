const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/verify-email", async (req, res) => {
  const { email } = req.body;

  console.log("📧 Email verification request received:", email);

  // --- 1️⃣ Check if email exists ---
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // --- 2️⃣ Restrict to university domain ---
  const allowedDomain = "@iba-suk.edu.pk";
  if (!email.toLowerCase().endsWith(allowedDomain)) {
    console.log("❌ Invalid domain:", email);
    return res.status(400).json({
      success: false,
      message: `Only university emails (${allowedDomain}) are allowed.`,
    });
  }

  console.log("✅ Domain check passed");
  console.log("🔑 API Key present:", !!process.env.ABSTRACTAPI_KEY);

  try {
    // --- 3️⃣ Verify email using AbstractAPI ---
    console.log("🌐 Calling AbstractAPI...");
    const response = await axios.get("https://emailvalidation.abstractapi.com/v1/", {
      params: {
        api_key: process.env.ABSTRACTAPI_KEY,
        email,
      },
    });

    const data = response.data;
    console.log("📊 AbstractAPI Response:", JSON.stringify(data, null, 2));

    // --- 4️⃣ Evaluate AbstractAPI response ---
    if (data.deliverability === "DELIVERABLE") {
      console.log("✅ Email is deliverable");
      return res.json({
        success: true,
        isValid: true,
        message: "✅ University email is valid and deliverable.",
        data,
      });
    } else {
      console.log("❌ Email is not deliverable:", data.deliverability);
      return res.json({
        success: false,
        isValid: false,
        message: `❌ University email is invalid or undeliverable (${data.deliverability || 'UNKNOWN'}).`,
        data,
      });
    }
  } catch (err) {
    console.error("❌ Error verifying email:", err.message);
    console.error("Full error:", err.response?.data || err);
    return res.status(500).json({
      success: false,
      isValid: false,
      message: "Error verifying email via AbstractAPI",
      error: err.message,
    });
  }
});

module.exports = router;
