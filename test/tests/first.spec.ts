// example.spec.ts
import { test, expect, Page } from "@playwright/test";
import { Portfolio } from "../po/pages/Portfolio.page";
import { LoginPage } from "../po/pages/Login.page";
import { TEST_USER } from "../config/constants";
let page: Page;
let loginPage: LoginPage;
let portfolio: Portfolio;

test.describe("Login Test Suite", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    portfolio = new Portfolio(page);
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
  });

  test("> should login with valid credentials", async () => {
    console.log(await portfolio.header.portfolioLink.getText());
  });

  test("> should login with valid credentials-2", async () => {
    await expect(portfolio.totalBalance).toBeVisible();
  });
});
