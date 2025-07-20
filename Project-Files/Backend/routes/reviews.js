const express = require("express")
const Review = require("../models/Review")
const Property = require("../models/Property")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all reviews with filtering
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, propertyId, rating, sortBy = "createdAt", sortOrder = "desc" } = req.query

    const filter = {}

    if (propertyId) {
      filter.property = propertyId
    }

    if (rating) {
      filter.rating = Number.parseInt(rating)
    }

    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    const reviews = await Review.find(filter)
      .populate("reviewer", "firstName lastName avatar")
      .populate("property", "title location")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await Review.countDocuments(filter)

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: Number.parseInt(page),
      total,
    })
  } catch (error) {
    console.error("Get reviews error:", error)
    res.status(500).json({ error: "Failed to fetch reviews" })
  }
})

// Create new review
router.post("/", auth, async (req, res) => {
  try {
    const { propertyId, rating, title, content, tags } = req.body

    // Check if property exists
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      property: propertyId,
      reviewer: req.user.userId,
    })

    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this property" })
    }

    const review = new Review({
      property: propertyId,
      reviewer: req.user.userId,
      owner: property.owner,
      rating,
      title,
      content,
      tags: tags || [],
    })

    await review.save()

    const populatedReview = await Review.findById(review._id)
      .populate("reviewer", "firstName lastName avatar")
      .populate("property", "title location")

    res.status(201).json({
      message: "Review created successfully",
      review: populatedReview,
    })
  } catch (error) {
    console.error("Create review error:", error)
    res.status(500).json({ error: "Failed to create review" })
  }
})

// Update review
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }

    // Check if user owns this review
    if (review.reviewer.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this review" })
    }

    const updates = req.body
    delete updates.reviewer // Don't allow changing reviewer
    delete updates.property // Don't allow changing property

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
      .populate("reviewer", "firstName lastName avatar")
      .populate("property", "title location")

    res.json({
      message: "Review updated successfully",
      review: updatedReview,
    })
  } catch (error) {
    console.error("Update review error:", error)
    res.status(500).json({ error: "Failed to update review" })
  }
})

// Delete review
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }

    // Check if user owns this review or is admin
    if (review.reviewer.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this review" })
    }

    await Review.findByIdAndDelete(req.params.id)

    res.json({ message: "Review deleted successfully" })
  } catch (error) {
    console.error("Delete review error:", error)
    res.status(500).json({ error: "Failed to delete review" })
  }
})

// Mark review as helpful
router.post("/:id/helpful", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }

    const userId = req.user.userId
    const hasMarkedHelpful = review.helpfulBy.includes(userId)

    if (hasMarkedHelpful) {
      // Remove from helpful
      review.helpfulBy = review.helpfulBy.filter((id) => id.toString() !== userId)
      review.helpful = Math.max(0, review.helpful - 1)
    } else {
      // Add to helpful
      review.helpfulBy.push(userId)
      review.helpful += 1
    }

    await review.save()

    res.json({
      message: hasMarkedHelpful ? "Removed from helpful" : "Marked as helpful",
      helpful: review.helpful,
      hasMarkedHelpful: !hasMarkedHelpful,
    })
  } catch (error) {
    console.error("Mark helpful error:", error)
    res.status(500).json({ error: "Failed to mark review as helpful" })
  }
})

// Respond to review (property owner only)
router.post("/:id/respond", auth, async (req, res) => {
  try {
    const { message } = req.body
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }

    // Check if user is the property owner
    if (review.owner.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only property owners can respond to reviews" })
    }

    review.response = {
      message,
      respondedAt: new Date(),
      respondedBy: req.user.userId,
    }

    await review.save()

    const updatedReview = await Review.findById(review._id)
      .populate("reviewer", "firstName lastName avatar")
      .populate("property", "title location")
      .populate("response.respondedBy", "firstName lastName")

    res.json({
      message: "Response added successfully",
      review: updatedReview,
    })
  } catch (error) {
    console.error("Respond to review error:", error)
    res.status(500).json({ error: "Failed to respond to review" })
  }
})

module.exports = router
