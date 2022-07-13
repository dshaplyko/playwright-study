import { test } from "../po/pages";
import { CONSOLE_ITEMS, SETTINGS_TABS } from "../config";
import { expectElementVisibility } from "../utils";

test.describe("Console Page - Features @jira(UCP-51)", () => {
  test.beforeEach(async ({ consolePage }) => {
    await consolePage.openTab(CONSOLE_ITEMS.FEATURES);
    await consolePage.getTab(CONSOLE_ITEMS.FEATURES).toggleAllOptions();
  });

  test("should open features tab @smoke @jira(XRT-470) @jira(XRT-469)", async ({ consolePage }) => {
    await consolePage.getTab(CONSOLE_ITEMS.FEATURES).checkCheckboxVisibility();
    await expectElementVisibility(consolePage.getTab(CONSOLE_ITEMS.FEATURES).saveButton, true);
  });

  test.describe("Toggling Features", () => {
    test.beforeEach(async ({ consolePage }) => {
      await consolePage.openTab(CONSOLE_ITEMS.FEATURES);
    });

    test("should toggle general features @criticalPath @jira(XRT-471)", async ({ consolePage, settingsPage }) => {
      await consolePage.getTab(CONSOLE_ITEMS.FEATURES).toggleFeatures("general", "uncheck");
      await consolePage.checkTooltip("Save successful!");

      await settingsPage.goto();
      await expectElementVisibility(settingsPage.getTab(SETTINGS_TABS.API), false);

      await settingsPage.header.profileButton.click();
      await expectElementVisibility(settingsPage.profile.announcementsLink, false);
      await expectElementVisibility(settingsPage.profile.marketInsightsLink, false);
      await expectElementVisibility(settingsPage.profile.inThePressLink, false);

      await consolePage.openTab(CONSOLE_ITEMS.FEATURES);
      await consolePage.getTab(CONSOLE_ITEMS.FEATURES).toggleFeatures("general", "check");
      await consolePage.checkTooltip("Save successful!");
      await settingsPage.goto();
      await expectElementVisibility(settingsPage.getTab(SETTINGS_TABS.API), true);

      await settingsPage.header.profileButton.click();
      await expectElementVisibility(settingsPage.profile.announcementsLink, true);
      await expectElementVisibility(settingsPage.profile.marketInsightsLink, true);
      await expectElementVisibility(settingsPage.profile.inThePressLink, true);
    });

    test("should toggle premium features @criticalPath @jira(XRT-472)", async ({ consolePage, landingPage }) => {
      await consolePage.getTab(CONSOLE_ITEMS.FEATURES).toggleFeatures("premium", "uncheck");
      await consolePage.checkTooltip("Save successful!");

      await landingPage.goto();
      await expectElementVisibility(landingPage.header.tradeLink, false);
      await expectElementVisibility(landingPage.priceTicker, false);
      await expectElementVisibility(landingPage.orderBook, false);

      await landingPage.header.profileButton.click();
      await expectElementVisibility(landingPage.profile.blockchainExplorerLink, false);

      await consolePage.openTab(CONSOLE_ITEMS.FEATURES);
      await consolePage.getTab(CONSOLE_ITEMS.FEATURES).toggleFeatures("premium", "check");
      await consolePage.checkTooltip("Save successful!");
      await landingPage.goto();
      await expectElementVisibility(landingPage.header.tradeLink, true);
      await expectElementVisibility(landingPage.priceTicker, true);
      await expectElementVisibility(landingPage.orderBook, true);

      await landingPage.header.profileButton.click();
      await expectElementVisibility(landingPage.profile.blockchainExplorerLink, true);
    });
  });
});
