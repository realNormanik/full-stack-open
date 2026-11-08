const mongoose = require("mongoose");

const config = require("./config");

// Connects to MONGODB_URI and works inside the MONGODB_NAME database.
// All collections (users, blogs, readinglists, sessions) are created there.
async function connect() {
  const dbName = config.MONGODB_NAME;

  await mongoose.connect(config.MONGODB_URI, { dbName });

  console.log(`Connected to MongoDB database: ${dbName}`);

  // Make sure unique / TTL indexes exist (idempotent).
  await mongoose.connection.syncIndexes();
};

async function disconnect() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  };
};

module.exports = { connect, disconnect };
