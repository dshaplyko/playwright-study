import { test } from "../../po/pages";
import {
  portfolioMap,
  PERCENTAGE,
  WIDGETS,
  FEATURE_HIGHLIGHT,
  ATTRIBUTES,
  CURRENCIES,
  FIAT_CURRENCIES,
  DIGITAL_CURRENCIES,
} from "../../config";
import {
  expectElementVisibility,
  expectElementEquality,
  expectElementToBeDisabled,
  expectArrayIncludes,
} from "../../utils";

test.describe("Portfolio - Trade SG Config @jira(PWU-22)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("should display main components @smoke @jira(XRT-53)", async ({ portfolioPage }) => {
    await expectElementVisibility(portfolioPage.holdingList.rootEl, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.YOUR_CONSOLE).rootEl, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.ACCOUNT_BOX).rootEl, false);
    await expectElementVisibility(portfolioPage.tradingButtons.rootEl, true);
    await expectElementVisibility(portfolioPage.tradingButtons.IRFQ.rootEl, true);
  });

  portfolioMap.forEach(({ widget, name }) => {
    test(`should display ${name} widget @smoke @jira(XRT-54)`, async ({ portfolioPage }) => {
      await expectElementVisibility(portfolioPage.getWidget(widget).rootEl, true);
      await expectElementVisibility(portfolioPage.getWidget(widget).currency, true);
      await expectElementVisibility(portfolioPage.getWidget(widget).totalBalance, true);
      await expectElementVisibility(portfolioPage.getWidget(widget).name, true);
    });
  });

  test("should calculate Total Balance through widgets @criticalPath @jira(XRT-55)", async ({ portfolioPage }) => {
    const sumBalance: number = await portfolioPage.calculateTotalBalance();
    const totalBalance: number = await portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).getWidgetValue("totalBalance");
    expectElementEquality(Math.trunc(sumBalance), Math.trunc(totalBalance));
  });

  test("sum of Digital Assets and FIAT currencies should be 100% @criticalPath @jira(XRT-56)", async ({
    portfolioPage,
  }) => {
    const digitalAssetsPercentage: number = await portfolioPage
      .getWidget(WIDGETS.DIGITAL_ASSETS)
      .getWidgetValue("percentage");
    const fiatCurrenciesPercentage: number = await portfolioPage
      .getWidget(WIDGETS.FIAT_CURRENCIES)
      .getWidgetValue("percentage");
    const sumPercentage: number = digitalAssetsPercentage + fiatCurrenciesPercentage;
    expectElementEquality(sumPercentage, PERCENTAGE);
  });

  test("should enable trading buttons after clicking on a Table row @smoke @jira(XRT-57) @jira(XRT-69)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.tradingButtons.checkButtonsState(ATTRIBUTES.DISABLED);
    await portfolioPage.getGroupTable(0).clickCurrencyByText(CURRENCIES.USD);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentIn.rootEl, false);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.paymentOut.rootEl, false);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.exchange.rootEl, false);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.transferFunds.rootEl, false);
    await expectElementToBeDisabled(portfolioPage.tradingButtons.IRFQ.rootEl, false);
  });

  test("should filter by currency @smoke @jira(XRT-73)", async ({ portfolioPage }) => {
    await portfolioPage.currencyFilter.clickByText("Fiat");
    expectArrayIncludes(FIAT_CURRENCIES, await portfolioPage.getGroupTable(0).getCurrencies());

    await portfolioPage.currencyFilter.clickByText("Digital Assets");
    expectArrayIncludes(DIGITAL_CURRENCIES, await portfolioPage.getGroupTable(0).getCurrencies());

    await portfolioPage.currencyFilter.clickByText("All Currencies");
    expectArrayIncludes(
      [...DIGITAL_CURRENCIES, ...FIAT_CURRENCIES],
      await portfolioPage.getGroupTable(0).getCurrencies()
    );
  });

  test("should turn off Account Groups in case of only one is available @criticalPath @jira(XRT-490) @jira(XRT-491) @jira(XRT-492) @jira(XRT-493)", async ({
    portfolioPage,
    fundsPage,
  }) => {
    await portfolioPage.mockAccountGroups();
    await portfolioPage.goto();
    await expectElementVisibility(portfolioPage.accountList.rootEl, false);

    await portfolioPage.header.profileButton.click();
    await expectElementVisibility(portfolioPage.profile.switchAccount, false);

    await fundsPage.goto();
    await expectElementVisibility(fundsPage.subAccountIndicator, false);
  });
});
