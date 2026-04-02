const express = require("express")
const Department = require("../models/Department")
const Role = require("../models/Role")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all departments (public for complaint form)
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).select("name code description")

    res.json({ departments })
  } catch (error) {
    console.error("Get departments error:", error)
    res.status(500).json({ error: "Failed to get departments" })
  }
})

// Get roles for a department (protected)
router.get("/:departmentId/roles", auth, async (req, res) => {
  try {
    const { departmentId } = req.params

    const roles = await Role.find({
      department: departmentId,
      isActive: true,
    }).populate("department", "name code")

    res.json({ roles })
  } catch (error) {
    console.error("Get department roles error:", error)
    res.status(500).json({ error: "Failed to get department roles" })
  }
})

module.exports = router
