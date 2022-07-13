import { test } from "../../po/pages";
import { WIDGETS, PORTFOLIO_COLUMNS } from "../../config";
import { expectElementEquality } from "../../utils";

test.describe("Portfolio - Holding list", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });
  test("should contain needed list of columns @smoke @jira(XRT-62) @jira(XRT-70)", async ({ portfolioPage }) => {
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.CURRENCY, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.TOTAL, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.PRIMARY, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.EXCHANGE, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BROKERAGE, true);
    await portfolioPage.getGroupTable(0).checkImagesVisibility();
  });

  test("should calculate Total Sum through different columns @criticalPath @jira(XRT-64)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.getGroupTable(0).checkSumOfEachColumn();
  });

  test("should calculate Total Balance through holding list @criticalPath @jira(XRT-65)", async ({ portfolioPage }) => {
    const totalBalanceHoldingList: number = await portfolioPage.getTotalBalance();
    const totalBalance: number = await portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).getWidgetValue("totalBalance");
    expectElementEquality(Math.trunc(totalBalanceHoldingList), Math.trunc(totalBalance));
  });
});
