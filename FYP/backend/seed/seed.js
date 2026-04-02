const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../src/models/User")
const Department = require("../src/models/Department")
const Role = require("../src/models/Role")
const Complaint = require("../src/models/Complaint")

// Sample data
const departments = [
  {
    name: "Information Technology",
    code: "IT",
    description: "Handles all technology-related issues including CMS, LMS, WiFi, and system maintenance",
    contactEmail: "it-support@iba-suk.edu.pk",
  },
  {
    name: "Finance",
    code: "FINANCE",
    description: "Manages fee payments, scholarships, and financial aid",
    contactEmail: "finance@iba-suk.edu.pk",
  },
  {
    name: "Library",
    code: "LIBRARY",
    description: "Library services, book management, and research support",
    contactEmail: "library@iba-suk.edu.pk",
  },
  {
    name: "Transport",
    code: "TRANSPORT",
    description: "University transportation services and bus schedules",
    contactEmail: "transport@iba-suk.edu.pk",
  },
  {
    name: "Security",
    code: "SECURITY",
    description: "Campus security and safety services",
    contactEmail: "security@iba-suk.edu.pk",
  },
  {
    name: "Maintenance",
    code: "MAINTENANCE",
    description: "Building maintenance and facility management",
    contactEmail: "maintenance@iba-suk.edu.pk",
  },
  {
    name: "Academics",
    code: "ACADEMICS",
    description: "Academic affairs and student services",
    contactEmail: "academics@iba-suk.edu.pk",
  },
]

const roles = [
  // IT Department Roles
  { name: "CMS Manager", department: "IT", permissions: ["view_complaints", "update_complaints"] },
  { name: "LMS Manager", department: "IT", permissions: ["view_complaints", "update_complaints"] },
  { name: "WiFi Technician", department: "IT", permissions: ["view_complaints", "update_complaints"] },
  {
    name: "System Administrator",
    department: "IT",
    permissions: ["view_complaints", "update_complaints", "manage_users"],
  },
  { name: "General Support", department: "IT", permissions: ["view_complaints", "update_complaints"] },

  // Finance Department Roles
  { name: "Fee Officer", department: "FINANCE", permissions: ["view_complaints", "update_complaints"] },
  { name: "Financial Aid Coordinator", department: "FINANCE", permissions: ["view_complaints", "update_complaints"] },
  {
    name: "Accounts Manager",
    department: "FINANCE",
    permissions: ["view_complaints", "update_complaints", "view_analytics"],
  },

  // Library Department Roles
  { name: "Librarian", department: "LIBRARY", permissions: ["view_complaints", "update_complaints"] },
  { name: "Digital Resources Manager", department: "LIBRARY", permissions: ["view_complaints", "update_complaints"] },

  // Transport Department Roles
  { name: "Transport Manager", department: "TRANSPORT", permissions: ["view_complaints", "update_complaints"] },
  { name: "Route Coordinator", department: "TRANSPORT", permissions: ["view_complaints", "update_complaints"] },

  // Security Department Roles
  { name: "Security Officer", department: "SECURITY", permissions: ["view_complaints", "update_complaints"] },
  {
    name: "Security Supervisor",
    department: "SECURITY",
    permissions: ["view_complaints", "update_complaints", "view_analytics"],
  },

  // Maintenance Department Roles
  { name: "Maintenance Supervisor", department: "MAINTENANCE", permissions: ["view_complaints", "update_complaints"] },
  {
    name: "Facility Manager",
    department: "MAINTENANCE",
    permissions: ["view_complaints", "update_complaints", "view_analytics"],
  },

  // Academics Department Roles
  { name: "Academic Coordinator", department: "ACADEMICS", permissions: ["view_complaints", "update_complaints"] },
  { name: "Student Affairs Officer", department: "ACADEMICS", permissions: ["view_complaints", "update_complaints"] },

  // Admin Roles
  {
    name: "System Admin",
    department: "IT",
    permissions: ["view_complaints", "update_complaints", "delete_complaints", "manage_users", "view_analytics"],
  },
  {
    name: "Super Admin",
    department: "IT",
    permissions: ["view_complaints", "update_complaints", "delete_complaints", "manage_users", "view_analytics"],
  },
]

const users = [
  {
    name: "Admin User",
    email: "admin@iba-suk.edu.pk",
    password: "admin123",
    department: "IT",
    role: "Super Admin",
  },
  {
    name: "IT Manager",
    email: "it.manager@iba-suk.edu.pk",
    password: "itmanager123",
    department: "IT",
    role: "System Administrator",
  },
  {
    name: "CMS Support",
    email: "cms.support@iba-suk.edu.pk",
    password: "cms123",
    department: "IT",
    role: "CMS Manager",
  },
  {
    name: "LMS Support",
    email: "lms.support@iba-suk.edu.pk",
    password: "lms123",
    department: "IT",
    role: "LMS Manager",
  },
  {
    name: "Network Technician",
    email: "network@iba-suk.edu.pk",
    password: "network123",
    department: "IT",
    role: "WiFi Technician",
  },
  {
    name: "Finance Officer",
    email: "finance.officer@iba-suk.edu.pk",
    password: "finance123",
    department: "FINANCE",
    role: "Fee Officer",
  },
  {
    name: "Head Librarian",
    email: "librarian@iba-suk.edu.pk",
    password: "library123",
    department: "LIBRARY",
    role: "Librarian",
  },
  {
    name: "Transport Coordinator",
    email: "transport@iba-suk.edu.pk",
    password: "transport123",
    department: "TRANSPORT",
    role: "Transport Manager",
  },
]

const sampleComplaints = [
  {
    complainant: {
      fullName: "Ahmed Ali Khan",
      cmsId: "2021-CS-001",
      semester: "6",
      year: "2024",
      email: "ahmed.ali@iba-suk.edu.pk",
    },
    description:
      "I am unable to access the CMS system to register for my courses. The login page keeps showing an error message.",
    classification: {
      urgency: "high",
      confidence: 0.8,
      suggestedActions: ["Check CMS system status", "Verify user credentials", "Contact IT support"],
    },
    status: "pending",
  },
  {
    complainant: {
      fullName: "Fatima Sheikh",
      cmsId: "2022-BBA-045",
      semester: "4",
      year: "2024",
      email: "fatima.sheikh@iba-suk.edu.pk",
    },
    description: "The WiFi in the library is very slow and keeps disconnecting. I cannot complete my research work.",
    classification: {
      urgency: "medium",
      confidence: 0.9,
      suggestedActions: ["Check network connectivity", "Reset WiFi equipment", "Contact network technician"],
    },
    status: "in_progress",
  },
  {
    complainant: {
      fullName: "Muhammad Hassan",
      cmsId: "2020-MBA-012",
      semester: "8",
      year: "2024",
      email: "hassan.muhammad@iba-suk.edu.pk",
    },
    description: "I paid my semester fee online but it is still showing as unpaid in my student portal.",
    classification: {
      urgency: "high",
      confidence: 0.7,
      suggestedActions: ["Verify payment records", "Check bank transaction", "Contact finance office"],
    },
    status: "resolved",
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smart-complaint-system")
    console.log("Connected to MongoDB")

    // Clear existing data
    console.log("Clearing existing data...")
    await User.deleteMany({})
    await Department.deleteMany({})
    await Role.deleteMany({})
    await Complaint.deleteMany({})

    // Seed Departments
    console.log("Seeding departments...")
    const createdDepartments = await Department.insertMany(departments)
    console.log(`Created ${createdDepartments.length} departments`)

    // Create department lookup map
    const deptMap = {}
    createdDepartments.forEach((dept) => {
      deptMap[dept.code] = dept._id
    })

    // Seed Roles
    console.log("Seeding roles...")
    const rolesWithDeptIds = roles.map((role) => ({
      ...role,
      department: deptMap[role.department],
    }))
    const createdRoles = await Role.insertMany(rolesWithDeptIds)
    console.log(`Created ${createdRoles.length} roles`)

    // Create role lookup map
    const roleMap = {}
    createdRoles.forEach((role) => {
      const dept = createdDepartments.find((d) => d._id.equals(role.department))
      const key = `${dept.code}-${role.name}`
      roleMap[key] = role._id
    })

    // Seed Users
    console.log("Seeding users...")
    const usersWithIds = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          department: deptMap[user.department],
          role: roleMap[`${user.department}-${user.role}`],
        }
      }),
    )
    const createdUsers = await User.insertMany(usersWithIds)
    console.log(`Created ${createdUsers.length} users`)

    // Seed Sample Complaints
    console.log("Seeding sample complaints...")
    const generateTrackingId = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const day = String(now.getDate()).padStart(2, "0")
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      return `SIBA-${year}${month}${day}-${hours}${minutes}${seconds}`
    }

    const complaintsWithIds = sampleComplaints.map((complaint, index) => {
      // Assign departments and roles based on complaint content
      let deptId, roleId

      if (complaint.description.includes("CMS")) {
        deptId = deptMap["IT"]
        roleId = roleMap["IT-CMS Manager"]
      } else if (complaint.description.includes("WiFi")) {
        deptId = deptMap["IT"]
        roleId = roleMap["IT-WiFi Technician"]
      } else if (complaint.description.includes("fee") || complaint.description.includes("payment")) {
        deptId = deptMap["FINANCE"]
        roleId = roleMap["FINANCE-Fee Officer"]
      } else {
        deptId = deptMap["IT"]
        roleId = roleMap["IT-General Support"]
      }

      return {
        ...complaint,
        trackingId: generateTrackingId() + String(index).padStart(2, "0"),
        classification: {
          ...complaint.classification,
          department: deptId,
          role: roleId,
        },
        timeline: [
          {
            action: "complaint_submitted",
            description: "Complaint submitted by user",
            timestamp: new Date(),
          },
        ],
      }
    })

    const createdComplaints = await Complaint.insertMany(complaintsWithIds)
    console.log(`Created ${createdComplaints.length} sample complaints`)

    console.log("\n=== SEEDING COMPLETED SUCCESSFULLY ===")
    console.log("\nDefault Admin Credentials:")
    console.log("Email: admin@iba-suk.edu.pk")
    console.log("Password: admin123")
    console.log("\nOther Test Users:")
    users.forEach((user) => {
      if (user.email !== "admin@iba-suk.edu.pk") {
        console.log(`${user.name}: ${user.email} / ${user.password}`)
      }
    })

    console.log("\nSample Tracking IDs:")
    createdComplaints.forEach((complaint) => {
      console.log(`${complaint.trackingId} - ${complaint.complainant.fullName}`)
    })
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log("\nDatabase connection closed")
    process.exit(0)
  }
}

// Run seeding
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase }
