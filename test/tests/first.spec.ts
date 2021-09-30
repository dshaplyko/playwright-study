// example.spec.ts
import {
  test, expect, FetchResponse, FetchRequest,
} from "@playwright/test";
import { BasePage } from "../po/pages/base.page";
let basePage: BasePage;

test.describe("My test suite", () => {
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });
  test("First test", async ({ page }) => {
    console.log(await basePage.leftPanel.getSectionTexts());
    const response: FetchResponse = await page._request.get("https://jsonplaceholder.typicode.com/posts", {
      timeout: 5000,
    });
    console.log(JSON.parse(await response.text()));
    expect(await basePage.header.getText()).toBe("Please load data");
  });
});
