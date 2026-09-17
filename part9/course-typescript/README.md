# Full Stack Open 2024 - Part 9: Course Parts App

This project is a small React + TypeScript application built using Vite. It demonstrates the use of **typed props**, **component decomposition**, and **discriminated union types** in TypeScript. The app lists parts of a course, including their types and metadata, and calculates the total number of exercises.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part9/
├── bmi-calculator
├── patientor-backend
├── patientor-frontend
├── flight-diary-backend
├── flight-diary-frontend
└── course-typescript/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── Content.tsx
    │   │   ├── Header.tsx
    │   │   ├── Part.tsx
    │   │   └── Total.tsx
    │   ├── App.tsx
    │   └── main.tsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

All course materials for "Patientor Backend" exercises **9.15.–9.16.** are located inside the `course-typescript` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 9.15

- A new Vite project with React and TypeScript was created.
- The app was initially a single `App.tsx` file with hardcoded course data.
- The logic was refactored into three functional components:
  - `Header`: renders the course title.
  - `Content`: lists all course parts.
  - `Total`: displays the total exercise count.
- All components receive data through typed props.

### 9.16

- Introduced a union type `CoursePart` composed of:
  - `CoursePartBasic`
  - `CoursePartGroup`
  - `CoursePartBackground`
  - `CoursePartSpecial` (added later)
- Created a shared base type `CoursePartWithDescription` to avoid repeating the `description` field.
- Extracted a `Part` component to handle rendering based on the `kind` field.
- Used `switch (part.kind)` with exhaustive type checking to ensure all variants are handled.
- Added a new kind: `special` with a `requirements` field (array of strings).
- Updated `Content` to render each part via the new `Part` component.
- TypeScript now guarantees that all possible `CoursePart.kind` values are accounted for.

## 📦 Type Definitions

```ts
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part9/course-typescript
```

3. Install the dependencies:

```bash
npm install
```

4. Development mode:

```bash
npm run dev
```

The Application is available at [http://localhost:5137](http://localhost:5137).

## 🧠 Notes

- **Type safety** was enforced throughout using TypeScript's discriminated unions and interfaces.
- Using `switch (kind)` inside `Part.tsx` ensures exhaustive handling, preventing future bugs when new kinds are added.
- **Shared base** types like `CoursePartWithDescription` help reduce duplication and improve maintainability.
- No state management or routing is used in this project — the focus is purely on **typed component communication**.