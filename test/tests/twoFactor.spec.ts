import { TEST_USERS } from "../config";
import { test } from "../po/pages";
import { expectElementToHaveText, expectElementVisibility, useState, waitSeveralSec } from "../utils";

test.describe("Two Factor Modal @jira(PWU-70)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.showTwoFA(true);
  });

  test("should display 2FA modal @smoke @jira(XRT-320)", async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, true);
    await expectElementToHaveText(portfolioPage.twoFactorModal.heading, "ENABLE 2-FACTOR SECURITY");
    await expectElementVisibility(portfolioPage.twoFactorModal.enableTwoFAButton, true);
    await expectElementVisibility(portfolioPage.twoFactorModal.cancelButton, true);
  });

  test("should close 2FA modal @criticalPath @jira(XRT-321)", async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, true);

    await portfolioPage.twoFactorModal.cancelButton.click();
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, false);
  });

  test("should navigate to Settings Page after clicking 2FA button @criticalPath @jira(XRT-322)", async ({
    portfolioPage,
    settingsPage,
  }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, true);

    await portfolioPage.twoFactorModal.enableTwoFAButton.click();
    await settingsPage.expectUrlContains(/twoFactor/);
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, false);
  });

  test("should display on all pages @criticalPath @jira(XRT-323)", async ({
    activitiesPage,
    fundsPage,
    brokeragePage,
    settingsPage,
  }) => {
    await activitiesPage.goto();
    await expectElementVisibility(activitiesPage.twoFactorModal.rootEl, true);

    await fundsPage.goto();
    await expectElementVisibility(fundsPage.twoFactorModal.rootEl, true);

    await brokeragePage.goto();
    await expectElementVisibility(brokeragePage.twoFactorModal.rootEl, true);

    await settingsPage.goto();
    await expectElementVisibility(settingsPage.twoFactorModal.rootEl, true);
  });

  test("should turn OFF cancel button @criticalPath @jira(XRT-324)", async ({ portfolioPage }) => {
    await portfolioPage.showTwoFA(true, false);
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.rootEl, true);
    await expectElementVisibility(portfolioPage.twoFactorModal.cancelButton, false);
  });
});

test.describe("Two Factor authentication", async () => {
  useState("clean");
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.emailField.type(TEST_USERS.TWO_FA.email);
    await loginPage.passwordField.type(TEST_USERS.TWO_FA.password);
  });

  test.afterEach(async () => {
    await waitSeveralSec(3000);
  });

  test("should open 2FA dialog @criticalPath @jira(XRT-315)", async ({ loginPage }) => {
    await loginPage.bypassCaptcha();
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.otpForm.rootEl, true);
    await expectElementVisibility(loginPage.otpForm.confirmButton, true);
    await expectElementToHaveText(loginPage.otpForm.header, "Authenticate with OTP");
  });

  test("should display only yubikey method @extended @jira(XRT-317)", async ({ loginPage }) => {
    await loginPage.mock2FAresponse(["YUBI"]);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.yubiForm.rootEl, true);
    await expectElementToHaveText(loginPage.yubiForm.header, "Authenticate with YubiKey");
    await expectElementVisibility(loginPage.yubiForm.confirmButton, true);
  });

  test("should display error for improper OTP @extended @jira(XRT-318)", async ({ loginPage }) => {
    await loginPage.bypassCaptcha();
    await loginPage.loginButton.click();
    await loginPage.otpForm.fillOTPnumber("111111");
    await expectElementVisibility(loginPage.twoFactorForm.errorMessage, true);
    await expectElementToHaveText(loginPage.twoFactorForm.errorMessage, "The OTP you entered is invalid");
  });
});
