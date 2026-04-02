const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Complaint = require("../models/Complaint")
const Department = require("../models/Department")
const Role = require("../models/Role")
const User = require("../models/User")
const generateTrackingId = require("../utils/generateTrackingId")
const ragClient = require("../services/ragClient")
const notification = require("../services/notification")
const auth = require("../middleware/auth")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/complaints"
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5, // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only images, PDFs, and documents are allowed."))
    }
  },
})

// Fake name validation
const validateName = (name) => {
  const fakeNames = [
    "abc",
    "xyz",
    "test",
    "asdf",
    "qwerty",
    "aaaa",
    "bbbb",
    "cccc",
    "admin",
    "user",
    "guest",
    "demo",
    "sample",
    "example",
  ]

  const nameLower = name.toLowerCase().trim()

  // Check against blacklist
  if (fakeNames.includes(nameLower)) {
    return false
  }

  // Must have at least 2 words
  const words = name.trim().split(/\s+/)
  if (words.length < 2) {
    return false
  }

  // Each word must be at least 2 characters and alphabetic
  for (const word of words) {
    if (word.length < 2 || !/^[a-zA-Z]+$/.test(word)) {
      return false
    }
  }

  // Check for patterns like "aaa bbb" or "111 222"
  if (words.every((word) => /^(.)\1+$/.test(word))) {
    return false
  }

  return true
}

// Submit complaint (public endpoint)
router.post("/", upload.array("attachments", 5), async (req, res) => {
  try {
    const { fullName, cmsId, semester, year, email, description } = req.body

    // Validate required fields
    if (!fullName || !cmsId || !semester || !year || !email || !description) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // Validate name
    if (!validateName(fullName)) {
      return res.status(400).json({
        error: "Invalid name. Please provide your real full name (at least 2 words, alphabetic characters only)",
      })
    }

    // Validate email domain
    if (!email.endsWith("@iba-suk.edu.pk")) {
      return res.status(400).json({
        error: "Please use your university email address (@iba-suk.edu.pk)",
      })
    }

    // Generate tracking ID
    const trackingId = generateTrackingId()

    // Process attachments
    const attachments = req.files
      ? req.files.map((file) => ({
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
        }))
      : []

    // Get AI classification
    let classification
    try {
      classification = await ragClient.classifyComplaint(description)
    } catch (error) {
      console.error("RAG classification error:", error)
      // Fallback classification
      classification = {
        departmentCode: "IT",
        roleName: "General Support",
        urgency: "medium",
        confidence: 0.3,
        suggestedActions: ["Manual review required"],
      }
    }

    // Find department and role
    const department = await Department.findOne({ code: classification.departmentCode })
    const role = department
      ? await Role.findOne({
          name: classification.roleName,
          department: department._id,
        })
      : null

    // Create complaint
    const complaint = new Complaint({
      trackingId,
      complainant: {
        fullName,
        cmsId,
        semester,
        year,
        email,
      },
      description,
      attachments,
      classification: {
        department: department?._id,
        role: role?._id,
        urgency: classification.urgency,
        confidence: classification.confidence,
        suggestedActions: classification.suggestedActions,
        isManuallyAssigned: classification.confidence < 0.5,
      },
      timeline: [
        {
          action: "complaint_submitted",
          description: "Complaint submitted by user",
          timestamp: new Date(),
        },
      ],
    })

    await complaint.save()

    // Send confirmation email
    try {
      await notification.sendComplaintConfirmation(complaint, department, role)
      complaint.isEmailSent = true
      await complaint.save()
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't fail the request if email fails
    }

    // Notify relevant users via socket
    if (role) {
      const roleUsers = await User.find({ role: role._id, isActive: true })
      roleUsers.forEach((user) => {
        req.io.to(`role-${role._id}`).emit("new_complaint", {
          trackingId,
          urgency: classification.urgency,
          department: department.name,
          role: role.name,
        })
      })
    }

    // Notify admin if low confidence
    if (classification.confidence < 0.5) {
      req.io.to("admin").emit("manual_review_required", {
        trackingId,
        confidence: classification.confidence,
        description: description.substring(0, 100) + "...",
      })
    }

    res.status(201).json({
      success: true,
      trackingId,
      classification: {
        department: department?.name || "To be determined",
        role: role?.name || "Manual review required",
        urgency: classification.urgency,
        confidence: classification.confidence,
      },
      message: "Complaint submitted successfully. You will receive a confirmation email shortly.",
    })
  } catch (error) {
    console.error("Submit complaint error:", error)
    res.status(500).json({ error: "Failed to submit complaint" })
  }
})

// Track complaint (public endpoint)
router.get("/track/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params

    const complaint = await Complaint.findOne({ trackingId })
      .populate("classification.department")
      .populate("classification.role")
      .populate("assignedTo", "name email")
      .populate("resolution.resolvedBy", "name")

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" })
    }

    // Return public information only
    res.json({
      trackingId: complaint.trackingId,
      status: complaint.status,
      submittedAt: complaint.createdAt,
      department: complaint.classification.department?.name,
      role: complaint.classification.role?.name,
      urgency: complaint.classification.urgency,
      timeline: complaint.timeline.map((entry) => ({
        action: entry.action,
        description: entry.description,
        timestamp: entry.timestamp,
      })),
      resolution: complaint.resolution.description
        ? {
            description: complaint.resolution.description,
            resolvedAt: complaint.resolution.resolvedAt,
          }
        : null,
    })
  } catch (error) {
    console.error("Track complaint error:", error)
    res.status(500).json({ error: "Failed to track complaint" })
  }
})

// Get complaints for role user (protected)
router.get("/my-complaints", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, urgency } = req.query

    const filter = {
      $or: [{ "classification.role": req.user.roleId }, { assignedTo: req.user.userId }],
    }

    if (status) filter.status = status
    if (urgency) filter["classification.urgency"] = urgency

    const complaints = await Complaint.find(filter)
      .populate("classification.department")
      .populate("classification.role")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Complaint.countDocuments(filter)

    res.json({
      complaints,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get my complaints error:", error)
    res.status(500).json({ error: "Failed to get complaints" })
  }
})

// Update complaint status (protected)
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { id } = req.params
    const { status, resolution } = req.body

    const complaint = await Complaint.findById(id)
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" })
    }

    // Check if user has permission to update this complaint
    if (
      complaint.classification.role.toString() !== req.user.roleId &&
      complaint.assignedTo?.toString() !== req.user.userId
    ) {
      return res.status(403).json({ error: "Not authorized to update this complaint" })
    }

    complaint.status = status

    if (status === "resolved" && resolution) {
      complaint.resolution = {
        description: resolution,
        resolvedBy: req.user.userId,
        resolvedAt: new Date(),
      }
    }

    complaint.timeline.push({
      action: `status_changed_to_${status}`,
      description: `Status changed to ${status}`,
      performedBy: req.user.userId,
      timestamp: new Date(),
    })

    await complaint.save()

    // Send notification email to complainant
    try {
      await notification.sendStatusUpdate(complaint, status)
    } catch (emailError) {
      console.error("Status update email error:", emailError)
    }

    res.json({ success: true, complaint })
  } catch (error) {
    console.error("Update complaint status error:", error)
    res.status(500).json({ error: "Failed to update complaint status" })
  }
})

module.exports = router
