import { CURRENCIES, CURRENCY_ADDED, DELETE_SUCCESS, EMPTY_TRANSFER_OUT, SETTINGS_TABS, URLs } from "../../config";
import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> Transfer Out Tab @jira(PWU-333)", () => {
  test.beforeEach(async ({ api, settingsPage }) => {
    await api.mockData(EMPTY_TRANSFER_OUT, URLs.SETTINGS);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.TRANSFER_OUT);
  });

  test.afterEach(async ({ api }) => {
    await api.unroutAll();
  });
  test("should open Empty Transfer Out tab @smoke @jira(BCTGWEBPWU-372)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Express Transfer Out");
    await expectElementToHaveText(settingsPage.activeTab.el, /Express Digital Asset Transfer Out/);
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });

  test("should add Digital Asset to Transfer Out @criticalPath @jira(BCTGWEBPWU-942)", async ({
    api,
    settingsPage,
  }) => {
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.currencyList.selectByText(CURRENCIES.USD);
    await settingsPage.activeTab.limitInput.fill("10");
    await api.mockData(CURRENCY_ADDED, URLs.SETTINGS);
    await settingsPage.activeTab.updateButton.click();
    await expectElementVisibility(settingsPage.tooltip, true);
    await expectElementToHaveText(settingsPage.tooltip, "Express Transfer Out Setting Preferences Saved");
  });

  test("should delete Digital Asset from Transfer Out @criticalPath @jira(BCTGWEBPWU-943)", async ({
    api,
    settingsPage,
  }) => {
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.currencyList.selectByText(CURRENCIES.USD);
    await settingsPage.activeTab.limitInput.fill("10");
    await api.mockData(CURRENCY_ADDED, URLs.SETTINGS);
    // await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.updateButton.click();
    await api.mockData(DELETE_SUCCESS, URLs.SETTINGS);
    await settingsPage.activeTab.deleteButton.click();
    await expectElementVisibility(settingsPage.tooltip, true);
    await expectElementToHaveText(settingsPage.tooltip, "Express Transfer Out Setting Preferences Deleted");
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });
});
