import { CURRENCIES, SETTINGS_TABS } from "../../config";
import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> Transfer Out Tab @jira(PWU-333)", () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.mockTransferOutData();
    await settingsPage.clickTab(SETTINGS_TABS.TRANSFER_OUT);
  });

  test("should open Empty Transfer Out tab @smoke @jira(XRT-405)", async ({ settingsPage }) => {
    await expectElementToHaveText(settingsPage.tabHeader, "Express Transfer Out");
    await expectElementToHaveText(settingsPage.activeTab.rootEl, /Express Digital Asset Transfer Out/);
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });

  test("should add Digital Asset to Transfer Out @criticalPath @jira(XRT-406)", async ({ settingsPage }) => {
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.currencyList.clickByText(CURRENCIES.USD);
    await settingsPage.activeTab.limitInput.fill("10");
    await settingsPage.mockTransferOutCurrencyAdding();
    await settingsPage.checkTooltip("Express Transfer Out Setting Preferences Saved");
  });

  test("should delete Digital Asset from Transfer Out @criticalPath @jira(XRT-407)", async ({ settingsPage }) => {
    await settingsPage.activeTab.createButton.click();
    await settingsPage.activeTab.currencyList.clickByText(CURRENCIES.USD);
    await settingsPage.activeTab.limitInput.fill("10");
    await settingsPage.mockTransferOutCurrencyDeletion();
    await settingsPage.checkTooltip("Express Transfer Out Setting Preferences Deleted");
    await expectElementVisibility(settingsPage.activeTab.createButton, true);
  });
});
