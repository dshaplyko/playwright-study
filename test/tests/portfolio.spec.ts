import {
  test, expect, Page,
} from "@playwright/test";
import { LoginPage } from "../po/pages/Login.page";
import { PortfolioPage } from "../po/pages/Portfolio.page";
import {
  portfolioMap, quickLinksMap, PERCENTAGE, EnumWidget, State, PortfolioColumns,
} from "../config";
import { verifyPageUrlContains, expectElementVisibility } from "../utils";
let page: Page;
let loginPage: LoginPage;
let portfolioPage: PortfolioPage;

test.describe("Portfolio Test Suite - Trade SG Config @jira(PWU-22)", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    portfolioPage = new PortfolioPage(page);
    await loginPage.login();
  });

  test("> should display main components @smoke", async () => {
    await expectElementVisibility(portfolioPage.quickTips, true);
    await expectElementVisibility(portfolioPage.holdingList.el, true);
    await expectElementVisibility(portfolioPage.chart.el, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight("your console").el, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight("account box").el, false);
    await expectElementVisibility(portfolioPage.tradingButtons.el, true);
    await expectElementVisibility(portfolioPage.tradingButtons.IRFQ, true);
    await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BROKERAGE, true);
  });

  portfolioMap.forEach(({ tname, widget, text }) => {
    test(`> should display ${tname} widget @smoke`, async () => {
      await expectElementVisibility(portfolioPage.getWidget(EnumWidget[widget]).el, true);
      await expectElementVisibility(portfolioPage.getWidget(EnumWidget[widget]).currency, true);
      await expectElementVisibility(portfolioPage.getWidget(EnumWidget[widget]).totalBalance, true);
      await expect(portfolioPage.getWidget(EnumWidget[widget]).name).toContainText(text);
    });
  });

  test("> should calculate Total Balance through widgets", async () => {
    const sumBalance: number = await portfolioPage.calculateTotalBalance();
    const totalBalance: number = await portfolioPage.getWidget(EnumWidget.YOUR_PORTFOLIO).getTotalBalance();
    expect(Math.trunc(sumBalance)).toBeLessThanOrEqual(Math.trunc(totalBalance));
  });

  test("> sum of Digital Assets and FIAT currencies should be 100%", async () => {
    const digitalAssetsPercentage: number = await portfolioPage.getWidget(EnumWidget.DIGITAL_ASSETS).getPercentage();
    const fiatCurrenciesPercentage: number = await portfolioPage.getWidget(EnumWidget.FIAT_CURRENCIES).getPercentage();
    const sumPercentage: number = digitalAssetsPercentage + fiatCurrenciesPercentage;
    expect(sumPercentage).toEqual(PERCENTAGE);
  });

  test("> should enable trading buttons after clicking on a Table row", async () => {
    await portfolioPage.tradingButtons.checkButtonsState(State.DISABLED);
    await portfolioPage.holdingList.clickRow(1);
    await portfolioPage.tradingButtons.checkButtonsState(State.ENABLED);
  });

  test.describe("> Clicking links", () => {
    test.beforeEach(async () => {
      await portfolioPage.goto();
    });

    test("> should redirect to Funds page after clicking quick tips link", async () => {
      await portfolioPage.quickTipsLink.click();
      await verifyPageUrlContains(page, "funds");
    });

    quickLinksMap.forEach(({ link, pageTo }) => {
      test(`> should redirect to ${pageTo} after clicking ${link} `, async () => {
        test.slow();
        await portfolioPage.getQuickLink(link).click();
        await verifyPageUrlContains(page, pageTo);
      });
    });
  });

  test.describe("> Holding list", () => {
    test.beforeAll(async () => {
      await portfolioPage.goto();
    });

    test("> should calculate Total Percentage through holding list", async () => {
      const totalPercantage: number = await portfolioPage.holdingList.calculateTotalPercentage();
      expect(totalPercantage).toEqual(PERCENTAGE);
    });

    test("> should calculate Total Balance through holding list", async () => {
      const totalBalanceHoldingList: number = await portfolioPage.holdingList.calculateTotalBalance();
      const totalBalance: number = await portfolioPage.getWidget(EnumWidget.YOUR_PORTFOLIO).getTotalBalance();
      expect(Math.trunc(totalBalanceHoldingList)).toBeLessThanOrEqual(Math.trunc(totalBalance));
    });

    test("> should reflect info on Chart in the Trading panel", async () => {
      const count: number = await portfolioPage.holdingList.getRowsCount();
      await portfolioPage.checkTradingAndChartConjuction(count);
    });
  });
});
