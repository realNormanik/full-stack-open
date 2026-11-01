import express from "express";

import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", async (_req, res): Promise<void> => {
  res.json(await diagnoseService.getDiagnoses());
});

export default router;
