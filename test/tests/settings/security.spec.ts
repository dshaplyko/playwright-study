import { test } from "../../po/pages";
import { SETTINGS_TABS, URLs, TWO_FA_SETTINGS, OTP_KEYS, WRONG_OTP, WRONG_YUBIKEY } from "../../config";
import { expectElementVisibility, expectElementToHaveText, expectElementToBeDisabled } from "../../utils";

test.describe("Settings Page -> Security tab @jira(PWU-330)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
  });

  test.afterEach(async ({ api }) => {
    await api.unroutAll();
  });

  test("should open Security Tab @smoke @jira(BCTGWEBPWU-370)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Two-Factor Security");
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).el, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).el, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton, true);
  });

  test("should turn off OTP method @criticalPath @jira(BCTGWEBPWU-983)", async ({ api, settingsPage }) => {
    await api.mockConfig({
      security: {
        otp: {
          enabled: false,
        },
      },
    });
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).el, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).el, true);
  });

  test("should turn off Yubikey method @criticalPath @jira(BCTGWEBPWU-984)", async ({ api, settingsPage }) => {
    await api.mockConfig({
      security: {
        yubikey: {
          enabled: false,
        },
      },
    });
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).el, true);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).el, false);
  });

  test("should open add OTP key modal @criticalPath @jira(BCTGWEBPWU-985)", async ({ settingsPage }) => {
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.el, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.heading, "Add New OTP");
    await expectElementVisibility(settingsPage.addTwoFactorModal.qrCode, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.codeInput, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonConfirm, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonCancel, true);
  });

  test("should open add Yubikey modal @criticalPath @jira(BCTGWEBPWU-986)", async ({ settingsPage }) => {
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.el, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.heading, "Add New YubiKey");
    await expectElementVisibility(settingsPage.addTwoFactorModal.codeInput, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonConfirm, true);
    await expectElementVisibility(settingsPage.addTwoFactorModal.buttonCancel, true);
  });

  test("should open page with OTP keys added @criticalPath @jira(BCTGWEBPWU-987)", async ({ api, settingsPage }) => {
    await api.mockData(OTP_KEYS, URLs.SECURITY);
    await settingsPage.goto();
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

  test("should be able to delete OTP key @criticalPath @jira(BCTGWEBPWU-988)", async ({ api, settingsPage }) => {
    await api.mockData(OTP_KEYS, URLs.SECURITY);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.el, true);
    await expectElementVisibility(settingsPage.confirmationModal.deleteButton, true);
    await expectElementVisibility(settingsPage.confirmationModal.buttonCancel, true);
  });

  test("should cancel deleting of OTP keys @extended @jira(BCTGWEBPWU-989)", async ({ api, settingsPage }) => {
    await api.mockData(OTP_KEYS, URLs.SECURITY);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.el, true);

    await settingsPage.confirmationModal.buttonCancel.click();
    await expectElementVisibility(settingsPage.confirmationModal.el, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).existingKeys, true);
  });

  test("should not delete OTP when 2FA is mandatory @criticalPath @jira(BCTGWEBPWU-990)", async ({
    api,
    settingsPage,
  }) => {
    await api.mockConfig({
      twoFactor: {
        mandatory: true,
      },
    });
    await api.mockData(OTP_KEYS, URLs.SECURITY);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).deleteExistingKey(1);
    await expectElementVisibility(settingsPage.confirmationModal.el, true);
    await expectElementVisibility(settingsPage.confirmationModal.el, true);
    await expectElementVisibility(settingsPage.confirmationModal.okButton, true);
    await expectElementToHaveText(settingsPage.confirmationModal.title, "Two-Factor Authentication is mandatory");

    await settingsPage.confirmationModal.okButton.click();
    await expectElementVisibility(settingsPage.confirmationModal.el, false);
    await expectElementVisibility(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).existingKeys, true);
  });

  test("should display a message when OTP is incorrect @criticalPath @jira(BCTGWEBPWU-991)", async ({
    settingsPage,
  }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton.click();
    await settingsPage.addTwoFactorModal.codeInput.fill("123456");
    await settingsPage.addTwoFactorModal.buttonConfirm.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.errorMessage, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.errorMessage, WRONG_OTP);
  });

  test("should display a message when Yubikey is incorrect @criticalPath @jira(BCTGWEBPWU-992)", async ({
    settingsPage,
  }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.YUBIKEY).addNewButton.click();
    await settingsPage.addTwoFactorModal.codeInput.fill("123234234245351312312312312312313");
    await settingsPage.addTwoFactorModal.buttonConfirm.click();
    await expectElementVisibility(settingsPage.addTwoFactorModal.errorMessage, true);
    await expectElementToHaveText(settingsPage.addTwoFactorModal.errorMessage, WRONG_YUBIKEY);
  });

  test("should block adding keys when already 2 added @criticalPath @jira(BCTGWEBPWU-995)", async ({
    api,
    settingsPage,
  }) => {
    await api.mockData(OTP_KEYS, URLs.SECURITY);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementToBeDisabled(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton);
  });

  test("should be able to add more than 2 keys @criticalPath @jira(BCTGWEBPWU-996)", async ({ api, settingsPage }) => {
    const newData = { ...OTP_KEYS };

    newData.data.allowAdd = true;
    await api.mockData(newData, URLs.SECURITY);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementToBeDisabled(settingsPage.getTwoFactorBlock(TWO_FA_SETTINGS.OTP).addNewButton, false);
  });
});
