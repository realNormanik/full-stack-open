# Full Stack Open 2024 - Part 9: Patientor Frontend

This is the backend service for the Patientor application, a simple medical record system. It serves as an API that manages patients and diagnoses, handling validation and ensuring data integrity.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part9/
├── course-typescript
├── flight-diary-backend
├── flight-diary-frontend
├── bmi-calculator
├── patientor-backend
└── patientor-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── AddPatientModal/
    │   │   │   ├── AddPatientForm.tsx
    │   │   │   └── index.tsx
    │   │   ├── PatientListPage/
    │   │   │   └── index.tsx
    │   │   ├── PatientPage/
    │   │   │   ├── AddEntryForm.tsx
    │   │   │   ├── EntryDetails.tsx
    │   │   │   └── index.tsx
    │   │   └── HealthRatingBar.tsx
    │   ├── App.tsx
    │   ├── constants.ts
    │   ├── main.tsx
    │   ├── types.ts
    │   └── vite-env.d.ts
    ├── .eslintignore
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

All course materials for "Patientor Frontend" exercises **9.21.–9.30.** are located inside the `patientor-frontend` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 9.21: Patientor, step 1

- A new backend endpoint `GET /api/patients/:id` was introduced.
- Returns full information for a single patient, including a new field: an empty `entries` array.
- Defined an `Entry` interface (initially empty).
- Extended `Patient` type to include an `entries: Entry[]` field.

### 9.22: Patientor, step 2

- A new route and component in the frontend to display full information for a single patient.
- Clicking a patient's name in the patient list navigates to a detailed view.
- Fetches patient data from the newly created backend endpoint.
- Gender icons were added using Material UI Icons for visual clarity.

### 9.23: Patientor, step 3

- Defined two specific entry types in the backend:
  - `HospitalEntry`
  - `OccupationalHealthcareEntry`
- Updated the `Entry` union type to support these structures.
- Extended example patient data to include sample entries.
- Entries are now returned correctly in the response from `/api/patients/:id`.

### 9.24: Patientor, step 4

- Entries are now displayed on each patient's page.
- Displayed fields:
  - `date`
  - `description`
  - `diagnosisCodes`
- Copied the backend `Entry` type definitions into the frontend for consistency.
- Simple layout for listing entries was introduced.

### 9.25: Patientor, step 5

- The frontend now fetches diagnosis data from the `/api/diagnoses` endpoint.
- Diagnosis codes in entries are enriched with their corresponding descriptions.
- Diagnoses are stored in global application state for reuse across components.

### 9.26: Patientor, step 6

- Each entry type is now rendered differently using a dedicated UI component.
- Entry rendering uses a `switch` statement based on the entry `type`.
- Exhaustive type checking ensures all entry types are handled (TS will error on missing cases).
- Icons and structured UI were used to improve readability.

### 9.27: Patientor, step 7

- New POST endpoint: `POST /api/patients/:id/entries`
- Enables adding entries to a patient's `entries` array.
- Validates the `type` field and ensures required fields exist per entry type.
- Uses custom parsers like `parseDiagnosisCodes` to extract data safely.

### 9.28: Patientor, step 8

- A form component to add new entries was implemented.
- Only supports adding one entry type (e.g., `HealthCheckEntry`).
- All fields are simple text inputs.
- On success: entry is added to the patient, and entries are refreshed.
- On failure: error message is shown to the user.

### 9.29: Patientor, step 9

- The form was expanded to support all entry types:
  - `HospitalEntry`
  - `OccupationalHealthcareEntry`
  - `HealthCheckEntry`
- Form fields shown depend on the selected entry type.
- Conditional rendering logic was introduced to handle field differences.

### 9.30: Patientor, step 10

- Form inputs were upgraded to better ensure valid user input:
  - Dates use `<input type="date">`.
  - Diagnosis codes are selected with Material UI's `Select` component (with multiselect).
  - Health rating uses dropdowns or sliders to avoid invalid entries.
- Enhanced error handling and validation feedback.

## 📦 Type Definitions

```ts
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

export type NewPatient = Omit<Patient, "id" | "entries">;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part9/patientor-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
npm run dev
```

The application will run at [http://localhost:5173](http://localhost:5173). Ensure your GraphQL backend (from Part 8) is running at the expected endpoint (e.g., [http://localhost:3003](http://localhost:3003)).

## 🧠 Notes

- All fields in the `POST /api/patients` route are validated using **Zod**.
- The backend is built to integrate seamlessly with the existing frontend.
- The backend does not persist data between restarts; it's an in-memory demo.