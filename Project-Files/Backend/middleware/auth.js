const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    // Check if user still exists
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ error: "Token is no longer valid." })
    }

    // Check if user is active
    if (user.status === "suspended") {
      return res.status(403).json({ error: "Account is suspended." })
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(401).json({ error: "Invalid token." })
  }
}

module.exports = auth
