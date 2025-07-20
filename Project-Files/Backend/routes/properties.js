const express = require("express")
const Property = require("../models/Property")
const User = require("../models/User")
const auth = require("../middleware/auth")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// File upload configuration for property images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/properties/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only image files are allowed!"), false)
    }
  },
})

// Get all properties with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      location,
      type,
      bedrooms,
      minPrice,
      maxPrice,
      search,
      featured,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query

    // Build filter object
    const filter = { status: "available" }

    if (location) {
      filter.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.state": { $regex: location, $options: "i" } },
        { "location.address": { $regex: location, $options: "i" } },
      ]
    }

    if (type && type !== "all") {
      filter.type = type
    }

    if (bedrooms && bedrooms !== "any") {
      filter.bedrooms = Number.parseInt(bedrooms)
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice)
    }

    if (search) {
      filter.$text = { $search: search }
    }

    if (featured === "true") {
      filter.featured = true
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    // Execute query with pagination
    const properties = await Property.find(filter)
      .populate("owner", "firstName lastName email phone")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    // Get total count for pagination
    const total = await Property.countDocuments(filter)

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: Number.parseInt(page),
      total,
    })
  } catch (error) {
    console.error("Get properties error:", error)
    res.status(500).json({ error: "Failed to fetch properties" })
  }
})

// Get single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "firstName lastName email phone avatar isVerified",
    )

    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Increment view count
    property.views += 1
    await property.save()

    res.json({ property })
  } catch (error) {
    console.error("Get property error:", error)
    res.status(500).json({ error: "Failed to fetch property" })
  }
})

// Create new property (owner only)
router.post("/", auth, upload.array("images", 10), async (req, res) => {
  try {
    if (req.user.role !== "owner" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only property owners can create listings" })
    }

    const propertyData = {
      ...req.body,
      owner: req.user.userId,
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map((file, index) => ({
        url: `/uploads/properties/${file.filename}`,
        caption: `Property image ${index + 1}`,
        isPrimary: index === 0,
      }))
    }

    // Parse JSON fields if they're strings
    if (typeof propertyData.location === "string") {
      propertyData.location = JSON.parse(propertyData.location)
    }
    if (typeof propertyData.amenities === "string") {
      propertyData.amenities = JSON.parse(propertyData.amenities)
    }

    const property = new Property(propertyData)
    await property.save()

    const populatedProperty = await Property.findById(property._id).populate("owner", "firstName lastName email phone")

    res.status(201).json({
      message: "Property created successfully",
      property: populatedProperty,
    })
  } catch (error) {
    console.error("Create property error:", error)
    res.status(500).json({ error: "Failed to create property", details: error.message })
  }
})

// Update property (owner only)
router.put("/:id", auth, upload.array("images", 10), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Check if user owns this property or is admin
    if (property.owner.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this property" })
    }

    const updates = { ...req.body }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/properties/${file.filename}`,
        caption: `Property image ${index + 1}`,
        isPrimary: index === 0 && (!property.images || property.images.length === 0),
      }))

      updates.images = [...(property.images || []), ...newImages]
    }

    // Parse JSON fields if they're strings
    if (typeof updates.location === "string") {
      updates.location = JSON.parse(updates.location)
    }
    if (typeof updates.amenities === "string") {
      updates.amenities = JSON.parse(updates.amenities)
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate("owner", "firstName lastName email phone")

    res.json({
      message: "Property updated successfully",
      property: updatedProperty,
    })
  } catch (error) {
    console.error("Update property error:", error)
    res.status(500).json({ error: "Failed to update property" })
  }
})

// Delete property (owner only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Check if user owns this property or is admin
    if (property.owner.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this property" })
    }

    await Property.findByIdAndDelete(req.params.id)

    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    console.error("Delete property error:", error)
    res.status(500).json({ error: "Failed to delete property" })
  }
})

// Get properties by owner
router.get("/owner/:ownerId", async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.params.ownerId })
      .populate("owner", "firstName lastName email phone")
      .sort({ createdAt: -1 })

    res.json({ properties })
  } catch (error) {
    console.error("Get owner properties error:", error)
    res.status(500).json({ error: "Failed to fetch owner properties" })
  }
})

// Toggle favorite property
router.post("/:id/favorite", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    const propertyId = req.params.id

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const isFavorite = user.favorites.includes(propertyId)

    if (isFavorite) {
      user.favorites = user.favorites.filter((id) => id.toString() !== propertyId)
    } else {
      user.favorites.push(propertyId)
    }

    await user.save()

    res.json({
      message: isFavorite ? "Property removed from favorites" : "Property added to favorites",
      isFavorite: !isFavorite,
    })
  } catch (error) {
    console.error("Toggle favorite error:", error)
    res.status(500).json({ error: "Failed to toggle favorite" })
  }
})

module.exports = router
