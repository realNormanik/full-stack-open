const { Blog, ReadingList } = require("../models");
const { HttpError, ValidationError } = require("../utils/errors");

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const populateUser = (query) => query.populate("user", "name username");

// GET /api/blogs?search=keyword - case-insensitive search in title or author,
// blogs sorted by likes (descending).
async function getAll(request, response) {
  const search = typeof request.query.search === "string" ? request.query.search.trim() : "";

  const filter = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");

    filter.$or = [{ title: regex }, { author: regex }];
  };

  const blogs = await populateUser(Blog.find(filter).sort({ likes: -1, _id: 1 }));

  response.json(blogs);
};

async function getOne(request, response) {
  const blog = await populateUser(Blog.findById(request.params.id));

  if (!blog) {
    throw new HttpError(404, "Blog not found");
  };

  response.json(blog);
};

// POST /api/blogs - the blog is linked to the logged-in user (userId from the token).
// `author` is taken from the body when given, otherwise it is the user's username.
async function create(request, response) {
  const { url, title, year, likes, author } = request.body || {};

  const missing = [];

  if (!url) missing.push("url");
  if (!title) missing.push("title");
  if (year === undefined || year === null || year === "") missing.push("year");

  if (missing.length > 0) {
    throw new ValidationError(`Missing required fields: ${missing.map((field) => `'${field}'`).join(", ")}`);
  };

  if (author !== undefined && typeof author !== "string") {
    throw new ValidationError("Field 'author' must be a string");
  };

  const blog = await Blog.create({
    url,
    title,
    year,
    likes,
    author: author && author.trim() ? author : request.user.username,
    userId: request.user._id,
  });

  const created = await populateUser(Blog.findById(blog._id));

  response.status(201).json(created);
};

// PUT /api/blogs/:id - updates the number of likes
async function updateLikes(request, response) {
  const { likes } = request.body || {};

  if (typeof likes !== "number") {
    throw new ValidationError("Missing or invalid 'likes' field");
  };

  const blog = await populateUser(
    Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true })
  );

  if (!blog) {
    throw new HttpError(404, "Blog not found");
  };

  response.json(blog);
};

// DELETE /api/blogs/:id - only the user who added the blog can delete it
async function remove(request, response) {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    throw new HttpError(404, "Blog not found");
  };

  if (!blog.userId.equals(request.user._id)) {
    throw new HttpError(403, "unauthorized deletion: you can only delete your own blogs");
  };

  await blog.deleteOne();
  await ReadingList.deleteMany({ blogId: blog._id });

  response.status(204).end();
};

module.exports = { getAll, getOne, create, updateLikes, remove };
