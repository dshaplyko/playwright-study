import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText } from "../../utils";
import { CURRENCIES } from "../../config";
const fiatCurrency = CURRENCIES.USD;

test.describe("Clicking Trading Related buttons", async () => {
  test.beforeEach(async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await portfolioPage.closeMaintenanceBanner();
  });

  test("should redirect to Funds page after clicking Payment In button @criticalPath @jira(XRT-72) @jira(XRT-61)", async ({
    portfolioPage,
    fundsPage,
  }) => {
    await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
    await portfolioPage.tradingButtons.paymentIn.click();
    await fundsPage.expectUrlContains(/funds/);
    await expectElementVisibility(fundsPage.fiatCard.rootEl, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment In Method");
  });

  test("should redirect to Funds page after clicking Payment Out button @criticalPath @jira(XRT-72) @jira(XRT-61)", async ({
    portfolioPage,
    fundsPage,
  }) => {
    await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
    await portfolioPage.tradingButtons.paymentOut.click();
    await fundsPage.expectUrlContains(/funds/);
    await expectElementVisibility(fundsPage.fiatCard.rootEl, true);
    await expectElementToHaveText(fundsPage.fiatCard.header, "Select A Payment Out Method");
  });

  test("should redirect to Funds page after clicking Transfer Funds button @criticalPath @jira(XRT-72) @jira(XRT-61)", async ({
    portfolioPage,
    fundsPage,
  }) => {
    await portfolioPage.holdingList.clickCurrencyByText(fiatCurrency);
    await portfolioPage.tradingButtons.transferFunds.click();
    await fundsPage.expectUrlContains(/funds/);
    await expectElementVisibility(fundsPage.transferFundsForm.rootEl, true);
    await expectElementToHaveText(fundsPage.transferFundsForm.currency, fiatCurrency);
  });

  // TODO: Not relevant for the new Brokerage Page
  test.skip("should redirect to Brokerage page after clicking iRFQ button @criticalPath @jira(XRT-61)", async ({
    portfolioPage,
    brokeragePage,
  }) => {
    await portfolioPage.holdingList.clickCurrencyByText(CURRENCIES.BTC);
    await portfolioPage.tradingButtons.IRFQ.click();
    await brokeragePage.expectUrlContains(/buysell/);
    await expectElementVisibility(brokeragePage.pageHeader, true);
    await expectElementToHaveText(brokeragePage.pageHeader, "Brokerage");
    await expectElementToHaveText(brokeragePage.digitalAssetsList.rootEl, CURRENCIES.BTC);
  });
});
