# Full Stack Open 2024 - Part 1: Introduction to React

This repository contains solutions for exercises **1.6.–1.11.** from Part 1 of the Full Stack Open 2024 course.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part1/
├── anecdotes
├── courseinfo
└── unicafe/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   ├── Button.jsx
    │   ├── main.jsx
    │   ├── StatisticLine.jsx
    │   └── Statistics.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Unicafe" exercises **1.6.–1.11.** are located inside the `unicafe` folder.

## ✅ Exercises Overview

This part of the course involves creating a React-based feedback collection app. The app evolves gradually, with new features and refactors introduced through a series of steps. Only the final version of the app (after **1.11**) needs to be submitted.

### 1.6: Unicafe, step 1

- Created a feedback application for collecting three types of feedback: good, neutral, and bad.
- Used useState hooks to manage the state of each feedback category.
- Displayed the count of each feedback option on the screen.

### 1.7: Unicafe, step 2

- Added logic to calculate and display:
  - The total number of feedback entries.
  - The average score (`good = +1`, `neutral = 0`, `bad = -1`).
  - The percentage of positive feedback.

### 1.8: Unicafe, step 3

- Refactored the app by extracting a new Statistics component responsible for rendering the statistics.
- Ensured that state remained in the root App component and passed down via props.

### 1.9: Unicafe, step 4

- Updated the app to display statistics only after feedback is given.
- If no feedback has been collected yet, the message "No feedback given" is shown instead of the statistics.

### 1.10: Unicafe, step 5

- Introduced two new reusable components:
- Button: Handles the rendering and behavior of feedback buttons.
- StatisticLine: Responsible for rendering a single row of statistics (e.g., `good`, `average`, `positive`).
- Used multiple StatisticLine components within Statistics to display all metrics cleanly.

### 1.11: Unicafe, step 6

- Rendered the statistics inside an HTML table layout for improved structure and readability.
- Ensured that the application displays no warnings or errors in the browser console.
- Addressed common warnings such as invalid children or prop usage.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part1/unicafe
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

- Only the final version of the app (after **1.11**) is required for submission.
- Intermediate commits are optional but recommended for better tracking.
- Avoid committing the node_modules directory.
- If you encounter the error Objects are not valid as a React child, review your JSX expressions and object rendering logic.
- If experiencing strange console errors (e.g., Unchecked runtime.lastError), check for problematic browser extensions.