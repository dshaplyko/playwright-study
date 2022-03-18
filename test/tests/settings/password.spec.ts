import { CHANGE_PASSWORD, PASSWORD_STRENGTH, SETTINGS_TABS, URLs, WEAK_PASSWORD_MESSAGE } from "../../config";
import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> Password Tab @jira(PWU-329)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.PASSWORD);
  });

  test.afterEach(async ({ api }) => {
    await api.unroutAll();
  });

  test("should open Manage Password Tab @smoke @jira(BCTGWEBPWU-369)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Set Password");
    await expectElementVisibility(settingsPage.activeTab.currentPasswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.newPasswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.reenterPaswordInput, true);
    await expectElementVisibility(settingsPage.activeTab.saveButton, true);
  });

  test("should change password @criticalPath @jira(BCTGWEBPWU-971)", async ({ api, settingsPage }) => {
    await settingsPage.activeTab.currentPasswordInput.fill("T9hsy3434ssghsy(");
    await settingsPage.activeTab.newPasswordInput.fill("T8hsy3434ssghsy(");
    await settingsPage.activeTab.reenterPaswordInput.fill("T8hsy3434ssghsy(");
    await api.mockData(CHANGE_PASSWORD, URLs.PASSWORD);
    await settingsPage.activeTab.saveButton.click();
    await expectElementVisibility(settingsPage.tooltip, true);
    await expectElementToHaveText(settingsPage.tooltip, "Password Changed");
  });

  test("should display error message when password is not set @extended @jira(BCTGWEBPWU-374)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Please provide a password.");
  });

  test("should display error message when password is unsafe @extended @jira(BCTGWEBPWU-383)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("qwerty1");
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, WEAK_PASSWORD_MESSAGE);
  });

  test("should display error message when passwords do not match @extended @jira(BCTGWEBPWU-972)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("T8hsy3434ssghsy(");
    await settingsPage.activeTab.reenterPaswordInput.fill("T9hsy3434ssghsy(");
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Passwords do not match.");
  });

  test("should display message about password strength @extended @jira(BCTGWEBPWU-973)", async ({ settingsPage }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("T8");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.WEAK);

    await settingsPage.activeTab.newPasswordInput.fill("T8hsy");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.MEDIUM);

    await settingsPage.activeTab.newPasswordInput.fill("T8hsy3434");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.STRONG);

    await settingsPage.activeTab.newPasswordInput.fill("T8hsy3434ssghsy(");
    await expectElementVisibility(settingsPage.activeTab.formStrength, true);
    await expectElementToHaveText(settingsPage.activeTab.formStrength, PASSWORD_STRENGTH.VERY_STRONG);
  });

  test("should display an error when current password is improper @extended @jira(BCTGWEBPWU-975)", async ({
    settingsPage,
  }) => {
    await settingsPage.activeTab.saveButton.click();
    await settingsPage.activeTab.currentPasswordInput.fill("qwerty");
    await settingsPage.activeTab.newPasswordInput.fill("T8hsy3434ssghsy(");
    await settingsPage.activeTab.reenterPaswordInput.fill("T8hsy3434ssghsy(");
    await settingsPage.activeTab.saveButton.click();
    await expectElementVisibility(settingsPage.activeTab.errorMessage, true);
    await expectElementToHaveText(settingsPage.activeTab.errorMessage, "Your password is incorrect");
  });
});
