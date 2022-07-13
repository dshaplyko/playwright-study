import { test } from "../../po/pages";
import { FEATURE_HIGHLIGHT } from "../../config";
import { expectElementVisibility, expectPageURLContains } from "../../utils";

test.describe.parallel("Portfolio - Clicking links", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });
  test("should redirect to Funds page after clicking quick tips link @smoke @jira(XRT-58)", async ({
    portfolioPage,
  }) => {
    await expectElementVisibility(portfolioPage.quickTips, true);

    await portfolioPage.quickTipsLink.click();
    await portfolioPage.expectUrlContains("funds");
  });

  test("should lead to the console page after clicking Go To console button @criticalPath @jira(XRT-59)", async ({
    portfolioPage,
  }) => {
    const newTab = await portfolioPage.getNewTab(
      portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.YOUR_CONSOLE).goToConsoleButton.click()
    );
    await expectPageURLContains(newTab, /console/);
  });

  test("should lead to proper page after clicking second button from Your Console widget @criticalPath @jira(XRT-60)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.YOUR_CONSOLE).secondButton.click();
    await portfolioPage.expectUrlContains(/twoFactor/);
  });
});
