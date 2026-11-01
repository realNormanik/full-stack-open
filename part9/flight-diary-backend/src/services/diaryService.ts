import { Collection, Db, MongoClient } from "mongodb";

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

interface Counter {
  _id: string;
  seq: number;
};

const DIARIES_COLLECTION = "diaries";
const COUNTERS_COLLECTION = "counters";
const DIARIES_COUNTER_ID = "diaries";

let client: MongoClient | null = null;
let dbPromise: Promise<Db> | null = null;

export const connectDb = (): Promise<Db> => {
  if (!dbPromise) {
    dbPromise = (async () => {
      const uri = process.env.MONGODB_URI;
      const dbName = process.env.MONGODB_NAME;

      if (!uri) {
        throw new Error("Missing MONGODB_URI environment variable");
      };

      if (!dbName) {
        throw new Error("Missing MONGODB_NAME environment variable");
      };

      const newClient = new MongoClient(uri);
      await newClient.connect();
      client = newClient;

      const db = newClient.db(dbName);
      await db.collection(DIARIES_COLLECTION).createIndex({ id: 1 }, { unique: true });

      return db;
    })();

    dbPromise.catch(() => {
      dbPromise = null;
    });
  };

  return dbPromise;
};

export const closeDb = async (): Promise<void> => {
  if (client) {
    await client.close();
  };

  client = null;
  dbPromise = null;
};

export const getDiariesCollection = async (): Promise<Collection<DiaryEntry>> => {
  const db = await connectDb();
  return db.collection<DiaryEntry>(DIARIES_COLLECTION);
};

export const getCountersCollection = async (): Promise<Collection<Counter>> => {
  const db = await connectDb();
  return db.collection<Counter>(COUNTERS_COLLECTION);
};

export const setDiariesCounter = async (seq: number): Promise<void> => {
  const counters = await getCountersCollection();
  await counters.updateOne(
    { _id: DIARIES_COUNTER_ID },
    { $set: { seq } },
    { upsert: true }
  );
};

const getNextId = async (): Promise<number> => {
  const counters = await getCountersCollection();
  const counter = await counters.findOneAndUpdate(
    { _id: DIARIES_COUNTER_ID },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );

  if (!counter) {
    throw new Error("Could not generate a new diary id");
  };

  return counter.seq;
};

const getEntries = async (): Promise<DiaryEntry[]> => {
  const diaries = await getDiariesCollection();
  return diaries
    .find<DiaryEntry>({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();
};

const getNonSensitiveEntries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const diaries = await getDiariesCollection();
  return diaries
    .find<NonSensitiveDiaryEntry>({}, { projection: { _id: 0, comment: 0 } })
    .sort({ id: 1 })
    .toArray();
};

const findById = async (id: number): Promise<DiaryEntry | undefined> => {
  const diaries = await getDiariesCollection();
  const entry = await diaries.findOne<DiaryEntry>({ id }, { projection: { _id: 0 } });
  return entry ?? undefined;
};

const addDiary = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const diaries = await getDiariesCollection();

  const newDiaryEntry: DiaryEntry = {
    id: await getNextId(),
    ...entry
  };

  await diaries.insertOne({ ...newDiaryEntry });
  return newDiaryEntry;
};

export default {
  findById,
  addDiary,
  getEntries,
  getNonSensitiveEntries
};