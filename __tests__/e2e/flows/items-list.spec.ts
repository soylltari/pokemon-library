import { test, expect } from "@playwright/test";

test("cards should be visible", async ({ page }) => {
  await page.goto("/items");

  const cards = page.getByRole("link");

  await expect(cards.first()).toBeVisible();
  await expect(cards.nth(9)).toBeVisible();
});
