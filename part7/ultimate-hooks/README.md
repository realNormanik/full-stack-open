# Full Stack Open 2024 - Part 7: Ultimate Hooks

Ultimate Hooks is a flexible React application that demonstrates how to build reusable custom hooks for managing data resources. It communicates with a backend REST API to manage two separate collections: **notes** and **persons**.

The core feature of this project is a powerful custom hook called `useResource`, which abstracts away the logic for interacting with RESTful endpoints, making it easy to handle any type of resource with just one hook.

This project is based on the **Full Stack Open** course and extends earlier note-management applications. The **Exercise 7.8** enhances the architecture with reusable hooks and better separation of concerns.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part7/
├── bloglist-frontend
├── routed-anecdotes
├── country-hook
└── ultimate-hooks/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   └── useResource.jsx
    │   ├── hooks/
    │   │   └── useField.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── db.json
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All application logic related to country data and weather integration is implemented inside the `ultimate-hook` folder.

## ✅ Exercises Overview

### 7.8: Ultimate Hooks

The main goal of this exercise was to refactor and generalize data-fetching and creation logic that previously existed in application-specific service files. Here's a detailed breakdown of the improvements and changes:

**1. Introduced the `useResource` hook**

- This custom hook encapsulates logic for:
  - Fetching all resources from a given base URL (`GET` request)
  - Creating a new resource (`POST` request)
- By passing a different base URL to the hook, we can now easily manage different kinds of resources (e.g., notes, persons) **with the same logic**.

**2. Removed duplicated logic across services**

- Before this task, the application had separate service files for each entity (like notes or persons), each manually handling Axios requests.
- Exercise 7.8 eliminated this duplication by centralizing the logic into one generic hook.

**3. Simplified the App component**

- The `App` component now uses `useResource` twice:
  - Once for notes
  - Once for persons
- Each call to the hook returns:
  - A list of current resources
  - A service object with a `.create()` method to add new resources
- This approach greatly improves scalability and readability.

**4. Encourages composable, modular React code**

- The result is a more modular and reusable architecture, where business logic is abstracted away from UI components.
- Future additions (like tasks, comments, todos) can reuse the same `useResource` hook without writing new services.

**5. Sets the foundation for more advanced hooks**

- This pattern opens the door for future enhancements like:
  - Adding support for `update`, `delete`, and `findOne` operations
  - Caching, loading states, and error handling
  - Integration with state management tools or libraries like React Query

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part7/country-hook
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run server
```

5. Start the development fronted:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3005](http://localhost:3005).

## 🧠 Notes

- A new generic hook `useResource` was implemented.
- It abstracts logic for interacting with REST APIs and supports fetching and creating resources.
- It allows using the same logic for different data types (e.g., `notes`, `persons`) by simply changing the base URL.
- This change **eliminates duplicated code**, reduces boilerplate, and increases maintainability.
- This pattern mimics how libraries like React Query or Redux Toolkit Query handle resource management.