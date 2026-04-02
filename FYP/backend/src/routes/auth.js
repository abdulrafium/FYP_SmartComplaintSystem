const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find user and populate role and department
    const user = await User.findOne({ email, isActive: true }).populate("role").populate("department")

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        roleId: user.role._id,
        departmentId: user.department._id,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" },
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        lastLogin: user.lastLogin,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Login failed" })
  }
})

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("role").populate("department")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ error: "Failed to get user data" })
  }
})

// Refresh token
router.post("/refresh", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("role").populate("department")

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "User not found or inactive" })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        roleId: user.role._id,
        departmentId: user.department._id,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" },
    )

    res.json({ token })
  } catch (error) {
    console.error("Token refresh error:", error)
    res.status(500).json({ error: "Token refresh failed" })
  }
})

module.exports = router
