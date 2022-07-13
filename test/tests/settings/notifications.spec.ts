import { SETTINGS_TABS } from "../../config";
import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> Notifications Tab @jira(PWU-331)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.NOTIFICATIONS);
  });

  test("should open Notifications Tab @smoke @jira(XRT-399)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Alert Preferences");
    await settingsPage.activeTab.checkOptionsVisibility();
    await expectElementVisibility(settingsPage.activeTab.updateButton, true);
  });

  test("should save notification preferences @criticalPath @jira(XRT-398)", async ({ settingsPage }) => {
    await settingsPage.activeTab.updateButton.click();
    await settingsPage.checkTooltip("Preferences Saved");
  });
});
