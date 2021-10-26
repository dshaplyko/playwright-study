import { test, Page } from "@playwright/test";
import { App } from "../po/pages";
import {
  PortfolioColumns, configOptionsMap, configWidgetsMap,
} from "../config";
import { expectElementVisibility } from "../utils";
import { EnumWidget } from "../config";
let page: Page;
let app: App;

test.describe("Configuration Test Suite @jira(PWU-47)", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    app = new App(page);
    await app.loginPage.login();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("should properly render Portfolio page considering set of options ", async () => {
    await app.api.mockConfig({
      portfolio: {
        disableAssetCircle: true,
        showAccountBox: true,
      },
      features: {
        otcTrade: {
          enabled: false,
        },
        simpleTrade: {
          enabled: false,
        },
      },
    });
    await app.api.mockUser({
      roles: ["ROLE_WHITELABEL_ADMIN", "ROLE_USER"],
      isPtsEnabled: true,
    });
    await app.portfolioPage.goto();

    await expectElementVisibility(app.portfolioPage.chart.el, false);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("your console").el, true);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("account box").el, true);
    await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ.el, false);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BROKERAGE, false);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BUY, true);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.SELL, true);
  });

  test("should display Upgrade Action on the portfolio page", async () => {
    await app.api.mockConfig({
      portfolio: {
        showUpgradeAction: true,
      },
    });
    await app.portfolioPage.goto();
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("upgrade your account").el, true);
  });

  configOptionsMap.forEach(item => {
    test(`${item.testName}`, async () => {
      await app.api.mockConfig(item.config);
      await app.portfolioPage.goto();
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentIn.el, item.paymentIn);
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentOut.el, item.paymentOut);
      await expectElementVisibility(app.portfolioPage.tradingButtons.transferFunds.el, item.transferFunds);
      await expectElementVisibility(app.portfolioPage.tradingButtons.exchange.el, item.exchange);
      await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ.el, item.IRFQ);
      await expectElementVisibility(app.portfolioPage.tradingButtons.cashOut.el, item.cashOut);
      await expectElementVisibility(app.portfolioPage.tradingButtons.leverage.el, item.leverage);
      await expectElementVisibility(app.portfolioPage.tradingButtons.buy.el, item.buy);
      await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.EXCHANGE, item.exchange);
      await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.LEVERAGE, item.leverage);
    });
  });

  configWidgetsMap.forEach(item => {
    test(`${item.testName}`, async () => {
      await app.api.mockConfig(item.config);
      await app.portfolioPage.goto();
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget.YOUR_PORTFOLIO).el, item.yourPortfolio);
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget.DIGITAL_ASSETS).el, item.digitalAssets);
      await expectElementVisibility(app.portfolioPage.getWidget(EnumWidget.FIAT_CURRENCIES).el, item.fiatCurrencies);
      await expectElementVisibility(app.portfolioPage.chart.el, item.chart);
      await expectElementVisibility(app.portfolioPage.tradingButtons.el, item.tradingButtons);
      await expectElementVisibility(app.portfolioPage.holdingList.el, item.holdingList);
      await expectElementVisibility(app.portfolioPage.getFeatureHighlight("your console").el, item.yourConsole);
    });
  });

  test.describe("Grid Component @jira(PWU-151)", () => {
    test.beforeAll(async () => {
      await app.api.mockConfig({
        features: {
          trade: {
            enabled: false,
          },
          otcTrade: {
            enabled: false,
          },
          simpleTrade: {
            enabled: false,
          },
        },
      });
    });
    test("should display grip component when all trading options are OFF", async () => {
      await app.portfolioPage.goto();
      await expectElementVisibility(app.portfolioPage.chart.el, true);
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentIn.el, true);
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentOut.el, true);
      await expectElementVisibility(app.portfolioPage.tradingButtons.transferFunds.el, false);
      await expectElementVisibility(app.portfolioPage.tradingButtons.exchange.el, false);
      await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ.el, false);
      await expectElementVisibility(app.portfolioPage.cards, true);
    });

    test("should reflect info on Chart from the Grid", async () => {
      await app.portfolioPage.goto();
      const cardsNumber: number = await app.portfolioPage.getCardsCount();
      await app.portfolioPage.checkCardsAndChartConjuction(cardsNumber);
    });
  });
});
