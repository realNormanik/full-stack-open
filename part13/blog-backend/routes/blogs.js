const router = require("express").Router();

const blogs = require("../controllers/blogs");
const { userExtractor } = require("../utils/middleware");

router.get("/", blogs.getAll);
router.get("/:id", blogs.getOne);
router.post("/", userExtractor, blogs.create);
router.put("/:id", blogs.updateLikes);
router.delete("/:id", userExtractor, blogs.remove);

module.exports = router;
