const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../utils/config");
const { User, Session } = require("../models");
const { HttpError } = require("../utils/errors");

const TOKEN_LIFETIME = "1h";

// POST /api/login - returns a JWT and stores the session in the database
async function login(request, response) {
  const { username, password } = request.body || {};

  if (typeof username !== "string" || typeof password !== "string") {
    throw new HttpError(401, "Invalid credentials");
  };

  const user = await User.findOne({ username });

  const passwordIsValid = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !passwordIsValid) {
    throw new HttpError(401, "Invalid credentials");
  };

  if (user.disabled) {
    throw new HttpError(403, "User account disabled");
  };

  const token = jwt.sign({ id: user.id, username: user.username }, config.TOKEN, {
    expiresIn: TOKEN_LIFETIME,
  });

  const { exp } = jwt.decode(token);

  await Session.create({ token, userId: user._id, expiresAt: new Date(exp * 1000) });

  response.status(200).json({ token, username: user.username, name: user.name });
};

module.exports = { login };
