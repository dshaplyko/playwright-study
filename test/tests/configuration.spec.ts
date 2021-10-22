import { test } from "@playwright/test";
import { App } from "../po/pages";
import {
  PortfolioColumns, configOptionsMap, configWidgetsMap,
} from "../config";
import { Api, expectElementVisibility } from "../utils";
import { EnumWidget } from "../config";
let app: App;
let api: Api;

test.describe("Configuration Test Suite @jira(PWU-47)", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await browser.newPage();

    api = new Api(context, page);
    app = new App(page);
    await app.loginPage.login();
  });

  test("> should properly render Portfolio page considering set of options ", async () => {
    await api.mockConfig({
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
    await api.mockUser({
      roles: ["ROLE_WHITELABEL_ADMIN", "ROLE_USER"],
      isPtsEnabled: true,
    });
    await app.portfolioPage.goto();

    await expectElementVisibility(app.portfolioPage.chart.el, false);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("your console").el, true);
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("account box").el, true);
    await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ, false);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BROKERAGE, false);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BUY, true);
    await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.SELL, true);
  });

  test("> should display Upgrade Action on the portfolio page", async () => {
    await api.mockConfig({
      portfolio: {
        showUpgradeAction: true,
      },
    });
    await app.portfolioPage.goto();
    await expectElementVisibility(app.portfolioPage.getFeatureHighlight("upgrade your account").el, true);
  });

  configOptionsMap.forEach(item => {
    test(`> ${item.testName}`, async () => {
      await api.mockConfig(item.config);
      await app.portfolioPage.goto();
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentIn, item.paymentIn);
      await expectElementVisibility(app.portfolioPage.tradingButtons.paymentOut, item.paymentOut);
      await expectElementVisibility(app.portfolioPage.tradingButtons.transferFunds, item.transferFunds);
      await expectElementVisibility(app.portfolioPage.tradingButtons.exchange, item.exchange);
      await expectElementVisibility(app.portfolioPage.tradingButtons.IRFQ, item.IRFQ);
      await expectElementVisibility(app.portfolioPage.tradingButtons.cashOut, item.cashOut);
      await expectElementVisibility(app.portfolioPage.tradingButtons.leverage, item.leverage);
      await expectElementVisibility(app.portfolioPage.tradingButtons.buy, item.buy);
      await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.EXCHANGE, item.exchange);
      await app.portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.LEVERAGE, item.leverage);
    });
  });

  configWidgetsMap.forEach(item => {
    test(`> ${item.testName}`, async () => {
      await api.mockConfig(item.config);
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
});
