import { randomUUID } from "crypto";

import { Entry, Patient } from "../types";
import { getPatientsCollection } from "../db";
import { NewPatientZod } from "../schemas/patientSchema";

const getPatients = async (): Promise<Patient[]> => {
  return getPatientsCollection().find({}, { projection: { _id: 0 } }).toArray();
};

const addPatient = async (newPatient: NewPatientZod): Promise<Patient> => {
  const patient: Patient = {
    id: randomUUID(),
    ...newPatient,
    entries: []
  };

  // insertOne mutates the passed object (adds _id), so insert a copy.
  await getPatientsCollection().insertOne({ ...patient });
  return patient;
};

const getPatientById = async (id: string): Promise<Patient | null> => {
  return getPatientsCollection().findOne({ id }, { projection: { _id: 0 } });
};

const isEntryType = (type: any): type is "Hospital" | "OccupationalHealthcare" => {
  return ["Hospital", "OccupationalHealthcare"].includes(type);
};

const addEntryToPatient = async (id: string, entry: Entry): Promise<Entry> => {
  const result = await getPatientsCollection().updateOne(
    { id },
    { $push: { entries: entry } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Patient not found");
  };

  return entry;
};

export default {
  addPatient,
  isEntryType,
  getPatients,
  getPatientById,
  addEntryToPatient
};
