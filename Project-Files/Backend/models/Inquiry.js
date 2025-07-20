const mongoose = require("mongoose")

const inquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: String,
    phone: String,
  },
  status: {
    type: String,
    enum: ["new", "read", "responded", "closed"],
    default: "new",
  },
  response: {
    message: String,
    respondedAt: Date,
  },
  viewingScheduled: {
    type: Boolean,
    default: false,
  },
  viewingDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

inquirySchema.index({ property: 1, renter: 1 })
inquirySchema.index({ owner: 1, status: 1 })

inquirySchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Inquiry", inquirySchema)
