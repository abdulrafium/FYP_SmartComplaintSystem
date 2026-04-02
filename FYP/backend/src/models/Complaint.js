const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    complainant: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      cmsId: {
        type: String,
        required: true,
        trim: true,
      },
      semester: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        path: String,
      },
    ],
    classification: {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
      urgency: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },
      suggestedActions: [String],
      isManuallyAssigned: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "closed", "escalated"],
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolution: {
      description: String,
      resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      resolvedAt: Date,
      satisfactionRating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    timeline: [
      {
        action: String,
        description: String,
        performedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster tracking ID lookups
complaintSchema.index({ trackingId: 1 })
complaintSchema.index({ "complainant.email": 1 })
complaintSchema.index({ status: 1 })
complaintSchema.index({ "classification.department": 1 })

module.exports = mongoose.model("Complaint", complaintSchema)
