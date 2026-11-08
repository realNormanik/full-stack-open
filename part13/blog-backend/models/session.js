const mongoose = require("mongoose");

// Server-side session of an issued JWT. Logging out removes the document,
// MongoDB removes expired sessions on its own (TTL index on `expiresAt`).
const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("Session", sessionSchema);
