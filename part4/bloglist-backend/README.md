# Full Stack Open 2024 - Part 4: Bloglist Application

This project is a backend application for managing a blog list, developed as part of the Full Stack Open course (Part 4). The application is built using Node.js with Express and MongoDB (via Mongoose), and it emphasizes best practices in modularization, testing, and user authentication.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part4/
└── bloglist-backend/
    ├── controllers/
    │   ├── blogs.js
    │   ├── login.js
    │   └── users.js
    ├── models/
    │   ├── blog.js
    │   ├── comment.js
    │   └── user.js
    ├── tests/
    │   ├── blog_api.test.js
    │   ├── list_helper.test.js
    │   └── users_api.test.js
    ├── utils/
    │   ├── auth.js
    │   └── list_helper.js
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json 
    └── README.md
```

All course materials for "Blog list" exercises **4.1.–4.23.** are located inside the `bloglist-backend` folder.

## ✅ Exercises Overview

During the development of the project in Part 4, the following tasks were performed.

### 4.1: Blog List, step 1

- A basic Express server was created with two endpoints: GET `/api/blogs` and POST `/api/blogs`. The blogs data is stored in MongoDB using Mongoose.

### 4.2: Blog List, step 2

- The application code was refactored, moving logic to separate modules: `controllers`, `models`, `utils`.

### 4.3: Helper Functions and Unit Tests, step 1

- Added a `dummy` function to the `list_helper.js` file, returning a value of 1 (a technical test of how tests work).

### 4.4: Helper Functions and Unit Tests, step 2

- The `totalLikes` function has been implemented, which adds up the number of likes across all blogs.

### 4.5: Helper Functions and Unit Tests, step 3

- Added `favoriteBlog` function that returns the blog with the most likes.

### 4.6: Helper Functions and Unit Tests, step 4

- Added `mostBlogs` function that returns the author with the most blogs.

### 4.7: Helper Functions and Unit Tests, step 5

- Added the `mostLikes` function, which returns the author with the highest number of total likes.

### 4.8: Blog List Tests, step 1

- Integration tests have been created for `GET /api/blogs`, checking for correct JSON format and number of blogs.

### 4.9: Blog List Tests, step 2

- Verified that the identifier field is `id` (not `_id`).

### 4.10: Blog List Tests, step 3

- Tests have been added for `POST /api/blogs` to validate the addition of a blog.

### 4.11: Blog List Tests, step 4

- A default value of `likes = 0` is provided if not specified.

### 4.12: Blog List Tests, step 5

- Secured endpoint `POST /api/blogs` - it now requires `title` and `url`, otherwise returns 400.

### 4.13: Blog List Expansions, step 1

- Added support for `DELETE /api/blogs/:id`, allowing you to delete blogs.

### 4.14: Blog List Expansions, step 2

- A `PUT /api/blogs/:id` has been implemented to update the number of likes.

### 4.15: Blog List Expansions, step 3

- A `POST /api/users` endpoint has been created for user registration with data validation. Passwords are hashed with bcrypt.

### 4.16: Blog List Expansions, step 4

- Added endpoint `GET /api/users`, returning a list of all users. Created tests to validate user registrations.

### 4.17: Blog List Expansions, step 5

- Login (`POST /api/login`) has been implemented. The server returns a JWT token containing `username` and `id`. Added password validation and correct HTTP statuses on errors.

### 4.18: Blog List Expansions, step 6

- Endpoint `POST /api/blogs` now requires a JWT token. The authenticated user creates a blog assigned to himself.

### 4.19: Blog List Expansions, step 7

- Added a one-to-many relationship between users and blogs (each blog has a `user` field). Users store a list of IDs of the blogs they have created.

### 4.20: Blog List Expansions, step 8

- Endpoint `DELETE /api/blogs/:id` now requires a JWT token. Only the blog owner can delete it. An attempted deletion by another user results in a 401 error.

### 4.21: Blog List Expansions, step 9

- Added a `tokenExtractor` middleware that extracts the token from the Authorization header and puts it in the `request.token`.

### 4.22: Blog List Expansions, step 10

- Added middleware `userExtractor`, which assigns a user object to `request.user` after decoding the JWT token, to simplify access to information about the currently logged-in user.

### 4.23: Blog List Expansions, step 11

- Moved token and user handling logic to middleware, simplifying controller code. The `POST /api/blogs` and `DELETE /api/blogs/:id` endpoints now use `request.user`.

## 📬 API Endpoints

### Blogs

| Method | Endpoint         | Description                                 |
|--------|------------------|---------------------------------------------|
| GET    | `/api/blogs`     | Returns a list of all blogs in JSON format. |
| POST   | `/api/blogs`     | Adds a new blog.                            |
| PUT    | `/api/blogs/:id` | Update a specific blog by ID.               |
| DELETE | `/api/blogs/:id` | Deletes a blog by ID.                       |

### Users

| Method | Endpoint     | Description                                 |
|--------|--------------|---------------------------------------------|
| GET    | `/api/users` | Returns a list of all users in JSON format. |
| POST   | `/api/users` | Adds a new user.                            |

### GET /api/login

Logs the user in and returns the JWT token.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part4/bloglist-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Set Up Environment Variables:

Create a `.env` file in the root directory with the following content:

```env
PORT=3001
MONGODB_URI=your_mongodb_uri
TEST_MONGODB_URI=your_test_mongodb_uri
SECRET=your_jwt_secret
```

5. Start the development server:

```bash
npm run dev
```

The server is available at [http://localhost:3003](http://localhost:3003).

## 🧠 Notes

- The backend of the blog management application was created using:
  - **Node.js** and **Express** as the backend framework,
  - **MongoDB** and **Mongoose** for database maintenance,
  - **JWT (JSON Web Token)** for user authentication and authorization.
- Data is stored in a local MongoDB instance or using MongoDB Atlas.
- The project includes unit and integration tests written using Supertest and node:test libraries.
- A separate test database is used for testing.
- Error handling, logging and extracted middleware ensure code transparency and application security.
- The project code has been split according to good practices: routers, middleware, models, controllers and tests are in separate files.