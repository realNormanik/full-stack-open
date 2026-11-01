import "dotenv/config";
import { MongoClient } from "mongodb";

const DIARIES_COLLECTION = "diaries";
const COUNTERS_COLLECTION = "counters";
const DIARIES_COUNTER_ID = "diaries";

interface Counter {
  _id: string;
  seq: number;
};

const diaryEntries = [
  {
    id: 1,
    date: "2017-01-01",
    weather: "rainy",
    visibility: "poor",
    comment: "Pretty scary flight, I'm glad I'm alive",
  },
  {
    id: 2,
    date: "2017-04-01",
    weather: "sunny",
    visibility: "good",
    comment: "Everything went better than expected, I'm learning much",
  },
  {
    id: 3,
    date: "2017-04-15",
    weather: "windy",
    visibility: "good",
    comment: "I'm getting pretty confident although I hit a flock of birds",
  },
  {
    id: 4,
    date: "2017-05-11",
    weather: "cloudy",
    visibility: "good",
    comment: "I almost failed the landing but I survived",
  },
];

const seed = async (): Promise<void> => {
  let client: MongoClient | undefined;

  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    };

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    };

    client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db(mongoName);

    console.log(`Connected to MongoDB database: ${mongoName}`);

    const diaries = db.collection(DIARIES_COLLECTION);
    const counters = db.collection<Counter>(COUNTERS_COLLECTION);

    // Ensure that diary IDs are unique.
    await diaries.createIndex({ id: 1 }, { unique: true });

    // Remove existing diary entries.
    const deleted = await diaries.deleteMany({});

    console.log(`Removed ${deleted.deletedCount} existing entries`);

    // Insert initial diary entries.
    const result = await diaries.insertMany(diaryEntries);

    console.log(`Inserted ${result.insertedCount} entries`);

    // Set the counter to the highest seeded ID.
    const maxId = Math.max(0, ...diaryEntries.map((entry) => entry.id));

    await counters.updateOne(
      { _id: DIARIES_COUNTER_ID },
      { $set: { seq: maxId } },
      { upsert: true }
    );

    console.log(`Id counter set to ${maxId}`);
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    };
  };
};

seed().catch((error: unknown) => {
  console.error("Seeding failed:", error);
  process.exitCode = 1;
});