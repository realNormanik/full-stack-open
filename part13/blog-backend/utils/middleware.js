const jwt = require("jsonwebtoken");

const config = require("./config");
const { User, Session } = require("../models");
const { HttpError } = require("./errors");

function extractToken(request) {
  const header = request.get("authorization");

  if (!header || !header.toLowerCase().startsWith("bearer ")) {
    throw new HttpError(401, "Missing or invalid Authorization header");
  };

  const token = header.slice(7).trim();

  if (!token) {
    throw new HttpError(401, "Missing or invalid Authorization header");
  };

  return token;
};

// Authentication: the JWT must be valid, must have a live session in the
// `sessions` collection and the user must exist and must not be disabled.
async function userExtractor(request, response, next) {
  const token = extractToken(request);

  let decoded;

  try {
    decoded = jwt.verify(token, config.TOKEN);
  } catch (error) {
    throw new HttpError(401, "Invalid or expired token");
  };

  const session = await Session.findOne({ token });

  if (!session) {
    throw new HttpError(401, "Session not found, please log in again");
  };

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new HttpError(401, "User not found");
  };

  if (user.disabled) {
    throw new HttpError(403, "User account disabled");
  };

  request.token = token;
  request.user = user;

  next();
};

function unknownEndpoint(request, response) {
  response.status(404).json({ error: "Not Found" });
};

// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
  // Our own validation errors: { error: ["...", "..."] }
  if (error.name === "ValidationError" && error.messages) {
    return response.status(400).json({ error: error.messages });
  };

  // Mongoose schema validation
  if (error.name === "ValidationError" && error.errors) {
    const messages = Object.values(error.errors).map((item) => item.message);

    return response.status(400).json({ error: messages });
  };

  if (error.name === "CastError") {
    const field = error.path === "_id" ? "id" : error.path;

    return response.status(400).json({ error: `Malformed ${field}` });
  };

  // Duplicate key (unique index)
  if (error.code === 11000) {
    const fields = Object.keys(error.keyPattern || error.keyValue || {});

    return response.status(400).json({
      error: [`${fields.join(", ") || "value"} must be unique`],
    });
  };

  if (error.name === "HttpError") {
    return response.status(error.status).json({ error: error.message });
  };

  // Malformed JSON body (produced by the body parser)
  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Malformed JSON body" });
  };

  if (error.status && error.status >= 400 && error.status < 500) {
    return response.status(error.status).json({ error: error.message });
  };

  console.error("Error occurred:", error);

  response.status(500).json({ error: "Internal Server Error" });
};

module.exports = { userExtractor, unknownEndpoint, errorHandler };
