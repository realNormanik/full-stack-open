const { test } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  assert.strictEqual(result, 1);
});

test("totalLikes returns correct sum", () => {
  const blogs = [
    { title: "Blog 1", likes: 5 },
    { title: "Blog 2", likes: 10 },
    { title: "Blog 3", likes: 2 }
  ];

  const result = listHelper.totalLikes(blogs);

  assert.strictEqual(result, 17);
});

test("favoriteBlog returns the most liked blog", () => {
  const blogs = [
    { title: "Blog 1", likes: 5 },
    { title: "Blog 2", likes: 10 },
    { title: "Blog 3", likes: 2 }
  ];

  const result = listHelper.favoriteBlog(blogs);

  assert.deepStrictEqual(result, { title: "Blog 2", likes: 10 });
});

test("mostBlogs returns author with most blogs", () => {
  const blogs = [
    { author: "Alice", title: "Blog 1" },
    { author: "Bob", title: "Blog 2" },
    { author: "Alice", title: "Blog 3" },
    { author: "Alice", title: "Blog 4" },
    { author: "Bob", title: "Blog 5" }
  ];

  const result = listHelper.mostBlogs(blogs);

  assert.deepStrictEqual(result, { author: "Alice", blogs: 3 });
});

test("mostLikes returns author with most likes", () => {
  const blogs = [
    { author: "Alice", likes: 10 },
    { author: "Bob", likes: 15 },
    { author: "Alice", likes: 5 },
    { author: "Alice", likes: 7 },
    { author: "Bob", likes: 20 }
  ];

  const result = listHelper.mostLikes(blogs);

  assert.deepStrictEqual(result, { author: "Bob", likes: 35 });
});