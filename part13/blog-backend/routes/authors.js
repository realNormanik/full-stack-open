const router = require("express").Router();

const authors = require("../controllers/authors");

router.get("/", authors.getAll);

module.exports = router;
