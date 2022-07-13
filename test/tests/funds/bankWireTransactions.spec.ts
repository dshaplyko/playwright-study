import { test } from "../../po/pages";
import { expectElementVisibility, expectElementToHaveText, expectItemToContainText } from "../../utils";
import { CURRENCIES } from "../../config";

test.describe("Transfer Funds: Bank Wire @jira(PWU-34)", () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto();
  });

  test("should make Transaction @criticalPath @jira(XRT-207) @jira(XRT-308)", async ({ fundsPage }) => {
    const currency = CURRENCIES.USD;
    const amount = "51,200";

    await fundsPage.goto();
    await fundsPage.paymentIn.click();
    await fundsPage.currencyList.chooseCurrency(currency);
    await fundsPage.fiatCard.bankWireButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.rootEl, true);
    await expectElementVisibility(fundsPage.paymentInForm.amountField.rootEl, true);
    await expectElementVisibility(fundsPage.paymentInForm.paymentInButton, true);

    await fundsPage.fiatCard.amountField.typeText(amount);
    await fundsPage.fiatCard.paymentInButton.click();
    await expectElementVisibility(fundsPage.fiatCard.bankWireNotification.rootEl, true);

    const amountLine = await fundsPage.fiatCard.bankWireNotification.getLineByText("Amount");
    expectItemToContainText(amountLine, currency);
    expectItemToContainText(amountLine, amount);
  });

  test("should not make Transaction if fee is less than minimum @extended @jira(XRT-208)", async ({ fundsPage }) => {
    await fundsPage.mockTransactionData();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await fundsPage.fiatCard.bankWireButton.click();
    await fundsPage.paymentInForm.amountField.typeText("10");
    await fundsPage.paymentInForm.paymentInButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.errorMessage, true);
    await expectElementToHaveText(fundsPage.paymentInForm.errorMessage, /Less than the minimum size/);
  });

  test("should not make Transaction if fee is more than maximum @extended @jira(XRT-209)", async ({ fundsPage }) => {
    await fundsPage.mockTransactionData();
    await fundsPage.currencyList.chooseCurrency(CURRENCIES.EUR);
    await fundsPage.fiatCard.bankWireButton.click();
    await fundsPage.paymentInForm.amountField.typeText("100000000");
    await fundsPage.paymentInForm.paymentInButton.click();
    await expectElementVisibility(fundsPage.paymentInForm.errorMessage, true);
    await expectElementToHaveText(fundsPage.paymentInForm.errorMessage, /Exceeds maximum value/);
  });
});
