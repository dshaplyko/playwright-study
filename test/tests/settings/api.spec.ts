import { test } from "../../po/pages";
import { NON_EMPTY_API, SETTINGS_TABS, URLs } from "../../config";
import { expectElementVisibility, expectElementToHaveText, expectToHaveCount } from "../../utils";

test.describe("Settings Page -> Api tab @jira(PWU-332)", () => {
  test.afterEach(async ({ api }) => {
    await api.unroutAll();
  });

  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.deleteAllApiKeys();
  });

  test("should open Empty API Tab @smoke @jira(BCTGWEBPWU-997)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "API Keys");
    await expectElementToHaveText(
      settingsPage.activeTab.el,
      /You can view more information regarding our API by referring to this link./
    );
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });

  test("should open API Tab with keys @smoke @jira(BCTGWEBPWU-999) @jira(BCTGWEBPWU-1002)", async ({
    api,
    settingsPage,
  }) => {
    await api.mockData(NON_EMPTY_API, URLs.API);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await expectElementVisibility(settingsPage.activeTab.createButton, false);
    await settingsPage.verifyApiTabs();
  });

  test("should add/delete a key @criticalPath @jira(BCTGWEBPWU-1000) @jira(BCTGWEBPWU-1003)", async ({
    settingsPage,
  }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await settingsPage.activeTab.createButton.click();
    await expectToHaveCount(settingsPage.apiBlocks.el, 1);
    await expectElementVisibility(settingsPage.getApiBlock(0).el, true);

    await settingsPage.getApiBlock(0).deleteButton.click();
    await expectElementVisibility(settingsPage.getApiBlock(0).el, false);
    await expectElementVisibility(settingsPage.tooltip, true);
    await expectElementToHaveText(settingsPage.tooltip, "Key Deleted");
  });

  test("should reset secret @criticalPath @jira(BCTGWEBPWU-1004)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.API);
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.createButton.click();
    await settingsPage.getApiBlock(0).resetSecretButton.click();
    await expectElementVisibility(settingsPage.getApiBlock(0).secret, true);
  });
});
