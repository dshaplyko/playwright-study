import { test } from "../po/pages";
import {
  TEST_USERS,
  NON_VALID_CREDENTIALS_MESSAGE,
  USER_DATA,
  RESET_EMAIL_MESSAGE,
  URLs,
  SITE_NOT_AVAILABLE,
} from "../config";
import { expectElementToHaveText, expectElementVisibility, waitSeveralSec, useState } from "../utils";

test.describe.parallel("Login", () => {
  useState("clean");
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.afterEach(async ({ api }) => {
    await waitSeveralSec(3000);
    await api.unroutAll();
  });

  test("login page should contain needed elements @smoke @jira(BCTGWEBPWU-39)", async ({ loginPage }) => {
    await expectElementVisibility(loginPage.emailField, true);
    await expectElementVisibility(loginPage.passwordField, true);
    await expectElementVisibility(loginPage.loginButton, true);
  });

  test("should login with valid credentials @criticalPath @jira(BCTGWEBPWU-40)", async ({
    loginPage,
    portfolioPage,
  }) => {
    await loginPage.emailField.type(TEST_USERS.SPECIFIC.email);
    await loginPage.passwordField.type(TEST_USERS.SPECIFIC.password);
    await loginPage.loginButton.click();
    await portfolioPage.expectUrlContains(portfolioPage.url);
  });

  test("should be able to logout @criticalPath @jira(BCTGWEBPWU-41)", async ({ loginPage, landingPage }) => {
    await loginPage.page.context().clearCookies();
    await loginPage.goto();
    await loginPage.login();
    await loginPage.header.profileButton.click();
    await loginPage.profile.logoutButton.click();
    await landingPage.expectUrlContains(landingPage.url);
  });

  test("should not login with non-valid credentials @criticalPath @jira(BCTGWEBPWU-115)", async ({ loginPage }) => {
    await loginPage.emailField.type(TEST_USERS.SPECIFIC.email);
    await loginPage.passwordField.type("123455");
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.errorMessage, true);
    await expectElementToHaveText(loginPage.errorMessage, NON_VALID_CREDENTIALS_MESSAGE);
  });

  test("should send email in case of forgotten email @criticalPath @jira(BCTGWEBPWU-123)", async ({ loginPage }) => {
    await loginPage.forgotPasswordLink.click();
    await loginPage.expectUrlContains(/forgotPassword/);

    await loginPage.forgotEmailInput.fill(USER_DATA.email);
    await loginPage.resetPasswordButton.click();
    await expectElementVisibility(loginPage.notificationBody, true);
    await expectElementToHaveText(loginPage.notificationBody, new RegExp(RESET_EMAIL_MESSAGE));
  });

  test("should display error when login service is not available @criticalPath @jira(BCTGWEBPWU-1044)", async ({
    api,
    loginPage,
  }) => {
    await loginPage.emailField.type(TEST_USERS.SPECIFIC.email);
    await loginPage.passwordField.type(TEST_USERS.SPECIFIC.password);
    await api.emulateNetworkError({}, URLs.LOGIN, 502);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.errorMessage, true);
    await expectElementToHaveText(loginPage.errorMessage, SITE_NOT_AVAILABLE);
  });
});
