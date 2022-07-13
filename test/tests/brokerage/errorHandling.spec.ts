import { test } from "../../po/pages";
import {
  CURRENCIES,
  RFQ_TRADING_PROHIBITED,
  RFQ_QUOTES_NOT_AVAILABLE,
  RFQ_MAXIMUM_SELL_ERROR,
  URLs,
  RFQ_BASIC_ERROR,
  brokerageErrorsMap,
  brokerageNetworkErrorMap,
  RFQ_MINIMUM_SELL_ERROR,
  networkErrorData,
  tradeErrorData,
  tradeError,
} from "../../config";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";

test.describe("Brokerage Page - Error Handling @jira(PWU-71)", () => {
  test.beforeEach(async ({ brokeragePage }) => {
    await brokeragePage.goto();
  });

  test("should show error message in case amount is less than minimum @criticalPath @jira(XRT-257)", async ({
    brokeragePage,
  }) => {
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USDT);
    await brokeragePage.tradeAmount.fill("0.0000002");
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, RFQ_MINIMUM_SELL_ERROR);
  });

  test("should display error when IRFQ3 is selected @extended @jira(XRT-253)", async ({ brokeragePage }) => {
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.IRFQ);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("10");
    await brokeragePage.checkQuoteSave();
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, RFQ_QUOTES_NOT_AVAILABLE);
    await expectElementVisibility(brokeragePage.quotePriceButton, false);
  });

  test("should show an error when user is blocked from trading @criticalPath @jira(XRT-516)", async ({
    brokeragePage,
  }) => {
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("0.001");
    await brokeragePage.mockRFQNetworkError(networkErrorData, URLs.QUOTE, 400);
    await brokeragePage.quotePriceButton.click();
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, RFQ_TRADING_PROHIBITED);
  });

  test("should display a message when amount to sell exceeds maximum @extended @jira(XRT-530)", async ({
    brokeragePage,
  }) => {
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("400000");
    await brokeragePage.quotePriceButton.click();
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, RFQ_MAXIMUM_SELL_ERROR);
  });

  brokerageErrorsMap.forEach(({ error }) => {
    test(`should handle ${error} error @extended @jira(XRT-557)`, async ({ brokeragePage }) => {
      await brokeragePage.mockQuoteError(error);
      await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
      await brokeragePage.sellButton.click();
      await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
      await brokeragePage.tradeAmount.fill("40");
      await brokeragePage.quotePriceButton.click();
      await expectElementVisibility(brokeragePage.errorMessage, true);
      await expectElementToHaveText(brokeragePage.errorMessage, RFQ_BASIC_ERROR);
    });
  });

  brokerageNetworkErrorMap.forEach(({ jiraId, statusCode, message }) => {
    test(`should handle ${statusCode} status code @extended @jira(${jiraId})`, async ({ brokeragePage }) => {
      await brokeragePage.mockRFQNetworkError({}, URLs.QUOTE, statusCode);
      await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
      await brokeragePage.sellButton.click();
      await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
      await brokeragePage.tradeAmount.fill("40");
      await brokeragePage.quotePriceButton.click();
      await expectElementVisibility(brokeragePage.errorMessage, true);
      await expectElementToHaveText(brokeragePage.errorMessage, message);
    });
  });

  test("should handle QUOTE_EXPIRED error @extended @jira(XRT-565)", async ({ brokeragePage }) => {
    await brokeragePage.mockSuccessfulQuotation();
    await brokeragePage.api.mockData(tradeErrorData, URLs.SAVE_TRADE);
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("400000");
    await brokeragePage.quotePriceButton.click();
    await brokeragePage.confirmButton.click();
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, "The quote has expired. Please try again.");
  });

  test("should handle SYSTEM_ERROR @extended @jira(XRT-566)", async ({ brokeragePage }) => {
    await brokeragePage.mockSuccessfulQuotation();
    await brokeragePage.mockRFQNetworkError(tradeError, URLs.SAVE_TRADE, 404);
    await brokeragePage.digitalAssetsList.clickByText(CURRENCIES.BTC);
    await brokeragePage.sellButton.click();
    await brokeragePage.tradePairList.clickByText(CURRENCIES.USD);
    await brokeragePage.tradeAmount.fill("400000");
    await brokeragePage.quotePriceButton.click();
    await brokeragePage.confirmButton.click();
    await expectElementVisibility(brokeragePage.errorMessage, true);
    await expectElementToHaveText(brokeragePage.errorMessage, RFQ_BASIC_ERROR);
  });
});
