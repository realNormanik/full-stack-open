const router = require("express").Router();

const { logout } = require("../controllers/logout");
const { userExtractor } = require("../utils/middleware");

router.delete("/", userExtractor, logout);

module.exports = router;
