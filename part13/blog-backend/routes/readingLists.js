const router = require("express").Router();

const readingLists = require("../controllers/readingLists");
const { userExtractor } = require("../utils/middleware");

router.get("/", readingLists.getAll);
router.post("/", userExtractor, readingLists.create);
router.put("/:id", userExtractor, readingLists.updateRead);

module.exports = router;
