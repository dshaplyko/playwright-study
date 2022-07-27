import { test } from "../../po/pages";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectToHaveCount,
  expectElementToHaveAttribute,
  expectElementEquality,
} from "../../utils";
import { CURRENCIES, PRIMARY_HINT, EXCHANGE_HINT, BROKERAGE_HINT, ATTRIBUTES } from "../../config";
const digitalAssetCurrency = CURRENCIES.BTC;

test.describe("Transfer Funds Page: Transfer Funds @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  test("should display Transfer Funds for Digital Asset @criticalPath @jira(XRT-220)", async ({ fundsPage }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(digitalAssetCurrency);
    await expectElementVisibility(fundsPage.transferFundsForm.rootEl, true);
    await expectElementToHaveText(fundsPage.transferFundsForm.currency, digitalAssetCurrency);
    await expectElementVisibility(fundsPage.transferFundsForm.primaryBalance, true);
    await expectElementVisibility(fundsPage.transferFundsForm.exchangeBalance, true);
    await expectElementVisibility(fundsPage.transferFundsForm.brokerageBalance, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferFrom.rootEl, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferTo.rootEl, true);
    await expectElementVisibility(fundsPage.transferFundsForm.transferTo.rootEl, true);
    await expectElementVisibility(fundsPage.transferFundsForm.percentControls, true);
    await expectToHaveCount(fundsPage.transferFundsForm.percentControls, 4);
  });

  test("should make transfer Primary->Brokerage for fiat currency @criticalPath @jira(XRT-217)", async ({
    fundsPage,
    portfolioPage,
  }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const initialZMBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    await fundsPage.transferFundsForm.makeTransfer("Primary", "Brokerage", 10000);
    await fundsPage.menuBar.paymentIn.click();
    await fundsPage.menuBar.transferFunds.click();
    const expectedString = new RegExp(`${CURRENCIES.USD}.*Primary.*Brokerage`);
    await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);

    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    const updatedPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const updatedBrokerageBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    expectElementEquality(updatedPrimaryBalance, initialPrimaryBalance - 10000);
    expectElementEquality(updatedBrokerageBalance, initialZMBalance + 10000);

    await portfolioPage.goto();
    expectElementEquality(await portfolioPage.holdingList.getBrokerageAmount(CURRENCIES.USD), updatedBrokerageBalance);
    expectElementEquality(await portfolioPage.holdingList.getPrimaryAmount(CURRENCIES.USD), updatedPrimaryBalance);
  });

  test("should make transfer Brokerage->Primary for fiat currency @criticalPath @jira(XRT-216)", async ({
    fundsPage,
    portfolioPage,
  }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const initialZMBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    await fundsPage.transferFundsForm.makeTransfer("Brokerage", "Primary", 10000);
    await fundsPage.menuBar.paymentIn.click();
    await fundsPage.menuBar.transferFunds.click();
    const expectedString = new RegExp(`${CURRENCIES.USD}.*Brokerage.*Primary`);
    await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);

    await fundsPage.currencyList.chooseCurrency(CURRENCIES.USD);
    const updatedPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const updatedBrokerageBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    expectElementEquality(updatedPrimaryBalance, initialPrimaryBalance + 10000);
    expectElementEquality(updatedBrokerageBalance, initialZMBalance - 10000);

    await portfolioPage.goto();
    expectElementEquality(await portfolioPage.holdingList.getBrokerageAmount(CURRENCIES.USD), updatedBrokerageBalance);
    expectElementEquality(await portfolioPage.holdingList.getPrimaryAmount(CURRENCIES.USD), updatedPrimaryBalance);
  });

  test("should make transfer Primary->Brokerage for crypto currency @criticalPath @jira(XRT-495)", async ({
    fundsPage,
    portfolioPage,
  }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
    const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const initialZMBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    await fundsPage.transferFundsForm.makeTransfer("Primary", "Brokerage", 1);
    await fundsPage.menuBar.paymentIn.click();
    await fundsPage.menuBar.transferFunds.click();
    const expectedString = new RegExp(`${CURRENCIES.BTC}.*Primary.*Brokerage`);
    await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);

    await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
    const updatedPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const updatedBrokerageBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    expectElementEquality(updatedPrimaryBalance, initialPrimaryBalance - 1);
    expectElementEquality(updatedBrokerageBalance, initialZMBalance + 1);

    await portfolioPage.goto();
    expectElementEquality(await portfolioPage.holdingList.getBrokerageAmount(CURRENCIES.BTC), updatedBrokerageBalance);
    expectElementEquality(await portfolioPage.holdingList.getPrimaryAmount(CURRENCIES.BTC), updatedPrimaryBalance);
  });

  test("should make transfer Brokerage->Primary for crypto currency @criticalPath @jira(XRT-591)", async ({
    fundsPage,
    portfolioPage,
  }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
    const initialPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const initialZMBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    await fundsPage.transferFundsForm.makeTransfer("Brokerage", "Primary", 1);
    await fundsPage.menuBar.paymentIn.click();
    await fundsPage.menuBar.transferFunds.click();
    const expectedString = new RegExp(`${CURRENCIES.BTC}.*Brokerage.*Primary`);
    await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);

    await fundsPage.currencyList.chooseCurrency(CURRENCIES.BTC);
    const updatedPrimaryBalance = await fundsPage.transferFundsForm.getBalance("Primary");
    const updatedBrokerageBalance = await fundsPage.transferFundsForm.getBalance("Brokerage");
    expectElementEquality(updatedPrimaryBalance, initialPrimaryBalance + 1);
    expectElementEquality(updatedBrokerageBalance, initialZMBalance - 1);

    await portfolioPage.goto();
    expectElementEquality(await portfolioPage.holdingList.getBrokerageAmount(CURRENCIES.BTC), updatedBrokerageBalance);
    expectElementEquality(await portfolioPage.holdingList.getPrimaryAmount(CURRENCIES.BTC), updatedPrimaryBalance);
  });

  test("should populate the placeholder on the Transfer Funds tab @extended @jira(XRT-214)", async ({ fundsPage }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.AUD);
    await fundsPage.transferFundsForm.makeTransferFrom("Primary");
    await expectElementToHaveAttribute(
      fundsPage.transferFundsForm.amountField.rootEl,
      ATTRIBUTES.PLACEHOLDER,
      await fundsPage.transferFundsForm.primaryBalance.textContent()
    );

    await fundsPage.transferFundsForm.makeTransferFrom("Exchange");
    await expectElementToHaveAttribute(
      fundsPage.transferFundsForm.amountField.rootEl,
      ATTRIBUTES.PLACEHOLDER,
      await fundsPage.transferFundsForm.exchangeBalance.textContent()
    );

    await fundsPage.transferFundsForm.makeTransferFrom("Brokerage");
    await expectElementToHaveAttribute(
      fundsPage.transferFundsForm.amountField.rootEl,
      ATTRIBUTES.PLACEHOLDER,
      await fundsPage.transferFundsForm.brokerageBalance.textContent()
    );
  });

  test("should display tooltips on the Transfer Funds tab @extended @jira(XRT-221)", async ({ fundsPage }) => {
    await fundsPage.transferFunds.click();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.AUD);
    await fundsPage.transferFundsForm.primaryHint.hover();
    await fundsPage.checkTooltip(PRIMARY_HINT);
    await fundsPage.transferFundsForm.exchangeHint.hover();
    await fundsPage.checkTooltip(EXCHANGE_HINT);
    await fundsPage.transferFundsForm.brokerageHint.hover();
    await fundsPage.checkTooltip(BROKERAGE_HINT);
  });
});
