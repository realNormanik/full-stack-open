const express = require("express");

const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const authorsRouter = require("./routes/authors");
const readingListsRouter = require("./routes/readingLists");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");
const { ensureConnection } = require("./utils/db");

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "Blog API is running" });
});

app.use("/api", async (request, response, next) => {
  await ensureConnection();

  next();
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
