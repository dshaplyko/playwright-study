import {
  test, expect, Page,
} from "@playwright/test";
import { App } from "../po/pages";
import {
  portfolioMap, quickLinksMap, PERCENTAGE, EnumWidget, State, PortfolioColumns,
} from "../config";
import { verifyPageUrlContains, expectElementVisibility } from "../utils";
let page: Page;
let app: App;

test.describe("Portfolio Test Suite - Trade SG Config @jira(PWU-22)", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    app = new App(page);
    await app.loginPage.login();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("should display main components @smoke", async () => {
    await expectElementVisibility(app.portfolioPage.quickTips, true);
    await expectElementVisibility(app.portfolioPage.holdingList.el, true);
    await expectElementVisibility(app.portfolioPage.chart.el, true);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("your console").el, true);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("account box").el, false);
    await expectElementVisibility(app.portfolioPage.tradingButtons.el, true);
    await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ.el, true);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BROKERAGE, true);
  });

  portfolioMap.forEach(({ tname, widget, text }) => {
    test(`should display ${tname} widget @smoke`, async () => {
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget[widget]).el, true);
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget[widget]).currency, true);
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget[widget]).totalBalance, true);
      await expect(app.portfolioPage.getWidget(EnumWidget[widget]).name).toContainText(text);
    });
  });

  test("should calculate Total Balance through widgets", async () => {
    const sumBalance: number = await app.portfolioPage.calculateTotalBalance();
    const totalBalance: number = await app.portfolioPage.getWidget(EnumWidget.YOUR_PORTFOLIO).getTotalBalance();
    expect(Math.trunc(sumBalance)).toBeLessThanOrEqual(Math.trunc(totalBalance));
  });

  test("sum of Digital Assets and FIAT currencies should be 100%", async () => {
    const digitalAssetsPercentage: number = await app.portfolioPage
      .getWidget(EnumWidget.DIGITAL_ASSETS)
      .getPercentage();
    const fiatCurrenciesPercentage: number = await app.portfolioPage
      .getWidget(EnumWidget.FIAT_CURRENCIES)
      .getPercentage();
    const sumPercentage: number = digitalAssetsPercentage + fiatCurrenciesPercentage;
    expect(sumPercentage).toEqual(PERCENTAGE);
  });

  test("should enable trading buttons after clicking on a Table row", async () => {
    await app.portfolioPage.tradingButtons.checkButtonsState(State.DISABLED);
    await app.portfolioPage.holdingList.clickRow(1);
    await app.portfolioPage.tradingButtons.paymentIn.toBeDisabled(false);
    await app.portfolioPage.tradingButtons.paymentOut.toBeDisabled(false);
    await app.portfolioPage.tradingButtons.exchange.toBeDisabled();
    await app.portfolioPage.tradingButtons.transferFunds.toBeDisabled(false);
    await app.portfolioPage.tradingButtons.IRFQ.toBeDisabled(false);
  });

  test.describe("Clicking links", () => {
    test.beforeEach(async () => {
      await app.portfolioPage.goto();
    });

    test("should redirect to Funds page after clicking quick tips link", async () => {
      await app.portfolioPage.quickTipsLink.click();
      await verifyPageUrlContains(page, "funds");
    });

    quickLinksMap.forEach(({ link, pageTo }) => {
      test(`should redirect to ${pageTo} after clicking ${link} `, async () => {
        test.slow();
        await app.portfolioPage.getQuickLink(link).click();
        await verifyPageUrlContains(page, pageTo);
      });
    });
  });

  test.describe("Holding list", () => {
    test.beforeAll(async () => {
      await app.portfolioPage.goto();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test("should calculate Total Percentage through holding list", async () => {
      const totalPercentage: number = await app.portfolioPage.holdingList.calculateTotalPercentage();
      expect(totalPercentage).toEqual(PERCENTAGE);
    });

    test("should calculate Total Balance through holding list", async () => {
      const totalBalanceHoldingList: number = await app.portfolioPage.holdingList.calculateTotalBalance();
      const totalBalance: number = await app.portfolioPage.getWidget(EnumWidget.YOUR_PORTFOLIO).getTotalBalance();
      expect(Math.trunc(totalBalanceHoldingList)).toBeLessThanOrEqual(Math.trunc(totalBalance));
    });

    test("should reflect info on Chart from the Trading panel", async () => {
      const count: number = await app.portfolioPage.holdingList.getRowsCount();
      await app.portfolioPage.checkTradingAndChartConjuction(count);
    });
  });
});
