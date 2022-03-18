import { TEST_USERS } from "../config";
import { test } from "../po/pages";
import { expectElementToHaveText, expectElementVisibility, useState, waitSeveralSec } from "../utils";

test.describe("Two Factor Modal @jira(PWU-70)", () => {
  test.beforeEach(async ({ api }) => {
    await api.showTwoFA(true);
  });

  test.afterEach(async ({ api }) => {
    await api.unroutAll();
  });
  test("should display 2FA modal @smoke @jira(BCTGWEBPWU-1007)", async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.el, true);
    await expectElementToHaveText(portfolioPage.twoFactorModal.heading, "ENABLE 2-FACTOR SECURITY");
    await expectElementVisibility(portfolioPage.twoFactorModal.enableTwoFAButton, true);
    await expectElementVisibility(portfolioPage.twoFactorModal.cancelButton, true);
  });

  test("should close 2FA modal @criticalPath @jira(BCTGWEBPWU-1008)", async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.el, true);

    await portfolioPage.twoFactorModal.cancelButton.click();
    await expectElementVisibility(portfolioPage.twoFactorModal.el, false);
  });

  test("should navigate to Settings Page after clicking 2FA button @criticalPath @jira(BCTGWEBPWU-1009)", async ({
    portfolioPage,
    settingsPage,
  }) => {
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.el, true);

    await portfolioPage.twoFactorModal.enableTwoFAButton.click();
    await settingsPage.expectUrlContains(/twoFactor/);
    await expectElementVisibility(portfolioPage.twoFactorModal.el, false);
  });

  test("should display on all pages @criticalPath @jira(BCTGWEBPWU-1010)", async ({
    activitiesPage,
    fundsPage,
    brokeragePage,
    settingsPage,
  }) => {
    await activitiesPage.goto();
    await expectElementVisibility(activitiesPage.twoFactorModal.el, true);

    await fundsPage.goto();
    await expectElementVisibility(fundsPage.twoFactorModal.el, true);

    await brokeragePage.goto();
    await expectElementVisibility(brokeragePage.twoFactorModal.el, true);

    await settingsPage.goto();
    await expectElementVisibility(settingsPage.twoFactorModal.el, true);
  });

  test("should turn OFF cancel button @criticalPath @jira(BCTGWEBPWU-1011)", async ({ api, portfolioPage }) => {
    await api.showTwoFA(true, false);
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.twoFactorModal.el, true);
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

  test("should open 2FA dialog @criticalPath @jira(BCTGWEBPWU-944)", async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.otpForm.el, true);
    await expectElementVisibility(loginPage.otpForm.alternativeMethod, true);
    await expectElementVisibility(loginPage.otpForm.confirmButton, true);
    await expectElementToHaveText(loginPage.otpForm.header, "Authenticate with OTP");
  });

  test("should display only OTP method @extended @jira(BCTGWEBPWU-946)", async ({ api, loginPage }) => {
    await api.mock2FAresponse(["OTP"]);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.otpForm.el, true);
    await expectElementVisibility(loginPage.otpForm.alternativeMethod, false);
    await expectElementVisibility(loginPage.otpForm.confirmButton, true);
  });

  test("should display only yubikey method @extended @jira(BCTGWEBPWU-947)", async ({ api, loginPage }) => {
    await api.mock2FAresponse(["YUBI"]);
    await loginPage.loginButton.click();
    await expectElementVisibility(loginPage.yubiForm.el, true);
    await expectElementToHaveText(loginPage.yubiForm.header, "Authenticate with YubiKey");
    await expectElementVisibility(loginPage.yubiForm.confirmButton, true);
  });

  test("should display error for improper OTP @extended @jira(BCTGWEBPWU-948)", async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await loginPage.otpForm.fillOTPnumber("111111");
    await expectElementVisibility(loginPage.twoFactorForm.errorMessage, true);
    await expectElementToHaveText(loginPage.twoFactorForm.errorMessage, "The OTP you entered is invalid");
  });

  test("should display error for improper Yubikey @extended @jira(BCTGWEBPWU-949)", async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await loginPage.otpForm.alternativeMethod.click();
    await expectElementVisibility(loginPage.yubiForm.el, true);

    await loginPage.yubiForm.codeInput.fill("1111111");
    await loginPage.yubiForm.confirmButton.click();
    await expectElementVisibility(loginPage.twoFactorForm.errorMessage, true);
    await expectElementToHaveText(loginPage.twoFactorForm.errorMessage, "The YubiKey you entered is invalid");
  });
});
