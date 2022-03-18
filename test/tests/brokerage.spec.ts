import { test } from "../po/pages";
import { CURRENCIES, URLs, SUCCESS_QUOTE, SAVE_TRADE } from "../config";
import { expectElementVisibility, expectElementToHaveText, expectElementEquality, expectArrayIncludes } from "../utils";

test.describe.parallel("Brokerage Page @jira(PWU-71)", () => {
  test.beforeEach(async ({ brokeragePage }) => {
    await brokeragePage.goto();
  });

  test("should open Brokerage Page @smoke @jira(BCTGWEBPWU-221)", async ({ brokeragePage }) => {
    await expectElementVisibility(brokeragePage.pageHeader, true);
    await expectElementToHaveText(brokeragePage.pageHeader, "Brokerage");
    await expectElementVisibility(brokeragePage.instructions.el, true);
    await expectElementVisibility(brokeragePage.holdingList.el, true);
    await expectElementVisibility(brokeragePage.buyBTCButton, true);
    await expectElementVisibility(brokeragePage.sellBTCButton, true);
    await expectElementVisibility(brokeragePage.digitalAssetsList.el, true);
    await expectElementVisibility(brokeragePage.tradePairList.el, true);
    await expectElementVisibility(brokeragePage.tradeAmount, true);
    await expectElementVisibility(brokeragePage.tradeCurrencyList.el, true);
    await expectElementVisibility(brokeragePage.quotePriceButton, true);

    await brokeragePage.digitalAssetsList.click();
    expectArrayIncludes(await brokeragePage.digitalAssetsList.getOptionsText(), [CURRENCIES.IRFQ]);
  });

  test("should expand/collapse Instructions widget @criticalPath @jira(BCTGWEBPWU-223)", async ({ brokeragePage }) => {
    expectElementEquality(await brokeragePage.instructions.isExpanded(), true);

    await brokeragePage.instructions.expandCollapseButton.click();
    expectElementEquality(await brokeragePage.instructions.isExpanded(), false);
  });

  test("should change names of Buy/Sell buttons @extended @jira(BCTGWEBPWU-225)", async ({ brokeragePage }) => {
    const chosenCurrency = CURRENCIES.BAT;
    await brokeragePage.digitalAssetsList.selectByText(chosenCurrency);
    await expectElementToHaveText(brokeragePage.sellBTCButton, new RegExp(chosenCurrency));
    await expectElementToHaveText(brokeragePage.buyBTCButton, new RegExp(chosenCurrency));
  });

  test("should transfer BTC to USDT @criticalPath @jira(BCTGWEBPWU-230)", async ({ brokeragePage, api }) => {
    await brokeragePage.digitalAssetsList.selectByText(CURRENCIES.BTC);
    await brokeragePage.sellBTCButton.click();
    await brokeragePage.tradePairList.selectByText(CURRENCIES.USDT);
    await brokeragePage.tradeAmount.fill("0.1");
    await api.mockData(SUCCESS_QUOTE, URLs.QUOTE);
    await brokeragePage.quotePriceButton.click();
    await expectElementVisibility(brokeragePage.progressBar, true);
    await expectElementVisibility(brokeragePage.confirmButton, true);
    await expectElementVisibility(brokeragePage.cancelButton, true);

    await api.mockData(SAVE_TRADE, URLs.SAVE_TRADE);
    await brokeragePage.confirmButton.click();
    await expectElementVisibility(brokeragePage.successMessage, true);
    await expectElementToHaveText(brokeragePage.successMessage, /Your transaction was successful!/);
  });

  // TODO: PWU-688
  test.skip("should show error message in case amount is less than minimum @criticalPath @jira(BCTGWEBPWU-233)", async ({
    brokeragePage,
  }) => {
    await brokeragePage.digitalAssetsList.selectByText(CURRENCIES.BTC);
    await brokeragePage.tradePairList.selectByText(CURRENCIES.USDT);
    await brokeragePage.tradeAmount.fill("0.0000002");
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, "Less than the minimum size of [ 0.0002 ]");
  });

  test("should have proper amounts in Holding List @extended @jira(BCTGWEBPWU-237)", async ({
    brokeragePage,
    portfolioPage,
  }) => {
    await brokeragePage.goto();
    const brokerageBTC = await brokeragePage.holdingList.getCurrencyAmount(CURRENCIES.BTC);
    const brokerageUSD = await brokeragePage.holdingList.getCurrencyAmount(CURRENCIES.USD);
    const brokerageUSDT = await brokeragePage.holdingList.getCurrencyAmount(CURRENCIES.USDT);

    await portfolioPage.goto();
    const portfolioBTC = await portfolioPage.holdingList.getCurrencyAmount(CURRENCIES.BTC);
    const portfolioUSD = await portfolioPage.holdingList.getCurrencyAmount(CURRENCIES.USD);
    const portfolioUSDT = await portfolioPage.holdingList.getCurrencyAmount(CURRENCIES.USDT);
    expectElementEquality(brokerageBTC, portfolioBTC);
    expectElementEquality(brokerageUSD, portfolioUSD);
    expectElementEquality(brokerageUSDT, portfolioUSDT);
  });

  test("should turn off appearance of IRFQ 3 @criticalPath @jira(BCTGWEBPWU-1020)", async ({ api, brokeragePage }) => {
    await api.mockConfig({
      features: {
        simpleTrade: {
          basket: {
            enabled: false,
          },
        },
      },
    });
    await brokeragePage.goto();
    await brokeragePage.digitalAssetsList.click();
    expectArrayIncludes(await brokeragePage.digitalAssetsList.getOptionsText(), [CURRENCIES.IRFQ], false);
  });
});
