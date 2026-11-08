const express = require("express");
const router = express.Router();

const { MONGODB_NAME } = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++

  // Do not expose connection strings (MONGODB_URI contains credentials)
  res.send({
    database: MONGODB_NAME,
    visits
  });
});

module.exports = router;
