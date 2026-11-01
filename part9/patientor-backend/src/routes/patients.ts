import express from "express";

import { toNewEntry } from "../utils";
import patientService from "../services/patientService";
import { newPatientSchema } from "../schemas/patientSchema";

const router = express.Router();

router.get("/", async (_req, res): Promise<void> => {
  res.json(await patientService.getPatients());
});

router.get("/:id", async (req, res): Promise<void> => {
  const patient = await patientService.getPatientById(req.params.id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  };

  res.json(patient);
});

router.post("/", async (req, res): Promise<void> => {
  const parseResult = newPatientSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.issues });
    return;
  };

  const addedPatient = await patientService.addPatient(parseResult.data);
  res.json(addedPatient);
});

router.post("/:id/entries", async (req, res): Promise<void> => {
  try {
    const patient = await patientService.getPatientById(req.params.id);

    if (!patient) {
      res.status(404).send({ error: "Patient not found" });
      return;
    };

    const newEntry = toNewEntry(req.body);
    const addedEntry = await patientService.addEntryToPatient(patient.id, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";

    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    };

    res.status(400).send({ error: errorMessage });
  };
});

export default router;
