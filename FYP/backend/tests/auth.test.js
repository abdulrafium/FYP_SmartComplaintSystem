const request = require("supertest")
const app = require("../src/index")
const User = require("../src/models/User")
const mongoose = require("mongoose")

describe("Auth Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/complaint_system_test")
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "student",
      }

      const response = await request(app).post("/api/auth/register").send(userData).expect(201)

      expect(response.body.message).toBe("User registered successfully")
      expect(response.body.user.email).toBe(userData.email)
    })

    it("should not register user with existing email", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "student",
      }

      await request(app).post("/api/auth/register").send(userData)

      const response = await request(app).post("/api/auth/register").send(userData).expect(400)

      expect(response.body.message).toBe("User already exists")
    })
  })

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      const user = new User({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "student",
        isVerified: true,
      })
      await user.save()
    })

    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "password123",
        })
        .expect(200)

      expect(response.body.token).toBeDefined()
      expect(response.body.user.email).toBe("test@example.com")
    })

    it("should not login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "wrongpassword",
        })
        .expect(400)

      expect(response.body.message).toBe("Invalid credentials")
    })
  })
})
