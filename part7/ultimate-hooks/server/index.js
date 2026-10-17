import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const noteSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      min: 1,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    versionKey: false,
  }
);

const personSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      min: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    number: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    versionKey: false,
  }
);

const counterSchema = new mongoose.Schema(
  {
    _id: String,
    seq: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const Note = mongoose.model("Note", noteSchema);
const Person = mongoose.model("Person", personSchema);
const Counter = mongoose.model("Counter", counterSchema);

// Handle asynchronous errors
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

// Generate the next numeric ID atomically

const getNextId = async (model, counterName) => {
  const lastDocument = await model
    .findOne({})
    .sort({ id: -1 })
    .select("id")
    .lean();

  const currentMaxId = lastDocument?.id ?? 0;

  // Synchronize the counter with existing documents.
  await Counter.findOneAndUpdate(
    { _id: counterName },
    { $max: { seq: currentMaxId } },
    { upsert: true }
  );

  // Atomically increment the counter and return the updated document.
  const counter = await Counter.findOneAndUpdate(
    { _id: counterName },
    { $inc: { seq: 1 } },
    { returnDocument: "after" }
  );

  return counter.seq;
};

// GET /api/notes
// Fetch all notes
app.get(
  "/api/notes",
  asyncHandler(async (req, res) => {
    const notes = await Note.find({})
      .select("-_id id content")
      .sort({ id: 1 })
      .lean();

    res.json(notes);
  })
);

// POST /api/notes
// Create a note
app.post(
  "/api/notes",
  asyncHandler(async (req, res) => {
    const content =
      typeof req.body?.content === "string" ? req.body.content.trim() : "";

    if (!content) {
      return res.status(400).json({
        error: "Content is required",
      });
    };

    const id = await getNextId(Note, "notes");

    const note = await Note.create({ id, content,});

    res.status(201).json({
      id: note.id,
      content: note.content,
    });
  })
);

// DELETE /api/notes/:id
// Delete a note
app.delete(
  "/api/notes/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "Invalid note ID",
      });
    };

    const note = await Note.findOneAndDelete({ id });

    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    };

    res.status(204).end();
  })
);

// GET /api/persons
// Fetch all persons
app.get(
  "/api/persons",
  asyncHandler(async (req, res) => {
    const persons = await Person.find({}).select("-_id id name number").sort({ id: 1 }).lean();

    res.json(persons);
  })
);

// POST /api/persons
// Create a person
app.post(
  "/api/persons",
  asyncHandler(async (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const number = typeof req.body?.number === "string" ? req.body.number.trim() : "";

    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    };

    if (!number) {
      return res.status(400).json({
        error: "Number is required",
      });
    };

    const id = await getNextId(Person, "persons");
    const person = await Person.create({
      id,
      name,
      number,
    });

    res.status(201).json({
      id: person.id,
      name: person.name,
      number: person.number,
    });
  })
);

// DELETE /api/persons/:id
// Delete a person
app.delete(
  "/api/persons/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "Invalid person ID",
      });
    };

    const person = await Person.findOneAndDelete({ id });

    if (!person) {
      return res.status(404).json({
        error: "Person not found",
      });
    };

    res.status(204).end();
  })
);

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  };

  if (err.code === 11000) {
    return res.status(409).json({
      error: "A document with this ID already exists",
    });
  };

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: err.message,
    });
  };

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON body",
    });
  };

  res.status(500).json({
    error: "Internal server error",
  });
});

async function start() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;
    const port = process.env.PORT || 3001;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    };

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    };

    await mongoose.connect(mongoUri, { dbName: mongoName, });

    console.log(`Connected to MongoDB database: ${mongoName}`);

    // Initialize the counters before accepting requests.
    // Existing IDs are preserved.
    await getNextId(Note, "notes").then(async (id) => {
      await Counter.findOneAndUpdate({ _id: "notes" }, { $set: { seq: id - 1 } });
    });

    await getNextId(Person, "persons").then(async (id) => {
      await Counter.findOneAndUpdate({ _id: "persons" }, { $set: { seq: id - 1 } });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  };
};

start();