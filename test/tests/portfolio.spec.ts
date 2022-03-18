import { test } from "../po/pages";
import {
  portfolioMap,
  PERCENTAGE,
  WIDGETS,
  FEATURE_HIGHLIGHT,
  STATES,
  PORTFOLIO_COLUMNS,
  clickTradingButtonsMap,
  CURRENCIES,
} from "../config";
import {
  expectElementVisibility,
  expectArraySortedDescending,
  expectElementToHaveText,
  expectElementEquality,
  expectElementsState,
} from "../utils";

test.describe("Portfolio - Trade SG Config @jira(PWU-22)", () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
  });

  test("should display main components @smoke @jira(BCTGWEBPWU-42) @jira(BCTGWEBPWU-43)", async ({ portfolioPage }) => {
    await expectElementVisibility(portfolioPage.holdingList.el, true);
    await expectElementVisibility(portfolioPage.chart.el, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.NEW_SITE_CONSOLE).el, true);
    await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.ACCOUNT_BOX).el, false);
    await expectElementVisibility(portfolioPage.tradingButtons.el, true);
    await expectElementVisibility(portfolioPage.tradingButtons.IRFQ.el, true);
  });

  portfolioMap.forEach(({ widget, name }) => {
    test(`should display ${name} widget @smoke @jira(BCTGWEBPWU-44)`, async ({ portfolioPage }) => {
      await expectElementVisibility(portfolioPage.getWidget(widget).el, true);
      await expectElementVisibility(portfolioPage.getWidget(widget).currency, true);
      await expectElementVisibility(portfolioPage.getWidget(widget).totalBalance, true);
      await expectElementToHaveText(portfolioPage.getWidget(widget).name, name);
    });
  });

  test("should calculate Total Balance through widgets @criticalPath @jira(BCTGWEBPWU-45)", async ({
    portfolioPage,
  }) => {
    const sumBalance: number = await portfolioPage.calculateTotalBalance();
    const totalBalance: number = await portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).getTotalBalance();
    expectElementEquality(Math.trunc(sumBalance), Math.trunc(totalBalance));
  });

  test("sum of Digital Assets and FIAT currencies should be 100% @criticalPath @jira(BCTGWEBPWU-46)", async ({
    portfolioPage,
  }) => {
    const digitalAssetsPercentage: number = await portfolioPage.getWidget(WIDGETS.DIGITAL_ASSETS).getPercentage();
    const fiatCurrenciesPercentage: number = await portfolioPage.getWidget(WIDGETS.FIAT_CURRENCIES).getPercentage();
    const sumPercentage: number = digitalAssetsPercentage + fiatCurrenciesPercentage;
    expectElementEquality(sumPercentage, PERCENTAGE);
  });

  test("should enable trading buttons after clicking on a Table row @criticalPath @jira(BCTGWEBPWU-47) @jira(BCTGWEBPWU-134)", async ({
    portfolioPage,
  }) => {
    await portfolioPage.tradingButtons.checkButtonsState(STATES.DISABLED);
    await portfolioPage.holdingList.clickCurrencyByText(CURRENCIES.EUR);
    await expectElementsState(portfolioPage.tradingButtons.paymentIn.el, STATES.DISABLED, false);
    await expectElementsState(portfolioPage.tradingButtons.paymentOut.el, STATES.DISABLED, false);
    await expectElementsState(portfolioPage.tradingButtons.exchange.el, STATES.DISABLED, false);
    await expectElementsState(portfolioPage.tradingButtons.transferFunds.el, STATES.DISABLED, false);
    await expectElementsState(portfolioPage.tradingButtons.IRFQ.el, STATES.DISABLED, false);
  });

  test.describe.parallel("Clicking links", () => {
    test("should redirect to Funds page after clicking quick tips link @smoke @jira(BCTGWEBPWU-48)", async ({
      portfolioPage,
    }) => {
      await expectElementVisibility(portfolioPage.quickTips, true);

      await portfolioPage.quickTipsLink.click();
      await portfolioPage.expectUrlContains("funds");
    });

    test("should lead to the console page after clicking Go To console button @criticalPath @jira(BCTGWEBPWU-49)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.NEW_SITE_CONSOLE).goToConsoleButton.click();
      await portfolioPage.expectUrlContains("console");
    });

    test("should lead to proper page after clicking second button from Your Console widget @criticalPath @jira(BCTGWEBPWU-50)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT.NEW_SITE_CONSOLE).secondButton.click();
      await portfolioPage.expectUrlContains(/funds/);
    });

    clickTradingButtonsMap.forEach(({ button, url }) => {
      test(`should redirect to ${url} page after clicking ${button} button @criticalPath @jira(BCTGWEBPWU-51)`, async ({
        portfolioPage,
      }) => {
        await portfolioPage.holdingList.clickCurrencyByText(CURRENCIES.EUR);
        await portfolioPage.tradingButtons[`${button}`].click();
        await portfolioPage.expectUrlContains(url);
      });
    });
  });

  test.describe("Holding list", () => {
    test("should contain needed list of columns @smoke @jira(BCTGWEBPWU-52)", async ({ portfolioPage }) => {
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.CURRENCY, true);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.DISRTIBUTION, true);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.TOTAL, true);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.PRIMARY, true);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.EXCHANGE, true);
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.BROKERAGE, true);
    });

    test("distribution column should be sorted in descending order @criticalPath @jira(BCTGWEBPWU-53)", async ({
      portfolioPage,
    }) => {
      const percentageNumbers: number[] = await portfolioPage.holdingList.getPercentages();
      expectArraySortedDescending(percentageNumbers);
    });

    test("should display QR Code for cryptocurrency @criticalPath @jira(BCTGWEBPWU-54)", async ({ portfolioPage }) => {
      await portfolioPage.holdingList.waitForVisible();
      await expectElementVisibility(portfolioPage.holdingList.qrCode, true);
    });

    test("should calculate Total Sum through different columns @criticalPath @jira(BCTGWEBPWU-55)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.holdingList.checkSumOfEachColumn();
    });

    test("should calculate Total Percentage through holding list @criticalPath @jira(BCTGWEBPWU-56)", async ({
      portfolioPage,
    }) => {
      const totalPercentage: number = await portfolioPage.holdingList.calculateTotalPercentage();
      expectElementEquality(totalPercentage, PERCENTAGE);
    });

    test("should calculate Total Balance through holding list @criticalPath @jira(BCTGWEBPWU-57)", async ({
      portfolioPage,
    }) => {
      const totalBalanceHoldingList: number = await portfolioPage.holdingList.calculateTotalBalance();
      const totalBalance: number = await portfolioPage.getWidget(WIDGETS.YOUR_PORTFOLIO).getTotalBalance();
      expectElementEquality(Math.trunc(totalBalanceHoldingList), Math.trunc(totalBalance));
    });

    test("should reflect info on Chart from the Trading panel @criticalPath @jira(BCTGWEBPWU-58)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.checkTradingAndChartConjuction();
    });
  });
});
