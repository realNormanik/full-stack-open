# Full Stack Open 2024 - Part 3: Phonebook Application

This documentation describes the Phonebook application developed as part of exercises **3.1–3.20** from the Full Stack Open course.

The backend is built with **Node.js, Express, and MongoDB Atlas**, with Mongoose used to establish a database connection and the MongoDB Node.js driver used for phonebook operations.

All API endpoints are available under:

**Local development:** `http://localhost:3003/api/persons`

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```text
part3/
└── phonebook-backend/
    ├── controllers/
    │   └── persons.js
    ├── src/
    │   ├── index.js
    │   └── mongo.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md
```

The exact project structure may vary depending on the files included in the repository.

The `controllers/persons.js` file contains the routes for managing phonebook entries, while `index.js` initializes the Express server and configures the database connection.

The `src/mongo.js` script provides command-line functionality for listing and adding phonebook entries.

## ✅ Exercises Overview

During the development of the project in Part 3, the following tasks were addressed.

### 3.1: Phonebook backend, step 1

- Implemented a REST API that returns a list of phonebook entries.
- Exposed the endpoint at `GET /api/persons`.

### 3.2: Phonebook backend, step 2

- Added an `/info` route displaying the number of entries and the current server timestamp.

### 3.3: Phonebook backend, step 3

- Implemented `GET /api/persons/:id` to retrieve a single entry by ID.
- Returns HTTP 404 if the requested person does not exist.

### 3.4: Phonebook backend, step 4

- Implemented `DELETE /api/persons/:id` to remove an entry.
- Returns HTTP 204 when an entry is successfully deleted.

### 3.5: Phonebook backend, step 5

- Implemented `POST /api/persons` to add new phonebook entries.

### 3.6: Phonebook backend, step 6

- Added input validation:
  - Returns HTTP 400 if the name or number is missing.
  - Returns HTTP 400 if the name is already in use.

### 3.7: Phonebook backend, step 7

- Integrated Morgan middleware for HTTP request logging, if configured in the project.

### 3.8: Phonebook backend, step 8

- Extended request logging to include POST request body data, if configured.

### 3.9: Phonebook backend, step 9

- Integrated the frontend with the backend.
- Configured frontend API requests to use the appropriate backend endpoints.

### 3.10: Phonebook backend, step 10

- Prepared the backend for deployment to a hosting provider.

### 3.11: Full Stack Phonebook

- Integrated the frontend production build with the backend, if configured in the project.

### 3.12: Command-line database

- Created `src/mongo.js` to interact with MongoDB:
  - List all phonebook entries.
  - Add a new entry using a name and phone number.
  - Close the database connection after completing operations.

### 3.13: Phonebook database, step 1

- Retrieved phonebook entries from MongoDB.

### 3.14: Phonebook database, step 2

- Enabled saving new entries to the database.

### 3.15: Phonebook database, step 3

- Implemented deletion of entries stored in MongoDB.

### 3.16: Phonebook database, step 4

- Added error handling for database operations and API requests.

### 3.17: Phonebook database, step 5

- Implemented `PUT /api/persons/:id` to update an existing phonebook entry.

### 3.18: Phonebook database, step 6

- Updated the person retrieval and information endpoints to use database data.

### 3.19: Phonebook database, step 7

- Added validation for person names, if configured in the project.

### 3.20: Phonebook database, step 8

- Added phone number validation, if configured in the project.

## 📬 API Endpoints

### Persons

| Method | Endpoint           | Description                                    |
|--------|--------------------|------------------------------------------------|
| GET    | `/api/persons`     | Returns a list of all contacts in JSON format. |
| POST   | `/api/persons`     | Adds a new contact.                            |
| GET    | `/api/persons/:id` | Returns a specific contact by ID.              |
| DELETE | `/api/persons/:id` | Deletes a contact by ID.                       |
| PUT    | `/api/persons/:id` | Updates an existing contact's phone number.    |

The information endpoint can alternatively be exposed at `/info`, depending on its registration in `index.js`.

### POST `/api/persons`

**Request body:**

```json
{
  "name": "Contact Name",
  "number": "123-456-789"
}
```

**Successful response:** HTTP 201 Created.

**Possible errors:**

- HTTP 400 Bad Request if the name or number is missing.
- HTTP 400 Bad Request if the name is already in use.

### PUT `/api/persons/:id`

**Request body:**

```json
{
  "name": "Updated Name",
  "number": "987-654-321"
}
```

**Successful response:** HTTP 200 OK with the updated person.

**Possible errors:**

- HTTP 400 Bad Request if the ID is invalid or required fields are missing.
- HTTP 404 Not Found if the person does not exist.

### GET `/api/persons/:id`

Returns the requested phonebook entry as JSON.

If the ID is invalid, the server returns HTTP 400. If the entry does not exist, the server returns HTTP 404.

### DELETE `/api/persons/:id`

Deletes the requested phonebook entry.

- HTTP 204 No Content if the entry is deleted.
- HTTP 400 Bad Request if the ID is invalid.
- HTTP 404 Not Found if the entry does not exist.

### GET `/info`

Returns information about the number of phonebook entries and the current date and time, provided this route is registered separately in `index.js`.

## ⚙️ Environment Configuration

The backend uses environment variables to configure its MongoDB connection and server port.

Create a `.env` file in the project root:

```dotenv
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name
PORT=3003
```

Replace the example values with your actual MongoDB Atlas credentials and database name.

**Important:** Do not commit `.env` to a public repository. Add it to `.gitignore` to protect database credentials.

## 💻 Installation and Running

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

### 2. Navigate to the backend directory

```bash
cd full-stack-open/part3/phonebook-backend
```

### 3. Install dependencies

```bash
npm install
```

The backend requires the following packages:

- `express` — HTTP server and routing.
- `cors` — Cross-origin request handling.
- `mongoose` — MongoDB connection management.
- `mongodb` — MongoDB Node.js driver.
- `dotenv` — Environment variable configuration.

Install them if they are not already listed in `package.json`:

```bash
npm install express cors mongoose mongodb dotenv
```

### 4. Configure environment variables

Create the `.env` file as described in the Environment Configuration section.

### 5. Start the server

Run the command configured in `package.json`. For example, if the project uses `node`:

```bash
node src/index.js
```

If the entry point is `index.js` in the project root, use:

```bash
node index.js
```

The server listens on the port specified by `PORT`, or port `3003` if no port is configured.

### 6. Test the application

If a test script is configured in `package.json`, run:

```bash
npm run test
```

The availability of this command depends on the project's test configuration.

### 7. Run the command-line database script

To list all phonebook entries or add a new entry, use:

```bash
node src/mongo.js
```

The script uses the database credentials configured in `.env`.

The command-line script must support the selected argument format in `src/mongo.js` to add entries. Check its implementation before supplying a name and number.

## 🚀 Demo

You can view a working version of the project here:
👉 [Vercel](https://part3-phonebook-backend.vercel.app/)

## 🧠 Notes

- MongoDB Atlas must be configured to accept connections from your environment.
- Keep database credentials in `.env`, not directly in source code.
- The Express server uses `cors()` to enable cross-origin requests.
- The `express.json()` middleware parses JSON request bodies.
- MongoDB ObjectIds are used to identify phonebook entries.
- API routes return JSON responses for phonebook operations.
- Invalid IDs, missing fields, and nonexistent entries are handled with appropriate HTTP status codes.
- The backend uses Node.js and Express.
- Frontend and backend ports may differ. Configure the frontend API base URL to match the backend address.