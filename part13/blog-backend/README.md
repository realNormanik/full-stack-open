# Full Stack Open 2024 - Using relational databases

This project is a full-featured blogging application built with Node.js, Express, and MongoDB. The application uses MongoDB through the Mongoose library: it connects to the cluster given in the `MONGODB_URI` variable and creates everything (collections, indexes and example data) inside the database named by `MONGODB_NAME`. It allows users to:
  - Create, read, update, and delete blog posts.
  - Register and manage user accounts with email-based usernames.
  - Authenticate via tokens and manage sessions on the server side.
  - Add blogs to a personal reading list and mark them as read or unread.
  - View aggregated blog statistics and search for posts.
  - Ensure proper data validation, error handling, and secure authorization.

## 📜 Certificate of Completion
With the successful completion of assignments 13.1. through 13.24. of the tenth part of the Full Stack Open course, I received the following certificate from the University of Helsinki:

Using relational databases Module Certificate: [View Certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-psql/en/6f1007beeb074607d2f881b100e0143b)

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
blog-backend/
├── controllers/
│   ├── authors.js
│   ├── blogs.js
│   ├── login.js
│   ├── logout.js
│   ├── readingLists.js
│   └── users.js
├── models/
│   ├── blog.js
│   ├── index.js
│   ├── readingList.js
│   ├── session.js
│   └── user.js
├── routes/
│   ├── authors.js
│   ├── blogs.js
│   ├── login.js
│   ├── logout.js
│   ├── readingLists.js
│   └── users.js
├── test/
│   └── api.test.js
├── utils/
│   ├── config.js
│   ├── db.js
│   ├── errors.js
│   └── middleware.js
├── .editorconfig
├── .gitignore
├── .prettierrc
├── app.js
├── cli.js
├── index.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── seed.js
```

All course materials for "Blog backend" exercises **13.1.–13.24.** are located inside the `blog-backend` folder.

## ✅ Exercises Overview

### 13.1.

A new GitHub repository has been created for a blog application. The application uses a MongoDB database instead of a relational one. It connects to the cluster given in the `MONGODB_URI` environment variable and works inside the database named by `MONGODB_NAME` (`utils/db.js`).
Verified that the application successfully connects to the remote database: after the connection is established the application prints `Connected to MongoDB database: <MONGODB_NAME>`.

### 13.2.

Instead of a table created manually in the command line, a `blogs` collection is used in the MongoDB database. A blog document has the following schema (defined in `models/blog.js`):
  - `_id` – automatically generated primary key (exposed in the API as `id`)
  - `author` – string
  - `url` – non-empty string
  - `title` – non-empty string
  - `likes` – integer with a default value of 0

At least two blog entries were inserted into the collection to verify functionality: the two blogs from the original `blogs.sql` (Dan Abramov – *On let vs const* and Laurenz Albe – *Gaps in sequences in PostgreSQL*).
All commands used for this task are stored in a file named `seed.js`, located in the root directory of the repository. The script reads `MONGODB_URI` and `MONGODB_NAME` from `.env`, creates two example users (`testuser@example.com` and `jane.doe@example.com`, password `password123`), the example blogs and reading list entries. It can be run repeatedly without creating duplicates:
  ```bash
  $ npm run seed
  Connected to MongoDB database: fullstackopen
  Successfully created user: testuser@example.com.
  Successfully created user: jane.doe@example.com.
  Successfully imported 2 blogs.
  Successfully created 2 reading list entries.
  ```

### 13.3.

A command-line utility named `cli.js` was implemented to print all blog entries from the database. When executed, the script performs a query to retrieve all documents from the `blogs` collection and outputs the results in a human-readable format, for example:
  ```bash
  $ node cli.js
  Connected to MongoDB database: fullstackopen
  Executing (default): db.blogs.find()
  Dan Abramov: 'On let vs const', 0 likes
  Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
  ```

This functionality verifies that the application is correctly connected to the database and can retrieve blog data programmatically outside of the web API.

### 13.4.

The application was transformed into a web-based RESTful API using **Express**. Three endpoints were implemented to manage blog entries stored in the MongoDB database:
  - **GET** `/api/blogs`
    Returns a JSON array of all blogs in the database.
  - **POST** `/api/blogs`
  Accepts a JSON payload to create a new blog. Required fields include `title` and `url` (and `year`, see 13.18). The `author` field is optional and, when it is not provided, the username of the logged-in user is used (see 13.10). The `likes` field is optional and defaults to 0 if not provided.
  - **DELETE** `/api/blogs/:id`
  Deletes the blog entry with the specified `id`. If no blog is found with the given `id`, a 404 response is returned. On success the response has the status 204.

These routes form the initial foundation of the blog API, allowing external clients to interact with blog data over HTTP.

### 13.5.

The project structure was refactored to follow a clear and maintainable architectural convention, inspired by widely accepted best practices in Node.js applications.

The updated structure includes:
  - `models/` – Mongoose models defining database schemas (e.g., `blog.js`, `user.js`, `readingList.js`, `session.js`).
  - `controllers/` – Request handlers for API routes (e.g., `blogs.js`, `users.js`).
  - `routes/` – Express router modules mapping endpoints to controllers.
  - `utils/` – Utility functions and middleware (e.g., error handler, token extractor, database connection, configuration).
  - `cli.js` – Script for command-line interaction with the database.
  - `seed.js` – Script creating example users, blogs and reading lists.
  - `app.js` – Express app setup.
  - `index.js` – Entry point of the application.
  - `.env` – Environment configuration for database and app variables (`MONGODB_URI`, `MONGODB_NAME`, `TOKEN`, `PORT`; a template is available in `.env.example`).

This reorganization improves code clarity, facilitates scalability, and separates concerns within the application logic.

### 13.6.

A new endpoint was implemented to allow modifying the number of likes on an existing blog post:
  - **PUT** `/api/blogs/:id` – Updates the `likes` field of the specified blog.

The endpoint expects a JSON payload containing the updated like count (a non-negative integer). Example request:
  ```json
  {
    "likes": 3
  }
  ```

Upon success, the updated blog entry is returned as a JSON response. If the blog with the given ID does not exist, a 404 status is returned.

### 13.7.

Application-wide error handling was centralized using middleware to improve maintainability and consistency. The following improvements were made:
  - An error-handling middleware (`utils/middleware.js`) was added to capture and respond to errors related to invalid blog creation or update operations. It translates Mongoose validation errors, malformed ids (`CastError`), duplicate keys, malformed JSON bodies, authorization errors and unexpected errors into JSON responses with a proper status code.
  - The `express-async-errors` package is not needed, because Express 5 propagates errors from asynchronous route handlers to the error-handling middleware on its own, without manual try/catch blocks.

This ensures that unexpected runtime errors and validation failures are caught and returned in a structured manner, improving the developer and user experience.

### 13.8.

**Steps Completed**:
  1. User support was added to the application using Mongoose. Each user contains the following fields:
    - `id`: auto-generated (MongoDB `_id`)
    - `name`: non-empty string
    - `username`: non-empty string (must be unique, enforced by a unique index)
    - `password`: bcrypt hash of the password (never returned by the API)
    - `created_at` and `updated_at`: automatic Mongoose timestamps

  2. The following routes were implemented:
    - **POST** `/api/users` – Create a new user
    - **GET** `/api/users` – List all users
    - **PUT** `/api/users/:username` – Update the `username` of a user (requires a token and works only for your own account; the new username is also applied to the `author` of the user's blogs that used the old one)

Passwords are hashed with `bcryptjs` before they are stored (as in Part 4) and must have at least 6 characters. Mongoose timestamps are enabled and verified to work correctly for user creation and updates.

### 13.9.

Mongoose model validation was added to ensure that the `username` is a valid email address. This was done using Mongoose's built-in `match` validator with an e-mail regular expression.

The centralized error handler was modified to return detailed validation errors in a structured format, for example:
  ```json
  {
    "error": [
      "Validation isEmail on username failed"
    ]
  }
  ```

The validation is applied both when a user is created and when a username is changed. Duplicated usernames are rejected with `{ "error": ["username must be unique"] }`.

### 13.10.

The application was extended to associate each blog with the currently logged-in user. This was implemented by introducing token-based authentication using JSON Web Tokens (JWT).

**Steps Completed**
  1. A new endpoint was added:
    - **POST** `/api/login` – Authenticates a user using a provided username and password. If successful, it returns a signed JWT (valid for one hour) that includes the user’s ID and username.

    **Example request**:
    ```json
    {
      "username": "user@example.com",
      "password": "secret"
    }
    ```

    **Example response**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "username": "user@example.com",
      "name": "User Name"
    }
    ```

  2. Associating Blogs with Users
    - When creating a blog via **POST** `/api/blogs`, the user must provide a valid JWT in the Authorization header:
    ```makefile
    Authorization: Bearer <token>
    ```
    - The blog is then linked to the user whose ID is extracted from the token. This is achieved by setting the `userId` field in the blog to the authenticated user's ID.
    - The application verifies the token and rejects unauthenticated or invalid requests with a 401 error.

### 13.11.

The application was updated to enforce authorization rules for deleting blogs. Only the user who originally added a blog is allowed to delete it.

**Steps Completed**
  1. When a client sends a DELETE request to: **DELETE** `/api/blogs/:id`
  2. The server performs the following steps:
    - Extracts and verifies the JWT token from the Authorization header.
    - Retrieves the blog corresponding to the :id parameter from the database.
    - Compares the userId field of the blog with the ID of the authenticated user from the token.
    - If the IDs match, the blog is deleted (together with its reading list entries). If not, a 403 Forbidden error is returned.

    **Example Response on Unauthorized Deletion**
    ```json
    {
      "error": "unauthorized deletion: you can only delete your own blogs"
    }
    ```

This ensures that users cannot delete blogs added by other users, improving the application's integrity and data security.

### 13.12.

**Steps Completed**
  1. The API was extended to include related data in its responses:
    - **GET** `/api/blogs` – Now includes the user (name and username) who added each blog.
    - **GET** `/api/users` – Now includes an array of blog objects each user has created.
  2. These relationships were implemented using Mongoose virtual populate (a `user` virtual in the `Blog` model and a `blogs` virtual in the `User` model, both based on the `userId` field of the blog) and included using `.populate()`.

### 13.13.

The application was extended to support filtering blog posts by a search keyword provided as a query parameter. The filtering is performed on the blog titles and is case-insensitive.

**Steps Completed**
  1. Add **GET** request to: **GET** `/api/blogs?search=react`
    - returns all blogs that contain the word "react" (in any case) in their `title` field.
  2. A request without the `search` parameter: **GET** `/api/blogs`
    - returns all blogs without any filtering.
  3. Implementation Notes:
    - The filtering is performed at the database level using a case-insensitive regular expression query (`$regex` with the `i` option). Special characters in the keyword are escaped, so it is always matched literally.
    - This approach improves performance for large datasets and avoids loading unnecessary data into memory.
    - If no blogs match the search term, an empty array is returned.

This filtering functionality improves the usability of the application and prepares the backend for advanced features such as search-based sorting or pagination.

### 13.14.

The blog filtering functionality was extended to support keyword searches not only in the `title` field but also in the `author` field. This allows users to retrieve relevant blogs based on either the blog’s title or the name of its author.

**Steps Completed**
  1. A **GET** request such as: **GET** `/api/blogs?search=jami`
    - will now return all blogs where the keyword `jami` (case-insensitive) appears in either the `title` or the `author` field.
  2. Implementation Details:
    - The filtering uses case-insensitive regular expressions for partial matching.
    - Both fields are included in the query joined with the `$or` operator.
    - If the `search` parameter is omitted, all blogs are returned as before.
    - If no matches are found, an empty array is returned.

This enhancement improves search usability by enabling users to find blogs based on either content or authorship.

### 13.15.

The blog retrieval functionality has been modified to return blogs ordered by the number of likes in descending order. This change improves the user experience by showing the most-liked blogs first.

**Steps Completed**
  1. A **GET** request to the `api/blogs` route now returns the blogs sorted based on the `likes` field in descending order. For example: **GET** `/api/blogs`
    - will return blogs ordered from the most liked to the least liked.
  2. Implementation Details
    - The `sort` stage is used in the MongoDB query to order the results based on the `likes` field in descending order (an index on `likes` is defined in the model).
    - Mongoose's built-in `sort` functionality was utilized to apply sorting.
    
    **Example of the query structure**:
    ```js
    Blog.find().sort({ likes: -1 })
    ```

This change ensures that blogs with the most likes are displayed first, improving visibility for popular content.

### 13.16.

A new API route `/api/authors` was added to the application to provide aggregated statistics about authors. The route returns the number of blog posts (articles) and the total number of likes for each author. The aggregation is performed directly at the database level using the MongoDB aggregation pipeline (`$group` stage) and Mongoose's `aggregate` method.

**Route Functionality**
  1. The route: **GET** `c`
    - returns data in the following format:
    ```json
    [
      {
        "author": "Jami Kousa",
        "articles": 3,
        "likes": 10
      },
      {
        "author": "Dan Abramov",
        "articles": 1,
        "likes": 4
      },
      {
        "author": "Kalle Ilves",
        "articles": 1,
        "likes": 2
      }
    ]
    ```
    - Each object in the array represents an author, the number of blogs they have written (`articles`), and the total number of likes across all their blogs (`likes`). When the `author` of a blog is the username of a registered user, the name of that user is shown instead.
  2. Aggregation is implemented using Mongoose's `aggregate` method with:
    - `$lookup` and `$addFields` stages replacing a username with the user's name
    - `$group` by author with `$sum` for the number of articles and for the likes
    - `$sort` by the number of likes in descending order (bonus requirement)

    **Example aggregation pipeline**:
    ```js
    Blog.aggregate([
      { $lookup: { from: "users", localField: "author", foreignField: "username", as: "account" } },
      { $addFields: { displayName: { $ifNull: [{ $arrayElemAt: ["$account.name", 0] }, "$author"] } } },
      { $group: { _id: "$displayName", articles: { $sum: 1 }, likes: { $sum: "$likes" } } },
      { $sort: { likes: -1, _id: 1 } },
      { $project: { _id: 0, author: "$_id", articles: 1, likes: 1 } }
    ])
    ```

This implementation ensures that the data is efficiently aggregated and sorted in the database, optimizing performance and scalability.

### 13.17.

In MongoDB there are no tables and no SQL migrations, so in this exercise the database structure is defined by Mongoose schemas and indexes. All collections can be deleted from the application's database and are created again by the application and by `seed.js`, including automatic timestamp fields.

**Steps Completed**
  1. Database Cleanup:
    - All collections were deleted from the database named by `MONGODB_NAME` (e.g. by dropping the database in `mongosh` or MongoDB Compass).
      ⚠️ There is no `SequelizeMeta`-like table to clear - the application keeps no migration history.
  2. Schema Definition:
    The structure of the `users`, `blogs`, `readinglists` and `sessions` collections is defined in the Mongoose models. It includes:
    - Field definitions (`title`, `author`, `url`, `likes`, `username`, `name`, etc.)
    - Automatic timestamp fields configured in each schema:
      - `created_at` (type: `Date`)
      - `updated_at` (type: `Date`)
  3. Code Refactoring:
    - The `/api/migrate` endpoint (which dropped and recreated the tables) was removed. Collections are created automatically by MongoDB when the first document is saved.
    - Unique and TTL indexes are created by `syncIndexes()` called when the application connects to the database (`utils/db.js`), and by `seed.js`.
    ❗ This step was crucial to ensure the database always has the indexes (unique usernames, unique reading list entries, expiring sessions) that the application relies on.

    **Timestamp Configuration Example**
    Example of timestamp fields configured in a schema:
    ```js
    const blogSchema = new mongoose.Schema(
      { /* fields */ },
      { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
    );
    ```

This approach provides a consistent way of managing the database structure, which is necessary for future scalability and collaboration.

### 13.18.

In this exercise, the application was extended to include a `year` field in the `blogs` collection to represent the year a blog was written. This change was implemented in the Mongoose schema and includes validation logic to ensure the year falls within an acceptable range.

**Steps Completed**
  1. Schema Change:
    - The `year` field was added to the blog schema as a required number, so no separate migration is needed:
    ```js
    year: {
      type: Number,
      required: [true, "Year is required"]
    }
    ```
  2. Model Update:
    - The `Blog` model was updated with validation rules. The validations ensure that:
      - The year must be an integer greater than or equal to 1991
      - The year must not exceed the current year
    - This was achieved using Mongoose's `validate` option (the current year is evaluated at validation time):
    ```js
    year: {
      type: Number,
      required: [true, "Year is required"],
      validate: {
        validator: (value) => Number.isInteger(value) && value >= 1991 && value <= new Date().getFullYear(),
        message: () => `Year must be an integer between 1991 and ${new Date().getFullYear()}`
      }
    }
    ```
  3. Error Handling:
    - Validation errors related to the `year` field were integrated with the application's centralized error handling middleware. When an invalid year is provided during blog creation or update, the client receives a clear error message, such as:
    ```json
    {
      "error": [
        "Year must be an integer between 1991 and 2026"
      ]
    }
    ```

**Summary**
  This task improved the semantic completeness of the blog data by including a publication year, while maintaining data integrity through strict server-side validation. The validation rules also help prevent accidental insertion of incorrect or nonsensical years.

### 13.19.

This exercise introduced a reading list feature to the application, allowing users to bookmark blogs they intend to read. Each blog on the list is initially marked as unread, and users can later mark it as read. The implementation is based on a join collection between `users` and `blogs`.

**Steps Completed**
  1. Join Collection Creation:
    - A new Mongoose model was created to introduce a `readinglists` collection, which connects `users` and `blogs` in a many-to-many relationship. The documents include:
      - A reference (`userId`) to the `users` collection
      - A reference (`blogId`) to the `blogs` collection
      - A boolean field `read`, which defaults to `false`
    
    **Example definition in the model file**:
    ```js
    const readingListSchema = new mongoose.Schema(
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
        read: { type: Boolean, default: false }
      },
      { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
    );

    readingListSchema.index({ userId: 1, blogId: 1 }, { unique: true });
    ```
  2. Model Associations:
    Mongoose references and virtuals (`user` and `blog`) were defined to establish the many-to-many relationship. This allows querying which blogs are in a user's reading list and their read status. The unique index guarantees that a blog can be on a user's reading list only once.
  3. Direct Database Testing:
    As required by the exercise, the reading list functionality was verified using **direct database manipulation** (e.g., via `mongosh` or MongoDB Compass). No API or UI-level routes were required for listing or updating reading list entries at this stage.

**Summary**
This task laid the groundwork for a reading list system by introducing a well-structured join collection with additional metadata (read state). It enables efficient tracking of user–blog relationships and supports future enhancements like personalized reading lists and progress tracking.

### 13.20.

This task expands on the reading list feature introduced previously by implementing full API support for managing and accessing reading list entries.

**Implemented Features**
  1. **POST** `/api/readinglists`
    - A new route was created to allow adding blogs to a user's reading list. The route expects a JSON body containing the `blogId` and, optionally, the `userId` (which must be the id of the logged-in user, otherwise a 403 error is returned). The request requires a valid token and the blog is added to the reading list of the authenticated user. Upon receiving a valid request, a new document is added to the `readinglists` collection.

    **Example request**:
    ```json
    {
      "blogId": "6650f1c2a4b3d5e8f9a01234",
      "userId": "6650f1c2a4b3d5e8f9a05678"
    }
    ```
  2. **GET** `/api/users/:id`
    - The existing endpoint for retrieving a single user was enhanced to also return their reading list. The returned `readings` field is an array of blog objects associated with the user via the reading list.

    **Example response**:
    ```json
    {
      "name": "Matti Luukkainen",
      "username": "mluukkai@iki.fi",
      "readings": [
        {
          "id": "6650f1c2a4b3d5e8f9a01234",
          "url": "https://google.com",
          "title": "Clean React",
          "author": "Dan Abramov",
          "likes": 34,
          "year": 2020
        },
        {
          "id": "6650f1c2a4b3d5e8f9a01235",
          "url": "https://google.com",
          "title": "Clean Code",
          "author": "Bob Martin",
          "likes": 5,
          "year": 2019
        }
      ]
    }
    ```
    - At this stage, the `read` status of each blog in the reading list is not included in the response. Every blog object also contains the `userId`, `created_at` and `updated_at` fields.

**Technical Notes**
  - Mongoose references and virtual populate were used to enable querying a user's reading list with blog details.
  - Validation was added to ensure the blog exists (404 otherwise) and is not already on the list (400 `Blog already in reading list`) before creating a reading list entry; the user is the authenticated user.
  - The solution lays the foundation for further reading list management features such as toggling the read status.

**Summary**
  This implementation allows users to bookmark blogs for later reading via an API, and enables clients to retrieve the list of bookmarked blogs per user. It integrates user–blog relations through a dedicated reading list model using Mongoose references.

### 13.21.

This task builds upon the previous reading list implementation by expanding the single-user endpoint to include metadata from the join collection that connects users and blogs.

**Steps Completed**
  1. Extended **GET** `/api/users/:id`
    - The route for retrieving a single user now returns not only the basic blog information in the reading list but also the status of each entry as defined in the `readinglists` collection.
    - Each blog object in the `readings` array now includes an embedded `readinglists` field, which contains:
      - `read`: a boolean indicating whether the blog has been read.
      - `id`: the ID of the join collection document that links the blog to the user.

  **Example response**:
  ```json
  {
    "name": "Matti Luukkainen",
    "username": "mluukkai@iki.fi",
    "readings": [
      {
        "id": "6650f1c2a4b3d5e8f9a01234",
        "url": "https://google.com",
        "title": "Clean React",
        "author": "Dan Abramov",
        "likes": 34,
        "year": 2020,
        "readinglists": [
          {
            "read": false,
            "id": "6650f1c2a4b3d5e8f9a09001"
          }
        ]
      },
      {
        "id": "6650f1c2a4b3d5e8f9a01235",
        "url": "https://google.com",
        "title": "Clean Code",
        "author": "Bob Martin",
        "likes": 5,
        "year": 2019,
        "readinglists": [
          {
            "read": false,
            "id": "6650f1c2a4b3d5e8f9a09002"
          }
        ]
      }
    ]
  }
  ```
  - ⚠️ Although the `readinglists` field is an array, it always contains exactly one object for the specific user–blog connection.

**Technical Notes**
  - The many-to-many association was implemented using the `readinglists` collection: the entries of the user are read with `ReadingList.find({ userId })` and their blogs are attached with `.populate("blog")`.
  - Each returned blog is extended with the `readinglists` field containing the `read` flag and `id` of the join document.
  - Care was taken to ensure consistent and descriptive data structure for client-side consumption.

**Summary**
  This enhancement allows clients to access additional metadata from the reading list connection, such as whether a blog has been read and the unique identifier of the reading list entry. It provides essential groundwork for future operations, such as updating the read status.

### 13.22.

This task adds functionality for users to update the `read` status of a blog in their personal reading list.

**Implemented Features**
  1. **PUT** `/api/readinglists/:id`
    - Allows a user to mark a blog in their reading list as read or unread by updating the `read` field in the join collection.

  **Example request body**:
  ```json
  {
    "read": true
  }
  ```
  2. Authorization Check
    - The user making the request must be authenticated via token.
    - The user is only permitted to update entries in their own reading list. Unauthorized modification attempts are rejected with an appropriate error message (403 `Forbidden: This entry is not on your reading list`). A missing entry results in a 404 error and a `read` value that is not a boolean in a 400 error.

**Technical Notes**
  - Token-based user identification is implemented for access control.
  - The `PUT` handler verifies ownership by comparing the `userId` in the join collection with the ID from the token.
  - The `read` field of the document in the `readinglists` collection is modified and the updated entry is returned.

### 13.23.

This task enhances the user detail route by enabling optional filtering of the reading list based on whether blogs have been read.

**Implemented Features**
  1. Enhanced **GET** `/api/users/:id`
    - Now supports an optional query parameter `read`:
      - `/api/users/:id` returns the full reading list.
      - `/api/users/:id?read=true` returns only blogs marked as read.
      - `/api/users/:id?read=false` returns only unread blogs.
  2. Dynamic Filtering
    - The filtering logic is applied using a `read` condition in the query of the `readinglists` collection (`{ userId, read }`), allowing for efficient database-level filtering.

**Technical Notes**
  - The read status filtering is handled directly within the database query to avoid unnecessary post-processing.
  - The system safely parses the query parameter and coerces it to a boolean (any other value results in no filtering).
  - The response format remains consistent with previous exercises, including all relevant blog and reading list metadata.

**Summary**
  Together, these tasks enable users to manage their reading list more effectively: marking items as read and retrieving filtered views of their reading progress. This enhances usability and prepares the backend for more advanced reading-tracking features.

### 13.24.

This task enhances the application's security by addressing the token invalidation problem, which arises when a previously issued token remains usable even after a user's access should be revoked.

**Implemented Features**
  1. User Disabling Mechanism
    - A new `disabled` field (`boolean`, `false` by default) is part of the `users` collection.
    - When set to `true`, the user is considered blocked and can no longer perform any actions requiring authentication.
    - Disabling/enabling users is done manually via direct database changes.
  2. Session Collection
    - A new `sessions` collection is introduced (with its own Mongoose model) to store active JWT tokens issued on login.
    - Each session contains at least:
      - Token (the full token, unique)
      - Associated `userId`
      - Timestamp (`created_at`) and `expiresAt`, used by a TTL index, so MongoDB removes expired sessions automatically
    - When a user logs in via `POST /api/login`, a session is created and stored in the collection.
  3. Token Validation Middleware
    - Every route requiring authentication checks (`userExtractor` in `utils/middleware.js`):
      - Whether the token is valid.
      - Whether it exists in the `sessions` collection.
      - Whether the associated user is not disabled.
    - If any of these checks fail, the request is rejected with an appropriate error message (e.g., `401 Unauthorized` or `403 Forbidden`).
  4. Logout Endpoint: **DELETE** `/api/logout`
    - Removes the token’s session entry from the `sessions` collection.
    - After logout, the token becomes immediately unusable, even if it is still technically valid (i.e., not expired).

**Security Considerations**
  - This solution simulates server-side session management while still using JWT for stateless authentication.
  - By validating tokens against a centralized session collection, the application gains full control over issued tokens.
  - Logging out or disabling a user results in immediate invalidation of active sessions.

**Technical Notes**
  - Mongoose is used to manage the session model; the collections and indexes are created automatically.
  - Token information stored in sessions can either be the full token, a hash, or a signature (e.g., `jti` claim) for privacy and performance.
  - All authentication middleware was modified to query the `sessions` collection on each request.

**Summary**
  This final task adds robust token management to the application by introducing server-side session tracking. It ensures that users who are logged out or disabled lose access immediately, solving a critical security flaw of traditional JWT-only systems.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd part13/blog-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Create the `.env` file based on `.env.example` and fill in the variables:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_NAME=fullstackopen
TOKEN=12345
PORT=3000
```

5. Create the example data (optional, can be run repeatedly):

```bash
npm run seed
```

6. Start the development server:

```bash
npm run dev
```

7. Run the tests (they use a separate `<MONGODB_NAME>_test` database, which is dropped afterwards):

```bash
npm test
```

The server is available at [http://localhost:3000](http://localhost:3000).

## 🧠 Notes

- Use `POST /api/blogs` for creating blogs, `PUT /api/blogs/:id` for updating likes.
- Usernames can be updated via `PUT /api/users/:username`.
- Use `GET /api/authors` for blog count and total likes per author.
- Blog search supports `GET /api/blogs?search=keyword` for title/author.
- Reading lists are many-to-many relationships, marked read with `PUT /api/readinglists/:id`.
- `GET /api/users/:id` shows the reading list, supports ?read=true/false filter.
- Logout via `DELETE /api/logout` to remove session and invalidate token.