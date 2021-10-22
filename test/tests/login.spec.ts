import { test } from "@playwright/test";
import { LoginPage } from "../po/pages/Login.page";
import { TEST_USER } from "../config/constants";
import { verifyPageUrlContains, expectElementVisibility } from "../utils";
let loginPage: LoginPage;

test.describe("Login Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("> login page should contain needed elements @smoke", async () => {
    await expectElementVisibility(loginPage.emailField, true);
    await expectElementVisibility(loginPage.passwordField, true);
    await expectElementVisibility(loginPage.loginButton, true);
  });

  test("> should login with valid credentials", async ({ page }) => {
    await loginPage.emailField.type(TEST_USER.email);
    await loginPage.passwordField.type(TEST_USER.password);
    await loginPage.loginButton.click();
    await verifyPageUrlContains(page, "portfolio");
  });

  test("> should be able to logout", async ({ page }) => {
    await loginPage.login();
    await loginPage.header.profile.click();
    await loginPage.profile.logout.click();
    await verifyPageUrlContains(page, "signin");
  });
});
