require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const personsRouter = require("../controllers/persons");

const app = express();

mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/persons", personsRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;