require("dotenv").config();

const express = require("express");
const cors = require("cors");
const personsRouter = require("./controllers/persons");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/persons", personsRouter);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3003;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};