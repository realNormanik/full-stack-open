require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Author, Book, User } = require("./models");

const AUTHOR_NAME = "Test User";

const authorData = {
  name: AUTHOR_NAME,
  born: 1990,
};

const booksData = [
  {
    title: "Clean Code Adventures",
    published: 2008,
    genres: ["programming", "classic"],
  },
  {
    title: "The Pragmatic Backend",
    published: 2012,
    genres: ["programming", "design"],
  },
  {
    title: "Refactoring the Kingdom",
    published: 2015,
    genres: ["fantasy", "programming"],
  },
  {
    title: "Stars Over the Database",
    published: 2019,
    genres: ["sci-fi"],
  },
  {
    title: "The Last Deployment",
    published: 2021,
    genres: ["sci-fi", "thriller"],
  },
];

const userData = {
  username: "testuser",
  favoriteGenre: "sci-fi",
  password: "password123",
};

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

    // Seed author and books together (books reference the author's _id)
    const booksCount = await Book.countDocuments();

    if (booksCount > 0) {
      console.log(`Database already contains ${booksCount} books. No changes made.`);
    } else {
      let author = await Author.findOne({ name: AUTHOR_NAME });

      if (!author) {
        author = await Author.create(authorData);
        console.log(`Successfully created author: ${author.name}.`);
      } else {
        console.log(`Author "${author.name}" already exists. Reusing it.`);
      };

      const books = booksData.map((book) => ({
        ...book,
        author: author._id,
      }));

      await Book.insertMany(books);

      console.log(`Successfully imported ${books.length} books.`);
    };

    // Seed user independently (password is hashed, as login uses bcrypt.compare)
    const existingUser = await User.findOne({ username: userData.username });

    if (existingUser) {
      console.log(`User "${userData.username}" already exists. No changes made.`);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await User.create({
        username: userData.username,
        favoriteGenre: userData.favoriteGenre,
        password: hashedPassword,
      });

      console.log(`Successfully created user: ${userData.username}.`);
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