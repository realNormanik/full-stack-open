import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Model anegdoty
const anecdoteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Votes must be an integer",
      },
    },
  },
  {
    versionKey: false,
  }
);

const Anecdote = mongoose.model("Anecdote", anecdoteSchema);

// Pomocnicza funkcja obsługująca błędy asynchroniczne
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

// GET /api/anecdotes
// Pobierz wszystkie anegdoty
app.get(
  "/api/anecdotes",
  asyncHandler(async (req, res) => {
    const anecdotes = await Anecdote.find({})
      .select("-_id id content votes")
      .lean();

    res.json(anecdotes);
  })
);

// GET /api/anecdotes/:id
// Pobierz pojedynczą anegdotę
app.get(
  "/api/anecdotes/:id",
  asyncHandler(async (req, res) => {
    const anecdote = await Anecdote.findOne({
      id: req.params.id,
    })
      .select("-_id id content votes")
      .lean();

    if (!anecdote) {
      return res.status(404).json({
        error: "Anecdote not found",
      });
    }

    res.json(anecdote);
  })
);

// POST /api/anecdotes
// Dodaj nową anegdotę
app.post(
  "/api/anecdotes",
  asyncHandler(async (req, res) => {
    const content =
      typeof req.body?.content === "string"
        ? req.body.content.trim()
        : "";

    if (!content) {
      return res.status(400).json({
        error: "Content is required",
      });
    }

    const anecdote = await Anecdote.create({
      id: randomUUID(),
      content,
      votes: 0,
    });

    res.status(201).json({
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes,
    });
  })
);

// POST /api/anecdotes/:id/vote
// Zwiększ liczbę głosów o jeden
app.post(
  "/api/anecdotes/:id/vote",
  asyncHandler(async (req, res) => {
    const anecdote = await Anecdote.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { votes: 1 } },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-_id id content votes")
      .lean();

    if (!anecdote) {
      return res.status(404).json({
        error: "Anecdote not found",
      });
    }

    res.json(anecdote);
  })
);

// PUT /api/anecdotes/:id
// Aktualizuj treść i/lub liczbę głosów
app.put(
  "/api/anecdotes/:id",
  asyncHandler(async (req, res) => {
    const updates = {};

    if (typeof req.body?.content === "string") {
      updates.content = req.body.content.trim();

      if (!updates.content) {
        return res.status(400).json({
          error: "Content cannot be empty",
        });
      }
    }

    if (req.body?.votes !== undefined) {
      if (
        !Number.isInteger(req.body.votes) ||
        req.body.votes < 0
      ) {
        return res.status(400).json({
          error: "Votes must be a non-negative integer",
        });
      }

      updates.votes = req.body.votes;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "Provide content or votes to update",
      });
    }

    const anecdote = await Anecdote.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-_id id content votes")
      .lean();

    if (!anecdote) {
      return res.status(404).json({
        error: "Anecdote not found",
      });
    }

    res.json(anecdote);
  })
);

// DELETE /api/anecdotes/:id
// Usuń anegdotę
app.delete(
  "/api/anecdotes/:id",
  asyncHandler(async (req, res) => {
    const anecdote = await Anecdote.findOneAndDelete({
      id: req.params.id,
    });

    if (!anecdote) {
      return res.status(404).json({
        error: "Anecdote not found",
      });
    }

    res.status(204).end();
  })
);

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: "An anecdote with this ID already exists",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON body",
    });
  }

  res.status(500).json({
    error: "Internal server error",
  });
});

// Połączenie z MongoDB i uruchomienie serwera
async function start() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;
    const port = process.env.PORT || 3001;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    }

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    }

    await mongoose.connect(mongoUri, {
      dbName: mongoName,
    });

    console.log(
      `Connected to MongoDB database: ${mongoName}`
    );

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

start();