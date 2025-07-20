const express = require("express")
const User = require("../models/User")
const Property = require("../models/Property")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

const router = express.Router()

// Get all users (admin only)
router.get("/", auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search, sortBy = "createdAt", sortOrder = "desc" } = req.query

    const filter = {}

    if (role && role !== "all") {
      filter.role = role
    }

    if (status && status !== "all") {
      filter.status = status
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    const users = await User.find(filter)
      .select("-password")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await User.countDocuments(filter)

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: Number.parseInt(page),
      total,
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

// Get user by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").populate("favorites")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Only allow users to view their own profile or admin to view any
    if (req.user.userId !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to view this profile" })
    }

    res.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ error: "Failed to fetch user" })
  }
})

// Update user status (admin only)
router.put("/:id/status", auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body

    if (!["active", "pending", "suspended"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" })
    }

    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      message: "User status updated successfully",
      user,
    })
  } catch (error) {
    console.error("Update user status error:", error)
    res.status(500).json({ error: "Failed to update user status" })
  }
})

// Get user statistics
router.get("/:id/stats", auth, async (req, res) => {
  try {
    const userId = req.params.id

    // Only allow users to view their own stats or admin to view any
    if (req.user.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to view these statistics" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    let stats = {}

    if (user.role === "owner") {
      // Owner statistics
      const properties = await Property.find({ owner: userId })
      const totalViews = properties.reduce((sum, prop) => sum + prop.views, 0)

      stats = {
        totalProperties: properties.length,
        activeProperties: properties.filter((p) => p.status === "available").length,
        rentedProperties: properties.filter((p) => p.status === "rented").length,
        totalViews,
        averagePrice:
          properties.length > 0
            ? Math.round(properties.reduce((sum, prop) => sum + prop.price, 0) / properties.length)
            : 0,
      }
    } else if (user.role === "renter") {
      // Renter statistics
      stats = {
        favoriteProperties: user.favorites.length,
        // Add more renter-specific stats as needed
      }
    }

    res.json({ stats })
  } catch (error) {
    console.error("Get user stats error:", error)
    res.status(500).json({ error: "Failed to fetch user statistics" })
  }
})

// Delete user (admin only)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // If user is an owner, handle their properties
    if (user.role === "owner") {
      await Property.updateMany({ owner: req.params.id }, { status: "inactive" })
    }

    await User.findByIdAndDelete(req.params.id)

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ error: "Failed to delete user" })
  }
})

module.exports = router
