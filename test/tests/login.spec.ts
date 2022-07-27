import { test } from "../po/pages";
import {
  TEST_USERS,
  NON_VALID_CREDENTIALS_MESSAGE,
  USER_DATA,
  RESET_EMAIL_MESSAGE,
  SITE_NOT_AVAILABLE,
  INVALID_CAPTCHA,
} from "../config";
import { expectElementToHaveText, expectElementVisibility, waitSeveralSec, useState } from "../utils";

test.describe.parallel("Login", () => {
  useState("clean");
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.afterEach(async () => {
    await waitSeveralSec(3000);
  });

  test("login page should contain needed elements @smoke @jira(XRT-40)", async ({ loginPage }) => {
    await expectElementVisibility(loginPage.emailField, true);
    await expectElementVisibility(loginPage.passwordField, true);
    await expectElementVisibility(loginPage.loginButton, true);
  });

  test("should login with valid credentials @criticalPath @jira(XRT-41)", async ({ loginPage, portfolioPage }) => {
    await loginPage.emailField.type(TEST_USERS.MAIN.email);
    await loginPage.passwordField.type(TEST_USERS.MAIN.password);
    await loginPage.bypassCaptcha();
    await loginPage.loginButton.click();
    await portfolioPage.expectUrlContains(portfolioPage.url);
  });

  test("should be able to logout @smoke @jira(XRT-42)", async ({ loginPage, landingPage }) => {
    await loginPage.page.context().clearCookies();
    await loginPage.goto();
    await loginPage.login(TEST_USERS.MAIN);
    await loginPage.header.profileButton.click();
    await loginPage.profile.logoutButton.click();
    await landingPage.expectUrlContains(landingPage.url);
  });

  test("should not login with non-valid credentials @criticalPath @jira(XRT-43)", async ({ loginPage }) => {
    await loginPage.emailField.type(TEST_USERS.MAIN.email);
    await loginPage.passwordField.type("123455");
    await loginPage.bypassCaptcha();
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.errorMessage, true);
    await expectElementToHaveText(loginPage.errorMessage, NON_VALID_CREDENTIALS_MESSAGE);
  });

  test("should send email in case of forgotten email @criticalPath @jira(XRT-44)", async ({ loginPage }) => {
    await loginPage.forgotPasswordLink.click();
    await loginPage.expectUrlContains(/forgotPassword/);

    await loginPage.forgotEmailInput.fill(USER_DATA.email);
    await loginPage.resetPasswordButton.click();
    await expectElementVisibility(loginPage.notificationBody, true);
    await expectElementToHaveText(loginPage.notificationBody, RESET_EMAIL_MESSAGE);
  });

  test("should display error when login service is not available @criticalPath @jira(XRT-45)", async ({
    loginPage,
  }) => {
    await loginPage.emailField.type(TEST_USERS.MAIN.email);
    await loginPage.passwordField.type(TEST_USERS.MAIN.password);
    await loginPage.emulateLoginError(502);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.errorMessage, true);
    await expectElementToHaveText(loginPage.errorMessage, SITE_NOT_AVAILABLE);
  });

  test("should not login when Captcha box not checked @extended @jira(XRT-575)", async ({ loginPage }) => {
    await loginPage.emailField.type(TEST_USERS.MAIN.email);
    await loginPage.passwordField.type(TEST_USERS.MAIN.password);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.errorMessage, true);
    await expectElementToHaveText(loginPage.errorMessage, INVALID_CAPTCHA);
  });

  test("should redirect to the page from the /config @extended @jira(XRT-597)", async ({ loginPage }) => {
    await loginPage.api.mockInitialUrl("/funds");
    await loginPage.goto();
    await loginPage.login(TEST_USERS.MAIN, false);
    await loginPage.expectUrlContains("/funds");
  });

  test("should display 404 page when url is incorrect @extended @jira(XRT-598)", async ({ loginPage }) => {
    await loginPage.api.mockInitialUrl("/asdasdasd");
    await loginPage.goto();
    await loginPage.login(TEST_USERS.MAIN, false);
    await expectElementVisibility(loginPage.pageNotFound, true);
  });
});
