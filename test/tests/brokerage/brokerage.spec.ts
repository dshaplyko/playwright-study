import { test } from "../../po/pages";
import { brokerageMap, CURRENCIES, TRANSACTION_FILTER_TYPES, URLs, limitData } from "../../config";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectElementEquality,
  expectItemToContainText,
  expectElementToContainText,
} from "../../utils";

test.describe("Brokerage Page @jira(PWU-71)", () => {
  test.beforeEach(async ({ brokeragePage }) => {
    await brokeragePage.goto();
  });
  test("should open Brokerage Page @criticalPath @jira(XRT-249)", async ({ brokeragePage }) => {
    await expectElementVisibility(brokeragePage.pageHeader, true);
    await expectElementToHaveText(brokeragePage.pageHeader, "Brokerage");
    await expectElementVisibility(brokeragePage.instructions.rootEl, true);
    await expectElementVisibility(brokeragePage.holdingList.rootEl, true);
    await expectElementVisibility(brokeragePage.buyButton, true);
    await expectElementVisibility(brokeragePage.sellButton, true);
    await expectElementVisibility(brokeragePage.digitalAssetsList.rootEl, true);
    await expectElementVisibility(brokeragePage.tradePairList.rootEl, true);
    await expectElementVisibility(brokeragePage.tradeAmount, true);
    await expectElementVisibility(brokeragePage.tradeCurrencyList.rootEl, true);
    await expectElementVisibility(brokeragePage.quotePriceButton, true);
    await expectElementVisibility(brokeragePage.subAccountIndicator, true);

    await brokeragePage.digitalAssetsList.click();
    await expectElementToContainText(brokeragePage.digitalAssetsList.options, [CURRENCIES.IRFQ]);
  });

  test("should expand/collapse Instructions widget @criticalPath @jira(XRT-250)", async ({ brokeragePage }) => {
    expectElementEquality(await brokeragePage.instructions.isExpanded(), true);

    await brokeragePage.instructions.expandCollapseButton.click();
    expectElementEquality(await brokeragePage.instructions.isExpanded(), false);
  });

  test("should change names of Buy/Sell buttons @extended @jira(XRT-251)", async ({ brokeragePage }) => {
    const chosenCurrency = CURRENCIES.BTC;
    await brokeragePage.digitalAssetsList.clickByText(chosenCurrency);
    await expectElementToHaveText(brokeragePage.sellButton, new RegExp(chosenCurrency));
    await expectElementToHaveText(brokeragePage.buyButton, new RegExp(chosenCurrency));
  });

  test("should have proper amounts in Holding List @extended @jira(XRT-258)", async ({
    brokeragePage,
    portfolioPage,
  }) => {
    await brokeragePage.goto();
    const brokerageBTC = await brokeragePage.holdingList.getCurrencyAmount(CURRENCIES.BTC);
    const brokerageUSD = await brokeragePage.holdingList.getCurrencyAmount(CURRENCIES.USD);

    await portfolioPage.goto();
    const portfolioBTC = await portfolioPage.holdingList.getCurrencyAmount(CURRENCIES.BTC);
    const portfolioUSD = await portfolioPage.holdingList.getCurrencyAmount(CURRENCIES.USD);
    expectElementEquality(brokerageBTC, portfolioBTC);
    expectElementEquality(brokerageUSD, portfolioUSD);
  });

  test("should turn off appearance of IRFQ 3 @criticalPath @jira(XRT-260)", async ({ brokeragePage }) => {
    await brokeragePage.disableBasket();
    await brokeragePage.digitalAssetsList.click();
    await expectElementToHaveText(brokeragePage.digitalAssetsList.options, [CURRENCIES.IRFQ], false);
  });

  brokerageMap.forEach(({ id, currencyToBuy, currencyBuyWith, button, amount }) => {
    test(`should buy/sell ${currencyToBuy} with ${currencyBuyWith} ${id}`, async ({
      activitiesPage,
      brokeragePage,
    }) => {
      await brokeragePage.digitalAssetsList.clickByText(currencyToBuy);
      await brokeragePage[button].click();
      await brokeragePage.tradePairList.clickByText(currencyBuyWith);
      await brokeragePage.tradeAmount.fill(amount);
      await brokeragePage.checkQuoteSave();
      await expectElementVisibility(brokeragePage.progressBar, true);
      await expectElementVisibility(brokeragePage.confirmButton, true);
      await expectElementVisibility(brokeragePage.cancelButton, true);
      await expectElementVisibility(brokeragePage.quotePriceButton, false);

      await brokeragePage.checkTradeSave();
      await expectElementVisibility(brokeragePage.successMessage, true);
      await expectElementToHaveText(brokeragePage.successMessage, /Your transaction was successful!/);

      await activitiesPage.goto();
      await activitiesPage.buttonActivityFilter.click();
      await activitiesPage.activityFilter.filterBy("type", TRANSACTION_FILTER_TYPES.RFQ);
      await activitiesPage.activityFilter.filterBy("currency", currencyToBuy);
      await activitiesPage.activityFilter.buttonConfirm.click();
      expectItemToContainText(await activitiesPage.transactionActivity.getTextFromLine(0), [
        currencyToBuy,
        amount,
        "Processed",
      ]);
    });
  });

  test("should change Time To Live value @criticalPath @jira(XRT-519)", async ({ brokeragePage }) => {
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("0.001");
    await brokeragePage.mockTimeToLive(16);
    await brokeragePage.quotePriceButton.click();
    await expectElementToHaveText(brokeragePage.progressBar, "15");
  });

  test("should display limit block @criticalPath @jira(XRT-545)", async ({ brokeragePage }) => {
    await brokeragePage.api.mockData(limitData, URLs.LIMIT);
    await brokeragePage.goto();
    await expectElementVisibility(brokeragePage.limitTable.rootEl, true);
    await brokeragePage.verifyLimitTable(limitData);
  });

  test("should set default trading pair @extended @jira(XRT-556)", async ({ portfolioPage, brokeragePage }) => {
    await portfolioPage.goto();
    const { defaultFiat, defaultCoin } = await brokeragePage.getTradingPair();
    expectElementEquality(await brokeragePage.digitalAssetsList.input.inputValue(), defaultCoin);
    expectElementEquality(await brokeragePage.tradePairList.input.inputValue(), defaultFiat);
  });
});
