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
const { useServer } = require("graphql-ws/use/ws");

const { Author, Book, User } = require("./models");

const JWT_SECRET = process.env.JWT_SECRET || "12345";
const PORT = process.env.PORT || 4000;
const GRAPHQL_PATH = "/graphql";

const pubsub = new PubSub();

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

    login(username: String!, password: String!): Token

    _resetDatabase: Boolean
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),

    authorCount: async () => Author.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        filter.author = author ? author._id : null;
      };

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      };

      return Book.find(filter).populate("author");
    },

    allAuthors: async () => {
      return Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $project: {
            name: 1,
            born: 1,
            bookCount: { $size: "$books" },
          },
        },
      ]);
    },

    allGenres: async () => {
      const books = await Book.find();
      const genres = new Set();

      books.forEach((book) => {
        book.genres.forEach((genre) => genres.add(genre));
      });

      return Array.from(genres);
    },

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      };

      if (args.title.length < 3) {
        throw new GraphQLError(
          "Book title must be at least 3 characters long."
        );
      };

      if (args.genres.length === 0) {
        throw new GraphQLError("At least one genre must be provided.");
      };

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        if (args.author.length < 3) {
          throw new GraphQLError(
            "Author name must be at least 3 characters long."
          );
        };

        author = new Author({ name: args.author });
        await author.save();
      };

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      });

      await newBook.save();

      const populatedBook = await newBook.populate("author");

      await pubsub.publish("BOOK_ADDED", {
        bookAdded: populatedBook,
      });

      return populatedBook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      if (args.setBornTo < 0) {
        throw new GraphQLError("Birth year cannot be negative.");
      }

      author.born = args.setBornTo;
      await author.save();

      return author;
    },

    createUser: async (root, args) => {
      const existingUser = await User.findOne({
        username: args.username,
      });

      if (existingUser) {
        throw new GraphQLError("Username already exists.");
      };

      if (args.password.length < 6) {
        throw new GraphQLError(
          "Password must be at least 6 characters long."
        );
      };

      const hashedPassword = await bcrypt.hash(args.password, 10);

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password: hashedPassword,
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

      const passwordIsValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordIsValid) {
        throw new GraphQLError("Invalid password.");
      };

      const token = jwt.sign(
        { username: user.username, id: user._id },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { token };
    },

    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError(
          "_resetDatabase is only available in test mode"
        );
      }

      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});

      return true;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.subscribe("BOOK_ADDED"),
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

// Authentication for HTTP requests.
const getCurrentUser = async (authorization) => {
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  };

  try {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) return null;

    return await User.findById(decodedToken.id);
  } catch {
    return null;
  };
};

const yoga = createYoga({
  schema,
  graphqlEndpoint: GRAPHQL_PATH,
  context: async ({ request }) => {
    const currentUser = await getCurrentUser(
      request.headers.get("authorization")
    );

    return { currentUser };
  },
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// One HTTP server handles Express, Yoga and WebSocket upgrades.
const server = createServer(app);

app.use(GRAPHQL_PATH, yoga);

// WebSocket endpoint for GraphQL subscriptions.
const wsServer = new WebSocketServer({
  server,
  path: GRAPHQL_PATH,
});

// graphql-ws handles the GraphQL WebSocket protocol.
const serverCleanup = useServer(
  {
    schema,

    context: async (ctx) => {
      const authorization =
        ctx.connectionParams?.authorization;

      const currentUser = await getCurrentUser(
        typeof authorization === "string" ? authorization : undefined
      );

      return { currentUser };
    },
  },
  wsServer
);

wsServer.on("connection", () => {
  console.log("GraphQL WebSocket client connected");
});

wsServer.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_NAME,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`HTTP GraphQL: http://localhost:${PORT}${GRAPHQL_PATH}`);
      console.log(`WebSocket GraphQL: ws://localhost:${PORT}${GRAPHQL_PATH}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exitCode = 1;
  });

async function shutdown() {
  await serverCleanup.dispose();
  wsServer.close();
  server.close();
  await mongoose.disconnect();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);