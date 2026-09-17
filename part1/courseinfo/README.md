# Full Stack Open 2024 - Part 1: Introduction to React

This repository contains solutions for exercises **1.1.–1.5.** from Part 1 of the Full Stack Open 2024 course.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part1/
├── anecdotes
├── unicafe
└── courseinfo/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Course Information" exercises **1.1.–1.5.** are located inside the `courseinfo` folder.

## ✅ Exercises Overview

This part of the course builds a simple React application gradually through a series of exercises. Only the final state of the application needs to be submitted, but intermediate commits can be created if desired.

### 1.1: Course Information, step 1

- Initialized a new React application using **Vite**.
- Rendered basic course information inside a single component (`App.jsx`).
- Removed unnecessary files: `App.css`, `index.css`, and the `assets/` directory.

### 1.2: Course Information, step 2

- Refactored the application to include three new components:
  - `Header`: Displays the course name.
  - `Content`: Displays the parts and their number of exercises.
  - `Total`: Displays the total number of exercises.
- Created a `Part` component inside `Content`, where each `Part` renders an individual course part.
- Passed data between components using **props**.

### 1.3: Course Information, step 3

- Updated the `App` component to use **JavaScript objects** to define parts instead of separate variables.
- Adjusted other components to work with the new object-based structure.

### 1.4: Course Information, step 4

- Grouped the course parts into an **array** of objects.
- Passed the parts array as a single prop to both `Content` and `Total` components.

### 1.5: Course Information, step 5

- Combined the course name and its parts into a **single course object**.
- Updated the components to access data from the nested structure.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part1/courseinfo
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🧠 Notes

- Only the final version of the application after Exercise **1.5** is submitted.
- Intermediate commits are optional but encouraged for better version tracking.
- Avoid committing the `node_modules` directory.
- Debugging props can be done by printing them to the console inside components, for example:

```javascript
const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}