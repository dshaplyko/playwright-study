import { test } from "../../po/pages";
import { SETTINGS_TABS, USER_VERIFICATION_STATE, USER_VERIFICATION_MESSAGES } from "../../config";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> Verify tab @jira(PWU-328)", () => {
  test("should open when Jurisdiction is not supported @smoke @jira(XRT-373)", async ({ settingsPage }) => {
    await settingsPage.mockVerifyTab({
      jurisdictionSupported: false,
    });
    await expectElementToHaveText(settingsPage.tabHeader, "Unsupported Jurisdiction");
    await expectElementToHaveText(
      settingsPage.activeTab.message,
      USER_VERIFICATION_MESSAGES.NOT_SUPPORTED_JURISDICTION
    );
  });

  test("should open when Jurisdiction is supported @criticalPath @jira(XRT-374)", async ({ settingsPage }) => {
    await settingsPage.mockVerifyTab({
      jurisdictionSupported: true,
    });
    await expectElementToHaveText(settingsPage.tabHeader, "Verify");
    await expectElementToHaveText(settingsPage.activeTab.message, USER_VERIFICATION_MESSAGES.VERIFIED);
  });

  test("should open when Pending Confirmation @criticalPath @jira(XRT-375)", async ({ settingsPage }) => {
    await settingsPage.mockVerifyTab({
      verificationState: USER_VERIFICATION_STATE.PENDING_VERIFICATION,
    });
    await expectElementToHaveText(settingsPage.tabHeader, "Pending Verification");
    await expectElementVisibility(settingsPage.activeTab.onboardingService, true);
  });

  test("should open when Verification is not successful @criticalPath @jira(XRT-376)", async ({ settingsPage }) => {
    await settingsPage.mockVerifyTab({
      verificationState: USER_VERIFICATION_STATE.REJECTED,
    });
    await expectElementToHaveText(settingsPage.tabHeader, "Unsuccessful Verification");
    await expectElementToHaveText(settingsPage.activeTab.message, USER_VERIFICATION_MESSAGES.REJECTED);
  });

  test.describe("Not Verified User", async () => {
    test.beforeEach(async ({ settingsPage }) => {
      await settingsPage.mockUnverifiedUser();
    });
    test("should open tab @criticalPath @jira(XRT-377)", async ({ settingsPage }) => {
      await settingsPage.goto();
      await settingsPage.clickTab(SETTINGS_TABS.VERIFY);
      await expectElementToHaveText(settingsPage.tabHeader, "Verify");
      await expectElementToHaveText(settingsPage.activeTab.message, USER_VERIFICATION_MESSAGES.UNVERIFIED);
      await expectElementVisibility(settingsPage.activeTab.verifyNowButton, true);

      await settingsPage.activeTab.verifyNowButton.click();
      await expectElementVisibility(settingsPage.activeTab.personalButton, true);
      await expectElementVisibility(settingsPage.activeTab.companyButton, true);

      await settingsPage.activeTab.personalButton.click();
      await expectElementVisibility(settingsPage.activeTab.onboardingService, true);
    });

    test("should open tab (personal only) @criticalPath @jira(XRT-378)", async ({ settingsPage }) => {
      await settingsPage.mockVerifyConfig(true, false);
      await settingsPage.clickTab(SETTINGS_TABS.VERIFY);
      await expectElementToHaveText(settingsPage.tabHeader, "Verify");
      await expectElementVisibility(settingsPage.activeTab.verifyNowButton, true);

      await settingsPage.activeTab.verifyNowButton.click();
      await expectElementVisibility(settingsPage.activeTab.onboardingService, true);
    });

    test("should open tab (company only) @criticalPath @jira(XRT-379)", async ({ settingsPage }) => {
      await settingsPage.mockVerifyConfig(false, true);
      await settingsPage.clickTab(SETTINGS_TABS.VERIFY);
      await expectElementToHaveText(settingsPage.tabHeader, "Verify");
      await expectElementVisibility(settingsPage.activeTab.verifyNowButton, true);

      await settingsPage.activeTab.verifyNowButton.click();
      await expectElementVisibility(settingsPage.activeTab.onboardingService, true);
    });
  });
});
