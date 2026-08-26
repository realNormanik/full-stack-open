# Full Stack Open 2024 - Part 8: GraphQL Backend

This project is a GraphQL backend for a simple library management system developed as part of exercises **8.1.–8.29.** of the Full Stack Open course. The backend supports querying and managing books and authors, user authentication, and real-time updates via subscriptions.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part8/
├── library-frontend
└── library-backend/
    ├── .gitignore
    ├── index.js
    ├── models.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```

All course materials for "Graphql Frontend" exercises **8.1.–8.29.** are located inside the `graphql-backend` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 8.1: The number of books and authors

- Implemented `bookCount` and `authorCount` queries.
- Enables retrieving total number of books and authors.

### 8.2: All books

- Added `allBooks` query.
- Allows fetching all books with full details.

### 8.3: All authors

- Added `allAuthors` query with `bookCount`.
- Provides list of authors along with how many books each wrote.

### 8.4: Books of an author

- Added optional `author` argument to `allBooks`.
- Allows filtering books by author name.

### 8.5: Books by genre

- Added optional `genre` argument to `allBooks`.
- Allows filtering books by genre or both genre and author.

### 8.6: Adding a book

- Added `addBook` mutation.
- Adds new book and author (if not existing) to the system.

### 8.7: Updating the birth year of an author

- Added `editAuthor` mutation.
- Allows setting a birth year for an existing author.

### 8.13: Database, part 1

- Switched to MongoDB with Mongoose.
- Updated GraphQL types.
- Book now stores full author object instead of just name.

### 8.14: Database, part 2

- Re-implemented all queries and mutations to use MongoDB.
- All existing operations now persist data to the database.

### 8.15: Database, part 3

- Added validation to models.
- Errors (e.g. short names) now return GraphQLError messages.

### 8.16: user and logging in

- Implemented user management with JWT-based login and `me` query.
- Only authenticated users can add/edit books or authors.

### 8.17: Listing books

- Fixed frontend book view broken by author field change.
- Ensures compatibility with frontend expectations.

### 8.23: Subscriptions - server

- Implemented `bookAdded` subscription.
- Users get real-time updates when new books are added.

### 8.26: n+1

- Optimized `bookCount` in `allAuthors` to avoid N+1 queries.
- Significant performance improvement using batch loading (e.g. `DataLoader`).

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

4. Set up environment variables:
Create a `.env` file in the root directory and provide:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. Start the development frontend:

```bash
npm run dev
```

Your GraphQL backend is running at the endpoint [http://localhost:4000](http://localhost:4000).

## 🧪 Example Queries and Mutations

### Book Count

```graphql
query {
  bookCount
}
```

### Author Count

```graphql
query {
  authorCount
}
```

### All Books

```graphql
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author {
      name
    }
  }
}
```

### All Authors

```graphql
query {
  allAuthors {
    name
    born
    bookCount
  }
}
```

### Me

```graphql
query {
  me {
    username
    favoriteGenre
  }
}
```

### Add a Book (with authentication)

```graphql
mutation {
  addBook(
    title: "Clean Architecture",
    author: "Robert Martin",
    published: 2017,
    genres: ["architecture", "software"]
  ) {
    title
    author {
      name
    }
  }
}
```

### Create User

```grapgql
mutation {
  createUser(username: "admin", favoriteGenre: "password") {
    username
  }
}
```

### Log In

```graphql
mutation {
  login(username: "admin", password: "password") {
    value
  }
}
```

Use the returned token in the HTTP header:

```makefile
Authorization: Bearer <token>
```

### Subscription

```graphql
subscription {
  bookAdded {
    title
    author {
      name
    }
    genres
  }
}
```

## 🧠 Notes

- In the initial implementation, books stored the author's name as a string. This was refactored to store a reference to an Author document (`ObjectId`) to improve consistency and simplify querying.
- A context function extracts the token from the HTTP request and attaches the current user to the GraphQL context if the token is valid.
- All errors (e.g. validation, authentication failures) are returned using `GraphQLError`, providing detailed and user-friendly error messages.
- In `allAuthors`, book counts were initially fetched per author (causing N+1 queries). This was optimized using batch loading (e.g. `DataLoader`) to improve performance.
- Only authenticated users can add or edit books and authors. Token expiration or refresh mechanisms can be added later if needed.
- Apollo Server's built-in subscription support was used. The frontend needs a WebSocket client for live updates.