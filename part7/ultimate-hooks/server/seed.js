
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

const Note = mongoose.model("Note", noteSchema);
const Person = mongoose.model("Person", personSchema);

const notes = [
  {
    id: 1,
    content: "custom-hooks are awesome!",
  },
  {
    id: 2,
    content: "best feature ever <3",
  },
];

const persons = [
  {
    id: 1,
    name: "mluukkai",
    number: "040-5483923",
  },
  {
    id: 2,
    name: "hellas",
    number: "012-123123",
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    };

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    };

    await mongoose.connect(mongoUri, { dbName: mongoName, });

    console.log(`Connected to MongoDB database: ${mongoName}`);

    // Seed notes independently
    const notesCount = await Note.countDocuments();

    if (notesCount > 0) {
      console.log(`Database already contains ${notesCount} notes. No changes made.`);
    } else {
      await Note.insertMany(notes);

      console.log(`Successfully imported ${notes.length} notes.`);
    };

    // Seed persons independently
    const personsCount = await Person.countDocuments();

    if (personsCount > 0) {
      console.log(`Database already contains ${personsCount} persons. No changes made.`);
    } else {
      await Person.insertMany(persons);

      console.log(`Successfully imported ${persons.length} persons.`);
    };
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    };
  };
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});