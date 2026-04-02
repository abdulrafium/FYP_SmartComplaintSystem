const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

// Load .env from parent directory (FYP folder)
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaints");
const departmentRoutes = require("./routes/departments");
const adminRoutes = require("./routes/admin");
const verifyEmailRoutes = require("./routes/verifyEmail");
const trackRoutes = require("./routes/track");




const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Make io available to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", verifyEmailRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// -----------------
// Database connection
// -----------------
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin%40123@hospital-cluster.vg3n0mz.mongodb.net/?retryWrites=true&w=majority";

if (!mongoURI) {
  console.error("❌ MONGODB_URI is not defined in your .env file");
  process.exit(1); // exit if URI is missing
}

console.log("Connecting to MongoDB Atlas...");
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-role", (roleId) => {
    socket.join(`role-${roleId}`);
  });

  socket.on("join-admin", () => {
    socket.join("admin");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/track", trackRoutes);

module.exports = app;
