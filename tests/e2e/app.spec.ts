import { expect, test } from "@playwright/test";

const users = [{ id: "user-a", email: "a@example.com", password: "secret", createdAt: "2026-04-27T00:00:00.000Z" }, { id: "user-b", email: "b@example.com", password: "secret", createdAt: "2026-04-27T00:00:00.000Z" }];
const habits = [{ id: "habit-a", userId: "user-a", name: "Drink Water", description: "", frequency: "daily", createdAt: "2026-04-27T00:00:00.000Z", completions: [] }, { id: "habit-b", userId: "user-b", name: "Read Books", description: "", frequency: "daily", createdAt: "2026-04-27T00:00:00.000Z", completions: [] }];

test.describe("Habit Tracker app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.clear());
  });

  test("shows the splash screen and redirects unauthenticated users to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("splash-screen")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("redirects authenticated users from / to /dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test("prevents unauthenticated access to /dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("signs up a new user and lands on the dashboard", async ({ page }) => {
    await page.goto("/signup");
    await page.getByTestId("auth-signup-email").fill("new@example.com");
    await page.getByTestId("auth-signup-password").fill("secret");
    await page.getByTestId("auth-signup-confirm-password").fill("secret");
    await page.getByTestId("auth-signup-submit").click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("logs in an existing user and loads only that user's habits", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(({ users, habits }) => { localStorage.setItem("habit-tracker-users", JSON.stringify(users)); localStorage.setItem("habit-tracker-habits", JSON.stringify(habits)); }, { users, habits });
    await page.getByTestId("auth-login-email").fill("a@example.com");
    await page.getByTestId("auth-login-password").fill("secret");
    await page.getByTestId("auth-login-submit").click();
    await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
    await expect(page.getByTestId("habit-card-read-books")).toHaveCount(0);
  });

  test("creates a habit from the dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
    await page.goto("/dashboard");
    await page.getByTestId("create-habit-button").click();
    await page.getByTestId("habit-name-input").fill("Morning Walk");
    await page.getByTestId("habit-save-button").click();
    await expect(page.getByTestId("habit-card-morning-walk")).toBeVisible();
  });

  test("completes a habit for today and updates the streak", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(({ habits }) => { localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })); localStorage.setItem("habit-tracker-habits", JSON.stringify([habits[0]])); }, { habits });
    await page.goto("/dashboard");
    await page.getByTestId("habit-complete-drink-water").click();
    await expect(page.getByTestId("habit-streak-drink-water")).toContainText("1 day");
  });

  test("persists session and habits after page reload", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(({ habits }) => { localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })); localStorage.setItem("habit-tracker-habits", JSON.stringify([habits[0]])); }, { habits });
    await page.goto("/dashboard");
    await page.reload();
    await expect(page.getByTestId("habit-card-drink-water")).toBeVisible();
  });

  test("logs out and redirects to /login", async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.setItem("habit-tracker-session", JSON.stringify({ userId: "user-a", email: "a@example.com" })));
    await page.goto("/dashboard");
    await page.getByTestId("auth-logout-button").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test.skip("loads the cached app shell when offline after the app has been loaded once", async ({ page, context }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator("body")).toBeVisible();
  });
});
