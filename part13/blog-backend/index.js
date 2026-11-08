const app = require("./app");
const config = require("./utils/config");
const { connect, disconnect } = require("./utils/db");

async function start() {
  // Fail fast when the required environment variables are missing
  config.TOKEN;

  await connect();

  const server = app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`);
  });

  const shutdown = () => {
    server.close(async () => {
      await disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

start().catch((error) => {
  console.error("Failed to start the server:", error);
  process.exit(1);
});
