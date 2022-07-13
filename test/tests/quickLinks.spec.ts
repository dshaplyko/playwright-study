import { test } from "../po/pages";
import { quickLinksMap } from "../config";

test.describe.parallel("Quick Links @jira(PWU-22)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  quickLinksMap.forEach(({ link, pageTo }) => {
    test(`should redirect to ${pageTo} after clicking ${link} @criticalPath @jira(XRT-48)`, async ({
      portfolioPage,
    }) => {
      await portfolioPage.getQuickLink(link).click();
      await portfolioPage.expectUrlContains(pageTo);
    });
  });
});
