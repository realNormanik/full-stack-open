# Full Stack Open 2024 - Part 6: Unicafe Redux

This project is a simplified version of the "Unicafe" application from Part 1 of the Full Stack Open course, rebuilt using Redux for state management. The application allows users to leave feedback (`good`, `ok`, `bad`) and displays the corresponding statistics. All feedback data is managed centrally in a Redux store.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part6/
├── redux-anecdotes
└── unicafe-redux/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── main.jsx
    │   ├── reducer.js
    │   └── reducer.test.js
    ├── .babelrc
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Unicafe" exercises **6.1.–6.2.** are located inside the `unicafe-redux` folder.

## ✅ Exercises Overview

During the development of the project in Part 6, the following tasks were performed.

### 6.1: Unicafe Revisited, step 1

- Implemented a Redux reducer with the following actions:
  - `GOOD` → increments good
  - `OK` → increments ok
  - `BAD` → increments bad
  - `ZERO` → resets all values to zero
- Created unit tests using Jest and deep-freeze to ensure:
  - Immutability of the reducer
  - Correct behavior of each action
  - Proper default behavior when state is undefined

**Example test:**

```js
test('ok is incremented', () => {
  const action = { type: 'OK' }
  const state = initialState
  deepFreeze(state)

  const newState = counterReducer(state, action)
  expect(newState).toEqual({ good: 0, ok: 1, bad: 0 })
});
```

### 6.2: Unicafe Revisited, step 2

- Added three buttons to dispatch `GOOD`, `OK`, and `BAD` actions
- Added a fourth button to dispatch `ZERO` (reset)
- The UI displays the count of each feedback category in real-time
- Connected to Redux store using `useDispatch` and `useSelector`

**Example UI logic (simplified):**

```jsx
<button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
<button onClick={() => dispatch({ type: 'OK' })}>ok</button>
<button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
<button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>

<p>good: {good}</p>
<p>ok: {ok}</p>
<p>bad: {bad}</p>
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part6/unicafe-redux
```

3. Install the dependencies:

```bash
npm install
```

4. Start the test:

```bash
npm run test
```

5. Start the development frontend:

```bash
npm run dev
```

The application is available at [http://localhost:5173](http://localhost:5173).

## 🧠 Notes

- `deep-freeze` ensures the reducer does not mutate the original state — a core Redux principle.
- The reducer logic is minimal and extendable.
- The app follows Redux best practices, keeping logic centralized and components lean.