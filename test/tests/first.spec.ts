// example.spec.ts
import { test, expect } from "@playwright/test";

test("my test", async ({ page }) => {
  await page.goto("");
  const name = await page.innerText(".navbar__title");
  expect(name).toBe("Playwright");
});
