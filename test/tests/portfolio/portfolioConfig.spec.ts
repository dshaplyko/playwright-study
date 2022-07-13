import { test } from "../../po/pages";
import {
  PORTFOLIO_COLUMNS,
  WIDGETS,
  FEATURE_HIGHLIGHT,
  configOptionsMap,
  configWidgetsMap,
  tradingButtonsMap,
  CURRENCIES,
} from "../../config";
import { expectElementVisibility, expectElementToBeDisabled } from "../../utils";

test.describe("Hidden Logic of Portfolio Page @jira(PWU-47)", () => {
  test("should display Account Box @criticalPath @jira(XRT-77)", async ({ portfolioPage }) => {
    await portfolioPage.showAccountBox();
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.ACCOUNT_BOX).rootEl, true);
  });

  test("should hide brokerage column @criticalPath @jira(XRT-79)", async ({ portfolioPage }) => {
    await portfolioPage.hideBrokerageColumn();
    await portfolioPage.mockAdminUser();
    await portfolioPage.goto();
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BROKERAGE, false);
  });

  test("should hide Digital Address link from the header @criticalPath @jira(XRT-247)", async ({ portfolioPage }) => {
    await portfolioPage.enableDigitalAddress();
    await portfolioPage.header.profileButton.click();
    await expectElementVisibility(portfolioPage.profile.digitalAssetAddressLink, false);
  });

  test("should enable/disable Unsettled Sell/Buy columns @criticalPath @jira(XRT-80)", async ({ portfolioPage }) => {
    await portfolioPage.enableTrading(true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BUY, true);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.SELL, true);

    await portfolioPage.enableTrading(false);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BUY, false);
    await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.SELL, false);
  });

  test("should display Upgrade Action on the portfolio page @criticalPath @jira(XRT-76)", async ({ portfolioPage }) => {
    await portfolioPage.showUpgradeAction();
    await expectElementVisibility(
      portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.UPGRADE_YOUR_ACCOUNT).rootEl,
      true
    );
  });

  configOptionsMap.forEach((item) => {
    test(`should ${item.testName} @criticalPath`, async ({ portfolioPage }) => {
      await portfolioPage.api.mockConfig(item.config);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.tradingButtons.paymentIn.rootEl, item.paymentIn);
      await expectElementVisibility(portfolioPage.tradingButtons.paymentOut.rootEl, item.paymentOut);
      await expectElementVisibility(portfolioPage.tradingButtons.transferFunds.rootEl, item.transferFunds);
      await expectElementVisibility(portfolioPage.tradingButtons.exchange.rootEl, item.exchange);
      await expectElementVisibility(portfolioPage.tradingButtons.IRFQ.rootEl, item.IRFQ);
      await expectElementVisibility(portfolioPage.tradingButtons.cashOut.rootEl, item.cashOut);
      await expectElementVisibility(portfolioPage.tradingButtons.leverage.rootEl, item.leverage);
      await expectElementVisibility(portfolioPage.tradingButtons.buy.rootEl, item.buy);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.EXCHANGE, item.exchange);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.LEVERAGE, item.leverage);
    });
  });

  configWidgetsMap.forEach(
    ({ testName, config, yourPortfolio, digitalAssets, fiatCurrencies, tradingButtons, holdingList }) => {
      test(`should disable ${testName} @criticalPath`, async ({ portfolioPage }) => {
        await portfolioPage.api.mockConfig(config);
        await portfolioPage.goto();
        await expectElementVisibility(portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).rootEl, yourPortfolio);
        await expectElementVisibility(portfolioPage.getWidget(WIDGETS.DIGITAL_ASSETS).rootEl, digitalAssets);
        await expectElementVisibility(portfolioPage.getWidget(WIDGETS.FIAT_CURRENCIES).rootEl, fiatCurrencies);
        await expectElementVisibility(portfolioPage.tradingButtons.rootEl, tradingButtons);
        await expectElementVisibility(portfolioPage.holdingList.rootEl, holdingList);
      });
    }
  );

  tradingButtonsMap.forEach(({ testName, config, paymentIn, paymentOut, exchange }) => {
    test(`should disable ${testName} @criticalPath`, async ({ portfolioPage }) => {
      await portfolioPage.api.mockUser(config);
      await portfolioPage.goto();
      await portfolioPage.getGroupTable(0).clickCurrencyByText(CURRENCIES.USD);
      await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentIn.rootEl, paymentIn);
      await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentOut.rootEl, paymentOut);
      await expectElementToBeDisabled(portfolioPage.tradingButtons.exchange.rootEl, exchange);
    });
  });
});
