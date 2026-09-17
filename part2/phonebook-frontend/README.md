# Full Stack Open 2024 - Part 2: Phonebook Application

This documentation describes the step-by-step development of a phonebook application, following exercises **2.6-2.17** from the Full Stack Open course. The application is built using React and communicates with a backend JSON server.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part2/
├── countries
├── courseinfo
└── phonebook-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── personService.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "The Phonebook" exercises **2.6.–2.17.** are located inside the `phonebook-frontend` folder.

## ✅ Exercises Overview

This part builds on the application from Part 2, expanding the component structure to support multiple courses and modularizing the code. Below is a summary of each exercise:

### 2.6: The Phonebook, step 1

- Created a simple React application to manage a list of names.
- Used the `useState` hook to manage the list of persons and the controlled input field for the new name.
- Implemented a form with a submit handler to add a name to the list.
- Prevented the default form submission using `event.preventDefault()`.

### 2.7: The Phonebook, step 2

- Added logic to check if the name already exists in the list using the `some()` array method.
- If the name already exists, used `alert()` to notify the user: `${newName} is already added to phonebook`.

### 2.8: The Phonebook, step 3

- Expanded the form to include an input field for a phone number.
- Introduced newNumber state to control the number input.
- Modified the persons array to store both name and number properties.

### 2.9: The Phonebook, step 4

- Added a new input field outside the form to filter names.
- Created `filter` state to track the search input.
- Displayed only those persons whose names include the search term (case-insensitive).

### 2.10: The Phonebook, step 5

- Refactored the application into multiple components:
  - `Filter`: handles the filtering input.
  - `PersonForm`: handles the form for adding new entries.
  - `Persons`: displays the list of persons.
- Maintained all state and event handlers in the `App` component.

### 2.11: The Phonebook, step 6

- Created a `db.json` file with initial data.
- Started a `json-server` on port 3001.
- Fetched the initial list of persons from `http://localhost:3001/persons` using `axios` inside a `useEffect()` hook.

### 2.12: The Phonebook, step 7

- Modified the form submission to send a POST request using `axios` to add new persons to the backend.
- Ensured that the local state updates only after a successful response.

### 2.13: The Phonebook, step 8

- Created a separate module `personService.js` to handle HTTP operations (GET, POST, PUT, DELETE).
- Refactored the application to use `personService` for all backend communication.

### 2.14: The Phonebook, step 9

- Added a delete button for each person in the list.
- Confirmed deletion with `window.confirm()`.
- Sent a DELETE request using `axios` to remove the person from the backend.
- Updated the local state after successful deletion.

### 2.15: The Phonebook, step 10

- Modified the form submission logic:
  - If a name already exists, prompt the user to confirm updating the number.
  - If confirmed, send a PUT request using axios to update the number.

### 2.16: Phonebook, step 11

- Implemented a notification system to display messages after actions (e.g., adding or updating a person).
- Notifications disappear after a few seconds using `setTimeout()`.
- Used green color for successful notifications.

### 2.17: Phonebook, step 12

- Handled errors that occur when updating a person who no longer exists on the server.
- Displayed an error notification in red when a request fails (e.g., 404 Not Found).
- Ensured the application continues to function without crashing.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part2/phonebook-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the JSON server:

```bash
npx json-server --watch db.json --port 3001
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3001](http://localhost:3001).

## 🧠 Notes

- Ensure that IDs are unique and consistent.
- Use `key` props properly when rendering lists.
- Avoid defining components inside other components to prevent unnecessary re-renders.
- Always handle asynchronous errors gracefully.