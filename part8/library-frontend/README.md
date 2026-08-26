# Full Stack Open 2024 - Part 8: GraphQL Frontend

This documentation outlines the implementation of a book management application developed through exercises **8.8.–8.22.** of the Full Stack Open course. The project uses **React**, **Apollo Client**, and **GraphQL** to handle book and author data, while introducing **login functionality**, **mutations**, **filtering by genre**, and **cache updates** for a smooth and responsive user experience.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part8/
├── graphql-backend
└── graphql-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── AuthorForm.jsx
    │   │   ├── Authors.jsx
    │   │   ├── Books.jsx
    │   │   ├── BookSubscription.jsx
    │   │   ├── LoginForm.jsx
    │   │   ├── mutations.js
    │   │   ├── NewBook.jsx
    │   │   ├── queries.js
    │   │   └── Recommendations.jsx
    │   ├── App.jsx
    │   ├── client.js
    │   └── main.js
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Graphql Frontend" exercises **8.8.–8.22.** are located inside the `graphql-frontend` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 8.8: Authors View

- Created an **Authors** view that displays all authors with their birth years and book counts.
- Data is fetched via GraphQL query and displayed in a table layout.

### 8.9: Books View

- Implemented a **Books** view showing a list of books (excluding genres).
- Server is queried for book data using GraphQL.

### 8.10: Adding a Book

- Built a **New Book** form to add books via GraphQL mutation.
- After adding a book, **Authors** and **Books** views are updated automatically using Apollo's cache update strategies or manual query refetching.

### 8.11: Authors birth year

- Added functionality to **set an author’s birth year** via a form.
- Birth year data is updated using a GraphQL mutation.
- The Authors view reflects changes immediately.

### 8.12: Authors birth year advanced

- Improved the birth year form with a dropdown/select input to allow updates only for existing authors.
- Used native `<select>` or libraries like `react-select` for better UX.

### 8.18: Log in

- Introduced **user authentication** using a login form and GraphQL mutation.
- Stored the received token in local state and/or localStorage.
- The UI conditionally renders buttons and views based on the login state (e.g., Add Book and Logout only visible when logged in).

### 8.19: Books by genre, part 1

- Implemented **genre-based filtering** of the books list using React state.
- Displayed genre selection buttons derived from available genres.

### 8.20: Books by genre, part 2

- Added a **Recommended** view that displays books based on the **logged-in user’s favorite genre**.
- Uses GraphQL queries to retrieve books matching the user’s preference.

### 8.21: books by genre with GraphQL

- Replaced client-side filtering (from **8.19.**) with a **GraphQL query** that fetches books based on selected genre.
- Makes the filtering logic more efficient and server-driven.

### 8.22: Up-to-date cache and book recommendations

- Ensured the book list remains **up to date** when new books are added.
- Implemented either **Apollo cache updates** or query refetching on genre selection to ensure consistency across views.

### 8.24: Subscriptions - client, part 1

- Subscribed to `bookAdded` in frontend and showed alert.
- Visual user notification on book addition.

### 8.25: Subscriptions - client, part 2

- Made frontend update book list when new books are added.
- Real-time sync of book data across all clients.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open
```

2. Navigate to the project directory:

```bash
cd part8/graphql-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
npm run dev
```

The application will run at [http://localhost:5173](http://localhost:5173). Ensure your GraphQL backend (from Part 8) is running at the expected endpoint (e.g., [http://localhost:4000](http://localhost:4000)).

## 🧠 Notes

- Use `ApolloProvider` to wrap the app and connect to the GraphQL server.
- Store the login token securely and use `setContext` in Apollo Client to send it with requests.
- Handle errors using Apollo’s `onError` link or try/catch in `useMutation`.
- When mutations affect queries, ensure cache consistency using `refetchQueries`, `update`, or by modifying the Apollo cache directly.
- Modularize queries and mutations for maintainability.