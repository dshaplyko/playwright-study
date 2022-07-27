import { test } from "../po/pages";
import { CURRENCIES, PORTFOLIO_COLUMNS, DIGITAL_CURRENCIES } from "../config";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectElementEquality,
  expectArrayIncludes,
  useState,
} from "../utils";

test.describe("Custody Only @jira(UCP-549)", () => {
  test.describe("Mock flag", () => {
    test("should disable exchange and brokerage modules @criticalPath @jira(XRT-570)", async ({ portfolioPage }) => {
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.header.buySellLink, true);
      await expectElementVisibility(portfolioPage.header.tradeLink, true);

      await portfolioPage.mockCustodyAccount(true);
      await portfolioPage.goto();
      await expectElementVisibility(portfolioPage.header.buySellLink, false);
      await expectElementVisibility(portfolioPage.header.tradeLink, false);
    });

    test("should disable deposit and withdrawal for fiat @criticalPath @jira(XRT-571)", async ({
      portfolioPage,
      fundsPage,
    }) => {
      await portfolioPage.mockCustodyAccount(true);
      await fundsPage.goto();
      await fundsPage.paymentIn.click();
      const { fiatCurrencies: depositCurrencies } = await fundsPage.currencyList.getCurrencies();
      expectElementEquality(depositCurrencies.length, 0);

      await fundsPage.menuBar.paymentOut.click();
      const { fiatCurrencies: withdrawalCurrencies } = await fundsPage.currencyList.getCurrencies();
      expectElementEquality(withdrawalCurrencies.length, 0);
    });

    test("should disable transfer from Primary to Exchange @criticalPath @jira(XRT-572)", async ({
      portfolioPage,
      fundsPage,
    }) => {
      await portfolioPage.mockCustodyAccount(true);
      await fundsPage.goto();
      await fundsPage.transferFunds.click();
      const { fiatCurrencies: depositCurrencies } = await fundsPage.currencyList.getCurrencies();
      expectElementEquality(depositCurrencies.length, 0);

      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      await expectElementToHaveText(fundsPage.transferFundsForm.getBucket(1), "Primary");
      await expectElementToHaveText(fundsPage.transferFundsForm.getBucket(2), "ExtTradeVenue-ZM");
    });

    test("should display portfolio page for Custody Only users @criticalPath @jira(XRT-583)", async ({
      portfolioPage,
    }) => {
      await portfolioPage.mockCustodyAccount(true);
      await portfolioPage.goto();
      await portfolioPage.holdingList.checkColumnVisibility(PORTFOLIO_COLUMNS.EX_TRADE_VENUE, true);
      expectArrayIncludes(DIGITAL_CURRENCIES, await portfolioPage.getGroupTable(0).getCurrencies());
    });
  });

  test.describe("Custody Only User", () => {
    useState("trader");

    test("should make transfer Primary->ExtTradeVenue-ZM @criticalPath @jira(XRT-580)", async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.transferFunds.click();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
      const initialZMBalance = await fundsPage.transferFundsForm.getBalance("ExtTradeVenue-ZM");
      await fundsPage.transferFundsForm.makeTransfer("Primary", "ExtTradeVenue-ZM", 1);
      await fundsPage.menuBar.paymentIn.click();
      await fundsPage.menuBar.paymentOut.click();
      await fundsPage.menuBar.transferFunds.click();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      expectElementEquality(await fundsPage.transferFundsForm.getBalance("Primary"), initialPrimaryBalance - 1);
      expectElementEquality(await fundsPage.transferFundsForm.getBalance("ExtTradeVenue-ZM"), initialZMBalance + 1);
    });

    test("should make transfer ExtTradeVenue-ZM->Primary @criticalPath @jira(XRT-581)", async ({ fundsPage }) => {
      await fundsPage.goto();
      await fundsPage.transferFunds.click();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
      const initialZMBalance = await fundsPage.transferFundsForm.getBalance("ExtTradeVenue-ZM");
      await fundsPage.transferFundsForm.makeTransfer("ExtTradeVenue-ZM", "Primary", 1);
      await fundsPage.menuBar.paymentIn.click();
      await fundsPage.menuBar.paymentOut.click();
      await fundsPage.menuBar.transferFunds.click();
      await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
      expectElementEquality(await fundsPage.transferFundsForm.getBalance("Primary"), initialPrimaryBalance + 1);
      expectElementEquality(await fundsPage.transferFundsForm.getBalance("ExtTradeVenue-ZM"), initialZMBalance - 1);
    });
  });
});
