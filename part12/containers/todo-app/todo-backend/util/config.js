require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || undefined;
const MONGODB_NAME = process.env.MONGODB_NAME || undefined;
const REDIS_URL = process.env.REDIS_URL || undefined;

if (MONGODB_URI && !MONGODB_NAME) {
  throw new Error("Missing MONGODB_NAME in .env")
};

module.exports = {
  MONGODB_URI,
  MONGODB_NAME,
  REDIS_URL
};
