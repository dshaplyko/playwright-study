import { CURRENCIES, SETTINGS_TABS, WIDGETS } from "../../config";
import { test, Page, BrowserContext } from "@playwright/test";
import { Application } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";
import { Logger } from "../../logger/logger";
const logger = new Logger("Settings Test Suite");
let context: BrowserContext;
let page: Page;
let app: Application;

test.describe("Settings Page -> General Tab @jira(PWU-327)", () => {
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
    logger.info("After All Hook");
    await page.close();
  });

  test("should open General Tab @smoke @jira(BCTGWEBPWU-367)", async () => {
    await expectElementToHaveText(app.settingsPage.tabHeader, "General");
    await expectElementVisibility(app.settingsPage.activeTab.baseCurrencyDropdown.el, true);
    await expectElementVisibility(app.settingsPage.activeTab.timezoneDropdown.el, true);
    await expectElementVisibility(app.settingsPage.activeTab.versionNumber, true);
    await expectElementVisibility(app.settingsPage.activeTab.saveButton, true);
  });

  test("should change Base Currency on the General Tab @ciriticalPath @jira(BCTGWEBPWU-785)", async () => {
    const randomCurrency = await app.settingsPage.activeTab.baseCurrencyDropdown.chooseAndRememberRandomOption();
    logger.info(`Chosen currency is: ${randomCurrency}`);

    await app.settingsPage.activeTab.saveButton.click();
    await app.portfolioPage.goto();
    await expectElementToHaveText(app.portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).currency, randomCurrency);
  });
});
