import { Diagnosis } from "../types";
import { getDiagnosesCollection } from "../db";

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  return getDiagnosesCollection().find({}, { projection: { _id: 0 } }).toArray();
};

export default {
  getDiagnoses
};
