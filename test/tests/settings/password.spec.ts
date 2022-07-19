import { PASSWORD_STRENGTH, SETTINGS_TABS, WEAK_PASSWORD_MESSAGE } from "../../config";
import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText, expectElementToHaveValue } from "../../utils";

test.describe("Settings Page -> Password Tab @jira(PWU-329)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.PASSWORD);
  });

  test("should open Manage Password Tab @smoke @jira(XRT-390)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Set Password");
    await expectElementVisibility(settingsPage.activeTab.currentPasswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.newPasswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.reenterPaswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.saveButton, true);
  });

  test("should change password @criticalPath @jira(XRT-391)", async ({ settingsPage }) => {
    await settingsPage.activeTab.currentPasswordInput.fill("Pass@12345(");
    await settingsPage.activeTab.newPasswordInput.fill("Pass@12345(");
    await settingsPage.activeTab.reenterPaswordInput.fill("Pass@12345(");
    await settingsPage.mockPasswordChange();
    await settingsPage.checkTooltip("Password Changed");
    await expectElementToHaveValue(settingsPage.activeTab.currentPasswordInput, "");
    await expectElementToHaveValue(settingsPage.activeTab.newPasswordInput, "");
    await expectElementToHaveValue(settingsPage.activeTab.reenterPaswordInput, "");
  });

  test("should display error message when password is not set @extended @jira(XRT-393)", async ({ settingsPage }) => {
    await settingsPage.activeTab.saveButton.click();
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Please provide a password.");
  });

  test("should display error message when password is unsafe @extended @jira(XRT-394)", async ({ settingsPage }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("qwerty1");
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, WEAK_PASSWORD_MESSAGE);
  });

  test("should display error message when passwords do not match @extended @jira(XRT-395)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("Pass@12345(");
    await settingsPage.activeTab.reenterPaswordInput.fill("Pass@123456(");
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Passwords do not match.");
  });

  test("should display message about password strength @extended @jira(XRT-396)", async ({ settingsPage }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("T8");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.WEAK);

    await settingsPage.activeTab.newPasswordInput.fill("Pass@1234");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.MEDIUM);

    await settingsPage.activeTab.newPasswordInput.fill("Pass@12345");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.STRONG);

    await settingsPage.activeTab.newPasswordInput.fill("Pass@123456(");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.VERY_STRONG);
  });

  test("should display an error when current password is improper @extended @jira(XRT-397)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("Pass@12345(");
    await settingsPage.activeTab.reenterPaswordInput.fill("Pass@12345(");
    await settingsPage.activeTab.saveButton.click();
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Your password is incorrect");
  });
});
