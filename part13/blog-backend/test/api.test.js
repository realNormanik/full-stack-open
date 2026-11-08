const { test, describe, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");

// Tests never touch the real data: they use a separate "<MONGODB_NAME>_test" database.
require("dotenv").config();

const baseName = process.env.MONGODB_NAME || "fullstackopen";

process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
process.env.MONGODB_NAME = baseName.endsWith("_test") ? baseName : `${baseName}_test`;
process.env.TOKEN = process.env.TOKEN || "test-secret";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const { connect, disconnect } = require("../utils/db");
const { User, Blog, ReadingList, Session } = require("../models");

const api = supertest(app);

const createUser = async (overrides = {}) => {
  const { password = "secret123", ...rest } = overrides;

  return User.create({
    name: "Test User",
    username: "test@example.com",
    password: await bcrypt.hash(password, 4),
    ...rest,
  });
};

const login = async (username = "test@example.com", password = "secret123") => {
  const response = await api.post("/api/login").send({ username, password }).expect(200);

  return response.body.token;
};

const auth = (token) => ({ Authorization: `Bearer ${token}` });

before(async () => {
  assert.ok(process.env.MONGODB_NAME.endsWith("_test"), "refusing to run tests on a non-test database");

  await connect();
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await disconnect();
});

beforeEach(async () => {
  await Promise.all([User.deleteMany({}), Blog.deleteMany({}), ReadingList.deleteMany({}), Session.deleteMany({})]);
});

describe("connection", () => {
  test("works inside the database named by MONGODB_NAME", () => {
    assert.equal(mongoose.connection.name, process.env.MONGODB_NAME);
  });

  test("GET / responds", async () => {
    const response = await api.get("/").expect(200);

    assert.ok(response.body.message);
  });

  test("unknown route is a JSON 404", async () => {
    const response = await api.get("/api/nope").expect(404);

    assert.deepEqual(response.body, { error: "Not Found" });
  });
});

describe("users", () => {
  test("creates a user without leaking the password", async () => {
    const response = await api
      .post("/api/users")
      .send({ name: "Matti", username: "matti@example.com", password: "secret123" })
      .expect(201);

    assert.equal(response.body.username, "matti@example.com");
    assert.equal(response.body.password, undefined);
    assert.ok(response.body.id);

    const stored = await User.findOne({ username: "matti@example.com" });

    assert.notEqual(stored.password, "secret123");
    assert.ok(await bcrypt.compare("secret123", stored.password));
  });

  test("username must be an email", async () => {
    const response = await api
      .post("/api/users")
      .send({ name: "Matti", username: "not-an-email", password: "secret123" })
      .expect(400);

    assert.deepEqual(response.body, { error: ["Validation isEmail on username failed"] });
  });

  test("rejects missing fields, short passwords and duplicates", async () => {
    await api.post("/api/users").send({ name: "A" }).expect(400);
    await api.post("/api/users").send({ name: "A", username: "a@example.com", password: "123" }).expect(400);

    await createUser();

    const response = await api
      .post("/api/users")
      .send({ name: "Dup", username: "test@example.com", password: "secret123" })
      .expect(400);

    assert.match(response.body.error[0], /unique/);
  });

  test("lists users with their blogs", async () => {
    const user = await createUser();

    await Blog.create({ title: "T", url: "https://a.b", year: 2020, author: "Test User", userId: user._id });

    const response = await api.get("/api/users").expect(200);

    assert.equal(response.body.length, 1);
    assert.equal(response.body[0].blogs.length, 1);
    assert.equal(response.body[0].blogs[0].title, "T");
    assert.equal(response.body[0].blogs[0].author, "Test User");
    assert.equal(response.body[0].blogs[0].year, 2020);
    assert.equal(response.body[0].blogs[0].likes, 0);
    assert.equal(response.body[0].password, undefined);
  });

  test("changes own username only", async () => {
    await createUser();
    await createUser({ name: "Other", username: "other@example.com" });

    const token = await login();

    await api.put("/api/users/test@example.com").send({ username: "new@example.com" }).expect(401);
    await api
      .put("/api/users/other@example.com")
      .set(auth(token))
      .send({ username: "hacked@example.com" })
      .expect(403);
    await api.put("/api/users/test@example.com").set(auth(token)).send({ username: "bad" }).expect(400);

    const response = await api
      .put("/api/users/test@example.com")
      .set(auth(token))
      .send({ username: "new@example.com" })
      .expect(200);

    assert.equal(response.body.username, "new@example.com");
  });

  test("renaming a user keeps their blogs' author in sync", async () => {
    const user = await createUser();

    await Blog.create([
      { title: "Mine", url: "https://a.b", year: 2020, author: "test@example.com", userId: user._id },
      { title: "Custom", url: "https://a.b", year: 2020, author: "Dan Abramov", userId: user._id },
    ]);

    const token = await login();

    await api.put("/api/users/test@example.com").set(auth(token)).send({ username: "new@example.com" }).expect(200);

    assert.equal((await Blog.findOne({ title: "Mine" })).author, "new@example.com");
    assert.equal((await Blog.findOne({ title: "Custom" })).author, "Dan Abramov");
  });
});

describe("login and logout", () => {
  test("login returns token, username and name", async () => {
    await createUser();

    const response = await api
      .post("/api/login")
      .send({ username: "test@example.com", password: "secret123" })
      .expect(200);

    assert.ok(response.body.token);
    assert.equal(response.body.username, "test@example.com");
    assert.equal(response.body.name, "Test User");
    assert.equal(await Session.countDocuments(), 1);
  });

  test("wrong credentials give 401", async () => {
    await createUser();

    await api.post("/api/login").send({ username: "test@example.com", password: "wrong" }).expect(401);
    await api.post("/api/login").send({ username: "nobody@example.com", password: "secret123" }).expect(401);
    await api.post("/api/login").send({}).expect(401);
  });

  test("disabled user cannot log in and an existing token stops working at once", async () => {
    const user = await createUser();
    const token = await login();

    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 2020 }).expect(201);

    user.disabled = true;
    await user.save();

    await api.post("/api/blogs").set(auth(token)).send({ title: "T2", url: "https://a.b", year: 2020 }).expect(403);
    await api.post("/api/login").send({ username: "test@example.com", password: "secret123" }).expect(403);
  });

  test("logout removes the session and invalidates the token", async () => {
    await createUser();

    const token = await login();

    await api.delete("/api/logout").set(auth(token)).expect(200);

    assert.equal(await Session.countDocuments(), 0);

    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 2020 }).expect(401);
    await api.delete("/api/logout").set(auth(token)).expect(401);
  });

  test("garbage / missing tokens give 401", async () => {
    await api.post("/api/blogs").send({}).expect(401);
    await api.post("/api/blogs").set(auth("garbage")).send({}).expect(401);
  });
});

describe("blogs", () => {
  test("creating requires a token and links the blog to the user", async () => {
    await createUser();

    const token = await login();

    await api.post("/api/blogs").send({ title: "T", url: "https://a.b", year: 2020 }).expect(401);

    const response = await api
      .post("/api/blogs")
      .set(auth(token))
      .send({ title: "Clean React", url: "https://a.b", year: 2020 })
      .expect(201);

    assert.equal(response.body.title, "Clean React");
    assert.equal(response.body.likes, 0);
    assert.equal(response.body.author, "test@example.com");
    assert.equal(response.body.userId, (await User.findOne({ username: "test@example.com" })).id);
    assert.equal(response.body.user.username, "test@example.com");
    assert.ok(response.body.id);
    assert.equal(response.body._id, undefined);
  });

  test("validates required fields and the year range", async () => {
    await createUser();

    const token = await login();
    const year = new Date().getFullYear();

    const missing = await api.post("/api/blogs").set(auth(token)).send({ title: "T" }).expect(400);

    assert.match(missing.body.error[0], /url.*year/);

    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 1990 }).expect(400);
    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: year + 1 }).expect(400);
    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: "abc" }).expect(400);
    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 1991 }).expect(201);
    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year }).expect(201);
  });

  test("lists blogs sorted by likes with the user", async () => {
    const user = await createUser();

    await Blog.create([
      { title: "Low", url: "https://a.b", year: 2020, likes: 1, author: "X", userId: user._id },
      { title: "High", url: "https://a.b", year: 2020, likes: 9, author: "X", userId: user._id },
      { title: "Mid", url: "https://a.b", year: 2020, likes: 5, author: "X", userId: user._id },
    ]);

    const response = await api.get("/api/blogs").expect(200);

    assert.deepEqual(
      response.body.map((blog) => blog.title),
      ["High", "Mid", "Low"]
    );
    assert.equal(response.body[0].user.name, "Test User");
  });

  test("search is case-insensitive over title and author and treats input literally", async () => {
    const user = await createUser();

    await Blog.create([
      { title: "Learning React", url: "https://a.b", year: 2020, author: "Dan Abramov", userId: user._id },
      { title: "Gaps in sequences (v2)", url: "https://a.b", year: 2020, author: "Laurenz Albe", userId: user._id },
      { title: "Other", url: "https://a.b", year: 2020, author: "Jami Kousa", userId: user._id },
    ]);

    const byTitle = await api.get("/api/blogs?search=REACT").expect(200);
    const byAuthor = await api.get("/api/blogs?search=jami").expect(200);
    const none = await api.get("/api/blogs?search=zzz").expect(200);
    const literal = await api.get("/api/blogs?search=(v2)").expect(200);
    const regexChars = await api.get("/api/blogs?search=.*").expect(200);

    assert.deepEqual(byTitle.body.map((blog) => blog.title), ["Learning React"]);
    assert.deepEqual(byAuthor.body.map((blog) => blog.title), ["Other"]);
    assert.deepEqual(none.body, []);
    assert.equal(literal.body.length, 1);
    assert.equal(regexChars.body.length, 0);
  });

  test("updates likes", async () => {
    const user = await createUser();
    const blog = await Blog.create({ title: "T", url: "https://a.b", year: 2020, author: "X", userId: user._id });

    const response = await api.put(`/api/blogs/${blog.id}`).send({ likes: 3 }).expect(200);

    assert.equal(response.body.likes, 3);

    await api.put(`/api/blogs/${blog.id}`).send({ likes: "3" }).expect(400);
    await api.put(`/api/blogs/${blog.id}`).send({ likes: -1 }).expect(400);
    await api.put(`/api/blogs/${new mongoose.Types.ObjectId()}`).send({ likes: 1 }).expect(404);
    await api.put("/api/blogs/not-an-id").send({ likes: 1 }).expect(400);
  });

  test("only the owner can delete a blog", async () => {
    const owner = await createUser();

    await createUser({ name: "Other", username: "other@example.com" });

    const blog = await Blog.create({ title: "T", url: "https://a.b", year: 2020, author: "X", userId: owner._id });

    const ownerToken = await login();
    const otherToken = await login("other@example.com");

    await api.delete(`/api/blogs/${blog.id}`).expect(401);

    const forbidden = await api.delete(`/api/blogs/${blog.id}`).set(auth(otherToken)).expect(403);

    assert.match(forbidden.body.error, /only delete your own/);

    await api.delete(`/api/blogs/${new mongoose.Types.ObjectId()}`).set(auth(ownerToken)).expect(404);
    await api.delete(`/api/blogs/${blog.id}`).set(auth(ownerToken)).expect(204);

    assert.equal(await Blog.countDocuments(), 0);
  });

  test("author from the body is kept, defaults to the username otherwise", async () => {
    await createUser();

    const token = await login();

    const custom = await api
      .post("/api/blogs")
      .set(auth(token))
      .send({ title: "T", url: "https://a.b", year: 2020, author: "Dan Abramov", likes: 5 })
      .expect(201);

    assert.equal(custom.body.author, "Dan Abramov");
    assert.equal(custom.body.likes, 5);

    const fallback = await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 2020 }).expect(201);

    assert.equal(fallback.body.author, "test@example.com");

    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 2020, author: 5 }).expect(400);
  });

  test("the blog is stored with userId of the logged-in user", async () => {
    const user = await createUser();
    const token = await login();

    await api.post("/api/blogs").set(auth(token)).send({ title: "T", url: "https://a.b", year: 2020 }).expect(201);

    const stored = await Blog.findOne({ title: "T" }).lean();

    assert.equal(String(stored.userId), user.id);
    assert.equal(stored.user, undefined);
  });

  test("deleting someone else's blog gives the 13.11 error message", async () => {
    const owner = await createUser();

    await createUser({ name: "Other", username: "other@example.com" });

    const blog = await Blog.create({ title: "T", url: "https://a.b", year: 2020, author: "X", userId: owner._id });
    const otherToken = await login("other@example.com");

    const response = await api.delete(`/api/blogs/${blog.id}`).set(auth(otherToken)).expect(403);

    assert.deepEqual(response.body, { error: "unauthorized deletion: you can only delete your own blogs" });
  });

  test("malformed JSON is a 400", async () => {
    const response = await api.post("/api/login").set("Content-Type", "application/json").send("{bad").expect(400);

    assert.deepEqual(response.body, { error: "Malformed JSON body" });
  });
});

describe("authors", () => {
  test("returns articles and likes per author sorted by likes", async () => {
    const user = await createUser();

    await Blog.create([
      { title: "A1", url: "https://a.b", year: 2020, likes: 4, author: "Jami Kousa", userId: user._id },
      { title: "A2", url: "https://a.b", year: 2020, likes: 6, author: "Jami Kousa", userId: user._id },
      { title: "B1", url: "https://a.b", year: 2020, likes: 2, author: "Kalle Ilves", userId: user._id },
      { title: "C1", url: "https://a.b", year: 2020, likes: 40, author: "Dan Abramov", userId: user._id },
    ]);

    const response = await api.get("/api/authors").expect(200);

    assert.deepEqual(response.body, [
      { author: "Dan Abramov", articles: 1, likes: 40 },
      { author: "Jami Kousa", articles: 2, likes: 10 },
      { author: "Kalle Ilves", articles: 1, likes: 2 },
    ]);
  });

  test("blogs whose author is a registered username are grouped under the user's name", async () => {
    const user = await createUser();

    await Blog.create([
      { title: "A1", url: "https://a.b", year: 2020, likes: 4, author: "test@example.com", userId: user._id },
      { title: "A2", url: "https://a.b", year: 2020, likes: 6, author: "test@example.com", userId: user._id },
      { title: "B1", url: "https://a.b", year: 2020, likes: 1, author: "Kalle Ilves", userId: user._id },
    ]);

    const response = await api.get("/api/authors").expect(200);

    assert.deepEqual(response.body, [
      { author: "Test User", articles: 2, likes: 10 },
      { author: "Kalle Ilves", articles: 1, likes: 1 },
    ]);
  });
});

describe("reading lists", () => {
  const setup = async () => {
    const reader = await createUser();
    const author = await createUser({ name: "Author", username: "author@example.com" });

    const blogs = await Blog.create([
      { title: "One", url: "https://a.b", year: 2020, likes: 1, author: "Author", userId: author._id },
      { title: "Two", url: "https://a.b", year: 2021, likes: 2, author: "Author", userId: author._id },
    ]);

    return { reader, author, blogs, token: await login() };
  };

  test("adds blogs, rejects duplicates and unknown blogs", async () => {
    const { blogs, reader, token } = await setup();

    await api.post("/api/readinglists").send({ blogId: blogs[0].id }).expect(401);

    const created = await api
      .post("/api/readinglists")
      .set(auth(token))
      .send({ blogId: blogs[0].id, userId: reader.id })
      .expect(201);

    assert.equal(created.body.read, false);

    const duplicate = await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[0].id }).expect(400);

    assert.deepEqual(duplicate.body, { error: ["Blog already in reading list"] });

    await api.post("/api/readinglists").set(auth(token)).send({}).expect(400);
    await api
      .post("/api/readinglists")
      .set(auth(token))
      .send({ blogId: new mongoose.Types.ObjectId() })
      .expect(404);
  });

  test("cannot add to somebody else's reading list", async () => {
    const { blogs, author, token } = await setup();

    await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[0].id, userId: author.id }).expect(403);
  });

  test("GET /api/users/:id returns readings with the read flag and supports ?read filter", async () => {
    const { blogs, reader, token } = await setup();

    const first = await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[0].id }).expect(201);

    await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[1].id }).expect(201);
    await api.put(`/api/readinglists/${first.body.id}`).set(auth(token)).send({ read: true }).expect(200);

    const all = await api.get(`/api/users/${reader.id}`).expect(200);

    assert.equal(all.body.username, "test@example.com");
    assert.equal(all.body.password, undefined);
    assert.equal(all.body.readings.length, 2);
    assert.deepEqual(all.body.readings[0].readinglists, [{ read: true, id: first.body.id }]);
    assert.equal(all.body.readings[0].title, "One");
    assert.equal(all.body.readings[0].year, 2020);

    const read = await api.get(`/api/users/${reader.id}?read=true`).expect(200);
    const unread = await api.get(`/api/users/${reader.id}?read=false`).expect(200);

    assert.deepEqual(read.body.readings.map((blog) => blog.title), ["One"]);
    assert.deepEqual(unread.body.readings.map((blog) => blog.title), ["Two"]);

    await api.get(`/api/users/${new mongoose.Types.ObjectId()}`).expect(404);
  });

  test("only the owner can mark an entry as read", async () => {
    const { blogs, token } = await setup();

    await createUser({ name: "Other", username: "other@example.com" });

    const entry = await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[0].id }).expect(201);
    const otherToken = await login("other@example.com");

    await api.put(`/api/readinglists/${entry.body.id}`).send({ read: true }).expect(401);
    await api.put(`/api/readinglists/${entry.body.id}`).set(auth(otherToken)).send({ read: true }).expect(403);
    await api.put(`/api/readinglists/${entry.body.id}`).set(auth(token)).send({ read: "yes" }).expect(400);
    await api
      .put(`/api/readinglists/${new mongoose.Types.ObjectId()}`)
      .set(auth(token))
      .send({ read: true })
      .expect(404);

    const updated = await api.put(`/api/readinglists/${entry.body.id}`).set(auth(token)).send({ read: true }).expect(200);

    assert.equal(updated.body.read, true);
  });

  test("GET /api/readinglists lists entries and deleting a blog removes its entries", async () => {
    const { blogs, token } = await setup();

    await api.post("/api/readinglists").set(auth(token)).send({ blogId: blogs[0].id }).expect(201);

    const list = await api.get("/api/readinglists").expect(200);

    assert.equal(list.body.length, 1);
    assert.equal(list.body[0].username, "test@example.com");
    assert.equal(list.body[0].title, "One");
    assert.equal(list.body[0].read, false);

    const authorToken = await login("author@example.com");

    await api.delete(`/api/blogs/${blogs[0].id}`).set(auth(authorToken)).expect(204);

    assert.equal(await ReadingList.countDocuments(), 0);
  });
});
