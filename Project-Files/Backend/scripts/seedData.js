const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Property = require("../models/Property")
const dotenv = require("dotenv")

dotenv.config()

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/househunt")
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Property.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@househunt.com",
      password: "admin123",
      phone: "+1-555-000-0001",
      role: "admin",
      status: "active",
      isVerified: true,
    })
    await adminUser.save()

    // Create property owners
    const owner1 = new User({
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      password: "owner123",
      phone: "+1-555-123-4567",
      role: "owner",
      status: "active",
      isVerified: true,
    })
    await owner1.save()

    const owner2 = new User({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      password: "owner123",
      phone: "+1-555-234-5678",
      role: "owner",
      status: "active",
      isVerified: true,
    })
    await owner2.save()

    // Create renters
    const renter1 = new User({
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike.wilson@email.com",
      password: "renter123",
      phone: "+1-555-345-6789",
      role: "renter",
      status: "active",
      isVerified: true,
    })
    await renter1.save()

    const renter2 = new User({
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@email.com",
      password: "renter123",
      phone: "+1-555-456-7890",
      role: "renter",
      status: "active",
      isVerified: true,
    })
    await renter2.save()

    // Create sample properties
    const properties = [
      {
        title: "Cozy Studio in Queens",
        description:
          "Affordable studio apartment with basic amenities in a quiet neighborhood. Perfect for students or young professionals.",
        location: {
          address: "123 Main Street",
          city: "Queens",
          state: "New York",
          zipCode: "11101",
          coordinates: { lat: 40.7589, lng: -73.9851 },
        },
        price: 1400,
        type: "studio",
        bedrooms: 1,
        bathrooms: 1,
        area: 450,
        images: [
          { url: "/uploads/properties/studio1.jpg", caption: "Living area", isPrimary: true },
          { url: "/uploads/properties/studio1-kitchen.jpg", caption: "Kitchen" },
        ],
        amenities: ["wifi", "ac", "kitchen", "security"],
        owner: owner1._id,
        status: "available",
        featured: true,
      },
      {
        title: "2BR Apartment in Dallas",
        description: "Well-maintained apartment with pool access and modern amenities.",
        location: {
          address: "456 Oak Avenue",
          city: "Dallas",
          state: "Texas",
          zipCode: "75201",
          coordinates: { lat: 32.7767, lng: -96.797 },
        },
        price: 1300,
        type: "apartment",
        bedrooms: 2,
        bathrooms: 1,
        area: 700,
        images: [
          { url: "/uploads/properties/apt1.jpg", caption: "Living room", isPrimary: true },
          { url: "/uploads/properties/apt1-bedroom.jpg", caption: "Master bedroom" },
        ],
        amenities: ["wifi", "parking", "pool", "gym", "ac"],
        owner: owner2._id,
        status: "available",
        featured: true,
      },
      {
        title: "Shared Room in Brooklyn",
        description: "Budget-friendly shared room in a friendly household with working professionals.",
        location: {
          address: "789 Brooklyn Ave",
          city: "Brooklyn",
          state: "New York",
          zipCode: "11201",
          coordinates: { lat: 40.6892, lng: -73.9442 },
        },
        price: 800,
        type: "room",
        bedrooms: 1,
        bathrooms: 1,
        area: 200,
        images: [{ url: "/uploads/properties/room1.jpg", caption: "Bedroom", isPrimary: true }],
        amenities: ["wifi", "kitchen", "laundry"],
        owner: owner1._id,
        status: "available",
      },
    ]

    for (const propertyData of properties) {
      const property = new Property(propertyData)
      await property.save()
    }

    console.log("Sample data created successfully!")
    console.log("\nLogin credentials:")
    console.log("Admin: admin@househunt.com / admin123")
    console.log("Owner 1: john.smith@email.com / owner123")
    console.log("Owner 2: sarah.johnson@email.com / owner123")
    console.log("Renter 1: mike.wilson@email.com / renter123")
    console.log("Renter 2: emily.davis@email.com / renter123")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
