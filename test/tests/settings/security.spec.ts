import { test } from "../../po/pages";
import { SETTINGS_TABS, TWO_FA_SETTINGS, OTP_KEYS, WRONG_OTP, WRONG_YUBIKEY } from "../../config";
import { expectElementVisibility, expectElementToHaveText, expectElementToBeDisabled } from "../../utils";

test.describe.parallel("Settings Page -> Security tab @jira(PWU-330)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
  });

  test("should open Security Tab @smoke @jira(XRT-359)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Two-Factor Security");
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).rootEl, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).rootEl, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton, true);
  });

  test("should turn off OTP method @criticalPath @jira(XRT-330)", async ({ settingsPage }) => {
    await settingsPage.disableSecuritySetting(false, true);
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).rootEl, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).rootEl, true);
  });

  test("should turn off Yubikey method @criticalPath @jira(XRT-363)", async ({ settingsPage }) => {
    await settingsPage.disableSecuritySetting(true, false);
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).rootEl, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).rootEl, false);
  });

  test("should open add OTP key modal @criticalPath @jira(XRT-364)", async ({ settingsPage }) => {
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.rootEl, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.heading, "Add New OTP");
    await expectElementVisibility(settingsPage.addTwoFactorModal.qrCode, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.codeInput, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonConfirm, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonCancel, true);
  });

  test("should open add Yubikey modal @criticalPath @jira(XRT-365)", async ({ settingsPage }) => {
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.rootEl, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.heading, "Add New YubiKey");
    await expectElementVisibility(settingsPage.addTwoFactorModal.codeInput, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonConfirm, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonCancel, true);
  });

  test("should open page with OTP keys added @criticalPath @jira(XRT-366)", async ({ settingsPage }) => {
    await settingsPage.mockSecurityKeys();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementToHaveText(
      settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).getExistingKeyHeading(1),
      "Time-based One-time Password 1"
    );
    await expectElementToHaveText(
      settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).getExistingKeyHeading(2),
      "Time-based One-time Password 2"
    );
  });

  test("should be able to delete OTP key @criticalPath @jira(XRT-367)", async ({ settingsPage }) => {
    await settingsPage.mockSecurityKeys();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(settingsPage.confirmationModal.deleteButton, true);
    await expectElementVisibility(settingsPage.confirmationModal.buttonCancel, true);
  });

  test("should cancel deleting of OTP keys @extended @jira(XRT-368)", async ({ settingsPage }) => {
    await settingsPage.mockSecurityKeys();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, true);

    await settingsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).existingKeys, true);
  });

  test("should not delete OTP when 2FA is mandatory @criticalPath @jira(XRT-369)", async ({ settingsPage }) => {
    await settingsPage.mockMandatory2FA();
    await settingsPage.mockSecurityKeys();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, true);
    await expectElementVisibility(settingsPage.confirmationModal.okButton, true);
    await expectElementToHaveText(settingsPage.confirmationModal.title, "Two-Factor Authentication is mandatory");

    await settingsPage.confirmationModal.okButton.click();
    await expectElementVisibility(settingsPage.confirmationModal.rootEl, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).existingKeys, true);
  });

  test("should display a message when OTP is incorrect @criticalPath @jira(XRT-370)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton.click();
    await settingsPage.addTwoFactorModal.codeInput.fill("123456");
    await settingsPage.addTwoFactorModal.buttonConfirm.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.errorMessage, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.errorMessage, WRONG_OTP);
  });

  test("should display a message when Yubikey is incorrect @criticalPath @jira(XRT-360)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton.click();
    await settingsPage.addTwoFactorModal.codeInput.fill("123234234245351312312312312312313");
    await settingsPage.addTwoFactorModal.buttonConfirm.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.errorMessage, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.errorMessage, WRONG_YUBIKEY);
  });

  test("should block adding keys when already 2 added @criticalPath @jira(XRT-371)", async ({ settingsPage }) => {
    await settingsPage.mockSecurityKeys();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementToBeDisabled(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton);
  });

  test("should be able to add more than 2 keys @criticalPath @jira(XRT-372)", async ({ settingsPage }) => {
    const newData = { ...OTP_KEYS };

    newData.data.allowAdd = true;
    await settingsPage.mockSecurityKeys(newData);
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementToBeDisabled(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton, false);
  });

  test("should be able to add OTP key @smoke @jira(XRT-312)", async ({ settingsPage }) => {
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton.click();
    await settingsPage.addTwoFactorModal.codeInput.fill("123456");
    await settingsPage.mockAddingOTP();
    await expectElementVisibility(settingsPage.addTwoFactorModal.rootEl, false);
  });
});
