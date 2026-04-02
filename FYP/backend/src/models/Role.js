const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    permissions: [
      {
        type: String,
        enum: ["view_complaints", "update_complaints", "delete_complaints", "manage_users", "view_analytics"],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Role", roleSchema)
