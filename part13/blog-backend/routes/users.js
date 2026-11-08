const router = require("express").Router();

const users = require("../controllers/users");
const { userExtractor } = require("../utils/middleware");

router.get("/", users.getAll);
router.get("/:id", users.getOne);
router.post("/", users.create);
router.put("/:username", userExtractor, users.updateUsername);

module.exports = router;
