const express = require("express");

const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { authenticateToken } = require("../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "_id username name");
    return res.json(blogs);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  };
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate("user", "_id username name");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    };

    return res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred while retrieving the blog" });
  };
});

router.post("/:id/comments", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const newComment = new Comment({ content });
    blog.comments.push(newComment);
    await blog.save();

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while adding the comment" });
  };
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  try {
    // Assuming the user is obtained from the token and is available in req.user
    const user = req.user; // This should be the authenticated user from the token

    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user // Use the user"s ID to associate the blog with the user
    });

    const savedBlog = await blog.save();

    // Increment the createdPosts count for the user
    await User.findByIdAndUpdate(user._id, { 
      $inc: { created: 1 }, 
      $push: { posts: savedBlog._id } // Add the blog ID to the user"s posts array
    });

    return res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while saving the blog" });
  };
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog post to be deleted
    const deletedBlog = await Blog.findById(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Get the user associated with the blog post
    const userId = deletedBlog.user; // Assuming "user" field in Blog references the User

    // Delete the blog post
    await Blog.findByIdAndDelete(id);

    // Decrement the createdPosts count for the user
    await User.findByIdAndUpdate(userId, { 
      $inc: { created: -1 }, 
      $pull: { posts: id } // Remove the blog ID from the user"s posts array
    });

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
    ).populate("user", "_id username name");

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    };

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while updating the blog" });
  };
});

module.exports = router;