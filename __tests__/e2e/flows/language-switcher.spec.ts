import { expect, test } from "@playwright/test";

test("language switcher should work", async ({ page }) => {
  await page.goto("/en/items/1");
  await expect(page.getByText("Abilities")).toBeVisible();
  await page.getByRole("button", { name: "Language Switcher" }).click();
  await page.getByRole("menuitemradio", { name: "Deutsch" }).click();
  await expect(page.getByText("Fähigkeiten")).toBeVisible();
});
