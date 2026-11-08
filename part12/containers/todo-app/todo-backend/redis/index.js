const { createClient } = require("redis");
const { REDIS_URL } = require("../util/config");

let getAsync;
let setAsync;

if (!REDIS_URL) {
  const redisIsDisabled = async () => {
    console.log("No REDIS_URL set, Redis is disabled")
    return null
  };

  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  const client = createClient({ url: REDIS_URL });

  // Without an "error" listener a connection problem would crash the process
  client.on("error", (error) => console.error("Redis client error:", error.message));

  client
    .connect()
    .then(() => console.log("Connected to Redis"))
    .catch((error) => console.error("Redis connection failed:", error.message));

  // Return null instead of throwing/hanging when Redis is not connected,
  // so adding a todo still works without Redis
  const whenReady = (command) => async (...args) => {
    if (!client.isReady) {
      console.warn("Redis is not connected, skipping command");
      return null;
    };

    return command(...args)
  };

  getAsync = whenReady((key) => client.get(key));
  setAsync = whenReady((key, value) => client.set(key, String(value)));
};

module.exports = {
  getAsync,
  setAsync
};
