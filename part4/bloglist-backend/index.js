require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
};

if (!dbName) {
  throw new Error("Missing MONGODB_NAME environment variable");
};

mongoose.connect(uri, { dbName })
  .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3003;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};