require("dotenv").config();

const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const { createYoga, createSchema } = require("graphql-yoga");

const { Author, Book, User } = require("./models");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ama5n.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

const JWT_SECRET = process.env.JWT_SECRET || "12345";

const pubsub = new PubSub();
const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", (socket) => {
  console.log("Client connected");

  // Handles incoming messages
  socket.on("message", (message) => {
    console.log("Received:", message);
  });

  // Sending a welcome message
  socket.send("Welcome to the WebSocket server!");

  // Supports call closure
  socket.on("close", () => {
    console.log("Client disconnected");
  });

  // Handles errors
  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

const typeDefs = /* GraphQL */ `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    token: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    _resetDatabase: Boolean
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author ? author._id : null;
      };

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      };

      return await Book.find(filter).populate("author");
    },
    allAuthors: async () => {
      // Use aggregation to fetch authors along with their book count
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books", // "books" is the collection name in MongoDB
            localField: "_id", // _id from authors
            foreignField: "author", // author field in books collection
            as: "books" // Join books to authors
          }
        },
        {
          $project: {
            name: 1, // Include the author"s name
            born: 1, // Include the author"s born year if available
            bookCount: { $size: "$books" } // Count the number of books per author
          }
        }
      ]);

      return authors;
    },
    allGenres: async () => {
      const books = await Book.find();
      const genres = new Set();
      books.forEach(book => {
        book.genres.forEach(genre => genres.add(genre));
      });
      return Array.from(genres);
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      };

      if (args.title.length < 3) {
        throw new GraphQLError("Book title must be at least 3 characters long.");
      };

      if (args.genres.length === 0) {
        throw new GraphQLError("At least one genre must be provided.");
      };

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        if (args.author.length < 3) {
          throw new GraphQLError("Author name must be at least 3 characters long.");
        }
        author = new Author({ name: args.author });
        await author.save();
      };

      const newBook = new Book({ 
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id 
      });

      await newBook.save();
      const populatedBook = await newBook.populate("author");

      // Publish event
      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      };

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      if (args.setBornTo < 0) {
        throw new GraphQLError("Birth year cannot be negative.");
      };

      author.born = args.setBornTo;
      await author.save();
      return author;
    },

    createUser: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username });

      if (existingUser) {
        throw new GraphQLError("Username already exists.");
      };

      if (args.password.length < 6) {
        throw new GraphQLError("Password must be at least 6 characters long.");
      };

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(args.password, saltRounds);

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password: hashedPassword
      });

      await user.save();
      return user;
    },

    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });

      if (!user) {
        throw new GraphQLError("User not found.");
      };

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        throw new GraphQLError("Invalid password.");
      };

      const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      return { token };
    },

    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError("_resetDatabase is only available in test mode");
      };

      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});

      return true;
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.subscribe("BOOK_ADDED")
    }
  }
};

const context = async ({ req }) => {
  const auth = req.headers.authorization;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7);
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (decodedToken.id) {
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    };
  };

  return {};
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  context
});

const server = createServer((req, res) => {
  yoga.handleRequest(req, res);
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit("connection", ws, request);
  });
});

const app = express();

// Use CORS middleware
app.use(cors({
  origin: `${process.env.CORS_ORIGIN}`,
  credentials: true,
}));

// Use yoga as middleware
app.use("/graphql", yoga);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at port: ${PORT}`);
});