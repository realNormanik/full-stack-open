const supertest = require("supertest");
const express = require("express");
const { test, describe, before } = require("node:test");

const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../index");

const router = express.Router();
const api = supertest(app);

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  };

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(204).end(); // No content
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while deleting the blog" });
  };
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    };
    
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while updating the blog" });
  };
});

describe("Blog API", () => {
  before(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
  });

  test("fails to add blog without token", async () => {
    const newBlog = { title: "No Token Blog", author: "Anonymous", url: "https://notoken.com" };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401);
  });
});

module.exports = router;