const express = require("express")
const Inquiry = require("../models/Inquiry")
const Property = require("../models/Property")
const auth = require("../middleware/auth")

const router = express.Router()

// Create new inquiry
router.post("/", auth, async (req, res) => {
  try {
    const { propertyId, message, contactInfo } = req.body

    // Get property to find owner
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }

    // Check if user already has an inquiry for this property
    const existingInquiry = await Inquiry.findOne({
      property: propertyId,
      renter: req.user.userId,
    })

    if (existingInquiry) {
      return res.status(400).json({ error: "You already have an inquiry for this property" })
    }

    const inquiry = new Inquiry({
      property: propertyId,
      renter: req.user.userId,
      owner: property.owner,
      message,
      contactInfo,
    })

    await inquiry.save()

    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("property", "title location price")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone")

    res.status(201).json({
      message: "Inquiry sent successfully",
      inquiry: populatedInquiry,
    })
  } catch (error) {
    console.error("Create inquiry error:", error)
    res.status(500).json({ error: "Failed to send inquiry" })
  }
})

// Get inquiries for current user
router.get("/my-inquiries", auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ renter: req.user.userId })
      .populate("property", "title location price images")
      .populate("owner", "firstName lastName email phone")
      .sort({ createdAt: -1 })

    res.json({ inquiries })
  } catch (error) {
    console.error("Get inquiries error:", error)
    res.status(500).json({ error: "Failed to fetch inquiries" })
  }
})

// Get inquiries for property owner
router.get("/received", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Only property owners can view received inquiries" })
    }

    const inquiries = await Inquiry.find({ owner: req.user.userId })
      .populate("property", "title location price images")
      .populate("renter", "firstName lastName email phone")
      .sort({ createdAt: -1 })

    res.json({ inquiries })
  } catch (error) {
    console.error("Get received inquiries error:", error)
    res.status(500).json({ error: "Failed to fetch received inquiries" })
  }
})

// Update inquiry status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" })
    }

    // Check if user is the owner of the property
    if (inquiry.owner.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this inquiry" })
    }

    inquiry.status = status
    await inquiry.save()

    const updatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("property", "title location price")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone")

    res.json({
      message: "Inquiry status updated successfully",
      inquiry: updatedInquiry,
    })
  } catch (error) {
    console.error("Update inquiry status error:", error)
    res.status(500).json({ error: "Failed to update inquiry status" })
  }
})

// Respond to inquiry
router.put("/:id/respond", auth, async (req, res) => {
  try {
    const { message } = req.body
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" })
    }

    // Check if user is the owner of the property
    if (inquiry.owner.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to respond to this inquiry" })
    }

    inquiry.response = {
      message,
      respondedAt: new Date(),
    }
    inquiry.status = "responded"
    await inquiry.save()

    const updatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("property", "title location price")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone")

    res.json({
      message: "Response sent successfully",
      inquiry: updatedInquiry,
    })
  } catch (error) {
    console.error("Respond to inquiry error:", error)
    res.status(500).json({ error: "Failed to respond to inquiry" })
  }
})

// Schedule viewing
router.put("/:id/schedule-viewing", auth, async (req, res) => {
  try {
    const { viewingDate } = req.body
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" })
    }

    // Check if user is involved in this inquiry
    const isAuthorized =
      inquiry.owner.toString() === req.user.userId ||
      inquiry.renter.toString() === req.user.userId ||
      req.user.role === "admin"

    if (!isAuthorized) {
      return res.status(403).json({ error: "Not authorized to schedule viewing for this inquiry" })
    }

    inquiry.viewingScheduled = true
    inquiry.viewingDate = new Date(viewingDate)
    inquiry.status = "responded"
    await inquiry.save()

    const updatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("property", "title location price")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone")

    res.json({
      message: "Viewing scheduled successfully",
      inquiry: updatedInquiry,
    })
  } catch (error) {
    console.error("Schedule viewing error:", error)
    res.status(500).json({ error: "Failed to schedule viewing" })
  }
})

module.exports = router
