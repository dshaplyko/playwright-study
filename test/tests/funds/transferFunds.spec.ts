import { test } from "../../po/pages";
import {
  expectElementVisibility,
  expectElementToHaveText,
  expectToHaveCount,
  expectElementToHaveAttribute,
  expectItemToContainText,
} from "../../utils";
import {
  CURRENCIES,
  PRIMARY_HINT,
  EXCHANGE_HINT,
  BROKERAGE_HINT,
  transferFundsPaymentMap,
  ATTRIBUTES,
} from "../../config";
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

  transferFundsPaymentMap.forEach(({ jiraId, type, currency }) => {
    test(`should make Transfer Funds Payment for ${type} currency @smoke ${jiraId}`, async ({
      fundsPage,
      portfolioPage,
    }) => {
      await fundsPage.transferFunds.click();
      await fundsPage.currencyList.chooseCurrency(currency);
      await expectElementVisibility(fundsPage.transferFundsForm.rootEl, true);
      await expectElementToHaveText(fundsPage.transferFundsForm.currency, currency);

      const { balanceFrom, balanceTo } = await fundsPage.transferFundsForm.executeTransferFromNonZeroBalance();
      await fundsPage.transferFundsForm.choosePercentControl(25);
      await fundsPage.transferFundsForm.transferFundsButton.click();
      await expectElementVisibility(fundsPage.transferFundsForm.successMessage, true);

      await fundsPage.transferFundsForm.doneButton.click();
      await fundsPage.goto();
      await fundsPage.transferFunds.click();
      const expectedString = new RegExp(`${currency}.*${balanceFrom}.*${balanceTo}`);
      await expectElementToHaveText(fundsPage.recentTransactions.getTransaction(1), expectedString);

      await fundsPage.currencyList.chooseCurrency(currency);
      const primaryBalance = await fundsPage.transferFundsForm.primaryBalance.innerText();
      const brokerageBalance = await fundsPage.transferFundsForm.brokerageBalance.innerText();

      await portfolioPage.goto();
      expectItemToContainText(await portfolioPage.holdingList.getLineByText(currency), [
        primaryBalance,
        brokerageBalance,
      ]);
    });
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
