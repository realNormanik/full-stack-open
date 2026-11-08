const { Blog, ReadingList } = require("../models");
const { HttpError, ValidationError } = require("../utils/errors");

// GET /api/readinglists - all reading list entries
async function getAll(request, response) {
  const entries = await ReadingList.find()
    .sort({ _id: 1 })
    .populate("user", "username")
    .populate("blog", "title url author year");

  const result = entries
    .filter((entry) => entry.user && entry.blog)
    .map((entry) => ({
      id: entry.id,
      username: entry.user.username,
      title: entry.blog.title,
      url: entry.blog.url,
      author: entry.blog.author,
      year: entry.blog.year,
      read: entry.read,
    }));

  response.json(result);
};

// POST /api/readinglists - adds a blog to the logged-in user's reading list.
// Body: { "blogId": "<id>", "userId": "<id>" } ("userId" is optional, but must be your own id).
async function create(request, response) {
  const { blogId, userId } = request.body || {};

  if (!blogId) {
    throw new ValidationError("Missing 'blogId'");
  };

  if (userId && String(userId) !== request.user.id) {
    throw new HttpError(403, "Forbidden: You can only change your own reading list");
  };

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new HttpError(404, "Blog not found");
  };

  try {
    const entry = await ReadingList.create({ userId: request.user._id, blogId: blog._id });

    response.status(201).json(entry);
  } catch (error) {
    if (error.code === 11000) {
      throw new ValidationError("Blog already in reading list");
    };

    throw error;
  };
};

// PUT /api/readinglists/:id - marks a blog on your reading list as read / unread
async function updateRead(request, response) {
  const { read } = request.body || {};

  if (typeof read !== "boolean") {
    throw new ValidationError("The 'read' field must be a boolean value");
  };

  const entry = await ReadingList.findById(request.params.id);

  if (!entry) {
    throw new HttpError(404, "Reading list entry not found");
  };

  if (!entry.userId.equals(request.user._id)) {
    throw new HttpError(403, "Forbidden: This entry is not on your reading list");
  };

  entry.read = read;

  await entry.save();

  response.json(entry);
};

module.exports = { getAll, create, updateRead };
