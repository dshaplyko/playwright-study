import { test } from "../po/pages";
import { profileLinkMap } from "../config";
import { expectElementVisibility, expectPageURLContains } from "../utils";

test.describe.parallel("Profile Component for Admin/Owner", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("clicking profile button should open Profile menu @smoke @jira(BCTGWEBPWU-36) @jira(BCTGWEBPWU-344)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.header.profileButton.click();
    await expectElementVisibility(portfolioPage.profile.el, true);
    await expectElementVisibility(portfolioPage.profile.userEmail, true);
    await expectElementVisibility(portfolioPage.profile.blockchainExplorerLink, true);
    await expectElementVisibility(portfolioPage.profile.consoleLink, true);
    await expectElementVisibility(portfolioPage.profile.stagingModeLink, true);
    await expectElementVisibility(portfolioPage.profile.announcementsLink, true);
    await expectElementVisibility(portfolioPage.profile.inThePressLink, true);
    await expectElementVisibility(portfolioPage.profile.marketInsightsLink, true);
    await expectElementVisibility(portfolioPage.profile.reportsLink, true);
    await expectElementVisibility(portfolioPage.profile.settingsLink, true);
    await expectElementVisibility(portfolioPage.profile.languageSelector, true);
    await expectElementVisibility(portfolioPage.profile.logoutButton, true);
  });

  profileLinkMap.forEach(({ jiraId, link, page }) => {
    test(`should redirect to ${page} page after clicking ${link} from the Profile menu @criticalPath ${jiraId}`, async ({
      portfolioPage,
    }) => {
      await portfolioPage.header.profileButton.click();
      await portfolioPage.profile[link].click();
      await portfolioPage.expectUrlContains(page);
    });
  });

  // TODO: Playwright defect https://github.com/microsoft/playwright/issues/11087
  test.skip("should open Blockchain Explorer in a new browser tab @criticalPath @jira(BCTGWEBPWU-350)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.header.profileButton.click();
    const newTab = await portfolioPage.getNewTab(portfolioPage.profile.blockchainExplorerLink.click());
    await expectPageURLContains(newTab, /anxexplorer.com/);
  });

  test("should open Console in a new browser tab @criticalPath @jira(BCTGWEBPWU-347)", async ({ portfolioPage }) => {
    await portfolioPage.header.profileButton.click();
    const newTab = await portfolioPage.getNewTab(portfolioPage.profile.consoleLink.click());
    await expectPageURLContains(newTab, /console/);
  });
});
