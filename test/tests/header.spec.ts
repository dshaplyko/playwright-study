import { test } from "../po/pages";
import { headerLinksMap } from "../config";
import { expectElementVisibility } from "../utils";

test.describe("Header Component", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("should display header with all necessary elements @smoke @jira(XRT-223)", async ({ portfolioPage }) => {
    await expectElementVisibility(portfolioPage.header.rootEl, true);
    await expectElementVisibility(portfolioPage.header.logo, true);
    await expectElementVisibility(portfolioPage.header.portfolioLink, true);
    await expectElementVisibility(portfolioPage.header.activitiesLink, true);
    await expectElementVisibility(portfolioPage.header.fundsLink, true);
    await expectElementVisibility(portfolioPage.header.tradeLink, true);
    await expectElementVisibility(portfolioPage.header.buySellLink, true);
    await expectElementVisibility(portfolioPage.header.notificationsButton, true);
    await expectElementVisibility(portfolioPage.header.profileButton, true);
  });

  headerLinksMap.forEach(({ testName, link }) => {
    test(`clicking on ${testName} link should lead to ${testName} page @criticalPath @jira(XRT-224)`, async ({
      portfolioPage,
    }) => {
      await portfolioPage.header[link].click();
      await portfolioPage.expectUrlContains(testName);
    });
  });

  test("clicking on logo should lead to Home Page @smoke @jira(XRT-227)", async ({ portfolioPage }) => {
    await portfolioPage.header.logo.click();
    await portfolioPage.expectUrlContains("/");
  });

  test("clicking notifications button should open Notifications menu @smoke @jira(XRT-226)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.header.notificationsButton.click();
    await expectElementVisibility(portfolioPage.notifications.rootEl, true);
  });

  test("should open iframe on the Exchange page @smoke @jira(PWU-536)", async ({ portfolioPage }) => {
    await portfolioPage.header.tradeLink.click();
    await expectElementVisibility(portfolioPage.iframe, true);
  });
});
