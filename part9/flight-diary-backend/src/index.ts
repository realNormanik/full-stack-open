import "dotenv/config";
import cors from "cors";
import express from "express";

import diaryRouter from "./routes/diaries";
import { connectDb, closeDb } from "./services/diaryService";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

const start = async () => {
  await connectDb();
  console.log("Connected to MongoDB");

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const shutdown = () => {
    server.close(async () => {
      await closeDb();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

start().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});