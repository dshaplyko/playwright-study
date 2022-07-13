import { test } from "../po/pages";
import { NOTIFICATIONS_PLACEHOLDER } from "../config";
import { expectElementVisibility, expectElementToHaveText, expectToHaveCount } from "../utils";

test.describe.parallel("Notifications @jira(PWU-93)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.mockNotificationsData();
    await portfolioPage.header.notificationsButton.click();
  });

  test("should display items in Notifications Menu @smoke @jira(XRT-306)", async ({ portfolioPage }) => {
    await expectToHaveCount(portfolioPage.notifications.removeIcons, 2);
  });

  test("should clean notifications list @criticalPath @jira(XRT-309)", async ({ portfolioPage }) => {
    await portfolioPage.notifications.removeIcons.first().click();
    await expectToHaveCount(portfolioPage.notifications.removeIcons, 1);

    await portfolioPage.notifications.removeIcons.first().click();
    await expectElementVisibility(portfolioPage.notifications.placeholder, true);
    await expectElementToHaveText(portfolioPage.notifications.placeholder, NOTIFICATIONS_PLACEHOLDER);
  });

  test("should close notification menu @extended @jira(XRT-310)", async ({ portfolioPage }) => {
    await expectElementVisibility(portfolioPage.notifications.rootEl, true);

    await portfolioPage.pressEscape();
    await expectElementVisibility(portfolioPage.notifications.rootEl, false);
  });
});
