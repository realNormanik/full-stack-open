const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // Simulate user creation and reset the database if needed
    await request.post("http://localhost:3003/api/login", { data: { username: "testuser", password: "password" } });
    await page.goto("http://localhost:5173");  // Replace with your app"s URL
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.locator("text=Log in to the application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.fill("input[name='username']", "testuser");
      await page.fill("input[name='password']", "password");
      await page.click("button[type='submit']");
      await expect(page.locator("text=blogs")).toBeVisible();
      await expect(page.locator("text=testuser is logged")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.fill("input[name='username']", "testuser");
      await page.fill("input[name='password']", "wrongpassword");
      await page.click("button[type='submit']");
      await expect(page.locator("text=Invalid credentials")).toBeVisible();  // Modify according to your app"s error message
    });
  });
});

describe("When logged in", () => {
  beforeEach(async ({ page }) => {
    await page.fill("input[name='username']", "testuser");
    await page.fill("input[name='password']", "password");
    await page.click("button[type='submit']");
  });

  test("only the user who created the blog can see the delete button", async ({ page }) => {
    const blog = page.locator("text=New Blog Title");
    await blog.hover();
    await expect(blog.locator("text=delete")).toBeVisible();

    // Check if other users can"t see the delete button
    await page.locator("button[type='logout']").click();
    await page.fill("input[name='username']", "otheruser");
    await page.fill("input[name='password']", "password");
    await page.click("button[type='submit']");

    await blog.hover();
    await expect(blog.locator("text=delete")).toBeHidden();
  });
});

describe("Blog Sorting", () => {
  beforeEach(async ({ page }) => {
    await page.fill("input[name='username']", "testuser");
    await page.fill("input[name='password']", "password");
    await page.click("button[type='submit']");
  });

  test("blogs are sorted by likes, most liked first", async ({ page }) => {
    const firstBlogLikes = await page.locator("text=likes 20").textContent();
    const secondBlogLikes = await page.locator("text=likes 10").textContent();

    expect(Number(firstBlogLikes.split(" ")[1])).toBeGreaterThan(Number(secondBlogLikes.split(" ")[1]));
  });
});