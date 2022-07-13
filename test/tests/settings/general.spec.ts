import { CURRENCIES, SETTINGS_TABS, WIDGETS } from "../../config";
import { test, Page, BrowserContext } from "@playwright/test";
import { Application, test as _test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Settings Page -> General Tab @jira(PWU-327)", () => {
  let context: BrowserContext;
  let page: Page;
  let app: Application;
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    app = new Application(page);
  });

  test.beforeEach(async () => {
    await app.settingsPage.goto();
    await app.settingsPage.clickTab(SETTINGS_TABS.GENERAL);
  });

  test.afterAll(async () => {
    await app.settingsPage.selectBaseCurrency(CURRENCIES.HKD);
    await page.close();
  });

  test("should open General Tab @smoke @jira(XRT-408)", async () => {
    await expectElementToHaveText(app.settingsPage.tabHeader, "General");
    await expectElementVisibility(app.settingsPage.activeTab.baseCurrencyDropdown.rootEl, true);
    await expectElementVisibility(app.settingsPage.activeTab.timezoneDropdown.rootEl, true);
    await expectElementVisibility(app.settingsPage.activeTab.versionNumber, true);
    await expectElementVisibility(app.settingsPage.activeTab.saveButton, true);
  });

  test("should change Base Currency on the General Tab @ciriticalPath @jira(XRT-409)", async () => {
    const randomCurrency = await app.settingsPage.activeTab.selectRandomCurrency();

    await app.settingsPage.activeTab.saveButton.click();
    await app.portfolioPage.goto();
    await expectElementToHaveText(app.portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).currency, randomCurrency);
  });
});

_test.describe("General Tab - Configuration", () => {
  _test("should hide Base Currency dropdown @extended @jira(XRT-529)", async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.GENERAL);
    await expectElementVisibility(settingsPage.activeTab.baseCurrencyDropdown.rootEl, true);

    await settingsPage.disableBaseCurrency(true);
    await settingsPage.goto();
    await settingsPage.clickTab(SETTINGS_TABS.GENERAL);
    await expectElementVisibility(settingsPage.activeTab.baseCurrencyDropdown.rootEl, false);
  });
});
