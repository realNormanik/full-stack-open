import "dotenv/config";
import { MongoClient } from "mongodb";

import { Diagnosis, Patient } from "./src/types";
import patientEntries from "./data/patients";
import diagnosisEntries from "./data/diagnoses";
import { DIAGNOSES_COLLECTION, PATIENTS_COLLECTION } from "./src/db";

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

    const patients = db.collection<Patient>(PATIENTS_COLLECTION);
    const diagnoses = db.collection<Diagnosis>(DIAGNOSES_COLLECTION);

    // Ensure that patient IDs and diagnosis codes are unique.
    await patients.createIndex({ id: 1 }, { unique: true });
    await diagnoses.createIndex({ code: 1 }, { unique: true });

    // Remove existing entries.
    const deletedPatients = await patients.deleteMany({});
    const deletedDiagnoses = await diagnoses.deleteMany({});

    console.log(`Removed ${deletedPatients.deletedCount} existing patients`);
    console.log(`Removed ${deletedDiagnoses.deletedCount} existing diagnoses`);

    // Insert initial data (copies, because insertMany adds _id to the passed objects).
    const patientsResult = await patients.insertMany(patientEntries.map((patient) => ({ ...patient })));
    const diagnosesResult = await diagnoses.insertMany(diagnosisEntries.map((diagnosis) => ({ ...diagnosis })));

    console.log(`Inserted ${patientsResult.insertedCount} patients`);
    console.log(`Inserted ${diagnosesResult.insertedCount} diagnoses`);
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
