// MongoDB initialization script for Docker
// This script runs when the MongoDB container starts for the first time

// Declare the db variable
var db

// Switch to the application database
db = db.getSiblingDB("smart-complaint-system")

// Create application user with read/write permissions
db.createUser({
  user: "app_user",
  pwd: "app_password",
  roles: [
    {
      role: "readWrite",
      db: "smart-complaint-system",
    },
  ],
})

// Create indexes for better performance
db.complaints.createIndex({ trackingId: 1 }, { unique: true })
db.complaints.createIndex({ "complainant.email": 1 })
db.complaints.createIndex({ status: 1 })
db.complaints.createIndex({ "classification.department": 1 })
db.complaints.createIndex({ "classification.urgency": 1 })
db.complaints.createIndex({ createdAt: -1 })

db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ department: 1 })

db.departments.createIndex({ code: 1 }, { unique: true })
db.roles.createIndex({ name: 1, department: 1 }, { unique: true })

print("MongoDB initialization completed successfully")
