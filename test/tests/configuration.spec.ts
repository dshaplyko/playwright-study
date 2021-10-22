import { test } from "@playwright/test";
import { LoginPage } from "../po/pages/Login.page";
import { PortfolioPage } from "../po/pages/Portfolio.page";
import { PortfolioColumns, configOptionsMap } from "../config";
import { Api, expectElementVisibility } from "../utils";

let loginPage: LoginPage;
let portfolioPage: PortfolioPage;
let api: Api;

test.describe("Different domain configurations Test Suite @jira(PWU-47)", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await browser.newPage();

    api = new Api(context, page);
    loginPage = new LoginPage(page);
    portfolioPage = new PortfolioPage(page);
    await loginPage.login();
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
    await portfolioPage.goto();

    await expectElementVisibility(portfolioPage.chart.el, false);
    await expectElementVisibility(portfolioPage.getFeatureHighlight("your console").el, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight("account box").el, true);
    await expectElementVisibility(portfolioPage.tradingButtons.IRFQ, false);
    await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BROKERAGE, false);
    await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.BUY, true);
    await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.SELL, true);
  });

  test("> should display Upgrade Action on the portfolio page", async () => {
    await api.mockConfig({
      portfolio: {
        showUpgradeAction: true,
      },
    });
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.getFeatureHighlight("upgrade your account").el, true);
  });

  configOptionsMap.forEach(item => {
    test(`> ${item.testName}`, async () => {
      await api.mockConfig(item.config);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.tradingButtons.paymentIn, item.paymentIn);
      await expectElementVisibility(portfolioPage.tradingButtons.paymentOut, item.paymentOut);
      await expectElementVisibility(portfolioPage.tradingButtons.transferFunds, item.transferFunds);
      await expectElementVisibility(portfolioPage.tradingButtons.exchange, item.exchange);
      await expectElementVisibility(portfolioPage.tradingButtons.IRFQ, item.IRFQ);
      await expectElementVisibility(portfolioPage.tradingButtons.cashOut, item.cashOut);
      await expectElementVisibility(portfolioPage.tradingButtons.leverage, item.leverage);
      await expectElementVisibility(portfolioPage.tradingButtons.buy, item.buy);
      await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.EXCHANGE, item.exchange);
      await portfolioPage.holdingList.checkColumnVisibility(PortfolioColumns.LEVERAGE, item.leverage);
    });
  });
});
