require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const personsRouter = require("../controllers/persons");

const app = express();

const uri = process.env.MONGODB_URI;

console.log("Mongo URI configured:", Boolean(uri));
console.log("Mongo URI uses SRV:", uri?.startsWith("mongodb+srv://"));

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
};

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/persons", personsRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;