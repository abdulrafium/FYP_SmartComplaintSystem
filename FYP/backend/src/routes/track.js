const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// GET /api/track/:trackingId
// Track complaint (public endpoint)
router.get("/track/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params;

    const complaint = await Complaint.findOne({ trackingId })
      .populate("classification.department")
      .populate("classification.role")
      .populate("assignedTo", "name email")
      .populate("resolution.resolvedBy", "name");

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Return all relevant public information
    res.json({
      _id: complaint._id,
      trackingId: complaint.trackingId,
      status: complaint.status || complaint.classification.status,
      priority: complaint.priority || complaint.classification.urgency,
      subject: complaint.subject || complaint.description.split("\n")[0].substring(0, 50),
      description: complaint.description,
      attachments: complaint.attachments || [],
      complainant: complaint.complainant,
      assignedDepartment: complaint.assignedDepartment?.name || complaint.classification.department?.name || "Not assigned",
      assignedTo: complaint.assignedTo?.name || null,
      timeline: complaint.timeline.map((entry) => ({
        action: entry.action,
        description: entry.description,
        performedBy: entry.performedBy || null,
        timestamp: entry.timestamp,
      })),
      resolution: complaint.resolution?.description
        ? {
            description: complaint.resolution.description,
            resolvedBy: complaint.resolution.resolvedBy?.name || null,
            resolvedAt: complaint.resolution.resolvedAt,
          }
        : null,
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
      isEmailSent: complaint.isEmailSent || false,
    });
  } catch (error) {
    console.error("Track complaint error:", error);
    res.status(500).json({ error: "Failed to track complaint" });
  }
});



module.exports = router;
