const request = require("supertest")
const app = require("../src/index")
const User = require("../src/models/User")
const Complaint = require("../src/models/Complaint")
const mongoose = require("mongoose")

describe("Complaint Routes", () => {
  let userToken
  let userId

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/complaint_system_test")
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await Complaint.deleteMany({})

    // Create test user
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "student",
      isVerified: true,
    })
    await user.save()
    userId = user._id

    // Login to get token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    })

    userToken = loginResponse.body.token
  })

  describe("POST /api/complaints", () => {
    it("should create a new complaint", async () => {
      const complaintData = {
        title: "Test Complaint",
        description: "This is a test complaint",
        category: "IT",
        priority: "medium",
      }

      const response = await request(app)
        .post("/api/complaints")
        .set("Authorization", `Bearer ${userToken}`)
        .send(complaintData)
        .expect(201)

      expect(response.body.title).toBe(complaintData.title)
      expect(response.body.submittedBy).toBe(userId.toString())
    })

    it("should not create complaint without authentication", async () => {
      const complaintData = {
        title: "Test Complaint",
        description: "This is a test complaint",
        category: "IT",
        priority: "medium",
      }

      await request(app).post("/api/complaints").send(complaintData).expect(401)
    })
  })

  describe("GET /api/complaints", () => {
    beforeEach(async () => {
      const complaint = new Complaint({
        title: "Test Complaint",
        description: "This is a test complaint",
        category: "IT",
        priority: "medium",
        submittedBy: userId,
      })
      await complaint.save()
    })

    it("should get user complaints", async () => {
      const response = await request(app).get("/api/complaints").set("Authorization", `Bearer ${userToken}`).expect(200)

      expect(response.body.length).toBe(1)
      expect(response.body[0].title).toBe("Test Complaint")
    })
  })
})
