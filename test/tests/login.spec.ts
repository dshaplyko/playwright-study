import { test } from "@playwright/test";
import { App } from "../po/pages";
import { TEST_USER } from "../config/constants";
import { verifyPageUrlContains, expectElementVisibility } from "../utils";
let app: App;

test.describe("Login Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    app = new App(page);
    await app.loginPage.goto();
  });

  test("login page should contain needed elements @smoke", async () => {
    await expectElementVisibility(app.loginPage.emailField, true);
    await expectElementVisibility(app.loginPage.passwordField, true);
    await expectElementVisibility(app.loginPage.loginButton, true);
  });

  test("should login with valid credentials", async ({ page }) => {
    await app.loginPage.emailField.type(TEST_USER.email);
    await app.loginPage.passwordField.type(TEST_USER.password);
    await app.loginPage.loginButton.click();
    await verifyPageUrlContains(page, app.portfolioPage.url);
  });

  test("should be able to logout", async ({ page }) => {
    await app.loginPage.login();
    await app.loginPage.header.profile.click();
    await app.loginPage.profile.logout.click();
    await verifyPageUrlContains(page, app.loginPage.url);
  });
});
