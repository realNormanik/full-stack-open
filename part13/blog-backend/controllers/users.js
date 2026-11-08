const bcrypt = require("bcryptjs");

const { User, Blog, ReadingList } = require("../models");
const { HttpError, ValidationError } = require("../utils/errors");

// GET /api/users - all users with the blogs they added
async function getAll(request, response) {
  const users = await User.find().populate("blogs");

  response.json(users);
};

// GET /api/users/:id[?read=true|false] - user with their reading list
async function getOne(request, response) {
  const user = await User.findById(request.params.id);

  if (!user) {
    throw new HttpError(404, "User not found");
  };

  const filter = { userId: user._id };

  if (request.query.read === "true") {
    filter.read = true;
  } else if (request.query.read === "false") {
    filter.read = false;
  };

  const entries = await ReadingList.find(filter).sort({ _id: 1 }).populate("blog");

  const readings = entries
    .filter((entry) => entry.blog)
    .map((entry) => ({
      ...entry.blog.toJSON(),
      readinglists: [{ read: entry.read, id: entry.id }],
    }));

  response.json({ ...user.toJSON(), readings });
};

// POST /api/users
async function create(request, response) {
  const { name, username, password } = request.body || {};

  if (!name || !username || !password) {
    throw new ValidationError("Missing required fields: 'name', 'username' and 'password'");
  };

  if (typeof password !== "string" || password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters long");
  };

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, username, password: passwordHash });

  response.status(201).json(user);
};

// PUT /api/users/:username - changes the username (own account only)
async function updateUsername(request, response) {
  if (request.params.username !== request.user.username) {
    throw new HttpError(403, "Forbidden: You can only change your own username");
  };

  const { username } = request.body || {};

  if (!username) {
    throw new ValidationError("Missing required field: 'username'");
  };

  const oldUsername = request.user.username;

  request.user.username = username;

  await request.user.save();

  // Blogs whose `author` is the username follow the rename
  if (request.user.username !== oldUsername) {
    await Blog.updateMany({ author: oldUsername, userId: request.user._id }, { author: request.user.username });
  };

  response.json(request.user);
};

module.exports = { getAll, getOne, create, updateUsername };
