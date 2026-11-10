const mongoose = require("mongoose");

const config = require("./config");

// The connection promise is cached on globalThis. On Vercel (serverless) a warm
// function instance handles many requests, so it must reuse the connection
// instead of opening a new one for each request.
const state = globalThis.__mongooseState || (globalThis.__mongooseState = { promise: null });

// Connects (once) to MONGODB_URI and works inside the MONGODB_NAME database.
// All collections (users, blogs, readinglists, sessions) are created there.
function ensureConnection() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  };

  if (!state.promise) {
    state.promise = mongoose
      .connect(config.MONGODB_URI, {
        dbName: config.MONGODB_NAME,
        // Fail with the real cause (bad URI, Atlas IP allow-list, wrong password...)
        // before Mongoose's own 10 s "buffering timed out" error hides it.
        serverSelectionTimeoutMS: 8000,
        maxPoolSize: 5,
      })
      .then(() => mongoose.connection)
      .catch((error) => {
        // Allow the next request to try again
        state.promise = null;

        throw error;
      });
  };

  return state.promise;
};

// Used by index.js, cli.js and the tests: connects and makes sure unique / TTL
// indexes exist (idempotent). It is NOT run on every serverless cold start.
async function connect() {
  await ensureConnection();

  console.log(`Connected to MongoDB database: ${config.MONGODB_NAME}`);

  await mongoose.connection.syncIndexes();
};

async function disconnect() {
  state.promise = null;

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  };
};

module.exports = { connect, disconnect, ensureConnection };
