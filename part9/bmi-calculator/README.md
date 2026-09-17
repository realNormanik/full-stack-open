# Full Stack Open 2024 - Part 9: BMI Calculator

This project implements a simple health-related API using **TypeScript**, **Node.js**, and **Express**. It allows users to:
- Calculate **Body Mass Index (BMI)** using height and weight
- Analyze **exercise habits** compared to a target via a daily log
- Access the same functionalities both **via CLI** and **web API**
- Enforce **static typing** and clean code practices using ESLint

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part9/
├── course-typescript
├── flight-diary-backend
├── flight-diary-frontend
├── patientor
├── patientor-backend
└── bmi-calculator/
    ├── src/
    │   ├── bmiCalculator.ts
    │   ├── exerciseCalculator.ts
    │   └── index.ts
    ├── .gitignore
    ├── eslint.config.mjs
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── tsconfig.json
```

All course materials for "BMI Calculator" exercises **9.1.–9.7.** are located inside the `bmi-calculator` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 🔧 Setup

- Initialized Node project with npm init
- Installed and configured TypeScript and ts-node
- Created tsconfig.json with strict rules
- Installed and configured ESLint for consistent code style

### 9.1: Body mass index

- Created `calculateBmi(height, weight)` function in `bmiCalculator.ts`
- Calculates BMI and returns interpretation (e.g., *Normal range*)
- Added npm script: `npm run calculateBmi`

### 9.2: Exercise calculator

- Created `calculateExercises(dailyHours, target)` in `exerciseCalculator.ts`
- Returns an object with summary stats:
  - Days trained
  - Target met?
  - Rating (1–3)
  - Descriptive feedback
- Used a TypeScript interface for return type
- Added npm script: `npm run calculateExercises`

### 9.3: Command line

- Extended both calculators to accept command-line arguments
- Implemented error handling for:
  - Missing inputs
  - Malformatted inputs (non-numeric values)
- Example:

```bash
npm run calculateBmi 180 74
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
```

### 9.4: Express

- Installed **Express**
- Created `index.ts` with `/hello` GET route returning `"Hello Full Stack!"`
- Set up:
  - `npm start` (production)
  - `npm run dev` (development via `ts-node-dev`)
- Updated `tsconfig.json` with strict compilation options

### 9.5: WebBMI

- Created `/bmi` GET route:
  - Accepts `height` and `weight` as query parameters
  - Returns JSON:
    ```json
    { "weight": 72, "height": 180, "bmi": "Normal range" }
    ```
  - Returns errors for:
    - Missing parameters
    - Non-numeric inputs

### 9.6: Eslint

- Configured ESLint to enforce:
  - No unused variables
  - No implicit any
  - Strict `null` checks
- Fixed all linting errors in the codebase

### 9.7: WebExercises

- Created `/exercises` POST route:
  - Accepts JSON body:
    ```json
    {
      "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
      "target": 2.5
    }
    ```
  - Returns result object like CLI version
  - Returns appropriate error messages:
    - `{ error: "parameters missing" }`
    - `{ error: "malformatted parameters" }`

## 📬 API Endpoints

| Method | Endpoint                    | Description                 |
|--------|-----------------------------|-----------------------------|
| GET    | `/hello`                    | Returns greeting string.    |
| GET    | `/bmi?height=180&weight=72` | Returns BMI classification. |
| POST   | `/exercises`                | Add new exercises.          |

### POST /exercises
- **Request Body**: 

  ```json
  {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  }
  ```

- **Response**:

  ```json
  {
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.21
  }
  ```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part9/bmi-calculator
```

3. Install the dependencies:

```bash
npm install
```

4. Run BMI calculator (CLI):

```bash
npm run calculateBmi 180 74
```

5. Run Exercise calculator (CLI):

```bash
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
```

6. Development mode:

```bash
npm run dev
```

7. Production mode:

```bash
npm run start
```

The server is available at [http://localhost:3003](http://localhost:3003).

## 🧠 Notes

- TypeScript's `noImplicitAny` helps enforce strict typing discipline early.
- Using `require.main === module` prevents CLI input parsing during module imports (crucial for server compatibility).
- Proper input validation with type guards improves both CLI and HTTP interface stability.
- TypeScript treats files without `import` or `export` as scripts — leading to duplicate identifier issues.
- Use `// eslint-disable-next-line` when working with unknown types from `req.body` for educational purposes only — not production best practice.