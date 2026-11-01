import { randomUUID } from "crypto";

import {
  Entry,
  Gender,
  Diagnosis,
  NewPatient,
  HospitalEntry,
  HealthCheckEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry
} from "./types";

// --- Helpers ---
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  };

  return value;
};

// --- Parsers for NewPatient ---
export const parseName = (name: unknown): string => parseString(name, "name");

export const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth");
  };

  return date;
};

export const parseSsn = (ssn: unknown): string => parseString(ssn, "ssn");

export const parseOccupation = (occupation: unknown): string => parseString(occupation, "occupation");

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  };

  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

// --- Entry Parsers ---

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  };

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewEntry = (object: any): Entry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing entry data");
  };

  const baseEntry = {
    id: randomUUID(),
    description: parseString(object.description, "description"),
    date: parseString(object.date, "date"),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseString(object.discharge?.date, "discharge.date"),
          criteria: parseString(object.discharge?.criteria, "discharge.criteria"),
        }
      } as HospitalEntry;

    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: object.sickLeave
          ? {
              startDate: parseString(object.sickLeave.startDate, "sickLeave.startDate"),
              endDate: parseString(object.sickLeave.endDate, "sickLeave.endDate"),
            }
          : undefined
      } as OccupationalHealthcareEntry;

    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      } as HealthCheckEntry;

    default:
      throw new Error(`Unsupported entry type: ${object.type}`);
  };
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (typeof value !== "number" || !Object.values(HealthCheckRating).includes(value)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${value}`);
  };

  return value;
};