import { Gender, Patient } from "../src/types";
import { randomUUID } from "crypto";

const patients: Patient[] = [
  {
    id: randomUUID(),
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: Gender.Male,
    occupation: "New York City cop",
    entries: [
      {
        id: randomUUID(),
        date: "2020-01-01",
        type: "Hospital",
        specialist: "Dr. House",
        description: "Treated for broken ribs after jumping off a building.",
        diagnosisCodes: ["S03.5"],
        discharge: {
          date: "2020-01-05",
          criteria: "No more internal bleeding"
        }
      }
    ]
  },
  {
    id: randomUUID(),
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-321Y",
    gender: Gender.Male,
    occupation: "Los Angeles cop",
    entries: [
      {
        id: randomUUID(),
        date: "2021-03-15",
        type: "OccupationalHealthcare",
        specialist: "Dr. Strange",
        employerName: "LAPD",
        description: "Annual check-up",
        sickLeave: {
          startDate: "2021-03-16",
          endDate: "2021-03-18"
        }
      }
    ]
  }
];

export default patients;