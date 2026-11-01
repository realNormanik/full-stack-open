import express from "express";

import toNewDiaryEntry from "../utils";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    res.send(await diaryService.getNonSensitiveEntries());
  } catch (error: unknown) {
    console.error(error);
    res.sendStatus(500);
  };
});

router.get("/:id", async (req, res) => {
  try {
    const diary = await diaryService.findById(Number(req.params.id));

    if (diary) {
      res.send(diary);
    } else {
      res.sendStatus(404);
    };
  } catch (error: unknown) {
    console.error(error);
    res.sendStatus(500);
  };
});

router.post("/", async (req, res) => {
  let newDiaryEntry;

  try {
    newDiaryEntry = toNewDiaryEntry(req.body);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    };

    res.status(400).send(errorMessage);
    return;
  };

  try {
    const addedEntry = await diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    console.error(error);
    res.sendStatus(500);
  };
});

export default router;