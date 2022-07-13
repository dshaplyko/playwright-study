import { test } from "../../po/pages";
import { SETTINGS_TABS } from "../../config";
import { expectElementVisibility, expectElementToHaveText, expectToHaveCount } from "../../utils";

test.describe("Settings Page -> Api tab @jira(PWU-332)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.deleteAllApiKeys();
  });

  test("should open Empty API Tab @smoke @jira(XRT-381)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "API Keys");
    await expectElementToHaveText(
      settingsPage.activeTab.rootEl,
      /You can view more information regarding our API by referring to this link./
    );
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });

  test("should open API Tab with keys @smoke @jira(XRT-383) @jira(XRT-386)", async ({ settingsPage }) => {
    await settingsPage.mockApiTab();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await expectElementVisibility(settingsPage.activeTab.createButton, false);
    await settingsPage.verifyApiTabs();
  });

  test("should add/delete a key @criticalPath @jira(XRT-384) @jira(XRT-387)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await settingsPage.activeTab.createButton.click();
    await expectToHaveCount(settingsPage.apiBlocks.rootEl, 1);
    await expectElementVisibility(settingsPage.getApiBlock(0).rootEl, true);

    await settingsPage.getApiBlock(0).deleteButton.click();
    await expectElementVisibility(settingsPage.getApiBlock(0).rootEl, false);
    await settingsPage.checkTooltip("Key Deleted");
  });

  test("should reset secret @criticalPath @jira(XRT-388)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.createButton.click();
    await settingsPage.getApiBlock(0).resetSecretButton.click();
    await expectElementVisibility(settingsPage.getApiBlock(0).secret, true);
  });
});

test.describe("API Tab - Configuration", () => {
  test("should hide API tab from the settings @extended @jira(XRT-524)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await expectElementVisibility(settingsPage.getTab(SETTINGS_TABS.API), true);

    await settingsPage.enableApiTab(false);
    await settingsPage.goto();
    await expectElementVisibility(settingsPage.getTab(SETTINGS_TABS.API), false);
  });
});
