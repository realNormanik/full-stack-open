import { Collection, Db, MongoClient } from "mongodb";

import { Diagnosis, Patient } from "./types";

export const PATIENTS_COLLECTION = "patients";
export const DIAGNOSES_COLLECTION = "diagnoses";

let client: MongoClient | undefined;
let db: Db | undefined;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    return db;
  };

  const mongoUri = process.env.MONGODB_URI;
  const mongoName = process.env.MONGODB_NAME;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in .env");
  };

  if (!mongoName) {
    throw new Error("Missing MONGODB_NAME in .env");
  };

  // ignoreUndefined: optional fields (e.g. sickLeave) are skipped instead of stored as null.
  client = new MongoClient(mongoUri, { ignoreUndefined: true });
  await client.connect();

  db = client.db(mongoName);

  console.log("Connected to MongoDB database");

  return db;
};

const getDb = (): Db => {
  if (!db) {
    throw new Error("Database is not connected. Call connectToDatabase() first.");
  };

  return db;
};

export const getPatientsCollection = (): Collection<Patient> => {
  return getDb().collection<Patient>(PATIENTS_COLLECTION);
};

export const getDiagnosesCollection = (): Collection<Diagnosis> => {
  return getDb().collection<Diagnosis>(DIAGNOSES_COLLECTION);
};

export const closeDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
    console.log("MongoDB connection closed");
  };
};
