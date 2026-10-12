const bcrypt = require("bcryptjs");
const express = require("express");
const { authenticateToken } = require("../utils/auth");

const User = require("../models/user");

const usersRouter = express.Router();

usersRouter.get("/", authenticateToken, async (req, res) => {
  try {
    // Fetch users and select only the necessary fields
    const users = await User.find({}).select("id username name created posts"); // Adjust the fields as necessary
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  };
});

usersRouter.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    };

    // Return the user information (excluding passwordHash)
    const userInfo = user.toJSON();
    delete userInfo.passwordHash; // Optionally remove sensitive information

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the user" });
  };
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  };

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: "Username and password must be at least 3 characters long" });
  };

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username must be unique" });
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;