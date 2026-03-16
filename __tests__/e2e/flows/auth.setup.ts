import { test as setup, expect } from "@playwright/test";

const authFile = "__tests__/e2e/playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("tab", { name: "Register" }).click();

  await page.getByRole("textbox", { name: "Name" }).fill("mama");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("mama@gmail.com");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("mama");
  await page.getByRole("textbox", { name: "Confirm Password" }).fill("mama");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(
    page.getByRole("heading", { name: "Pokemon Library" }),
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
