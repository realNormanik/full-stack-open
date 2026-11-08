# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB cluster. Copy `.env.example` to `.env` and set:

- `MONGODB_URI` - cluster connection string (without database name in the path)
- `MONGODB_NAME` - database inside the cluster used by the app

Sample data can be loaded with `npm run seed` (does nothing if the `todos` collection is not empty).

# Redis

Pass connection url with env `REDIS_URL`