import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";

import { closeDatabase, connectToDatabase } from "./db";
import patientRouter from "./routes/patients";
import diagnoseRouter from "./routes/diagnoses";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req: Request, res: Response): void => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT || 3003;

const start = async (): Promise<void> => {
  await connectToDatabase();

  app.listen(PORT, (): void => {
    console.log(`The server is running on port ${PORT}`);
  });
};

start().catch((error: unknown) => {
  console.error("Failed to start the server:", error);
  process.exit(1);
});

const shutdown = async (): Promise<void> => {
  await closeDatabase();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
