const express = require("express")
const Complaint = require("../models/Complaint")
const User = require("../models/User")
const Department = require("../models/Department")
const Role = require("../models/Role")
const auth = require("../middleware/auth")
const rbac = require("../middleware/rbac")

const router = express.Router()

// Get admin dashboard stats
router.get("/stats", auth, rbac(["manage_users", "view_analytics"]), async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments()
    const pendingComplaints = await Complaint.countDocuments({ status: "pending" })
    const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" })
    const lowConfidenceComplaints = await Complaint.countDocuments({
      "classification.confidence": { $lt: 0.5 },
    })

    // Complaints by department
    const complaintsByDept = await Complaint.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "classification.department",
          foreignField: "_id",
          as: "dept",
        },
      },
      {
        $group: {
          _id: "$dept.name",
          count: { $sum: 1 },
        },
      },
    ])

    // Complaints by urgency
    const complaintsByUrgency = await Complaint.aggregate([
      {
        $group: {
          _id: "$classification.urgency",
          count: { $sum: 1 },
        },
      },
    ])

    res.json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      lowConfidenceComplaints,
      complaintsByDept,
      complaintsByUrgency,
    })
  } catch (error) {
    console.error("Get admin stats error:", error)
    res.status(500).json({ error: "Failed to get admin statistics" })
  }
})

// Get all complaints for admin
router.get("/complaints", auth, rbac(["view_complaints"]), async (req, res) => {
  try {
    const { page = 1, limit = 20, status, department, urgency, search } = req.query

    const filter = {}
    if (status) filter.status = status
    if (department) filter["classification.department"] = department
    if (urgency) filter["classification.urgency"] = urgency
    if (search) {
      filter.$or = [
        { trackingId: { $regex: search, $options: "i" } },
        { "complainant.fullName": { $regex: search, $options: "i" } },
        { "complainant.email": { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const complaints = await Complaint.find(filter)
      .populate("classification.department")
      .populate("classification.role")
      .populate("assignedTo", "name email")
      .populate("resolution.resolvedBy", "name")
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
    console.error("Get admin complaints error:", error)
    res.status(500).json({ error: "Failed to get complaints" })
  }
})

// Manually assign complaint
router.patch("/complaints/:id/assign", auth, rbac(["update_complaints"]), async (req, res) => {
  try {
    const { id } = req.params
    const { departmentId, roleId, userId } = req.body

    const complaint = await Complaint.findById(id)
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" })
    }

    complaint.classification.department = departmentId
    complaint.classification.role = roleId
    complaint.classification.isManuallyAssigned = true
    complaint.assignedTo = userId

    complaint.timeline.push({
      action: "manually_assigned",
      description: "Complaint manually assigned by admin",
      performedBy: req.user.userId,
      timestamp: new Date(),
    })

    await complaint.save()

    res.json({ success: true, complaint })
  } catch (error) {
    console.error("Manual assignment error:", error)
    res.status(500).json({ error: "Failed to assign complaint" })
  }
})

// Get users for assignment
router.get("/users", auth, rbac(["manage_users"]), async (req, res) => {
  try {
    const { departmentId, roleId } = req.query

    const filter = { isActive: true }
    if (departmentId) filter.department = departmentId
    if (roleId) filter.role = roleId

    const users = await User.find(filter)
      .populate("role", "name")
      .populate("department", "name code")
      .select("name email role department")

    res.json({ users })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ error: "Failed to get users" })
  }
})

module.exports = router
