import { CURRENCIES } from "../../config";
import { test } from "../../po/pages";
import { expectElementToBeDisabled } from "../../utils";

test.describe("Portfolio - Cards @jira(PWU-151) @jira(UCP-197)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await portfolioPage.cardsView.click();
    await portfolioPage.cardGroupHead.expandCollapseAll("expand");
  });

  test("should display cards @smoke @jira(XRT-75)", async ({ portfolioPage }) => {
    await portfolioPage.cardGroups.checkCardsVisibility();
  });

  test("should enable trading buttons after clicking on cards @criticalPath @jira(XRT-57)", async ({
    portfolioPage,
  }) => {
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentIn.rootEl, true);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentOut.rootEl, true);

    await portfolioPage.cardGroups.clickCardByCurrency(0, CURRENCIES.BTC);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentIn.rootEl, false);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentOut.rootEl, false);
  });
});
