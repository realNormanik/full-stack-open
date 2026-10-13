import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    versionKey: false,
  }
);

const Anecdote = mongoose.model("Anecdote", anecdoteSchema);

// Początkowe dane
const anecdotes = [
  {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 6,
  },
  {
    content:
      "Adding manpower to a late software project makes it later!",
    id: "21149",
    votes: 2,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "69581",
    votes: 4,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "36975",
    votes: 7,
  },
  {
    content:
      "Premature optimization is the root of all evil.",
    id: "25170",
    votes: 1,
  },
  {
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    id: "98312",
    votes: 3,
  },
  {
    content: "If she love, she swallows",
    id: "Ayc3XUMTV60",
    votes: 5,
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;

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

    const count = await Anecdote.countDocuments();

    if (count > 0) {
      console.log(
        `Database already contains ${count} anecdotes. No changes made.`
      );
      return;
    }

    await Anecdote.insertMany(anecdotes);

    console.log(
      `Successfully imported ${anecdotes.length} anecdotes.`
    );
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});