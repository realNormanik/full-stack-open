# Full Stack Open 2024 - Part 6: Anecdote Voting App

This is a React application developed as part of the Full Stack Open course. It allows users to browse, add, vote for, and filter short anecdotes. The app uses Redux Toolkit for state management in the first phase and **React Query** with **Context** + **useReducer** in the second, to demonstrate modern approaches to managing client state and server state in React.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part6/
├── unicafe-redux
└── redux-anecdotes/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── AnecdoteForm.jsx
    │   │   ├── AnecdoteList.jsx
    │   │   ├── Filter.jsx
    │   │   └── Notification.jsx
    │   ├── reducers/
    │   │   ├── anecdoteReducer.js
    │   │   ├── filterReducer.js
    │   │   ├── index.js
    │   │   └── notificationReducer.js
    │   ├── services/
    │   │   └── anecdotes.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── store.js
    ├── .babelrc
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Anecdotes" exercises **6.3.–6.22.** are located inside the `redux-anecdotes` folder.

## ✅ Exercises Overview

During the development of the project in Part 6, the following tasks were performed.

### 6.3: Anecdotes, step 1

- The ability to vote on anecdotes has been added.
- The number of votes is stored in the Redux Store.

### 6.4: Anecdotes, step 2

- The ability to create new anecdotes has been added.
- The form remains uncontrolled.

### 6.5: Anecdotes, step 3

- Anecdotes are displayed sorted in descending order of the number of votes.

### 6.6: Anecdotes, step 4

- Extracted the creation action in `src/reducers/anecdoteReducer.js`.

### 6.7: Anecdotes, step 5

- The form for creating new anecdotes has been moved to the `AnecdoteForm` component.

### 6.8: Anecdotes, step 6

- The logic for displaying and voting on anecdotes has been moved to the `AnecdoteList` component.

### 6.9: Better Anecdotes, step 1

- The `Filter` component has been added.
- Filter state is stored in a separate reducer in the Redux Store.

### 6.10: Better Anecdotes, step 2

- Store is created using `configureStore`.
- `FilterReducer` rewritten using `createSlice`.

### 6.11: Better Anecdotes, step 3

- Also, the sorting logic has been updated (creating a copy of the list before sorting).

### 6.12: Better Anecdotes, step 4

- Displays news from the Redux Store.

### 6.13: Better Anecdotes, step 5

- Notifications disappear after 5 seconds.
- Added `setNotification` and `clearNotification` action wizards.

### 6.14: Anecdotes and the Backend, step 1

- Anecdotes are retrieved by `useEffect` and `dispatch(initializeAnecdotes())`.

### 6.15: Anecdotes and the Backend, step 2

- New anecdotes are sent to the backend using `createAnecdote`.

### 6.16: Anecdotes and the Backend, step 3

- `initializeAnecdotes` is now an asynchronous function.

### 6.17: Anecdotes and the Backend, step 4

- `createAnecdote` is an asynchronous Thunk action.

### 6.18: Anecdotes and the Backend, step 5

- `voteAnecdote` also modifies data on the backend.

### 6.19: Anecdotes and the Backend, step 6

- `setNotification(msg, seconds)` - simplified action function with automatic timeout.

### 6.20: Anecdote Voting App, step 1

- Added `useQuery` with `getAnecdotes`.
- Server-side error handling.

### 6.21: Anecdote Voting App, step 2

- Anecdotes are sent by `useMutation`.

### 6.22: Anecdote Voting App, step 3

- Votes updated by `updateAnecdote`.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part6/redux-anecdotes
```

3. Install the dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run server
```

5. Start the development frontend:

```bash
npm run dev
```

The application be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3001](http://localhost:3001).

## 🧠 Notes

- The version of the application with React Query no longer uses Redux, except possibly to keep some function names.
- To run the backend, the `npm run server` command is used, which runs the `server.js` file.
- All notifications are managed by the Context API.