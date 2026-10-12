const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  };

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    };

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };