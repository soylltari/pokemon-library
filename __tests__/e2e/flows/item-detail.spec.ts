import { test, expect } from "@playwright/test";

test("item detail should be visible", async ({ page }) => {
  await page.goto("/items");
  await page.getByRole("link", { name: "bulbasaur Bulbasaur" }).click();
  await expect(page).toHaveURL("/en/items/1");
  await expect(page.getByRole("img", { name: "bulbasaur" })).toBeVisible();
});
