# Full Stack Open 2024 - Part 3: Phonebook Application

This documentation describes an alternative implementation of the Phonebook application using a Cloudflare Workers backend, based on exercises **3.1.–3.22.** from the Full Stack Open course.

All API endpoints are available under:
🔗 **[https://phonebook-backend.niezle-ziolko.workers.dev](https://phonebook-backend.niezle-ziolko.workers.dev)**

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part3/
└── phonebook-backend/
    ├── .vscode/
    │   └── settings.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js
    │   └── mongo.js
    ├── test/
    │   └── index.spec.js
    ├── .editorconfig
    ├── .gitignore
    ├── .prettierrc
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    ├── vitest.config.js
    └── wrangler.jsonc
```

All course materials for "The Phonebook" exercises **3.1.–3.22.** are located inside the `phonebook-backend` folder.

## ✅ Exercises Overview

During the development of the project in Part 3, the following tasks were performed.

### 3.1: Phonebook backend, step 1

- Implemented a REST API that returns a hardcoded list of phonebook entries at `http://localhost:3001/api/persons`.

### 3.2: Phonebook backend, step 2

- Added `/info` route which displays the number of entries in the phonebook and the current server timestamp.

### 3.3: Phonebook backend, step 3

- Implemented a route GET `/api/persons/:id` to fetch a single entry by ID.
- Returns 404 if the person is not found.

### 3.4: Phonebook backend, step 4

- Added DELETE functionality at DELETE `/api/persons/:id`.
- Tested with Postman.

### 3.5: Phonebook backend, step 5

- Enabled adding new persons using POST `/api/persons`.
- Used `Math.random()` to generate unique IDs.

### 3.6: Phonebook backend, step 6

- Added error handling:
  - Returns 400 if name or number is missing.
  - Returns 400 if the name already exists.

### 3.7: Phonebook backend, step 7

- Integrated Morgan middleware with `tiny` configuration for logging.

### 3.8: Phonebook backend, step 8

- Extended Morgan to log POST request body data using custom tokens and `JSON.stringify()`.

### 3.9: Phonebook backend, step 9

- Integrated frontend with the backend.
- Adjusted API endpoints in the frontend to match backend routes.

### 3.10: Phonebook backend, step 10

- Deployed backend to Render.
- Created a `README.md` with the deployment link.

### 3.11: Full Stack Phonebook

- Built frontend production bundle.
- Served the frontend from the backend's dist directory.

### 3.12: Command-line database

- Created `mongo.js` to interact with MongoDB Atlas:
  - Add new person with name and number.
  - List all persons.
- Handled proper database connection closing.

### 3.13: Phonebook database, step 1

- Fetched all persons from MongoDB using Mongoose.

### 3.14: Phonebook database, step 2

- Enabled saving new entries to the database.

### 3.15: Phonebook database, step 3

- Allowed deletion of entries in MongoDB.

### 3.16: Phonebook database, step 4

- Moved error handling logic to a centralized error-handling middleware.

### 3.17: Phonebook database, step 5

- Supported PUT requests to update a person’s phone number if the name already exists.

### 3.18: Phonebook database, step 6

- Modified `/api/persons/:id` and `/info` to use MongoDB data.

### 3.19: Phonebook database, step 7

- Added validation: names must be at least 3 characters long.
- Frontend displays error messages on validation failure.

### 3.20: Phonebook database, step 8

- Validated phone numbers:
  - At least 8 characters long.
  - Two parts separated by a hyphen: first with 2-3 digits, second with rest.

## 📬 API Endpoints

### Persons

| Method | Endpoint           | Description                                    |
|--------|--------------------|------------------------------------------------|
| GET    | `/api/persons`     | Returns a list of all contacts in JSON format. |
| POST   | `/api/persons`     | Adds a new contact.                            |
| GET    | `/api/persons/:id` | Returns a specific contact by ID.              |
| DELETE | `/api/persons/:id` | Deletes a contact by ID.                       |
| PUT    | `/api/persons/:id` | Updates an existing contact's phone number.    |

### POST /api/persons
- **Request Body**: 

  ```json
  {
    "name": "Contact Name",
    "number": "Contact Number"
  }
  ```

### PUT /api/persons/:id
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "number": "Updated Number"
  }
  ```

### GET /info

Returns information about the number of contacts and the current date and time.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part3/phonebook-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Test application: 

```bash
npm run test
```

6. Deploy application:

```bash
npm run deploy
```

The application from Part 2 will be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3000](http://localhost:3000).

## 🧠 Notes

- Ensure unique IDs for each contact.
- Use appropriate `key` props when rendering lists.
- Handle errors gracefully using try/catch or `.catch()`.
- Notification messages are styled by success (green) or error (red) status.
- Backend responses are expected in JSON format.