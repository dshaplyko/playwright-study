import { test } from "../po/pages";
import { NOTIFICATIONS_DATA, URLs, NOTIFICATIONS_PLACEHOLDER } from "../config";
import { expectElementVisibility, expectElementToHaveText, expectToHaveCount } from "../utils";

test.describe.parallel("Notifications @jira(PWU-93)", () => {
  test.beforeEach(async ({ api, portfolioPage }) => {
    await api.mockData(NOTIFICATIONS_DATA, URLs.DEPOSIT_NOTIFICATIONS);
    await portfolioPage.goto();
    await portfolioPage.header.notificationsButton.click();
  });

  test("should display items in Notifications Menu @smoke @jira(BCTGWEBPWU-767)", async ({ portfolioPage }) => {
    await expectToHaveCount(portfolioPage.notifications.removeIcons, 2);
  });

  test("should clean notifications list @criticalPath @jira(BCTGWEBPWU-771)", async ({ portfolioPage }) => {
    await portfolioPage.notifications.removeIcons.nth(0).click();
    await expectToHaveCount(portfolioPage.notifications.removeIcons, 1);

    await portfolioPage.notifications.removeIcons.nth(0).click();
    await expectElementVisibility(portfolioPage.notifications.placeholder, true);
    await expectElementToHaveText(portfolioPage.notifications.placeholder, NOTIFICATIONS_PLACEHOLDER);
  });

  test("should close notification menu @extended @jira(BCTGWEBPWU-772)", async ({ portfolioPage }) => {
    await expectElementVisibility(portfolioPage.notifications.el, true);

    await portfolioPage.pressEscape();
    await expectElementVisibility(portfolioPage.notifications.el, false);
  });
});
