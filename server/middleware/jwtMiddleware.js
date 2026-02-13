// server/middleware/jwtMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "HyperionDev";

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });

    // ✅ your controllers expect req.payload.name = email
    req.payload = decoded;

    return next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

module.exports = { jwtMiddleware };
