require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { User, Blog, ReadingList } = require("./models");

const usersData = [
  {
    name: "User Name",
    username: "user@example.com",
    password: "password123",
  },
];

const blogsData = [
  {
    owner: "user@example.com",
    author: "Dan Abramov",
    title: "On let vs const",
    url: "https://overreacted.io/",
    year: 2019,
  },
  {
    owner: "user@example.com",
    author: "Laurenz Albe",
    title: "Gaps in sequences in PostgreSQL",
    url: "https://www.cybertec-postgresql.com/en/",
    year: 2020,
  },
];

// Reading list: `reader` has `blog` (title) on their list, `read` is the read / unread flag
const readingListData = [
  { reader: "user@example.com", blog: "Gaps in sequences in PostgreSQL", read: true },
  { reader: "user@example.com", blog: "On let vs const", read: false },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const mongoName = process.env.MONGODB_NAME;

    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI in .env");
    };

    if (!mongoName) {
      throw new Error("Missing MONGODB_NAME in .env");
    };

    await mongoose.connect(mongoUri, { dbName: mongoName });

    console.log(`Connected to MongoDB database: ${mongoName}`);

    // Make sure collections and indexes (unique username, reading list, TTL sessions) exist
    await mongoose.connection.syncIndexes();

    // Seed users independently (passwords are hashed, as login uses bcrypt.compare)
    const users = {};

    for (const userData of usersData) {
      let user = await User.findOne({ username: userData.username });

      if (user) {
        console.log(`User "${userData.username}" already exists. No changes made.`);
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        user = await User.create({
          name: userData.name,
          username: userData.username,
          password: hashedPassword,
        });

        console.log(`Successfully created user: ${userData.username}.`);
      };

      users[userData.username] = user;
    };

    // Seed blogs (each blog references its owner by `userId`, `author` stays the real author's name)
    const blogsCount = await Blog.countDocuments();

    if (blogsCount > 0) {
      console.log(`Database already contains ${blogsCount} blogs. No changes made.`);
    } else {
      const blogs = blogsData.map(({ owner, ...blog }) => ({
        ...blog,
        userId: users[owner]._id,
      }));

      await Blog.insertMany(blogs);

      console.log(`Successfully imported ${blogs.length} blogs.`);
    };

    // Seed reading lists (safe to run repeatedly: an entry is created only if it does not exist yet)
    let createdEntries = 0;

    for (const entry of readingListData) {
      const reader = users[entry.reader];
      const blog = await Blog.findOne({ title: entry.blog });

      if (!reader || !blog) {
        console.log(`Skipping reading list entry "${entry.blog}" for "${entry.reader}" (blog or user not found).`);
        continue;
      };

      const result = await ReadingList.updateOne(
        { userId: reader._id, blogId: blog._id },
        { $setOnInsert: { read: entry.read } },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        createdEntries += 1;
      };
    };

    if (createdEntries > 0) {
      console.log(`Successfully created ${createdEntries} reading list entries.`);
    } else {
      console.log("Reading lists already seeded. No changes made.");
    };
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    };
  };
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
