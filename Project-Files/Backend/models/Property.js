const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["apartment", "house", "room", "studio"],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  area: {
    type: Number,
    required: true,
  },
  images: [
    {
      url: String,
      caption: String,
      isPrimary: {
        type: Boolean,
        default: false,
      },
    },
  ],
  amenities: [
    {
      type: String,
      enum: [
        "wifi",
        "parking",
        "kitchen",
        "laundry",
        "ac",
        "heating",
        "gym",
        "pool",
        "security",
        "elevator",
        "balcony",
        "garden",
        "pets_allowed",
        "furnished",
        "dishwasher",
        "microwave",
      ],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "rented", "pending", "inactive"],
    default: "available",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  availability: {
    availableFrom: Date,
    leaseTerm: {
      type: String,
      enum: ["monthly", "6months", "1year", "flexible"],
    },
  },
  rules: {
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    smokingAllowed: {
      type: Boolean,
      default: false,
    },
    maxOccupants: Number,
  },
  utilities: {
    included: [String],
    excluded: [String],
    estimatedCost: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Index for search functionality
propertySchema.index({
  title: "text",
  description: "text",
  "location.city": "text",
  "location.state": "text",
})

propertySchema.index({ "location.city": 1, price: 1 })
propertySchema.index({ type: 1, bedrooms: 1 })
propertySchema.index({ owner: 1 })

// Update timestamp on save
propertySchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Property", propertySchema)
