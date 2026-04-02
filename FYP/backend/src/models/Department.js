const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    contactEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Department", departmentSchema)
