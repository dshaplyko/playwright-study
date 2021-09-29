// example.spec.ts
import { test, expect } from "@playwright/test";
import { BasePage } from "../po/pages/Base.page";
let basePage: BasePage;
test.describe("My test suite", () => {
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });
  test("First test", async () => {
    expect(await basePage.header.getText()).toBe("Please load data");
  });
});
