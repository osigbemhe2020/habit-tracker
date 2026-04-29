# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> signs up a new user and lands on the dashboard
- Location: tests\e2e\app.spec.ts:30:7

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByTestId('auth-signup-email')

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | const users = [{ id: "user-a", email: "a@example.com", password: "secret", createdAt: "2026-04-27T00:00:00.000Z" }, { id: "user-b", email: "b@example.com", password: "secret", createdAt: "2026-04-27T00:00:00.000Z" }];
  4  | const habits = [{ id: "habit-a", userId: "user-a", name: "Drink Water", description: "", frequency: "daily", createdAt: "2026-04-27T00:00:00.000Z", completions: [] }, { id: "habit-b", userId: "user-b", name: "Read Books", description: "", frequency: "daily", createdAt: "2026-04-27T00:00:00.000Z", completions: [] }];
  5  | 
  6  | test.describe("Habit Tracker app", () => {
  7  |   test.beforeEach(async ({ page }) => {
  8  |     await page.goto("/login");
  9  |     await page.evaluate(() => localStorage.clear());
  10 |   });
  11 | 
  12 |   test("shows the splash screen and redirects unauthenticated users to /login", async ({ page }) => {
  13 |     await page.goto("/");
  14 |     await expect(page.getByTestId("splash-screen")).toBeVisible();
  15 |     await expect(page).toHaveURL(/\/login$/);
  16 |   });
  17 | 
  18 |   test("redirects authenticated users from / to /dashboard", async ({ page }) => {
  19 |     await page.goto("/login");
  20 |     await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
  21 |     await page.goto("/");
  22 |     await expect(page).toHaveURL(/\/dashboard$/);
  23 |   });
  24 | 
  25 |   test("prevents unauthenticated access to /dashboard", async ({ page }) => {
  26 |     await page.goto("/dashboard");
  27 |     await expect(page).toHaveURL(/\/login$/);
  28 |   });
  29 | 
  30 |   test("signs up a new user and lands on the dashboard", async ({ page }) => {
  31 |     await page.goto("/signup");
> 32 |     await page.getByTestId("auth-signup-email").fill("new@example.com");
     |                                                 ^ Error: locator.fill: Test ended.
  33 |     await page.getByTestId("auth-signup-password").fill("secret");
  34 |     await page.getByTestId("auth-signup-submit").click();
  35 |     await expect(page).toHaveURL(/\/dashboard$/);
  36 |     await expect(page.getByTestId("dashboard-page")).toBeVisible();
  37 |   });
  38 | 
  39 |   test("logs in an existing user and loads only that user's habits", async ({ page }) => {
  40 |     await page.goto("/login");
  41 |     await page.evaluate(({ users, habits }) => { localStorage.setItem("habit-tracker-users", JSON.stringify(users)); localStorage.setItem("habit-tracker-habits", JSON.stringify(habits)); }, { users, habits });
  42 |     await page.getByTestId("auth-login-email").fill("a@example.com");
  43 |     await page.getByTestId("auth-login-password").fill("secret");
  44 |     await page.getByTestId("auth-login-submit").click();
  45 |     await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  46 |     await expect(page.getByTestId("habit-card-read-books")).toHaveCount(0);
  47 |   });
  48 | 
  49 |   test("creates a habit from the dashboard", async ({ page }) => {
  50 |     await page.goto("/login");
  51 |     await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
  52 |     await page.goto("/dashboard");
  53 |     await page.getByTestId("create-habit-button").click();
  54 |     await page.getByTestId("habit-name-input").fill("Morning Walk");
  55 |     await page.getByTestId("habit-save-button").click();
  56 |     await expect(page.getByTestId("habit-card-morning-walk")).toBeVisible();
  57 |   });
  58 | 
  59 |   test("completes a habit for today and updates the streak", async ({ page }) => {
  60 |     await page.goto("/login");
  61 |     await page.evaluate(({ habits }) => { localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })); localStorage.setItem("habit-tracker-habits", JSON.stringify([habits[0]])); }, { habits });
  62 |     await page.goto("/dashboard");
  63 |     await page.getByTestId("habit-complete-drink-water").click();
  64 |     await expect(page.getByTestId("habit-streak-drink-water")).toContainText("1 day");
  65 |   });
  66 | 
  67 |   test("persists session and habits after page reload", async ({ page }) => {
  68 |     await page.goto("/login");
  69 |     await page.evaluate(({ habits }) => { localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })); localStorage.setItem("habit-tracker-habits", JSON.stringify([habits[0]])); }, { habits });
  70 |     await page.goto("/dashboard");
  71 |     await page.reload();
  72 |     await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  73 |   });
  74 | 
  75 |   test("logs out and redirects to /login", async ({ page }) => {
  76 |     await page.goto("/login");
  77 |     await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
  78 |     await page.goto("/dashboard");
  79 |     await page.getByTestId("auth-logout-button").click();
  80 |     await expect(page).toHaveURL(/\/login$/);
  81 |   });
  82 | 
  83 |   test("loads the cached app shell when offline after the app has been loaded once", async ({ page, context }) => {
  84 |     await page.goto("/");
  85 |     await page.waitForLoadState("networkidle");
  86 |     await context.setOffline(true);
  87 |     await page.reload();
  88 |     await expect(page.locator("body")).toBeVisible();
  89 |   });
  90 | });
  91 | 
```