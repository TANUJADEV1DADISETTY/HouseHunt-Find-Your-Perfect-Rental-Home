const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/househunt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed!"), false)
    }
  },
})

// Import routes
const authRoutes = require("./routes/auth")
const propertyRoutes = require("./routes/properties")
const userRoutes = require("./routes/users")
const inquiryRoutes = require("./routes/inquiries")
const reviewRoutes = require("./routes/reviews")

// Use routes
app.use("/api/auth", authRoutes)
app.use("/api/properties", propertyRoutes)
app.use("/api/users", userRoutes)
app.use("/api/inquiries", inquiryRoutes)
app.use("/api/reviews", reviewRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "HouseHunt API is running" })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({
    error: "Something went wrong!",
    message: error.message,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
