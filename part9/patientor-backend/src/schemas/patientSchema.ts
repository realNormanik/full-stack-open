import { z } from "zod";

import { Gender } from "../types";

export const newPatientSchema = z.object({
  name: z.string({ error: "Name is required" }),
  dateOfBirth: z
    .string({ error: "Date of birth is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format"
    }),
  ssn: z.string({ error: "SSN is required" }),
  gender: z.enum(Gender, { error: "Gender is required" }),
  occupation: z.string({ error: "Occupation is required" })
});

export type NewPatientZod = z.infer<typeof newPatientSchema>;
