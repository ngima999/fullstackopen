import { test, expect } from "@playwright/test";

// Reusable login function
const login = async (page, username, password) => {
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByText("Log in to application")).toBeVisible();
  await page.getByPlaceholder("username").fill(username);
  await page.getByPlaceholder("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login button is shown", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  test("Log in successfully with correct credentials", async ({ page }) => {
    await login(page, "Hari", "ASDfg5");
    await expect(page.getByText("Hari logged in")).toBeVisible();
  });

  test("Log in fails with wrong credentials", async ({ page }) => {
    await login(page, "wronguser", "wrongpass");
    await expect(page.getByText("invalid username or password")).toBeVisible();
    await expect(page.getByText("Hari logged in")).not.toBeVisible();
  });

  test("A new blog can be created", async ({ page }) => {
    // Login first
    await login(page, "Hari", "ASDfg5");
    await expect(page.locator("body")).toContainText("Hari");


    // Create new blog
    await page.getByText("Create New Blog").click();
    await page.getByPlaceholder("Title").fill("Test Blog");
    await page.getByPlaceholder("Author").fill("Tester");
    await page.getByPlaceholder("URL").fill("TestBlog.com");
    await page.getByRole("button", { name: "Create" }).click();

    // Confirm new blog added
    await expect(page.getByText("Test BlogTester")).toBeVisible();
  });



  test("A blog can be liked", async ({ page }) => {
    // Login first
    await login(page, "Hari", "ASDfg5");
    await expect(page.getByText("Hari logged in")).toBeVisible();

    // Create new blog
    await page.getByText("Create New Blog").click();
    await page.getByPlaceholder("Title").fill("Test Blog A");
    await page.getByPlaceholder("Author").fill("Tester A");
    await page.getByPlaceholder("URL").fill("TestBlogA.com");
    await page.getByRole("button", { name: "Create" }).click();

    // Confirm new blog added
    await expect(page.getByText("Test BlogA Tester A")).toBeVisible();

    // Navigate to the blog details view (ensure you open the blog first)
    await page.getByText("View").click();

    // Ensure the Like button is visible and clickable
    const likeButton = await page.getByRole("button", { name: "Like" });
    await expect(likeButton).toBeVisible();

    // Click the Like button
    await likeButton.click();

    // Wait for the likes count to update, assuming it will increase by 1
    await expect(page.getByText("Likes: 1")).toBeVisible(); // Assuming it starts from 0
  });

  test("A blog can be deleted by the user who created it", async ({ page }) => {
    // Login first
    await login(page, "Hari", "ASDfg5");
    await expect(page.getByText("Hari logged in")).toBeVisible();

    // Create new blog
    await page.getByText("Create New Blog").click();
    await page.getByPlaceholder("Title").fill("Test Blog");
    await page.getByPlaceholder("Author").fill("Tester");
    await page.getByPlaceholder("URL").fill("TestBlog.com");
    await page.getByRole("button", { name: "Create" }).click();

    // Navigate to the blog details view (ensure you open the blog first)
    await page.getByText("View").click();

    // Ensure the Like button is visible and clickable
    const DeleteButton = await page.getByRole("button", { name: "Delete" });
    await expect(DeleteButton).toBeVisible();

    // Delete the blog
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(
      page.getByText("Blog deleted successfully!")
    ).not.toBeVisible();
  });

  test("only the user who created a blog sees the delete button", async ({
    page,
    request,
  }) => {
    // === Reset the test DB and verify ===
    const resetRes = await request.post(
      "http://localhost:3001/api/testing/reset"
    );
    expect(resetRes.status()).toBe(204); // or 200 depending on your backend
    console.log("✅ Database reset successful");
    // Create User A
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "usera",
        name: "User A",
        password: "passworda",
      },
    });

    // Create User B
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "userb",
        name: "User B",
        password: "passwordb",
      },
    });

    // Login as User A
    await page.goto("http://localhost:5173");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByPlaceholder("username").fill("usera");
    await page.getByPlaceholder("password").fill("passworda");
    await page.getByRole("button", { name: "login" }).click();

    // Create a blog
    await page.getByText("new blog").click();
    await page.getByPlaceholder("Title").fill("User A Blog");
    await page.getByPlaceholder("Author").fill("Author A");
    await page.getByPlaceholder("URL").fill("http://userablog.com");
    await page.getByRole("button", { name: "create" }).click();

    // Log out
    await page.getByRole("button", { name: "logout" }).click();

    // Login as User B
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByPlaceholder("username").fill("userb");
    await page.getByPlaceholder("password").fill("passwordb");
    await page.getByRole("button", { name: "login" }).click();

    // Expand blog
    await page.getByText("view").click();

    // Ensure delete button is NOT visible
    await expect(page.getByRole("button", { name: "Delete" })).toHaveCount(0);
  });

  test("blogs are sorted by likes in descending order", async ({
    page,
    request,
  }) => {
    // Reset DB and create a user
    // === Reset the test DB and verify ===
    const resetRes = await request.post(
      "http://localhost:3001/api/testing/reset"
    );
    expect(resetRes.status()).toBe(204); // or 200 depending on your backend
    console.log("✅ Database reset successful");

    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "liker",
        name: "Liker User",
        password: "likerpass",
      },
    });

    // Login
    await page.goto("http://localhost:5173");
    await page.getByRole("button", { name: "Log in" }).click();

    // Fill in login credentials and submit
    await page.getByPlaceholder("Username").fill("liker");
    await page.getByPlaceholder("Password").fill("likerpass");
    await page.getByRole("button", { name: "login" }).click();

    // Wait for the page to load and ensure "Create New Blog" is visible
    await page.waitForSelector('button:has-text("Create New Blog")', {
      state: "visible",
      timeout: 60000,
    }); // Wait up to 60 seconds

    // Create Blog A (Less Liked Blog)
    await page.getByText("Create New Blog").click();
    await page.getByPlaceholder("title").fill("Less Liked Blog");
    await page.getByPlaceholder("author").fill("Author L");
    await page.getByPlaceholder("url").fill("http://less.com");
    await page.getByRole("button", { name: "Create" }).click();

    // Confirm new blog added
    await expect(page.getByText("Less Liked BlogAuthor L")).toBeVisible();

    // Navigate to the blog details view (ensure you open the blog first)
    await page.getByText("View").click();

    // Create Blog B (Most Liked Blog)
    await page.getByPlaceholder("title").fill("Most Liked Blog");
    await page.getByPlaceholder("author").fill("Author M");
    await page.getByPlaceholder("url").fill("http://most.com");
    await page.getByRole("button", { name: "Create" }).click();

    // Confirm new blog added
    await expect(page.getByText("Most Liked BlogAuthor M")).toBeVisible();

    // Navigate to the blog details view (ensure you open the blog first)
    await page.getByText("View").click();

    // Like "Most Liked Blog" twice
    const likeButtons = await page.getByRole("button", { name: "like" }).all();
    await likeButtons[1].click(); // First like on Blog B
    await likeButtons[1].click(); // Second like on Blog B

    // Reload the page to check if the blogs are sorted by likes
    await page.reload();

    // Wait for the blogs to load (important step)
    await page.waitForSelector(".blog", { state: "visible", timeout: 60000 });

    // Check the blog titles
    const blogTitles = await page
      .locator(".blog .blog-title")
      .allTextContents();

    // Debugging: Log blog titles to ensure they are being retrieved
    console.log("Blog Titles:", blogTitles);

    // Ensure blogs are sorted by likes in descending order
    expect(blogTitles[0]).toContain("Most Liked Blog"); // Blog with most likes should be first
    expect(blogTitles[1]).toContain("Less Liked Blog"); // Blog with less likes should be second
  });
});
