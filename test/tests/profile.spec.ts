import { test } from "../po/pages";
import { profileLinkMap } from "../config";
import { expectElementVisibility, expectPageURLContains } from "../utils";

test.describe.parallel("Profile Component for Admin/Owner", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("clicking profile button should open Profile menu @smoke @jira(XRT-225) @jira(XRT-345)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.header.profileButton.click();
    await expectElementVisibility(portfolioPage.profile.rootEl, true);
    await expectElementVisibility(portfolioPage.profile.userEmail, true);
    await expectElementVisibility(portfolioPage.profile.digitalAssetAddressLink, true);
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

  test("should open Console in a new browser tab @criticalPath @jira(XRT-347)", async ({ portfolioPage }) => {
    await portfolioPage.header.profileButton.click();
    const newTab = await portfolioPage.getNewTab(portfolioPage.profile.consoleLink.click());
    await expectPageURLContains(newTab, /console/);
  });

  test("should switch Staging/Production Modes @criticalPath @jira(XRT-348) @jira(XRT-353)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.header.profileButton.click();
    await portfolioPage.profile.stagingModeLink.click();
    await expectElementVisibility(portfolioPage.stagingModeLabel, true);

    await portfolioPage.header.profileButton.click();
    await portfolioPage.profile.stagingModeLink.click();
    await expectElementVisibility(portfolioPage.stagingModeLabel, false);
  });
});
