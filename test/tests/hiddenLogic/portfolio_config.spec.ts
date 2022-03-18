import { test } from "../../po/pages";
import {
  PORTFOLIO_COLUMNS,
  WIDGETS,
  FEATURE_HIGHLIGHT,
  STATES,
  configOptionsMap,
  configWidgetsMap,
  tradingButtonsMap,
  featureHighlightMap,
} from "../../config";
import { expectElementVisibility, expectElementsState } from "../../utils";

test.describe("Hidden Logic of Portfolio Page @jira(PWU-47)", () => {
  test("should display Account Box @criticalPath @jira(BCTGWEBPWU-63)", async ({ api, portfolioPage }) => {
    await api.mockConfig({
      portfolio: {
        showAccountBox: true,
      },
    });
    await api.mockUser({
      roles: ["ROLE_WHITELABEL_ADMIN", "ROLE_USER"],
      isPtsEnabled: true,
    });
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.ACCOUNT_BOX).el, true);
  });

  test("should turn off Asset Circle @criticalPath @jira(BCTGWEBPWU-64)", async ({ api, portfolioPage }) => {
    await api.mockConfig({
      portfolio: {
        disableAssetCircle: true,
      },
    });
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.chart.el, false);
  });

  test("should hide brokerage column @criticalPath @jira(BCTGWEBPWU-65)", async ({ api, portfolioPage }) => {
    await api.mockConfig({
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
    });
    await portfolioPage.goto();
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BROKERAGE, false);
  });

  test("should hide Digital Address link from the header @criticalPath @jira(BCTGWEBPWU-1043)", async ({
    api,
    portfolioPage,
  }) => {
    await api.mockConfig({
      features: {
        contacts: false,
      },
    });
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.header.digitalAssetAddressLink, false);
  });

  test("should enable Buy And Sell columns @criticalPath @jira(BCTGWEBPWU-66)", async ({ api, portfolioPage }) => {
    await api.mockUser({
      isPtsEnabled: true,
    });
    await portfolioPage.goto();
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BUY, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.SELL, true);
  });

  // TODO: PWU-746
  test.skip("should display Upgrade Action on the portfolio page @criticalPath @jira(BCTGWEBPWU-62)", async ({
    api,
    portfolioPage,
  }) => {
    await api.mockConfig({
      portfolio: {
        showUpgradeAction: true,
      },
    });
    await api.mockUser({
      roles: ["ROLE_WHITELABEL_ADMIN", "ROLE_USER"],
      isPtsEnabled: true,
    });
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.UPGRADE_YOUR_ACCOUNT).el, true);
  });

  configOptionsMap.forEach((item) => {
    test(`${item.testName}`, async ({ api, portfolioPage }) => {
      await api.mockConfig(item.config);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.tradingButtons.paymentIn.el, item.paymentIn);
      await expectElementVisibility(portfolioPage.tradingButtons.paymentOut.el, item.paymentOut);
      await expectElementVisibility(portfolioPage.tradingButtons.transferFunds.el, item.transferFunds);
      await expectElementVisibility(portfolioPage.tradingButtons.exchange.el, item.exchange);
      await expectElementVisibility(portfolioPage.tradingButtons.IRFQ.el, item.IRFQ);
      await expectElementVisibility(portfolioPage.tradingButtons.cashOut.el, item.cashOut);
      await expectElementVisibility(portfolioPage.tradingButtons.leverage.el, item.leverage);
      await expectElementVisibility(portfolioPage.tradingButtons.buy.el, item.buy);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.EXCHANGE, item.exchange);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.LEVERAGE, item.leverage);
    });
  });

  configWidgetsMap.forEach((item) => {
    test(`${item.testName}`, async ({ api, portfolioPage }) => {
      await api.mockConfig(item.config);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).el, item.yourPortfolio);
      await expectElementVisibility(portfolioPage.getWidget(WIDGETS.DIGITAL_ASSETS).el, item.digitalAssets);
      await expectElementVisibility(portfolioPage.getWidget(WIDGETS.FIAT_CURRENCIES).el, item.fiatCurrencies);
      await expectElementVisibility(portfolioPage.chart.el, item.chart);
      await expectElementVisibility(portfolioPage.tradingButtons.el, item.tradingButtons);
      await expectElementVisibility(portfolioPage.holdingList.el, item.holdingList);
      await expectElementVisibility(
        portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.NEW_SITE_CONSOLE).el,
        item.yourConsole
      );
    });
  });

  tradingButtonsMap.forEach((item) => {
    test(`${item.testName} @jira(PWU-139)`, async ({ api, portfolioPage }) => {
      await api.mockConfig({});
      await api.mockUser(item.config);
      await portfolioPage.goto();
      await portfolioPage.holdingList.clickRow(1);
      await expectElementsState(portfolioPage.tradingButtons.paymentIn.el, STATES.DISABLED, item.paymentIn);
      await expectElementsState(portfolioPage.tradingButtons.paymentOut.el, STATES.DISABLED, item.paymentOut);
      await expectElementsState(portfolioPage.tradingButtons.exchange.el, STATES.DISABLED, item.exchange);
    });
  });

  test.describe("Feature highlight widgets @jira(PWU-108)", () => {
    featureHighlightMap.forEach(({ testName, config }) => {
      test(`${testName}`, async ({ api, portfolioPage }) => {
        await api.mockConfig({});
        await api.mockUser({
          roles: ["ROLE_USER"],
          isPtsEnabled: true,
        });
        await api.mockNextSteps(config);
        await portfolioPage.goto();
        await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT[config.items[0]]).el, true);
      });
    });
  });

  test.describe("Grid Component @jira(PWU-151)", () => {
    test.beforeEach(async ({ api }) => {
      await api.mockConfig({
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

    test("should display grid component when all trading options are OFF @criticalPath @jira(BCTGWEBPWU-61)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.chart.el, true);
      await expectElementVisibility(portfolioPage.tradingButtons.paymentIn.el, true);
      await expectElementVisibility(portfolioPage.tradingButtons.paymentOut.el, true);
      await expectElementVisibility(portfolioPage.tradingButtons.transferFunds.el, false);
      await expectElementVisibility(portfolioPage.tradingButtons.exchange.el, false);
      await expectElementVisibility(portfolioPage.tradingButtons.IRFQ.el, false);
      await expectElementVisibility(portfolioPage.cards, true);
    });

    test("should reflect info on Chart from the Grid @criticalPath @jira(BCTGWEBPWU-59)", async ({ portfolioPage }) => {
      await portfolioPage.goto();
      await portfolioPage.checkCardsAndChartConjuction();
    });
  });
});
