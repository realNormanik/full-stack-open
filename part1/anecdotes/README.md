# Full Stack Open 2024 - Part 1: Introduction to React

This repository contains solutions for exercises **1.11.–1.14.** from Part 1 of the Full Stack Open 2024 course.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part1/
├── unicafe
├── courseinfo
└── anecdotes/
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

All course materials for "Anecdotes" exercises **1.11.–1.14.** are located inside the `anecdotes` folder.

## ✅ Exercises Overview

This project builds an interactive anecdote voting application using React and state management with hooks. It progresses across three exercises:

### 1.12: Anecdotes, step 1

- Initialized a new Vite project for the anecdotes application.
- Implemented logic to display a random anecdote from a predefined list.
- Added a "next anecdote" button to randomly select a different anecdote using Math.random().

### 1.13: Anecdotes, step 2

- Introduced voting functionality for each anecdote.
- Stored votes in an array inside the component’s state.
- Implemented correct state updates using the array copy pattern with the spread operator.
- Displayed the number of votes for the currently shown anecdote.

### 1.14: Anecdotes, step 3

- Implemented logic to track and display the anecdote with the highest number of votes.
- Displayed both the most voted anecdote and its vote count.
- In case of a tie, the first highest-voted anecdote found is shown (as per exercise instructions).

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part1/anecdotes
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

- This project is a part of the Full Stack Open 2024 course by the University of Helsinki.
- Focuses on React basics, state management, and component reactivity.
- Highlights best practices like immutable state updates.
- Intermediate commits are encouraged but only the final version after exercise **1.14** needs to be submitted.
- The node_modules directory is excluded from version control via .gitignore.